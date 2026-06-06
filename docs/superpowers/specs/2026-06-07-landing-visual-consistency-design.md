# Landing Page Visual Consistency — Design Spec

## Context

The hero section has a strong visual identity: warm atmospheric gradient (`#bdd8e6 → #e8dfd0`), SVG noise grain, glass-morphism pills, and Framer Motion stagger with `ease [0.22, 1, 0.36, 1]`. Below the fold, sections abruptly switch to flat `bg-white` or cool gray (`#F9FAFB`), breaking the atmosphere. `FadeIn` is copy-pasted across multiple files with slightly inconsistent parameters. The goal is to make the full page feel like one cohesive piece.

## Decisions

- **Color**: warm gradient flows seamlessly from hero through TrustStrip → HubSpoke → FeaturePillars, then fades to neutral white for the middle sections, then the WaitlistSection brings the gradient back as a closing bookend.
- **Motion**: HubSpokeSection's scroll-driven sticky effect is untouched. All other sections use a shared `FadeIn` component with identical easing.
- **HowItWorks, FeaturesSection, PricingSection, FounderNote**: keep `bg-white` / `bg-[#F8F9FC]` — they sit in the neutral zone intentionally.

---

## 1. Shared `FadeIn` component

**File to create:** `src/components/ui/FadeIn.tsx`

```tsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
```

**Replace inline `FadeIn` definitions in:**
- `src/components/FeaturesSection.tsx` — remove local `FadeIn` definition, add `import { FadeIn } from './ui/FadeIn'`
- `src/components/FeaturePillars.tsx` — same
- `src/components/HowItWorks.tsx` — add `import { FadeIn } from './ui/FadeIn'`; replace the section header `<motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} ...>` wrapper with `<FadeIn className="text-center mb-20">`

---

## 2. Warm color progression

The hero's gradient ends at `#e8dfd0`. The next three sections continue that warmth:

| Section | Background value | Change |
|---|---|---|
| TrustStrip | `#ede8dc` | `bg-white` → `bg-[#ede8dc]` |
| HubSpokeSection | `#f0ebe1` | `background: '#F9FAFB'` → `background: '#f0ebe1'` |
| FeaturePillars | `#f5f1ea` | `bg-white` → `bg-[#f5f1ea]` |

Sections from HowItWorks onward stay `bg-white` / `bg-[#F8F9FC]` — no changes there.

---

## 3. TrustStrip

**File:** `src/components/TrustStrip.tsx`

Changes:
1. Section: `bg-white border-y border-gray-100 py-10` → `bg-[#ede8dc] py-10 px-5 relative overflow-hidden`
2. Add noise overlay (identical to Hero):
   ```tsx
   <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
     style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
   ```
3. Badge pills: `bg-white border border-gray-100 shadow-sm` → `bg-white/65 backdrop-blur-sm border border-white/80 shadow-sm`
4. Section label: stays the same text, just inherits the new bg

---

## 4. HubSpokeSection

**File:** `src/components/HubSpokeSection.tsx`

**One change only** — the sticky inner div background:
```tsx
// Before
<div style={{ position: 'absolute', inset: 0, background: '#F9FAFB' }} />
// After
<div style={{ position: 'absolute', inset: 0, background: '#f0ebe1' }} />
```

All scroll logic, icon positions, spoke lines, campaign headline, and scroll hint — **unchanged**.

---

## 5. FeaturePillars

**File:** `src/components/FeaturePillars.tsx`

Changes:
1. Section: `bg-white` → `bg-[#f5f1ea]`
2. Remove local `FadeIn` definition, import from `../components/ui/FadeIn`

---

## 6. HowItWorks

**File:** `src/components/HowItWorks.tsx`

Changes:
1. Import `FadeIn` from `../components/ui/FadeIn`
2. Replace the section header `<motion.div whileInView ...>` block with `<FadeIn className="text-center mb-20">`. The children (badge span + h2 + p) are unchanged.
3. Section `bg-white` — no change (neutral zone).

---

## 7. WaitlistSection — warm bookend

**File:** `src/components/WaitlistSection.tsx`

Changes:
1. Section: `bg-white relative overflow-hidden` →
   ```tsx
   <section
     id="waitlist"
     className="py-24 relative overflow-hidden"
     style={{ background: 'linear-gradient(180deg, #e8dfd0 0%, #dccdb8 40%, #cdd4c4 75%, #bdd8e6 100%)' }}
     ref={ref}
   >
   ```
2. Add noise overlay (same SVG as Hero and TrustStrip) as first child inside section.
3. Remove the `<div className="absolute -top-32 ... bg-indigo-100/50 rounded-full blur-3xl ...">` blob — not needed.
4. Email input: `bg-white border-gray-200` → `bg-white/70 backdrop-blur-sm border border-white/80`
5. Founding-member amber banner: `bg-amber-50 border-amber-200` → `bg-white/55 backdrop-blur-sm border border-white/70` — amber text colors unchanged
6. Stats row: `border-t border-gray-100` → `border-t border-white/40`
7. Submit button: keep `bg-gray-950 text-white hover:bg-gray-800` — dark button on warm gradient is intentional contrast.
8. Waitlist badge (`bg-white border border-gray-200`) → `bg-white/60 backdrop-blur-sm border border-white/80`

---

## Sections with no changes

- `HowItWorks` bg: stays `bg-white`
- `FeaturesSection`: stays `bg-[#F8F9FC]`
- `PricingSection`: stays `bg-white`
- `FounderNote`: stays `bg-white`
- `Navbar`, `Footer`, tool pages: untouched

---

## Verification

1. Run `npm run dev` in pakka-landing
2. Hero gradient flows seamlessly into TrustStrip — no visible seam or border
3. Scroll through HubSpokeSection — bg is warm, all scroll-driven effects still work
4. FeaturePillars is on warm cream, device toggle works
5. HowItWorks section header fades in with same motion as other sections
6. WaitlistSection opens with warm sand and ends with sky-blue matching the top of the hero
7. `npx tsc --noEmit` — zero errors
