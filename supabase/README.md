# Supabase: Razorpay payments

No-login checkout for the webinar pages (`public/Webinar.dc.html`, `public/Webinar Mobile.dc.html`).

```
browser ──POST /create-order──▶ Edge Function ──▶ Razorpay Orders API
   │                                │
   │                                └─▶ payments row (status 'created')
   └─▶ Razorpay Checkout (order_id, key_id)
                                 Razorpay ──POST /razorpay-webhook──▶ payments row
                                           (signed)                     ('captured' / 'failed' / 'refunded')
```

The webhook is the source of truth. The browser's success callback only shows the thank-you screen.

| Path | What it is |
| --- | --- |
| `migrations/…_create_payments.sql` | `payments` table. RLS on with no policies, so only the service role can read or write it. |
| `functions/create-order` | Looks up the price by `product` (the client never sends an amount), creates the Razorpay order, inserts the row. |
| `functions/razorpay-webhook` | Verifies `X-Razorpay-Signature`, handles `payment.captured`, `payment.failed`, `refund.processed`. Idempotent; a row's status only moves forward. |
| `config.toml` | Both functions run with `verify_jwt = false`: the webhook is authenticated by its signature, and `create-order` is a public endpoint with a server-side price. |

Prices live in `PRODUCTS` in `functions/create-order/index.ts`; the page sends `product: "pcos-webinar-founding"`.

## Deploy

Uses the Supabase CLI through `npx`, from the `vite-project` folder. Project ref: `dlyhjxlhptfuxstfykkh`.
Deploys go straight from this folder with the CLI; no GitHub integration is involved (the Supabase project and the GitHub repo belong to different accounts).

### Log in

Either log in through the browser:

```sh
npx supabase login
```

or use an access token from the account that owns the project (Supabase dashboard → Account → Access Tokens → Generate new token). The CLI reads it from `SUPABASE_ACCESS_TOKEN`, so no browser login is needed. Set it for the current terminal only; don't put it in a file in this repo.

```sh
# Git Bash
export SUPABASE_ACCESS_TOKEN=sbp_xxxxxxxxxxxxxxxx
```

```powershell
# PowerShell
$env:SUPABASE_ACCESS_TOKEN = "sbp_xxxxxxxxxxxxxxxx"
```

`npx supabase projects list` should then show `dlyhjxlhptfuxstfykkh`. If it doesn't, the token is from the wrong account.

### Link, migrate, set secrets, deploy

`link` and `db push` ask for the project's database password (Project Settings → Database).

```sh
npx supabase link --project-ref dlyhjxlhptfuxstfykkh
npx supabase db push                       # creates the payments table

# Test-mode keys first: Razorpay dashboard → Test Mode → Account & Settings → API Keys
npx supabase secrets set RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
npx supabase secrets set RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
npx supabase secrets set RAZORPAY_WEBHOOK_SECRET=<a long random string you make up>

npx supabase functions deploy create-order --no-verify-jwt
npx supabase functions deploy razorpay-webhook --no-verify-jwt
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided to Edge Functions automatically; don't set them (the CLI refuses names starting with `SUPABASE_`). Neither the Razorpay key secret nor the service role key ever reaches the browser. `create-order` only returns the public `key_id`.

Both webinar pages already point `FN_URL` at `https://dlyhjxlhptfuxstfykkh.supabase.co/functions/v1`.

### Who can call create-order

`create-order` only answers requests whose `Origin` is `https://www.therightmolecule.com` (the bare `therightmolecule.com` redirects there, so pages never load from it). Everything else gets a 403. To test from the Vite dev server, temporarily allow it, and set it back afterwards:

```sh
npx supabase secrets set ALLOWED_ORIGINS=https://www.therightmolecule.com,http://localhost:5173
npx supabase secrets unset ALLOWED_ORIGINS   # back to www only
```

An Origin check only stops other websites from using it through a browser; a script can fake the header. That's why the function also fixes the price server-side and requires a well-formed name (letters only, 2–80 chars) and email. The worst a script can do is add junk `created` rows, which never become `captured` without a real payment.

## Razorpay webhook

Razorpay dashboard → Account & Settings → Webhooks → Add New Webhook (do it in Test Mode first, then again in Live Mode):

- **URL:** `https://dlyhjxlhptfuxstfykkh.supabase.co/functions/v1/razorpay-webhook`
- **Secret:** the same value as `RAZORPAY_WEBHOOK_SECRET`
- **Events:** `payment.captured`, `payment.failed`, `refund.processed`

Payments must be auto-captured (Account & Settings → Payment Capture → Automatic), otherwise `payment.captured` never fires.

## Test

1. Open the webinar page, enter a name and email, click Pay.
2. In Razorpay test checkout, pay with UPI ID `success@razorpay` (or `failure@razorpay` to test a failure), or test card `4111 1111 1111 1111`, any future expiry, any CVV.
3. Supabase → Table Editor → `payments`: the row goes `created` → `captured` with email and phone filled in.
4. If it stays `created`: Razorpay → Webhooks → your webhook shows each delivery and response; Supabase → Edge Functions → `razorpay-webhook` → Logs shows errors. A `400 Invalid signature` means the webhook secret doesn't match `RAZORPAY_WEBHOOK_SECRET`.

## Going live

Repeat `secrets set` with the `rzp_live_…` key ID and secret, add the webhook again in Live Mode (its secret must match, or use the same one), and do one real ₹188 payment.
