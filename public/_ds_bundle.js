/* @ds-bundle: {"format":4,"namespace":"TheRightMoleculeDesignSystem_d2cf6c","components":[{"name":"Eyebrow","sourcePath":"components/brand/Eyebrow.jsx"},{"name":"Heading","sourcePath":"components/brand/Heading.jsx"},{"name":"Logotype","sourcePath":"components/brand/Logotype.jsx"},{"name":"StackedCaps","sourcePath":"components/brand/StackedCaps.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"QuantityStepper","sourcePath":"components/commerce/QuantityStepper.jsx"},{"name":"IngredientItem","sourcePath":"components/content/IngredientItem.jsx"},{"name":"TestimonialSlider","sourcePath":"components/content/TestimonialSlider.jsx"},{"name":"TrustPoint","sourcePath":"components/content/TrustPoint.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"ICON_NAMES","sourcePath":"components/core/Icon.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconBadge","sourcePath":"components/core/IconBadge.jsx"},{"name":"TextLink","sourcePath":"components/core/TextLink.jsx"},{"name":"EmailSignup","sourcePath":"components/forms/EmailSignup.jsx"},{"name":"TextInput","sourcePath":"components/forms/TextInput.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"}],"sourceHashes":{"components/brand/Eyebrow.jsx":"494c29f5e921","components/brand/Heading.jsx":"257d27ff55e9","components/brand/Logotype.jsx":"50087d5fd095","components/brand/StackedCaps.jsx":"f6f69861f8b6","components/commerce/ProductCard.jsx":"96802f291fe2","components/commerce/QuantityStepper.jsx":"d54d145e516f","components/content/IngredientItem.jsx":"9b7c72264325","components/content/TestimonialSlider.jsx":"72177d84778e","components/content/TrustPoint.jsx":"77a015626020","components/core/Button.jsx":"dce97e3ddbe3","components/core/Icon.jsx":"32fed06c7427","components/core/IconBadge.jsx":"3f9be522063d","components/core/TextLink.jsx":"7d0f59d6f14e","components/forms/EmailSignup.jsx":"752bfb376da3","components/forms/TextInput.jsx":"c1b98365a4a9","components/navigation/SiteFooter.jsx":"1150920d1360","components/navigation/SiteHeader.jsx":"37600aec3112","ui_kits/website/BagDrawer.jsx":"7770eb626d82","ui_kits/website/Home.jsx":"7c33907bc816","ui_kits/website/IngredientModal.jsx":"9d8128ec8fdf","ui_kits/website/Product.jsx":"3d3bffbdcd26","ui_kits/website/motion.js":"ae8969789633","ui_kits/website/shared.jsx":"15d0b4efe3f7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TheRightMoleculeDesignSystem_d2cf6c = window.TheRightMoleculeDesignSystem_d2cf6c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  inverse = false,
  rule = false,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    "data-eyebrow": "",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--type-eyebrow)',
      fontWeight: 400,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: inverse ? 'var(--fg-on-inverse-2)' : 'var(--fg-2)',
      ...style
    }
  }, rule && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 1,
      background: 'currentColor',
      opacity: 0.6
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/brand/Heading.jsx
try { (() => {
function Heading({
  children,
  italic,
  level = 'l',
  as = 'h2',
  inverse = false,
  align = 'left',
  style
}) {
  const size = {
    xl: 'var(--type-display-xl)',
    l: 'var(--type-display-l)',
    m: 'var(--type-display-m)',
    s: 'var(--type-display-s)'
  }[level];
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, {
    style: {
      margin: 0,
      fontFamily: 'var(--font-serif)',
      fontWeight: 500,
      fontSize: size,
      lineHeight: 'var(--leading-tight)',
      letterSpacing: '-0.005em',
      color: inverse ? 'var(--fg-on-inverse)' : 'var(--fg-1)',
      textAlign: align,
      textWrap: 'balance',
      ...style
    }
  }, children, italic && /*#__PURE__*/React.createElement(React.Fragment, null, ' ', /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'italic',
      fontWeight: 400
    }
  }, italic)));
}
Object.assign(__ds_scope, { Heading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Heading.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logotype.jsx
try { (() => {
const SIZES = {
  sm: 11,
  md: 14,
  lg: 22,
  xl: 34
};
function Logotype({
  size = 'md',
  inverse = false,
  rule = false,
  align = 'left',
  oneLine = false
}) {
  const fs = typeof size === 'number' ? size : SIZES[size] || SIZES.md;
  const color = inverse ? 'var(--fg-on-inverse)' : 'var(--fg-1)';
  return /*#__PURE__*/React.createElement("span", {
    "aria-label": "the right molecule",
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      color,
      fontFamily: 'var(--font-logo)',
      fontWeight: 300,
      fontSize: fs,
      lineHeight: 1.28,
      letterSpacing: 'var(--tracking-logo)',
      textTransform: 'lowercase',
      whiteSpace: 'nowrap'
    }
  }, oneLine ? /*#__PURE__*/React.createElement("span", null, "the right molecule") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "the right"), /*#__PURE__*/React.createElement("span", null, "molecule")), rule && /*#__PURE__*/React.createElement("span", {
    "data-rule": "",
    style: {
      display: 'block',
      width: fs * 2.8,
      height: 1,
      background: 'currentColor',
      opacity: 0.7,
      marginTop: fs * 0.9
    }
  }));
}
Object.assign(__ds_scope, { Logotype });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logotype.jsx", error: String((e && e.message) || e) }); }

// components/brand/StackedCaps.jsx
try { (() => {
function StackedCaps({
  lines = ['Real', 'science.', 'Real', 'balance.'],
  family = 'serif',
  inverse = false,
  rule = false,
  size = 14,
  align = 'left'
}) {
  const color = inverse ? 'var(--fg-on-inverse)' : 'var(--fg-1)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start',
      gap: size * 0.55,
      color,
      fontFamily: family === 'serif' ? 'var(--font-serif)' : 'var(--font-sans)',
      fontWeight: family === 'serif' ? 500 : 400,
      fontSize: size,
      lineHeight: 1,
      letterSpacing: family === 'serif' ? 'var(--tracking-serif-caps)' : 'var(--tracking-eyebrow)',
      textTransform: 'uppercase'
    }
  }, lines.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, l)), rule && /*#__PURE__*/React.createElement("span", {
    "data-rule": "",
    style: {
      width: size * 3,
      height: 1,
      background: 'currentColor',
      opacity: 0.6,
      marginTop: size * 0.4
    }
  }));
}
Object.assign(__ds_scope, { StackedCaps });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/StackedCaps.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
// Paths copied verbatim from lucide-static@0.400.0 (ISC). Brand renders them at a hairline stroke.
const PATHS = {
  "sparkle": "<path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\" />",
  "leaf": "<path d=\"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z\" /> <path d=\"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12\" />",
  "flask-conical": "<path d=\"M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2\" /> <path d=\"M8.5 2h7\" /> <path d=\"M7 16h10\" />",
  "atom": "<circle cx=\"12\" cy=\"12\" r=\"1\" /> <path d=\"M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z\" /> <path d=\"M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z\" />",
  "shield-check": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" /> <path d=\"m9 12 2 2 4-4\" />",
  "network": "<rect x=\"16\" y=\"16\" width=\"6\" height=\"6\" rx=\"1\" /> <rect x=\"2\" y=\"16\" width=\"6\" height=\"6\" rx=\"1\" /> <rect x=\"9\" y=\"2\" width=\"6\" height=\"6\" rx=\"1\" /> <path d=\"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3\" /> <path d=\"M12 12V8\" />",
  "refresh-ccw": "<path d=\"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\" /> <path d=\"M3 3v5h5\" /> <path d=\"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16\" /> <path d=\"M16 16h5v5\" />",
  "sun": "<circle cx=\"12\" cy=\"12\" r=\"4\" /> <path d=\"M12 2v2\" /> <path d=\"M12 20v2\" /> <path d=\"m4.93 4.93 1.41 1.41\" /> <path d=\"m17.66 17.66 1.41 1.41\" /> <path d=\"M2 12h2\" /> <path d=\"M20 12h2\" /> <path d=\"m6.34 17.66-1.41 1.41\" /> <path d=\"m19.07 4.93-1.41 1.41\" />",
  "sprout": "<path d=\"M7 20h10\" /> <path d=\"M10 20c5.5-2.5.8-6.4 3-10\" /> <path d=\"M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z\" /> <path d=\"M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z\" />",
  "arrow-right": "<path d=\"M5 12h14\" /> <path d=\"m12 5 7 7-7 7\" />",
  "shopping-bag": "<path d=\"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z\" /> <path d=\"M3 6h18\" /> <path d=\"M16 10a4 4 0 0 1-8 0\" />",
  "instagram": "<rect width=\"20\" height=\"20\" x=\"2\" y=\"2\" rx=\"5\" ry=\"5\" /> <path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\" /> <line x1=\"17.5\" x2=\"17.51\" y1=\"6.5\" y2=\"6.5\" />",
  "linkedin": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\" /> <rect width=\"4\" height=\"12\" x=\"2\" y=\"9\" /> <circle cx=\"4\" cy=\"4\" r=\"2\" />",
  "youtube": "<path d=\"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17\" /> <path d=\"m10 15 5-3-5-3z\" />",
  "chevron-left": "<path d=\"m15 18-6-6 6-6\" />",
  "chevron-right": "<path d=\"m9 18 6-6-6-6\" />",
  "plus": "<path d=\"M5 12h14\" /> <path d=\"M12 5v14\" />",
  "minus": "<path d=\"M5 12h14\" />",
  "x": "<path d=\"M18 6 6 18\" /> <path d=\"m6 6 12 12\" />",
  "menu": "<line x1=\"4\" x2=\"20\" y1=\"12\" y2=\"12\" /> <line x1=\"4\" x2=\"20\" y1=\"6\" y2=\"6\" /> <line x1=\"4\" x2=\"20\" y1=\"18\" y2=\"18\" />",
  "moon-star": "<path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9\" /> <path d=\"M20 3v4\" /> <path d=\"M22 5h-4\" />",
  "search": "<circle cx=\"11\" cy=\"11\" r=\"8\" /> <path d=\"m21 21-4.3-4.3\" />",
  "user": "<path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\" /> <circle cx=\"12\" cy=\"7\" r=\"4\" />",
  "check": "<path d=\"M20 6 9 17l-5-5\" />",
  "truck": "<path d=\"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2\" /> <path d=\"M15 18H9\" /> <path d=\"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14\" /> <circle cx=\"17\" cy=\"18\" r=\"2\" /> <circle cx=\"7\" cy=\"18\" r=\"2\" />",
  "heart": "<path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\" />"
};
const ICON_NAMES = Object.keys(PATHS);
function Icon({
  name,
  size = 20,
  stroke = 1.1,
  color = 'currentColor',
  style,
  ...rest
}) {
  const inner = PATHS[name];
  if (!inner) return null;
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    style: {
      display: 'block',
      flexShrink: 0,
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: inner
    },
    ...rest
  });
}
Object.assign(__ds_scope, { ICON_NAMES, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/commerce/QuantityStepper.jsx
try { (() => {
function QuantityStepper({
  value = 1,
  min = 1,
  max = 12,
  onChange,
  size = 'md'
}) {
  const h = size === 'sm' ? 34 : 44;
  const set = v => onChange && onChange(Math.max(min, Math.min(max, v)));
  const btn = {
    width: h,
    height: h,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 0,
    color: 'var(--fg-1)',
    cursor: 'pointer'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-1)',
      height: h
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      ...btn,
      opacity: value <= min ? 0.35 : 1
    },
    onClick: () => set(value - 1),
    "aria-label": "Decrease"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "minus",
    size: 14,
    stroke: 1.2
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 28,
      textAlign: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--fg-1)'
    }
  }, value), /*#__PURE__*/React.createElement("button", {
    style: {
      ...btn,
      opacity: value >= max ? 0.35 : 1
    },
    onClick: () => set(value + 1),
    "aria-label": "Increase"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 14,
    stroke: 1.2
  })));
}
Object.assign(__ds_scope, { QuantityStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/QuantityStepper.jsx", error: String((e && e.message) || e) }); }

// components/content/TestimonialSlider.jsx
try { (() => {
function Arrow({
  dir,
  onClick
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    "aria-label": dir === 'left' ? 'Previous' : 'Next',
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      background: 'none',
      border: 0,
      padding: 8,
      cursor: 'pointer',
      color: h ? 'var(--fg-1)' : 'var(--fg-3)',
      transition: 'color var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: dir === 'left' ? 'chevron-left' : 'chevron-right',
    size: 22,
    stroke: 1
  }));
}
function TestimonialSlider({
  items = [],
  autoplay = 0
}) {
  const [i, setI] = React.useState(0);
  const n = items.length || 1;
  const go = d => setI(v => (v + d + n) % n);
  React.useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => go(1), autoplay);
    return () => clearInterval(t);
  }, [autoplay, n]);
  const q = items[i] || {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0,1fr) auto',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    key: i,
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      fontWeight: 300,
      lineHeight: 1.7,
      color: 'var(--fg-1)',
      maxWidth: 380,
      animation: 'trmFade var(--dur-slow) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 22,
      marginRight: 4,
      lineHeight: 0
    }
  }, "\u201C"), q.quote, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 22,
      marginLeft: 2,
      lineHeight: 0
    }
  }, "\u201D")), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 14,
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--fg-2)'
    }
  }, "\u2014 ", q.author), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 22,
      justifyContent: 'flex-end',
      maxWidth: 380
    }
  }, items.map((_, k) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setI(k),
    "aria-label": `Slide ${k + 1}`,
    style: {
      width: 5,
      height: 5,
      padding: 0,
      borderRadius: '50%',
      border: '1px solid var(--fg-1)',
      background: k === i ? 'var(--fg-1)' : 'transparent',
      cursor: 'pointer'
    }
  })))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("style", null, '@keyframes trmFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}'));
}
Object.assign(__ds_scope, { TestimonialSlider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/TestimonialSlider.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const SIZES = {
  sm: {
    padding: '9px 16px',
    fontSize: 12,
    gap: 10
  },
  md: {
    padding: '13px 22px',
    fontSize: 13,
    gap: 14
  },
  lg: {
    padding: '16px 28px',
    fontSize: 14,
    gap: 16
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  arrow = true,
  disabled = false,
  fullWidth = false,
  onClick,
  children,
  style,
  type = 'button'
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const base = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    justifyContent: 'center',
    alignItems: 'center',
    gap: s.gap,
    padding: s.padding,
    fontFamily: 'var(--font-sans)',
    fontSize: s.fontSize,
    fontWeight: 400,
    letterSpacing: 'var(--tracking-button)',
    lineHeight: 1,
    borderRadius: 'var(--radius-2)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-fast) var(--ease-soft), color var(--dur-fast), border-color var(--dur-fast), transform var(--dur-fast)',
    transform: press && !disabled ? 'translateY(1px)' : 'none',
    whiteSpace: 'nowrap'
  };
  const on = hover && !disabled;
  const v = {
    primary: {
      background: press ? 'var(--action-primary-press)' : on ? 'var(--action-primary-hover)' : 'var(--action-primary)',
      color: 'var(--action-on-primary)'
    },
    light: {
      background: on ? 'var(--trm-ivory-100)' : 'var(--trm-ivory-50)',
      color: 'var(--trm-ocean-teal)',
      borderColor: 'rgba(255,255,255,.6)'
    },
    outline: {
      background: on ? 'rgba(23,79,85,.06)' : 'transparent',
      color: 'var(--fg-accent)',
      borderColor: 'var(--trm-ocean-teal)'
    },
    'outline-inverse': {
      background: on ? 'rgba(243,238,228,.08)' : 'transparent',
      color: 'var(--fg-on-inverse)',
      borderColor: 'var(--border-on-inverse)'
    }
  }[variant] || {};
  return /*#__PURE__*/React.createElement("button", {
    "data-magnetic": "",
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
      ...base,
      ...v,
      ...style
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, /*#__PURE__*/React.createElement("span", null, children), arrow && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      overflow: 'hidden',
      width: s.fontSize + 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      transform: on ? 'translateX(0)' : `translateX(-${s.fontSize + 2}px)`,
      transition: 'transform 420ms var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: s.fontSize + 2,
    stroke: 1.3
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: s.fontSize + 2,
    stroke: 1.3
  }))));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function ProductCard({
  image,
  name = 'PCOS',
  nameItalic = 'Harmony',
  descriptor = 'Daily support for PCOS, built from the biology up',
  meta = '31 sachets · Passion Fruit',
  price = '₹1,480',
  onAdd,
  onOpen
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      width: '100%',
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onOpen,
    style: {
      aspectRatio: '4/5',
      background: 'var(--bg-sunken)',
      overflow: 'hidden',
      cursor: onOpen ? 'pointer' : 'default',
      borderRadius: 'var(--radius-1)'
    }
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: `${name} ${nameItalic}`,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      padding: '8% 10%',
      display: 'block',
      transform: h ? 'scale(1.03)' : 'scale(1)',
      transition: 'transform var(--dur-reveal) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-serif)',
      fontWeight: 500,
      fontSize: 28,
      lineHeight: 1.05,
      color: 'var(--fg-1)'
    }
  }, name, " ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontWeight: 400
    }
  }, nameItalic)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      color: 'var(--fg-1)'
    }
  }, price)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: -10,
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 300,
      lineHeight: 1.55,
      color: 'var(--fg-2)'
    }
  }, /*#__PURE__*/React.createElement("div", null, descriptor), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--fg-3)',
      fontSize: 12,
      marginTop: 4
    }
  }, meta)), onAdd && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    onClick: onAdd,
    style: {
      alignSelf: 'flex-start'
    }
  }, "Add to bag"));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/IconBadge.jsx
