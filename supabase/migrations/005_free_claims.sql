-- Migration 005: free claims and free submissions (pricing Strategy B).
--
-- Run once in the Supabase SQL editor, before deploying the code that reads
-- clinic_claims. Safe to re-run. Until it runs, the site still renders: the
-- listing read logs the missing table and carries on without confirmations,
-- but POST /api/claim-listing cannot store claims (the operator email still
-- arrives).
--
-- What changes:
--   * clinic_claims  new. One row per free claim. confirmed_at, set by hand
--                    after the identity check, is what shows "Details
--                    confirmed by the clinic on <date>" on a listing.
--   * clinic_submissions  no schema change. New rows are tier 'free', status
--                    'pending', which the existing check constraints allow.
--   * featured_listings.verified_at  kept and still read: a clinic that passed
--                    the old paid "Verified" check keeps its marker as a
--                    confirmation. Nothing writes it any more.
--
-- Row level security is on with no policies, like every other table here, so
-- only the service role key can read these rows. They hold contact details.

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

alter table public.clinic_claims enable row level security;
