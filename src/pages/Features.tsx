import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Users, FileText, PenLine, Receipt, Globe, Zap, BarChart3, Clock,
  Wallet, CalendarDays, ClipboardList, Bell, IndianRupee, Shield,
  CheckCircle2, ArrowRight, X, Check, Smartphone, FolderKanban,
  MessageSquare, TrendingUp, Lock, Calculator, Eye, RefreshCw,
  Star, Layers, Building2, Briefcase, Camera, Code2, BookOpen,
  ChevronRight,
} from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease }}>
      {children}
    </motion.div>
  )
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const PERSONAS = [
  { icon: Layers,    label: 'Designers'       },
  { icon: Code2,     label: 'Developers'      },
  { icon: Briefcase, label: 'Consultants'     },
  { icon: Building2, label: 'Agencies'        },
  { icon: BookOpen,  label: 'Coaches'         },
  { icon: Camera,    label: 'Photographers'   },
]

const MODULES = [
  {
    id: 'leads',
    icon: Users,
    color: 'indigo',
    label: 'Lead CRM',
    tagline: 'Never lose a lead again',
    desc: 'Track every enquiry from the moment it lands — Instagram DM, LinkedIn, referral, or website form. Know where each lead is in your pipeline at a glance.',
    features: [
      { icon: Users,        text: 'Pipeline stages: Enquiry → Proposal Sent → Negotiating → Won / Lost' },
      { icon: Bell,         text: 'Follow-up date reminders so no lead goes cold' },
      { icon: TrendingUp,   text: 'Pipeline value, win rate, and source analytics on dashboard' },
      { icon: MessageSquare,text: 'Auto-alert when a lead has had no activity for 7 days' },
      { icon: ClipboardList,text: 'Capture leads from intake forms — auto-creates a lead record' },
      { icon: FolderKanban, text: 'Kanban and table view — switch anytime' },
    ],
    screenshot: '/screenshots/screenshot-dashboard.png',
  },
  {
    id: 'proposals',
    icon: FileText,
    color: 'violet',
    label: 'Proposals',
    tagline: 'Proposals that close deals',
    desc: 'Build branded proposals with cover page, scope, pricing table, and timeline. Share as a tracked link — you\'ll know exactly when they open it and which page they read longest.',
    features: [
      { icon: FileText,  text: 'Cover, About, Scope, Pricing, Timeline — all in one builder' },
      { icon: Bell,      text: 'Push notification the moment a client opens your proposal' },
      { icon: Eye,       text: 'See time spent per section — know what they\'re reading' },
      { icon: IndianRupee, text: 'Optional deposit payment inside the proposal' },
      { icon: CheckCircle2, text: 'One-click convert accepted proposal into a contract' },
      { icon: RefreshCw, text: 'Proposal templates to reuse across similar projects' },
    ],
    screenshot: '/screenshots/screenshot-proposal.png',
  },
  {
    id: 'contracts',
    icon: PenLine,
    color: 'purple',
    label: 'E-sign Contracts',
    tagline: 'Legally binding in seconds',
    desc: 'Convert your proposal into a contract in one click. Client signs via OTP-based e-signature — valid under IT Act 2000. No DocuSign account, no printing, no scanning.',
    features: [
      { icon: PenLine,    text: 'Auto-populate contract from accepted proposal' },
      { icon: Shield,     text: 'OTP e-signature — legally valid under IT Act 2000' },
      { icon: Lock,       text: 'Signed PDF stored securely and downloadable anytime' },
      { icon: Bell,       text: 'Instant alert when contract is signed' },
      { icon: FileText,   text: 'Custom contract clauses and payment milestones' },
      { icon: CheckCircle2, text: 'Tamper-evident signature audit trail' },
    ],
    screenshot: '/screenshots/screenshot-portal.png',
  },
  {
    id: 'invoices',
    icon: Receipt,
    color: 'emerald',
    label: 'GST Invoices',
    tagline: 'GST-compliant, payment-ready',
    desc: 'Auto-filled from your contract. CGST/SGST/IGST calculated by client state. TDS 194J/194C flag included. Razorpay payment link embedded — client pays in one tap.',
    features: [
      { icon: Calculator,   text: 'CGST/SGST for same state, IGST for cross-state — auto-detected' },
      { icon: IndianRupee,  text: 'Razorpay + UPI payment link embedded in every invoice' },
      { icon: Shield,       text: 'TDS 194J/194C flagging for professional services' },
      { icon: RefreshCw,    text: 'Recurring invoices for retainer clients' },
      { icon: Bell,         text: 'Auto reminders at 3, 7, 14 days overdue via WhatsApp + email' },
      { icon: BarChart3,    text: 'GST report export for CA / filing season' },
    ],
    screenshot: '/screenshots/screenshot-invoice.png',
  },
  {
    id: 'portal',
    icon: Globe,
    color: 'sky',
    label: 'Client Portal',
    tagline: 'Your brand, their convenience',
    desc: 'Every client gets a private branded portal — proposals, contracts, and invoices all in one link. They can sign, pay, and download without calling you.',
    features: [
      { icon: Globe,        text: 'One link — no login required for clients' },
      { icon: FileText,     text: 'All proposals, contracts, and invoices in one place' },
      { icon: IndianRupee,  text: 'Pay any invoice directly from the portal' },
      { icon: CheckCircle2, text: 'Sign contracts with OTP from the portal' },
      { icon: Shield,       text: 'Branded with your business name and logo' },
      { icon: Bell,         text: 'Clients can download signed PDFs anytime' },
    ],
    screenshot: '/screenshots/screenshot-portal.png',
  },
  {
    id: 'automations',
    icon: Zap,
    color: 'amber',
    label: 'Automations',
    tagline: 'Set it once, run forever',
    desc: 'Build visual workflows that run in the background. Overdue invoice follow-ups, onboarding emails after contract signing, lead re-engagement — all automated.',
    features: [
      { icon: Zap,          text: 'Visual drag-and-drop flow builder: trigger → condition → action' },
      { icon: MessageSquare,text: 'WhatsApp + email actions in the same workflow' },
      { icon: RefreshCw,    text: 'Pre-built templates: invoice reminders, onboarding, lead follow-up' },
      { icon: Bell,         text: 'Trigger on: invoice overdue, proposal sent, contract signed, new lead' },
      { icon: Clock,        text: 'Time-delay steps — send 3 days after an event' },
      { icon: TrendingUp,   text: 'Run history + delivery status for every automation' },
    ],
    screenshot: '/screenshots/screenshot-automation.png',
  },
  {
    id: 'time',
    icon: Clock,
    color: 'orange',
    label: 'Time Tracking',
    tagline: 'Track hours, bill accurately',
    desc: 'Log time against projects and clients. See your effective hourly rate. Convert tracked hours into invoice line items — no manual entry.',
    features: [
      { icon: Clock,        text: 'Start/stop timer or manual entry' },
      { icon: FolderKanban, text: 'Tag time to project, client, or both' },
      { icon: IndianRupee,  text: 'Set hourly rate per project — auto-calculates billable amount' },
      { icon: Receipt,      text: 'Convert time entries to invoice line items in one click' },
      { icon: BarChart3,    text: 'Weekly and monthly time reports' },
      { icon: CheckCircle2, text: 'Mark entries as billed to avoid double-billing' },
    ],
    screenshot: '/screenshots/screenshot-dashboard.png',
  },
  {
    id: 'expenses',
    icon: Wallet,
    color: 'rose',
    label: 'Expense Tracking',
    tagline: 'Know your real profit',
    desc: 'Log business expenses and tag them to projects. Mark as billable to pass costs through to clients. See true project profitability.',
    features: [
      { icon: Wallet,       text: 'Log expenses with category, amount, and date' },
      { icon: FolderKanban, text: 'Tag to project or client' },
      { icon: IndianRupee,  text: 'Mark as billable — add to client invoice automatically' },
      { icon: Calculator,   text: 'GST on expenses tracked for input credit' },
      { icon: BarChart3,    text: 'Expense reports by category and month' },
      { icon: TrendingUp,   text: 'Net profit view: revenue minus expenses per project' },
    ],
    screenshot: '/screenshots/screenshot-dashboard.png',
  },
]

