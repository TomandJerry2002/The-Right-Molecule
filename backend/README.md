# The Right Molecule — backend

Django backend for the storefront: products, guest checkout with **Cashfree**, orders with shipping
addresses, and the waitlist.

## Run it locally

```powershell
cd backend
py -3.12 -m venv venv
venv\Scripts\pip install -r requirements.txt
copy .env.example .env          # then fill in your Cashfree TEST keys
venv\Scripts\python manage.py migrate
venv\Scripts\python manage.py createsuperuser
venv\Scripts\python manage.py runserver
```

- Admin: http://localhost:8000/admin/ (orders, products, waitlist, webhook log)
- Tests: `venv\Scripts\python manage.py test store`

## How a payment works

```
Browser                     Backend (Django)                    Cashfree
  │ POST /api/checkout/ ──────▶ validate, price from DB,
  │                             save Order (PENDING) ──────────▶ POST /pg/orders
  │ ◀── order_id, payment_session_id ◀─────────────────────────── payment_session_id
  │ cashfree.checkout(...) ──────────────────────────────────────▶ customer pays
  │                             POST /api/webhooks/cashfree/ ◀─── signed webhook
  │                             verify signature + amount → PAID
  │ ◀── redirect to CHECKOUT_RETURN_URL?order_id=… ◀───────────────
  │ GET /api/orders/<id>/ ────▶ re-checks with Cashfree, returns status
```

An order is only marked **PAID** by a signed webhook or a server-to-server check with Cashfree, and
only if the amount equals the order total. The redirect back to the site proves nothing on its own.

## API

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/products/` | Active products: `sku`, `name`, `flavour`, `sachets`, `price` |
| POST | `/api/checkout/` | Create an order and Cashfree session |
| GET | `/api/orders/<order_id>/` | Order status for the return page (no personal data) |
| POST | `/api/webhooks/cashfree/` | Cashfree webhook (signature-verified) |
| POST | `/api/waitlist/` | `{name, email, source, answers}` → `{memberNumber}` |

**POST /api/checkout/**

```json
{
  "customer_name": "Ananya Rao", "email": "ananya@example.com", "phone": "9876543210",
  "address_line1": "12 MG Road", "address_line2": "", "city": "Bengaluru",
  "state": "Karnataka", "pincode": "560001",
  "items": [{ "sku": "pcos-harmony-passion-fruit", "quantity": 2 }]
}
```

→ `201 {"order_id", "payment_session_id", "amount", "cashfree_mode"}`, or
`400 {"error": "...", "errors": {field: [...]}}` / `502` if Cashfree is unreachable.

**GET /api/orders/<order_id>/** → `status` is `PENDING`, `PAID`, `EXPIRED`, `FAILED` or `CANCELLED`.
While `PENDING`, `payment_session_id` is included so the page can offer "Try again", and `payment`
shows the last attempt (`FAILED`, `USER_DROPPED`, …).

## Frontend (already wired up)

| File | What it does |
|---|---|
| `public/config.js` | `apiUrl` (backend address) and **`storeOpen`**. While `false` the site is in waitlist mode, exactly as before. |
| `checkout.html` + `src/CheckoutPage.jsx` | One checkout for desktop and mobile: details form → Cashfree → result page (confirmed / try again / expired) |
| `src/Site.jsx` | With `storeOpen: true`: "Add to bag" on the product page, bag icon in the header, Checkout → `checkout.html` |
| `public/mobile.html` | With `storeOpen: true`: the product page bar becomes "Buy now" → `checkout.html` |
| `public/waitlist.js` | Sends waitlist sign-ups to `/api/waitlist/` |

To try checkout locally: run this backend, set `storeOpen: true` in `public/config.js`, `npm run dev`
in the Vite project, and open http://localhost:5173/checkout.html?item=Passion%20Fruit:1

## Order confirmation emails

When an order becomes PAID the customer gets a confirmation email (order, items, total, address),
and everyone in `ORDER_NOTIFY_EMAILS` gets a "new order" email with the shipping details. Each order
is emailed once; **Admin → Orders → "Resend order confirmation email"** sends it again. If sending
fails the payment is still recorded, and the error is in the logs.

Set `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD` and `DEFAULT_FROM_EMAIL`
for your email provider. Without `EMAIL_HOST`, emails are printed to the console. The From address
must be on a domain you've verified with that provider (SPF/DKIM), or the emails will land in spam.

## Cashfree setup

1. **API keys:** Dashboard → Developers → API Keys. Test keys go with `CASHFREE_ENV=sandbox`, and
   production keys with `CASHFREE_ENV=production`.
2. **Whitelist your domain** (Dashboard → Developers → Whitelisting) before checkout works in production.
3. **Webhook:** Dashboard → Developers → Webhooks → add
   `https://<your-backend>/api/webhooks/cashfree/` for payment events. Setting `BACKEND_PUBLIC_URL`
   also sends it per order as `notify_url`. Cashfree needs an https URL, so for local testing use a
   tunnel (e.g. `ngrok http 8000`). Without a webhook, the return page's status check still marks
   orders paid.
4. Test with Cashfree's sandbox test cards/UPI IDs, then check **Admin → Webhook events**.

## Deploying to Render

`render.yaml` (repo root) describes the backend and its Postgres database. In Render:
**New → Blueprint →** pick the GitHub repo. Render asks for the `sync: false` values (Cashfree keys,
SMTP login, `ORDER_NOTIFY_EMAILS`). Then:

1. Open a shell on the service (or run locally against `DATABASE_URL`) and run
   `python manage.py createsuperuser` to get into `/admin/`.
2. In `public/config.js`, set `apiUrl` to the service URL (e.g. `https://trm-backend.onrender.com`).
3. If the site isn't at www.therightmolecule.com, update `CORS_ALLOWED_ORIGINS` and `CHECKOUT_RETURN_URL`.
4. Add the webhook URL in Cashfree (above) and whitelist the site domain.
5. Test a sandbox payment end to end, then switch `CASHFREE_ENV=production` with production keys,
   and set `storeOpen: true`.

The Blueprint uses paid plans on purpose: free Render web services sleep after 15 minutes (the first
customer waits about a minute) and can't send SMTP email, and free Render Postgres is deleted after
30 days, which would take your order records with it.
