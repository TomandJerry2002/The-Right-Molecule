/* global React */
// CheckoutPage.jsx — one checkout for desktop and mobile.
//   checkout.html?item=Passion%20Fruit:2   → details form → Cashfree payment page
//   checkout.html?order_id=TRM-…           → where Cashfree returns: confirmed / retry / expired
// Prices and totals always come from the backend; the backend decides whether an order is paid.
const DS = window.TheRightMoleculeDesignSystem_d2cf6c;
const CFG = window.TRMConfig || {};
const API = CFG.apiUrl || '';
const SUPPORT = CFG.supportEmail || 'hello@therightmolecule.com';
const ASSET = 'assets/';

const inr = (v) => '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 2 });
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FAILED_ATTEMPT = ['FAILED', 'USER_DROPPED', 'CANCELLED', 'VOID'];
const STATES = ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];
const DETAILS_KEY = 'trm-checkout-details';

async function api(path, opts) {
  const r = await fetch(API + path, opts);
  let data = null;
  try { data = await r.json(); } catch (e) {}
  if (!r.ok) { const err = new Error((data && data.error) || 'Something went wrong. Please try again.'); err.status = r.status; err.data = data; throw err; }
  return data;
}

// Cashfree's hosted payment page (UPI, cards, netbanking, wallets).
let sdk = null;
function payWithCashfree(paymentSessionId, mode) {
  sdk = sdk || new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    s.onload = resolve;
    s.onerror = () => { sdk = null; reject(new Error('Could not open the payment page. Check your connection and try again.')); };
    document.head.appendChild(s);
  });
  return sdk.then(() => window.Cashfree({ mode }).checkout({ paymentSessionId, redirectTarget: '_self' })).then((res) => {
    if (res && res.error) throw new Error(res.error.message || 'Payment could not be started.');
  });
}

const normPhone = (v) => { let d = v.replace(/\D/g, ''); if (d.length === 12 && d.startsWith('91')) d = d.slice(2); else if (d.length === 11 && d.startsWith('0')) d = d.slice(1); return d; };
const FIELDS = ['customer_name', 'email', 'phone', 'address_line1', 'address_line2', 'city', 'state', 'pincode'];
const EMPTY = Object.fromEntries(FIELDS.map((k) => [k, '']));
const validate = (f) => ({
  customer_name: f.customer_name.trim().length < 3 ? 'Please enter your full name.' : '',
  email: !EMAIL_RE.test(f.email.trim()) ? 'That email doesn’t look right.' : '',
  phone: !/^[6-9]\d{9}$/.test(normPhone(f.phone)) ? 'Enter a 10-digit mobile number.' : '',
  address_line1: !f.address_line1.trim() ? 'Please enter your address.' : '',
  city: !f.city.trim() ? 'Please enter your city.' : '',
  state: !f.state ? 'Please choose your state.' : '',
  pincode: !/^[1-9]\d{5}$/.test(f.pincode.trim()) ? 'Enter a 6-digit PIN code.' : '',
});

// "?item=Passion Fruit:2&item=…" → [{ flavour, qty }]
const requestedItems = (qs) => qs.getAll('item').map((s) => { const i = s.lastIndexOf(':'); return i < 0 ? { flavour: s, qty: 1 } : { flavour: s.slice(0, i), qty: Math.max(1, parseInt(s.slice(i + 1), 10) || 1) }; });

const label = { fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--fg-2)' };
const h1 = { margin: 0, fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'clamp(34px,5vw,52px)', lineHeight: 1.04, letterSpacing: '-.01em', color: 'var(--fg-1)' };
const body = { margin: 0, fontSize: 15, fontWeight: 300, lineHeight: 1.65, color: 'var(--fg-2)' };
const CSS = '.co-grid{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:clamp(32px,6vw,88px);align-items:start}'
  + '.co-two{display:grid;grid-template-columns:1fr 1fr;gap:0 24px}'
  + '.co-summary{position:sticky;top:32px}'
  + '.co-pay-bottom{display:none}'
  // Phones: order summary first, Pay button after the form.
  + '@media (max-width:860px){.co-grid{grid-template-columns:1fr}.co-summary{position:static;order:-1}.co-pay-side{display:none}.co-pay-bottom{display:block}}'
  + '@media (max-width:480px){.co-two{grid-template-columns:1fr}}'
  + '@keyframes coSpin{to{transform:rotate(360deg)}}@keyframes coUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}'
  + '.co-in{animation:coUp 520ms cubic-bezier(.23,1,.32,1) both}'
  + '.co-field input:focus-visible,.co-field select:focus-visible{outline:none}'
  + '@media (prefers-reduced-motion: reduce){.co-in{animation:none}}';

