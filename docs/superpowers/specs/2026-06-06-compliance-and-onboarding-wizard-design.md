# Sprint: GST Compliance Gaps + Onboarding Wizard

**Date:** 2026-06-06
**Status:** Approved — ready for implementation planning

---

## Context

Research ([Freelancer Business Software Demand Research.md](../../Freelancer%20Business%20Software%20Demand%20Research.md)) confirms real, validated demand among Indian freelancers for an all-in-one tool. The four purchase triggers identified are: Razorpay account freeze, client ghosting/non-payment, crossing the GST threshold, and losing a deal due to PDF contract friction.

Rupway already solves the core workflow (Leads → Proposals → E-sign → Invoice → Razorpay). This sprint closes two critical gaps that prevent the target user from fully replacing their existing stack, then wraps both in an onboarding wizard that drives new users to their first compliant document in a single session.

---

## Scope

Three deliverables, built in this order:

1. **HSN/SAC codes on invoice line items** — compliance field Razorpay requires
2. **International invoicing mode** — currency selector + LUT zero-rated export invoices
3. **Onboarding wizard** — 5-step linear setup flow for new users

---

## Part 1: HSN/SAC Codes

### Problem
Razorpay freezes accounts when submitted invoices lack HSN/SAC codes. This is the most common reason Indian freelancers have funds withheld. Every GST invoice legally requires a HSN (goods) or SAC (services) code per line item.

### Data model
Line items are stored as JSON on the `Invoice` model — no migration needed. A new optional `hsnSac: string` key is added to the line item JSON shape.

```ts
// LineItem JSON shape (existing + new field)
{ description, qty, rate, gstRate, hsnSac?: string }
```

### User profile defaults
Two new fields added to the `User` model (one migration alongside Part 2):
- `defaultHsnSac String?` — auto-fills into every new invoice line item
- Suggested at wizard setup based on work type

Common SAC codes shown as suggestions:
| Work type | SAC code |
|-----------|----------|
| Software development | 998313 |
| IT consulting | 998314 |
| Graphic / UI design | 998363 |
| Digital marketing | 998371 |
| Photography | 998386 |
| Consulting / other | 998399 |

### UI changes
- **Invoice editor line item row:** Small `hsnSac` text input (6–8 chars) to the left of the description field. Placeholder: "SAC code". Auto-filled from `user.defaultHsnSac` on new line items.
- **Settings → Profile:** "Default HSN/SAC Code" field with a tooltip: *"Required on GST invoices. Your most-used SAC code — it auto-fills on every new invoice."*
- **Invoice PDF:** Add "HSN/SAC" column to the line items table between description and rate.

---

## Part 2: International Invoicing

### Problem
A large portion of the target market (developers, designers, consultants) serves US/EU clients. They need to issue zero-rated export invoices with a LUT declaration. No existing Indian freelancer tool handles this cleanly alongside domestic GST invoices.

### Data model migration
Three new fields on the `Invoice` model:

```prisma
currency      String   @default("INR")
exchangeRate  Decimal?  // manual, for user's records only
lutNumber     String?   // LUT reference, copied from user profile at invoice creation
```

One new field on the `User` model (same migration as Part 1):
```prisma
defaultLutNumber String?  // user's LUT reference filed with GSTN
```

Supported currencies: INR, USD, EUR, GBP, AED.

