# The Right Molecule — website (Vite)

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

## Pages
- `/` — desktop site (React): Home, Products, About, the test, and the waitlist pop-up.
- `/mobile.html` — mobile site. Phones (≤640px) opening `/` are sent here automatically; add `?desktop` to stay on the desktop site.
- `/Our Science.dc.html` — Our Science page.

## Waitlist
- Open it directly with `?waitlist` on either site, e.g. `/?waitlist` or `/mobile.html?waitlist`.
- **Connect your backend in `public/waitlist.js`** — `window.TRMWaitlist.submit({ name, email, source, answers })`. Desktop pop-up, desktop test and the mobile sheet all call it. It must resolve to `{ memberNumber }` (shown on the Founding Member card). `source` is `waitlist`, `test` or `mobile`.

## Structure
- `src/Site.jsx` — desktop site components.
- `src/main.jsx` — entry; sets up React, GSAP, the waitlist module and the design-system bundle.
- `public/_ds_bundle.js` — design-system components (header, footer, buttons, icons, motion).
- `public/styles.css` + `public/tokens/` — colours, type, spacing.
- `public/assets/` — sachet images, brand line art, icons.
- `public/support.js` — runtime for the mobile and Our Science pages.
