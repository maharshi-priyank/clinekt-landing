# Landing Visual Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every landing page section below the hero feel visually consistent — warm gradient flows from hero through TrustStrip → HubSpoke → FeaturePillars, motion is unified via a shared FadeIn component, and WaitlistSection mirrors the hero gradient as a closing bookend.

**Architecture:** Extract a shared `FadeIn` component to eliminate copy-paste, apply a warm color progression to the first three below-fold sections, and restyle WaitlistSection with the reversed hero gradient. HubSpokeSection's scroll-driven sticky logic is untouched — only its background changes. No new dependencies.

**Tech Stack:** React 18, Framer Motion v12, Tailwind CSS v3, TypeScript

---

## File map

| File | Action |
|---|---|
| `src/components/ui/FadeIn.tsx` | **Create** — shared animated wrapper |
| `src/components/FeaturesSection.tsx` | **Modify** — remove inline FadeIn, import shared one, clean unused imports |
| `src/components/TrustStrip.tsx` | **Modify** — warm bg, noise overlay, glass pills |
| `src/components/HubSpokeSection.tsx` | **Modify** — one bg color line |
| `src/components/FeaturePillars.tsx` | **Modify** — warm bg, remove inline FadeIn, import shared one |
| `src/components/HowItWorks.tsx` | **Modify** — replace whileInView header block with FadeIn |
| `src/components/WaitlistSection.tsx` | **Modify** — gradient bookend, noise overlay, glass input/banner |

---

## Task 1: Create shared FadeIn component

**Files:**
- Create: `src/components/ui/FadeIn.tsx`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p /Users/mvaghela/Documents/MyProjects/pakka-landing/src/components/ui
```

- [ ] **Step 2: Write `src/components/ui/FadeIn.tsx`**

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

- [ ] **Step 3: Verify TypeScript is happy**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-landing && npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-landing
git add src/components/ui/FadeIn.tsx
git commit -m "feat: extract shared FadeIn component"
```

---

## Task 2: Update FeaturesSection — swap to shared FadeIn

**Files:**
- Modify: `src/components/FeaturesSection.tsx`

The file currently defines `FadeIn` locally at lines 9–22 and imports `useRef` from react + `useInView` from framer-motion solely for that local definition.

- [ ] **Step 1: Replace the top of `src/components/FeaturesSection.tsx`**

Replace lines 1–22 (the imports + local FadeIn definition + `ease` constant) with:

```tsx
import {
  Calculator, IndianRupee, Bell, MessageSquare, Shield, Landmark, Zap, Users, FolderKanban,
} from 'lucide-react'
import { FadeIn } from './ui/FadeIn'
```

Removed entirely: `import { useRef } from 'react'`, `import { motion, useInView } from 'framer-motion'`, the local `FadeIn` function, and the `const ease` line. None of them are used anywhere else in FeaturesSection — the bento card hover is pure Tailwind CSS transitions (`hover:-translate-y-0.5 transition-all`), not Framer Motion.

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-landing && npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/FeaturesSection.tsx
git commit -m "refactor: FeaturesSection uses shared FadeIn"
```

---

## Task 3: Update TrustStrip — warm bg + glass pills

**Files:**
- Modify: `src/components/TrustStrip.tsx`

Current section: `bg-white border-y border-gray-100 py-10 px-5`
Current badge pills: `bg-white border border-gray-100 shadow-sm`

- [ ] **Step 1: Replace the full contents of `src/components/TrustStrip.tsx`**

```tsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, FileCheck, Lock, BadgeCheck, IndianRupee, Landmark } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const NOISE = "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"

const badges = [
  { icon: IndianRupee, label: 'Razorpay payments', sub: 'UPI · Cards · Net banking', color: 'text-blue-600', bg: 'bg-blue-50/80' },
  { icon: FileCheck,   label: 'GST e-invoice ready', sub: 'IRN & QR code spec', color: 'text-emerald-600', bg: 'bg-emerald-50/80' },
  { icon: BadgeCheck,  label: 'IT Act 2000 e-sign', sub: 'Legally valid in India', color: 'text-indigo-600', bg: 'bg-indigo-50/80' },
  { icon: Lock,        label: 'AES-256 encrypted', sub: 'Bank-grade data security', color: 'text-gray-700', bg: 'bg-gray-100/80' },
  { icon: Landmark,    label: 'Hosted in India', sub: 'Data stays on Indian servers', color: 'text-orange-600', bg: 'bg-orange-50/80' },
  { icon: ShieldCheck, label: '30-day refund', sub: 'No questions asked', color: 'text-rose-600', bg: 'bg-rose-50/80' },
]

