import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Calculator, IndianRupee, Bell, MessageSquare, Shield, Landmark, Zap, Users,
  FolderKanban,
} from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease }}>
      {children}
    </motion.div>
  )
}

type Feature = {
  icon: React.ElementType
  iconBg: string
  iconColor: string
  title: string
  desc: string
  tag?: string
}

const features: Feature[] = [
  {
    icon: Calculator,
    iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600',
    title: 'GST auto-calculation',
    desc: 'CGST/SGST for same-state, IGST for cross-state — auto-detected by client address. TDS 194J/194C flag included.',
  },
  {
    icon: IndianRupee,
    iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600',
    title: 'Razorpay + UPI embedded',
    desc: 'Payment link inside every invoice. Client pays via UPI, card, net banking, or EMI in one tap.',
  },
  {
    icon: Bell,
    iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600',
    title: 'Real-time proposal tracking',
    desc: 'The moment a client opens your proposal, you get a push alert. See which page they read and for how long.',
    tag: 'Aha moment',
  },
  {
    icon: MessageSquare,
    iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600',
    title: 'WhatsApp-first reminders',
    desc: 'Payment reminders at 3, 7, 14 days overdue via WhatsApp — not just email. 98% open rate in India.',
  },
  {
    icon: Shield,
    iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600',
    title: 'E-sign — IT Act 2000',
    desc: 'OTP-verified digital signature. Legally binding under India\'s IT Act 2000. Timestamped audit trail PDF auto-generated.',
  },
  {
    icon: Landmark,
    iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600',
    title: 'GST report for your CA',
    desc: 'Quarter-wise GST summary export. CA-ready PDF you can share on WhatsApp. Save on CA fees every quarter.',
  },
  {
    icon: Zap,
    iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600',
    title: 'Proposal → contract in 1 click',
    desc: 'Client accepts proposal — contract generated with all scope, price, and timelines pre-filled. Sign in 3 minutes.',
  },
  {
    icon: Users,
    iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600',
    title: 'White-label client portal',
    desc: 'Every client gets a branded portal at your domain. Proposals, contracts, invoices — all in one place.',
  },
  {
    icon: FolderKanban,
    iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600',
    title: 'Project tracking',
    desc: 'Group proposals, invoices, time entries, and expenses under one project. See profit per engagement at a glance.',
  },
]


export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <FadeIn className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            The moat
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tight">
            Features HoneyBook{' '}
            <span className="line-through text-gray-300">can't build.</span>
            <br />
            <span className="gradient-text">We built every one.</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
            GST, TDS, Razorpay, WhatsApp — the US tools will never build these.
            That gap is the entire business.
          </p>
        </FadeIn>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.05}>
              <div className="group h-full p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${f.iconBg} group-hover:scale-105 transition-transform duration-200`}>
                  <f.icon size={20} className={f.iconColor} />
                </div>

                {/* Title + optional tag */}
                <div className="mb-2 flex items-start gap-2 flex-wrap">
                  <h3 className="font-bold text-gray-900 text-base leading-snug">{f.title}</h3>
                  {f.tag && (
                    <span className="flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-100 mt-0.5">
                      {f.tag}
                    </span>
                  )}
                </div>

                <p className="text-gray-500 text-sm leading-relaxed flex-1">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
