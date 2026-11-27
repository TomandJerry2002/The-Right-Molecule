# The Right Molecule — website (Vite)

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

## Pages
- `/` — desktop site, one page: Home, Products, Our Science, Our Story and Blog all load inside it with a single shared header and footer.
- `/mobile.html` — mobile site (same sections). Phones (≤640px) opening `/` are sent here automatically; add `?desktop` to stay on the desktop site.
- `/Webinar.dc.html` — InnerAtlas × Plyolife workshop landing page (not in the main nav; linked from the top announcement banner and the InnerAtlas section on Home). After payment it returns visitors to `/`. Connect your payment gateway in the `pay` handler and set its success URL to your homepage.
- `/Webinar Mobile.dc.html` — phone version of the workshop page (shown in a phone frame on desktop). Linked from the banner at the top of `/mobile.html`.
- `/Legal.dc.html` — Terms & Conditions; `/Legal.dc.html?doc=privacy` — Privacy Policy (interim). Linked from every footer.
- Open a section directly with `?route=Products`, `?route=Our Science`, `?route=Our Story` or `?route=Blog`.

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

## Shareable links
Every page and pop-up has its own address, and Back/Forward work.

Main site (desktop `/`, mobile `/mobile.html`):
- `#/` Home · `#/products` · `#/science` · `#/story` · `#/blog` · `#/blog/<post-slug>`
- Pop-ups, added after any page: `/waitlist` · `/test` (desktop) · `/ingredient/<name>`
  e.g. `#/products/ingredient/myo-inositol`, `#/waitlist`, `#/test`

Workshop pages:
- `#agenda` · `#faq` · `#founding` (registration) · `#aaron` · `#david` (opens the facilitator)

Phones opening a desktop address are redirected to the mobile page with the same link.

## Pre-rendering (search engines & link previews)
`npm run build` builds the site, then opens every page in headless Chrome and saves the fully rendered HTML, so Google, WhatsApp, LinkedIn etc. see real content without running JavaScript.

1. Set your live domain in `seo.config.js` (`SITE_URL`) or run `SITE_URL=https://yourdomain.com npm run build`.
2. Upload `dist/` to the root of your domain.

Output:
- Real pages at `/`, `/products/`, `/science/`, `/story/`, `/blog/`, `/workshop/`, `/legal/`, each with its own title, description, social preview tags and structured data (Organization, Product, Event for the workshop).
- `sitemap.xml` and `robots.txt`. Submit the sitemap in Google Search Console.

Page titles and descriptions live in `seo.config.js`. `npm run build:spa` skips pre-rendering.
Requires Node 18+; the first install downloads Chromium for Puppeteer.


## Landing page
therightmolecule.com (`/`) opens on the workshop page. `index.html` is a copy of `public/Webinar.dc.html`; if you edit the workshop, copy it over again (and remove its `noindex` meta). Our Story is at `/story/`.