function Field({ id, label: text, error, children }) {
  return (
    <div className="co-field" style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 6 }}>
      <label htmlFor={'co-' + id} style={label}>{text}</label>
      {children}
      <div style={{ minHeight: 18 }}>{error && <p id={'co-' + id + '-err'} role="alert" style={{ margin: 0, fontSize: 12, fontStyle: 'italic', color: 'var(--fg-2)' }}>{error}</p>}</div>
    </div>
  );
}

const inputStyle = (error) => ({ width: '100%', height: 48, padding: '0 2px', border: 0, borderBottom: '1px solid ' + (error ? 'var(--fg-line-art)' : 'var(--border-strong)'), borderRadius: 0, background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 300, color: 'var(--fg-1)', transition: 'border-color 220ms var(--ease-out)' });

function Spinner() {
  return <span aria-hidden="true" style={{ display: 'inline-block', width: 16, height: 16, borderRadius: '50%', border: '1.5px solid rgba(250,247,241,.35)', borderTopColor: 'var(--action-on-primary)', animation: 'coSpin 700ms linear infinite' }}></span>;
}

function Shell({ children }) {
  const { Icon } = DS;
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      <style>{CSS}</style>
      <header style={{ height: 72, padding: '0 var(--gutter, 24px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-hairline)' }}>
        <a href="./" aria-label="The Right Molecule, home" style={{ display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-logo)', fontWeight: 300, fontSize: 13, lineHeight: 1.28, letterSpacing: 'var(--tracking-logo)', textTransform: 'lowercase', color: 'var(--fg-1)' }}><span>the right</span><span>molecule</span></a>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--fg-2)' }}><Icon name="shield-check" size={16} stroke={1.2} />Secure checkout</span>
      </header>
      <main style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(28px,5vw,64px) var(--gutter, 24px) 80px' }}>{children}</main>
    </div>
  );
}

function Message({ eyebrow, title, children }) {
  return (
    <div className="co-in" style={{ maxWidth: 620 }}>
      {eyebrow && <p style={{ ...label, margin: '0 0 16px', color: 'var(--fg-accent)' }}>{eyebrow}</p>}
      <h1 tabIndex={-1} style={{ ...h1, margin: '0 0 16px' }}>{title}</h1>
      {children}
    </div>
  );
}

function ItemRows({ rows }) {
  return rows.map((r) => (
    <div key={r.key} style={{ display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 16, alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-hairline)' }}>
      <div style={{ aspectRatio: '4/5', background: 'var(--bg-sunken)', padding: 6 }}><img src={ASSET + 'product/sachet-front.png'} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} /></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 500 }}>{r.name}</span>
        <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>{r.sub}</span>
        {r.control && <div style={{ marginTop: 6 }}>{r.control}</div>}
      </div>
      <span style={{ fontSize: 14, fontVariantNumeric: 'tabular-nums' }}>{inr(r.total)}</span>
    </div>
  ));
}

function Totals({ subtotal, shipping, total, totalLabel = 'Total' }) {
  const row = { display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--fg-2)' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '18px 0' }}>
      {subtotal != null && <div style={row}><span>Subtotal</span><span>{inr(subtotal)}</span></div>}
      {shipping != null && <div style={row}><span>Shipping</span><span>{Number(shipping) ? inr(shipping) : 'Free'}</span></div>}
      <div style={{ ...row, fontSize: 17, color: 'var(--fg-1)', paddingTop: 6 }}><span>{totalLabel}</span><span style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 500 }}>{inr(total)}</span></div>
    </div>
  );
}

