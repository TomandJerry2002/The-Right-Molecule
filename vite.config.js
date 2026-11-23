import { defineConfig } from 'vite';

// Clean page URLs. Keep in sync with the rewrites in vercel.json, which does the same in production.
const PAGES = {
  '/products': '/index.html',
  '/our-science': '/index.html',
  '/our-story': '/index.html',
  '/blog': '/index.html',
  '/terms': '/Legal.dc.html',
  '/privacy': '/Legal.dc.html',
};
const rewrite = (req, res, next) => {
  const [path, query] = req.url.split(/\?(.*)/s);
  const to = PAGES[path.replace(/\/+$/, '')];
  if (to) req.url = to + (query ? '?' + query : '');
  next();
};
const cleanUrls = {
  name: 'clean-urls',
  configureServer: (server) => { server.middlewares.use(rewrite); },
  configurePreviewServer: (server) => { server.middlewares.use(rewrite); },
};

// Pages are self-contained and served from public/ as-is.
export default defineConfig({ base: './', plugins: [cleanUrls] });
