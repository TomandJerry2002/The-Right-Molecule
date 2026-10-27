import React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

// Same globals as main.jsx; the checkout page skips GSAP (the design system works without it).
window.React = React;
window.ReactDOM = ReactDOM;

const loadScript = (src) => new Promise((resolve, reject) => {
  const s = document.createElement('script');
  s.src = src; s.onload = resolve; s.onerror = reject;
  document.head.appendChild(s);
});

(async () => {
  await loadScript(import.meta.env.BASE_URL + 'config.js');
  await loadScript(import.meta.env.BASE_URL + '_ds_bundle.js');
  const { CheckoutPage } = await import('./CheckoutPage.jsx');
  createRoot(document.getElementById('root')).render(<CheckoutPage />);
})();
