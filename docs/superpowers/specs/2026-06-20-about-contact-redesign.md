# About & Contact Page Redesign

## Overview

Replace the current minimal About and Contact pages with production-quality pages that serve their distinct conversion goals. About converts skeptics evaluating ClearWork. Contact converts people who already want to reach out.

Two independent pages (`/about` and `/contact`), each optimised for its own goal.

---

## About Page (`/about`)

### Goal
Convert visitors who are evaluating ClearWork — investors, potential users, journalists, partners. Give them a clear picture of what ClearWork is, who it's for, and why it exists.

### Tone
Brand/company voice. "We" = the ClearWork team. No personal founder details. Professional but warm.

### Section Flow

#### 1. Dark Hero
- Background: `bg-[#101828]`
- Headline: "India's client workflow platform"
- Subtext: "Built for 15M Indian freelancers who needed GST, UPI, and e-sign in one tool — not five."

#### 2. Stats Bar
Four white cards on `bg-[#F4F6FB]`, displayed in a 4-column row:

| Stat | Label |
|------|-------|
| 2025 | Founded |
| Bengaluru | Headquartered |
| 15M+ | Target users |
| Free | Early access |

#### 3. Problem Block
Heading: "The problem we're solving"

Body (2–3 sentences): Indian freelancers run their business across 5 different tools — Google Docs for proposals, WhatsApp for client chats, Excel for invoices, Razorpay for payments, and email for follow-ups. None of them are built for India's GST requirements, UPI payment rails, or IT Act 2000 e-sign compliance. ClearWork is the one platform that covers the full workflow with Indian compliance built in from day one.

#### 4. Differentiator Grid
2×2 grid of coloured feature cards:

| Feature | Colour |
|---------|--------|
| GST-native invoicing | Indigo (`bg-indigo-50 text-indigo-700`) |
| IT Act e-sign | Green (`bg-emerald-50 text-emerald-700`) |
| UPI payment collection | Amber (`bg-amber-50 text-amber-700`) |
| WhatsApp payment reminders | Purple (`bg-violet-50 text-violet-700`) |

Each card has a lucide-react icon, bold label, and 1-line description.

#### 5. Values Row
Three inline chips in a horizontal row:
- India-first, always
- Simple over clever
- Honest by default

#### 6. CTA Banner
Background: `bg-indigo-600`  
Text: "Try ClearWork free — no credit card needed"  
Button: "Get started →" → links to `https://app.getclearwork.in` (or the signup route)

---

## Contact Page (`/contact`)

### Goal
Receive messages from prospects, users seeking support, and potential partners. Single point of contact. No email address hunting.

### Section Flow

#### 1. Dark Hero
- Background: `bg-[#101828]`
- Headline: "Get in touch"
- Subtext: "We read every message personally. Usually respond within 24–48 hours."

#### 2. Centred Form Card
- Width: `max-w-lg mx-auto`
- Style: `bg-white rounded-2xl border border-gray-100 shadow-sm p-8`

**Fields:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | text | Yes | min 2 chars |
| Email | email | Yes | valid email format |
| Category | select | Yes | one of 5 options |
| Message | textarea (4 rows) | Yes | min 10 chars |

**Category options:**
- General enquiry
- Product feedback
- Support
- Partnership
- Press

**Submit button:** "Send message" — indigo, full width. Shows spinner during submission. Disabled while pending.

**Error display:** Inline below each field, shown only after blur or first submit attempt. Never shown preemptively.

#### 3. Email Line (below form)
Small muted text: `✉ hello@getclearwork.in · Replies within 24–48h`  
Use `Mail` icon from lucide-react (no emoji).

#### 4. Success State
On successful submission, replace the form with:
- A green checkmark icon (`CheckCircle2` from lucide-react)
- Heading: "Message sent!"
- Body: "We'll get back to you at [submitted email] within 24–48 hours."
- No auto-redirect.

#### 5. Error State
If the API call fails (network error, 5xx), show a red inline banner above the submit button:
"Something went wrong. Please try again or email us directly at hello@getclearwork.in"

---

## Backend: Contact Form Endpoint

### Route
`POST /contact` — public, no authentication required.

### Location
New controller + service in `pakka-api`. NOT attached to the existing workspace-scoped `EmailService`. Use nodemailer directly.

### Request Body
```ts
{
  name: string;       // min 2 chars
  email: string;      // valid email
  category: string;   // one of the 5 enum values
  message: string;    // min 10 chars
}
```

### Validation
Use `class-validator` decorators in a `ContactDto`. Return 400 with validation errors if invalid.

### Behaviour
1. Validate the request body
2. Send email to `hello@getclearwork.in` via nodemailer using the existing SMTP config (`smtpout.secureserver.net`)
3. Return `{ success: true }` on success
4. Return 500 on nodemailer failure (frontend shows error banner)

### Email format (to hello@getclearwork.in)
- Subject: `[ClearWork Contact] [Category] — [Name]`
- Body: plain text with Name, Email, Category, Message fields clearly labelled
- Reply-To: the submitter's email address

### Rate limiting
Apply the existing NestJS throttler guard (if configured) to prevent abuse. If not yet configured, add a note to do so later.

---

## Frontend Integration

### API call
`POST https://api.getclearwork.in/contact` (production) / `http://localhost:3000/contact` (dev)  
Use the existing axios instance or fetch. No auth headers needed.

### Form state machine
```
idle → submitting → success
                 ↘ error (stays on form, shows banner, re-enables submit)
```

---

## Files Changed

### pakka-landing
- `src/pages/About.tsx` — full rewrite
- `src/pages/Contact.tsx` — full rewrite (add real form, replace mailto links)

### pakka-api
- `src/modules/contact/contact.controller.ts` — new file
- `src/modules/contact/contact.service.ts` — new file
- `src/modules/contact/contact.dto.ts` — new file
- `src/modules/contact/contact.module.ts` — new file
- `src/app.module.ts` — import ContactModule

---

## Out of Scope
- File attachments in the contact form
- Auto-reply email to the submitter
- CRM integration (HubSpot, Pipedrive)
- Live chat widget
- Team member bios on About page
- Investor/press kit section

---

## Definition of Done
- [ ] `/about` renders all 6 sections with correct design system styles
- [ ] `/contact` form submits successfully in both sandbox and production API
- [ ] Form shows inline validation errors on blur
- [ ] Success state replaces form on 200 response
- [ ] Error banner shown on network/server failure
- [ ] Both pages prerender correctly (added to `prerender.mjs` — already done)
- [ ] Both pages in `sitemap.xml` — already done
- [ ] `npm run build` passes with 0 errors
