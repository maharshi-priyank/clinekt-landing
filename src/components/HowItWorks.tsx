import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { UserSearch, FileText, PenLine, Receipt, Globe, TrendingUp, type LucideIcon } from 'lucide-react'

type Step = {
  id: string
  icon: LucideIcon
  category: string
  title: string
  desc: string
  pills: string[]
  screenshot: string
  caption: string
  accentBg: string
  accentText: string
  accentBorder: string
}

const steps: Step[] = [
  {
    id: 'leads',
    icon: UserSearch,
    category: 'Lead CRM',
    title: 'Capture every lead',
    desc: 'Add leads from Instagram, LinkedIn, WhatsApp or referrals. See pipeline value, follow-up dates, and win rate — all on your dashboard.',
    pills: ['Pipeline view', 'Follow-up dates', 'Win rate', 'Source tracking'],
    screenshot: '/screenshots/screenshot-dashboard.png',
    caption: 'Lead Pipeline & Dashboard',
    accentBg: 'bg-indigo-50',
    accentText: 'text-indigo-600',
    accentBorder: 'border-indigo-100',
  },
  {
    id: 'proposals',
    icon: FileText,
    category: 'Proposals',
    title: 'Send a tracked proposal',
    desc: 'Build a branded proposal with scope, pricing, and timeline. Share as a tracked link — get a push notification the second they open it.',
    pills: ['Branded cover', 'Scope & pricing', 'View tracking', 'AI drafting'],
    screenshot: '/screenshots/screenshot-proposal.png',
    caption: 'Proposal builder — Cover, Pricing, Timeline',
    accentBg: 'bg-violet-50',
    accentText: 'text-violet-600',
    accentBorder: 'border-violet-100',
  },
  {
    id: 'contracts',
    icon: PenLine,
    category: 'E-sign',
    title: 'E-sign the contract',
    desc: 'One click converts your proposal into a contract. Client signs via OTP — legally valid under IT Act 2000. No DocuSign, no printing.',
    pills: ['OTP e-signature', 'IT Act 2000', 'Auto-convert', 'Legally binding'],
    screenshot: '/screenshots/screenshot-portal.png',
    caption: 'Contract signed via OTP',
    accentBg: 'bg-blue-50',
    accentText: 'text-blue-600',
    accentBorder: 'border-blue-100',
  },
  {
    id: 'invoices',
    icon: Receipt,
    category: 'GST Invoice',
    title: 'Send a GST invoice',
    desc: 'Auto-filled from your contract. CGST/SGST/IGST calculated by client state. payment link embedded — client pays in one tap.',
    pills: ['Auto-filled', 'CGST / SGST / IGST', 'payment link', 'One-tap payment'],
    screenshot: '/screenshots/screenshot-invoice.png',
    caption: 'Invoice list — status, amounts, due dates',
    accentBg: 'bg-emerald-50',
    accentText: 'text-emerald-600',
    accentBorder: 'border-emerald-100',
  },
  {
    id: 'portal',
    icon: Globe,
    category: 'Client Portal',
    title: 'Client gets their portal',
    desc: 'Every client gets a branded portal with all their proposals, contracts, and invoices in one link. Pay directly from the portal.',
    pills: ['Branded portal', 'All docs in one', 'Inline payment', 'No login needed'],
    screenshot: '/screenshots/screenshot-portal.png',
    caption: "Client Portal — Prashant's view",
    accentBg: 'bg-sky-50',
    accentText: 'text-sky-600',
    accentBorder: 'border-sky-100',
  },
  {
    id: 'automate',
    icon: TrendingUp,
    category: 'Automations',
    title: 'Automate follow-ups',
    desc: 'Set up WhatsApp + email reminders for overdue invoices, auto-send onboarding forms after signing — all in a visual builder.',
    pills: ['WhatsApp reminders', 'Email sequences', 'Visual builder', 'Auto-onboarding'],
    screenshot: '/screenshots/screenshot-automation.png',
    caption: 'Automation builder — Lead Follow-up flow',
    accentBg: 'bg-orange-50',
    accentText: 'text-orange-600',
    accentBorder: 'border-orange-100',
  },
]

// Each card peeks this many px above the one in front of it
const PEEK = 28

function StepCard({ step, index, total }: { step: Step; index: number; total: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const topPx = 72 + index * PEEK

  return (
    <div className="sticky mb-5" style={{ top: topPx }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 56 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl border border-gray-100 overflow-hidden bg-white shadow-[0_2px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_36px_rgba(0,0,0,0.11)] transition-shadow duration-300"
      >
        {/* ── Left: text ── */}
        <div className="flex flex-col justify-center px-8 py-11 lg:px-12 lg:py-14">
          <div className="flex items-center gap-2 mb-5">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${step.accentBg} ${step.accentText} ${step.accentBorder}`}>
              <step.icon size={11} strokeWidth={2.5} />
              {step.category}
            </span>
            <span className="ml-auto text-xs font-bold text-gray-200 tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          <h3 className="text-2xl lg:text-[28px] font-bold text-gray-900 tracking-tight leading-snug mb-4">
            {step.title}
          </h3>

          <p className="text-gray-500 text-[15px] leading-relaxed mb-7 max-w-xs">
            {step.desc}
          </p>

          <div className="flex flex-wrap gap-2">
            {step.pills.map(pill => (
              <span
                key={pill}
                className="text-[12px] font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-3 py-1"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: dark device frame + screenshot ── */}
        <div className="bg-[#111111] flex items-end justify-center px-6 pt-8 pb-0 overflow-hidden min-h-[300px]">
          <div className="w-full rounded-t-xl overflow-hidden border border-white/[0.06] shadow-2xl">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-[#1C1C1E]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
              <div className="flex-1 mx-2">
                <div className="max-w-[160px] mx-auto h-4 bg-[#2C2C2E] rounded flex items-center justify-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[9px] text-white/30">app.getclearwork.in</span>
                </div>
              </div>
            </div>
            <img
              src={step.screenshot}
              alt={step.caption}
              className="w-full block object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#F9FAFB]">

      {/* Header */}
      <div className="max-w-6xl mx-auto px-5 lg:px-8 pt-24 pb-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            The workflow
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Lead to payment.{' '}
            <span className="gradient-text">In one tool.</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-md mx-auto">
            Six steps. Zero switching between apps.
          </p>
        </div>
      </div>

      {/* Sticky stack */}
      <div className="relative">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          {steps.map((step, i) => (
            <StepCard key={step.id} step={step} index={i} total={steps.length} />
          ))}
        </div>
      </div>

      <div className="h-20" />
    </section>
  )
}