### Business logic
- When `currency !== "INR"`: GST calculation is skipped entirely. `gstAmount = 0`. Invoice is marked as zero-rated export.
- `lutNumber` is copied from `user.defaultLutNumber` at invoice creation time (stored on the invoice, not fetched live — so it's accurate even if the user later updates their LUT).
- Exchange rate is manual — no API needed. User enters it for their own records. Not used in any calculation.

### UI changes
- **Invoice editor header area:** Currency dropdown (INR / USD / EUR / GBP / AED).
  - When non-INR selected: GST section collapses and is replaced with *"Export of Services — Zero Rated (LUT)"* badge. LUT Reference No. field appears (pre-filled from profile).
  - Monetary values display with correct currency symbol (₹ / $ / € / £ / AED).
- **Settings → Profile:** "LUT Reference Number" field with tooltip explaining what it is and a link to the GSTN LUT filing guide.
- **Invoice list:** Non-INR invoices show a small currency badge (e.g. `USD`) next to the amount.
- **Invoice PDF:** When zero-rated:
  - Line items table shows amounts in chosen currency
  - GST rows are hidden
  - Footer declaration: *"Export of Services — Zero Rated Supply under Bond/LUT as per Section 16(3) of IGST Act 2017. LUT No: [lutNumber]. IGST: Nil."*

---

## Part 3: Onboarding Wizard

### Problem
Current onboarding is a driver.js tooltip tour — it shows the map but doesn't get the user to their first compliant document. New users who don't complete profile setup (GST number, bank details, HSN/SAC) send invalid invoices, lose trust in the product, and churn.

### Trigger
- Shows on first login when `user.onboardingComplete = false`
- Full-screen overlay over the app — not dismissible until Step 3 is reached
- State saved to `localStorage` (key: `rupway_onboarding_v1`) — browser close resumes from last completed step
- On completion: `PATCH /users/me` sets `onboardingComplete: true`

New fields on `User` model (same migration as Parts 1 & 2):
```prisma
onboardingComplete  Boolean @default(false)
razorpayKeyId       String?
razorpayKeySecret   String?
```

**Important:** Razorpay keys are currently stored as server-wide env vars. This is wrong for a multi-tenant SaaS — every freelancer has their own Razorpay account. The migration moves key storage to per-user DB fields. `portal.service.ts` and `proposals.service.ts` must be updated to read from `user.razorpayKeyId` / `user.razorpayKeySecret` instead of `config.get('razorpay.*')`. The env vars remain as a fallback for local dev only.

Existing users (already signed up before this ships) get `onboardingComplete = true` set via a one-time migration script so the wizard doesn't show for them.

### Layout
Full-screen white overlay. Top: progress bar with 5 labeled dots. Center: step content card (max-w-lg, centered). Bottom: primary CTA button + optional skip link (Step 3 onwards only).

### Step 1 — Business Identity
Fields:
- Business / trade name (required — maps to `user.businessName`)
- Logo upload (optional — maps to `user.logoUrl`, reuses existing `useUploadLogo` hook)
- Work type (radio pills): Developer / Designer / Marketer / Consultant / Agency / Other

Work type is stored in `localStorage` only — used to pre-suggest HSN/SAC in Step 2. Not persisted to DB.

CTA: **"Continue →"** (disabled until business name is filled)

### Step 2 — GST & Compliance
Fields:
- GST status toggle: *"Not yet registered"* / *"Registered"*
  - If registered: GSTIN input (maps to `user.gstNumber`)
- International clients toggle: *"Yes, I work with clients abroad"* / *"No, domestic only"*
  - If yes: LUT Reference Number input (maps to `user.defaultLutNumber`)
- Default SAC/HSN Code — pre-filled based on work type from Step 1 (editable). Maps to `user.defaultHsnSac`. Tooltip: *"Razorpay requires this on invoices to process payments."*

CTA: **"Continue →"**

### Step 3 — Get Paid *(first skippable step)*
Fields:
- Bank account name (maps to `user.bankAccountName`)
- Account number (maps to `user.bankAccountNumber`)
- IFSC code (maps to `user.bankIfsc`)
- Bank name (maps to `user.bankName`)
- UPI ID (maps to `user.upiId`)
- Razorpay Key ID + Key Secret (maps to `user.razorpayKeyId`, `user.razorpayKeySecret`) — marked optional with label *"For online payment links via Razorpay"* and a link to where to find them in the Razorpay dashboard

Skip link: *"I'll add this later"* — shows inline warning: *"Without bank/UPI details, clients won't see payment instructions on your invoices."* Skip is allowed.

CTA: **"Continue →"**

### Step 4 — Add Your First Client
Reuses the existing `CreateClientModal` form fields inline (no modal wrapper):
- Name (required), Email, Phone, Company

On continue: calls `POST /clients` to create the client. Client ID is held in wizard state for Step 5.

CTA: **"Continue →"** (disabled until name is filled)

### Step 5 — Send Your First Document *(graduation)*
Headline: *"What do you want to send [clientName]?"*

Three cards side by side:
| Card | Description |
|------|-------------|
| **Proposal** | *"Share your scope, pricing, and terms. Client can accept online."* |
| **Contract** | *"Send a legally binding agreement for e-signature."* |
| **Invoice** | *"Bill for work done. Collect via UPI or Razorpay."* |

On click:
1. Calls `PATCH /users/me` → `{ onboardingComplete: true }`
2. Clears `rupway_onboarding_v1` from `localStorage`
3. Navigates to `/app/proposals/new?clientId=X`, `/app/contracts/new?clientId=X`, or `/app/invoices/new?clientId=X`

No "skip" on this step — user must choose one or close the tab. The three options ensure no one is stuck.

---

## Build Order

1. **DB migration** — add `currency`, `exchangeRate`, `lutNumber` to `Invoice`; add `defaultHsnSac`, `defaultLutNumber`, `onboardingComplete`, `razorpayKeyId`, `razorpayKeySecret` to `User`; run migration script to set `onboardingComplete = true` for all existing users
2. **Backend: Razorpay key migration** — update `portal.service.ts` and `proposals.service.ts` to read Razorpay keys from `user.razorpayKeyId` / `user.razorpayKeySecret` instead of env config; throw a clear `BadRequestException('Connect your Razorpay account in Settings to enable online payments')` when keys are missing
3. **Backend: invoice service** — handle `currency`, `lutNumber`, skip GST when non-INR, copy `lutNumber` from user profile on creation
4. **Backend: users DTO** — expose `defaultHsnSac`, `defaultLutNumber`, `razorpayKeyId`, `razorpayKeySecret` in `PATCH /users/me`
5. **Frontend: Settings → Profile** — add default HSN/SAC, LUT number, default currency, Razorpay key fields
6. **Frontend: Invoice editor** — HSN/SAC per line item + currency selector + international mode UI
7. **Frontend: Invoice PDF** — HSN/SAC column + LUT declaration block + currency display
8. **Frontend: Onboarding wizard** — 5-step component wired to API + localStorage persistence
9. **Frontend: AppShell trigger** — show wizard when `!user.onboardingComplete`

---

## What's NOT in scope

- **WhatsApp reminders** — high value but requires Meta Business API approval (not free, not instant). Separate sprint.
- **Aadhaar-based e-signatures** — requires UIDAI API integration, commercial licensing. Future sprint.
- **Live exchange rate API** — manual entry is sufficient and free.
- **MSME Samadhaan integration** — informational only; link in contract templates suffices for now.

---

## Cost

Zero additional infrastructure cost. All changes are UI fields, DB columns, and PDF layout adjustments. No third-party APIs required.