try { (() => {
function IconBadge({
  name,
  size = 52,
  inverse = false,
  bordered = true
}) {
  const color = inverse ? 'var(--fg-on-inverse)' : 'var(--fg-1)';
  const ring = inverse ? 'var(--border-on-inverse)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("span", {
    "data-badge": "",
    style: {
      position: 'relative',
      width: size,
      height: size,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color,
      flexShrink: 0
    }
  }, bordered && /*#__PURE__*/React.createElement("svg", {
    "data-ring": "",
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    fill: "none",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      transform: 'rotate(-90deg)',
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: size / 2 - 0.5,
    style: {
      stroke: ring
    },
    strokeWidth: "1"
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: name,
    size: Math.round(size * 0.44),
    stroke: 1
  }));
}
Object.assign(__ds_scope, { IconBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconBadge.jsx", error: String((e && e.message) || e) }); }

// components/content/IngredientItem.jsx
try { (() => {
function IngredientItem({
  icon = 'network',
  name,
  benefit,
  inverse = false,
  size = 'md'
}) {
  const badge = size === 'sm' ? 40 : 52;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: size === 'sm' ? 14 : 20
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconBadge, {
    name: icon,
    size: badge,
    inverse: inverse
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: size === 'sm' ? 12 : 13,
      lineHeight: 1.45,
      color: inverse ? 'var(--fg-on-inverse)' : 'var(--fg-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 400
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      color: inverse ? 'var(--fg-on-inverse-2)' : 'var(--fg-2)',
      fontWeight: 300,
      maxWidth: 160
    }
  }, benefit)));
}
Object.assign(__ds_scope, { IngredientItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/IngredientItem.jsx", error: String((e && e.message) || e) }); }

// components/content/TrustPoint.jsx
try { (() => {
function TrustPoint({
  icon = 'leaf',
  title,
  subtitle,
  inverse = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconBadge, {
    name: icon,
    size: 44,
    inverse: inverse
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: 1.35,
      fontWeight: 400,
      color: inverse ? 'var(--fg-on-inverse)' : 'var(--fg-1)',
      whiteSpace: 'pre-line'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      marginTop: 6,
      fontWeight: 300,
      letterSpacing: '.02em',
      color: inverse ? 'var(--fg-on-inverse-2)' : 'var(--fg-3)'
    }
  }, subtitle)));
}
Object.assign(__ds_scope, { TrustPoint });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/TrustPoint.jsx", error: String((e && e.message) || e) }); }

// components/core/TextLink.jsx
try { (() => {
function TextLink({
  children,
  href = '#',
  arrow = false,
  inverse = false,
  underline = true,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const color = inverse ? 'var(--fg-on-inverse)' : 'var(--fg-1)';
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      letterSpacing: '.02em',
      color,
      textDecoration: 'none',
      cursor: 'pointer',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      paddingBottom: 4
    }
  }, children, underline && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 1,
      background: 'currentColor',
      opacity: hover ? 1 : 0.55,
      transformOrigin: 'left',
      transform: hover ? 'scaleX(1)' : 'scaleX(.999)',
      transition: 'opacity var(--dur-fast)'
    }
  })), arrow && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      overflow: 'hidden',
      width: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      transform: hover ? 'translateX(0)' : 'translateX(-14px)',
      transition: 'transform 420ms var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 14,
    stroke: 1.3
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 14,
    stroke: 1.3
  }))));
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextInput.jsx
try { (() => {
function TextInput({
  value,
  onChange,
  placeholder = 'Your email address',
  type = 'email',
  label,
  error,
  inverse = false,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      flex: 1,
      minWidth: 0
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: inverse ? 'var(--fg-on-inverse-2)' : 'var(--fg-2)'
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 300,
      padding: '13px 16px',
      borderRadius: 'var(--radius-1)',
      outline: 'none',
      background: inverse ? 'transparent' : 'var(--trm-ivory-50)',
      color: inverse ? 'var(--fg-on-inverse)' : 'var(--fg-1)',
      border: `1px solid ${error ? 'var(--status-error)' : focus ? 'var(--trm-ocean-teal)' : inverse ? 'var(--border-on-inverse)' : 'var(--border-hairline)'}`,
      boxShadow: focus ? '0 0 0 3px var(--focus-ring)' : 'none',
      transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
      ...style
    }
  }), error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--status-error)'
    }
  }, error));
}
Object.assign(__ds_scope, { TextInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextInput.jsx", error: String((e && e.message) || e) }); }

// components/forms/EmailSignup.jsx
try { (() => {
const MORPH_MS = 560;
function EmailSignup({
  buttonLabel = 'Subscribe',
  placeholder = 'Your email address',
  successLabel = "You're in the loop",
  onSubmit,
  inverse = false
}) {
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  const [err, setErr] = React.useState('');
  const [hover, setHover] = React.useState(false);
  const submit = e => {
    e.preventDefault();
    if (done) return;
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErr('Please enter a valid email address.');
      return;
    }
    setErr('');
    setDone(true);
    onSubmit && onSubmit(email);
  };
  const ease = 'cubic-bezier(.22,.61,.36,1)';
  const fg = inverse ? 'var(--fg-on-inverse)' : 'var(--fg-1)';
  const fill = inverse ? 'var(--trm-ivory-50)' : hover ? 'var(--action-primary-hover)' : 'var(--action-primary)';
  const onFill = inverse ? 'var(--trm-petrol)' : 'var(--action-on-primary)';
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    noValidate: true,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      width: '100%',
      maxWidth: 480
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: 46
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": done,
    style: {
      flexGrow: done ? 0 : 1,
      flexBasis: 0,
      minWidth: 0,
      overflow: 'hidden',
      opacity: done ? 0 : 1,
      transition: `flex-grow ${MORPH_MS}ms ${ease}, opacity 260ms ease`
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.TextInput, {
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: placeholder,
    inverse: inverse,
    style: {
      borderRight: 0,
      borderRadius: '2px 0 0 2px',
      height: 46,
      boxSizing: 'border-box'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flexGrow: done ? 1 : 0,
      flexBasis: 'auto',
      transition: `flex-grow ${MORPH_MS}ms ${ease}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    "data-magnetic": "",
    type: "submit",
    disabled: done,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      padding: '0 22px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      whiteSpace: 'nowrap',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      letterSpacing: 'var(--tracking-button)',
      cursor: done ? 'default' : 'pointer',
      background: done ? 'transparent' : fill,
      color: done ? fg : onFill,
      border: `1px solid ${done ? inverse ? 'var(--border-on-inverse)' : 'var(--border-strong)' : 'transparent'}`,
      borderRadius: done ? '3px' : '0 3px 3px 0',
      transition: `background 420ms ease, color 420ms ease, border-color 420ms ease, border-radius ${MORPH_MS}ms ${ease}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
      opacity: done ? 0 : 1,
      transform: done ? 'translateY(-6px)' : 'none',
      transition: 'opacity 220ms ease, transform 320ms ease',
      position: done ? 'absolute' : 'static'
    }
  }, buttonLabel, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 15,
    stroke: 1.3
  })), /*#__PURE__*/React.createElement("span", {
    role: "status",
    "aria-live": "polite",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 19,
      opacity: done ? 1 : 0,
      transform: done ? 'none' : 'translateY(6px)',
      transition: `opacity 420ms ease ${MORPH_MS - 180}ms, transform 520ms ${ease} ${MORPH_MS - 180}ms`,
      position: done ? 'static' : 'absolute'
    }
  }, done && /*#__PURE__*/React.createElement(React.Fragment, null, successLabel, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      animation: `trmTwinkle 1.1s ${ease} ${MORPH_MS}ms both`
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "sparkle",
    size: 15,
    stroke: 1.1
  }))))))), err && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: inverse ? '#E7B9B0' : 'var(--status-error)'
    }
  }, err), /*#__PURE__*/React.createElement("style", null, '@keyframes trmTwinkle{0%{opacity:0;transform:scale(.2) rotate(-60deg)}55%{opacity:1;transform:scale(1.35) rotate(0)}100%{opacity:1;transform:scale(1)}}@media (prefers-reduced-motion: reduce){[style*="trmTwinkle"]{animation:none!important}}'));
}
Object.assign(__ds_scope, { EmailSignup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/EmailSignup.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
function SiteFooter({
  links = ['Be Part of Our Beginning', 'Our Science', 'Contact'],
  onNavigate,
  year = 2026,
  signoff = 'Science. Balance. You.'
}) {
  const link = {
    fontFamily: 'var(--font-sans)',
    fontSize: 13,
    color: 'var(--fg-on-inverse)',
    textDecoration: 'none',
    opacity: 0.9
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--bg-inverse)',
      color: 'var(--fg-on-inverse)',
      padding: '56px var(--gutter) 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logotype, {
    inverse: true,
    rule: true,
    size: "md"
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'clamp(20px,3vw,48px)'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate(l);
    },
    style: link
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      justifySelf: 'end',
      display: 'flex',
      gap: 20
    }
  }, ['instagram', 'linkedin', 'youtube'].map(n => /*#__PURE__*/React.createElement("a", {
    key: n,
    href: "#",
    "aria-label": n,
    style: {
      color: 'var(--fg-on-inverse)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: n,
    size: 18,
    stroke: 1.2
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      paddingTop: 20,
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--fg-on-inverse-2)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", year, " The Right Molecule. All rights reserved."), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-on-inverse)'
    }
  }, signoff)));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
const DEFAULT_LINKS = ['Home', 'Products', 'Our Science'];
function NavLink({
  label,
  active,
  onClick
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onClick && onClick(label);
    },
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      position: 'relative',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--type-nav)',
      color: 'var(--fg-1)',
      textDecoration: 'none',
      padding: '6px 0',
      letterSpacing: '.01em'
    }
  }, label, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -2,
      height: 1,
      background: 'var(--fg-1)',
      transform: active || h ? 'scaleX(1)' : 'scaleX(0)',
      transformOrigin: 'left',
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  }));
}
function SiteHeader({
  links = DEFAULT_LINKS,
  active = 'Home',
  onNavigate,
  bagCount = 0,
  onBag,
  onShop,
  brandMark = false,
  transparent = true
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      gap: 24,
      padding: '26px var(--gutter)',
      background: transparent ? 'transparent' : 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate('Home');
    },
    style: {
      justifySelf: 'start',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logotype, {
    size: "md"
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'clamp(18px,2.6vw,40px)'
    }
  }, links.map(l => /*#__PURE__*/React.createElement(NavLink, {
    key: l,
    label: l,
    active: l === active,
    onClick: onNavigate
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      justifySelf: 'end',
      display: 'flex',
      alignItems: 'center',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    onClick: onShop
  }, "Be Part of Our Beginning"), brandMark ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    "data-anim": "sparkle",
    "data-delay": "900",
    style: { display: 'inline-flex', padding: 4, color: 'var(--fg-1)' }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, { name: "moon-star", size: 22, stroke: 1 })) : /*#__PURE__*/React.createElement("button", {
    onClick: onBag,
    "aria-label": "Bag",
    style: {
      position: 'relative',
      background: 'none',
      border: 0,
      padding: 4,
      cursor: 'pointer',
      color: 'var(--fg-1)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "shopping-bag",
    size: 22,
    stroke: 1.1
  }), bagCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -2,
      right: -4,
      minWidth: 16,
      height: 16,
      borderRadius: 8,
      background: 'var(--trm-ocean-teal)',
      color: 'var(--trm-ivory-50)',
      fontFamily: 'var(--font-sans)',
      fontSize: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 4px'
    }
  }, bagCount))));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/BagDrawer.jsx
