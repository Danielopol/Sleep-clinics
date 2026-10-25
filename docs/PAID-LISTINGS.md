# Listings, free and paid: how it works and how to turn it on

Three plans, defined once in `lib/pricing.ts`. Change a price or a promise there
and the pricing page, the claim page, the buttons, and the amount Stripe
charges all move together.

| Plan | Price | Status | Fulfillment |
| --- | --- | --- | --- |
| Free Listing | $0 | Live | Manual: free submissions and free claims arrive by email (and in Supabase) |
| Enhanced Profile | $149 per year | Live, self serve | Manual: confirm identity, then apply photos, description, and changes by email |
| Featured in Your City | $349 per year or $39 per month | Live, self serve | Placement and the ad-free page are automatic; profile changes and any new listing are manual |

The model (Strategy B, decided 2026-10-24, see
`us-sleep-clinics-pricing-decision.md` one folder up): being listed, claiming
a listing, and correcting its facts are free, as on every comparable
directory. Money buys presentation (Enhanced Profile) and placement (Featured),
never the listing and never a trust marker. The $99 Priority Listing Add and
the paid "Verified" badge are retired.

`claim-verified` is the Enhanced Profile's plan id. It predates the rename and
stays because it is stored in `featured_listings.plan` and in the metadata of
every live Stripe subscription. Do not rename it.

## What each tier promises

All of this copy lives in `PLANS` and `TURNAROUND` in `lib/pricing.ts`. Keep
the fulfillment below in step with it.

- **Free Listing.** The listed page. Free submission for a missing clinic,
  reviewed within 10 business days. Free claim after an identity check, with
  corrections applied within 5 business days. "Details confirmed by the
  clinic on <date>" once confirmed. The free website badge.
- **Enhanced Profile.** Up to 10 photos, full description, structured
  services, equipment, and insurance, prominent Call and Visit website
  buttons, no third-party ads on the clinic's page, changes within 1 business
  day, a monthly report (profile views, website clicks, call clicks). Does not
  change ranking. A new clinic added with the plan is published within 2
  business days.
- **Featured.** Everything in Enhanced, plus the top of the city page (3 per
  city, waitlist when full), up to 6 at a time in the state's results
  (rotating daily), the "Featured · Ad" label everywhere, never promoted in
  "near me" results, and impressions in the monthly report.
- **Clinic Group.** 20% off each location for 2 to 9 locations, a quote for
  10 or more. Handled by email (see below).

## Setup, in order

### 1. Stripe

1. Create the account and finish onboarding (business details, bank account),
   otherwise payouts sit in the account.
2. Copy the **secret key** into `STRIPE_SECRET_KEY`. Use `sk_test_...` first.
3. Add a webhook endpoint pointing at `https://www.ussleepclinics.com/api/stripe/webhook`,
   subscribed to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy that endpoint's signing secret into `STRIPE_WEBHOOK_SECRET`.

Products and Prices in the dashboard are optional. Without them, checkout builds
the line item from `lib/pricing.ts`. If you do create them, set the matching
`STRIPE_PRICE_*` env vars, and keep the amounts identical to `lib/pricing.ts`:
nothing checks that they agree, so a mismatch means advertising one price and
charging another. `STRIPE_PRICE_PRIORITY_ADD` is no longer read.

Also worth doing in the dashboard: turn on **Stripe Tax** if you want US sales
tax handled (advertising and directory services are taxable in some states),
and enable the **customer billing portal** so subscribers can cancel on their
own.

### 2. Supabase

1. Create a project.
2. Run `supabase/schema.sql` in the SQL editor. On an existing project, run the
   migrations you have not run yet, in order:
   - `003_key_by_clinic_slug.sql` (before deploying code that keys on `clinic_slug`)
   - `004_lead_requests.sql`
   - `005_free_claims.sql` (before deploying the free claim flow; creates `clinic_claims`)
   - `006_enhanced_profiles.sql` (creates `enhanced_profiles` and the `clinic-photos` bucket)
3. Copy the project URL into `SUPABASE_URL` and the **service role** key into
   `SUPABASE_SERVICE_ROLE_KEY`. Server only. Never `NEXT_PUBLIC_`.

Row level security is on with no policies, so only the service role key can
read these tables. That is deliberate: they hold customer emails.

Skipping Supabase is supported. Checkout still works and you still get an email
for every order, claim, and submission, but nothing is recorded, city slot caps
cannot be enforced, and featured placements and confirmations have to be set by
hand through `FEATURED_CLINIC_SLUGS` and `CONFIRMED_CLINIC_SLUGS`.

