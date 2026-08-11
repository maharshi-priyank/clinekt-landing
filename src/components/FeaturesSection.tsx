import { motion } from 'framer-motion'
import {
  Calculator, IndianRupee, Bell, MessageSquare, Shield, Landmark, Zap, Users, FolderKanban,
} from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const card = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.65, ease } },
}

type Feature = {
  icon: React.ElementType
  iconBg: string; iconColor: string
  accent: string; highlight: string
  title: string; desc: string
  tag?: string; tagColor?: string
  span: 1 | 2
}

const features: Feature[] = [
  {
    icon: Calculator,
    iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600',
    accent: 'from-indigo-50/80 via-transparent', highlight: 'before:from-indigo-200/30',
    title: 'GST auto-calculation',
    desc: 'CGST/SGST for same-state, IGST for cross-state — auto-detected by client address. TDS 194J/194C flag included. No spreadsheet, no CA needed.',
    tag: 'India-first', tagColor: 'bg-amber-50 text-amber-700 border-amber-100',
    span: 2,
  },
  {
    icon: IndianRupee,
    iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600',
    accent: 'from-emerald-50/60 via-transparent', highlight: 'before:from-emerald-200/20',
    title: 'Online payments embedded',
    desc: 'Payment link inside every invoice. Client pays via UPI, card, net banking, or EMI in one tap.',
    span: 1,
  },
  {
    icon: Bell,
    iconBg: 'bg-amber-100', iconColor: 'text-amber-600',
    accent: 'from-amber-50/60 via-transparent', highlight: '',
    title: 'Real-time proposal tracking',
    desc: 'Know the exact moment a client opens your proposal — and which page they dwell on.',
    tag: 'Aha moment', tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    span: 1,
  },
  {
    icon: MessageSquare,
    iconBg: 'bg-green-100', iconColor: 'text-green-600',
    accent: 'from-green-50/50 via-transparent', highlight: '',
    title: 'WhatsApp-first reminders',
    desc: 'Payment chasers via WhatsApp at day 3, 7, 14 overdue. 98% open rate in India.',
    span: 1,
  },
  {
    icon: Shield,
    iconBg: 'bg-blue-100', iconColor: 'text-blue-600',
    accent: 'from-blue-50/50 via-transparent', highlight: '',
    title: 'E-sign — IT Act 2000',
    desc: 'OTP-verified digital signature, legally binding in India. Timestamped audit trail PDF auto-generated.',
    span: 1,
  },
  {
    icon: Users,
    iconBg: 'bg-violet-100', iconColor: 'text-violet-600',
    accent: 'from-violet-50/70 via-transparent', highlight: '',
    title: 'White-label client portal',
    desc: 'Every client gets a branded portal at your domain. Proposals, contracts, invoices — one link, your branding.',
    span: 2,
  },
  {
    icon: Zap,
    iconBg: 'bg-orange-100', iconColor: 'text-orange-600',
    accent: 'from-orange-50/50 via-transparent', highlight: '',
    title: 'Proposal → contract in 1 click',
    desc: 'Client accepts → contract with scope, price, and timelines pre-filled. Signed in 3 minutes.',
    span: 1,
  },
  {
    icon: Landmark,
    iconBg: 'bg-rose-100', iconColor: 'text-rose-600',
    accent: 'from-rose-50/50 via-transparent', highlight: '',
    title: 'GST report for your CA',
    desc: 'Quarter-wise summary export. CA-ready PDF, shareable on WhatsApp in one tap.',
    span: 1,
  },
  {
    icon: FolderKanban,
    iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600',
    accent: 'from-cyan-50/50 via-transparent', highlight: '',
    title: 'Project tracking',
    desc: 'Group proposals, invoices, time entries, and expenses under one project. See profit per engagement.',
    span: 2,
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-32 relative overflow-hidden" style={{ background: '#FFFFFF' }}>
      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
            text-xs font-semibold bg-white border border-stone-200 text-stone-500 shadow-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Built for India
          </span>
          <h2
            className="font-black text-stone-950 tracking-tight"
            style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', letterSpacing: '-0.025em' }}
          >
            Built for India.{' '}
            <span className="font-medium text-stone-400">Not adapted for it.</span>
          </h2>
          <p className="text-stone-500 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            GST invoicing, UPI payments, WhatsApp reminders, OTP e-sign — the tools global platforms
            don't have. We built every one from scratch.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={card}
              whileHover={{ y: -4, transition: { duration: 0.22, ease } }}
              className={f.span === 2 ? 'sm:col-span-2 lg:col-span-2' : ''}
            >
              <motion.div
                whileHover={{ boxShadow: '0 12px 40px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.04)' }}
                transition={{ duration: 0.22 }}
                className={`
                  group h-full p-7 rounded-2xl bg-white
                  border border-stone-100
                  shadow-[0_1px_4px_rgba(0,0,0,0.05)]
                  flex flex-col relative overflow-hidden
                  bg-gradient-to-br ${f.accent} to-white
                  cursor-default
                `}
              >
                {/* Shimmer hover line */}
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Icon + tag row */}
                <div className="flex items-start justify-between mb-5">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className={`w-10 h-10 rounded-xl ${f.iconBg} flex items-center justify-center shrink-0`}
                  >
                    <f.icon size={17} className={f.iconColor} strokeWidth={2} />
                  </motion.div>
                  {f.tag && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border mt-0.5 ${f.tagColor}`}>
                      {f.tag}
                    </span>
                  )}
                </div>

                <h3 className={`font-bold text-stone-900 leading-snug mb-2 ${f.span === 2 ? 'text-[17px]' : 'text-[15px]'}`}>
                  {f.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed flex-1">{f.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
