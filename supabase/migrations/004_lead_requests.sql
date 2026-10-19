-- Migration 004: appointment requests for lead partner clinics.
--
-- Run once in the Supabase SQL editor. Safe to re-run. Nothing changes on the
-- site until a lead_partners row is switched on (see docs/LEAD-REQUESTS.md),
-- and the paid listing tables are not touched.
--
-- Two tables:
--   * lead_partners  one row per clinic that has agreed to receive appointment
--                    requests, keyed by clinic_slug. The form renders only for
--                    a clinic with a row here and active = true.
--   * lead_requests  every request a patient sent, with what is needed to
--                    deliver it and to invoice for it.
--
-- Keyed by clinic_slug, never Clinic.id: the id is a row position in the Excel
-- file and shifts on every data update, which would send a patient's request
-- to the wrong clinic.
--
-- Row level security is on with no policies, like every other table here, so
-- only the service role key can read these rows. They hold patient contact
-- details and a reason for visit. Do not add a permissive policy.

create table if not exists public.lead_partners (
  clinic_slug text primary key,
  clinic_name text,
  -- Where requests are emailed. At least one address, at most five.
  destination_emails text[] not null
    check (cardinality(destination_emails) between 1 and 5),
  -- The on/off switch. A new row starts off, so a clinic only goes live when
  -- someone flips this deliberately.
  active boolean not null default false,
  -- Agreed fee per delivered, billable request, in cents. Copied onto each
  -- request when it arrives, so changing it later does not reprice old rows.
  fee_cents integer check (fee_cents is null or fee_cents >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lead_requests (
  id uuid primary key default gen_random_uuid(),
  -- on update cascade: if a clinic's slug changes, its history follows it.
  clinic_slug text not null
    references public.lead_partners (clinic_slug) on update cascade,
  clinic_name text,
  patient_name text not null,
  phone text not null,
  email text,
  insurance_type text not null
    check (insurance_type in ('commercial', 'medicare', 'medicaid', 'tricare_va', 'self_pay', 'unsure')),
  reason text not null
    check (reason in ('sleep_apnea', 'sleep_study', 'insomnia', 'cpap', 'daytime_sleepiness', 'other')),
  note text,
  contact_time text not null
    check (contact_time in ('morning', 'afternoon', 'evening', 'any')),
  -- The exact consent sentence the patient ticked, clinic name included.
  consent_text text not null,
  -- False for every government-insured patient. The constraint below enforces
  -- it in the database too, so no code path can ever bill one.
  billable boolean not null,
  fee_cents integer,
  -- new: saved, email not sent yet (or no email provider configured)
  -- delivered: the email provider accepted the email to the clinic
  -- delivery_failed: the send was attempted and failed
  -- void: excluded from billing by hand (duplicate, test, dispute)
  status text not null default 'new'
    check (status in ('new', 'delivered', 'delivery_failed', 'void')),
  sent_to text[],
  delivered_at timestamptz,
  delivery_error text,
  -- Salted hash of the sender's IP, for rate limiting only. Never the raw IP.
  ip_hash text,
  created_at timestamptz not null default now(),
  constraint lead_requests_government_never_billable
    check (not (billable and insurance_type in ('medicare', 'medicaid', 'tricare_va')))
);

create index if not exists lead_requests_clinic_created_idx
  on public.lead_requests (clinic_slug, created_at desc);

create index if not exists lead_requests_ip_created_idx
  on public.lead_requests (ip_hash, created_at desc);

create index if not exists lead_requests_billing_idx
  on public.lead_requests (created_at)
  where billable and status = 'delivered';

alter table public.lead_partners enable row level security;
alter table public.lead_requests enable row level security;

-- Billable requests per clinic per calendar month (UTC), for invoicing.
--
--   select * from public.lead_billing_monthly
--   where month = '2026-11-01'
--   order by clinic_slug;
--
-- Counts only requests that were delivered and are billable. Government
-- insured requests are never billable, and void rows drop out. The fee is the
-- one in force when each request arrived.
--
-- security_invoker makes the view obey the row level security of the tables
-- under it. Without it, the view would run as its owner and the public API key
-- could read through it.
create or replace view public.lead_billing_monthly
with (security_invoker = true) as
select
  date_trunc('month', r.created_at at time zone 'UTC')::date as month,
  r.clinic_slug,
  max(r.clinic_name) as clinic_name,
  count(*) as billable_requests,
  count(*) filter (where r.fee_cents is null) as requests_without_fee,
  coalesce(sum(r.fee_cents), 0) as amount_cents
from public.lead_requests r
where r.billable and r.status = 'delivered'
group by 1, 2;

revoke all on public.lead_billing_monthly from anon, authenticated;
