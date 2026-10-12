import React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// The design-system bundle (public/_ds_bundle.js) is a classic script that reads these globals.
window.React = React;
window.ReactDOM = ReactDOM;
gsap.registerPlugin(ScrollTrigger);
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

const loadScript = (src) => new Promise((resolve, reject) => {
  const s = document.createElement('script');
  s.src = src; s.onload = resolve; s.onerror = reject;
  document.head.appendChild(s);
});

(async () => {
  await loadScript(import.meta.env.BASE_URL + '_ds_bundle.js');
  const { TRMSite } = await import('./Site.jsx');
  createRoot(document.getElementById('root')).render(<TRMSite />);
})();
