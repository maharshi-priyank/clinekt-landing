import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from './ui/FadeIn'
import { UserSearch, FileText, PenLine, Receipt, Globe, TrendingUp } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const steps = [
  {
    id: 'leads',
    n: '01',
    icon: UserSearch,
    color: 'indigo',
    title: 'Capture every lead',
    pill: 'Lead CRM',
    desc: 'Add leads from Instagram, LinkedIn, WhatsApp or referrals. See pipeline value, follow-up dates, and win rate at a glance — all on your dashboard.',
    screenshot: '/screenshots/screenshot-dashboard.png',
    caption: 'Lead Pipeline & Dashboard overview',
    callout: 'Lead Pipeline and Quick Actions visible below',
  },
  {
    id: 'proposals',
    n: '02',
    icon: FileText,
    color: 'indigo',
    title: 'Send a tracked proposal',
    pill: 'Proposals',
    desc: 'Build a branded proposal with scope, pricing, and timeline. Share as a tracked link — you get a push notification the second they open it.',
    screenshot: '/screenshots/screenshot-proposal.png',
    caption: 'Proposal builder — Cover, Pricing, Timeline tabs',
    callout: 'Tabs at top switch between proposal sections',
  },
  {
    id: 'contracts',
    n: '03',
    icon: PenLine,
    color: 'indigo',
    title: 'E-sign the contract',
    pill: 'E-sign',
    desc: 'One click converts your proposal into a contract. Client signs via OTP — legally valid under IT Act 2000. No DocuSign, no printing.',
    screenshot: '/screenshots/screenshot-portal.png',
    caption: 'Client Portal — Contract signed status',
    callout: '"Signed" badge confirms legal e-signature via OTP',
  },
  {
    id: 'invoices',
    n: '04',
    icon: Receipt,
    color: 'emerald',
    title: 'Send a GST invoice',
    pill: 'GST Invoice',
    desc: 'Auto-filled from your contract. CGST/SGST/IGST calculated by client state. Razorpay payment link embedded — client pays in one tap.',
    screenshot: '/screenshots/screenshot-invoice.png',
    caption: 'Invoice list — status, amounts, due dates',
    callout: 'Status badges: Draft, Sent, Overdue, Paid — all in one view',
  },
  {
    id: 'portal',
    n: '05',
    icon: Globe,
    color: 'indigo',
    title: 'Client gets their portal',
    pill: 'Client Portal',
    desc: 'Every client gets a branded portal with all their proposals, contracts, and invoices in one link. Pay directly from the portal.',
    screenshot: '/screenshots/screenshot-portal.png',
    caption: 'Client Portal — Prashant\'s view',
    callout: 'Client sees proposals, contracts, invoices — and can pay inline',
  },
  {
    id: 'automate',
    n: '06',
    icon: TrendingUp,
    color: 'emerald',
    title: 'Automate follow-ups',
    pill: 'Automations',
    desc: 'Set up WhatsApp + email reminders for overdue invoices, auto-send onboarding forms after signing, and more — all in a visual builder.',
    screenshot: '/screenshots/screenshot-automation.png',
    caption: 'Automation builder — Lead Follow-up flow',
    callout: 'Visual drag-and-drop flow: trigger → condition → action',
  },
]

