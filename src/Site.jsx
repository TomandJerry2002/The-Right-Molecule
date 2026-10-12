/* global React */
// shared.jsx
const DS = window.TheRightMoleculeDesignSystem_d2cf6c;
window.ASSET = 'assets/';

// Scroll reveal hook — animation is applied by motion.js (GSAP). Without GSAP, content is simply visible.
function Reveal({ children, delay = 0, y, style, as = 'div', anim = 'reveal', draw = false, ...rest }) {
  const Tag = as;
  return <Tag {...rest} data-anim={anim} data-delay={delay} data-y={y} data-draw={draw ? '' : undefined} style={style}>{children}</Tag>;
}

// One masked headline line — motion.js slides [data-line-inner] up through the mask.
function Line({ children }) {
  return <span data-line="" style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.12em', marginBottom: '-0.12em' }}><span data-line-inner="" style={{ display: 'block' }}>{children}</span></span>;
}

const ASSET = 'assets/';
const inr = (n) => '₹' + n.toLocaleString('en-IN');
const PRODUCT = {
  name: 'PCOS', italic: 'Harmony', price: 1480, descriptor: 'Daily support for PCOS, built from the biology up',
  flavours: ['Passion Fruit'],
  ingredients: [
    { icon: 'network', name: 'Myo-Inositol', benefit: 'Promotes hormone balance', blurb: 'A naturally occurring compound found in fruit, beans and whole grains. Inositols act as messengers in insulin signalling, and myo-inositol is one of the most studied nutrients in women\'s hormonal health.' },
    { icon: 'refresh-ccw', name: 'D-Chiro-Inositol', benefit: 'Supports a steadier rhythm', blurb: 'The partner form of myo-inositol. The body converts between the two, and research usually looks at them together, in a set ratio, for their role in ovarian function and cycle regularity.' },
    { icon: 'leaf', name: 'Berberine', benefit: 'Helps your cells use energy and insulin more efficiently', blurb: 'A plant compound traditionally extracted from barberry and goldenseal. It has been studied for its role in glucose metabolism and how the body manages energy.' },
    { icon: 'sun', name: 'Vitamin D3 + K2', benefit: 'Supports bone & immune health', blurb: 'Vitamin D3 contributes to normal bones and immune function; vitamin K2 helps direct calcium to where the body needs it. Many women do not get enough vitamin D from sunlight alone.' },
  ],
};

// Shared overlay behaviour: Esc to close, Tab focus trap, scroll lock, focus restore.
function useOverlay(ref, active, onEsc) {
  const escRef = React.useRef(onEsc);
  escRef.current = onEsc;
  React.useEffect(() => {
    if (!active) return;
    const el = ref.current;
    const prev = document.activeElement;
    const sel = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';
    const focusables = () => Array.from(el.querySelectorAll(sel)).filter((n) => n.getClientRects().length);
    const t = setTimeout(() => { const f = focusables(); (f[0] || el).focus({ preventScroll: true }); }, 40);
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); escRef.current && escRef.current(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables(); if (!f.length) { e.preventDefault(); return; }
      const first = f[0], last = f[f.length - 1];
      if (!el.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    const html = document.documentElement, sw = window.innerWidth - html.clientWidth;
    const prevOv = html.style.overflow, prevPad = document.body.style.paddingRight;
    html.style.overflow = 'hidden'; if (sw > 0) document.body.style.paddingRight = sw + 'px';
    return () => { clearTimeout(t); document.removeEventListener('keydown', onKey); html.style.overflow = prevOv; document.body.style.paddingRight = prevPad; prev && prev.focus && prev.focus({ preventScroll: true }); };
  }, [active]);
}

const ingredientButton = { display: 'block', width: '100%', padding: 0, margin: 0, background: 'none', border: 0, textAlign: 'left', font: 'inherit', color: 'inherit', cursor: 'pointer' };



// Home.jsx
const BALANCE_GROUPS = [['01', 'Metabolic signalling', 'Myo-inositol · D-chiro-inositol · Chromium', 'Supporting insulin function.'], ['02', 'Cellular energy', 'L-carnitine · Magnesium', 'Supporting energy production.'], ['03', 'Antioxidant defence', 'NAC · Vitamin C · Selenium', 'Supporting cellular protection.'], ['04', 'Calm & relaxation', 'L-theanine · Magnesium · Vitamin B6', 'Supporting relaxation and nervous system function.']];
function Hero({ onShop, onTest }) {
  const { Eyebrow, Heading, Button, TextLink, StackedCaps } = DS;
  return (
    <section data-section="hero" style={{ position: 'relative', background: 'var(--bg-page)', overflow: 'hidden' }}>
      <img data-float="" data-parallax-y="-140" data-parallax-from="20" data-parallax-rot="-8" src={`${ASSET}brand/lineart-drop-petrol.png`} alt="" aria-hidden="true" style={{ position: 'absolute', left: '47%', bottom: 150, width: 30, opacity: 0.8, zIndex: 1, pointerEvents: 'none' }} />
      <div data-parallax-y="90" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 42% 60% at 72% 46%, var(--trm-ivory-50) 0%, rgba(250,247,241,0) 70%), radial-gradient(ellipse 30% 40% at 74% 58%, rgba(29,63,106,.07) 0%, rgba(29,63,106,0) 70%)' }}></div>
      <div style={{ position: 'relative', padding: 'clamp(40px,5vw,72px) var(--gutter) 190px', display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,.9fr) auto', gap: 'clamp(24px,4vw,64px)', alignItems: 'center' }}>
      <div style={{ gridColumn: 2, gridRow: 1, display: 'flex', justifyContent: 'center', transform: 'translateX(clamp(-64px, -4.5vw, -16px))' }}>
        <Reveal anim="sachets" data-tilt="" delay={250} style={{ position: 'relative', height: 'min(600px, 58vw)', aspectRatio: '754/1368' }}>
          <div data-parallax-y="-50" data-parallax-rot="2" style={{ position: 'absolute', inset: 0 }}><span style={{ position: 'absolute', height: '92%', aspectRatio: '372/1368', left: '46%', top: '6%', transform: 'rotate(5deg)', transformOrigin: 'bottom center' }}><img src={`${ASSET}product/sachet-back.png`} alt="" style={{ display: 'block', width: '100%', height: '100%' }} /><span data-shine="" aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(105deg, rgba(255,255,255,0) 40%, rgba(255,255,255,.7) 50%, rgba(255,255,255,0) 60%)', backgroundSize: '260% 100%', backgroundPosition: '130% 0', mixBlendMode: 'soft-light', WebkitMaskImage: `url(${ASSET}product/sachet-back.png)`, maskImage: `url(${ASSET}product/sachet-back.png)`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' }}></span></span></div>
          <div data-parallax-y="-110" data-parallax-rot="-1.5" style={{ position: 'absolute', inset: 0 }}>
            <span data-anim="sparkle" data-delay="1500" aria-hidden="true" style={{ position: 'absolute', left: '-7%', top: '31%', color: 'var(--trm-petrol)', zIndex: 2, pointerEvents: 'none' }}><DS.Icon name="sparkle" size={18} stroke={1} /></span>
            <span style={{ position: 'absolute', height: '100%', aspectRatio: '370/1368', left: '4%', top: 0, transform: 'rotate(-3deg)', transformOrigin: 'bottom center' }}><img src={`${ASSET}product/sachet-front.png`} alt="PCOS Harmony sachet" style={{ display: 'block', width: '100%', height: '100%', filter: 'drop-shadow(0 30px 40px rgba(6,48,63,.25))' }} /><span data-shine="" aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(105deg, rgba(255,255,255,0) 40%, rgba(255,255,255,.7) 50%, rgba(255,255,255,0) 60%)', backgroundSize: '260% 100%', backgroundPosition: '130% 0', mixBlendMode: 'soft-light', WebkitMaskImage: `url(${ASSET}product/sachet-front.png)`, maskImage: `url(${ASSET}product/sachet-front.png)`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' }}></span></span>
          </div>
          <span data-sheen="" aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', opacity: 0, mixBlendMode: 'soft-light', background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 30%), rgba(255,255,255,.75) 0%, rgba(255,255,255,0) 45%)' }}></span>
        </Reveal>
      </div>
        <div style={{ gridColumn: 1, gridRow: 1, maxWidth: 620 }}>
          <Reveal delay={120}><Heading as="h1" level="xl" style={{ margin: '0 0 28px', fontSize: 'clamp(40px,4.8vw,72px)', lineHeight: 1.02, letterSpacing: '-.01em' }}><Line>Designed around</Line><Line>the science of <em style={{ fontWeight: 400 }}>PCOS.</em></Line></Heading></Reveal>
          <Reveal delay={240}><p style={{ margin: 0, fontSize: 'var(--type-body-l)', fontWeight: 300, lineHeight: 1.6, color: 'var(--fg-2)', maxWidth: 440, textWrap: 'pretty' }}>A simple daily ritual with you in mind, made to complete the care you already have.</p></Reveal>
          <Reveal delay={360} style={{ display: 'flex', alignItems: 'center', gap: 32, marginTop: 36 }}>
            <Button onClick={onTest || onShop}>Discover your Biology</Button>
            <TextLink href="Our Science.dc.html" onClick={(e) => { e.preventDefault(); const M = window.TRMMotion; M && M.navigateTo ? M.navigateTo('Our Science.dc.html') : (window.location.href = 'Our Science.dc.html'); }}>Explore The Science</TextLink>
          </Reveal>
          </div>
        <div style={{ gridColumn: 3, gridRow: 1 }}><Reveal delay={480}><StackedCaps size={12} rule lines={['Balance', 'begins at', 'the cellular', 'level.']} /></Reveal></div>
      </div>
      <svg data-wave="" viewBox="0 0 1440 140" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, right: 0, bottom: -1, width: '100%', height: 140, display: 'block' }}><path d="M0 60 C 320 150, 760 150, 1060 90 S 1380 20, 1440 30 L1440 140 L0 140 Z" fill="#0B4458"></path></svg>
    </section>
  );
}

function TrustBand() {
  const { TrustPoint, Icon } = DS;
  const pts = [['search', 'Entire Ingredient\nTransparency', 'Every Ingredient. Every amount. Clearly Disclosed'], ['flask-conical', 'Evidence,\nClearly Explained.', 'We distinguish established evidence from emerging research'], ['shield-check', 'Designed around\nPCOS Biology', 'Purpose-built nutritional support, informed by the biology of PCOS']];
  return (
    <section style={{ background: 'var(--bg-inverse)', padding: '8px var(--gutter) 44px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 24 }}>
        {pts.map(([i, t, s], k) => <Reveal key={i} delay={k * 70} draw style={{ borderLeft: k ? '1px solid var(--border-on-inverse)' : 0, paddingLeft: k ? 28 : 0 }}><TrustPoint icon={i} title={t} subtitle={s} /></Reveal>)}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, margin: '40px auto 22px', maxWidth: 520, color: 'var(--fg-on-inverse-2)' }}>
        <span data-rule="" style={{ flex: 1, height: 1, background: 'var(--border-on-inverse)' }}></span><span data-anim="sparkle" data-delay="700" style={{ display: 'inline-flex' }}><Icon name="moon-star" size={18} stroke={1} /></span><span data-rule="" data-rule-delay="0.5" style={{ flex: 1, height: 1, background: 'var(--border-on-inverse)' }}></span>
      </div>
      <p style={{ margin: 0, textAlign: 'center', fontSize: 12, letterSpacing: '.42em', textTransform: 'uppercase', color: 'var(--fg-on-inverse)' }}>Nutrition. Rooted in science.</p>
    </section>
  );
}