try { (() => {
function BagDrawer({
  open,
  items,
  onClose,
  onQty,
  onRemove
}) {
  const {
    Button,
    QuantityStepper,
    Icon,
    Heading
  } = DS;
  const subtotal = items.reduce((s, i) => s + i.qty * PRODUCT.price, 0);
  const panel = React.useRef(null);
  const list = React.useRef(null);
  useOverlay(panel, open, onClose);
  React.useEffect(() => {
    if (open && window.TRMMotion && window.TRMMotion.drawerItems) window.TRMMotion.drawerItems(list.current);
  }, [open]);
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": !open,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      pointerEvents: open ? 'auto' : 'none',
      visibility: open ? 'visible' : 'hidden',
      transition: open ? 'visibility 0s' : 'visibility 0s linear 520ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(15,40,44,.32)',
      opacity: open ? 1 : 0,
      transition: 'opacity var(--dur-base) var(--ease-soft)'
    }
  }), /*#__PURE__*/React.createElement("aside", {
    ref: panel,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Your bag",
    tabIndex: -1,
    style: {
      outline: 'none',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: 'min(420px,100%)',
      background: 'var(--bg-page-raised)',
      boxShadow: 'var(--shadow-float)',
      transform: open ? 'none' : 'translateX(100%)',
      transition: 'transform 520ms var(--ease-out)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '26px 28px',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement(Heading, {
    level: "s",
    as: "h2",
    style: {
      fontSize: 26
    }
  }, "Your bag"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      background: 'none',
      border: 0,
      cursor: 'pointer',
      color: 'var(--fg-1)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    ref: list,
    style: {
      flex: 1,
      overflow: 'auto',
      padding: '8px 28px'
    }
  }, items.length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 20,
      color: 'var(--fg-2)',
      marginTop: 32
    }
  }, "Your bag is empty."), items.map((it, k) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'grid',
      gridTemplateColumns: '72px 1fr auto',
      gap: 16,
      padding: '20px 0',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4/5',
      overflow: 'hidden',
      background: 'var(--bg-sunken)',
      padding: 6
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${ASSET}product/sachet-front.png`,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 20,
      fontWeight: 500
    }
  }, "PCOS ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontWeight: 400
    }
  }, "Harmony")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--fg-2)'
    }
  }, it.flavour, " \xB7 30 sachets"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(QuantityStepper, {
    size: "sm",
    value: it.qty,
    onChange: v => onQty(k, v)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, "\xA3", it.qty * PRODUCT.price), /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(k),
    style: {
      background: 'none',
      border: 0,
      padding: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--fg-3)',
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  }, "Remove"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 28px',
      borderTop: '1px solid var(--border-hairline)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", null, "Subtotal"), /*#__PURE__*/React.createElement("span", null, "\xA3", subtotal)), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    disabled: !items.length
  }, "Checkout"))));
}
Object.assign(window, {
  BagDrawer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/BagDrawer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
function Hero({
  onShop
}) {
  const {
    Eyebrow,
    Heading,
    Button,
    TextLink,
    StackedCaps
  } = DS;
  return /*#__PURE__*/React.createElement("section", {
    "data-section": "hero",
    style: {
      position: 'relative',
      background: 'var(--bg-page)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    "data-float": "",
    "data-parallax-y": "-140",
    "data-parallax-from": "20",
    "data-parallax-rot": "-8",
    src: `${ASSET}brand/lineart-drop-petrol.png`,
    alt: "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '47%',
      bottom: 150,
      width: 30,
      opacity: 0.8,
      zIndex: 1,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "data-parallax-y": "90",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse 42% 60% at 72% 46%, var(--trm-ivory-50) 0%, rgba(250,247,241,0) 70%), radial-gradient(ellipse 30% 40% at 74% 58%, rgba(29,63,106,.07) 0%, rgba(29,63,106,0) 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '24px var(--gutter) 190px',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,.8fr) auto',
      gap: 'clamp(24px,3vw,48px)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: 2,
      gridRow: 1,
      display: 'flex',
      justifyContent: 'center',
      transform: 'translateX(clamp(-64px, -4.5vw, -16px))'
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    anim: "sachets",
    "data-tilt": "",
    delay: 250,
    style: {
      position: 'relative',
      height: 'min(580px, 58vw)',
      aspectRatio: '754/1368'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-parallax-y": "-50",
    "data-parallax-rot": "2",
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      height: '92%',
      aspectRatio: '372/1368',
      left: '46%',
      top: '6%',
      transform: 'rotate(5deg)',
      transformOrigin: 'bottom center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${ASSET}product/sachet-back.png`,
    alt: "",
    style: {
      display: 'block',
      width: '100%',
      height: '100%'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "data-shine": "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'linear-gradient(105deg, rgba(255,255,255,0) 40%, rgba(255,255,255,.7) 50%, rgba(255,255,255,0) 60%)',
      backgroundSize: '260% 100%',
      backgroundPosition: '130% 0',
      mixBlendMode: 'soft-light',
      WebkitMaskImage: `url(${ASSET}product/sachet-back.png)`,
      maskImage: `url(${ASSET}product/sachet-back.png)`,
      WebkitMaskSize: '100% 100%',
      maskSize: '100% 100%'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    "data-parallax-y": "-110",
    "data-parallax-rot": "-1.5",
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    "data-anim": "sparkle",
    "data-delay": "1500",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '-7%',
      top: '31%',
      color: 'var(--trm-petrol)',
      zIndex: 2,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(DS.Icon, {
    name: "sparkle",
    size: 18,
    stroke: 1
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      height: '100%',
      aspectRatio: '370/1368',
      left: '4%',
      top: 0,
      transform: 'rotate(-3deg)',
      transformOrigin: 'bottom center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${ASSET}product/sachet-front.png`,
    alt: "PCOS Harmony sachet",
    style: {
      display: 'block',
      width: '100%',
      height: '100%',
      filter: 'drop-shadow(0 30px 40px rgba(6,48,63,.25))'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "data-shine": "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'linear-gradient(105deg, rgba(255,255,255,0) 40%, rgba(255,255,255,.7) 50%, rgba(255,255,255,0) 60%)',
      backgroundSize: '260% 100%',
      backgroundPosition: '130% 0',
      mixBlendMode: 'soft-light',
      WebkitMaskImage: `url(${ASSET}product/sachet-front.png)`,
      maskImage: `url(${ASSET}product/sachet-front.png)`,
      WebkitMaskSize: '100% 100%',
      maskSize: '100% 100%'
    }
  }))), /*#__PURE__*/React.createElement("span", {
    "data-sheen": "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 3,
      pointerEvents: 'none',
      opacity: 0,
      mixBlendMode: 'soft-light',
      background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 30%), rgba(255,255,255,.75) 0%, rgba(255,255,255,0) 45%)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: 1,
      gridRow: 1,
      maxWidth: 520
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "Molecular level care")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement(Heading, {
    as: "h1",
    level: "xl",
    style: {
      margin: '22px 0 22px'
    }
  }, /*#__PURE__*/React.createElement(Line, null, "Science backed"), /*#__PURE__*/React.createElement(Line, null, "nutrition for ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontWeight: 400
    }
  }, "real"), " life."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 240
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--type-body-l)',
      fontWeight: 300,
      lineHeight: 1.6,
      color: 'var(--fg-2)',
      maxWidth: 380
    }
  }, "Premium supplements crafted with precision, rooted in science, made for you.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 360,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: onShop
  }, "Be Part of Our Beginning"), /*#__PURE__*/React.createElement(TextLink, {
    href: "#science"
  }, "Explore Science"))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: 3,
      gridRow: 1
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 480
  }, /*#__PURE__*/React.createElement(StackedCaps, {
    size: 12,
    rule: true
  })))), /*#__PURE__*/React.createElement("svg", {
    "data-wave": "",
    viewBox: "0 0 1440 140",
    preserveAspectRatio: "none",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -1,
      width: '100%',
      height: 140,
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 60 C 320 150, 760 150, 1060 90 S 1380 20, 1440 30 L1440 140 L0 140 Z",
    fill: "#0B4458"
  })));
}
function TrustBand() {
  const {
    TrustPoint,
    Icon
  } = DS;
  const pts = [['leaf', 'Clean\nIngredients', 'Pure. Safe. Effective.'], ['flask-conical', 'Backed by\nScience', 'Research-driven formulas'], ['atom', 'Molecular\nPrecision', 'Targeted. Absorbed. Utilised.'], ['shield-check', 'Quality\nAssured', 'Tested. Trusted. Certified.']];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--bg-inverse)',
      padding: '8px var(--gutter) 44px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
      gap: 24
    }
  }, pts.map(([i, t, s], k) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: k * 70,
    draw: true,
    style: {
      borderLeft: k ? '1px solid var(--border-on-inverse)' : 0,
      paddingLeft: k ? 28 : 0
    }
  }, /*#__PURE__*/React.createElement(TrustPoint, {
    icon: i,
    title: t,
    subtitle: s
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      margin: '40px auto 22px',
      maxWidth: 520,
      color: 'var(--fg-on-inverse-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "data-rule": "",
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border-on-inverse)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "data-anim": "sparkle",
    "data-delay": "700",
    style: {
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "moon-star",
    size: 18,
    stroke: 1
  })), /*#__PURE__*/React.createElement("span", {
    "data-rule": "",
    "data-rule-delay": "0.5",
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border-on-inverse)'
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      textAlign: 'center',
      fontSize: 12,
      letterSpacing: '.42em',
      textTransform: 'uppercase',
      color: 'var(--fg-on-inverse)'
    }
  }, "Nutrition. Rooted in science."));
}
function BalanceSection({
  onShop,
  onIngredient
}) {
  const {
    Eyebrow,
    Heading,
    Button,
    IngredientItem
  } = DS;
  return /*#__PURE__*/React.createElement("div", {
    "data-pin": "balance"
  }, /*#__PURE__*/React.createElement("section", {
    "data-pin-section": "",
    "data-crossfade": "from-dark",
    style: {
      position: 'relative',
      background: 'var(--bg-page)',
      padding: 'var(--section-y) var(--gutter)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,.8fr) minmax(0,1fr)',
      gap: 48,
      alignItems: 'center',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "PCOS Harmony"), /*#__PURE__*/React.createElement(Heading, {
    level: "l",
    style: {
      margin: '22px 0'
    }
  }, /*#__PURE__*/React.createElement(Line, null, "In Balance"), /*#__PURE__*/React.createElement(Line, null, /*#__PURE__*/React.createElement("em", {
    style: {
      fontWeight: 400
    }
  }, "with What")), /*#__PURE__*/React.createElement(Line, null, /*#__PURE__*/React.createElement("em", {
    style: {
      fontWeight: 400
    }
  }, "Moves You."))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 32px',
      fontSize: 'var(--type-body)',
      fontWeight: 300,
      lineHeight: 'var(--leading-body)',
      color: 'var(--fg-2)',
      maxWidth: 300
    }
  }, "A science-backed blend to support hormone balance, cycle rhythm, metabolic health and overall women's wellness."), /*#__PURE__*/React.createElement(Button, {
    onClick: onShop
  }, "Be Part of Our Beginning")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 150,
    y: 30,
    style: {
      justifySelf: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: 360,
      height: 360,
      transform: 'translate(-50%,-50%)',
      borderRadius: '50%',
      background: 'radial-gradient(circle, var(--trm-ivory-50) 0%, rgba(250,247,241,0) 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "data-flip": "",
    "data-tilt": "",
    style: {
      position: 'relative',
      height: 'min(560px, 70vw)',
      aspectRatio: '370/1368',
      perspective: '1400px',
      transformStyle: 'preserve-3d'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "data-flip-shadow": "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '-14%',
      right: '-14%',
      bottom: '-3.5%',
      height: '6%',
      borderRadius: '50%',
      background: 'radial-gradient(ellipse at center, rgba(6,48,63,.34) 0%, rgba(6,48,63,0) 70%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "data-sheen": "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 3,
      pointerEvents: 'none',
      opacity: 0,
      mixBlendMode: 'soft-light',
      background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 30%), rgba(255,255,255,.75) 0%, rgba(255,255,255,0) 45%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "data-flip-stage": "",
    style: {
      position: 'absolute',
      inset: 0,
      transformStyle: 'preserve-3d'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-flip-card": "",
    style: {
      position: 'absolute',
      inset: 0,
      transformStyle: 'preserve-3d'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-flip-front": "",
    style: {
      position: 'absolute',
      inset: 0,
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transform: 'translateZ(5px)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${ASSET}product/sachet-front.png`,
    alt: "PCOS Harmony sachet",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "data-face-shade": "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: '#04161D',
      opacity: 0,
      pointerEvents: 'none',
      WebkitMaskImage: `url(${ASSET}product/sachet-front.png)`,
      maskImage: `url(${ASSET}product/sachet-front.png)`,
      WebkitMaskSize: '100% 100%',
      maskSize: '100% 100%'
    }
  })), /*#__PURE__*/React.createElement("span", {
    "data-flip-edge": "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: '4%',
      bottom: '4%',
      left: 'calc(9% - 5px)',
      width: 10,
      transform: 'rotateY(90deg)',
      background: 'linear-gradient(180deg,#0B4A5E 0%,#06384B 45%,#1D3F6A 74%,#2C1B3A 100%)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "data-flip-edge": "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: '4%',
      bottom: '4%',
      right: 'calc(9% - 5px)',
      width: 10,
      transform: 'rotateY(90deg)',
      background: 'linear-gradient(180deg,#0B4A5E 0%,#06384B 45%,#1D3F6A 74%,#2C1B3A 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "data-flip-back": "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transform: 'rotateY(180deg) translateZ(5px)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${ASSET}product/sachet-back.png`,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      display: 'block'
    }
  }), [36.2, 42.7, 49.2, 55.7].map((t, k) => /*#__PURE__*/React.createElement("span", {
    key: k,
    "data-glow": k,
    style: {
      position: 'absolute',
      left: '12%',
      width: '80%',
      top: `${t - 3.4}%`,
      height: '6.8%',
      background: 'radial-gradient(ellipse at 22% 50%, rgba(236,226,204,.6) 0%, rgba(236,226,204,.18) 42%, rgba(236,226,204,0) 72%)',
      mixBlendMode: 'screen',
      opacity: 0,
      pointerEvents: 'none'
    }
  })), /*#__PURE__*/React.createElement("span", {
    "data-face-shade": "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: '#04161D',
      opacity: 0,
      pointerEvents: 'none',
      WebkitMaskImage: `url(${ASSET}product/sachet-back.png)`,
      maskImage: `url(${ASSET}product/sachet-back.png)`,
      WebkitMaskSize: '100% 100%',
      maskSize: '100% 100%'
    }
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, PRODUCT.ingredients.map(g => /*#__PURE__*/React.createElement("button", {
    key: g.name,
    type: "button",
    "data-pin-item": "",
    "aria-label": `About ${g.name}`,
    onClick: e => onIngredient && onIngredient(g, e.currentTarget),
    style: ingredientButton
  }, /*#__PURE__*/React.createElement(IngredientItem, g))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 450
  }, /*#__PURE__*/React.createElement("div", {
    "data-rule": "",
    style: {
      width: 120,
      height: 1,
      background: 'var(--border-strong)',
      margin: '6px 0 18px'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 'var(--type-quote)',
      lineHeight: 1.3
    }
  }, "More than a supplement.", /*#__PURE__*/React.createElement("br", null), "A more balanced you.")))));
}
function PhilosophySplit() {
  const {
    Eyebrow,
    Heading,
    TextLink
  } = DS;
  return /*#__PURE__*/React.createElement("section", {
    id: "science",
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    "data-float": "",
    "data-parallax-y": "-90",
    "data-parallax-from": "60",
    "data-parallax-rot": "5",
    src: `${ASSET}brand/lineart-frond-petrol.png`,
    alt: "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: 'calc(var(--gutter) * .6)',
      top: -150,
      width: 70,
      opacity: 0.7,
      zIndex: 2,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 'clamp(420px,46vw,560px)',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse 55% 60% at 50% 50%, var(--trm-ivory-50) 0%, var(--bg-sunken) 80%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '36px 0'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    "data-orbit": "",
    viewBox: "0 0 100 100",
    preserveAspectRatio: "xMidYMid meet",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '78%',
      height: '78%',
      transform: 'translate(-50%,-50%)',
      overflow: 'visible',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    "data-orbit-ring": "",
    cx: "50",
    cy: "50",
    r: "48",
    fill: "none",
    stroke: "#0B4458",
    strokeOpacity: "0.22",
    strokeWidth: "0.25",
    vectorEffect: "non-scaling-stroke",
    transform: "rotate(-90 50 50)"
  }), /*#__PURE__*/React.createElement("g", {
    "data-orbit-dot": "",
    style: {
      transformOrigin: '50px 50px'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "2",
    r: "0.9",
    fill: "#0B4458"
  }))), /*#__PURE__*/React.createElement("div", {
    "data-zoom": "",
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '4%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "data-split": "left",
    style: {
      position: 'relative',
      display: 'block',
      height: '100%',
      transform: 'rotate(-2deg)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${ASSET}product/sachet-front.png`,
    alt: "PCOS Harmony front",
    style: {
      height: '100%',
      width: 'auto',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "data-sweep": "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(105deg, rgba(255,255,255,0) 38%, rgba(255,255,255,.55) 50%, rgba(255,255,255,0) 62%)',
      backgroundSize: '250% 100%',
      backgroundPosition: '130% 0',
      mixBlendMode: 'soft-light',
      WebkitMaskImage: `url(${ASSET}product/sachet-front.png)`,
      maskImage: `url(${ASSET}product/sachet-front.png)`,
      WebkitMaskSize: '100% 100%',
      maskSize: '100% 100%',
      pointerEvents: 'none'
    }
  })), /*#__PURE__*/React.createElement("span", {
    "data-split": "right",
    style: {
      position: 'relative',
      display: 'block',
      height: '92%',
      transform: 'rotate(3deg)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${ASSET}product/sachet-back.png`,
    alt: "PCOS Harmony back",
    style: {
      height: '100%',
      width: 'auto',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "data-sweep": "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(105deg, rgba(255,255,255,0) 38%, rgba(255,255,255,.55) 50%, rgba(255,255,255,0) 62%)',
      backgroundSize: '250% 100%',
      backgroundPosition: '130% 0',
      mixBlendMode: 'soft-light',
      WebkitMaskImage: `url(${ASSET}product/sachet-back.png)`,
      maskImage: `url(${ASSET}product/sachet-back.png)`,
      WebkitMaskSize: '100% 100%',
      maskSize: '100% 100%',
      pointerEvents: 'none'
    }
  })))), /*#__PURE__*/React.createElement(Reveal, {
    style: {
      padding: 'var(--section-y) var(--gutter)',
      alignSelf: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Our philosophy"), /*#__PURE__*/React.createElement(Heading, {
    level: "m",
    style: {
      margin: '20px 0 24px'
    }
  }, /*#__PURE__*/React.createElement(Line, null, "Precision Wellness."), /*#__PURE__*/React.createElement(Line, null, /*#__PURE__*/React.createElement("em", {
    style: {
      fontWeight: 400
    }
  }, "For Her."))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 28px',
      fontSize: 'var(--type-body)',
      fontWeight: 300,
      lineHeight: 'var(--leading-body)',
      color: 'var(--fg-2)',
      maxWidth: 400
    }
  }, "We combine the best of nature and science to create targeted nutrition that fits into real life \u2014 because your wellness deserves more than a one-size-fits-all solution."), /*#__PURE__*/React.createElement(TextLink, {
    arrow: true,
    href: "#science"
  }, "Our Science")));
}
function WomensHealthBanner({
  onShop
}) {
  const {
    Eyebrow,
    Button
  } = DS;
  return /*#__PURE__*/React.createElement("section", {
    "data-crossfade": "to-dark",
    style: {
      position: 'relative',
      background: 'var(--gradient-sachet-diag)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-parallax-y": "36",
    "data-parallax-from": "-36",
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: '32%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-art": "",
    style: {
      position: 'relative',
      height: '100%',
      maxHeight: 470,
      aspectRatio: '262/470',
      maxWidth: '100%',
      WebkitMaskImage: 'linear-gradient(90deg,transparent 0%,#000 40%)',
      maskImage: 'linear-gradient(90deg,transparent 0%,#000 40%)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${ASSET}product/detail-art.jpg`,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: '60% 45%',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "data-shimmer": "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '11%',
      top: '43%',
      width: 14,
      height: 14,
      margin: '-7px 0 0 -7px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,255,255,.95) 0%, rgba(255,255,255,0) 70%)',
      mixBlendMode: 'screen',
      opacity: 0,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "data-shimmer": "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '33.5%',
      top: '64.5%',
      width: 14,
      height: 14,
      margin: '-7px 0 0 -7px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,255,255,.95) 0%, rgba(255,255,255,0) 70%)',
      mixBlendMode: 'screen',
      opacity: 0,
      pointerEvents: 'none'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    "data-veil": "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--bg-page)',
      opacity: 0,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '88px var(--gutter)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,.8fr) minmax(0,.55fr)',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, {
    inverse: true
  }, "Women's health"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '20px 0 0',
      fontFamily: 'var(--font-serif)',
      fontWeight: 500,
      fontSize: 'var(--type-display-m)',
      lineHeight: 1.12,
      color: 'var(--fg-on-inverse)'
    }
  }, /*#__PURE__*/React.createElement(Line, null, "More than a"), /*#__PURE__*/React.createElement(Line, null, "supplement. A more"), /*#__PURE__*/React.createElement(Line, null, "balanced you."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 150,
    style: {
      justifySelf: 'start',
      maxWidth: 340
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 26px',
      fontSize: 14,
      fontWeight: 300,
      lineHeight: 1.65,
      color: 'var(--fg-on-inverse)'
    }
  }, "At The Right Molecule, we believe in science that supports the real you \u2014 through every phase, every cycle, every goal."), /*#__PURE__*/React.createElement(Button, {
    variant: "light",
    size: "sm",
    onClick: onShop
  }, "Be Part of Our Beginning"))));
}
function Stories() {
  const {
    Eyebrow,
    Heading,
    TestimonialSlider
  } = DS;
  const items = [{
    quote: 'I feel more in control of my cycle and have more energy throughout the day. Finally, something that understands what women need.',
    author: 'A, 28'
  }, {
    quote: 'It fits into my morning without thinking about it. Three months in, my cycle feels more predictable.',
    author: 'M, 31'
  }, {
    quote: 'Clear about what is in it and why. That matters to me.',
    author: 'S, 34'
  }];
  return /*#__PURE__*/React.createElement("section", {
    "data-crossfade": "from-dark",
    style: {
      position: 'relative',
      background: 'var(--bg-page)',
      padding: '72px var(--gutter)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.3fr)',
      gap: 48,
      alignItems: 'center',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "Real stories"), /*#__PURE__*/React.createElement(Heading, {
    level: "s",
    style: {
      margin: '18px 0 14px'
    }
  }, /*#__PURE__*/React.createElement(Line, null, "Women Like You")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 300,
      color: 'var(--fg-2)'
    }
  }, "Real journeys. Real results.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 150
  }, /*#__PURE__*/React.createElement(TestimonialSlider, {
    items: items,
    autoplay: 7000
  })), /*#__PURE__*/React.createElement("img", {
    "data-float": "",
    "data-parallax-y": "-70",
    "data-parallax-from": "40",
    "data-parallax-rot": "-6",
    src: `${ASSET}brand/lineart-fan-petrol.png`,
    alt: "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 'calc(var(--gutter) * .5)',
      bottom: -70,
      width: 96,
      opacity: 0.75,
      zIndex: 2,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("img", {
    "data-float": "",
    "data-parallax-y": "-120",
    "data-parallax-from": "30",
    src: `${ASSET}brand/lineart-drop2-petrol.png`,
    alt: "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 'calc(var(--gutter) * .5 + 104px)',
      bottom: -34,
      width: 26,
      opacity: 0.7,
      zIndex: 2,
      pointerEvents: 'none'
    }
  }));
}
function Newsletter() {
  const {
    Eyebrow,
    Heading,
    EmailSignup
  } = DS;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: 'var(--bg-page)',
      padding: '72px var(--gutter)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Stay in the loop"), /*#__PURE__*/React.createElement(Heading, {
    level: "s",
    align: "center",
    style: {
      margin: '16px 0 12px'
    }
  }, /*#__PURE__*/React.createElement(Line, null, "Wellness Insights. Straight to You.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 28px',
      fontSize: 14,
      fontWeight: 300,
      color: 'var(--fg-2)'
    }
  }, "Be the first to know about new products, expert advice and exclusive offers."), /*#__PURE__*/React.createElement(EmailSignup, null)));
}
function HomeScreen({
  onShop,
  onIngredient
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, {
    onShop: onShop
  }), /*#__PURE__*/React.createElement(TrustBand, null), /*#__PURE__*/React.createElement(BalanceSection, {
    onShop: onShop,
    onIngredient: onIngredient
  }), /*#__PURE__*/React.createElement(PhilosophySplit, null), /*#__PURE__*/React.createElement(WomensHealthBanner, {
    onShop: onShop
  }), /*#__PURE__*/React.createElement(Stories, null), /*#__PURE__*/React.createElement(Newsletter, null));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/IngredientModal.jsx