const colorMap: Record<string, { dot: string; pill: string; number: string; border: string; iconBg: string; iconText: string }> = {
  indigo:  { dot: 'bg-indigo-500',  pill: 'bg-indigo-50 text-indigo-700 border-indigo-100',  number: 'text-indigo-400', border: 'border-indigo-400', iconBg: 'bg-indigo-100',  iconText: 'text-indigo-600'  },
  emerald: { dot: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-700 border-emerald-100', number: 'text-emerald-400', border: 'border-emerald-400', iconBg: 'bg-emerald-100', iconText: 'text-emerald-600' },
}

export default function HowItWorks() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  // Pause scroll-spy briefly after manual prev/next clicks so spy doesn't fight them
  const pauseSpyUntil = useRef<number>(0)

  const updateActive = useCallback(() => {
    if (Date.now() < pauseSpyUntil.current) return
    const viewportCenter = window.scrollY + window.innerHeight * 0.5
    let closestIdx = 0
    let closestDist = Infinity
    stepRefs.current.forEach((el, i) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const elCenter = window.scrollY + rect.top + rect.height / 2
      const dist = Math.abs(elCenter - viewportCenter)
      if (dist < closestDist) { closestDist = dist; closestIdx = i }
    })
    setActive(closestIdx)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateActive)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updateActive])

  // Click on a left-side step card — scroll page to that step
  function scrollToStep(i: number) {
    stepRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  // Prev/Next buttons — just swap screenshot, no page scroll
  function goToStep(i: number) {
    pauseSpyUntil.current = Date.now() + 1200
    setActive(i)
  }

  const s = steps[active]
  const c = colorMap[s.color]

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
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

        {/* Scroll-spy layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-start">

          {/* ── Left: step list (scrollable) ── */}
          <div className="space-y-3">
            {steps.map((step, i) => {
              const sc = colorMap[step.color]
              const isActive = active === i
              return (
                <div
                  key={step.id}
                  ref={el => { stepRefs.current[i] = el }}
                  onClick={() => scrollToStep(i)}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                    isActive
                      ? `bg-white border-gray-200 shadow-lg border-l-[3px] ${sc.border}`
                      : 'bg-gray-50/50 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      isActive ? sc.iconBg : 'bg-gray-100'
                    }`}>
                      <step.icon size={18} className={isActive ? sc.iconText : 'text-gray-400'} />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Number + title + pill */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold tabular-nums ${isActive ? sc.number : 'text-gray-300'}`}>{step.n}</span>
                        <span className={`text-sm font-bold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{step.title}</span>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sc.pill}`}
                          >
                            {step.pill}
                          </motion.span>
                        )}
                      </div>

                      {/* Description — only when active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease }}
                            className="text-sm text-gray-500 mt-2 leading-relaxed overflow-hidden"
                          >
                            {step.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Active indicator dot */}
                    <div className={`w-2 h-2 rounded-full shrink-0 mt-1 transition-all ${isActive ? sc.dot : 'bg-gray-200'}`} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── Right: sticky screenshot ── */}
          <div className="hidden lg:block sticky top-24">
            {/* Step progress indicator */}
            <div className="flex items-center gap-1.5 mb-4">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToStep(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    active === i ? `${colorMap[steps[i].color].dot} w-6` : 'bg-gray-200 w-2'
                  }`}
                />
              ))}
              <span className="ml-2 text-xs text-gray-400 font-medium">{active + 1} / {steps.length}</span>
            </div>

            {/* Browser frame */}
            <div className="rounded-2xl border border-gray-200 shadow-2xl shadow-gray-200/60 overflow-hidden bg-white">
              {/* Chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50/90 border-b border-gray-100">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="max-w-52 mx-auto h-5 bg-white rounded border border-gray-200 flex items-center justify-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] text-gray-400">app.clearwork.in</span>
                  </div>
                </div>
              </div>

              {/* Screenshot with crossfade */}
              <div className="relative overflow-hidden bg-gray-50" style={{ minHeight: 340 }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active}
                    src={s.screenshot}
                    alt={s.caption}
                    className="w-full block"
                    initial={{ opacity: 0, y: 20, scale: 1.025 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.975 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </AnimatePresence>

                {/* Gradient fade at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
              </div>

              {/* Caption bar */}
              <div className="px-4 py-3 bg-gray-50/80 border-t border-gray-100 flex items-start gap-2.5 min-h-[52px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.45, ease }}
                    className="flex items-start gap-2.5 w-full"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${c.dot}`} />
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{s.caption}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{s.callout}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Nav arrows */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => goToStep(Math.max(0, active - 1))}
                disabled={active === 0}
                className="text-xs font-semibold text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
              >
                ← Previous
              </button>
              <button
                onClick={() => goToStep(Math.min(steps.length - 1, active + 1))}
                disabled={active === steps.length - 1}
                className="text-xs font-semibold text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Mobile: show screenshot inline below each active step */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease }}
                className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
              >
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border-b border-gray-100">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                    <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2 h-2 rounded-full bg-[#28CA41]" />
                  </div>
                </div>
                <img src={s.screenshot} alt={s.caption} className="w-full block" />
                <div className="px-3 py-2.5 bg-gray-50 border-t border-gray-100">
                  <p className="text-[11px] font-semibold text-gray-600">{s.caption}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
