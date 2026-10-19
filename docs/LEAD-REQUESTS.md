# Appointment requests: lead partner clinics

A clinic that agrees to the lead partnership gets a "Request an appointment"
form on its `/clinic/[slug]` page. Each request is saved in Supabase and emailed
to the clinic. The clinic pays a fixed fee per delivered request, except for
patients who report Medicare, Medicaid, Tricare or VA coverage, who are never
billed.

Every other clinic page shows nothing: no teaser, no "coming soon", no fallback
form. Until the first clinic is switched on, the feature is invisible.

This is separate from the paid listing plans in `docs/PAID-LISTINGS.md`. It
touches none of their tables or code, and a clinic can hold both.

**Before billing anyone:** the fee structure, the consent wording, and the
privacy policy section have to be reviewed by an attorney. See "Open legal
questions" at the end.

## How it fits together

| Piece | Where |
| --- | --- |
| Tables and the billing view | `supabase/migrations/004_lead_requests.sql` |
| Form (client component, mounted on the clinic page) | `components/lead-request-form.tsx` |
| API: `GET` "is the form on for this clinic", `POST` a request | `app/api/lead-request/route.ts` |
| Partner lookups, saving, rate limit queries | `lib/lead-requests.ts` |
| Email to the clinic, and the operator alert on failure | `lib/lead-request-email.ts` |
| Form choices, the billable rule, the consent sentence | `lib/lead-request-options.ts` |
| Monthly invoicing export | `scripts/export-lead-billing.mjs` |
| Privacy policy section | `app/privacy-policy/page.tsx`, Section 5 |

The form checks `GET /api/lead-request?clinic=<slug>` in the browser and renders
only when it answers `enabled: true`. That happens only when **all** of these
hold:

1. `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set,
2. `RESEND_API_KEY` and `EMAIL_FROM` (a sender on a domain verified in Resend)
   are set. In `npm run dev` this one is waived and the email is logged
   instead, so the flow can be tested locally,
3. the clinic has a `lead_partners` row with `active = true` and at least one
   destination email,
4. the slug still exists in the directory data.

Anything missing means no form. `POST` checks the same things, so a stale page
cannot send a request to a clinic that was switched off.

Partner lookups are cached for 60 seconds per server instance, and the `GET`
answer is cached at the CDN for 60 seconds (stale for up to 5 more minutes). A
switch on or off reaches every visitor within about 6 minutes; the `POST` check
follows the database within a minute.

## Setup (once)

Run `supabase/migrations/004_lead_requests.sql` in the Supabase SQL editor. It
is safe to re-run and changes nothing visible on its own: there are no partner
rows yet.

`EMAIL_FROM` must be on a verified domain for the clinic emails to go out. The
Resend sandbox sender can only deliver to your own address, so without it the
form stays hidden in production.

## Turning a clinic on

1. Find the clinic's slug: the last part of its URL,
   `https://www.ussleepclinics.com/clinic/<slug>`. Always the slug, never the
   numeric id, which shifts on every data update.
2. Insert the partner row. It starts **off**:

   ```sql
   insert into public.lead_partners (clinic_slug, clinic_name, destination_emails, fee_cents, notes)
   values (
     'example-sleep-center-austin-tx',
     'Example Sleep Center',
     array['scheduling@example.com'],      -- up to five addresses
     2500,                                 -- fee per billable request, in cents
     'Agreement signed 2026-11-03, contact: Jane, office manager'
   );
   ```

3. Send yourself a test first: temporarily point `destination_emails` at your
   own address, switch it on (next step), submit the form on the live page, and
   check the email. Then void the test row and set the clinic's real address:

   ```sql
   update public.lead_requests set status = 'void'
   where clinic_slug = 'example-sleep-center-austin-tx' and patient_name = 'Test';

   update public.lead_partners
   set destination_emails = array['scheduling@example.com'], updated_at = now()
   where clinic_slug = 'example-sleep-center-austin-tx';
   ```

4. Switch it on:

   ```sql
   update public.lead_partners set active = true, updated_at = now()
   where clinic_slug = 'example-sleep-center-austin-tx';
   ```

## Turning a clinic off

```sql
update public.lead_partners set active = false, updated_at = now()
where clinic_slug = 'example-sleep-center-austin-tx';
```

The form disappears within a few minutes and new requests are refused. Keep the
row: its past requests reference it, and deleting it is blocked while they
exist. To change where requests go, update `destination_emails`. To change the
fee, update `fee_cents`; requests already received keep the fee they arrived
with.

If a clinic's slug changes (it is built from name, city and state), update
`clinic_slug` on its `lead_partners` row in the same deploy. Its requests follow
automatically (`on update cascade`).

