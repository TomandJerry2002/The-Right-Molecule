// Creates a Razorpay order for a fixed-price product and records it in `payments` as 'created'.
// The client only says WHICH product; the amount always comes from PRODUCTS below.
import { admin, json } from "../_shared/supabase.ts";

const PRODUCTS: Record<string, { amount: number; label: string }> = {
  "pcos-webinar-workshop": { amount: 13800, label: "PCOS Workshop · Live workshop" }, // ₹138
  "pcos-webinar-founding": { amount: 18800, label: "PCOS Workshop · Founding edition" }, // ₹188
};

// The live site is served from www (the bare domain 308-redirects there). For local testing,
// add origins with: supabase secrets set ALLOWED_ORIGINS=https://www.therightmolecule.com,http://localhost:5173
const ALLOWED_ORIGINS = (Deno.env.get("ALLOWED_ORIGINS") ?? "https://www.therightmolecule.com")
  .split(",").map((o) => o.trim()).filter(Boolean);

function corsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
// Letters (any script), spaces, and . ' - between words. No digits, URLs or markup.
const NAME_RE = /^[\p{L}\p{M}]+(?:[ .'-]+[\p{L}\p{M}]+)*\.?$/u;
const PHONE_RE = /^\+?[0-9][0-9 -]{6,18}[0-9]$/;

// Text field: trimmed, internal whitespace collapsed. null when blank, undefined when not a string or too long.
function clean(v: unknown, max: number): string | null | undefined {
  if (v == null || v === "") return null;
  if (typeof v !== "string") return undefined;
  const s = v.trim().replace(/\s+/g, " ");
  return s.length > max ? undefined : s || null;
}

Deno.serve(async (req) => {
  // CORS only stops other websites' browsers; the checks below still apply to every caller.
  const origin = req.headers.get("Origin") ?? "";
  if (!ALLOWED_ORIGINS.includes(origin)) return json({ error: "Origin not allowed" }, 403);
  const cors = corsHeaders(origin);
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, cors);
  if (!(req.headers.get("Content-Type") ?? "").startsWith("application/json")) {
    return json({ error: "Expected JSON" }, 415, cors);
  }
  if (Number(req.headers.get("Content-Length") ?? 0) > 2048) return json({ error: "Request too large" }, 413, cors);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400, cors);
  }

  const productId = typeof body.product === "string" ? body.product : "";
  const product = PRODUCTS[productId];
  if (!product) return json({ error: "Unknown product" }, 400, cors);

  // Name and email are required (the form always sends them); phone is optional since Checkout collects it.
  const name = clean(body.name, 80);
  const email = clean(body.email, 254)?.toLowerCase();
  const phone = clean(body.phone, 20);
  if (!name || name.length < 2 || !NAME_RE.test(name)) {
    return json({ error: "Please enter your name using letters only." }, 400, cors);
  }
  if (!email || !EMAIL_RE.test(email) || email.split("@")[0].length > 64) {
    return json({ error: "Please enter a valid email address." }, 400, cors);
  }
  if (phone === undefined || (phone && !PHONE_RE.test(phone))) {
    return json({ error: "Please enter a valid phone number." }, 400, cors);
  }

  const keyId = Deno.env.get("RAZORPAY_KEY_ID")!;
  const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET")!;
  const notes = { product: productId, ...(name && { customer_name: name }), ...(email && { customer_email: email }) };

  const rzp = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa(`${keyId}:${keySecret}`),
    },
    body: JSON.stringify({
      amount: product.amount,
      currency: "INR",
      receipt: `trm_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`, // ≤ 40 chars
      notes,
    }),
  });
  if (!rzp.ok) {
    console.error("Razorpay order failed", rzp.status, await rzp.text());
    return json({ error: "Could not start payment. Please try again." }, 502, cors);
  }
  const order = await rzp.json();

  const { error } = await admin.from("payments").insert({
    razorpay_order_id: order.id,
    status: "created",
    amount: order.amount,
    currency: order.currency,
    customer_name: name,
    customer_email: email,
    customer_phone: phone,
    product: productId,
    notes,
  });
  if (error) {
    console.error("payments insert failed", error);
    return json({ error: "Could not start payment. Please try again." }, 500, cors);
  }

  return json({
    order_id: order.id,
    key_id: keyId,
    amount: order.amount,
    currency: order.currency,
    product_label: product.label,
  }, 200, cors);
});
