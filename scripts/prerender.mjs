// Build-time pre-rendering (static SSR).
// Runs after `vite build`: opens every route in headless Chrome, captures the
// fully rendered HTML, and writes dist/<route>/index.html with that HTML in
// place plus per-page SEO tags. The live app takes over as soon as it loads.
import { preview } from 'vite';
import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';
import { SITE_URL, SITE_NAME, OG_IMAGE, ROUTES } from '../seo.config.js';

const DIST = path.resolve('dist');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const abs = (p) => SITE_URL.replace(/\/$/, '') + p;

function jsonLd(r) {
  const org = { '@context': 'https://schema.org', '@type': 'Organization', name: SITE_NAME, url: abs('/'), logo: abs(OG_IMAGE) };
  const out = [org];
  if (r.path === '/') out.push({ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: abs('/') });
  if (r.path === '/products/') out.push({ '@context': 'https://schema.org', '@type': 'Product', name: 'PCOS Harmony', brand: { '@type': 'Brand', name: SITE_NAME }, description: r.description, image: abs(OG_IMAGE) });
  if (r.event) out.push({
    '@context': 'https://schema.org', '@type': 'Event', name: r.event.name, description: r.description,
    startDate: r.event.start, endDate: r.event.end, eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: { '@type': 'VirtualLocation', url: abs(r.path) },
    organizer: { '@type': 'Organization', name: SITE_NAME, url: abs('/') },
    performer: [{ '@type': 'Person', name: 'Aaron Thomas' }, { '@type': 'Person', name: 'David' }],
    offers: { '@type': 'Offer', price: r.event.price, priceCurrency: r.event.currency, availability: 'https://schema.org/InStock', url: abs(r.path) }
  });
  return out.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
}

function headTags(r) {
  return `
<base href="/">
<title>${esc(r.title)}</title>
<meta name="description" content="${esc(r.description)}">
<link rel="canonical" href="${abs(r.path)}">
<meta property="og:type" content="${r.event ? 'event' : 'website'}">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${esc(r.title)}">
<meta property="og:description" content="${esc(r.description)}">
<meta property="og:url" content="${abs(r.path)}">
<meta property="og:image" content="${abs(OG_IMAGE)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(r.title)}">
<meta name="twitter:description" content="${esc(r.description)}">
<meta name="twitter:image" content="${abs(OG_IMAGE)}">
${jsonLd(r)}
<script>window.__TRM_INITIAL_HASH=${JSON.stringify(r.hash || '')};</script>
<style>[data-ssr] *{opacity:1!important;visibility:visible!important;transform:none!important;animation:none!important;transition:none!important}</style>
<script>(function(){function done(){var s=document.querySelector('[data-ssr]');if(!s)return true;var live=document.querySelector('[data-screen-label]:not([data-ssr] [data-screen-label])');if(live){s.remove();return true}return false}var mo=new MutationObserver(function(){if(done())mo.disconnect()});document.addEventListener('DOMContentLoaded',function(){if(!done())mo.observe(document.body,{childList:true,subtree:true})});setTimeout(function(){var s=document.querySelector('[data-ssr]');s&&s.remove()},8000)})();</script>
`;
}

async function snapshot(page, url) {
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForSelector('[data-screen-label]', { timeout: 30000 });
  // Scroll through so scroll-triggered content is rendered, then back to top.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 1200));
  return page.evaluate(() => {
    const root = document.body.cloneNode(true);
    root.querySelectorAll('script, helmet, template, noscript, iframe').forEach((n) => n.remove());
    // Turn runtime tags into plain elements so they aren't re-processed on load.
    root.querySelectorAll('x-dc, x-import, dc-import, sc-if, sc-for').forEach((n) => {
      const d = document.createElement('div');
      for (const a of n.attributes) if (/^(style|class|id|data-screen-label)$/.test(a.name)) d.setAttribute(a.name, a.value);
      while (n.firstChild) d.appendChild(n.firstChild);
      n.replaceWith(d);
    });
    root.querySelectorAll('[data-cc-id],[data-dm-ref]').forEach((n) => { n.removeAttribute('data-cc-id'); n.removeAttribute('data-dm-ref'); });
    return root.innerHTML;
  });
}

const server = await preview({ preview: { port: 4179, strictPort: true, open: false } });
const base = 'http://localhost:4179/';
// Vercel's build image lacks Chrome's system libraries (libnss3 etc.), so use
// the self-contained @sparticuz/chromium build there; locally use Puppeteer's Chrome.
async function launchBrowser() {
  if (!process.env.VERCEL) return puppeteer.launch({ headless: 'new' });
  const { default: chromium } = await import('@sparticuz/chromium');
  return puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true });
}
const browser = await launchBrowser();
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

try {
  for (const r of ROUTES) {
    const srcFile = path.join(DIST, r.source);
    const src = await fs.readFile(srcFile, 'utf8');
    const url = base + encodeURI(r.source) + '?desktop' + (r.hash || '');
    process.stdout.write(`Pre-rendering ${r.path} … `);
    const body = await snapshot(page, url);
    let html = src
      .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
      .replace(/<meta name="robots" content="noindex">\s*/i, '')
      .replace('<head>', '<head>' + headTags(r))
      .replace('<body>', `<body>\n<div data-ssr="" aria-hidden="false">${body}</div>`);
    // Phone redirect keeps the route.
    html = html.replace(/location\.replace\('([^']+)'\+q\+location\.hash\)/, (m, t) => `location.replace('${t}'+q+(location.hash||window.__TRM_INITIAL_HASH||''))`);
    const outDir = path.join(DIST, r.path);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, 'index.html'), html);
    console.log('done');
  }
  const today = new Date().toISOString().slice(0, 10);
  const urls = ROUTES.map((r) => `  <url><loc>${abs(r.path)}</loc><lastmod>${today}</lastmod><priority>${r.priority}</priority></url>`).join('\n');
  await fs.writeFile(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  await fs.writeFile(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
  console.log('Wrote sitemap.xml and robots.txt');
} finally {
  await browser.close();
  await new Promise((r) => server.httpServer.close(r));
}
