# The Right Molecule — website (Vite)

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

## Pages
Every page has its own URL; the address bar follows you as you navigate, and Back/Forward work.

| URL | Page |
| --- | --- |
| `/` | Home |
| `/products` | Products |
| `/our-science` | Our Science |
| `/our-story` | Our Story |
| `/blog` | Blog |
| `/terms` | Terms & Conditions (interim) |
| `/privacy` | Privacy Policy (interim) |

- The five site pages are all served by `index.html` (one shared header and footer); `/terms` and `/privacy` by `public/Legal.dc.html`. The rewrites live in `vercel.json` (production) and `vite.config.js` (dev/preview) — keep them in sync when adding a page.
- Phones (≤640px) are sent to the mobile site (`public/mobile.html`), which keeps the same URL, e.g. `/blog`; add `?desktop` to stay on the desktop site.
- Old `?route=Products`-style links still work and are rewritten to the clean path.

## Waitlist
- Open it directly with `?waitlist`, e.g. `/?waitlist` or `/mobile.html?waitlist`.
- **Connect your backend in `public/waitlist.js`** — `window.TRMWaitlist.submit({ name, email, source })` must resolve to `{ memberNumber }` (shown on the Founding Member card).

## Blog
- Add posts to `BLOG_POSTS` in `public/site/Site.jsx`: `{ title, excerpt, date: 'YYYY-MM-DD', tag, image, href }`.

## Structure
- `index.html` — desktop entry.
- `public/site/Site.jsx` — desktop site components (header, Home, Products, Blog, waitlist pop-up).
- `public/Our Science.dc.html`, `public/Our Story v2.dc.html`, `public/CellScene.dc.html` — section pages, embedded into the desktop and mobile sites.
- `public/mobile.html` — mobile site.
- `public/_ds_bundle.js` — design-system components; `public/support.js` — page runtime.
- `public/styles.css` + `public/tokens/` — colours, type (EB Garamond Italic + Jost), spacing.
- `public/assets/` — sachet images, brand line art, icons.
