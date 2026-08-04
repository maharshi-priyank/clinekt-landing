---
title: Trustpilot Review Collection & Display
status: ready-for-planning
date: 2026-08-05
---

# Trustpilot Review Collection & Display

## Problem

ClearWork has no social proof on the landing page beyond generic trust icons. Prospective users have no way to read peer reviews before signing up, and there is no automated mechanism to collect reviews from users after they join.

## Actors

- **A1 Visitor** — lands on the ClearWork landing page, evaluating whether to join
- **A2 Waitlist signup** — submits the waitlist form; receives a Trustpilot review invitation email

## Key Flows

**F1 — Review invitation after waitlist signup**
After a visitor submits the waitlist form (`WaitlistSection`) and the `submitWaitlist(email)` call succeeds, the system fires a Trustpilot invitation so the user receives an automated review request email.

**F2 — Rating badge in TrustStrip**
A compact Trustpilot star-rating micro-widget renders inline within the existing `TrustStrip` component, alongside the current trust icons. Visible above the fold on all viewports.

**F3 — Full review widget near CTA**
A dedicated landing page section renders between `FounderNote` and `WaitlistSection`. It displays the Trustpilot `starter` widget (designed to look credible with zero reviews, populates as reviews come in).

## Requirements

**R1** The Trustpilot invitation API script (`invitejs.trustpilot.com/tp.min.js`) must be loaded asynchronously in `<head>` of `index.html`, registered with business key `rM3xtn4vbvFIHsrX`.

**R2** The Trustpilot TrustBox widget bootstrap script (`widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js`) must be loaded asynchronously in `<head>` of `index.html`, alongside R1.

**R3** On successful waitlist form submit in `WaitlistSection.tsx`, fire `tp('invitation', { recipientEmail, referenceId })` using the submitted email as `recipientEmail`. `referenceId` should be a deterministic identifier (e.g., the email itself or a timestamp-based ID).

**R4** The invitation call (R3) must only fire after `submitWaitlist` resolves successfully — never on validation error or network failure.

**R5** `TrustStrip.tsx` must render a Trustpilot `microStar` TrustBox widget (a compact inline badge: stars + review count) using the correct `data-businessunit-id`. The badge must not break the existing TrustStrip layout on mobile.

**R6** A new `TrustpilotSection` component must render between `FounderNote` and `WaitlistSection` in `App.tsx` (or the home route). It uses the Trustpilot `starter` TrustBox widget, which renders a minimal but credible widget with zero reviews and fills in as reviews accumulate.

**R7** Both TrustBox widgets must use `data-theme="light"` to match the landing page colour scheme.

**R8** Neither script injection nor widget rendering should block the page's critical rendering path — both scripts must be `async`.

## Success Criteria

- Trustpilot review invitation email is sent to every user who submits the waitlist form
- A star-rating badge is visible in the TrustStrip on all viewports
- A full review widget section is visible above the waitlist form
- Both widgets handle the zero-reviews state without showing an error or empty broken UI
- No CLS (layout shift) introduced by either widget loading

## Scope Boundaries

**In scope:** Script injection, invitation trigger on waitlist submit, `microStar` badge in TrustStrip, `starter` widget section near CTA.

**Deferred:** Invitation trigger on first paid invoice (the event fires in `pakka-api`, not the landing page — requires a separate integration pass). Review carousel once review volume grows (swap widget template, no new infrastructure needed).

**Out of scope:** Custom review display built from the Trustpilot API (requires paid plan). Inline review quotes hard-coded as fallback.

## Dependencies / Assumptions

- Trustpilot business account is live and the integration key `rM3xtn4vbvFIHsrX` is valid
- The `businessunit-id` (the Trustpilot numeric business ID) must be looked up from the Trustpilot Business dashboard before implementation — it is distinct from the integration key
- Domain must be verified in Trustpilot Business (Step 2 of the JS integration setup shown in the screenshot) before the widget renders properly in production