To see who is on:

```sql
select clinic_slug, active, destination_emails, fee_cents, updated_at
from public.lead_partners order by active desc, clinic_slug;
```

## What happens on a request

1. The form posts to `/api/lead-request`. Spam checks first: a hidden honeypot
   field, a minimum of 3 seconds on screen, at most 3 requests per 10 minutes
   per server instance from one IP, and at most 5 per day per IP across all
   instances (counted in the database by a salted hash of the IP, never the raw
   address). Bots get a normal looking success and nothing is saved.
2. The same phone number to the same clinic within 24 hours is treated as the
   same request: the patient sees the confirmation, and no second row or email
   is created.
3. The row is saved with status `new`. `billable` is false for Medicare,
   Medicaid, and Tricare/VA. A database constraint enforces this too, so no
   code path can mark one billable. Billable rows copy the partner's current
   `fee_cents`.
4. The email goes to every `destination_emails` address, with reply-to set to
   the patient's email when given. On success the row becomes `delivered`. On
   failure it becomes `delivery_failed` and the operator (`NOTIFY_EMAIL`) gets
   an alert with the reference only. In development without a Resend key the
   row stays `new` and the email is logged without patient details.
5. The patient sees a confirmation saying the clinic will contact them, with the
   clinic's phone number as a fallback and a reference like `REQ-8F3A2C`. The
   clinic's email carries the same reference.

The only analytics event is `lead_request_submitted` with `clinic_slug`. No
field the patient typed or picked is sent to Google Analytics or any ad tag.
Keep it that way: health information in an ad or analytics pixel is exactly
what the FTC has brought cases over.

Requests that failed delivery need forwarding by hand:

```sql
select id, clinic_slug, created_at, delivery_error
from public.lead_requests where status = 'delivery_failed' order by created_at;
```

## Invoicing

Billable means `billable = true` and `status = 'delivered'`. Months are UTC.
Two ways to get the numbers, both report only and charge nothing:

```sql
select * from public.lead_billing_monthly
where month = '2026-11-01' order by clinic_slug;
```

```bash
npm run export-lead-billing -- 2026-11
```

The script writes `exports/lead-billing/2026-11-summary.csv` (per clinic) and
`2026-11-detail.csv` (per request: reference, dates, insurance category, fee),
neither with patient details. With no month it exports last month. It reads
the Supabase keys from `.env` (needs Node 22.9 or later for that flag).
`requests_without_fee` counts billable rows that arrived while the partner had
no `fee_cents`; settle those by hand.

To exclude a request from billing (a duplicate the 24 hour check missed, a
test, a clinic dispute):

```sql
update public.lead_requests set status = 'void' where id = '<id>';
```

## Retention

The privacy policy (Section 5) promises patient details are deleted after 24
months. Nothing does this automatically. Run this monthly, or schedule it with
`pg_cron`:

```sql
update public.lead_requests
set patient_name = '[deleted]', phone = '', email = null, note = null, ip_hash = null
where created_at < now() - interval '24 months' and patient_name <> '[deleted]';
```

A patient asking for deletion sooner gets the same update, by `id` or phone.

## Open legal questions (for the attorney review)

- **Fee structure.** A fixed fee per delivered request, never a percentage, and
  government-insured patients never billed. Confirm this is acceptable under the
  federal Anti-Kickback Statute and under the patient brokering laws of each
  partner's state (Florida and Texas are strict, and some states' laws reach
  commercially insured patients too).
- **"Not sure" insurance.** It is billable as specified. Some of those patients
  will turn out to be on Medicare. Decide whether it should be non-billable, or
  whether clinics may void such requests once insurance is confirmed. Making it
  non-billable is a one-line change in `NON_BILLABLE_INSURANCE` plus the
  constraint.
- **Consumer health data laws.** Washington's My Health My Data Act (and
  similar laws in Nevada and Connecticut) can treat the reason for visit as
  consumer health data, which may need a separate consumer health data privacy
  policy and separate consent for collecting it and for sharing it. The form
  currently has one consent checkbox, for sharing.
- **"Sale" under state privacy laws.** Sharing a request with a clinic that pays
  for it may count as a sale unless the patient intentionally directs the
  disclosure. The consent checkbox is meant to be that direction; confirm the
  wording is enough.
- **Paid relationship disclosure.** The form says the clinic pays US Sleep
  Clinics for some requests. Confirm the wording.
- **The `lead_request_submitted` event.** It tells Google Analytics that a
  visitor sent a request to a named clinic. Dropping it is the more
  conservative choice; the same counts are in `lead_requests`.