function BalanceSection({ onShop, onIngredient }) {
  const { Eyebrow, Heading, Button, IngredientItem } = DS;
  return (
    <div data-pin="balance">
    <section data-pin-section="" data-crossfade="from-dark" style={{ position: 'relative', background: 'var(--bg-page)', padding: 'max(var(--section-y), 128px) var(--gutter) var(--section-y)', minHeight: '100vh', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,.8fr) minmax(0,1fr)', gap: 48, alignItems: 'center', overflow: 'hidden' }}>
      <Reveal>
        <Heading level="l" style={{ margin: '0 0 22px' }}><Line>Built around</Line><Line>how PCOS</Line><Line><em style={{ fontWeight: 400 }}>actually works.</em></Line></Heading>
        <p style={{ margin: '0 0 32px', fontSize: 'var(--type-body)', fontWeight: 300, lineHeight: 'var(--leading-body)', color: 'var(--fg-2)', maxWidth: 380, textWrap: 'pretty' }}>PCOS isn’t one thing. It’s how your ovaries, insulin and stress signals talk to each other. Harmony is designed with that conversation in mind, in one simple daily ritual.</p>
        <Button onClick={onShop}>Be Part of Our Beginning</Button>
      </Reveal>
      <Reveal delay={150} y={30} style={{ justifySelf: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', width: 360, height: 360, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'radial-gradient(circle, var(--trm-ivory-50) 0%, rgba(250,247,241,0) 70%)' }}></div>
        <div data-flip="" data-tilt="" style={{ position: 'relative', height: 'min(560px, 70vw, calc(100vh - 200px))', aspectRatio: '370/1368', perspective: '1400px', transformStyle: 'preserve-3d' }}>
          <span data-flip-shadow="" aria-hidden="true" style={{ position: 'absolute', left: '-14%', right: '-14%', bottom: '-3.5%', height: '6%', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(6,48,63,.34) 0%, rgba(6,48,63,0) 70%)', pointerEvents: 'none' }}></span>
          <span data-sheen="" aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', opacity: 0, mixBlendMode: 'soft-light', background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 30%), rgba(255,255,255,.75) 0%, rgba(255,255,255,0) 45%)' }}></span>
          <div data-flip-stage="" style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}>
            <div data-flip-card="" style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}>
              <div data-flip-front="" style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(5px)' }}>
                <img src={`${ASSET}product/sachet-front.png`} alt="PCOS Harmony sachet" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                <span data-face-shade="" aria-hidden="true" style={{ position: 'absolute', inset: 0, background: '#04161D', opacity: 0, pointerEvents: 'none', WebkitMaskImage: `url(${ASSET}product/sachet-front.png)`, maskImage: `url(${ASSET}product/sachet-front.png)`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' }}></span>
              </div>
              <span data-flip-edge="" aria-hidden="true" style={{ position: 'absolute', top: '4%', bottom: '4%', left: 'calc(9% - 5px)', width: 10, transform: 'rotateY(90deg)', background: 'linear-gradient(180deg,#0B4A5E 0%,#06384B 45%,#1D3F6A 74%,#2C1B3A 100%)' }}></span>
              <span data-flip-edge="" aria-hidden="true" style={{ position: 'absolute', top: '4%', bottom: '4%', right: 'calc(9% - 5px)', width: 10, transform: 'rotateY(90deg)', background: 'linear-gradient(180deg,#0B4A5E 0%,#06384B 45%,#1D3F6A 74%,#2C1B3A 100%)' }}></span>
              <div data-flip-back="" aria-hidden="true" style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(5px)' }}>
                <img src={`${ASSET}product/sachet-back.png`} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                {[36.2, 42.7, 49.2, 55.7].map((t, k) => <span key={k} data-glow={k} style={{ position: 'absolute', left: '12%', width: '80%', top: `${t - 3.4}%`, height: '6.8%', background: 'radial-gradient(ellipse at 22% 50%, rgba(236,226,204,.6) 0%, rgba(236,226,204,.18) 42%, rgba(236,226,204,0) 72%)', mixBlendMode: 'screen', opacity: 0, pointerEvents: 'none' }}></span>)}
                <span data-face-shade="" aria-hidden="true" style={{ position: 'absolute', inset: 0, background: '#04161D', opacity: 0, pointerEvents: 'none', WebkitMaskImage: `url(${ASSET}product/sachet-back.png)`, maskImage: `url(${ASSET}product/sachet-back.png)`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' }}></span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {BALANCE_GROUPS.map(([no, t, ing, d]) => <div key={no} data-pin-item="" style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
          <span style={{ flex: 'none', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 20, color: 'var(--fg-accent)', fontVariantNumeric: 'tabular-nums' }}>{no}</span>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.5 }}>
            <div style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--fg-1)' }}>{t}</div>
            <div style={{ marginTop: 4, color: 'var(--fg-1)' }}>{ing}</div>
            <div style={{ color: 'var(--fg-2)', fontWeight: 300 }}>{d}</div>
          </div>
        </div>)}
        <Reveal delay={450}><div data-rule="" style={{ width: 120, height: 1, background: 'var(--border-strong)', margin: '6px 0 18px' }}></div><p style={{ margin: 0, fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'var(--type-quote)', lineHeight: 1.3 }}>Built with you in mind,<br />from the first molecule.</p></Reveal>
      </div>
    </section>
    </div>
  );
}

function PhilosophySplit() {
  const { Eyebrow, Heading, TextLink } = DS;
  return (
    <section id="science" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--bg-page)' }}>
      <img data-float="" data-parallax-y="-90" data-parallax-from="60" data-parallax-rot="5" src={`${ASSET}brand/lineart-frond-petrol.png`} alt="" aria-hidden="true" style={{ position: 'absolute', right: 'calc(var(--gutter) * .6)', top: -150, width: 70, opacity: 0.7, zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', height: 'clamp(420px,46vw,560px)', overflow: 'hidden', background: 'radial-gradient(ellipse 55% 60% at 50% 50%, var(--trm-ivory-50) 0%, var(--bg-sunken) 80%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '36px 0' }}>
        <svg data-orbit="" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '50%', width: '78%', height: '78%', transform: 'translate(-50%,-50%)', overflow: 'visible', pointerEvents: 'none' }}>
          <circle data-orbit-ring="" cx="50" cy="50" r="48" fill="none" stroke="#0B4458" strokeOpacity="0.22" strokeWidth="0.25" vectorEffect="non-scaling-stroke" transform="rotate(-90 50 50)"></circle>
          <g data-orbit-dot="" style={{ transformOrigin: '50px 50px' }}><circle cx="50" cy="2" r="0.9" fill="#0B4458"></circle></g>
        </svg>
        <div data-zoom="" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4%' }}>
          <span data-split="left" style={{ position: 'relative', display: 'block', height: '100%', transform: 'rotate(-2deg)' }}><img src={`${ASSET}product/sachet-front.png`} alt="PCOS Harmony front" style={{ height: '100%', width: 'auto', display: 'block' }} /><span data-sweep="" aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(255,255,255,0) 38%, rgba(255,255,255,.55) 50%, rgba(255,255,255,0) 62%)', backgroundSize: '250% 100%', backgroundPosition: '130% 0', mixBlendMode: 'soft-light', WebkitMaskImage: `url(${ASSET}product/sachet-front.png)`, maskImage: `url(${ASSET}product/sachet-front.png)`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%', pointerEvents: 'none' }}></span></span>
          <span data-split="right" style={{ position: 'relative', display: 'block', height: '92%', transform: 'rotate(3deg)' }}><img src={`${ASSET}product/sachet-back.png`} alt="PCOS Harmony back" style={{ height: '100%', width: 'auto', display: 'block' }} /><span data-sweep="" aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(255,255,255,0) 38%, rgba(255,255,255,.55) 50%, rgba(255,255,255,0) 62%)', backgroundSize: '250% 100%', backgroundPosition: '130% 0', mixBlendMode: 'soft-light', WebkitMaskImage: `url(${ASSET}product/sachet-back.png)`, maskImage: `url(${ASSET}product/sachet-back.png)`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%', pointerEvents: 'none' }}></span></span>
        </div>
      </div>
      <Reveal style={{ padding: 'var(--section-y) var(--gutter)', alignSelf: 'center' }}>
        <Heading level="m" style={{ margin: '0 0 24px' }}><Line>Nutrition</Line><Line><em style={{ fontWeight: 400 }}>with intention.</em></Line></Heading>
        <p style={{ margin: '0 0 28px', fontSize: 'var(--type-body)', fontWeight: 300, lineHeight: 'var(--leading-body)', color: 'var(--fg-2)', maxWidth: 400 }}>We bring scientific thinking and purposeful formulation together to rethink nutritional solutions. PCOS Harmony is where our story begins.</p>
        <TextLink arrow href="Our Science.dc.html" onClick={(e) => { e.preventDefault(); const M = window.TRMMotion; M && M.navigateTo ? M.navigateTo('Our Science.dc.html') : (window.location.href = 'Our Science.dc.html'); }}>Our Science</TextLink>
      </Reveal>
    </section>
  );
}

function WomensHealthBanner({ onShop }) {
  const { Eyebrow, Button } = DS;
  return (
    <section data-crossfade="to-dark" style={{ position: 'relative', background: 'var(--gradient-sachet-diag)', overflow: 'hidden' }}>
      <div data-parallax-y="36" data-parallax-from="-36" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '32%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <div data-art="" style={{ position: 'relative', height: '100%', maxHeight: 470, aspectRatio: '262/470', maxWidth: '100%', WebkitMaskImage: 'linear-gradient(90deg,transparent 0%,#000 40%)', maskImage: 'linear-gradient(90deg,transparent 0%,#000 40%)' }}>
          <img src={`${ASSET}product/detail-art.jpg`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '60% 45%', display: 'block' }} />
          <span data-shimmer="" aria-hidden="true" style={{ position: 'absolute', left: '11%', top: '43%', width: 14, height: 14, margin: '-7px 0 0 -7px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.95) 0%, rgba(255,255,255,0) 70%)', mixBlendMode: 'screen', opacity: 0, pointerEvents: 'none' }}></span>
          <span data-shimmer="" aria-hidden="true" style={{ position: 'absolute', left: '33.5%', top: '64.5%', width: 14, height: 14, margin: '-7px 0 0 -7px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.95) 0%, rgba(255,255,255,0) 70%)', mixBlendMode: 'screen', opacity: 0, pointerEvents: 'none' }}></span>
        </div>
      </div>
      <div data-veil="" aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--bg-page)', opacity: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'relative', padding: '88px var(--gutter)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,.8fr) minmax(0,.55fr)', gap: 48, alignItems: 'center' }}>
        <Reveal>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'var(--type-display-m)', lineHeight: 1.12, color: 'var(--fg-on-inverse)' }}><Line>More than a</Line><Line>supplement. A more</Line><Line>balanced you.</Line></h2>
        </Reveal>
        <Reveal delay={150} style={{ justifySelf: 'start', maxWidth: 340 }}>
          <p style={{ margin: '0 0 26px', fontSize: 14, fontWeight: 300, lineHeight: 1.65, color: 'var(--fg-on-inverse)' }}>At The Right Molecule, we believe in science that supports the real you — through every phase, every cycle, every goal.</p>
          <Button variant="light" size="sm" onClick={onShop}>Be Part of Our Beginning</Button>
        </Reveal>
      </div>
    </section>
  );
}