const COLOR_MAP: Record<string, { bg: string; icon: string; pill: string; border: string; glow: string }> = {
  indigo:  { bg: 'bg-indigo-50',  icon: 'text-indigo-600',  pill: 'bg-indigo-100 text-indigo-700',  border: 'border-indigo-200',  glow: 'shadow-indigo-100' },
  violet:  { bg: 'bg-violet-50',  icon: 'text-violet-600',  pill: 'bg-violet-100 text-violet-700',  border: 'border-violet-200',  glow: 'shadow-violet-100' },
  purple:  { bg: 'bg-purple-50',  icon: 'text-purple-600',  pill: 'bg-purple-100 text-purple-700',  border: 'border-purple-200',  glow: 'shadow-purple-100' },
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', pill: 'bg-emerald-100 text-emerald-700',border: 'border-emerald-200', glow: 'shadow-emerald-100' },
  sky:     { bg: 'bg-sky-50',     icon: 'text-sky-600',     pill: 'bg-sky-100 text-sky-700',        border: 'border-sky-200',     glow: 'shadow-sky-100' },
  amber:   { bg: 'bg-amber-50',   icon: 'text-amber-600',   pill: 'bg-amber-100 text-amber-700',    border: 'border-amber-200',   glow: 'shadow-amber-100' },
  orange:  { bg: 'bg-orange-50',  icon: 'text-orange-600',  pill: 'bg-orange-100 text-orange-700',  border: 'border-orange-200',  glow: 'shadow-orange-100' },
  rose:    { bg: 'bg-rose-50',    icon: 'text-rose-600',    pill: 'bg-rose-100 text-rose-700',      border: 'border-rose-200',    glow: 'shadow-rose-100' },
}