try { (() => {
function IngredientModal({
  item,
  onClose
}) {
  const {
    IconBadge,
    Eyebrow,
    Icon
  } = DS;
  const root = React.useRef(null);
  const backdrop = React.useRef(null);
  const card = React.useRef(null);
  const closing = React.useRef(false);
  const index = PRODUCT.ingredients.findIndex(g => g.name === item.name) + 1;
  const close = () => {
    if (closing.current) return;
    closing.current = true;
    const M = window.TRMMotion;
    if (M && M.overlayOut) M.overlayOut(backdrop.current, card.current).then(onClose);else onClose();
  };
  useOverlay(root, true, close);
  React.useLayoutEffect(() => {
    const M = window.TRMMotion;
    M && M.overlayIn && M.overlayIn(backdrop.current, card.current);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: root,
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "ingredient-title",
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: backdrop,
    onClick: close,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(11,40,50,.26)',
      backdropFilter: 'blur(8px) saturate(1.1)',
      WebkitBackdropFilter: 'blur(8px) saturate(1.1)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: card,
    style: {
      position: 'relative',
      width: 'min(540px, 100%)',
      maxHeight: 'calc(100vh - 48px)',
      overflow: 'auto',
      background: 'var(--bg-page-raised)',
      borderRadius: 'var(--radius-2)',
      boxShadow: 'var(--shadow-float)',
      padding: 'clamp(28px, 5vw, 44px)',
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0,1fr)',
      gap: 28,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: close,
    "aria-label": "Close",
    style: {
      position: 'absolute',
      top: 14,
      right: 14,
      width: 40,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'none',
      border: 0,
      color: 'var(--fg-1)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    "data-modal-icon": ""
  }, /*#__PURE__*/React.createElement(IconBadge, {
    name: item.icon,
    size: 64
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Ingredient ", String(index).padStart(2, '0'), " / ", String(PRODUCT.ingredients.length).padStart(2, '0')), /*#__PURE__*/React.createElement("h2", {
    id: "ingredient-title",
    style: {
      margin: '14px 0 6px',
      fontFamily: 'var(--font-serif)',
      fontWeight: 500,
      fontSize: 34,
      lineHeight: 1.08,
      color: 'var(--fg-1)'
    }
  }, item.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 19,
      color: 'var(--fg-2)'
    }
  }, item.benefit), /*#__PURE__*/React.createElement("div", {
    "data-rule": "",
    style: {
      width: 40,
      height: 1,
      background: 'var(--border-strong)',
      margin: '22px 0'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 300,
      lineHeight: 1.7,
      color: 'var(--fg-1)'
    }
  }, item.blurb), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '18px 0 0',
      fontSize: 12,
      color: 'var(--fg-3)'
    }
  }, "Consult your healthcare professional before starting any supplement."))));
}
Object.assign(window, {
  IngredientModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/IngredientModal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Product.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useCountUp(value, ms = 520) {
  const [n, setN] = React.useState(value);
  const from = React.useRef(value);
  React.useEffect(() => {
    const start = performance.now(),
      a = from.current,
      b = value;
    if (a === b || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      from.current = b;
      setN(b);
      return;
    }
    let raf;
    const tick = t => {
      const p = Math.min(1, (t - start) / ms),
        e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(a + (b - a) * e));
      if (p < 1) raf = requestAnimationFrame(tick);else from.current = b;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      from.current = b;
    };
  }, [value]);
  return n;
}
function ProductScreen({
  onAdd,
  onNavigate,
  onIngredient
}) {
  const {
    Eyebrow,
    Heading,
    Button,
    QuantityStepper,
    IngredientItem,
    Icon,
    StackedCaps
  } = DS;
  const shots = [['sachets-pair.png', 'contain'], ['sachet-front.png', 'contain'], ['sachet-back.png', 'contain'], ['detail-label.jpg', 'cover'], ['detail-art.jpg', 'cover'], ['detail-ingredients.jpg', 'cover']];
  const [shot, setShot] = React.useState(0);
  const [dir, setDir] = React.useState(1);
  const go = k => {
    const n = (k + shots.length) % shots.length;
    setDir(k > shot || shot === shots.length - 1 && n === 0 ? 1 : -1);
    setShot(n);
  };
  const swipe = React.useRef(null);
  const flavourRefs = React.useRef([]);
  const flavourRow = React.useRef(null);
  const [pill, setPill] = React.useState(null);
  const cta = React.useRef(null);
  const [barOn, setBarOn] = React.useState(false);
  const [flavour, setFlavour] = React.useState(PRODUCT.flavours[0]);
  const [qty, setQty] = React.useState(1);
  const days = useCountUp(qty * 30);
  React.useLayoutEffect(() => {
    const measure = () => {
      const b = flavourRefs.current[PRODUCT.flavours.indexOf(flavour)];
      if (b && b.offsetWidth) setPill({
        left: b.offsetLeft,
        width: b.offsetWidth
      });
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) flavourRefs.current.forEach(b => b && ro.observe(b));
    window.addEventListener('resize', measure);
    document.fonts && document.fonts.ready.then(measure);
    return () => {
      ro && ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [flavour]);
  React.useEffect(() => {
    const el = cta.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setBarOn(!e.isIntersecting && e.boundingClientRect.top < 0), {
      threshold: 0
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const [open, setOpen] = React.useState('use');
  const acc = [['use', 'Suggested use', 'Mix 1 sachet in water or your favourite beverage. Take once daily, or as directed by your healthcare professional.'], ['store', 'Storage', 'Keep in a cool, dry place. Do not use if seal is broken.']];
  const small = {
    fontSize: 12,
    color: 'var(--fg-2)'
  };
  return /*#__PURE__*/React.createElement("main", {
    style: {
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px var(--gutter) 0',
      display: 'flex',
      gap: 10,
      ...small
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate('Home');
    },
    style: {
      color: 'var(--fg-2)'
    }
  }, "Home"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", null, "Products"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-1)'
    }
  }, "PCOS Harmony")), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '32px var(--gutter) var(--section-y)',
      display: 'grid',
      gridTemplateColumns: '88px minmax(0,1.1fr) minmax(0,1fr)',
      gap: 32,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    anim: "stagger",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, shots.map(([s, p], k) => /*#__PURE__*/React.createElement("button", {
    key: s,
    onClick: () => go(k),
    "aria-label": `View image ${k + 1}`,
    style: {
      padding: 0,
      border: `1px solid ${k === shot ? 'var(--fg-1)' : 'transparent'}`,
      background: 'none',
      cursor: 'pointer',
      aspectRatio: '4/5',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${ASSET}product/${s}`,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: p,
      padding: p === 'contain' ? 6 : 0,
      display: 'block',
      background: 'var(--bg-sunken)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    "data-tilt": "",
    "data-tilt-max": "4",
    "data-fly-src": "",
    tabIndex: 0,
    "aria-label": "Product gallery, use arrow keys",
    onKeyDown: e => {
      if (e.key === 'ArrowRight') go(shot + 1);
      if (e.key === 'ArrowLeft') go(shot - 1);
    },
    onPointerDown: e => {
      swipe.current = e.clientX;
    },
    onPointerUp: e => {
      if (swipe.current == null) return;
      const dx = e.clientX - swipe.current;
      swipe.current = null;
      if (Math.abs(dx) > 40) go(shot + (dx < 0 ? 1 : -1));
    },
    style: {
      position: 'relative',
      aspectRatio: '4/5',
      overflow: 'hidden',
      background: 'var(--bg-sunken)',
      outline: 'none',
      touchAction: 'pan-y'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "data-sheen": "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 3,
      pointerEvents: 'none',
      opacity: 0,
      mixBlendMode: 'soft-light',
      background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 30%), rgba(255,255,255,.75) 0%, rgba(255,255,255,0) 45%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse 60% 55% at 50% 48%, var(--trm-ivory-50) 0%, var(--bg-sunken) 75%)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    key: shot,
    src: `${ASSET}product/${shots[shot][0]}`,
    alt: "PCOS Harmony",
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      objectFit: shots[shot][1],
      padding: shots[shot][1] === 'contain' ? '6% 10%' : 0,
      animation: `${dir > 0 ? 'pdpInR' : 'pdpInL'} 700ms var(--ease-out)`,
      pointerEvents: 'none',
      userSelect: 'none'
    },
    draggable: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 20,
      right: 20,
      bottom: 18,
      zIndex: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 11,
      letterSpacing: '.18em',
      color: 'var(--fg-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    key: shot,
    style: {
      display: 'inline-block',
      color: 'var(--fg-1)',
      animation: 'pdpNum 500ms var(--ease-out)'
    }
  }, String(shot + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 48,
      height: 1,
      background: 'var(--border-strong)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--fg-1)',
      transformOrigin: 'left',
      transform: `scaleX(${(shot + 1) / shots.length})`,
      transition: 'transform 600ms var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("span", null, String(shots.length).padStart(2, '0'))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8,
      pointerEvents: 'auto'
    }
  }, [['chevron-left', -1, 'Previous image'], ['chevron-right', 1, 'Next image']].map(([ic, d, l]) => /*#__PURE__*/React.createElement("button", {
    key: ic,
    type: "button",
    "aria-label": l,
    onClick: e => {
      e.stopPropagation();
      go(shot + d);
    },
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      border: '1px solid var(--border-strong)',
      background: 'rgba(250,247,241,.8)',
      color: 'var(--fg-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 16,
    stroke: 1.2
  })))))), /*#__PURE__*/React.createElement(Reveal, {
    style: {
      paddingTop: 12,
      maxWidth: 440
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Hormonal & metabolic wellness"), /*#__PURE__*/React.createElement(Heading, {
    as: "h1",
    level: "l",
    style: {
      margin: '18px 0 14px'
    }
  }, /*#__PURE__*/React.createElement(Line, null, "PCOS ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontWeight: 400
    }
  }, "Harmony"))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      fontWeight: 300,
      lineHeight: 1.65,
      color: 'var(--fg-2)'
    }
  }, "A thoughtfully formulated blend of clinically studied nutrients to promote hormone balance, regulate cycle rhythm, enhance metabolic health and overall women's wellness."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 14,
      margin: '26px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 30,
      fontWeight: 500
    }
  }, "\xA3", PRODUCT.price), /*#__PURE__*/React.createElement("span", {
    style: small
  }, "30 \xD7 5 g sachets")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--fg-2)',
      marginBottom: 12
    }
  }, "Flavour"), /*#__PURE__*/React.createElement("div", {
    ref: flavourRow,
    role: "radiogroup",
    "aria-label": "Flavour",
    style: {
      position: 'relative',
      display: 'flex',
      gap: 10,
      marginBottom: 28
    }
  }, pill && pill.width > 0 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: pill.left,
      width: pill.width,
      background: 'var(--fg-1)',
      borderRadius: 'var(--radius-1)',
      transition: 'left 460ms var(--ease-out), width 460ms var(--ease-out)'
    }
  }), PRODUCT.flavours.map((f, k) => /*#__PURE__*/React.createElement("button", {
    key: f,
    ref: el => {
      flavourRefs.current[k] = el;
    },
    role: "radio",
    "aria-checked": f === flavour,
    onClick: () => setFlavour(f),
    style: {
      position: 'relative',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      padding: '10px 16px',
      borderRadius: 'var(--radius-1)',
      cursor: 'pointer',
      background: (!pill || !pill.width) && f === flavour ? 'var(--fg-1)' : 'transparent',
      color: f === flavour ? 'var(--trm-ivory-50)' : 'var(--fg-1)',
      border: '1px solid var(--border-strong)',
      transition: 'color 300ms ease 80ms'
    }
  }, f))), /*#__PURE__*/React.createElement("div", {
    ref: cta,
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(QuantityStepper, {
    value: qty,
    onChange: setQty
  }), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    onClick: () => onAdd({
      flavour,
      qty
    })
  }, "Add to bag")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      marginTop: 16,
      flexWrap: 'wrap',
      ...small
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "truck",
    size: 16
  }), " Free delivery over \xA350"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "moon-star",
    size: 15,
    stroke: 1.1
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-1)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, days), " days \xB7 one sachet a day"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      borderTop: '1px solid var(--border-hairline)'
    }
  }, acc.map(([id, t, body]) => /*#__PURE__*/React.createElement("div", {
    key: id,
    style: {
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(open === id ? null : id),
    style: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '18px 0',
      background: 'none',
      border: 0,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--fg-1)',
      letterSpacing: '.02em'
    }
  }, t, /*#__PURE__*/React.createElement(Icon, {
    name: open === id ? 'minus' : 'plus',
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: open === id ? 120 : 0,
      overflow: 'hidden',
      transition: 'max-height var(--dur-base) var(--ease-soft)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 18px',
      fontSize: 14,
      fontWeight: 300,
      lineHeight: 1.65,
      color: 'var(--fg-2)'
    }
  }, body))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 var(--gutter) var(--section-y)',
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    style: {
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "The daily ritual"), /*#__PURE__*/React.createElement(Heading, {
    level: "s",
    style: {
      margin: '16px 0 0'
    }
  }, /*#__PURE__*/React.createElement(Line, null, "Simple by design."), /*#__PURE__*/React.createElement(Line, null, /*#__PURE__*/React.createElement("em", {
    style: {
      fontWeight: 400
    }
  }, "Once a day.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-rule": "",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 22,
      height: 1,
      background: 'var(--border-strong)'
    }
  }), /*#__PURE__*/React.createElement(Reveal, {
    anim: "stagger",
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
      gap: 32
    }
  }, [['01', 'Mix one sachet', 'Into water or your favourite beverage.'], ['02', 'Take once daily', 'Or as directed by your healthcare professional.'], ['03', 'Keep it fresh', 'Store in a cool, dry place. Do not use if the seal is broken.']].map(([n, t, b]) => /*#__PURE__*/React.createElement("div", {
    key: n
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'var(--bg-page)',
      border: '1px solid var(--border-strong)',
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 18,
      color: 'var(--fg-1)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      fontSize: 15,
      color: 'var(--fg-1)'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 14,
      fontWeight: 300,
      lineHeight: 1.6,
      color: 'var(--fg-2)',
      maxWidth: 280
    }
  }, b)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--gradient-sachet-diag)',
      padding: 'var(--section-y) var(--gutter)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, {
    inverse: true
  }, "What's inside"), /*#__PURE__*/React.createElement(Heading, {
    level: "m",
    inverse: true,
    style: {
      margin: '20px 0 28px'
    }
  }, /*#__PURE__*/React.createElement(Line, null, "Four molecules."), /*#__PURE__*/React.createElement(Line, null, /*#__PURE__*/React.createElement("em", {
    style: {
      fontWeight: 400
    }
  }, "One daily ritual."))), /*#__PURE__*/React.createElement(StackedCaps, {
    inverse: true,
    size: 12,
    lines: ['Science', 'Nature', 'Balance'],
    rule: true
  })), /*#__PURE__*/React.createElement(Reveal, {
    anim: "stagger",
    draw: true,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '36px 32px'
    }
  }, PRODUCT.ingredients.map(g => /*#__PURE__*/React.createElement("button", {
    key: g.name,
    type: "button",
    "aria-label": `About ${g.name}`,
    onClick: () => onIngredient && onIngredient(g),
    style: ingredientButton
  }, /*#__PURE__*/React.createElement(IngredientItem, _extends({}, g, {
    inverse: true
  })))))), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": !barOn,
    style: {
      position: 'fixed',
      left: '50%',
      bottom: 20,
      zIndex: 30,
      width: 'min(640px, calc(100% - 140px))',
      transform: `translate(-50%, ${barOn ? '0' : '140%'})`,
      visibility: barOn ? 'visible' : 'hidden',
      transition: barOn ? 'transform 520ms var(--ease-out), visibility 0s' : 'transform 420ms var(--ease-soft), visibility 0s linear 420ms',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '8px 8px 8px 12px',
      background: 'rgba(250,247,241,.9)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-2)',
      boxShadow: 'var(--shadow-float)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${ASSET}product/sachet-front.png`,
    alt: "",
    style: {
      height: 48,
      width: 'auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 19,
      fontWeight: 500,
      lineHeight: 1.1
    }
  }, "PCOS ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontWeight: 400
    }
  }, "Harmony")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-2)',
      marginTop: 3,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, flavour, " \xB7 ", qty, " \xD7 30 sachets")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontVariantNumeric: 'tabular-nums'
    }
  }, "\xA3", PRODUCT.price * qty), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => onAdd({
      flavour,
      qty
    })
  }, "Add to bag")), /*#__PURE__*/React.createElement("style", null, '@keyframes pdpInR{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:none}}@keyframes pdpInL{from{opacity:0;transform:translateX(-28px)}to{opacity:1;transform:none}}@keyframes pdpNum{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion: reduce){[style*="pdpIn"],[style*="pdpNum"]{animation:none!important}}'));
}
Object.assign(window, {
  ProductScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Product.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/motion.js
try { (() => {
/* the right molecule — motion layer (GSAP + ScrollTrigger)
   Edit MOTION to tune timings, easings and colours. */
const MOTION = {
  ease: 'power3.out',
  // fades / rises
  easeLine: 'power4.out',
  // masked headline lines
  easeDraw: 'power2.inOut',
  // strokes + hairline rules
  easeSoft: 'power2.inOut',
  // header state changes
  duration: {
    reveal: 1.1,
    revealMobile: 0.8,
    reduced: 0.6,
    line: 1.05,
    sub: 0.9,
    eyebrow: 1.4,
    draw: 1.3,
    rule: 1.2,
    sachets: 1.6,
    sparkle: 1.1,
    header: 0.45,
    headerIn: 0.9
  },
  stagger: {
    lines: 0.12,
    items: 0.07,
    draw: 0.05,
    sachets: 0.16
  },
  reveal: {
    y: 18,
    yMobile: 10,
    start: 'top 88%'
  },
  sub: {
    y: 12,
    overlap: 0.55
  },
  // sublines start this many s before lines finish
  eyebrow: {
    fromSpacing: '0.04em'
  },
  // tightens-to-wide into its token value
  sachets: {
    y: 60,
    yMobile: 30,
    rotate: 7
  },
  // rotate = degrees of extra tilt that settles out
  rule: {
    start: 'top 94%'
  },
  header: {
    threshold: 40,
    solidBg: 'rgba(243,238,228,0.72)',
    border: 'rgba(27,42,45,0.12)',
    blur: 14
  },
  extras: {
    loader: {
      enabled: true,
      oncePerSession: true,
      draw: 0.7,
      sparkle: 0.25,
      word: 0.35,
      hold: 0.1,
      out: 0.35
    },
    // total ≈ 1.45s
    progress: {
      size: 44,
      offset: 24,
      showAfter: 120
    },
    cursor: {
      ring: 30,
      hoverScale: 1.8,
      lag: 0.18,
      color: '#F3EEE4'
    },
    // difference-blended, reads on ivory and teal
    magnetic: {
      strength: 0.35,
      max: 12,
      ease: 0.18
    },
    tilt: {
      max: 8,
      duration: 0.6,
      perspective: 900,
      sheen: 0.9
    }
  },
  overlays: {
    backdropIn: 0.4,
    backdropOut: 0.3,
    cardIn: 0.55,
    cardOut: 0.28,
    fromScale: 0.94,
    toScale: 0.97,
    fly: {
      duration: 0.85,
      height: 220,
      endScale: 0.1,
      spin: 16
    },
    badge: {
      from: 0.3,
      duration: 0.6
    },
    drawerDelay: 0.3,
    // seconds after the sachet lands before the drawer slides in
    drawerItems: {
      x: 18,
      stagger: 0.07,
      delay: 0.18
    }
  },
  mobileBreakpoint: 768,
  failsafeMs: 3500,
  // anything still mid-animation is jumped to its end state
  scroll: {
    scrub: 0.8,
    // seconds of smoothing on scrubbed timelines
    waveScale: 1.45,
    // hero curve grows this tall as hero scrolls out
    pinStepVh: 55,
    // scroll distance per pinned step (flip + each ingredient)
    perspective: 1400,
    glowOpacity: 1,
    zoomFrom: 1.1,
    // macro sachet panel zooms 1.1 → 1.0
    split: {
      x: 70,
      tilt: 7,
      orbitTurn: 220
    },
    flip3d: {
      enterY: -32,
      enterX: 12,
      enterZ: -60,
      lean: -3,
      shade: 0.55
    },
    // In Balance sachet: approach angle, mid-turn lean, edge shading
    shine: {
      first: 1.9,
      duration: 1.6,
      gap: 4.5,
      offset: 0.22,
      from: '130% 0',
      to: '-30% 0'
    },
    // hero sachet light sweep // philosophy: sachets fan apart from one stack; orbit ring draws, dot travels
    sweep: ['130% 0', '-30% 0'],
    // light band travels across the foil
    artScale: 1.15,
    // leaf band art overscale so parallax never shows edges
    shimmer: {
      peak: 0.9,
      delay: [1.2, 3.4],
      up: 0.7,
      down: 0.9
    },
    crossfade: {
      start: 'top bottom',
      end: 'top 35%'
    }
  },
  tone: {
    dark: '#0B4458',
    darkAfterBanner: '#10344F',
    light: '#F3EEE4',
    lightText: {
      '--fg-1': '#1B2A2D',
      '--fg-2': '#3F4B4D',
      '--fg-3': '#6D7674',
      '--border-strong': 'rgba(27,42,45,0.32)'
    },
    darkText: {
      '--fg-1': '#F3EEE4',
      '--fg-2': '#C9D3CF',
      '--fg-3': '#A9B6B3',
      '--border-strong': 'rgba(243,238,228,0.35)'
    },
    inverseOnLight: {
      '--fg-on-inverse': '#1B2A2D',
      '--fg-on-inverse-2': '#3F4B4D',
      '--border-on-inverse': 'rgba(27,42,45,0.2)'
    },
    inverseOnDark: {
      '--fg-on-inverse': '#F3EEE4',
      '--fg-on-inverse-2': '#C9D3CF',
      '--border-on-inverse': 'rgba(243,238,228,0.22)'
    }
  },
  colors: {
    petrol: '#0B4458',
    oceanTeal: '#174F55',
    midnight: '#172C46',
    aubergine: '#38243F',
    ivory: '#F3EEE4'
  }
};
(function () {
  const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isMobile = () => window.innerWidth < MOTION.mobileBreakpoint;
  const ready = () => !!(window.gsap && window.ScrollTrigger);
  const SHAPES = 'path,circle,line,polyline,polygon,rect,ellipse';
  let triggers = [];
  let timelines = [];
  let failsafe = null;
  let headerBound = false;
  const fresh = (root, sel) => Array.from(root.querySelectorAll(sel + ':not([data-anim-done])'));
  const mark = el => el.setAttribute('data-anim-done', '');
  const delayOf = el => mqReduced.matches ? 0 : Number(el.dataset.delay || 0) / 1000;
  function play(el, tl, start) {
    timelines.push(tl);
    if (el.getBoundingClientRect().top < window.innerHeight) {
      tl.play();
      return;
    }
    triggers.push(ScrollTrigger.create({
      trigger: el,
      start: start || MOTION.reveal.start,
      once: true,
      onEnter: () => tl.play()
    }));
  }
  function addDraw(tl, el, at) {
    if (mqReduced.matches) return;
    const shapes = Array.from(el.querySelectorAll('svg')).flatMap(s => Array.from(s.querySelectorAll(SHAPES)));
    if (!shapes.length) return;
    shapes.forEach(p => {
      const L = p.getTotalLength ? p.getTotalLength() : 0;
      p.style.strokeDasharray = L;
      p.style.strokeDashoffset = L;
    });
    tl.to(shapes, {
      strokeDashoffset: 0,
      duration: MOTION.duration.draw,
      ease: MOTION.easeDraw,
      stagger: MOTION.stagger.draw,
      onComplete: () => shapes.forEach(p => {
        p.style.strokeDasharray = '';
        p.style.strokeDashoffset = '';
      })
    }, at);
    const badges = el.querySelectorAll('[data-badge]');
    if (badges.length) tl.from(badges, {
      scale: 0.82,
      opacity: 0,
      duration: MOTION.duration.sub,
      ease: MOTION.ease,
      clearProps: 'transform,opacity'
    }, at);
  }

  // Generic reveal: headline lines → eyebrow tracking → sublines, else a plain fade-up.
  function initReveals(root) {
    const reduced = mqReduced.matches;
    const mobile = isMobile();
    fresh(root, '[data-anim="reveal"]').forEach(el => {
      mark(el);
      const tl = gsap.timeline({
        paused: true,
        delay: delayOf(el),
        defaults: {
          ease: MOTION.ease
        }
      });
      const eyebrows = Array.from(el.querySelectorAll('[data-eyebrow]'));
      const lines = Array.from(el.querySelectorAll('[data-line-inner]'));
      const y = reduced ? 0 : mobile ? MOTION.reveal.yMobile : Number(el.dataset.y || MOTION.reveal.y);
      if (!eyebrows.length && !lines.length) {
        tl.from(el, {
          opacity: 0,
          y,
          duration: reduced ? MOTION.duration.reduced : mobile ? MOTION.duration.revealMobile : MOTION.duration.reveal,
          clearProps: 'opacity,transform'
        }, 0);
      } else {
        const others = Array.from(el.children).filter(c => !c.matches('[data-eyebrow],[data-line]') && !c.querySelector('[data-eyebrow],[data-line-inner]'));
        if (eyebrows.length) {
          tl.from(eyebrows, reduced ? {
            opacity: 0,
            duration: MOTION.duration.reduced
          } : {
            opacity: 0,
            letterSpacing: MOTION.eyebrow.fromSpacing,
            duration: MOTION.duration.eyebrow,
            ease: 'power2.out',
            clearProps: 'opacity,letterSpacing'
          }, 0);
        }
        if (lines.length) {
          tl.from(lines, reduced ? {
            opacity: 0,
            duration: MOTION.duration.reduced
          } : {
            yPercent: 110,
            duration: MOTION.duration.line,
            stagger: MOTION.stagger.lines,
            ease: MOTION.easeLine,
            clearProps: 'transform'
          }, eyebrows.length ? 0.15 : 0);
        }
        if (others.length) {
          tl.from(others, {
            opacity: 0,
            y: reduced ? 0 : MOTION.sub.y,
            duration: reduced ? MOTION.duration.reduced : MOTION.duration.sub,
            stagger: MOTION.stagger.items,
            clearProps: 'opacity,transform'
          }, lines.length ? '>-' + MOTION.sub.overlap : 0.25);
        }
      }
      if (el.hasAttribute('data-draw')) addDraw(tl, el, 0.1);
      play(el, tl);
    });
  }

  // Lists / cards: direct children fade up with a short stagger.
  function initStaggers(root) {
    const reduced = mqReduced.matches;
    fresh(root, '[data-anim="stagger"]').forEach(el => {
      mark(el);
      const tl = gsap.timeline({
        paused: true,
        delay: delayOf(el)
      });
      tl.from(Array.from(el.children), {
        opacity: 0,
        y: reduced ? 0 : MOTION.sub.y,
        duration: reduced ? MOTION.duration.reduced : MOTION.duration.sub,
        stagger: MOTION.stagger.items,
        ease: MOTION.ease,
        clearProps: 'opacity,transform'
      }, 0);
      if (el.hasAttribute('data-draw')) addDraw(tl, el, 0.1);
      play(el, tl);
    });
  }

  // Hero sachets: rise + fade with a rotation that settles into their resting tilt.
  function initSachets(root) {
    const reduced = mqReduced.matches;
    fresh(root, '[data-anim="sachets"]').forEach(el => {
      mark(el);
      const imgs = Array.from(el.querySelectorAll('img'));
      const tl = gsap.timeline({
        paused: true,
        delay: delayOf(el)
      });
      tl.from(imgs, reduced ? {
        opacity: 0,
        duration: MOTION.duration.reduced
      } : {
        opacity: 0,
        y: isMobile() ? MOTION.sachets.yMobile : MOTION.sachets.y,
        rotation: i => (i % 2 ? '-=' : '+=') + MOTION.sachets.rotate,
        duration: MOTION.duration.sachets,
        stagger: MOTION.stagger.sachets,
        ease: MOTION.ease
      }, 0);
      play(el, tl);
    });
  }

  // Sparkle: twinkles once.
  function initSparkles(root) {
    const reduced = mqReduced.matches;
    fresh(root, '[data-anim="sparkle"]').forEach(el => {
      mark(el);
      const tl = gsap.timeline({
        paused: true,
        delay: delayOf(el)
      });
      if (reduced) tl.from(el, {
        opacity: 0,
        duration: MOTION.duration.reduced
      });else tl.fromTo(el, {
        opacity: 0,
        scale: 0.2,
        rotation: -60
      }, {
        opacity: 1,
        scale: 1.3,
        rotation: 0,
        duration: MOTION.duration.sparkle * 0.55,
        ease: 'power2.out'
      }).to(el, {
        scale: 1,
        duration: MOTION.duration.sparkle * 0.45,
        ease: 'power2.inOut',
        clearProps: 'transform'
      });
      play(el, tl);
    });
  }

  // Hairline rules draw left → right.
  function initRules(root) {
    const reduced = mqReduced.matches;
    fresh(root, '[data-rule]').forEach(el => {
      mark(el);
      const tl = gsap.timeline({
        paused: true,
        delay: reduced ? 0 : Number(el.dataset.ruleDelay || 0)
      });
      tl.from(el, reduced ? {
        opacity: 0,
        duration: MOTION.duration.reduced
      } : {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: MOTION.duration.rule,
        ease: MOTION.easeDraw,
        clearProps: 'transform'
      });
      play(el, tl, MOTION.rule.start);
    });
  }

  // ---------- Phase 2: scroll depth ----------
  let mm = null;
  const shapesIn = (root, sel) => Array.from(root.querySelectorAll(sel)).flatMap(s => Array.from(s.querySelectorAll(SHAPES)));
  const primeDash = shapes => shapes.forEach(p => {
    const L = p.getTotalLength ? p.getTotalLength() : 0;
    gsap.set(p, {
      strokeDasharray: L,
      strokeDashoffset: L
    });
  });
  const rand = (a, b) => a + Math.random() * (b - a);
  function crossfades(root) {
    const S = MOTION.scroll.crossfade,
      T = MOTION.tone;
    root.querySelectorAll('[data-crossfade="from-dark"]').forEach(el => {
      const trigger = el.closest('[data-pin]') || el;
      const prev = trigger.previousElementSibling;
      const from = prev && prev.dataset.crossfade === 'to-dark' ? T.darkAfterBanner : T.dark;
      gsap.fromTo(el, {
        backgroundColor: from,
        ...T.darkText
      }, {
        backgroundColor: T.light,
        ...T.lightText,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: S.start,
          end: S.end,
          scrub: true
        }
      });
    });
    root.querySelectorAll('[data-crossfade="to-dark"]').forEach(el => {
      const veil = el.querySelector('[data-veil]');
      const st = {
        trigger: el,
        start: S.start,
        end: S.end,
        scrub: true
      };
      if (veil) gsap.fromTo(veil, {
        opacity: 1
      }, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: st
      });
      gsap.fromTo(el, {
        ...T.inverseOnLight
      }, {
        ...T.inverseOnDark,
        ease: 'none',
        scrollTrigger: {
          ...st
        }
      });
    });
  }
  function heroDepth(root) {
    const hero = root.querySelector('[data-section="hero"]');
    root.querySelectorAll('[data-parallax-y]').forEach(el => {
      const sec = el.closest('section');
      const atTop = sec.getBoundingClientRect().top + window.scrollY < window.innerHeight * 0.5;
      gsap.fromTo(el, {
        y: Number(el.dataset.parallaxFrom || 0),
        rotation: 0
      }, {
        y: Number(el.dataset.parallaxY),
        rotation: Number(el.dataset.parallaxRot || 0),
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          start: atTop ? 'top top' : 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
    const wave = hero && hero.querySelector('[data-wave]');
    if (wave) gsap.to(wave, {
      scaleY: MOTION.scroll.waveScale,
      transformOrigin: '50% 100%',
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
  function macro(root) {
    root.querySelectorAll('[data-zoom]').forEach(el => {
      const sec = el.closest('section');
      gsap.fromTo(el, {
        scale: MOTION.scroll.zoomFrom
      }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          start: 'top bottom',
          end: 'center center',
          scrub: true
        }
      });
      const Sp = MOTION.scroll.split;
      const left = sec.querySelector('[data-split="left"]'),
        right = sec.querySelector('[data-split="right"]');
      const ring = sec.querySelector('[data-orbit-ring]'),
        dot = sec.querySelector('[data-orbit-dot]');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: 'top 85%',
          end: 'center 50%',
          scrub: MOTION.scroll.scrub
        }
      });
      if (left) tl.fromTo(left, {
        x: Sp.x,
        rotation: Sp.tilt
      }, {
        x: 0,
        rotation: -2,
        ease: 'power2.out',
        duration: 1
      }, 0);
      if (right) tl.fromTo(right, {
        x: -Sp.x,
        rotation: -Sp.tilt
      }, {
        x: 0,
        rotation: 3,
        ease: 'power2.out',
        duration: 1
      }, 0);
      if (ring) {
        const L = 2 * Math.PI * 48;
        tl.fromTo(ring, {
          strokeDasharray: L,
          strokeDashoffset: L
        }, {
          strokeDashoffset: 0,
          ease: 'power1.inOut',
          duration: 1
        }, 0);
      }
      if (dot) tl.fromTo(dot, {
        rotation: 0,
        opacity: 0
      }, {
        rotation: Sp.orbitTurn,
        opacity: 1,
        ease: 'power1.inOut',
        duration: 1,
        svgOrigin: '50 50'
      }, 0);
      const sweeps = sec.querySelectorAll('[data-sweep]');
      if (sweeps.length) gsap.fromTo(sweeps, {
        backgroundPosition: MOTION.scroll.sweep[0]
      }, {
        backgroundPosition: MOTION.scroll.sweep[1],
        ease: 'none',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sec,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }
  function leafBand(root) {
    root.querySelectorAll('[data-art]').forEach(art => gsap.set(art, {
      scale: MOTION.scroll.artScale,
      transformOrigin: '100% 50%'
    }));
    const Sh = MOTION.scroll.shimmer;
    root.querySelectorAll('[data-shimmer]').forEach(s => {
      const band = s.closest('section');
      gsap.timeline({
        repeat: -1,
        repeatDelay: rand(Sh.delay[0], Sh.delay[1]),
        delay: rand(0.3, 1.6),
        scrollTrigger: {
          trigger: band,
          toggleActions: 'play pause resume pause'
        }
      }).fromTo(s, {
        opacity: 0,
        scale: 0.5
      }, {
        opacity: Sh.peak,
        scale: 1.3,
        duration: Sh.up,
        ease: 'sine.out'
      }).to(s, {
        opacity: 0,
        scale: 0.6,
        duration: Sh.down,
        ease: 'sine.in'
      });
    });
  }

  // Hero sachets: a light band sweeps across the foil on a slow loop (back sachet trails the front).
  function heroShine(root) {
    const S = MOTION.scroll.shine;
    const els = Array.from(root.querySelectorAll('[data-section="hero"] [data-shine]')).reverse();
    if (!els.length) return;
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: S.gap,
      delay: S.first
    });
    els.forEach((el, i) => tl.fromTo(el, {
      backgroundPosition: S.from
    }, {
      backgroundPosition: S.to,
      duration: S.duration,
      ease: 'power1.inOut'
    }, i * S.offset));
    const hero = root.querySelector('[data-section="hero"]');
    ScrollTrigger.create({
      trigger: hero,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: s => s.isActive ? tl.resume() : tl.pause()
    });
  }
  function balancePin(root) {
    const outer = root.querySelector('[data-pin="balance"]');
    if (!outer) return;
    const section = outer.querySelector('[data-pin-section]');
    const items = Array.from(outer.querySelectorAll('[data-pin-item]'));
    const front = outer.querySelector('[data-flip-front]');
    const back = outer.querySelector('[data-flip-back]');
    const glows = Array.from(outer.querySelectorAll('[data-glow]'));
    const steps = items.length + 1;
    const h = section.offsetHeight;
    gsap.set(outer, {
      height: `calc(${Math.max(h, window.innerHeight)}px + ${steps * MOTION.scroll.pinStepVh}vh)`
    });
    gsap.set(section, {
      position: 'sticky',
      top: Math.min(0, window.innerHeight - h),
      minHeight: '100vh'
    });
    gsap.set(items, {
      opacity: 0,
      y: 24
    });
    items.forEach(it => primeDash(shapesIn(it, 'svg')));
    const P = MOTION.scroll.perspective;
    const tl = gsap.timeline({
      defaults: {
        ease: 'power2.out'
      },
      scrollTrigger: {
        trigger: outer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: MOTION.scroll.scrub
      }
    });
    const card = outer.querySelector('[data-flip-card]');
    const stage = outer.querySelector('[data-flip-stage]');
    const floor = outer.querySelector('[data-flip-shadow]');
    const shadeF = front && front.querySelector('[data-face-shade]');
    const shadeB = back && back.querySelector('[data-face-shade]');
    const F3 = MOTION.scroll.flip3d;
    if (stage) {
      // approach: sachet arrives turned in space and squares up to the viewer
      triggers.push(gsap.fromTo(stage, {
        rotationY: F3.enterY,
        rotationX: F3.enterX,
        z: F3.enterZ
      }, {
        rotationY: 0,
        rotationX: 0,
        z: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: outer,
          start: 'top bottom',
          end: 'top top',
          scrub: MOTION.scroll.scrub
        }
      }).scrollTrigger);
      if (floor) triggers.push(gsap.fromTo(floor, {
        scaleX: 0.7,
        opacity: 0.5
      }, {
        scaleX: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: outer,
          start: 'top bottom',
          end: 'top top',
          scrub: MOTION.scroll.scrub
        }
      }).scrollTrigger);
    }
    if (card) {
      gsap.set(card, {
        rotationY: 0
      });
      if (shadeB) gsap.set(shadeB, {
        opacity: F3.shade
      });
      tl.to(card, {
        rotationY: 180,
        duration: 1.2,
        ease: 'power1.inOut'
      }, 0.15);
      tl.fromTo(stage, {
        rotationZ: 0
      }, {
        rotationZ: F3.lean,
        duration: 0.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: 1
      }, 0.15);
      if (shadeF) tl.to(shadeF, {
        opacity: F3.shade,
        duration: 0.6,
        ease: 'power1.in'
      }, 0.15);
      if (shadeB) tl.to(shadeB, {
        opacity: 0,
        duration: 0.6,
        ease: 'power1.out'
      }, 0.75);
      if (floor) tl.to(floor, {
        scaleX: 0.35,
        duration: 0.6,
        ease: 'power1.in'
      }, 0.15).to(floor, {
        scaleX: 1,
        duration: 0.6,
        ease: 'power1.out'
      }, 0.75);
    }
    items.forEach((it, i) => {
      const at = 1.4 + i;
      tl.to(it, {
        opacity: 1,
        y: 0,
        duration: 0.5
      }, at);
      tl.to(shapesIn(it, 'svg[data-ring]'), {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: MOTION.easeDraw
      }, at + 0.05);
      tl.to(shapesIn(it, 'svg:not([data-ring])'), {
        strokeDashoffset: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: MOTION.easeDraw
      }, at + 0.25);
      if (glows[i]) tl.to(glows[i], {
        opacity: MOTION.scroll.glowOpacity,
        duration: 0.35
      }, at + 0.1);
      if (i > 0 && glows[i - 1]) tl.to(glows[i - 1], {
        opacity: 0,
        duration: 0.35
      }, at + 0.1);
    });
    tl.to({}, {
      duration: 0.6
    });
  }

  // Mobile / reduced motion: no pin — ingredients just stagger in.
  function balanceSimple(root, reduced) {
    const items = Array.from(root.querySelectorAll('[data-pin="balance"] [data-pin-item]'));
    if (!items.length) return;
    const tl = gsap.timeline({
      paused: true
    });
    tl.from(items, {
      opacity: 0,
      y: reduced ? 0 : MOTION.sub.y,
      duration: reduced ? MOTION.duration.reduced : MOTION.duration.sub,
      stagger: MOTION.stagger.items,
      ease: MOTION.ease,
      clearProps: 'opacity,transform'
    }, 0);
    if (!reduced) {
      const shapes = items.flatMap(it => shapesIn(it, 'svg'));
      primeDash(shapes);
      tl.to(shapes, {
        strokeDashoffset: 0,
        duration: MOTION.duration.draw,
        stagger: MOTION.stagger.draw,
        ease: MOTION.easeDraw
      }, 0.1);
    }
    ScrollTrigger.create({
      trigger: items[0],
      start: MOTION.reveal.start,
      once: true,
      onEnter: () => tl.play()
    });
  }
  function initScroll(root) {
    if (mm) mm.revert();
    mm = gsap.matchMedia();
    mm.add({
      desktop: `(min-width: ${MOTION.mobileBreakpoint}px)`,
      reduced: '(prefers-reduced-motion: reduce)'
    }, ctx => {
      const {
        desktop,
        reduced
      } = ctx.conditions;
      crossfades(root);
      if (!reduced) heroShine(root);
      if (desktop && !reduced) {
        heroDepth(root);
        macro(root);
        leafBand(root);
        balancePin(root);
      } else balanceSimple(root, reduced);
      if (!desktop) gsap.set(root.querySelectorAll('[data-float]'), {
        autoAlpha: 0
      });
    });
  }
  function applyHeader(el, animate) {
    const solid = el.dataset.solid === '1' || window.scrollY > MOTION.header.threshold;
    if (el._solid === solid) return;
    el._solid = solid;
    const blur = {
      v: el._blur || 0
    };
    gsap.to(blur, {
      v: solid ? MOTION.header.blur : 0,
      duration: animate && !mqReduced.matches ? MOTION.duration.header : 0,
      ease: MOTION.easeSoft,
      onUpdate: () => {
        el._blur = blur.v;
        const f = blur.v > 0.1 ? `blur(${blur.v}px) saturate(1.2)` : 'none';
        el.style.backdropFilter = f;
        el.style.webkitBackdropFilter = f;
      }
    });
    gsap.to(el, {
      backgroundColor: solid ? MOTION.header.solidBg : 'rgba(243,238,228,0)',
      borderBottomColor: solid ? MOTION.header.border : 'rgba(27,42,45,0)',
      duration: animate && !mqReduced.matches ? MOTION.duration.header : 0,
      ease: MOTION.easeSoft
    });
  }

  // ---------- Phase 3: special elements ----------
  const MOON = 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z';
  const SPARK = 'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z';
  const finePointer = () => window.matchMedia(`(hover: hover) and (pointer: fine) and (min-width: ${MOTION.mobileBreakpoint}px)`).matches;
  let loaderActive = false,
    pendingRoot = null,
    globalsBuilt = false;
  function buildLoader() {
    const L = MOTION.extras.loader;
    if (!L.enabled || !window.gsap) return;
    if (L.oncePerSession) {
      try {
        if (sessionStorage.getItem('trm-loaded')) return;
        sessionStorage.setItem('trm-loaded', '1');
      } catch (e) {}
    }
    loaderActive = true;
    const o = document.createElement('div');
    o.setAttribute('aria-hidden', 'true');
    o.setAttribute('data-trm-loader', '');
    o.style.cssText = 'position:fixed;inset:0;z-index:100;background:#F3EEE4;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;color:#0B4458';
    o.innerHTML = `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round" style="overflow:visible"><path data-l-moon d="${MOON}"/><path data-l-spark d="${SPARK}" transform="translate(15.2 2.2) scale(.3)" fill="currentColor" stroke="none"/></svg><div data-l-word style="font-family:var(--font-logo);font-weight:300;font-size:13px;letter-spacing:.32em;line-height:1.28;text-align:center;color:#1B2A2D;padding-left:.32em">the right<br>molecule</div>`;
    document.body.appendChild(o);
    const moon = o.querySelector('[data-l-moon]'),
      spark = o.querySelector('[data-l-spark]'),
      word = o.querySelector('[data-l-word]');
    const len = moon.getTotalLength();
    const finish = () => {
      if (!loaderActive) return;
      loaderActive = false;
      o.remove();
      if (pendingRoot) {
        const r = pendingRoot;
        pendingRoot = null;
        init(r);
      }
    };
    const reduced = mqReduced.matches;
    gsap.set(moon, {
      strokeDasharray: len,
      strokeDashoffset: reduced ? 0 : len
    });
    gsap.set([spark, word], {
      opacity: 0,
      transformOrigin: '50% 50%'
    });
    gsap.timeline({
      onComplete: finish
    }).to(moon, {
      strokeDashoffset: 0,
      duration: reduced ? 0 : L.draw,
      ease: 'power2.inOut'
    }).fromTo(spark, {
      opacity: 0,
      scale: 0.2
    }, {
      opacity: 1,
      scale: 1,
      duration: L.sparkle,
      ease: 'back.out(3)'
    }, '-=0.1').to(word, {
      opacity: 1,
      duration: L.word,
      ease: 'power2.out'
    }, '-=0.1').to(o, {
      opacity: 0,
      duration: L.out,
      ease: 'power2.inOut'
    }, '+=' + L.hold);
    setTimeout(finish, 2200); // never block the page
  }
  function buildProgress() {
    const P = MOTION.extras.progress;
    const a = document.createElement('a');
    a.href = '#';
    a.setAttribute('aria-label', 'Back to top');
    a.setAttribute('data-progress', '');
    a.style.cssText = `position:fixed;right:${P.offset}px;bottom:${P.offset}px;z-index:40;width:${P.size}px;height:${P.size}px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(243,238,228,.86);border:1px solid rgba(27,42,45,.14);color:#0B4458;opacity:0;pointer-events:none;transition:opacity .4s`;
    a.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="overflow:visible"><defs><clipPath id="trmMoonFill"><rect data-p-rect x="0" y="24" width="24" height="24"/></clipPath></defs><path d="${MOON}" fill="currentColor" clip-path="url(#trmMoonFill)"/><path d="${MOON}" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/><path data-p-spark d="${SPARK}" transform="translate(16.5 1.2) scale(.28)" fill="currentColor" style="opacity:.25;transform-box:fill-box;transform-origin:center"/></svg>`;
    a.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: mqReduced.matches ? 'auto' : 'smooth'
      });
    });
    document.body.appendChild(a);
    const rect = a.querySelector('[data-p-rect]'),
      spark = a.querySelector('[data-p-spark]');
    let full = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      rect.setAttribute('y', String(21 - 18 * p)); // moon spans y 3 → 21
      const show = window.scrollY > P.showAfter;
      a.style.opacity = show ? '1' : '0';
      a.style.pointerEvents = show ? 'auto' : 'none';
      const nowFull = p > 0.985;
      if (nowFull !== full) {
        full = nowFull;
        gsap.to(spark, {
          opacity: full ? 1 : 0.25,
          scale: full ? 1.35 : 1,
          duration: 0.5,
          ease: 'back.out(2)'
        });
      }
    };
    window.addEventListener('scroll', update, {
      passive: true
    });
    window.addEventListener('resize', update);
    update();
  }
  function buildCursor() {
    if (!finePointer() || mqReduced.matches) return;
    const C = MOTION.extras.cursor;
    const st = document.createElement('style');
    st.textContent = 'html.trm-cursor, html.trm-cursor a, html.trm-cursor button{cursor:none}';
    document.head.appendChild(st);
    document.documentElement.classList.add('trm-cursor');
    const wrap = document.createElement('div');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.style.cssText = `position:fixed;left:0;top:0;z-index:90;pointer-events:none;mix-blend-mode:difference;color:${C.color}`;
    wrap.innerHTML = `<div data-c-ring style="position:absolute;width:${C.ring}px;height:${C.ring}px;margin:-${C.ring / 2}px 0 0 -${C.ring / 2}px;border:1px solid currentColor;border-radius:50%;opacity:0"></div><svg data-c-dot width="12" height="12" viewBox="0 0 24 24" style="position:absolute;margin:-6px 0 0 -6px;opacity:0"><path d="${SPARK}" fill="currentColor"/></svg>`;
    document.body.appendChild(wrap);
    const ring = wrap.querySelector('[data-c-ring]'),
      dot = wrap.querySelector('[data-c-dot]');
    const rx = gsap.quickTo(ring, 'x', {
        duration: C.lag * 2.4,
        ease: 'power3.out'
      }),
      ry = gsap.quickTo(ring, 'y', {
        duration: C.lag * 2.4,
        ease: 'power3.out'
      });
    const dx = gsap.quickTo(dot, 'x', {
        duration: 0.05
      }),
      dy = gsap.quickTo(dot, 'y', {
        duration: 0.05
      });
    let shown = false;
    window.addEventListener('mousemove', e => {
      if (!shown) {
        shown = true;
        gsap.to([ring, dot], {
          opacity: 1,
          duration: 0.3
        });
      }
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    }, {
      passive: true
    });
    document.addEventListener('mouseleave', () => {
      shown = false;
      gsap.to([ring, dot], {
        opacity: 0,
        duration: 0.3
      });
    });
    document.addEventListener('mouseover', e => {
      const t = e.target.closest ? e.target : null;
      const field = t && t.closest('input,textarea,select');
      const hot = t && !field && t.closest('a,button,[role="button"],[data-cursor]');
      gsap.to(ring, {
        scale: hot ? C.hoverScale : 1,
        backgroundColor: hot ? 'rgba(243,238,228,0.12)' : 'rgba(243,238,228,0)',
        opacity: field ? 0 : 1,
        duration: 0.35,
        ease: 'power2.out'
      });
      gsap.to(dot, {
        scale: hot ? 0.6 : 1,
        opacity: field ? 0 : 1,
        duration: 0.25
      });
    });
    window.addEventListener('mousedown', () => gsap.to(ring, {
      scale: '-=0.25',
      duration: 0.15
    }));
    window.addEventListener('mouseup', () => gsap.to(ring, {
      scale: '+=0.25',
      duration: 0.2
    }));
  }

  // Magnetic buttons — uses the CSS \`translate\` property so React's own transform (press state) is untouched.
  function initMagnetic(root) {
    if (!finePointer() || mqReduced.matches) return;
    const M = MOTION.extras.magnetic;
    root.querySelectorAll('[data-magnetic]:not([data-fx])').forEach(el => {
      el.setAttribute('data-fx', '');
      let tx = 0,
        ty = 0,
        cx = 0,
        cy = 0,
        raf = null;
      const loop = () => {
        cx += (tx - cx) * M.ease;
        cy += (ty - cy) * M.ease;
        el.style.translate = `${cx.toFixed(2)}px ${cy.toFixed(2)}px`;
        if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) raf = requestAnimationFrame(loop);else raf = null;
      };
      const kick = () => {
        if (!raf) raf = requestAnimationFrame(loop);
      };
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const clamp = v => Math.max(-M.max, Math.min(M.max, v));
        tx = clamp((e.clientX - r.left - r.width / 2) * M.strength);
        ty = clamp((e.clientY - r.top - r.height / 2) * M.strength);
        kick();
      });
      el.addEventListener('mouseleave', () => {
        tx = 0;
        ty = 0;
        kick();
      });
    });
  }

  // Sachet tilt + metallic sheen following the pointer.
  function initTilt(root) {
    if (!finePointer() || mqReduced.matches) return;
    const T = MOTION.extras.tilt;
    root.querySelectorAll('[data-tilt]:not([data-fx])').forEach(el => {
      el.setAttribute('data-fx', '');
      const max = Number(el.dataset.tiltMax || T.max);
      const sheen = el.querySelector(':scope > [data-sheen]');
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width,
          py = (e.clientY - r.top) / r.height;
        gsap.to(el, {
          rotationY: (px - 0.5) * 2 * max,
          rotationX: -(py - 0.5) * 2 * max,
          transformPerspective: T.perspective,
          duration: T.duration,
          ease: 'power2.out',
          overwrite: 'auto'
        });
        if (sheen) {
          sheen.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          sheen.style.setProperty('--my', (py * 100).toFixed(1) + '%');
          gsap.to(sheen, {
            opacity: T.sheen,
            duration: 0.4,
            overwrite: 'auto'
          });
        }
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          rotationX: 0,
          rotationY: 0,
          duration: T.duration * 1.6,
          ease: 'power3.out',
          overwrite: 'auto'
        });
        if (sheen) gsap.to(sheen, {
          opacity: 0,
          duration: 0.5,
          overwrite: 'auto'
        });
      });
    });
  }

  // ---------- Phase 4: overlays ----------
  function overlayIn(backdrop, card) {
    if (!ready() || !backdrop || !card) return;
    const O = MOTION.overlays,
      reduced = mqReduced.matches;
    gsap.fromTo(backdrop, {
      opacity: 0
    }, {
      opacity: 1,
      duration: O.backdropIn,
      ease: 'power2.out'
    });
    gsap.fromTo(card, {
      opacity: 0,
      scale: reduced ? 1 : O.fromScale,
      y: reduced ? 0 : 14
    }, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: O.cardIn,
      ease: 'power3.out',
      clearProps: 'transform'
    });
    if (reduced) return;
    const shapes = shapesIn(card, '[data-modal-icon] svg');
    primeDash(shapes);
    gsap.to(shapes, {
      strokeDashoffset: 0,
      duration: MOTION.duration.draw,
      ease: MOTION.easeDraw,
      stagger: MOTION.stagger.draw,
      delay: 0.15
    });
    const rule = card.querySelector('[data-rule]');
    if (rule) gsap.from(rule, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: MOTION.duration.rule,
      ease: MOTION.easeDraw,
      delay: 0.25
    });
  }
  function overlayOut(backdrop, card) {
    return new Promise(resolve => {
      let done = false;
      const fin = () => {
        if (!done) {
          done = true;
          resolve();
        }
      };
      if (!ready() || !backdrop || !card) return fin();
      const O = MOTION.overlays;
      gsap.to(card, {
        opacity: 0,
        scale: mqReduced.matches ? 1 : O.toScale,
        duration: O.cardOut,
        ease: 'power2.in'
      });
      gsap.to(backdrop, {
        opacity: 0,
        duration: O.backdropOut,
        ease: 'power2.in',
        onComplete: fin
      });
      setTimeout(fin, (O.backdropOut + 0.3) * 1000);
    });
  }
  function flyToCart(srcEl, imgSrc) {
    return new Promise(resolve => {
      let done = false;
      const fin = () => {
        if (!done) {
          done = true;
          resolve();
        }
      };
      const target = document.querySelector('[aria-label="Bag"]');
      if (!ready() || !srcEl || !target || mqReduced.matches) return fin();
      const F = MOTION.overlays.fly;
      const s = srcEl.getBoundingClientRect(),
        t = target.getBoundingClientRect();
      const h = Math.min(F.height, s.height * 0.7),
        w = h * 370 / 1368;
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.style.cssText = `position:fixed;left:${s.left + s.width / 2 - w / 2}px;top:${s.top + s.height / 2 - h / 2}px;width:${w}px;height:${h}px;z-index:95;pointer-events:none;filter:drop-shadow(0 18px 24px rgba(6,48,63,.3))`;
      document.body.appendChild(img);
      const dx = t.left + t.width / 2 - (s.left + s.width / 2),
        dy = t.top + t.height / 2 - (s.top + s.height / 2);
      gsap.timeline({
        onComplete: () => {
          img.remove();
          fin();
        }
      }).to(img, {
        x: dx,
        duration: F.duration,
        ease: 'power1.inOut'
      }, 0).to(img, {
        y: dy,
        duration: F.duration,
        ease: 'back.in(1.4)'
      }, 0).to(img, {
        scale: F.endScale,
        rotation: F.spin,
        duration: F.duration,
        ease: 'power2.in'
      }, 0).to(img, {
        opacity: 0.4,
        duration: 0.2
      }, F.duration - 0.2);
      setTimeout(() => {
        img.remove();
        fin();
      }, (F.duration + 0.6) * 1000);
    });
  }
  function popBadge() {
    if (!ready()) return;
    const bag = document.querySelector('[aria-label="Bag"]');
    if (!bag) return;
    const badge = bag.querySelector('span');
    const B = MOTION.overlays.badge;
    if (badge) gsap.fromTo(badge, {
      scale: B.from
    }, {
      scale: 1,
      duration: B.duration,
      ease: 'back.out(3.2)',
      clearProps: 'transform'
    });
    if (!mqReduced.matches) gsap.fromTo(bag, {
      rotation: -10
    }, {
      rotation: 0,
      duration: 0.7,
      ease: 'elastic.out(1.2, 0.4)',
      clearProps: 'transform'
    });
  }
  function drawerItems(list) {
    if (!ready() || !list || mqReduced.matches) return;
    const D = MOTION.overlays.drawerItems;
    gsap.fromTo(Array.from(list.children), {
      opacity: 0,
      x: D.x
    }, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: D.stagger,
      delay: D.delay,
      ease: MOTION.ease,
      clearProps: 'opacity,transform'
    });
  }
  function buildGlobals() {
    if (globalsBuilt || !document.body) return;
    globalsBuilt = true;
    buildProgress();
    buildCursor();
  }
  function initHeader() {
    const el = document.querySelector('[data-anim="header"]');
    if (!el) return;
    el._solid = undefined;
    applyHeader(el, false);
    if (!el.hasAttribute('data-anim-done')) {
      mark(el);
      gsap.from(el, {
        opacity: 0,
        y: mqReduced.matches ? 0 : -12,
        duration: MOTION.duration.headerIn,
        ease: MOTION.ease,
        clearProps: 'opacity,transform'
      });
    }
    if (!headerBound) {
      headerBound = true;
      window.addEventListener('scroll', () => {
        const h = document.querySelector('[data-anim="header"]');
        h && applyHeader(h, true);
      }, {
        passive: true
      });
    }
  }
  function init(root) {
    if (!ready()) return;
    gsap.registerPlugin(ScrollTrigger);
    buildGlobals();
    if (loaderActive) {
      pendingRoot = root || document;
      return;
    }
    triggers.forEach(t => t.kill());
    triggers = [];
    timelines = timelines.filter(tl => tl.progress() < 1);
    const r = root || document;
    initHeader();
    initSachets(r);
    initSparkles(r);
    initReveals(r);
    initStaggers(r);
    initRules(r);
    initScroll(r);
    initMagnetic(r);
    initTilt(r);
    ScrollTrigger.refresh();
    clearTimeout(failsafe);
    failsafe = setTimeout(() => {
      // if the ticker stalled (background tab, etc.) never leave content hidden
      timelines.forEach(tl => {
        if (document.hidden || tl.progress() > 0 && tl.progress() < 1 && !tl.isActive()) tl.progress(1);
      });
    }, MOTION.failsafeMs);
  }
  window.addEventListener('load', () => ready() && ScrollTrigger.refresh());
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildLoader);else buildLoader();
  // rAF pauses in hidden tabs — finish everything so returning never shows blank sections
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) timelines.forEach(tl => tl.progress(1));
  });
  // ---------- Page transitions ----------
  const TR = { out: 420, in: 620 };
  let curtain = null;
  function getCurtain(on) {
    if (curtain) return curtain;
    const o = document.createElement('div');
    o.setAttribute('aria-hidden', 'true');
    o.setAttribute('data-trm-curtain', '');
    o.style.cssText = 'position:fixed;inset:0;z-index:95;background:#F3EEE4;display:flex;align-items:center;justify-content:center;color:#0B4458;pointer-events:' + (on ? 'auto' : 'none') + ';opacity:' + (on ? 1 : 0);
    o.innerHTML = '<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.7" stroke-linejoin="round" style="overflow:visible"><path d="' + MOON + '"/><path d="' + SPARK + '" transform="translate(15.2 2.2) scale(.3)" fill="currentColor" stroke="none"/></svg>';
    document.body.appendChild(o);
    curtain = o;
    return o;
  }
  function revealPage(delay) {
    const o = getCurtain();
    o.style.transition = 'opacity ' + TR.in + 'ms cubic-bezier(.23,1,.32,1) ' + (delay || 0) + 'ms';
    o.style.opacity = '0';
    o.style.pointerEvents = 'none';
  }
  function transition(fn, keep) {
    if (mqReduced.matches || !document.body) { fn(); return; }
    const o = getCurtain();
    o.style.pointerEvents = 'auto';
    o.style.transition = 'opacity ' + TR.out + 'ms cubic-bezier(.65,0,.35,1)';
    void o.offsetWidth;
    o.style.opacity = '1';
    setTimeout(() => {
      fn();
      if (!keep) requestAnimationFrame(() => requestAnimationFrame(() => revealPage(60)));
    }, TR.out);
  }
  function navigateTo(url) {
    try { sessionStorage.setItem('trm-transit', '1'); } catch (e) {}
    transition(() => { window.location.href = url; }, true);
  }
  (function arrive() {
    let flag = null;
    try { flag = sessionStorage.getItem('trm-transit'); sessionStorage.removeItem('trm-transit'); } catch (e) {}
    if (!flag || mqReduced.matches) return;
    const start = () => { getCurtain(true); document.documentElement.removeAttribute('data-trm-transit'); let done = false; const go = () => { if (done) return; done = true; requestAnimationFrame(() => requestAnimationFrame(() => revealPage(0))); }; const wait = () => setTimeout(go, 260); if (document.readyState === 'complete') wait(); else window.addEventListener('load', wait, { once: true }); setTimeout(go, 1800); };
    if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
  })();
  window.addEventListener('pageshow', (e) => { if (e.persisted && curtain) revealPage(0); });
  function cursorOnly() {
    if (globalsBuilt || !document.body || !window.gsap) return;
    globalsBuilt = true;
    buildCursor();
  }
  window.TRMMotion = {
    transition,
    navigateTo,
    cursor: cursorOnly,
    init,
    config: MOTION,
    overlayIn,
    overlayOut,
    flyToCart,
    popBadge,
    drawerItems
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/motion.js", error: String((e && e.message) || e) }); }

// ui_kits/website/shared.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DS = window.TheRightMoleculeDesignSystem_d2cf6c;

// Scroll reveal hook — animation is applied by motion.js (GSAP). Without GSAP, content is simply visible.
function Reveal({
  children,
  delay = 0,
  y,
  style,
  as = 'div',
  anim = 'reveal',
  draw = false,
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    "data-anim": anim,
    "data-delay": delay,
    "data-y": y,
    "data-draw": draw ? '' : undefined,
    style: style
  }), children);
}

// One masked headline line — motion.js slides [data-line-inner] up through the mask.
function Line({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    "data-line": "",
    style: {
      display: 'block',
      overflow: 'hidden',
      paddingBottom: '0.12em',
      marginBottom: '-0.12em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "data-line-inner": "",
    style: {
      display: 'block'
    }
  }, children));
}
const ASSET = '../../assets/';
const PRODUCT = {
  name: 'PCOS',
  italic: 'Harmony',
  price: 1480,
  descriptor: 'Daily support for PCOS, built from the biology up',
  flavours: ['Passion Fruit'],
  ingredients: [{
    icon: 'network',
    name: 'Myo-Inositol',
    benefit: 'Promotes hormone balance',
    blurb: 'A naturally occurring compound found in fruit, beans and whole grains. Inositols act as messengers in insulin signalling, and myo-inositol is one of the most studied nutrients in women\'s hormonal health.'
  }, {
    icon: 'refresh-ccw',
    name: 'D-Chiro-Inositol',
    benefit: 'Supports a steadier rhythm',
    blurb: 'The partner form of myo-inositol. The body converts between the two, and research usually looks at them together, in a set ratio, for their role in ovarian function and cycle regularity.'
  }, {
    icon: 'leaf',
    name: 'Berberine',
    benefit: 'Helps your cells use energy and insulin more efficiently',
    blurb: 'A plant compound traditionally extracted from barberry and goldenseal. It has been studied for its role in glucose metabolism and how the body manages energy.'
  }, {
    icon: 'sun',
    name: 'Vitamin D3 + K2',
    benefit: 'Supports bone & immune health',
    blurb: 'Vitamin D3 contributes to normal bones and immune function; vitamin K2 helps direct calcium to where the body needs it. Many women do not get enough vitamin D from sunlight alone.'
  }]
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
    const focusables = () => Array.from(el.querySelectorAll(sel)).filter(n => n.getClientRects().length);
    const t = setTimeout(() => {
      const f = focusables();
      (f[0] || el).focus({
        preventScroll: true
      });
    }, 40);
    const onKey = e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        escRef.current && escRef.current();
        return;
      }
      if (e.key !== 'Tab') return;
      const f = focusables();
      if (!f.length) {
        e.preventDefault();
        return;
      }
      const first = f[0],
        last = f[f.length - 1];
      if (!el.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    const html = document.documentElement,
      sw = window.innerWidth - html.clientWidth;
    const prevOv = html.style.overflow,
      prevPad = document.body.style.paddingRight;
    html.style.overflow = 'hidden';
    if (sw > 0) document.body.style.paddingRight = sw + 'px';
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      html.style.overflow = prevOv;
      document.body.style.paddingRight = prevPad;
      prev && prev.focus && prev.focus({
        preventScroll: true
      });
    };
  }, [active]);
}
const ingredientButton = {
  display: 'block',
  width: '100%',
  padding: 0,
  margin: 0,
  background: 'none',
  border: 0,
  textAlign: 'left',
  font: 'inherit',
  color: 'inherit',
  cursor: 'pointer'
};
Object.assign(window, {
  useOverlay,
  ingredientButton,
  DS,
  Reveal,
  Line,
  ASSET,
  PRODUCT
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/shared.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Heading = __ds_scope.Heading;

__ds_ns.Logotype = __ds_scope.Logotype;

__ds_ns.StackedCaps = __ds_scope.StackedCaps;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.IngredientItem = __ds_scope.IngredientItem;

__ds_ns.TestimonialSlider = __ds_scope.TestimonialSlider;

__ds_ns.TrustPoint = __ds_scope.TrustPoint;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconBadge = __ds_scope.IconBadge;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.EmailSignup = __ds_scope.EmailSignup;

__ds_ns.TextInput = __ds_scope.TextInput;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

})();