function Stories() {
  const { Eyebrow, Heading, TestimonialSlider } = DS;
  const items = [
    { quote: 'I feel more in control of my cycle and have more energy throughout the day. Finally, something that understands what women need.', author: 'A, 28' },
    { quote: 'It fits into my morning without thinking about it. Three months in, my cycle feels more predictable.', author: 'M, 31' },
    { quote: 'Clear about what is in it and why. That matters to me.', author: 'S, 34' },
  ];
  return (
    <section data-crossfade="from-dark" style={{ position: 'relative', background: 'var(--bg-page)', padding: '72px var(--gutter)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.3fr)', gap: 48, alignItems: 'center' }}>
      <Reveal>
        <Heading level="s" style={{ margin: '0 0 14px' }}><Line>Women Like You</Line></Heading>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 300, color: 'var(--fg-2)' }}>Real journeys. Real results.</p>
      </Reveal>
      <Reveal delay={150}><TestimonialSlider items={items} autoplay={7000} /></Reveal>
      <img data-float="" data-parallax-y="-70" data-parallax-from="40" data-parallax-rot="-6" src={`${ASSET}brand/lineart-fan-petrol.png`} alt="" aria-hidden="true" style={{ position: 'absolute', left: 'calc(var(--gutter) * .5)', bottom: -70, width: 96, opacity: 0.75, zIndex: 2, pointerEvents: 'none' }} />
      <img data-float="" data-parallax-y="-120" data-parallax-from="30" src={`${ASSET}brand/lineart-drop2-petrol.png`} alt="" aria-hidden="true" style={{ position: 'absolute', left: 'calc(var(--gutter) * .5 + 104px)', bottom: -34, width: 26, opacity: 0.7, zIndex: 2, pointerEvents: 'none' }} />
    </section>
  );
}

function Newsletter() {
  const { Eyebrow, Heading, EmailSignup } = DS;
  return (
    <section style={{ position: 'relative', background: 'var(--bg-page)', padding: '72px var(--gutter)', overflow: 'hidden' }}>
      
      <Reveal style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Heading level="s" align="center" style={{ margin: '0 0 12px' }}><Line>Wellness Insights. Straight to You.</Line></Heading>
        <p style={{ margin: '0 0 28px', fontSize: 14, fontWeight: 300, color: 'var(--fg-2)' }}>Be the first to know about new products, expert advice and exclusive offers.</p>
        <EmailSignup />
      </Reveal>
    </section>
  );
}

function AboutScreen() {
  const { Eyebrow, Heading } = DS;
  const P = { margin: 0, fontSize: 17, fontWeight: 300, lineHeight: 1.7, color: 'var(--fg-2)', textWrap: 'pretty' };
  return (
    <main style={{ background: 'var(--bg-page)' }}>
      <section style={{ padding: 'max(var(--section-y), 96px) var(--gutter)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'start', maxWidth: 1240, margin: '0 auto' }}>
        <Reveal style={{ position: 'sticky', top: 128 }}>
          <div style={{ aspectRatio: '4 / 5', overflow: 'hidden', background: 'var(--trm-ivory-200)' }}>
            <img src={ASSET + 'brand/aaron-portrait.png'} alt="Aaron Thomas" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', display: 'block' }} />
          </div>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 600 }}>
          <Reveal><Eyebrow>About</Eyebrow></Reveal>
          <Reveal delay={80}><Heading as="h1" level="xl" style={{ margin: '0 0 14px' }}><Line>Aaron</Line><Line><em style={{ fontWeight: 400 }}>Thomas.</em></Line></Heading></Reveal>
          <Reveal delay={140}><p style={{ ...P, fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.4, color: 'var(--fg-1)' }}>Aaron’s background is in molecular biology, with experience spanning scientific research, entrepreneurship, international clients, and European institutions. His work has largely focused on the point where an idea has to become something real understood by the right people, positioned clearly, and turned into something commercially viable.</p></Reveal>
          <Reveal delay={200}><div style={{ width: 120, height: 1, background: 'var(--border-strong)', margin: '10px 0' }}></div></Reveal>
          <Reveal delay={220}><p style={P}>He has built and explored ventures in Europe, worked with international clients, and pitched to European institutions. These experiences have given him a practical understanding of how ideas move from technical or scientific value to something customers can understand, trust, and ultimately pay for.</p></Reveal>
          <Reveal delay={260}><p style={P}>At Venturian Labs, Aaron works alongside Emil on the commercial side of the problem — helping companies clarify the value behind their vision, understand their customers and markets, and translate that understanding into practical commercial propositions.</p></Reveal>
          <Reveal delay={300}><p style={P}>His work spans positioning, customer understanding, go-to-market strategy, business development, and the systems required to execute and grow.</p></Reveal>
          <Reveal delay={340}><p style={P}>Aaron approaches growth through a systems-thinking lens, looking at how positioning, sales, technology, operations, and customer needs connect rather than treating them as separate problems.</p></Reveal>
        </div>
      </section>
    </main>
  );
}

function HomeScreen({ onShop, onIngredient, onTest }) {
  return <main><Hero onShop={onShop} onTest={onTest} /><TrustBand /><BalanceSection onShop={onShop} onIngredient={onIngredient} /><PhilosophySplit /><WomensHealthBanner onShop={onShop} /><Newsletter /></main>;
}



// Product.jsx
function useCountUp(value, ms = 520) {
  const [n, setN] = React.useState(value);
  const from = React.useRef(value);
  React.useEffect(() => {
    const start = performance.now(), a = from.current, b = value;
    if (a === b || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { from.current = b; setN(b); return; }
    let raf;
    const tick = (t) => { const p = Math.min(1, (t - start) / ms), e = 1 - Math.pow(1 - p, 3); setN(Math.round(a + (b - a) * e)); if (p < 1) raf = requestAnimationFrame(tick); else from.current = b; };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); from.current = b; };
  }, [value]);
  return n;
}

