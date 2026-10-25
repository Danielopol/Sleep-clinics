-- US Sleep Clinics: paid listing tables.
--
-- Run once in the Supabase SQL editor (Dashboard > SQL Editor > New query).
-- Safe to re-run: everything is IF NOT EXISTS.
--
-- The appointment request tables (lead_partners, lead_requests) are not in this
-- file: run supabase/migrations/004_lead_requests.sql as well. Neither is the
-- Enhanced Profile content (enhanced_profiles and the clinic-photos bucket):
-- run supabase/migrations/006_enhanced_profiles.sql.
--
-- Row level security is enabled with no policies, which denies all access to
-- the anon and authenticated keys. Only the service-role key used by the API
-- routes in app/api/ can read or write these tables. Do not add a permissive
-- policy without thinking it through: these rows hold customer emails.

-- Clinic submissions. New rows are free submissions (tier 'free', status
-- 'pending'). 'priority' rows are the retired $99 priority add, which was paid
-- (status 'awaiting_payment' then 'paid'); they still read back.
create table if not exists public.clinic_submissions (
  id uuid primary key default gen_random_uuid(),
  tier text not null check (tier in ('free', 'priority')),
  status text not null default 'pending'
    check (status in ('pending', 'awaiting_payment', 'paid', 'published', 'rejected', 'refunded')),
  clinic_name text not null,
  address text,
  city text,
  state text,
  zip text,
  phone text,
  specialty text,
  website text,
  description text,
  contact_email text,
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  amount_cents integer,
  paid_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists clinic_submissions_status_idx
  on public.clinic_submissions (status, created_at desc);

-- Paid listing subscriptions: one row per recurring plan for one clinic.
--
-- Historically this held featured placements only, hence the name. It now holds
-- both recurring plans; `plan` says which. 'claim-verified' is the Enhanced
-- Profile: the id predates the rename and stays because live Stripe
-- subscriptions carry it in their metadata.
--
-- Two columns gate what renders, and they are deliberately independent:
--   * status       mirrors the Stripe subscription, nothing else
--   * clinic_slug  null until the clinic exists in the directory. A brand new
--                  clinic can buy any plan, but nothing can render against it
--                  until the listing is created and this is filled in.
--
-- verified_at is legacy: it was the paid "Verified" badge, which is no longer
-- sold. Rows that have it still show "Details confirmed by the clinic". New
-- confirmations go on clinic_claims.confirmed_at instead.
--
-- clinic_slug is the clinic's public URL slug, the only stable key a clinic
-- has. Never key on Clinic.id from data/clinics.json: it is a row position in
-- the Excel file and shifts on every data update, which moves paid badges onto
-- the wrong clinic. Installs older than migration 003 still have an unused
-- clinic_id column.
create table if not exists public.featured_listings (
  id uuid primary key default gen_random_uuid(),
  clinic_slug text,
  clinic_name text,
  city_slug text,
  state_slug text,
  plan text not null default 'featured-city'
    check (plan in ('claim-verified', 'featured-city')),
  status text not null default 'pending'
    check (status in ('pending', 'active', 'past_due', 'canceled')),
  -- The submitted details when the clinic is not in the directory yet, so the
  -- purchase is never stranded waiting on a listing that has to be made by hand.
  pending_clinic jsonb,
  verified_at timestamptz,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  stripe_session_id text unique,
  contact_email text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Migration for installs created before the plan went beyond featured placement.
-- Safe to re-run, and safe to run against a fresh database created above.
alter table public.featured_listings add column if not exists plan text not null default 'featured-city';
alter table public.featured_listings add column if not exists pending_clinic jsonb;
alter table public.featured_listings add column if not exists verified_at timestamptz;
alter table public.featured_listings alter column city_slug drop not null;
alter table public.featured_listings alter column state_slug drop not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'featured_listings_plan_check'
  ) then
    alter table public.featured_listings
      add constraint featured_listings_plan_check
      check (plan in ('claim-verified', 'featured-city'));
  end if;
end $$;

-- One live placement per clinic. A clinic that cancels and comes back reuses
-- the row (the webhook upserts on clinic_slug) rather than stacking duplicates.
create unique index if not exists featured_listings_clinic_slug_idx
  on public.featured_listings (clinic_slug);

create index if not exists featured_listings_unlinked_slug_idx
  on public.featured_listings (status, created_at)
  where clinic_slug is null;

create index if not exists featured_listings_city_idx
  on public.featured_listings (state_slug, city_slug, status);

-- Free claims: a clinic asking to correct its listing. Nothing is granted on
-- insert. A human checks the claimant (an email at the clinic's own domain, or
-- a call to its listed number), applies the corrections, then sets
-- confirmed_at, which shows "Details confirmed by the clinic on <date>" on the
-- page. That marker is free and is never sold. email_domain_matches is a hint
-- computed on submit, not proof: anyone can type any address.
create table if not exists public.clinic_claims (
  id uuid primary key default gen_random_uuid(),
  clinic_slug text not null,
  clinic_name text,
  contact_name text not null,
  contact_role text,
  contact_email text not null,
  phone text,
  corrections text,
  email_domain_matches boolean not null default false,
  status text not null default 'new'
    check (status in ('new', 'identity_confirmed', 'applied', 'rejected')),
  confirmed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clinic_claims_status_idx
  on public.clinic_claims (status, created_at desc);

create index if not exists clinic_claims_confirmed_idx
  on public.clinic_claims (clinic_slug)
  where confirmed_at is not null;

-- Waitlist for a featured slot in a city that is full. Rows written before
-- October 2026 are claim requests from when claiming was not self-serve.
create table if not exists public.claim_waitlist (
  id uuid primary key default gen_random_uuid(),
  clinic_slug text,
  clinic_name text,
  contact_name text,
  contact_email text not null,
  phone text,
  notes text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'verified', 'converted', 'declined')),
  created_at timestamptz not null default now()
);

create index if not exists claim_waitlist_created_idx
  on public.claim_waitlist (created_at desc);

-- Every Stripe event we have already processed, so a redelivered webhook is a
-- no-op instead of a second charge record or a duplicate email.
create table if not exists public.stripe_events (
  id text primary key,
  type text not null,
  processed_at timestamptz not null default now()
);

alter table public.clinic_submissions enable row level security;
alter table public.featured_listings enable row level security;
alter table public.claim_waitlist enable row level security;
alter table public.clinic_claims enable row level security;
alter table public.stripe_events enable row level security;
