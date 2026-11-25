-- Payments recorded from Razorpay. No user accounts: one row per Razorpay order.
-- Only Edge Functions (service role) read or write this table.

create table public.payments (
  id                  uuid primary key default gen_random_uuid(),
  razorpay_order_id   text not null unique,
  razorpay_payment_id text unique,
  status              text not null default 'created'
                      check (status in ('created', 'captured', 'failed', 'refunded')),
  amount              integer not null check (amount > 0), -- paise
  currency            text not null default 'INR',
  customer_email      text,
  customer_phone      text,
  customer_name       text,
  product             text,
  notes               jsonb not null default '{}'::jsonb,
  raw_payload         jsonb, -- full Razorpay payment entity (never contains full card numbers)
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index payments_status_idx on public.payments (status);
create index payments_customer_email_idx on public.payments (customer_email);

create function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger payments_set_updated_at
  before update on public.payments
  for each row execute function public.set_updated_at();

-- RLS on with no policies: anon/authenticated get nothing. The service role bypasses RLS.
alter table public.payments enable row level security;
revoke all on public.payments from anon, authenticated;