function ProductScreen({ onJoin, onNavigate, onIngredient }) {
  const { Eyebrow, Heading, Button, QuantityStepper, IngredientItem, Icon, StackedCaps } = DS;
  const shots = [['sachets-pair.png', 'contain'], ['sachet-front.png', 'contain'], ['sachet-back.png', 'contain'], ['detail-label.jpg', 'cover'], ['detail-art.jpg', 'cover'], ['detail-ingredients.jpg', 'cover']];
  const [shot, setShot] = React.useState(0);
  const [dir, setDir] = React.useState(1);
  const go = (k) => { const n = (k + shots.length) % shots.length; setDir(k > shot || (shot === shots.length - 1 && n === 0) ? 1 : -1); setShot(n); };
  const swipe = React.useRef(null);
  const flavourRefs = React.useRef([]);
  const flavourRow = React.useRef(null);
  const [pill, setPill] = React.useState(null);
  const cta = React.useRef(null);
  const [barOn, setBarOn] = React.useState(false);
  const [flavour, setFlavour] = React.useState(PRODUCT.flavours[0]);
  const [qty, setQty] = React.useState(1);
  React.useLayoutEffect(() => {
    const measure = () => { const b = flavourRefs.current[PRODUCT.flavours.indexOf(flavour)]; if (b && b.offsetWidth) setPill({ left: b.offsetLeft, width: b.offsetWidth }); };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) flavourRefs.current.forEach((b) => b && ro.observe(b));
    window.addEventListener('resize', measure); document.fonts && document.fonts.ready.then(measure);
    return () => { ro && ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [flavour]);
  React.useEffect(() => {
    const el = cta.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setBarOn(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const [open, setOpen] = React.useState('use');
  const acc = [
    ['use', 'Suggested use', 'Mix 1 sachet in water or your favourite beverage. Take once daily, or as directed by your healthcare professional.'],
    ['store', 'Storage', 'Keep in a cool, dry place. Do not use if seal is broken.'],
  ];
  const small = { fontSize: 12, color: 'var(--fg-2)' };
  return (
    <main style={{ background: 'var(--bg-page)' }}>
      <div style={{ padding: '8px var(--gutter) 0', display: 'flex', gap: 10, ...small }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('Home'); }} style={{ color: 'var(--fg-2)' }}>Home</a><span>/</span><span>Waitlist</span><span>/</span><span style={{ color: 'var(--fg-1)' }}>PCOS Harmony</span>
      </div>
      <section style={{ padding: '32px var(--gutter) var(--section-y)', display: 'grid', gridTemplateColumns: '88px minmax(0,1.1fr) minmax(0,1fr)', gap: 32, alignItems: 'start' }}>
        <Reveal anim="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {shots.map(([s, p], k) => <button key={s} onClick={() => go(k)} aria-label={`View image ${k + 1}`} style={{ padding: 0, border: `1px solid ${k === shot ? 'var(--fg-1)' : 'transparent'}`, background: 'none', cursor: 'pointer', aspectRatio: '4/5', overflow: 'hidden' }}><img src={`${ASSET}product/${s}`} alt="" style={{ width: '100%', height: '100%', objectFit: p, padding: p === 'contain' ? 6 : 0, display: 'block', background: 'var(--bg-sunken)' }} /></button>)}
        </Reveal>
        <div data-tilt="" data-tilt-max="4" data-fly-src="" tabIndex={0} aria-label="Product gallery, use arrow keys" onKeyDown={(e) => { if (e.key === 'ArrowRight') go(shot + 1); if (e.key === 'ArrowLeft') go(shot - 1); }} onPointerDown={(e) => { swipe.current = e.clientX; }} onPointerUp={(e) => { if (swipe.current == null) return; const dx = e.clientX - swipe.current; swipe.current = null; if (Math.abs(dx) > 40) go(shot + (dx < 0 ? 1 : -1)); }} style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: 'var(--bg-sunken)', outline: 'none', touchAction: 'pan-y' }}>
          <span data-sheen="" aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', opacity: 0, mixBlendMode: 'soft-light', background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 30%), rgba(255,255,255,.75) 0%, rgba(255,255,255,0) 45%)' }}></span>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 55% at 50% 48%, var(--trm-ivory-50) 0%, var(--bg-sunken) 75%)' }}></div><img key={shot} src={`${ASSET}product/${shots[shot][0]}`} alt="PCOS Harmony" style={{ position: 'relative', width: '100%', height: '100%', objectFit: shots[shot][1], padding: shots[shot][1] === 'contain' ? '6% 10%' : 0, animation: `${dir > 0 ? 'pdpInR' : 'pdpInL'} 700ms var(--ease-out)`, pointerEvents: 'none', userSelect: 'none' }} draggable={false} />
          <div style={{ position: 'absolute', left: 20, right: 20, bottom: 18, zIndex: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', pointerEvents: 'none' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: '.18em', color: 'var(--fg-2)' }}>
              <span key={shot} style={{ display: 'inline-block', color: 'var(--fg-1)', animation: 'pdpNum 500ms var(--ease-out)' }}>{String(shot + 1).padStart(2, '0')}</span>
              <span style={{ position: 'relative', width: 48, height: 1, background: 'var(--border-strong)', overflow: 'hidden' }}><span style={{ position: 'absolute', inset: 0, background: 'var(--fg-1)', transformOrigin: 'left', transform: `scaleX(${(shot + 1) / shots.length})`, transition: 'transform 600ms var(--ease-out)' }}></span></span>
              <span>{String(shots.length).padStart(2, '0')}</span>
            </span>
            <span style={{ display: 'flex', gap: 8, pointerEvents: 'auto' }}>
              {[['chevron-left', -1, 'Previous image'], ['chevron-right', 1, 'Next image']].map(([ic, d, l]) => <button key={ic} type="button" aria-label={l} onClick={(e) => { e.stopPropagation(); go(shot + d); }} style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--border-strong)', background: 'rgba(250,247,241,.8)', color: 'var(--fg-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon name={ic} size={16} stroke={1.2} /></button>)}
            </span>
          </div>
        </div>
        <Reveal style={{ paddingTop: 12, maxWidth: 440 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14, fontSize: 11, letterSpacing: '.18em', whiteSpace: 'nowrap', maxWidth: '100%', textTransform: 'uppercase', color: 'var(--fg-1)' }}>The Right Molecule</span>
          <Heading as="h1" level="l" style={{ margin: '0 0 14px' }}><Line>PCOS <em style={{ fontWeight: 400 }}>Harmony</em></Line></Heading>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 300, lineHeight: 1.65, color: 'var(--fg-2)' }}>A daily nutritional formula designed around the biology of PCOS.</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, margin: '26px 0' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 30, fontWeight: 500 }}>{inr(PRODUCT.price)}</span>
            <span style={{ ...small, fontSize: 14 }}>31-day supply</span>
          </div>
          <p style={{ ...small, fontSize: 13, margin: '-14px 0 26px' }}>Just ₹{(PRODUCT.price / 31).toFixed(2)} per day · One sachet a day</p>
          <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 12 }}>Flavour</div>
          <div ref={flavourRow} role="radiogroup" aria-label="Flavour" style={{ position: 'relative', display: 'flex', gap: 10, marginBottom: 28 }}>
            {pill && pill.width > 0 && <span aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: pill.left, width: pill.width, background: 'var(--fg-1)', borderRadius: 'var(--radius-1)', transition: 'left 460ms var(--ease-out), width 460ms var(--ease-out)' }}></span>}
            {PRODUCT.flavours.map((f, k) => <button key={f} ref={(el) => { flavourRefs.current[k] = el; }} role="radio" aria-checked={f === flavour} onClick={() => setFlavour(f)} style={{ position: 'relative', flex: 'none', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)', fontSize: 13, padding: '10px 16px', borderRadius: 'var(--radius-1)', cursor: 'pointer', background: (!pill || !pill.width) && f === flavour ? 'var(--fg-1)' : 'transparent', color: f === flavour ? 'var(--trm-ivory-50)' : 'var(--fg-1)', border: '1px solid var(--border-strong)', transition: 'color 300ms ease 80ms' }}>{f}</button>)}
          </div>
          <div ref={cta}>
            <Button fullWidth onClick={onJoin}>Be Part of Our Beginning</Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 16, flexWrap: 'wrap', ...small }}>
                        <span style={{ width: '100%', textAlign: 'center' }}>Register your interest · No payment required</span>
          </div>
          <div style={{ marginTop: 36, borderTop: '1px solid var(--border-hairline)' }}>
            {acc.map(([id, t, body]) => (
              <div key={id} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
                <button onClick={() => setOpen(open === id ? null : id)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', background: 'none', border: 0, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-1)', letterSpacing: '.02em' }}>{t}<Icon name={open === id ? 'minus' : 'plus'} size={14} /></button>
                <div style={{ maxHeight: open === id ? 120 : 0, overflow: 'hidden', transition: 'max-height var(--dur-base) var(--ease-soft)' }}><p style={{ margin: '0 0 18px', fontSize: 14, fontWeight: 300, lineHeight: 1.65, color: 'var(--fg-2)' }}>{body}</p></div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
      <section style={{ padding: '0 var(--gutter) var(--section-y)', background: 'var(--bg-page)' }}>
        <Reveal style={{ marginBottom: 48 }}>
          <Heading level="s" style={{ margin: 0 }}><Line>Simple by design.</Line><Line><em style={{ fontWeight: 400 }}>One daily ritual.</em></Line></Heading>
        </Reveal>
        <div style={{ position: 'relative' }}>
          <div data-rule="" style={{ position: 'absolute', left: 0, right: 0, top: 22, height: 1, background: 'var(--border-strong)' }}></div>
          <Reveal anim="stagger" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 32 }}>
            {[['01', 'Mix one sachet', 'Mix with water or your favourite beverage.'], ['02', 'Make it daily', 'Take once daily, as directed on the label.'], ['03', 'Store with care', 'Keep in a cool, dry place.']].map(([n, t, b]) => (
              <div key={n}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '50%', background: 'var(--bg-page)', border: '1px solid var(--border-strong)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--fg-1)' }}>{n}</span>
                <div style={{ marginTop: 20, fontSize: 15, color: 'var(--fg-1)' }}>{t}</div>
                <p style={{ margin: '6px 0 0', fontSize: 14, fontWeight: 300, lineHeight: 1.6, color: 'var(--fg-2)', maxWidth: 280 }}>{b}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <section style={{ background: 'var(--gradient-sachet-diag)', padding: 'var(--section-y) var(--gutter)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)', gap: 64, alignItems: 'center' }}>
        <Reveal>
          <Heading level="m" inverse style={{ margin: '0 0 28px' }}><Line>Four pillars.</Line><Line><em style={{ fontWeight: 400 }}>One daily ritual.</em></Line></Heading>
          <StackedCaps inverse size={12} lines={['Science', 'Nature', 'Balance']} rule />
        </Reveal>
        <Reveal anim="stagger" draw style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 0, borderTop: '1px solid var(--border-on-inverse)', borderBottom: '1px solid var(--border-on-inverse)' }}>
          {BALANCE_GROUPS.map(([no, t, ing], k) => <div key={no} style={{ position: 'relative', padding: '30px 28px 32px', borderLeft: k % 2 ? '1px solid var(--border-on-inverse)' : 0, borderTop: k > 1 ? '1px solid var(--border-on-inverse)' : 0, display: 'flex', flexDirection: 'column', gap: 16 }}><div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}><div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px,2vw,26px)', fontWeight: 500, lineHeight: 1.15, color: 'var(--fg-on-inverse)' }}>{t}</div><span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15, color: 'var(--fg-line-art)', fontVariantNumeric: 'tabular-nums' }}>{no}</span></div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{ing.split(' · ').map((x) => <span key={x} style={{ padding: '6px 12px', border: '1px solid var(--border-on-inverse)', borderRadius: 999, fontSize: 12, letterSpacing: '.04em', color: 'var(--fg-on-inverse)', whiteSpace: 'nowrap' }}>{x}</span>)}</div></div>)}
        </Reveal>
      </section>
      <div aria-hidden={!barOn} style={{ position: 'fixed', left: '50%', bottom: 20, zIndex: 30, width: 'min(640px, calc(100% - 140px))', transform: `translate(-50%, ${barOn ? '0' : '140%'})`, visibility: barOn ? 'visible' : 'hidden', transition: barOn ? 'transform 520ms var(--ease-out), visibility 0s' : 'transform 420ms var(--ease-soft), visibility 0s linear 420ms', display: 'flex', alignItems: 'center', gap: 14, padding: '8px 8px 8px 12px', background: 'rgba(250,247,241,.9)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-2)', boxShadow: 'var(--shadow-float)' }}>
        <img src={`${ASSET}product/sachet-front.png`} alt="" style={{ height: 48, width: 'auto' }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 500, lineHeight: 1.1 }}>PCOS <em style={{ fontWeight: 400 }}>Harmony</em></div>
          <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{flavour} · 31 sachets · launching soon</div>
        </div>
        <span style={{ fontSize: 15, fontVariantNumeric: 'tabular-nums' }}>{inr(PRODUCT.price)}</span>
        <Button size="sm" onClick={onJoin}>Be Part of Our Beginning</Button>
      </div>
      <style>{'@keyframes pdpInR{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:none}}@keyframes pdpInL{from{opacity:0;transform:translateX(-28px)}to{opacity:1;transform:none}}@keyframes pdpNum{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion: reduce){[style*="pdpIn"],[style*="pdpNum"]{animation:none!important}}'}</style>
    </main>
  );
}



// BagDrawer.jsx
function BagDrawer({ open, items, onClose, onQty, onRemove }) {
  const { Button, QuantityStepper, Icon, Heading } = DS;
  const subtotal = items.reduce((s, i) => s + i.qty * PRODUCT.price, 0);
  const panel = React.useRef(null);
  const list = React.useRef(null);
  useOverlay(panel, open, onClose);
  React.useEffect(() => { if (open && window.TRMMotion && window.TRMMotion.drawerItems) window.TRMMotion.drawerItems(list.current); }, [open]);
  return (
    <div aria-hidden={!open} style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: open ? 'auto' : 'none', visibility: open ? 'visible' : 'hidden', transition: open ? 'visibility 0s' : 'visibility 0s linear 520ms' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(15,40,44,.32)', opacity: open ? 1 : 0, transition: 'opacity var(--dur-base) var(--ease-soft)' }}></div>
      <aside ref={panel} role="dialog" aria-modal="true" aria-label="Your bag" tabIndex={-1} style={{ outline: 'none', position: 'absolute', top: 0, right: 0, bottom: 0, width: 'min(420px,100%)', background: 'var(--bg-page-raised)', boxShadow: 'var(--shadow-float)', transform: open ? 'none' : 'translateX(100%)', transition: 'transform 520ms var(--ease-out)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '26px 28px', borderBottom: '1px solid var(--border-hairline)' }}>
          <Heading level="s" as="h2" style={{ fontSize: 26 }}>Your bag</Heading>
          <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--fg-1)' }}><Icon name="x" size={20} /></button>
        </div>
        <div ref={list} style={{ flex: 1, overflow: 'auto', padding: '8px 28px' }}>
          {items.length === 0 && <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 20, color: 'var(--fg-2)', marginTop: 32 }}>Your bag is empty.</p>}
          {items.map((it, k) => (
            <div key={k} style={{ display: 'grid', gridTemplateColumns: '72px 1fr auto', gap: 16, padding: '20px 0', borderBottom: '1px solid var(--border-hairline)' }}>
              <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: 'var(--bg-sunken)', padding: 6 }}><img src={`${ASSET}product/sachet-front.png`} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 500 }}>PCOS <em style={{ fontWeight: 400 }}>Harmony</em></span>
                <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>{it.flavour} · 31 sachets</span>
                <div style={{ marginTop: 6 }}><QuantityStepper size="sm" value={it.qty} onChange={(v) => onQty(k, v)} /></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14 }}>{inr(it.qty * PRODUCT.price)}</span>
                <button onClick={() => onRemove(k)} style={{ background: 'none', border: 0, padding: 0, fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-3)', textDecoration: 'underline', cursor: 'pointer' }}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '24px 28px', borderTop: '1px solid var(--border-hairline)', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}><span>Subtotal</span><span>{inr(subtotal)}</span></div>
          <Button fullWidth disabled={!items.length}>Checkout</Button>
        </div>
      </aside>
    </div>
  );
}