### 3. Email

`RESEND_API_KEY` is already used by the contact form. Two additions:

- `NOTIFY_EMAIL`: where order, claim, and submission notifications land.
- `EMAIL_FROM`: a sender on a domain verified in Resend. Until this is set,
  customer-facing email (the acknowledgements) is skipped, because the Resend
  sandbox sender can only deliver to your own address. Operator email works
  either way.

### 4. AdSense: excluded pages

Paid plans promise no third-party ads on the clinic's own page. The site
pauses AdSense on those pages itself (`components/ad-free-guard.tsx` in the
root layout's head, `components/ad-free-page.tsx` for client-side
navigation), but that is best effort. When a clinic subscribes, also add
`ussleepclinics.com/clinic/<slug>` to **Ads > By site > Auto ads > Excluded
pages** in AdSense, and remove it when the plan ends.

### 5. Test before going live

```bash
npm run dev
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Buy each paid plan with card `4242 4242 4242 4242`, any future expiry, any CVC.
Send one free claim from `/claim` and one free submission from `/submit`.
Check that:

- the notification emails arrive,
- `featured_listings`, `clinic_claims`, and `clinic_submissions` have the rows,
- a featured clinic jumps to the top of its city page with the "Featured · Ad"
  label, and appears in its state page's featured strip,
- the clinic page of a paid clinic makes no request to `pagead2.googlesyndication.com/pagead/ads`.

Then swap in the live keys and do one real purchase on a card you own.

## What happens on a purchase

The browser never grants anything. `POST /api/checkout` only reserves a slot and
opens a Stripe session; the entitlement is written by
`POST /api/stripe/webhook`, which verifies Stripe's signature over the raw
request body. Replayed events are ignored via the `stripe_events` table, and a
failed handler hands the event id back so Stripe's retry is not dropped as a
duplicate.

The webhook still handles `priority-add` sessions, so a $99 checkout opened
before that product was retired is recorded if it completes. Fulfill it as a
free submission with the 48 hour promise it was sold with.

## Where featured placement shows up

- `/locations/[state]/[city]`: every featured clinic first, with an
  advertising disclosure under the grid.
- `/locations/[state]`: a "Featured sleep clinics" strip of at most 6
  (`FEATURED_PER_STATE_PAGE`), with the disclosure. When more than 6 clinics in
  the state are featured they take turns: `rotateFeatured` in `lib/listings.ts`
  orders them by slug and advances the window by 6 each UTC day. The page
  regenerates hourly (`revalidate = 3600`) to pick up the next turn.
- `/api/clinics` with a `city` filter (all featured first) or a `state` filter
  (today's 6 first, the rest labeled but in their normal position), which is
  what the homepage search uses.

Deliberately not applied: the unfiltered national list, and "near me" results,
where distance is the honest answer to what the patient asked.

Placements live in Supabase, not in the Excel file, so
`npm run generate-data` cannot wipe something a clinic paid for. The webhook
calls `revalidatePath` on the affected city and state pages, so a purchase
appears within seconds instead of waiting for the next deploy.

`FEATURED_CLINIC_SLUGS` (comma separated clinic slugs) forces a placement
without a subscription, and `CONFIRMED_CLINIC_SLUGS` (`slug` or
`slug:YYYY-MM-DD`) forces the confirmed marker. Use them for comps,
make-goods, and local testing.

**Every paid row is keyed by `clinic_slug`, never by the numeric clinic id.**
The id is the clinic's row position in the Excel file and shifts whenever rows
are added or removed, so a badge keyed on it would move to another clinic on the
next data update. If a clinic's slug ever changes (it is built from name, city
and state), update `clinic_slug` on its rows in the same deploy.

## "Details confirmed by the clinic"

The only trust marker on a listing. It is free, a human grants it, and it is
never sold: the word "Verified" is not used for anything a clinic can buy.

It shows when `clinic_claims.confirmed_at` is set for the clinic's slug (or the
legacy `featured_listings.verified_at`, from when the paid badge existed, or a
`CONFIRMED_CLINIC_SLUGS` entry). The clinic page shows the date; the card shows
"Confirmed by clinic" with the date on hover.

## Fulfillment

### A free claim

The email arrives as "Free claim: <clinic>" with a reference like `CLM-8F3A2C`
and a red box of steps.

1. **Identity check.** The email says whether the claimant's address is at the
   clinic's website domain. That is a hint, not proof, since anyone can type
   any address: reply to it and get an answer. If the domain does not match,
   call the clinic's listed number and ask for the person named.
2. **Apply the corrections** to `Prototype_with_descriptions.xlsx`, then
   `npm run geocode` (if the address changed) and `npm run generate-data`, and
   deploy. Promised within 5 business days of the check.
3. **Mark it confirmed:**
   ```sql
   update public.clinic_claims
   set status = 'applied', confirmed_at = now(), updated_at = now()
   where id = '<row id>';
   ```
   The marker appears within a minute (the read cache is 60 seconds) on pages
   rendered after that; the next deploy covers prerendered ones.
4. If the check fails, set `status = 'rejected'` and change nothing.

### A free submission

The email arrives as "Free submission: <clinic>" with a reference like
`SUB-8F3A2C`. Promised within 10 business days.

1. Check the clinic against public records (website, phone, address, NPI).
   Reject anything that is not a sleep clinic or cannot be confirmed.
2. Add the row to `Prototype_with_descriptions.xlsx`.
3. `npm run geocode` then `npm run generate-data`, then deploy.
4. Email the submitter their page link, and mark the row `published` (or
   `rejected`) in `clinic_submissions`.

If review time passes 4 hours a week, tighten what the form requires, not the
price (the decision document's Experiment 7).

### A paid plan (Enhanced or Featured)

Every order email leads with a numbered list of what is still outstanding.

1. **Identity before changes.** Paying grants no trust marker and no right to
   edit by itself. Confirm the buyer represents the clinic the same way as a
   free claim before applying anything they send. Once confirmed, you may also
   set `confirmed_at` on a `clinic_claims` row for them (insert one if they
   never sent a free claim).
2. **New clinic.** When the order says NEW CLINIC, the buyer is not in the
   directory. The details are in the email and in `pending_clinic` on their
   row. Check it against public records, add it like a free submission, then
   link it. Promised within 2 business days. If it cannot be verified, refund
   in full and cancel the subscription.
   ```sql
   update public.featured_listings
   set clinic_slug = '<new slug>',
       city_slug = '<city slug>',
       state_slug = '<state slug>',
       updated_at = now()
   where id = '<row id from the email>';
   ```
   Anything left in that state:
   ```sql
   select id, plan, contact_email, pending_clinic, created_at
   from public.featured_listings
   where clinic_slug is null and status in ('active', 'past_due')
   order by created_at;
   ```
3. **Enhanced Profile content.** Photos (up to 10), the full description,
   services, equipment, insurance, and the Call and Visit website targets
   arrive by email and are applied within 1 business day of the identity
   check. They go in Supabase, not the Excel file, and need no deploy (see
   "Editing an Enhanced Profile" below). Corrections to the basic facts
   (address, hours, phone) still go in the Excel file, as for a free claim.
4. **AdSense exclusion.** Add the clinic page to the excluded pages (setup
   step 4).
5. **Monthly report.** From Google Analytics, filtered to the clinic's slug:
   - **Impressions** (Featured): `clinic_card_impression` events. One is
     recorded when a paid clinic's card has been at least half on screen for a
     second, once per page view of a list (city page, state strip, search
     results). `featured` says whether it was shown as a placement;
     `page_location` says which list. Only paid clinics send it.
   - **Profile views**: page views of `/clinic/<slug>`.
   - **Website and call clicks**: `clinic_outbound_click` with `target`
     `website` or `phone`.

   Send it each month. `clinic_slug` and `featured` must be registered as
   event-scoped custom dimensions in GA4 (Admin > Custom definitions) to filter
   on them; GA4 does not backfill, so register them before the first sale.
   The VA sleep clinics page does not count impressions (VA facilities do not
   buy plans).

### Editing an Enhanced Profile

Run `supabase/migrations/006_enhanced_profiles.sql` once first. It creates the
`enhanced_profiles` table and the public `clinic-photos` Storage bucket.

1. **Photos.** In Supabase, **Storage > clinic-photos**, make a folder named
   after the clinic slug and upload up to 10 images (landscape, at least 1200
   px wide, under about 500 KB each). Copy each file's public URL.
2. **The row.** In **Table Editor > enhanced_profiles**, insert a row (or edit
   the existing one) with `clinic_slug` set to the clinic's slug:
   - `description`: the full description. Replaces the directory's.
   - `photos`: a JSON array, first photo first (it also becomes the main
     image): `[{"url": "https://...", "alt": "Reception"}, ...]`. Only https
     URLs show; anything past the tenth is ignored.
   - `services`, `equipment`, `insurance`: arrays of keys from
     `lib/enhanced-profile.ts`, e.g. `{in-lab-sleep-study,home-sleep-test,cbt-i}`
     and `{medicare,aetna,self-pay}`. A misspelled key is ignored (and logged),
     not shown.
   - `insurance_note`: free text for plans not in the list.
   - `call_phone`, `website_url`: only if the clinic wants different targets
     for the big Call and Visit website buttons than its listing has.
3. **Check it.** The page picks it up within about 5 minutes: listing reads are
   cached for 60 seconds and clinic pages regenerate at most every 5 minutes
   (`revalidate = 300`).

Or in SQL:

```sql
insert into public.enhanced_profiles
  (clinic_slug, description, photos, services, equipment, insurance, insurance_note)
