-- Migration 002: one subscription table for both recurring plans.
--
-- Run once in the Supabase SQL editor. Safe to re-run.
--
-- Adds:
--   plan            which recurring plan this row is (claim-verified or featured-city)
--   pending_clinic  submitted details for a clinic that is not in the directory yet
--   verified_at     set by a human, never by a payment, and gates the Verified badge
--
-- Relaxes clinic_id, city_slug and state_slug to nullable, because a clinic can
-- now buy a plan before it exists in the directory. Nothing renders against such
-- a row until the listing is created and clinic_id is filled in.

alter table public.featured_listings
  add column if not exists plan text not null default 'featured-city';

alter table public.featured_listings
  add column if not exists pending_clinic jsonb;

alter table public.featured_listings
  add column if not exists verified_at timestamptz;

alter table public.featured_listings alter column clinic_id drop not null;
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

-- Finding the paid rows that still need a listing created by hand.
create index if not exists featured_listings_unlinked_idx
  on public.featured_listings (status, created_at)
  where clinic_id is null;
