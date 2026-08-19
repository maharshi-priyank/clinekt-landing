import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    tag: 'Lead Pipeline',
    headline: 'A new enquiry lands.\nYou\'re already on it.',
    body: 'Client reaches out on Instagram, WhatsApp, or email. Log them as a lead in seconds and see every open deal on a kanban board — no spreadsheet, no sticky note.',
    img: '/screenshots/screenshot-dashboard.png',
    alt: 'Lead pipeline view in ClearWork',
  },
  {
    num: '02',
    tag: 'Proposals',
    headline: 'Professional proposal sent\nin under 5 minutes.',
    body: 'Pick a template, fill in scope, pricing, and timeline. Send a link — and get notified the moment your client opens it.',
    img: '/screenshots/screenshot-proposal.png',
    alt: 'Proposal builder in ClearWork',
  },
  {
    num: '03',
    tag: 'E-sign Contracts',
    headline: 'Client signs on their phone.\nNo app needed.',
    body: 'Contract goes out as a link. Client signs with an OTP — legally valid under IT Act 2000. Both copies are saved automatically.',
    img: '/screenshots/screenshot-portal.png',
    alt: 'Client portal and e-sign in ClearWork',
  },
  {
    num: '04',
    tag: 'GST Invoicing',
    headline: 'GST invoice out.\nUPI payment link attached.',
    body: 'CGST / SGST / IGST calculated automatically. One click sends a branded invoice with a UPI payment link — no manual math, no formatting.',
    img: '/screenshots/screenshot-invoice.png',
    alt: 'GST invoice list in ClearWork',
  },
  {
    num: '05',
    tag: 'Automations',
    headline: 'Paid. Follow-ups handled.\nYou\'re done.',
    body: 'Payment lands, invoice is marked paid. If it goes overdue, automated WhatsApp reminders go out — so you never have to chase a client again.',
    img: '/screenshots/screenshot-automation.png',
    alt: 'Payment automation in ClearWork',
  },
]

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ── Desktop sticky-scroll ─────────────────────────────────────────── */
function DesktopJourney() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(STEPS.length - 1, Math.floor(v * STEPS.length))
    setActive(next)
  })

  const step = STEPS[active]

  return (
    /* Tall scroll canvas */
    <div ref={sectionRef} style={{ height: `${STEPS.length * 100}vh` }} className="relative">

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-[#0D1117]">

        {/* Section label */}
        <div className="absolute top-10 left-0 right-0 flex justify-center pointer-events-none">
          <span className="text-[11px] font-bold text-white/25 uppercase tracking-[0.2em]">
            How it works — one client, start to finish
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-[1fr_1.1fr] gap-14 items-center">

          {/* ── Left: story ─────────────────────────────────── */}
          <div>
            {/* Progress pills */}
            <div className="flex items-center gap-2 mb-10">
              {STEPS.map((s, i) => (
                <button
                  key={i}
                  aria-label={`Step ${s.num}`}
                  onClick={() => {
                    if (!sectionRef.current) return
                    const rect = sectionRef.current.getBoundingClientRect()
                    const scrollTop = window.scrollY + rect.top
                    const target = scrollTop + (i / STEPS.length) * sectionRef.current.offsetHeight + 10
                    window.scrollTo({ top: target, behavior: 'smooth' })
                  }}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === active
                      ? 'w-10 bg-white'
                      : i < active
                      ? 'w-5 bg-white/30'
                      : 'w-5 bg-white/15'
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease }}
              >
                {/* Step label */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest">
                    Step {step.num}
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-[11px] font-semibold text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-2.5 py-0.5 rounded-full">
                    {step.tag}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-[2.4rem] font-black text-white leading-[1.1] tracking-tight mb-5 whitespace-pre-line">
                  {step.headline}
                </h3>

                {/* Body */}
                <p className="text-[16px] text-white/55 leading-relaxed max-w-[380px]">
                  {step.body}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTA — visible on last step */}
            <AnimatePresence>
              {active === STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.2 }}
                  className="mt-10"
                >
                  <Link
                    to="https://app.getclearwork.in/signup"
                    className="inline-flex items-center gap-2.5 bg-white text-gray-900 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    Start your free 15-day trial
                    <ArrowRight size={15} />
                  </Link>
                  <p className="mt-3 text-xs text-white/30">No credit card · Free 15-day Pro trial</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: screenshot ────────────────────────────── */}
          <div className="relative flex items-center justify-center">
            {/* Glow behind the card */}
            <div
              className="absolute inset-0 opacity-25 blur-3xl rounded-3xl transition-all duration-700"
              style={{ background: 'radial-gradient(ellipse at center, #6366f1 0%, transparent 70%)' }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 32, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -24, scale: 0.97 }}
                transition={{ duration: 0.5, ease }}
                className="relative w-full"
              >
                {/* Browser chrome bar */}
                <div className="bg-[#1e2228] rounded-t-2xl px-4 py-3 flex items-center gap-2 border border-white/8">
                  <span className="w-3 h-3 rounded-full bg-white/10" />
                  <span className="w-3 h-3 rounded-full bg-white/10" />
                  <span className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="flex-1 mx-3 bg-white/5 rounded-md h-5 flex items-center px-3">
                    <span className="text-[10px] text-white/25 font-mono">app.getclearwork.in</span>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="overflow-hidden rounded-b-2xl border border-t-0 border-white/8 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                  <img
                    src={step.img}
                    alt={step.alt}
                    className="w-full block"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll hint — fades out after first step */}
        <AnimatePresence>
          {active === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-8 left-0 right-0 flex justify-center"
            >
              <div className="flex flex-col items-center gap-2 text-white/20">
                <span className="text-[11px] font-medium tracking-wider uppercase">Scroll to continue</span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                  className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

/* ── Mobile step list ──────────────────────────────────────────────── */
function MobileJourney() {
  return (
    <div className="bg-[#0D1117] px-5 py-16">
      <p className="text-[11px] font-bold text-white/25 uppercase tracking-[0.2em] text-center mb-12">
        How it works — one client, start to finish
      </p>

      <div className="space-y-0">
        {STEPS.map((s, i) => (
          <div key={i} className="relative flex gap-5">
            {/* Connector line */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-white/8 border border-white/12 flex items-center justify-center shrink-0 mt-1 z-10">
                <span className="text-[10px] font-bold text-white/50">{s.num}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-px flex-1 bg-white/8 my-1" style={{ minHeight: 40 }} />
              )}
            </div>

            <div className="pb-10">
              <span className="text-[11px] font-semibold text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-2 py-0.5 rounded-full mb-3 inline-block">
                {s.tag}
              </span>
              <h3 className="text-xl font-bold text-white leading-snug mb-2 whitespace-pre-line">
                {s.headline}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed mb-4">{s.body}</p>

              <div className="rounded-xl overflow-hidden border border-white/8 shadow-xl">
                <img src={s.img} alt={s.alt} className="w-full block" loading="lazy" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link
          to="https://app.getclearwork.in/signup"
          className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-6 py-3 rounded-xl"
        >
          Start your free trial <ArrowRight size={14} />
        </Link>
        <p className="mt-3 text-xs text-white/25">No credit card · Free 15-day Pro trial</p>
      </div>
    </div>
  )
}

/* ── Export ────────────────────────────────────────────────────────── */
export default function ClientJourneySection() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <DesktopJourney />
      </div>
      {/* Mobile */}
      <div className="lg:hidden">
        <MobileJourney />
      </div>
    </>
  )
}
