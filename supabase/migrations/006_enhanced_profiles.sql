-- Migration 006: Enhanced Profile content.
--
-- Run once in the Supabase SQL editor. Safe to re-run. Until it runs, clinic
-- pages render exactly as before (the read logs the missing table).
--
-- Two things:
--   * enhanced_profiles  one row per clinic, keyed by clinic_slug: the photos,
--                        description, and structured fields a paying clinic
--                        adds to its page. Edited by hand in the Table Editor.
--                        It renders only while the clinic holds a live paid
--                        plan (featured_listings), so the row can stay after a
--                        plan ends without showing anything.
--   * clinic-photos      a public Storage bucket for those photos. Upload to
--                        clinic-photos/<clinic slug>/ and put the public URL in
--                        photos.
--
-- services, equipment, and insurance hold keys from the option lists in
-- lib/enhanced-profile.ts (e.g. 'in-lab-sleep-study', 'medicare'). Unknown
-- keys are ignored on the page, so a typo hides a value rather than breaking
-- anything. photos is a JSON array of {"url": "https://...", "alt": "..."},
-- at most 10.
--
-- Keyed by clinic_slug, never Clinic.id: the id is a row position in the Excel
-- file and shifts on every data update.
--
-- Row level security is on with no policies, like every other table here. The
-- bucket is public-read, which is what lets the page show the photos; writes
-- still need the dashboard or the service role key.

create table if not exists public.enhanced_profiles (
  clinic_slug text primary key,
  description text,
  photos jsonb not null default '[]'::jsonb
    check (jsonb_typeof(photos) = 'array' and jsonb_array_length(photos) <= 10),
  services text[] not null default '{}',
  equipment text[] not null default '{}',
  insurance text[] not null default '{}',
  insurance_note text,
  call_phone text,
  website_url text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.enhanced_profiles enable row level security;

-- Keeps updated_at honest when a row is edited in the Table Editor.
create or replace function public.touch_enhanced_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists enhanced_profiles_touch_updated_at on public.enhanced_profiles;
create trigger enhanced_profiles_touch_updated_at
  before update on public.enhanced_profiles
  for each row execute function public.touch_enhanced_profiles_updated_at();

insert into storage.buckets (id, name, public)
values ('clinic-photos', 'clinic-photos', true)
on conflict (id) do nothing;