const COMPARISON_FEATURES = [
  { label: 'Lead CRM & pipeline',          clearwork: true,  others: 'Notion / spreadsheet' },
  { label: 'Branded proposals',            clearwork: true,  others: 'Google Docs / Canva'  },
  { label: 'Proposal open tracking',       clearwork: true,  others: false                  },
  { label: 'OTP e-signature (IT Act 2000)',clearwork: true,  others: 'DocuSign ($$$)'       },
  { label: 'GST invoice (CGST/SGST/IGST)', clearwork: true,  others: 'Zoho Invoice'         },
  { label: 'Razorpay payment link',        clearwork: true,  others: 'Manual bank transfer' },
  { label: 'TDS 194J/194C flagging',       clearwork: true,  others: false                  },
  { label: 'Client portal',               clearwork: true,  others: false                  },
  { label: 'WhatsApp payment reminders',   clearwork: true,  others: false                  },
  { label: 'Time tracking',               clearwork: true,  others: 'Toggl (separate app)' },
  { label: 'Expense tracking',            clearwork: true,  others: 'Separate app'         },
  { label: 'Visual automation builder',   clearwork: true,  others: 'Zapier ($$$)'         },
  { label: 'GST report for CA',           clearwork: true,  others: 'Manual export'        },
  { label: 'Mobile web app (no install)', clearwork: true,  others: false                  },
  { label: 'All of the above — one tool', clearwork: true,  others: '6+ tools, 6+ bills'  },
]