values (
  '<clinic slug>',
  '<full description>',
  '[{"url": "https://<project>.supabase.co/storage/v1/object/public/clinic-photos/<slug>/1.jpg", "alt": "Reception"}]',
  '{in-lab-sleep-study,home-sleep-test}',
  '{pap-devices}',
  '{medicare,aetna}',
  null
)
on conflict (clinic_slug) do update set
  description = excluded.description,
  photos = excluded.photos,
  services = excluded.services,
  equipment = excluded.equipment,
  insurance = excluded.insurance,
  insurance_note = excluded.insurance_note;
```

The content renders only while the clinic has a live paid plan, so when a
plan ends it disappears from the page by itself. The terms (section 6.8) also
promise to remove it: delete the row and the clinic's photo folder within a
few weeks of the plan ending.

To preview locally without Supabase, put an array of rows in
`data/enhanced-profiles.preview.json` (gitignored, read only by `npm run dev`)
and comp the clinic with `FEATURED_CLINIC_SLUGS` so it counts as paid.

### Clinic Group

A practice with 2 to 9 locations gets 20% off each location's plan; 10 or more
get a quote. Requests arrive by email (the pricing and claim pages link to
`mailto:` with the subject "Clinic Group pricing").

1. Confirm the locations are one practice (same owner or management).
2. In Stripe, create a coupon for 20% off, duration "forever", and a
   promotion code for it restricted to that customer's email or first
   purchase.
3. Send them the code. Each location checks out on `/claim` as usual (checkout
   has `allow_promotion_codes` on), so slots, rows, and the webhook work
   exactly as for any other clinic.

## Before charging real money

- **Terms**: section 6 of `/terms-of-service` covers paid plans (October
  2026 draft, not yet reviewed by a lawyer; have it reviewed). It commits you
  to the following, so fulfillment has to match:
  - **Refund in full** if a new clinic cannot be verified and published, or if
    you cannot confirm the buyer represents the clinic within 30 days of
    purchase. Track the purchase date on each open identity check.
  - **Cancellation** stops the next renewal; the plan stays active to the end
    of the paid period. No partial refunds otherwise, except when you cancel a
    plan for reasons other than breach or non-payment, or stop offering it:
    then refund the unused part.
  - **Price changes**: email every affected subscriber at least 30 days
    before the new price applies, and change the price in `lib/pricing.ts`
    and Stripe only for renewals after that.
  - **Changes to section 6**: update `LAST_UPDATED` in the page and email
    active subscribers 30 days before the change applies to them.
  - **Plan ends**: remove the photos and other content added under it.
  Also in Stripe: **Settings > Billing > Subscriptions and emails**, turn on
  reminders for upcoming renewals. Several US states require an annual
  renewal reminder, and the terms rely on it not being a surprise.
- **Disclosure**: the "Featured · Ad" label and the notes under the city grid
  and the state strip are the FTC-facing pieces. Do not remove them, and do
  not let a paid placement appear unlabeled anywhere new. An attorney review
  of the label is recommended.
- **The confirmed marker**: it must mean a check you actually perform. If you
  ever find yourself setting `confirmed_at` in bulk without checking, it has
  stopped meaning anything and becomes a liability.
- **Claims about results**: the pricing page makes none (no "more patients",
  rankings, or ROI). Quote directory-wide traffic only, with a date.

## Not built yet

Accounts and login, automated domain-email verification, a self-serve edit UI
(clinics cannot edit their Enhanced Profile themselves; you enter it in
Supabase), and an overrides layer so a free claim's corrections live outside
the Excel file. Until those exist, identity checks, edits, and reports are
manual, which is why the paid plans are yearly with a human in the loop.

The volume that justifies building them is the number of open `clinic_claims`
rows plus active rows in `featured_listings`. When applying changes by hand
starts costing more than an afternoon a week, build the editor.