// IngredientModal.jsx
function IngredientModal({ item, onClose }) {
  const { IconBadge, Eyebrow, Icon } = DS;
  const root = React.useRef(null);
  const backdrop = React.useRef(null);
  const card = React.useRef(null);
  const closing = React.useRef(false);
  const index = PRODUCT.ingredients.findIndex((g) => g.name === item.name) + 1;
  const close = () => {
    if (closing.current) return;
    closing.current = true;
    const M = window.TRMMotion;
    if (M && M.overlayOut) M.overlayOut(backdrop.current, card.current).then(onClose); else onClose();
  };
  useOverlay(root, true, close);
  React.useLayoutEffect(() => { const M = window.TRMMotion; M && M.overlayIn && M.overlayIn(backdrop.current, card.current); }, []);
  return (
    <div ref={root} role="dialog" aria-modal="true" aria-labelledby="ingredient-title" style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div ref={backdrop} onClick={close} style={{ position: 'absolute', inset: 0, background: 'rgba(11,40,50,.26)', backdropFilter: 'blur(8px) saturate(1.1)', WebkitBackdropFilter: 'blur(8px) saturate(1.1)' }}></div>
      <div ref={card} style={{ position: 'relative', width: 'min(540px, 100%)', maxHeight: 'calc(100vh - 48px)', overflow: 'auto', background: 'var(--bg-page-raised)', borderRadius: 'var(--radius-2)', boxShadow: 'var(--shadow-float)', padding: 'clamp(28px, 5vw, 44px)', display: 'grid', gridTemplateColumns: 'auto minmax(0,1fr)', gap: 28, alignItems: 'start' }}>
        <button type="button" onClick={close} aria-label="Close" style={{ position: 'absolute', top: 14, right: 14, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 0, color: 'var(--fg-1)', cursor: 'pointer' }}><Icon name="x" size={20} /></button>
        <div data-modal-icon=""><IconBadge name={item.icon} size={64} /></div>
        <div>
          <Eyebrow>Ingredient {String(index).padStart(2, '0')} / {String(PRODUCT.ingredients.length).padStart(2, '0')}</Eyebrow>
          <h2 id="ingredient-title" style={{ margin: '14px 0 6px', fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 34, lineHeight: 1.08, color: 'var(--fg-1)' }}>{item.name}</h2>
          <p style={{ margin: 0, fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 19, color: 'var(--fg-2)' }}>{item.benefit}</p>
          <div data-rule="" style={{ width: 40, height: 1, background: 'var(--border-strong)', margin: '22px 0' }}></div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: 'var(--fg-1)' }}>{item.blurb}</p>
          <p style={{ margin: '18px 0 0', fontSize: 12, color: 'var(--fg-3)' }}>Consult your healthcare professional before starting any supplement.</p>
        </div>
      </div>
    </div>
  );
}


// PrebookModal — opens once after the intro loader.
const PREBOOK_DONE = 'trm-prebook-done', PREBOOK_LATER = 'trm-prebook-later';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function usePrebookTrigger(enabled) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (!enabled) return;
    const force = /[?&]prebook\b/.test(window.location.search);
    try { if (!force && (localStorage.getItem(PREBOOK_DONE) || sessionStorage.getItem(PREBOOK_LATER))) return; } catch (e) {}
    let t, waited = 0;
    const check = () => {
      waited += 150;
      if (document.querySelector('[data-trm-loader]') && waited < 4000) { t = setTimeout(check, 150); return; }
      t = setTimeout(() => setOpen(true), 650);
    };
    t = setTimeout(check, 300);
    return () => clearTimeout(t);
  }, [enabled]);
  return [open, setOpen];
}
function PrebookField({ id, label, type, value, onChange, onBlur, error, placeholder, autoComplete, inputRef, delay }) {
  const [focus, setFocus] = React.useState(false);
  const line = error ? 'var(--fg-line-art)' : focus ? 'var(--action-primary)' : 'var(--border-strong)';
  return (
    <div data-pb-in="" style={{ display: 'flex', flexDirection: 'column', gap: 8, animationDelay: delay + 'ms' }}>
      <label htmlFor={id} style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--fg-2)' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input ref={inputRef} id={id} type={type} value={value} placeholder={placeholder} autoComplete={autoComplete} inputMode={type === 'email' ? 'email' : undefined}
          aria-invalid={!!error} aria-describedby={error ? id + '-err' : undefined}
          onChange={(e) => onChange(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => { setFocus(false); onBlur(); }}
          style={{ width: '100%', height: 48, padding: '0 2px', border: 0, borderBottom: '1px solid ' + line, borderRadius: 0, background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 300, color: 'var(--fg-1)', outline: 'none', transition: 'border-color 220ms var(--ease-out)' }} />
        <span aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: error ? 'var(--fg-line-art)' : 'var(--action-primary)', transform: focus || error ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 420ms cubic-bezier(.23,1,.32,1)' }}></span>
      </div>
      <div style={{ minHeight: 18 }}>
        {error && <p id={id + '-err'} role="alert" style={{ margin: 0, fontSize: 12, fontStyle: 'italic', color: 'var(--fg-2)', animation: 'pbErr 260ms var(--ease-out)' }}>{error}</p>}
      </div>
    </div>
  );
}

// ── WAITLIST BACKEND PLACEHOLDER ─────────────────────────────────────────
// Replace the body of submitWaitlist with your real request. It must resolve to
// { memberNumber } — that number is shown on the Founding Member card.
async function submitWaitlist({ name, email, source, answers }) {
  // e.g. const r = await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, source, answers }) }); return r.json();
  await new Promise((r) => setTimeout(r, 900));
  let n = 127; try { n = (parseInt(localStorage.getItem('trm-member-no'), 10) || 127) + 1; localStorage.setItem('trm-member-no', String(n)); localStorage.setItem(PREBOOK_DONE, '1'); } catch (e) {}
  return { memberNumber: n };
}
const fmtMember = (n) => String(n).padStart(4, '0');

function WaitlistForm({ source, answers, onDone, onSubmit = submitWaitlist, focusDelay = 0, big = false, titleId = 'wl-title' }) {
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [touched, setTouched] = React.useState({});
  const [status, setStatus] = React.useState('idle');
  const errs = {
    name: name.trim().length < 2 ? 'Please enter your name.' : '',
    email: !email.trim() ? 'Please enter your email.' : !EMAIL_RE.test(email.trim()) ? 'That email doesn\u2019t look right. Check for typos.' : '',
  };
  React.useEffect(() => { const t = setTimeout(() => nameRef.current && nameRef.current.focus({ preventScroll: true }), focusDelay); return () => clearTimeout(t); }, []);
  const submit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (errs.name) { nameRef.current.focus(); return; }
    if (errs.email) { emailRef.current.focus(); return; }
    setStatus('sending');
    try { const res = await onSubmit({ name: name.trim(), email: email.trim(), source, answers }); onDone({ name: name.trim(), email: email.trim(), memberNumber: res && res.memberNumber }); }
    catch (er) { setStatus('idle'); }
  };
  return (
    <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 id={titleId} style={{ ...tH, margin: '0 0 12px', fontSize: big ? 'clamp(36px,5.6vw,64px)' : 'clamp(32px,4.4vw,42px)' }}>Reserve your <em style={{ fontWeight: 400 }}>invitation.</em></h2>
      <p style={{ margin: '0 0 24px', fontSize: 15, fontWeight: 300, lineHeight: 1.6, color: 'var(--fg-2)', textWrap: 'pretty' }}>Leave your name and email and we'll let you know the moment PCOS Harmony is ready to order.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <PrebookField id={titleId + '-name'} label="Your name" type="text" autoComplete="name" placeholder="First and last name" value={name} onChange={setName} onBlur={() => setTouched((t) => ({ ...t, name: !!name || t.name }))} error={touched.name && errs.name} inputRef={nameRef} delay={0} />
        <PrebookField id={titleId + '-email'} label="Email" type="email" autoComplete="email" placeholder="you@gmail.com" value={email} onChange={setEmail} onBlur={() => setTouched((t) => ({ ...t, email: !!email || t.email }))} error={touched.email && errs.email} inputRef={emailRef} delay={0} />
      </div>
      <button data-pb-btn="" type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'} style={{ ...tBtn, marginTop: 10, minHeight: 56, cursor: status === 'sending' ? 'progress' : 'pointer' }}>
        {status === 'sending' ? <span aria-hidden="true" style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid rgba(250,247,241,.35)', borderTopColor: 'var(--action-on-primary)', animation: 'pbSpin 700ms linear infinite' }}></span> : <>Be Part of Our Beginning <span aria-hidden="true">→</span></>}
      </button>
      <p style={{ margin: '14px 0 0', fontSize: 12, color: 'var(--fg-3)', textAlign: 'center' }}>Launch updates only. Unsubscribe anytime.</p>
    </form>
  );
}

