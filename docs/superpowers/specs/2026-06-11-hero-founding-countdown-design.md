# Hero Founding Countdown Design

## Goal

Replace the waitlist signup count in the Hero with a live founding pricing countdown, since the product is live and user/waitlist numbers are too small to show as social proof.

## Context

- Product is live at app.getclearwork.in/register
- Founding pricing: ₹149/mo Solo, ₹349/mo Studio — ends Aug 31, 2026
- Regular pricing after deadline: ₹299/mo Solo, ₹699/mo Studio
- Current hero shows `waitlistCount` (1 person) — negative social proof at this stage
- Founding deadline is a real, time-bound urgency lever

## What Changes

**File:** `src/components/Hero.tsx`

Replace the `waitlistCount` render block (the `<motion.div>` containing the `Users` icon and "X freelancers on the waitlist" text) with a founding pricing countdown row.

## Countdown Component Design

Inline row, same visual weight as the removed waitlist count. Positioned between the trust micro-badges and the app screenshot.

**Layout:**
```
[Clock icon]  Founding price ends in  81d  ·  ₹149 → ₹299/mo after Aug 31
```

**Behaviour:**
- Deadline constant: `2026-08-31T23:59:59+05:30` (IST)
- Countdown state updated every 60 seconds via `setInterval`
- Display format:
  - More than 7 days remaining: `Xd` (e.g. `81d`)
  - 7 days or fewer: `Xd Xh Xm` (e.g. `6d 14h 32m`) for final urgency
  - After deadline: row hidden entirely
- Clicking the row scrolls to `#pricing`

**Visual:**
- `Clock` icon from lucide-react, `text-amber-500`
- Countdown digits: `font-bold text-gray-800`
- Price jump `₹149 → ₹299/mo`: `text-gray-500 text-sm`
- Wraps in a `cursor-pointer` anchor pointing to `#pricing`

## What Does NOT Change

- `useWaitlistCount` hook and `fetchWaitlistCount` — left in place
- `WaitlistSection` component — untouched
- Amber founding badge inside `PricingSection` — untouched
- Hero badge ("Now accepting early access signups") — untouched
- All CTAs and pricing logic — untouched

## Acceptance Criteria

1. Hero shows countdown row instead of waitlist count
2. Countdown displays days-only when > 7 days from deadline
3. Countdown switches to `Xd Xh Xm` format in final 7 days
4. Row disappears after Aug 31, 2026 23:59:59 IST
5. Clicking row scrolls to `#pricing`
6. No TypeScript errors