function CheckoutForm() {
  const { Button, QuantityStepper } = DS;
  const [catalog, setCatalog] = React.useState(null);
  const [loadError, setLoadError] = React.useState(false);
  const [lines, setLines] = React.useState([]);
  const [form, setForm] = React.useState(() => { try { return { ...EMPTY, ...JSON.parse(sessionStorage.getItem(DETAILS_KEY)) }; } catch (e) { return EMPTY; } });
  const [touched, setTouched] = React.useState({});
  const [serverErrors, setServerErrors] = React.useState({});
  const [status, setStatus] = React.useState('idle');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    api('/api/products/').then((c) => {
      setCatalog(c);
      const byFlavour = Object.fromEntries(c.products.map((p) => [p.flavour, p]));
      const merged = {};
      requestedItems(new URLSearchParams(window.location.search)).forEach(({ flavour, qty }) => {
        const p = byFlavour[flavour]; if (!p) return;
        merged[p.sku] = { product: p, qty: Math.min(c.max_quantity, (merged[p.sku] ? merged[p.sku].qty : 0) + qty) };
      });
      const ls = Object.values(merged);
      setLines(ls.length || !c.products.length ? ls : [{ product: c.products[0], qty: 1 }]);
    }).catch(() => setLoadError(true));
  }, []);

  React.useEffect(() => { try { sessionStorage.setItem(DETAILS_KEY, JSON.stringify(form)); } catch (e) {} }, [form]);

  if (loadError) return <Message title="We couldn’t load checkout."><p style={body}>Please check your connection and <a href="" onClick={() => window.location.reload()}>try again</a>.</p></Message>;
  if (!catalog) return <p style={body}>Loading…</p>;
  if (!lines.length) return <Message title="Your bag is empty."><p style={body}><a href="./">Back to The Right Molecule</a></p></Message>;

  const errs = validate(form);
  const fieldError = (k) => (touched[k] && errs[k]) || serverErrors[k] || '';
  const set = (k) => (e) => { const v = e.target.value; setForm((f) => ({ ...f, [k]: v })); setServerErrors((s) => ({ ...s, [k]: '' })); };
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const input = (k, props) => <input id={'co-' + k} value={form[k]} onChange={set(k)} onBlur={blur(k)} aria-invalid={!!fieldError(k)} aria-describedby={fieldError(k) ? 'co-' + k + '-err' : undefined} style={inputStyle(fieldError(k))} {...props} />;

  const subtotal = lines.reduce((s, l) => s + Number(l.product.price) * l.qty, 0);
  const shipping = Number(catalog.shipping_fee);
  const sending = status === 'sending';
  const payBlock = (
    <>
      <Button type="submit" fullWidth disabled={sending} arrow={!sending}>{sending ? <Spinner /> : `Pay ${inr(subtotal + shipping)}`}</Button>
      {error && <p role="alert" style={{ margin: '14px 0 0', fontSize: 13, fontStyle: 'italic', color: 'var(--fg-2)', textAlign: 'center' }}>{error}</p>}
      <p style={{ margin: '14px 0 0', fontSize: 12, color: 'var(--fg-3)', textAlign: 'center' }}>UPI, cards, netbanking and wallets · Payments secured by Cashfree</p>
    </>
  );

  const submit = async (e) => {
    e.preventDefault();
    setTouched(Object.fromEntries(FIELDS.map((k) => [k, true])));
    const first = FIELDS.find((k) => errs[k]);
    if (first) { document.getElementById('co-' + first).focus(); return; }
    setStatus('sending'); setError('');
    try {
      const payload = Object.fromEntries(FIELDS.map((k) => [k, form[k].trim()]));
      const order = await api('/api/checkout/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, items: lines.map((l) => ({ sku: l.product.sku, quantity: l.qty })) }),
      });
      await payWithCashfree(order.payment_session_id, order.cashfree_mode);
      // Cashfree now takes over the page and returns to checkout.html?order_id=…
    } catch (err) {
      setStatus('idle');
      const fe = (err.data && err.data.errors) || {};
      setServerErrors(Object.fromEntries(Object.entries(fe).map(([k, v]) => [k, v[0] && v[0].message])));
      setError(err.message);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="co-grid">
      <div className="co-in">
        <h1 style={{ ...h1, margin: '0 0 8px' }}>Checkout</h1>
        <p style={{ ...body, margin: '0 0 36px' }}>Your details are only used to deliver your order.</p>

        <p style={{ ...label, margin: '0 0 18px', color: 'var(--fg-1)' }}>Contact</p>
        <Field id="customer_name" label="Full name" error={fieldError('customer_name')}>{input('customer_name', { autoComplete: 'name', placeholder: 'First and last name' })}</Field>
        <div className="co-two">
          <Field id="email" label="Email" error={fieldError('email')}>{input('email', { type: 'email', inputMode: 'email', autoComplete: 'email', placeholder: 'you@gmail.com' })}</Field>
          <Field id="phone" label="Mobile number" error={fieldError('phone')}>{input('phone', { type: 'tel', inputMode: 'tel', autoComplete: 'tel-national', placeholder: '98765 43210' })}</Field>
        </div>

        <p style={{ ...label, margin: '24px 0 18px', color: 'var(--fg-1)' }}>Shipping address</p>
        <Field id="address_line1" label="House / flat, street" error={fieldError('address_line1')}>{input('address_line1', { autoComplete: 'address-line1' })}</Field>
        <Field id="address_line2" label="Area, landmark (optional)" error={fieldError('address_line2')}>{input('address_line2', { autoComplete: 'address-line2' })}</Field>
        <div className="co-two">
          <Field id="city" label="City" error={fieldError('city')}>{input('city', { autoComplete: 'address-level2' })}</Field>
          <Field id="pincode" label="PIN code" error={fieldError('pincode')}>{input('pincode', { inputMode: 'numeric', autoComplete: 'postal-code', maxLength: 6 })}</Field>
        </div>
        <Field id="state" label="State" error={fieldError('state')}>
          <select id="co-state" value={form.state} onChange={set('state')} onBlur={blur('state')} autoComplete="address-level1" aria-invalid={!!fieldError('state')} style={{ ...inputStyle(fieldError('state')), color: form.state ? 'var(--fg-1)' : 'var(--fg-3)', cursor: 'pointer' }}>
            <option value="" disabled>Choose a state</option>
            {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <div className="co-pay-bottom" style={{ marginTop: 20 }}>{payBlock}</div>
      </div>

      <aside className="co-summary co-in" style={{ background: 'var(--bg-page-raised)', border: '1px solid var(--border-hairline)', padding: 'clamp(20px,3vw,32px)' }}>
        <p style={{ ...label, margin: 0, color: 'var(--fg-1)' }}>Your order</p>
        <ItemRows rows={lines.map((l, k) => ({
          key: l.product.sku, name: l.product.name, sub: `${l.product.flavour} · ${l.product.sachets} sachets`, total: Number(l.product.price) * l.qty,
          control: <QuantityStepper size="sm" value={l.qty} min={1} max={catalog.max_quantity} onChange={(v) => setLines((ls) => ls.map((x, i) => i === k ? { ...x, qty: v } : x))} />,
        }))} />
        <Totals subtotal={subtotal} shipping={shipping} total={subtotal + shipping} />
        <div className="co-pay-side">{payBlock}</div>
      </aside>
    </form>
  );
}

