// ── WAITLIST ─────────────────────────────────────────────────────────────
// Desktop (React) and mobile pages both call
// window.TRMWaitlist.submit({ name, email, source, answers }).
// Resolves to { memberNumber } (shown on the Founding Member card); throws on failure.
window.TRMWaitlist = {
  async submit({ name, email, source, answers }) {
    const api = (window.TRMConfig && window.TRMConfig.apiUrl) || '';
    const r = await fetch(api + '/api/waitlist/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, source, answers }),
    });
    if (!r.ok) throw new Error('Waitlist request failed');
    const res = await r.json();
    try { localStorage.setItem('trm-prebook-done', '1'); } catch (e) {}
    return res;
  },
};