const USE_CASES = [
  {
    icon: Layers,
    type: 'Solo Freelancer',
    tagline: 'From first enquiry to paid invoice — solo.',
    color: 'indigo',
    desc: 'You wear every hat. ClearWork keeps the admin invisible so you can focus on your craft and grow your income.',
    highlights: [
      'Lead pipeline to never miss a DM enquiry',
      'Proposals that convert — with open tracking',
      'Contracts signed in seconds, no printing',
      'GST invoice + Razorpay in under 2 minutes',
      'Automated reminders chase late payments for you',
    ],
    stat: { val: '6 hrs', label: 'saved every week' },
  },
  {
    icon: Building2,
    type: 'Small Agency',
    tagline: 'Manage clients, projects, and your team\'s time.',
    color: 'violet',
    desc: 'Multiple clients, multiple projects running at once. ClearWork keeps everything in one place so nothing falls through the cracks.',
    highlights: [
      'Projects that group proposals, contracts, invoices, time',
      'Client portal — each client sees only their docs',
      'Time tracking per project → billable invoice in one click',
      'Expense tracking with billable pass-through to clients',
      'Revenue and profitability reports by project',
    ],
    stat: { val: '₹0', label: 'extra tools to pay for' },
  },
  {
    icon: Briefcase,
    type: 'Consultant / Coach',
    tagline: 'Retainers, sessions, and recurring billing — handled.',
    color: 'emerald',
    desc: 'Your business runs on recurring relationships. ClearWork handles the paperwork so you show up as a professional every time.',
    highlights: [
      'Recurring invoices for monthly retainers',
      'Intake forms to qualify leads before the first call',
      'Meeting scheduling tied to leads and clients',
      'Branded proposals that reflect your premium positioning',
      'Monthly business digest — know your numbers',
    ],
    stat: { val: '2 min', label: 'to send a GST invoice' },
  },
]

