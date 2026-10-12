# The Right Molecule — website (Vite)

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

## Structure
- `src/Site.jsx` — the main site: Home, Products (waitlist), About, the test, and the waitlist pop-up.
- `src/main.jsx` — entry; sets up React, GSAP and the design-system bundle.
- `public/_ds_bundle.js` — The Right Molecule design-system components (header, footer, buttons, icons, motion).
- `public/styles.css` + `public/tokens/` — colours, type, spacing.
- `public/assets/` — sachet images, brand line art, icons.
- `public/Our Science.dc.html` — the Our Science page (self-contained; uses `support.js`, `CellScene.dc.html`, `science/ingredients.js`).

## Connecting the waitlist
In `src/Site.jsx`, replace the body of `submitWaitlist()` with your API call. It must resolve to `{ memberNumber }`. Test answers are passed in the same call.