export default function TrustStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} className="py-10 px-5 relative overflow-hidden" style={{ background: '#ede8dc' }}>
      {/* Noise texture — matches Hero */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("${NOISE}")` }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center text-xs font-semibold text-gray-500 uppercase tracking-widest mb-7"
        >
          Built for India. Serious about trust.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-3">
          {badges.map(({ icon: Icon, label, sub, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06, ease }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/80 shadow-sm"
              style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(8px)' }}
            >
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={14} className={color} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900 leading-snug">{label}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-landing && npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/TrustStrip.tsx
git commit -m "feat: TrustStrip warm bg + glass pills"
```

---

## Task 4: Update HubSpokeSection — warm background

**Files:**
- Modify: `src/components/HubSpokeSection.tsx`

One line change only. The background of the sticky inner div is set via an inline style.

- [ ] **Step 1: Find the background div**

In `src/components/HubSpokeSection.tsx`, locate this line (it's the first `<div>` inside the sticky ref div, around line 102):

```tsx
<div style={{ position: 'absolute', inset: 0, background: '#F9FAFB' }} />
```

- [ ] **Step 2: Change the background color**

```tsx
<div style={{ position: 'absolute', inset: 0, background: '#f0ebe1' }} />
```

Do not touch any other line in this file.

- [ ] **Step 3: Verify TypeScript**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-landing && npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/HubSpokeSection.tsx
git commit -m "feat: HubSpokeSection warm background"
```

---

## Task 5: Update FeaturePillars — warm bg + shared FadeIn

**Files:**
- Modify: `src/components/FeaturePillars.tsx`

Two changes: section background and FadeIn import swap.

- [ ] **Step 1: Remove the local FadeIn definition**

In `src/components/FeaturePillars.tsx`, delete lines 11–22 (the local `function FadeIn` block):

```tsx
// DELETE this entire block:
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease }}>
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Update the import at the top of the file**

The existing import line 1 is:
```tsx
import { useState, useRef } from 'react'
```

`useRef` was only used in the local FadeIn. Check if it's used anywhere else in the file. If it isn't (search for other `useRef` usages), remove it:
```tsx
import { useState } from 'react'
```

Add the shared FadeIn import after the framer-motion import line:
```tsx
import { FadeIn } from './ui/FadeIn'
```

Similarly, `useInView` on the framer-motion import line was only used by the local FadeIn — remove it if unused elsewhere:
```tsx
import { motion, AnimatePresence } from 'framer-motion'
```

- [ ] **Step 3: Change the section background**

Find the section opening tag:
```tsx
<section id="features-pillars" className="py-24 bg-white">
```

Change to:
```tsx
<section id="features-pillars" className="py-24" style={{ background: '#f5f1ea' }}>
```

- [ ] **Step 4: Verify TypeScript**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-landing && npx tsc --noEmit
```

Expected: zero errors. If there are "declared but not used" errors, remove the corresponding import.

- [ ] **Step 5: Commit**

```bash
git add src/components/FeaturePillars.tsx
git commit -m "feat: FeaturePillars warm bg + shared FadeIn"
```

---

## Task 6: Update HowItWorks — shared FadeIn for section header

**Files:**
- Modify: `src/components/HowItWorks.tsx`

The section header (badge + h2 + p) is currently wrapped in an inline `<motion.div whileInView ...>`. Replace it with the shared `FadeIn`.

- [ ] **Step 1: Add FadeIn import**

At the top of `src/components/HowItWorks.tsx`, the existing framer-motion import is:
```tsx
import { motion, AnimatePresence } from 'framer-motion'
```

Add below it:
```tsx
import { FadeIn } from './ui/FadeIn'
```

- [ ] **Step 2: Replace the section header motion wrapper**

Find (around line 141–158):
```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.6, ease }}
  className="text-center mb-20"
>
  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
    The workflow
  </span>
  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
    Lead to payment.{' '}
    <span className="gradient-text">In one tool.</span>
  </h2>
  <p className="text-gray-500 text-lg mt-4 max-w-lg mx-auto">
    Scroll through each step to see exactly what ClearWork looks like in action.
  </p>
</motion.div>
```

Replace with:
```tsx
<FadeIn className="text-center mb-20">
  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
    The workflow
  </span>
  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
    Lead to payment.{' '}
    <span className="gradient-text">In one tool.</span>
  </h2>
  <p className="text-gray-500 text-lg mt-4 max-w-lg mx-auto">
    Scroll through each step to see exactly what ClearWork looks like in action.
  </p>
</FadeIn>
```

- [ ] **Step 3: Verify TypeScript**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-landing && npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/HowItWorks.tsx
git commit -m "refactor: HowItWorks uses shared FadeIn"
```

---

## Task 7: Update WaitlistSection — warm gradient bookend

**Files:**
- Modify: `src/components/WaitlistSection.tsx`

Changes: reversed hero gradient background, noise overlay, remove indigo blob, glass input + founding-member banner, glass badge, lighter stats border.

