// Edit SITE_URL to your live domain before building. Every page below is
// pre-rendered to static HTML at build time so search engines and link
// previews see the full content without running JavaScript.
export const SITE_URL = process.env.SITE_URL || 'https://therightmolecule.com';
export const SITE_NAME = 'The Right Molecule';
export const OG_IMAGE = '/assets/product/sachets-pair.png';

// hidden: true → page is switched off for now (SITE_FULL = false) and skipped when pre-rendering.
// '/' is the workshop (therightmolecule.com opens on it). Our Story lives at /story/.
export const ROUTES = [
  {
    path: '/', source: 'Webinar.dc.html', hash: '',
    title: 'Beyond the Period · InnerAtlas × Plyolife live workshop · 29 November',
    description: 'Is this normal, or have I just gotten used to it? 70 minutes on hormonal health and practical habits. Sunday 29 November, 6 PM IST, live online. From ₹138.',
    priority: '1.0',
    event: { name: 'You know what to do. This is why it’s hard to do it.', start: '2026-11-29T18:00:00+05:30', end: '2026-11-29T19:10:00+05:30', price: '138', currency: 'INR' }
  },
  {
    path: '/products/', hidden: true, source: 'The Right Molecule Website.dc.html', hash: '#/products',
    title: 'PMOS Harmony · 31-day supply · The Right Molecule',
    description: 'One sachet a day. Myo-inositol, D-chiro-inositol, chromium, L-carnitine and magnesium, formulated around the biology of PMOS.',
    priority: '0.9'
  },
  {
    path: '/science/', hidden: true, source: 'The Right Molecule Website.dc.html', hash: '#/science',
    title: 'Our Science · How PMOS works · The Right Molecule',
    description: 'How ovaries, insulin and stress signals interact in PMOS, and the research behind each molecule in PMOS Harmony.',
    priority: '0.8'
  },
  {
    path: '/story/', source: 'The Right Molecule Website.dc.html', hash: '#/story',
    title: 'Our Story · The Right Molecule',
    description: 'Why we started The Right Molecule and what we believe about women’s metabolic and hormonal health.',
    priority: '0.6'
  },
  {
    path: '/blog/', hidden: true, source: 'The Right Molecule Website.dc.html', hash: '#/blog',
    title: 'Blog · Notes on PMOS, nutrition and science · The Right Molecule',
    description: 'Notes on PMOS, nutrition and the science behind what we make.',
    priority: '0.6'
  },
  {
    path: '/legal/', source: 'Legal.dc.html', hash: '',
    title: 'Terms & Privacy · The Right Molecule',
    description: 'Terms & Conditions and Privacy Policy for The Right Molecule.',
    priority: '0.2'
  }
];