function FoundingCard({ number, headingRef, titleId = 'wl-title', showSachet = false, big = false }) {
  const { Icon } = DS;
  const [copied, setCopied] = React.useState(false);
  const share = () => { const ok = () => { setCopied(true); setTimeout(() => setCopied(false), 2200); }; try { navigator.clipboard.writeText(window.location.origin + window.location.pathname).then(ok, ok); } catch (e) { ok(); } };
  return (
    <div style={{ border: '1px solid var(--border-hairline)', background: 'var(--trm-ivory-50)', padding: 'clamp(22px,3vw,30px)', display: 'flex', alignItems: 'center', gap: 24 }}>
      {showSachet && <img src={ASSET + 'product/sachet-front.png'} alt="" style={{ height: 150, width: 'auto', flex: 'none' }} />}
      <div style={{ minWidth: 0 }}>
        <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--fg-accent)' }}><Icon name="moon-star" size={14} stroke={1.2} />Founding Member No. <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmtMember(number || 128)}</span></p>
        <h2 ref={headingRef} tabIndex={-1} id={titleId} style={{ ...tH, outline: 'none', margin: '14px 0 10px', fontSize: big ? 'clamp(36px,5.6vw,60px)' : 'clamp(30px,4vw,40px)' }}>You’re on the <em style={{ fontWeight: 400 }}>list.</em></h2>
        <p style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 300, lineHeight: 1.6, color: 'var(--fg-2)', textWrap: 'pretty' }}>We'll write to you the moment PCOS Harmony is ready.</p>
        <button data-pb-link="" type="button" onClick={share} aria-live="polite" style={{ minHeight: 44, padding: 0, background: 'none', border: 0, fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-accent)', textDecoration: 'underline', textUnderlineOffset: 4, cursor: 'pointer' }}>{copied ? 'Link copied' : 'Share with a friend'}</button>
      </div>
    </div>
  );
}

const WL_CSS = '@keyframes pbUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}@keyframes pbFade{from{opacity:0}to{opacity:1}}@keyframes pbErr{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}@keyframes pbSpin{to{transform:rotate(360deg)}}[data-pb-in]{opacity:0;animation:pbUp 560ms cubic-bezier(.23,1,.32,1) forwards}'
  + '@keyframes wlFade{from{opacity:0}to{opacity:1}}@keyframes wlOut{to{opacity:0}}@keyframes wlUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}@keyframes wlSheet{from{transform:translateY(100%)}to{transform:none}}'
  + '@keyframes wlTear{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes wlTearOff{to{opacity:0}}@keyframes wlStrip{0%{transform:none;opacity:1}22%{transform:translate(5px,-9px) rotate(-5deg);opacity:1}100%{transform:translate(46px,560px) rotate(26deg);opacity:0}}'
  + '@keyframes wlEmerge{from{transform:translate(0,var(--oy)) scale(.3);opacity:0}to{transform:none;opacity:1}}@keyframes wlRadial{from{transform:translateX(0)}to{transform:translateX(var(--r))}}'
  + '@keyframes wlSpin{from{transform:rotate(var(--a))}to{transform:rotate(calc(var(--a) + 360deg))}}@keyframes wlSpinRev{from{transform:rotate(calc(var(--a) * -1))}to{transform:rotate(calc(var(--a) * -1 - 360deg))}}'
  + '@keyframes wlBubble{0%{transform:translateY(0);opacity:0}25%{opacity:.75}100%{transform:translateY(-84px);opacity:0}}@keyframes wlRise{0%{transform:translate(0,var(--oy)) scale(.3);opacity:0}55%{transform:translate(calc(var(--x) * .55),calc(var(--y) - 34px)) scale(1);opacity:1}100%{transform:translate(var(--x),var(--y)) scale(1);opacity:1}}@keyframes wlBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}@keyframes wlGlow{0%,100%{opacity:0}40%{opacity:.85}}'
  + '[data-pb-btn]:hover:not(:disabled){background:var(--action-primary-hover)}[data-pb-btn]:active:not(:disabled){transform:scale(.99);background:var(--action-primary-press)}[data-pb-btn]:disabled{opacity:.5;cursor:progress}[data-pb-x]:hover{background:var(--trm-ivory-200)}[data-pb-link]:hover{color:var(--fg-1)}'
  + '[data-wl] button:focus-visible,[data-wl] input:focus-visible,[data-wl] a:focus-visible{outline:2px solid var(--fg-accent);outline-offset:3px}'
  + '@media (prefers-reduced-motion: reduce){[data-pb-in]{animation:pbFade 1ms forwards!important}}';

