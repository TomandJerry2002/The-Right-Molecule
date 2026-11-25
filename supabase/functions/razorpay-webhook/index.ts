// Razorpay webhook: the source of truth for whether a payment happened.
// Auth is the X-Razorpay-Signature HMAC, so this function is deployed with verify_jwt = false.
import { admin, json } from "../_shared/supabase.ts";

type Status = "created" | "failed" | "captured" | "refunded";

// Events can arrive late, twice, or out of order. A row only ever moves forward,
// so a stale payment.failed can't overwrite a capture.
const RANK: Record<Status, number> = { created: 0, failed: 1, captured: 2, refunded: 3 };

const enc = new TextEncoder();

async function validSignature(rawBody: string, signature: string, secret: string): Promise<boolean> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(rawBody)));
  const expected = Array.from(mac, (b) => b.toString(16).padStart(2, "0")).join("");
  if (expected.length !== signature.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  return diff === 0;
}

// deno-lint-ignore no-explicit-any
type PaymentEntity = Record<string, any>;

async function record(payment: PaymentEntity, status: Status) {
  const orderId: string | undefined = payment.order_id;
  if (!orderId) {
    console.warn("payment without order_id, skipped", payment.id);
    return;
  }

  const { data: existing, error: readErr } = await admin
    .from("payments").select("status").eq("razorpay_order_id", orderId).maybeSingle();
  if (readErr) throw readErr;
  if (existing && RANK[status] < RANK[existing.status as Status]) return; // stale or duplicate event

  const notes = payment.notes && !Array.isArray(payment.notes) ? payment.notes : {};
  const row: Record<string, unknown> = {
    razorpay_order_id: orderId,
    razorpay_payment_id: payment.id,
    status,
    amount: payment.amount,
    currency: payment.currency,
    raw_payload: payment,
  };
  // Only overwrite customer details when Razorpay actually has them.
  if (payment.email) row.customer_email = payment.email;
  if (payment.contact) row.customer_phone = payment.contact;
  if (notes.customer_name) row.customer_name = notes.customer_name;
  if (!existing && notes.product) row.product = notes.product;

  // Upsert covers payments whose order wasn't created by create-order (e.g. a dashboard payment link).
  const { error } = await admin.from("payments").upsert(row, { onConflict: "razorpay_order_id" });
  if (error) throw error;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const rawBody = await req.text(); // must be the exact bytes Razorpay signed
  const signature = req.headers.get("X-Razorpay-Signature") ?? "";
  const secret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET")!;
  if (!signature || !(await validSignature(rawBody, signature, secret))) {
    return json({ error: "Invalid signature" }, 400);
  }

  let event: { event?: string; payload?: Record<string, { entity: PaymentEntity }> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const payment = event.payload?.payment?.entity;
  try {
    switch (event.event) {
      case "payment.captured":
        if (payment) await record(payment, "captured");
        break;
      case "payment.failed":
        if (payment) await record(payment, "failed");
        break;
      case "refund.processed":
        // Partial refunds keep the row 'captured'; raw_payload still shows amount_refunded.
        if (payment) await record(payment, payment.refund_status === "full" ? "refunded" : "captured");
        break;
      default:
        break; // other events are acknowledged and ignored
    }
  } catch (err) {
    // 500 makes Razorpay retry later, which is safe because record() is idempotent.
    console.error("webhook processing failed", event.event, err);
    return json({ error: "Processing failed" }, 500);
  }

  return json({ ok: true });
});
