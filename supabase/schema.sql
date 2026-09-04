-- US Sleep Clinics: paid listing tables.
--
-- Run once in the Supabase SQL editor (Dashboard > SQL Editor > New query).
-- Safe to re-run: everything is IF NOT EXISTS.
--
-- Row level security is enabled with no policies, which denies all access to
-- the anon and authenticated keys. Only the service-role key used by the API
-- routes in app/api/ can read or write these tables. Do not add a permissive
-- policy without thinking it through: these rows hold customer emails.

-- Clinic submissions. Every new row is a paid priority add; 'free' stays in the
-- check constraint only so rows written before the free queue was removed still
-- read back.
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

-- Featured placements: one row per paid subscription for one clinic.
-- clinic_id refers to Clinic.id in data/clinics.json, which is regenerated from
-- the Excel source on every deploy. clinic_slug is stored alongside it as the
-- stable human-readable key: if ids ever shift, reconcile on slug.
create table if not exists public.featured_listings (
  id uuid primary key default gen_random_uuid(),
  clinic_id integer not null,
  clinic_slug text,
  clinic_name text,
  city_slug text not null,
  state_slug text not null,
  status text not null default 'pending'
    check (status in ('pending', 'active', 'past_due', 'canceled')),
  stripe_customer_id text,
  stripe_subscription_id text unique,
  stripe_session_id text unique,
  contact_email text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- One live placement per clinic. A clinic that cancels and comes back reuses
-- the row (the webhook upserts on clinic_id) rather than stacking duplicates.
create unique index if not exists featured_listings_clinic_idx
  on public.featured_listings (clinic_id);

create index if not exists featured_listings_city_idx
  on public.featured_listings (state_slug, city_slug, status);

-- Waitlist for the Claimed and Verified tier, which is not self-serve yet.
create table if not exists public.claim_waitlist (
  id uuid primary key default gen_random_uuid(),
  clinic_id integer,
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
alter table public.stripe_events enable row level security;
