-- Migration 003: key paid listings by clinic slug instead of clinic id.
--
-- Run once in the Supabase SQL editor BEFORE deploying the code that upserts
-- on clinic_slug. Without the unique index below, those upserts fail and a
-- paid checkout would not go live. Safe to re-run.
--
-- Why: clinic_id was Clinic.id from data/clinics.json, which is the clinic's
-- row position in the Excel file. Rows are added and removed on every data
-- update, so a stored clinic_id ends up pointing at a different clinic, and its
-- Featured or Verified badge moves with it. clinic_slug is the clinic's public
-- URL and does not change.
--
-- clinic_id is left in place, unread and no longer written, so nothing is lost.
-- Drop it once you are happy (see the end of this file).

-- If this returns rows, two subscriptions share a clinic. Resolve them by hand
-- before creating the unique index, which will otherwise fail.
select clinic_slug, count(*)
from public.featured_listings
where clinic_slug is not null
group by clinic_slug
having count(*) > 1;

-- One subscription per clinic. Rows for clinics not in the directory yet have a
-- null slug, and Postgres allows any number of nulls in a unique index.
create unique index if not exists featured_listings_clinic_slug_idx
  on public.featured_listings (clinic_slug);

-- Finding the paid rows that still need a listing created by hand.
create index if not exists featured_listings_unlinked_slug_idx
  on public.featured_listings (status, created_at)
  where clinic_slug is null;

-- Optional cleanup, after the new code is deployed and working:
--
-- drop index if exists public.featured_listings_clinic_idx;
-- drop index if exists public.featured_listings_unlinked_idx;
-- alter table public.featured_listings drop column if exists clinic_id;
-- alter table public.claim_waitlist drop column if exists clinic_id;
