# Paid listings: how it works and how to turn it on

Three plans, defined once in `lib/pricing.ts`. Change a price there and the
pricing page, the buttons, and the amount Stripe charges all move together.

| Plan | Price | Status | Fulfillment |
| --- | --- | --- | --- |
| Priority Listing Add | $99 one time | Live, self serve | Manual: you add the clinic to the Excel file and redeploy |
| Claimed and Verified | $149 per year | Waitlist only | Manual: verify, then handle by hand until the edit UI exists |
| Featured in Your City | $349 per year or $39 per month | Live, self serve | Automatic: the webhook flags the clinic and the city page reorders |

There is no free submission path. `/submit` is checkout for the $99 priority
add, and the old `POST /api/submit-clinic` endpoint was deleted with it, so
nothing can drop an unpaid submission into the inbox. The directory still grows
the way it always has, through your own scraping and research, and the clinics
already in it stay listed whether they ever pay or not. Keep that true: it is
what the "What paying does not change" section of `/pricing` promises.

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
charging another.

Also worth doing in the dashboard: turn on **Stripe Tax** if you want US sales
tax handled (advertising and directory services are taxable in some states),
and enable the **customer billing portal** so subscribers can cancel on their
own.

### 2. Supabase

1. Create a project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Copy the project URL into `SUPABASE_URL` and the **service role** key into
   `SUPABASE_SERVICE_ROLE_KEY`. Server only. Never `NEXT_PUBLIC_`.

Row level security is on with no policies, so only the service role key can
read these tables. That is deliberate: they hold customer emails.

Skipping Supabase is supported. Checkout still works and you still get an email
for every order, but nothing is recorded, city slot caps cannot be enforced,
and featured placements have to be set by hand through `FEATURED_CLINIC_IDS`.

### 3. Email

`RESEND_API_KEY` is already used by the contact and submit forms. Two additions:

- `NOTIFY_EMAIL`: where order notifications land.
- `EMAIL_FROM`: a sender on a domain verified in Resend. Until this is set,
  customer-facing email (the "we got your listing" note) is skipped, because the
  Resend sandbox sender can only deliver to your own address. Operator email
  works either way.

### 4. Test before going live

```bash
npm run dev
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Buy each plan with card `4242 4242 4242 4242`, any future expiry, any CVC.
Check that:

- the order email arrives,
- `clinic_submissions` or `featured_listings` has the row,
- a featured clinic jumps to the top of its city page with the "Featured" label.

Then swap in the live keys and do one real purchase on a card you own.

## What happens on a purchase

The browser never grants anything. `POST /api/checkout` only reserves a slot and
opens a Stripe session; the entitlement is written by
`POST /api/stripe/webhook`, which verifies Stripe's signature over the raw
request body. Replayed events are ignored via the `stripe_events` table, and a
failed handler hands the event id back so Stripe's retry is not dropped as a
duplicate.

## Where featured placement shows up

- `/locations/[state]/[city]`: featured clinics first, with an advertising
  disclosure under the grid.
- `/api/clinics` when a `city` or `state` filter is active, which is what the
  homepage search uses.

Deliberately not applied: the unfiltered national list, and "near me" results,
where distance is the honest answer to what the patient asked.

Placements live in Supabase, not in the Excel file, so
`npm run generate-data` cannot wipe something a clinic paid for. The webhook
calls `revalidatePath` on the affected city and state pages, so a purchase
appears within seconds instead of waiting for the next deploy.

`FEATURED_CLINIC_IDS` (comma separated clinic ids) forces a placement without a
subscription. Use it for comps, make-goods, and local testing.

## Fulfilling a priority add

1. The order email arrives with a reference like `SUB-8F3A2C` and the full
   submitted details, and the 48 hour clock starts. Nothing reaches you unpaid,
   so every one of these is a customer waiting.
2. Verify the clinic is real (website, phone, address).
3. Add the row to `Prototype_with_descriptions.xlsx`.
4. `npm run geocode` then `npm run generate-data`, then deploy.
5. Email the customer their page link, and mark the row `published` in
   `clinic_submissions`.
6. If it cannot be verified, refund in Stripe and mark the row `refunded`. The
   refund promise is on the pricing page, so honor it.

## Before charging real money

- **Terms**: `/terms-of-service` says nothing about paid listings. It needs
  refund terms, subscription renewal and cancellation terms, and a statement
  that paid placement does not affect ratings or editorial content. Have this
  reviewed rather than copied from a template.
- **Disclosure**: the "Featured" label and the note under the city grid are the
  FTC-facing pieces. Do not remove them, and do not let a paid placement appear
  unlabeled anywhere new.
- **The verified badge**: it must mean a check you actually perform. The
  intended check is a code sent to an email address at the clinic's own domain,
  matched against the website already in the data. Do not ship the badge before
  the check exists.

## Not built yet (the tier 2 backlog)

Accounts and login, domain-email verification, the self-serve edit UI, a
moderation queue, and an overrides layer so a clinic's edits survive the next
Excel regeneration. `claim_waitlist` collects demand in the meantime, so the
build order can follow the sign-ups.