- [ ] **Step 1: Replace the full contents of `src/components/WaitlistSection.tsx`**

```tsx
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import { submitWaitlist } from '../lib/waitlist'
import { useWaitlistCount } from '../hooks/useWaitlistCount'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const NOISE = "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"

const perks = [
  'Free plan forever',
  'Early bird ₹299/mo — locked for life',
  'Vote on features we build next',
  'No credit card required',
]

const FOUNDING_CAP = 100

export default function WaitlistSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const count = useWaitlistCount()

  const spotsLeft = count !== null ? Math.max(0, FOUNDING_CAP - count) : null
  const foundingFull = spotsLeft !== null && spotsLeft <= 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')
    try {
      await submitWaitlist(email)
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="waitlist"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #e8dfd0 0%, #dccdb8 40%, #cdd4c4 75%, #bdd8e6 100%)' }}
      ref={ref}
    >
      {/* Noise texture — matches Hero */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("${NOISE}")` }}
      />

      <div className="max-w-3xl mx-auto px-5 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
        >
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600 shadow-sm mb-6 border border-white/80"
            style={{ background: 'rgba(255,255,255,0.60)', backdropFilter: 'blur(8px)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Now accepting early access signups
          </span>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-950 leading-tight tracking-tight mb-5">
            Stop juggling tools.{' '}
            <br className="hidden sm:block" />
            <span className="gradient-text">Start getting paid.</span>
          </h2>

          {/* Founding member urgency banner */}
          {!foundingFull && (
            <div
              className="inline-flex items-center gap-2.5 rounded-xl px-4 py-3 mb-8 border border-white/70"
              style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(8px)' }}
            >
              <Zap size={15} className="text-amber-500 shrink-0" />
              <p className="text-sm text-amber-800 font-medium text-left">
                <strong>Founding member offer:</strong> First {FOUNDING_CAP} signups lock ₹299/mo for life
                {spotsLeft !== null && spotsLeft > 0 && (
                  <span className="ml-1 font-bold text-amber-900">— {spotsLeft} spot{spotsLeft === 1 ? '' : 's'} left</span>
                )}
              </p>
            </div>
          )}

          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            {count !== null
              ? <><strong className="text-gray-900">{count.toLocaleString('en-IN')}</strong> Indian freelancers already on the waitlist. Early bird pricing at ₹299/mo — locked for life.</>
              : <>Join Indian freelancers on the waitlist. Early bird pricing at ₹299/mo — locked for life.</>
            }
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              className="py-10 flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100">
                <CheckCircle2 size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">You're on the list!</h3>
              <p className="text-gray-600">
                We'll reach out at <strong className="text-gray-900">{email}</strong> when it's your turn.
              </p>
              <p className="text-sm text-gray-500">
                Meanwhile, tell a fellow freelancer — they'll thank you for it.
              </p>
            </motion.div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required
                  className="flex-1 px-5 py-4 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent shadow-sm text-sm border border-white/80"
                  style={{ background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(8px)' }}
                />
                <button type="submit" disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 disabled:opacity-60 transition-all flex-shrink-0 shadow-sm">
                  {loading
                    ? <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    : <><span>Get early access</span><ArrowRight size={16} /></>
                  }
                </button>
              </form>
              {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
            </>
          )}

          {/* Perks */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6">
            {perks.map(p => (
              <span key={p} className="flex items-center gap-1.5 text-sm text-gray-600">
                <CheckCircle2 size={13} className="text-emerald-600" strokeWidth={2.5} />
                {p}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 mt-14 pt-10 border-t border-white/40">
            {[
              { val: count !== null ? count.toLocaleString('en-IN') : '—', label: 'on the waitlist' },
              { val: '₹299/mo', label: 'early bird price' },
              { val: '₹699/mo', label: 'launch price' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{s.val}</div>
                <div className="text-xs text-gray-600 mt-0.5 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-landing && npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/WaitlistSection.tsx
git commit -m "feat: WaitlistSection warm gradient bookend"
```

---

## Final verification

- [ ] **Start dev server**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-landing && npm run dev
```

Open `http://localhost:5173` and check:

1. Hero gradient flows seamlessly into TrustStrip — no visible seam or border line
2. Badge pills in TrustStrip have frosted glass appearance
3. Scroll into HubSpokeSection — background is warm (not cool gray), all scroll-driven icon animations still work, "Say hi to ClearWork" campaign still appears
4. FeaturePillars section has warm cream background, device toggle (Desktop/Mobile) still works
5. HowItWorks section header fades in on scroll (same motion feel as other sections)
6. WaitlistSection opens warm sand at top and fades to sky blue at bottom, matching the hero's palette in reverse
7. Email input and founding-member banner in WaitlistSection have frosted glass look
8. `npx tsc --noEmit` — zero errors

- [ ] **Push**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-landing && git push
```
