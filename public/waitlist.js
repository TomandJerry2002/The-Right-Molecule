// ── WAITLIST BACKEND PLACEHOLDER ─────────────────────────────────────────
// The ONE place to connect your backend. Desktop (React) and mobile pages both call
// window.TRMWaitlist.submit({ name, email, source, answers }).
// It must resolve to { memberNumber } — shown on the Founding Member card.
window.TRMWaitlist = {
  async submit({ name, email, source, answers }) {
    // e.g.
    // const r = await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, source, answers }) });
    // if (!r.ok) throw new Error('Waitlist request failed');
    // return r.json();
    await new Promise((r) => setTimeout(r, 900));
    let n = 127;
    try { n = (parseInt(localStorage.getItem('trm-member-no'), 10) || 127) + 1; localStorage.setItem('trm-member-no', String(n)); localStorage.setItem('trm-prebook-done', '1'); } catch (e) {}
    return { memberNumber: n };
  },
};