// ─── Components ────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
      {children}
    </span>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Features() {
  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-5 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <SectionLabel>All features</SectionLabel>
            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.05]">
              Everything a freelancer needs.{' '}
              <span className="gradient-text">Nothing they don't.</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              ClearWork replaces 6+ tools with one platform built specifically for Indian freelancers and small agencies — GST-ready, Razorpay-connected, and designed to get out of your way.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <a href="/#waitlist"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
                Join the waitlist — free
                <ArrowRight size={15} />
              </a>
              <a href="/#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-gray-700 font-semibold text-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
                See it in action
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Persona Strip ── */}
      <section className="border-y border-gray-100 bg-gray-50/60 py-5">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Built for</span>
            {PERSONAS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Icon size={14} className="text-indigo-500" strokeWidth={2} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Module Feature Grid ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 space-y-24">

          {MODULES.map((mod, i) => {
            const c = COLOR_MAP[mod.color]
            const flip = i % 2 !== 0
            return (
              <FadeIn key={mod.id}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${flip ? 'lg:grid-flow-dense' : ''}`}>

                  {/* Copy */}
                  <div className={flip ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.bg}`}>
                        <mod.icon size={18} className={c.icon} />
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.pill}`}>{mod.label}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-snug">
                      {mod.tagline}
                    </h2>
                    <p className="mt-4 text-gray-500 text-[15px] leading-relaxed">{mod.desc}</p>

                    <ul className="mt-7 space-y-3">
                      {mod.features.map((f, fi) => (
                        <motion.li
                          key={fi}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: fi * 0.05, ease }}
                          className="flex items-start gap-3"
                        >
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${c.bg}`}>
                            <Check size={11} className={c.icon} strokeWidth={3} />
                          </div>
                          <span className="text-[14px] text-gray-600 leading-snug">{f.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Screenshot — 3D tilted */}
                  <div className={flip ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="relative" style={{ perspective: 1000 }}>
                      {/* Glow */}
                      <div className={`absolute -inset-4 ${c.bg} rounded-3xl blur-2xl opacity-70 pointer-events-none`} />
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                        style={{ transform: `perspective(900px) rotateY(${flip ? '5deg' : '-5deg'}) rotateX(2deg)` }}
                        className="relative"
                      >
                        <div className={`rounded-2xl border ${c.border} shadow-xl overflow-hidden bg-white`}>
                          <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50/90 border-b border-gray-100">
                            <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                            </div>
                            <div className="flex-1 mx-3">
                              <div className="max-w-44 mx-auto h-5 bg-white rounded border border-gray-200 flex items-center justify-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                <span className="text-[10px] text-gray-400">app.getclearwork.in</span>
                              </div>
                            </div>
                          </div>
                          <img src={mod.screenshot} alt={mod.label} className="w-full block" loading="lazy" />
                          <div className="absolute inset-0 pointer-events-none rounded-2xl"
                            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 55%)' }} />
                        </div>
                      </motion.div>
                    </div>
                  </div>

                </div>
              </FadeIn>
            )
          })}
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="py-24 bg-gray-950 overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/60 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              vs. doing it the old way
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              One tool.{' '}
              <span className="text-indigo-400">Not six.</span>
            </h2>
            <p className="mt-4 text-gray-400 text-base max-w-lg mx-auto leading-relaxed">
              Most Indian freelancers cobble together Notion + DocuSign + Zoho + Calendly + Zapier + WhatsApp. ClearWork does all of it — at a fraction of the cost.
            </p>
          </FadeIn>

          {/* Table */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[1fr_auto_auto] bg-white/5 border-b border-white/10 px-5 py-3">
                <span className="text-xs font-bold uppercase tracking-widest text-white/30">Feature</span>
                <span className="text-xs font-bold text-white/80 text-center w-28">ClearWork</span>
                <span className="text-xs font-bold text-white/30 text-center w-36">Without ClearWork</span>
              </div>

              {COMPARISON_FEATURES.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[1fr_auto_auto] items-center px-5 py-3.5 border-b border-white/[0.06] ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}
                >
                  <span className="text-[13px] text-gray-300 pr-4">{row.label}</span>
                  <div className="w-28 flex justify-center">
                    {row.clearwork
                      ? <CheckCircle2 size={16} className="text-emerald-400" strokeWidth={2.5} />
                      : <X size={14} className="text-gray-600" />
                    }
                  </div>
                  <div className="w-36 flex justify-center">
                    {typeof row.others === 'string'
                      ? <span className="text-[11px] text-gray-500 text-center leading-snug">{row.others}</span>
                      : <X size={14} className="text-gray-700" />
                    }
                  </div>
                </div>
              ))}

              {/* Footer CTA */}
              <div className="px-5 py-4 bg-indigo-600/20 border-t border-indigo-500/20 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm font-bold text-white">All of this — from ₹699/month.</p>
                  <p className="text-xs text-indigo-300 mt-0.5">DocuSign alone costs ₹1,800/mo. Zapier starts at ₹1,600/mo.</p>
                </div>
                <a href="/#waitlist"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-gray-900 text-sm font-bold hover:bg-gray-100 transition-colors shrink-0">
                  Get early access
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-14">
            <SectionLabel>Made for your business type</SectionLabel>
            <h2 className="mt-5 text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Works for how <span className="gradient-text">you work</span>
            </h2>
            <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">
              Whether you're a solo designer or a 5-person agency, ClearWork adapts to your workflow — not the other way around.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {USE_CASES.map((uc, i) => {
              const c = COLOR_MAP[uc.color]
              return (
                <FadeIn key={uc.type} delay={i * 0.08}>
                  <div className="relative rounded-2xl border border-gray-200 bg-white hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-300 overflow-hidden group">
                    {/* Top accent */}
                    <div className={`h-1 w-full ${uc.color === 'indigo' ? 'bg-indigo-500' : uc.color === 'violet' ? 'bg-violet-500' : 'bg-emerald-500'}`} />

                    <div className="p-6">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.bg} mb-4`}>
                        <uc.icon size={18} className={c.icon} />
                      </div>

                      <h3 className="text-[17px] font-bold text-gray-900">{uc.type}</h3>
                      <p className="text-[13px] text-gray-500 mt-1 leading-snug font-medium">{uc.tagline}</p>
                      <p className="text-[13px] text-gray-500 mt-3 leading-relaxed">{uc.desc}</p>

                      <ul className="mt-5 space-y-2.5">
                        {uc.highlights.map((h, hi) => (
                          <li key={hi} className="flex items-start gap-2.5">
                            <CheckCircle2 size={13} className={`${c.icon} shrink-0 mt-0.5`} strokeWidth={2.5} />
                            <span className="text-[13px] text-gray-600 leading-snug">{h}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Stat */}
                      <div className={`mt-6 pt-5 border-t border-gray-100 flex items-center gap-3`}>
                        <div>
                          <div className="text-2xl font-extrabold text-gray-900 tracking-tight">{uc.stat.val}</div>
                          <div className="text-[11px] text-gray-400 font-medium">{uc.stat.label}</div>
                        </div>
                        <Star size={14} className="text-amber-400 ml-auto" fill="currentColor" />
                        <Star size={14} className="text-amber-400" fill="currentColor" />
                        <Star size={14} className="text-amber-400" fill="currentColor" />
                        <Star size={14} className="text-amber-400" fill="currentColor" />
                        <Star size={14} className="text-amber-400" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Additional Capabilities ── */}
      <section className="py-20 bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-12">
            <SectionLabel>More built in</SectionLabel>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              The details that make it complete
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Smartphone,    color: 'indigo', title: 'Mobile web app',          desc: 'Install directly to your home screen — no App Store needed. Full dashboard on mobile.' },
              { icon: CalendarDays,  color: 'sky',    title: 'Meeting scheduling',       desc: 'Book client calls, add Google/Outlook links, set reminders — all tied to your leads.' },
              { icon: ClipboardList, color: 'violet', title: 'Intake forms',             desc: 'Custom lead capture forms. Auto-create a lead when someone submits — no manual work.' },
              { icon: BarChart3,     color: 'emerald',title: 'Revenue reports',          desc: 'Monthly revenue, outstanding, collected, GST breakdown. Export-ready for your CA.' },
              { icon: FolderKanban,  color: 'amber',  title: 'Project management',       desc: 'Group proposals, contracts, invoices, time, and expenses under one project umbrella.' },
              { icon: Shield,        color: 'rose',   title: 'Secure & compliant',       desc: 'Data hosted on Supabase (SOC 2). E-sign under IT Act 2000. HTTPS everywhere.' },
              { icon: RefreshCw,     color: 'orange', title: 'Recurring invoices',       desc: 'Set it once — ClearWork auto-generates and sends invoices monthly for retainer clients.' },
              { icon: TrendingUp,    color: 'indigo', title: 'Business digest',          desc: 'Weekly and monthly email summaries of your revenue, pipeline, and overdue invoices.' },
              { icon: MessageSquare, color: 'violet', title: 'WhatsApp automations',     desc: '98% open rate. Send payment reminders, onboarding messages, and follow-ups via WA.' },
            ].map((item, i) => {
              const c = COLOR_MAP[item.color]
              return (
                <FadeIn key={item.title} delay={(i % 3) * 0.07}>
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-gray-200 hover:shadow-md hover:shadow-gray-100 transition-all duration-200">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${c.bg}`}>
                      <item.icon size={16} className={c.icon} />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-gray-900">{item.title}</p>
                      <p className="text-[12px] text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-100 text-indigo-600 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Early access open
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Ready to run your freelance{' '}
              <span className="gradient-text">business properly?</span>
            </h2>
            <p className="mt-5 text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
              Join thousands of Indian freelancers on the waitlist. Free plan available — no credit card needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <a href="/#waitlist"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gray-950 text-white font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
                Join the waitlist — it's free
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="/#pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-gray-700 font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
                See pricing
                <ChevronRight size={15} />
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-x-7 gap-y-2 mt-8">
              {['Free forever plan', 'No credit card', 'Cancel anytime', 'GST + Razorpay built-in'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-gray-400">
                  <CheckCircle2 size={13} className="text-emerald-500" strokeWidth={2.5} />
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