// Where Cashfree sends the customer back. Polls the backend until the payment settles.
function OrderResult({ orderId }) {
  const { Button } = DS;
  const [order, setOrder] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [settled, setSettled] = React.useState(false);
  const [retry, setRetry] = React.useState({ status: 'idle', error: '' });

  React.useEffect(() => {
    let alive = true, timer, attempts = 0;
    const poll = async () => {
      try {
        const o = await api('/api/orders/' + encodeURIComponent(orderId) + '/');
        if (!alive) return;
        setOrder(o); attempts += 1;
        if (o.status === 'PAID') { try { sessionStorage.removeItem('trm-bag'); sessionStorage.removeItem(DETAILS_KEY); } catch (e) {} }
        const waiting = o.status === 'PENDING' && !(o.payment && FAILED_ATTEMPT.includes(o.payment.status));
        if (waiting && attempts < 10) timer = setTimeout(poll, 3000); else setSettled(true);
      } catch (err) {
        if (alive) setError(err.status === 404 ? 'notfound' : 'network');
      }
    };
    poll();
    return () => { alive = false; clearTimeout(timer); };
  }, [orderId]);

  const tryAgain = async () => {
    setRetry({ status: 'sending', error: '' });
    try { await payWithCashfree(order.payment_session_id, order.cashfree_mode); } catch (err) { setRetry({ status: 'idle', error: err.message }); }
  };
  const help = <p style={{ ...body, fontSize: 14, marginTop: 28 }}>Questions about a payment? Write to <a href={'mailto:' + SUPPORT}>{SUPPORT}</a> with your order number <strong style={{ fontWeight: 500, color: 'var(--fg-1)' }}>{orderId}</strong>.</p>;

  if (error === 'notfound') return <Message title="We couldn’t find that order."><p style={body}><a href="./">Back to The Right Molecule</a></p></Message>;
  if (error) return <Message title="We couldn’t check your order."><p style={body}>Please check your connection and <a href="" onClick={() => window.location.reload()}>refresh this page</a>. If you were charged, your order is safe.</p>{help}</Message>;
  if (!order || (order.status === 'PENDING' && !settled)) {
    return <Message eyebrow={'Order ' + orderId} title="Confirming your payment…"><p style={body}>This usually takes a few seconds. Please keep this page open.</p></Message>;
  }

  const summary = (
    <div style={{ marginTop: 32, maxWidth: 520 }}>
      <ItemRows rows={order.items.map((i, k) => ({ key: k, name: i.name, sub: `${i.flavour} · Qty ${i.quantity}`, total: Number(i.unit_price) * i.quantity }))} />
      <Totals total={order.total} totalLabel={order.status === 'PAID' ? 'Total paid' : 'Total'} />
    </div>
  );

  if (order.status === 'PAID') {
    return (
      <Message eyebrow={'Order ' + order.order_id} title={<>Thank you. <em style={{ fontWeight: 400 }}>Your order is confirmed.</em></>}>
        <p style={body}>A confirmation is on its way to your inbox. We’ll write again with tracking details once it ships.</p>
        {summary}
        <div style={{ marginTop: 12 }}><a href="./">Back to The Right Molecule</a></div>
        {help}
      </Message>
    );
  }

  if (order.status === 'PENDING' && order.payment && FAILED_ATTEMPT.includes(order.payment.status)) {
    return (
      <Message eyebrow={'Order ' + order.order_id} title="Your payment didn’t go through.">
        <p style={body}>{order.payment.status === 'USER_DROPPED' ? 'The payment was cancelled before it finished.' : (order.payment.message || 'The bank or payment app declined it.')} No money was taken. You can try again with the same or a different method.</p>
        {summary}
        <div style={{ maxWidth: 520 }}>
          <Button fullWidth onClick={tryAgain} disabled={retry.status === 'sending'} arrow={retry.status !== 'sending'}>{retry.status === 'sending' ? <Spinner /> : 'Try again'}</Button>
          {retry.error && <p role="alert" style={{ margin: '14px 0 0', fontSize: 13, fontStyle: 'italic', color: 'var(--fg-2)' }}>{retry.error}</p>}
        </div>
        {help}
      </Message>
    );
  }

  if (order.status === 'PENDING') {
    return (
      <Message eyebrow={'Order ' + order.order_id} title="We’re still confirming your payment.">
        <p style={body}>Your bank hasn’t told us the result yet. If money has left your account you’ll get a confirmation email shortly, and you don’t need to pay again. You can <a href="" onClick={() => window.location.reload()}>refresh this page</a> to check.</p>
        {order.payment_session_id && <div style={{ maxWidth: 520, marginTop: 24 }}><Button variant="outline" fullWidth onClick={tryAgain} disabled={retry.status === 'sending'}>I wasn’t charged, try again</Button></div>}
        {help}
      </Message>
    );
  }

  return (
    <Message eyebrow={'Order ' + order.order_id} title="This checkout has expired.">
      <p style={body}>No payment was taken for this order. You can start a new one any time.</p>
      <div style={{ marginTop: 24 }}><a href="./">Back to The Right Molecule</a></div>
      {help}
    </Message>
  );
}

function CheckoutPage() {
  const qs = new URLSearchParams(window.location.search);
  const orderId = qs.get('order_id');
  let content;
  if (orderId) content = <OrderResult orderId={orderId} />;
  else if (!CFG.storeOpen) content = <Message title={<>PCOS Harmony is <em style={{ fontWeight: 400 }}>launching soon.</em></>}><p style={body}>We’re not taking orders yet. <a href="./?waitlist">Join the waitlist</a> to hear the moment we are.</p></Message>;
  else content = <CheckoutForm />;
  return <Shell>{content}</Shell>;
}

export { CheckoutPage };
