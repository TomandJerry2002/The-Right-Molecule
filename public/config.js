// ── STOREFRONT SETTINGS ──────────────────────────────────────────────────
// Loaded first on every page (desktop, mobile, checkout). Edit here, no rebuild needed for public/ files.
window.TRMConfig = {
  // Django backend. Local dev talks to `manage.py runserver`; the live site talks to Render.
  apiUrl: /^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? 'http://localhost:8000' : 'https://trm-backend.onrender.com',

  // false → pre-launch: every buy button opens the waitlist, exactly as before.
  // true  → product pages show "Add to bag" / "Buy now" and checkout.html takes payments.
  storeOpen: false,

  // Shown on the checkout page for payment questions.
  supportEmail: 'hello@therightmolecule.com',
};
