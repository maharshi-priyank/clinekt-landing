# Revert Checklist — When Free Early Access Ends

When we re-introduce paid plans, undo everything in this list.

---

## pakka-landing

### Navbar.tsx
- Add `Pricing` back to `links` array:
  ```ts
  { label: 'Pricing', anchor: 'pricing', href: null },
  ```

### Home.tsx
- Replace `EarlyAccessSection` import/usage with `PricingSection`:
  ```tsx
  import PricingSection from '../components/PricingSection'
  // ...
  <PricingSection />
  ```
- Revert meta title/description to the original non-"free" copy.
- Remove or update the `HOME_SCHEMA` `offers` price from `'0'` to actual pricing.

### Hero.tsx
- Restore founding countdown (or replace with a new urgency signal):
  - Re-add `useEffect`/`useState` for `useFoundingCountdown`
  - Re-add `Clock` import
  - Restore the countdown `<motion.div>` block below the trust row
- Update badge text from `"Free during Early Access · No credit card needed"` back to original or new copy.
- Update trust micro-row: replace `"Completely free right now"` with `"Free forever plan"` (or new tier copy).
- The hero CTA button was re-enabled — keep it, just update copy if needed.

### WaitlistSection.tsx
- Restore `perks` array to paid plan messaging.
- Restore urgency banner to amber/founding-price theme.
- Restore bottom stats: `₹149/mo` founding price, `₹299/mo` after deadline.
- Restore body copy referencing founding pricing.

### EarlyAccessSection.tsx
- This component was created for the free period — **delete it** once paid plans are live.
- Replace with `PricingSection` in `Home.tsx` (see above).

### public/llms.txt
- Revert `## Pricing` block to:
  ```
  ## Pricing
  - Free forever plan (no credit card)
  - Solo plan: ₹149/month (founding price, locked for early users)
  - Studio plan: ₹349/month (founding price, locked for early users)
  - No transaction fees on payments
  ```

---

## pakka-app

### SettingsPage.tsx
- Add `billing` tab back to `TAB_DEFS`:
  ```ts
  import { User, Building2, Bell, Puzzle, Globe, CreditCard, Users } from 'lucide-react'
  import BillingTab from '@/features/billing/components/BillingTab'
  // ...
  { key: 'billing' as const, label: 'Billing', icon: CreditCard, permission: Permission.MANAGE_BILLING },
  ```
- Add back the render line:
  ```tsx
  {activeTab === 'billing' && <BillingTab />}
  ```

### TeamTab.tsx
- Re-add Studio plan gate so non-Studio users see the upgrade prompt:
  ```tsx
  import { Users } from 'lucide-react'
  import { useSubscriptionStatus } from '@/features/billing/hooks/useSubscription'
  // ...
  const { data: subscription } = useSubscriptionStatus()
  const isStudio = subscription?.plan === 'STUDIO'
  // ...
  if (!isStudio) {
    return (/* upgrade prompt JSX */)
  }
  ```

---

## pakka-api

### users.service.ts
- Remove `plan: 'STUDIO', subscriptionStatus: 'ACTIVE'` from the `create` block in `upsert()`.
- New users should default to `FREE` / `NONE` (Prisma defaults) once paid plans are active.

---

## When to do this
- Before re-enabling Cashfree or Razorpay subscription payments in production.
- After deciding on final public pricing and launch date.
- Run `npm run build` in `pakka-landing` and `tsc --noEmit` in both `pakka-app` and `pakka-api` after reverting.