// WaitlistModal — one waitlist flow for every "Be Part of Our Beginning" button.
function WaitlistModal({ origin, onClose, onSubmit = submitWaitlist }) {
  const { Icon } = DS;
  const root = React.useRef(null);
  const slot = React.useRef(null);
  const rig = React.useRef(null);
  const panel = React.useRef(null);
  const headRef = React.useRef(null);
  const [mq] = React.useState(() => ({ reduce: window.matchMedia('(prefers-reduced-motion: reduce)').matches, mobile: window.matchMedia('(max-width: 640px)').matches }));
  const { reduce, mobile } = mq;
  const k = mobile ? 0.8 : 1;
  const T = { tear: 680 * k, strip: 960 * k, emerge: 1520 * k, content: reduce ? 0 : 1420 * k, land: 1900 * k };
  const SH = mobile ? 112 : 132, SW = SH * 370 / 1368, SLOT = mobile ? 168 : 192, MX = mobile ? [-124, -64, 64, 124] : [-152, -80, 80, 152], MY = [12, -8, -8, 12];
  const [landed, setLanded] = React.useState(reduce);
  const [leaving, setLeaving] = React.useState(false);
  const [done, setDone] = React.useState(null);
  const close = () => { if (leaving) return; setLeaving(true); setTimeout(onClose, reduce ? 0 : 260); };
  useOverlay(root, true, close);
  React.useLayoutEffect(() => {
    let f = 1;
    if (panel.current) { const ph = panel.current.offsetHeight, avail = window.innerHeight - (mobile ? 12 : 32); f = ph > avail ? avail / ph : 1; panel.current.style.transform = f < 1 ? 'scale(' + f + ')' : ''; }
    if (reduce || !rig.current || !slot.current) return;
    const sr = slot.current.getBoundingClientRect();
    const sx = sr.left + sr.width / 2, sy = sr.top + sr.height / 2;
    const vx = window.innerWidth / 2, vy = window.innerHeight / 2;
    const o = origin && origin.width ? origin : { left: vx, top: vy, width: 0, height: 0 };
    const bx = (o.left + o.width / 2 - sx) / f, by = (o.top + o.height / 2 - sy) / f, bs = Math.max(0.2, Math.min(0.42, (o.height || 48) / SH)) / f;
    const C = Math.min(window.innerWidth * (mobile ? 0.82 : 0.42), 440) / SW / f, ty = SH * 0.44 * C, e = 'cubic-bezier(.22,1,.36,1)', zo = 'cubic-bezier(.65,0,.35,1)';
    const tf = (x, y, sc) => 'translate(' + x + 'px,' + y + 'px) scale(' + sc + ')';
    const a = rig.current.animate([
      { offset: 0, transform: tf(bx, by, bs), opacity: 0 },
      { offset: 0.1, transform: tf(bx, by, bs), opacity: 0, easing: e },
      { offset: 0.32, transform: tf((vx - sx) / f, (vy - sy) / f + ty, C), opacity: 1 },
      { offset: 0.66, transform: tf((vx - sx) / f, (vy - sy) / f + ty * 1.03, C * 1.03), opacity: 1, easing: zo },
      { offset: 1, transform: 'none', opacity: 1 },
    ], { duration: T.land, fill: 'both' });
    const t = setTimeout(() => setLanded(true), T.land);
    return () => { clearTimeout(t); a.cancel(); };
  }, []);
  const finish = (res) => { setDone(res); setTimeout(() => headRef.current && headRef.current.focus({ preventScroll: true }), 120); };
  const ms = (n) => Math.round(n) + 'ms';
  const ease = 'cubic-bezier(.22,1,.36,1)';
  const ings = PRODUCT.ingredients;
  return (
    <div ref={root} data-wl="" role="dialog" aria-modal="true" aria-labelledby="wl-title" style={{ position: 'fixed', inset: 0, zIndex: 72, display: 'flex', alignItems: mobile ? 'flex-end' : 'center', justifyContent: 'center', animation: leaving ? 'wlOut 240ms ease-in forwards' : 'none' }}>
      <style>{WL_CSS}</style>
      <div onClick={close} aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,68,88,.20), rgba(243,238,228,.62))', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', animation: 'wlFade 260ms ease-out both' }}></div>
      <div ref={panel} style={{ position: 'relative', width: mobile ? '100%' : 'min(460px, calc(100vw - 32px))', transformOrigin: mobile ? '50% 100%' : '50% 50%' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--bg-page)', border: '1px solid var(--border-hairline)', borderRadius: mobile ? 'var(--radius-2) var(--radius-2) 0 0' : 0, boxShadow: 'var(--shadow-float)', animation: reduce ? 'wlFade 300ms ease-out both' : mobile ? 'wlSheet 460ms ' + ease + ' ' + ms(900 * k) + ' both' : 'wlFade 380ms ease-out ' + ms(T.content - 120) + ' both' }}></div>
        <div style={{ position: 'relative' }}>
          <div ref={slot} aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: SLOT, pointerEvents: 'none', zIndex: 1 }}>
            <div ref={rig} style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0 }}>
              <div style={{ position: 'absolute', left: -SW / 2, top: -SH / 2, width: SW, height: SH, transform: done ? 'scale(.8)' : 'none', transition: 'transform 760ms ' + ease, filter: 'drop-shadow(0 14px 18px rgba(6,48,63,.22))' }}>
                <img src={ASSET + 'product/sachet-front.png'} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', clipPath: reduce ? 'none' : 'inset(6% 0 0 0)' }} />
                {!reduce && <img src={ASSET + 'product/sachet-front.png'} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', clipPath: 'inset(0 0 94% 0)', transformOrigin: '90% 6%', animation: 'wlStrip 680ms cubic-bezier(.45,0,.7,1) ' + ms(T.strip) + ' both' }} />}
                {!reduce && <span style={{ position: 'absolute', left: '4%', right: '4%', top: '6%', height: 1, background: 'var(--trm-ivory-50)', boxShadow: '0 0 6px rgba(255,253,248,.9)', transformOrigin: 'left', animation: 'wlTear 260ms ease-out ' + ms(T.tear) + ' both, wlTearOff 240ms ease-out ' + ms(T.strip + 120) + ' both' }}></span>}
              </div>
            </div>
            {!reduce && <div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, transform: done ? 'scale(.6)' : 'none', transition: 'transform 760ms ' + ease }}>
                <svg width="400" height="80" viewBox="-200 -40 400 80" style={{ position: 'absolute', left: -200, top: -40, overflow: 'visible', animation: 'wlFade 700ms ease-out ' + ms(T.emerge + 300) + ' both' }}>
                  <path d={'M' + MX[0] + ' ' + MY[0] + ' Q0 ' + (MY[1] - 26) + ' ' + MX[3] + ' ' + MY[3]} fill="none" stroke="var(--fg-line-art)" strokeWidth="0.8" strokeDasharray="1 5"></path>
                </svg>
                {ings.map((g, i) => (
                  <div key={g.name} style={{ position: 'absolute', left: 0, top: 0, '--oy': (-SH * 0.44) + 'px', '--x': MX[i] + 'px', '--y': MY[i] + 'px', animation: 'wlRise 900ms ' + ease + ' ' + ms(T.emerge + i * 90) + ' both' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, animation: 'wlBob ' + (3200 + i * 380) + 'ms ease-in-out ' + ms(T.emerge + 900 + i * 90) + ' infinite' }}>
                      <div style={{ position: 'absolute', left: -17, top: -17, width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--trm-petrol)', background: 'radial-gradient(circle at 35% 30%, #FFFDF8 0%, var(--trm-ivory-100) 55%, rgba(201,182,143,.55) 100%)', border: '1px solid var(--fg-line-art)', boxShadow: '0 0 18px 2px rgba(201,182,143,.45)' }}><Icon name={g.icon} size={15} stroke={1.3} /></div>
                      <span style={{ position: 'absolute', top: 22, left: 0, transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: 8.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--fg-1)', animation: 'wlFade 420ms ease-out ' + ms(T.emerge + 520 + i * 90) + ' both', opacity: done ? 0 : 1, transition: 'opacity 300ms' }}>{g.name}</span>
                    </div>
                  </div>
                ))}
                {[[-6, 0], [8, 700], [-2, 1400], [12, 2100]].map(([x, d], i) => <span key={i} style={{ position: 'absolute', left: x, top: -SH * 0.46, width: 3 + (i % 3), height: 3 + (i % 3), borderRadius: '50%', border: '1px solid var(--fg-line-art)', opacity: 0, animation: 'wlBubble ' + (2600 + i * 300) + 'ms ease-out ' + ms(T.emerge + d) + ' infinite' }}></span>)}
              </div>
              {done && <span style={{ position: 'absolute', left: -110, top: -60, width: 220, height: 120, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(201,182,143,.5) 0%, rgba(201,182,143,0) 65%)', animation: 'wlGlow 1200ms ease-in-out 620ms both' }}></span>}
            </div>}
          </div>
          <button data-pb-x="" type="button" onClick={close} aria-label="Close" style={{ position: 'absolute', top: 10, right: 10, zIndex: 3, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 0, borderRadius: '50%', color: 'var(--fg-1)', cursor: 'pointer', transition: 'background-color 200ms', animation: 'wlFade 300ms ease-out ' + ms(T.content) + ' both' }}><Icon name="x" size={20} /></button>
          <div key={done ? 'done' : 'form'} style={{ position: 'relative', zIndex: 2, padding: SLOT + 'px clamp(22px,5vw,36px) ' + (mobile ? 28 : 32) + 'px', animation: reduce ? 'wlFade 300ms ease-out both' : done ? 'wlUp 520ms ' + ease + ' 260ms both' : 'wlUp 440ms ' + ease + ' ' + ms(T.content) + ' both' }}>
            {done ? <FoundingCard number={done.memberNumber} headingRef={headRef} /> : <WaitlistForm source="waitlist" onSubmit={onSubmit} onDone={finish} focusDelay={T.content + 60} />}
          </div>
        </div>
      </div>
    </div>
  );
}

const TEST_Q = [
  { tag: 'About you', q: 'What would you love to feel better about right now?', multi: true, opts: ['Feeling more energetic', 'Low stress / feel less anxious', 'Sleeping better', 'My skin / acne', 'Periods & cycle', 'Feeling comfortable in my body', 'Digestion & gut health', 'My overall health', 'I\u2019m doing pretty well right now'] },
  { tag: 'Your health', q: 'Have you ever been diagnosed with PCOS / PCOD?', opts: ['Yes, formally diagnosed by a doctor', 'I suspect I have it, but not formally diagnosed', 'No', 'But I know a loved one'] },
  { tag: 'Your journey', q: 'What is the hardest part of your journey?', multi: true, opts: ['I don\u2019t know what actually works for me', 'I start, but can\u2019t stay consistent', 'I\u2019ve tried things but haven\u2019t seen results', 'It\u2019s difficult to find something I actually trust', 'It\u2019s too expensive', 'I don\u2019t have enough guidance', 'Honestly, I\u2019m just tired of trying things', 'Nothing in particular'] },
  { tag: 'Founding member', perks: [['4-year founder pricing protection', 'Your membership price won\u2019t increase for 4 years, even if our standard pricing does.'], ['4 years of access to the Right Molecule tracking platform', 'Track your cycle, symptoms, habits and progress as the platform develops.'], ['Direct founder feedback channel', 'Tell us what is working, what isn\u2019t, and what we should build next.']], q: 'Would you like us to reserve your Founding Member invitation?', opts: ['YES \u2014 Reserve my invitation', 'Tell me more first', 'Not for me'] },
];
const tChip = { display: 'inline-flex', alignItems: 'center', gap: 10, padding: '7px 12px', border: '1px solid var(--fg-1)', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--fg-1)', lineHeight: 1.2 };
const tH = { margin: 0, fontFamily: 'var(--font-serif)', fontWeight: 500, color: 'var(--fg-1)', lineHeight: 1.02, letterSpacing: '-.01em', textWrap: 'balance' };
const tBtn = { width: '100%', minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, border: 0, borderRadius: 0, background: 'var(--action-primary)', color: 'var(--action-on-primary)', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500, letterSpacing: '.04em', cursor: 'pointer', transition: 'background-color 200ms, transform 160ms var(--ease-out), opacity 200ms' };
function PrebookModal({ onClose }) {
  const { Icon } = DS;
  const root = React.useRef(null);
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const N = TEST_Q.length;
  const [step, setStep] = React.useState(-1);
  const [dir, setDir] = React.useState(1);
  const [ans, setAns] = React.useState({});
  const [leaving, setLeaving] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [touched, setTouched] = React.useState({});
  const [status, setStatus] = React.useState('idle');
  const [wlDone, setWlDone] = React.useState(null);
  const cardHead = React.useRef(null);
  const errs = {
    name: name.trim().length < 2 ? 'Please enter your name.' : '',
    email: !email.trim() ? 'Please enter your email.' : !EMAIL_RE.test(email.trim()) ? 'That email doesn\u2019t look right. Check for typos.' : '',
  };
  const close = (later) => {
    if (leaving) return;
    if (later) { try { sessionStorage.setItem(PREBOOK_LATER, '1'); } catch (e) {} }
    setLeaving(true);
    setTimeout(onClose, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 280);
  };
  useOverlay(root, true, () => close(!wlDone));
  const goStep = (n) => { setDir(n > step ? 1 : -1); setStep(n); if (root.current) root.current.scrollTop = 0; };
  React.useEffect(() => { if (step === N) { const t = setTimeout(() => nameRef.current && nameRef.current.focus({ preventScroll: true }), 420); return () => clearTimeout(t); } }, [step]);
  const Q = step >= 0 && step < N ? TEST_Q[step] : null;
  const sel = Q ? (ans[step] || []) : [];
  const pick = (o) => {
    if (Q.multi) { setAns((a) => { const cur = a[step] || []; return { ...a, [step]: cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o] }; }); return; }
    setAns((a) => ({ ...a, [step]: [o] }));
    setTimeout(() => goStep(step + 1), 320);
  };
  const submit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (errs.name) { nameRef.current.focus(); return; }
    if (errs.email) { emailRef.current.focus(); return; }
    setStatus('sending');
    setTimeout(() => { try { localStorage.setItem(PREBOOK_DONE, '1'); localStorage.setItem('trm-test-answers', JSON.stringify(TEST_Q.map((q, i) => ({ q: q.q, a: ans[i] || [] })))); } catch (er) {} setStatus('done'); }, 1100);
  };
  const first = name.trim().split(/\s+/)[0];
  const pct = step < 0 ? 0 : !!wlDone ? 100 : Math.round(((step + 1) / (N + 1)) * 100);
  const notForMe = (ans[N - 1] || [])[0] === 'Not for me';
  const enter = dir > 0 ? 'tqIn' : 'tqBack';
  return (
    <div ref={root} role="dialog" aria-modal="true" aria-labelledby="prebook-title" style={{ position: 'fixed', inset: 0, zIndex: 70, overflowY: 'auto', background: 'var(--bg-page)', color: 'var(--fg-1)', animation: leaving ? 'pbOut 260ms ease-in forwards' : 'pbFade 420ms ease-out' }}>
      <style>{WL_CSS}</style>
      <style>{'@keyframes pbFade{from{opacity:0}to{opacity:1}}@keyframes pbOut{to{opacity:0}}@keyframes pbUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}@keyframes tqIn{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:none}}@keyframes tqBack{from{opacity:0;transform:translateX(-28px)}to{opacity:1;transform:none}}@keyframes pbErr{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}@keyframes pbSpin{to{transform:rotate(360deg)}}@keyframes pbDraw{to{stroke-dashoffset:0}}@keyframes tqDot{0%,100%{opacity:1}50%{opacity:.3}}[data-pb-in]{opacity:0;animation:pbUp 560ms cubic-bezier(.23,1,.32,1) forwards}[data-pb-btn]:hover:not(:disabled){background:var(--action-primary-hover)}[data-pb-btn]:active:not(:disabled){transform:scale(.99);background:var(--action-primary-press)}[data-pb-btn]:disabled{opacity:.35;cursor:not-allowed}[data-tq-opt]:hover{border-color:var(--fg-1)!important;background:var(--trm-ivory-50)}[data-tq-opt][aria-pressed=true]:hover{background:var(--action-primary-hover)}[data-tq-opt]:active{transform:scale(.99)}[data-tq-ghost]:hover{background:var(--trm-ivory-50)}[data-pb-btn]:focus-visible,[data-pb-x]:focus-visible,[data-pb-link]:focus-visible,[data-tq-opt]:focus-visible,[data-tq-ghost]:focus-visible{outline:2px solid var(--fg-accent);outline-offset:3px}[data-pb-x]:hover{background:var(--trm-ivory-200)}[data-pb-link]:hover{color:var(--fg-1)}@media (prefers-reduced-motion: reduce){[data-pb-in],[data-tq-step]{animation:pbFade 1ms forwards!important}}'}</style>
      <div style={{ position: 'sticky', top: 0, zIndex: 2, background: 'linear-gradient(var(--bg-page) 75%, rgba(243,238,228,0))', padding: 'clamp(16px,3vw,28px) clamp(16px,5vw,60px) 28px', display: 'flex', alignItems: 'center', gap: 'clamp(14px,2.4vw,24px)' }}>
        <button data-tq-ghost="" type="button" onClick={() => goStep(step - 1)} aria-label="Previous question" disabled={step < 0 || !!wlDone} style={{ width: 44, height: 44, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: '1px solid var(--border-strong)', borderRadius: 0, color: 'var(--fg-1)', cursor: 'pointer', visibility: step < 0 || !!wlDone ? 'hidden' : 'visible', transition: 'background-color 200ms' }}><span aria-hidden="true" style={{ fontSize: 18, lineHeight: 1 }}>←</span></button>
        <div aria-hidden="true" style={{ flex: 1, height: 2, background: 'var(--border-hairline)', position: 'relative', overflow: 'hidden' }}><div style={{ position: 'absolute', inset: 0, background: 'var(--action-primary)', transformOrigin: 'left', transform: 'scaleX(' + pct / 100 + ')', transition: 'transform 600ms cubic-bezier(.23,1,.32,1)' }}></div></div>
        <span aria-live="polite" style={{ flex: 'none', minWidth: 78, textAlign: 'right', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--fg-2)', fontVariantNumeric: 'tabular-nums' }}>{pct}% done</span>
        <button data-pb-x="" type="button" onClick={() => close(!wlDone)} aria-label="Close" style={{ width: 44, height: 44, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 0, borderRadius: '50%', color: 'var(--fg-1)', cursor: 'pointer', transition: 'background-color 200ms' }}><Icon name="x" size={20} /></button>
      </div>
      <div key={!!wlDone ? 'done' : step} data-tq-step="" style={{ width: 'min(760px, 100%)', margin: '0 auto', padding: 'clamp(8px,3vw,32px) clamp(20px,5vw,40px) 80px', animation: enter + ' 520ms cubic-bezier(.23,1,.32,1)' }}>
        {step < 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 'clamp(0px,3vh,32px)' }}>
            <span data-pb-in="" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--fg-accent)', animationDelay: '120ms' }}><span aria-hidden="true" style={{ width: 40, height: 1, background: 'currentColor' }}></span>2-minute test<span aria-hidden="true" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, letterSpacing: 0, textTransform: 'none' }}>&amp;</span>{N} questions<span aria-hidden="true" style={{ width: 40, height: 1, background: 'currentColor' }}></span></span>
            <h2 id="prebook-title" data-pb-in="" style={{ ...tH, margin: '28px 0 32px', fontSize: 'clamp(46px,8vw,96px)', animationDelay: '200ms' }}>Your body is unique. This <em style={{ fontWeight: 400 }}>test</em> listens.</h2>
            <div data-pb-in="" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, maxWidth: 620, animationDelay: '300ms' }}>
              {['One sachet a day', 'Passion Fruit', '31 sachets · \u20b91,580', 'Founding member pre-order'].map((c) => <span key={c} style={{ ...tChip, padding: '11px 16px', fontSize: 12 }}>{c}</span>)}
            </div>
            <p data-pb-in="" style={{ margin: '40px 0 22px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(24px,3vw,30px)', color: 'var(--fg-1)', animationDelay: '380ms' }}>Ready when you are.</p>
            <div data-pb-in="" style={{ width: 'min(440px,100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, animationDelay: '440ms' }}>
              <button data-pb-btn="" type="button" onClick={() => goStep(0)} style={tBtn}>Take the test <span aria-hidden="true">→</span></button>
              <button data-pb-link="" type="button" onClick={() => close(true)} style={{ minHeight: 44, padding: 0, background: 'none', border: 0, fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-2)', textDecoration: 'underline', textUnderlineOffset: 4, cursor: 'pointer', transition: 'color 200ms' }}>Maybe later</button>
            </div>
          </div>
        ) : Q ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span data-pb-in="" style={{ ...tChip, alignSelf: 'flex-start', animationDelay: '60ms' }}>{Q.tag}</span>
            {Q.eyebrow && <p data-pb-in="" style={{ margin: '22px 0 0', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(22px,2.6vw,28px)', color: 'var(--fg-accent)', animationDelay: '100ms' }}>{Q.eyebrow}</p>}
            {Q.lead && <p data-pb-in="" style={{ margin: '10px 0 0', maxWidth: 600, fontSize: 16, fontWeight: 300, lineHeight: 1.6, color: 'var(--fg-2)', textWrap: 'pretty', animationDelay: '130ms' }}>{Q.lead}</p>}
            {Q.perks && <div data-pb-in="" style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 18, animationDelay: '100ms' }}>{Q.perks.map(([t, d]) => <div key={t} style={{ borderLeft: '1px solid var(--fg-1)', paddingLeft: 18 }}><p style={{ margin: 0, fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--fg-1)' }}>{t}</p><p style={{ margin: '6px 0 0', fontSize: 15, fontWeight: 300, lineHeight: 1.55, color: 'var(--fg-2)', maxWidth: 520 }}>{d}</p></div>)}</div>}
            <h2 id="prebook-title" data-pb-in="" style={{ ...tH, margin: '24px 0 10px', fontSize: Q.q.length > 70 ? 'clamp(32px,4.6vw,52px)' : 'clamp(36px,5.6vw,64px)', animationDelay: '160ms' }}>{Q.q}</h2>
            <p data-pb-in="" style={{ margin: '0 0 28px', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--fg-2)', animationDelay: '200ms' }}>{Q.multi ? 'Select all that apply' : 'Choose one'}</p>
            <div role="group" aria-labelledby="prebook-title" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px,100%), 1fr))', gap: 12 }}>
              {Q.opts.map((o, i) => { const on = sel.includes(o); return (
                <button key={o} data-tq-opt="" data-pb-in="" type="button" aria-pressed={on} onClick={() => pick(o)} style={{ minHeight: 64, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, textAlign: 'left', border: '1px solid ' + (on ? 'var(--action-primary)' : 'var(--border-strong)'), borderRadius: 0, background: on ? 'var(--action-primary)' : 'transparent', color: on ? 'var(--action-on-primary)' : 'var(--fg-1)', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: on ? 500 : 400, lineHeight: 1.35, cursor: 'pointer', transition: 'background-color 200ms, border-color 200ms, color 200ms, transform 160ms var(--ease-out)', animationDelay: 230 + i * 35 + 'ms' }}>
                  <span>{o}</span>
                  <span aria-hidden="true" style={{ flex: 'none', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid currentColor', borderRadius: Q.multi ? 0 : '50%', opacity: on ? 1 : .5 }}>{on && <Icon name="check" size={14} stroke={2} />}</span>
                </button>); })}
            </div>
            {Q.multi && <div data-pb-in="" style={{ marginTop: 36, animationDelay: 260 + Q.opts.length * 35 + 'ms' }}><button data-pb-btn="" type="button" disabled={!sel.length} onClick={() => goStep(step + 1)} style={tBtn}>Continue <span aria-hidden="true">→</span></button></div>}
          </div>
        ) : !wlDone ? (
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 560 }}>
            <span data-pb-in="" style={{ ...tChip, alignSelf: 'flex-start', marginBottom: 24, animationDelay: '60ms' }}>Last step</span>
            <div data-pb-in="" style={{ animationDelay: '140ms' }}><WaitlistForm big titleId="prebook-title" source="test" answers={TEST_Q.map((q, i) => ({ q: q.q, a: ans[i] || [] }))} onDone={(r) => { setWlDone(r); setTimeout(() => cardHead.current && cardHead.current.focus({ preventScroll: true }), 120); }} focusDelay={420} /></div>
          </div>
        ) : (
          <div data-pb-in="" style={{ maxWidth: 620 }}><FoundingCard big showSachet titleId="prebook-title" number={wlDone.memberNumber} headingRef={cardHead} /></div>
        )}
      </div>
    </div>
  );
}

function TRMSite({ page }) {
  const { SiteHeader, SiteFooter } = DS;
  const qs = new URLSearchParams(window.location.search); const embedded = qs.has('embed') && window.parent !== window;
  const [route, setRoute] = React.useState(() => qs.get('route') || page || localStorage.getItem('trm-route') || 'Home');
  React.useEffect(() => { if (page) setRoute(page); }, [page]);
  const [bag, setBag] = React.useState([]);
  const [bagOpen, setBagOpen] = React.useState(false);
  const [ingredient, setIngredient] = React.useState(null);
  const [prebook, setPrebook] = React.useState(false);
  const [wl, setWl] = React.useState(null);
  const openWL = (e) => { const el = (e && e.currentTarget && e.currentTarget.getBoundingClientRect) ? e.currentTarget : document.activeElement; const rect = el && el !== document.body && el.getBoundingClientRect ? el.getBoundingClientRect() : null; if (el && el.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) el.animate([{ transform: 'scale(1)' }, { transform: 'scale(.95)' }, { transform: 'scale(1)' }], { duration: 220, easing: 'cubic-bezier(.22,1,.36,1)' }); setWl({ rect }); };
  const go = (r) => { if (r === 'Be Part of Our Beginning') { openWL(); return; } const M = window.TRMMotion; if (embedded) { const n2 = r === 'Our Science' ? 'Our Science' : r === 'Products' || r === 'Shop' || r === 'Be Part of Our Beginning' ? 'Products' : 'Home'; window.parent.postMessage({ trmNav: n2 }, '*'); return; } if (r === 'Our Science') { M && M.navigateTo ? M.navigateTo('Our Science.dc.html') : (window.location.href = 'Our Science.dc.html'); return; } const n = r === 'About' ? 'About' : r === 'Products' || r === 'Shop' || r === 'Be Part of Our Beginning' ? 'Products' : 'Home'; const swap = () => { setRoute(n); localStorage.setItem('trm-route', n); window.scrollTo(0, 0); }; if (n === route) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; } M && M.transition ? M.transition(swap) : swap(); };
  const add = ({ flavour, qty }) => {
    const M = window.TRMMotion;
    const commit = () => {
      setBag((b) => { const i = b.findIndex((x) => x.flavour === flavour); if (i > -1) return b.map((x, k) => k === i ? { ...x, qty: x.qty + qty } : x); return [...b, { flavour, qty }]; });
      requestAnimationFrame(() => requestAnimationFrame(() => M && M.popBadge && M.popBadge()));
      setTimeout(() => setBagOpen(true), M && M.config ? M.config.overlays.drawerDelay * 1000 : 0);
    };
    const src = document.querySelector('[data-fly-src]');
    if (M && M.flyToCart && src) M.flyToCart(src, ASSET + 'product/sachet-front.png').then(commit); else commit();
  };
  const count = bag.reduce((s, i) => s + i.qty, 0);
  React.useEffect(() => { const id = requestAnimationFrame(() => window.TRMMotion && window.TRMMotion.init()); return () => cancelAnimationFrame(id); }, [route]);
  return (
    <div key={route} data-screen-label={route}>
      <div data-anim="header" data-solid={route === 'Home' ? '0' : '1'} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10, borderBottom: '1px solid transparent' }}>
        <SiteHeader active={route} onNavigate={go} bagCount={0} brandMark onShop={openWL} transparent={route === 'Home'} />
      </div>
      {route === 'Home' ? <div style={{ paddingTop: 96, background: 'var(--bg-page)' }}><HomeScreen onShop={openWL} onIngredient={setIngredient} onTest={() => setPrebook(true)} /></div> : route === 'About' ? <div style={{ paddingTop: 96 }}><AboutScreen /></div> : <div style={{ paddingTop: 96 }}><ProductScreen onJoin={openWL} onNavigate={go} onIngredient={setIngredient} /></div>}
      <SiteFooter onNavigate={go} />
      <BagDrawer open={bagOpen} items={bag} onClose={() => setBagOpen(false)} onQty={(k, v) => setBag((b) => b.map((x, i) => i === k ? { ...x, qty: v } : x))} onRemove={(k) => setBag((b) => b.filter((_, i) => i !== k))} />
      {ingredient && <IngredientModal item={ingredient} onClose={() => setIngredient(null)} />}
      {prebook && <PrebookModal onClose={() => setPrebook(false)} />}
      {wl && <WaitlistModal origin={wl.rect} onClose={() => setWl(null)} />}
    </div>
  );
}
export { TRMSite };
