import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Users, FileText, PenLine, Receipt, Globe, Zap,
  CheckCircle2, TrendingUp, Bell, Calculator, MessageSquare,
} from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

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

function ScreenshotFrame({ tabs, activeTab, onTabChange }: {
  tabs: { id: string; label: string; src: string }[]
  activeTab: string
  onTabChange: (id: string) => void
}) {
  return (
    <div className="rounded-2xl shadow-2xl shadow-gray-900/10 border border-gray-200 bg-white overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50/90 border-b border-gray-150">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
        </div>
        <div className="flex-1 mx-3">
          <div className="max-w-48 mx-auto h-5 bg-white rounded border border-gray-200 flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-gray-400">app.rupway.in</span>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-50/60 border-b border-gray-100">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                : 'text-gray-400 hover:text-gray-600 hover:bg-white/70'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Screenshot */}
      <div className="relative overflow-hidden bg-gray-50">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeTab}
            src={tabs.find(t => t.id === activeTab)!.src}
            alt={`Rupway ${activeTab}`}
            className="w-full block"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─── Pillar 1: Win clients faster ──────────────────────── */
const pillar1Tabs = [
  { id: 'dashboard', label: 'Dashboard',  src: '/screenshots/screenshot-dashboard.png'  },
  { id: 'proposals', label: 'Proposals',  src: '/screenshots/screenshot-proposal.png'   },
]
const pillar1Bullets = [
  { icon: Users,       text: 'Lead CRM with Kanban pipeline — add from WhatsApp, LinkedIn, or referrals' },
  { icon: Bell,        text: 'Know the exact second a client opens your proposal and which page they read' },
  { icon: FileText,    text: 'Send branded proposals with pricing tables, timeline, and credibility sections' },
  { icon: TrendingUp,  text: 'Dashboard shows pipeline value, win rate, and follow-ups all in one place' },
]

/* ─── Pillar 2: Get paid without chasing ─────────────────── */
const pillar2Tabs = [
  { id: 'invoices', label: 'Invoices',      src: '/screenshots/screenshot-invoice.png' },
  { id: 'portal',   label: 'Client Portal', src: '/screenshots/screenshot-portal.png'  },
]
const pillar2Bullets = [
  { icon: Receipt,       text: 'GST invoices with CGST/SGST/IGST auto-calculated by client state' },
  { icon: Calculator,    text: 'Razorpay payment link embedded in every invoice — UPI, card, EMI' },
  { icon: MessageSquare, text: 'Auto WhatsApp reminders at day 3, 7, 14 overdue — 98% open rate' },
  { icon: Globe,         text: 'White-label client portal — all proposals, contracts, invoices in one link' },
]

/* ─── Pillar 3: Automate the admin ──────────────────────── */
const pillar3Tabs = [
  { id: 'automations', label: 'Automations',   src: '/screenshots/screenshot-automation.png' },
  { id: 'contracts',   label: 'E-sign',         src: '/screenshots/screenshot-proposal.png'   },
]
const pillar3Bullets = [
  { icon: Zap,       text: 'Visual automation builder — trigger emails, forms, or reminders on any event' },
  { icon: PenLine,   text: 'One click converts proposal → contract. Client signs via OTP, IT Act 2000 valid' },
  { icon: CheckCircle2, text: 'Proposal accepted? Contract auto-generated with scope and price pre-filled' },
  { icon: Receipt,   text: 'GST quarterly summary export — CA-ready PDF, shareable on WhatsApp' },
]

function Pillar({
  tag, headline, sub, bullets, tabs, flip = false,
}: {
  tag: string; headline: React.ReactNode; sub: string
  bullets: { icon: React.ElementType; text: string }[]
  tabs: { id: string; label: string; src: string }[]
  flip?: boolean
}) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  const copy = (
    <FadeIn delay={0.1} className="flex flex-col justify-center">
      <span className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        {tag}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight leading-snug">
        {headline}
      </h2>
      <p className="text-gray-500 text-base mt-4 leading-relaxed max-w-md">{sub}</p>
      <ul className="mt-7 space-y-3.5">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
              <b.icon size={13} className="text-indigo-600" />
            </div>
            <span className="text-sm text-gray-600 leading-relaxed">{b.text}</span>
          </li>
        ))}
      </ul>
    </FadeIn>
  )

  const screenshot = (
    <FadeIn delay={0.2}>
      <div className="relative" style={{ perspective: 1000 }}>
        {/* Glow behind frame */}
        <div className="absolute -inset-4 bg-indigo-100/50 rounded-3xl blur-2xl pointer-events-none" />
        {/* Tilted frame */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transform: `perspective(900px) rotateY(${flip ? '5deg' : '-5deg'}) rotateX(2deg)` }}
          className="relative"
        >
          <ScreenshotFrame tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          {/* Reflection sheen */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)' }} />
        </motion.div>
      </div>
    </FadeIn>
  )

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${flip ? 'lg:grid-flow-dense' : ''}`}>
      {flip ? <>{screenshot}<div className="lg:col-start-2">{copy}</div></> : <>{copy}{screenshot}</>}
    </div>
  )
}

export default function FeaturePillars() {
  return (
    <section id="features-pillars" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 space-y-28">

        <Pillar
          tag="Win clients faster"
          headline={<>Your full pipeline,<br /><span className="gradient-text">front and centre.</span></>}
          sub="Add leads from anywhere, send tracked proposals, and close deals — before your competition even follows up."
          bullets={pillar1Bullets}
          tabs={pillar1Tabs}
        />

        <Pillar
          flip
          tag="Get paid without chasing"
          headline={<>GST invoices that<br /><span className="gradient-text">pay themselves.</span></>}
          sub="Auto-calculated GST, Razorpay payment link inside every invoice, and WhatsApp reminders that actually get opened."
          bullets={pillar2Bullets}
          tabs={pillar2Tabs}
        />

        <Pillar
          tag="Automate the admin"
          headline={<>Set it once.<br /><span className="gradient-text">It runs itself.</span></>}
          sub="Build automation flows that send emails, follow-ups, and reminders without you lifting a finger."
          bullets={pillar3Bullets}
          tabs={pillar3Tabs}
        />

      </div>
    </section>
  )
}
