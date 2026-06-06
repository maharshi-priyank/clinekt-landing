import {
  Calculator, IndianRupee, Bell, MessageSquare, Shield, Landmark, Zap, Users, FolderKanban,
} from 'lucide-react'
import { FadeIn } from './ui/FadeIn'

type BentoFeature = {
  icon: React.ElementType
  iconBg: string
  iconColor: string
  accent: string
  title: string
  desc: string
  tag?: string
  span: 1 | 2
}

const features: BentoFeature[] = [
  {
    icon: Calculator,
    iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', accent: 'from-indigo-50/70',
    title: 'GST auto-calculation',
    desc: 'CGST/SGST for same-state, IGST for cross-state — auto-detected by client address. TDS 194J/194C flag included. No spreadsheet, no CA needed.',
    tag: 'India-first',
    span: 2,
  },
  {
    icon: IndianRupee,
    iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', accent: 'from-emerald-50/50',
    title: 'Razorpay + UPI embedded',
    desc: 'Payment link inside every invoice. Client pays via UPI, card, net banking, or EMI in one tap.',
    span: 1,
  },
  {
    icon: Bell,
    iconBg: 'bg-amber-100', iconColor: 'text-amber-600', accent: 'from-amber-50/50',
    title: 'Real-time proposal tracking',
    desc: 'Know the exact moment a client opens your proposal and which page they dwell on.',
    tag: 'Aha moment',
    span: 1,
  },
  {
    icon: MessageSquare,
    iconBg: 'bg-green-100', iconColor: 'text-green-600', accent: 'from-green-50/50',
    title: 'WhatsApp-first reminders',
    desc: 'Payment chasers via WhatsApp at day 3, 7, 14 overdue. 98% open rate in India.',
    span: 1,
  },
  {
    icon: Shield,
    iconBg: 'bg-blue-100', iconColor: 'text-blue-600', accent: 'from-blue-50/50',
    title: 'E-sign — IT Act 2000',
    desc: 'OTP-verified digital signature, legally binding in India. Timestamped audit trail PDF auto-generated.',
    span: 1,
  },
  {
    icon: Users,
    iconBg: 'bg-violet-100', iconColor: 'text-violet-600', accent: 'from-violet-50/70',
    title: 'White-label client portal',
    desc: 'Every client gets a branded portal at your domain. Proposals, contracts, invoices — one link, your branding, zero setup.',
    span: 2,
  },
  {
    icon: Zap,
    iconBg: 'bg-orange-100', iconColor: 'text-orange-600', accent: 'from-orange-50/50',
    title: 'Proposal → contract in 1 click',
    desc: 'Client accepts → contract with scope, price, and timelines pre-filled. Signed in 3 minutes.',
    span: 1,
  },
  {
    icon: Landmark,
    iconBg: 'bg-rose-100', iconColor: 'text-rose-600', accent: 'from-rose-50/50',
    title: 'GST report for your CA',
    desc: 'Quarter-wise summary export. CA-ready PDF, shareable on WhatsApp in one tap.',
    span: 1,
  },
  {
    icon: FolderKanban,
    iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600', accent: 'from-cyan-50/50',
    title: 'Project tracking',
    desc: 'Group proposals, invoices, time entries, and expenses under one project. See profit per engagement at a glance.',
    span: 2,
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-32 bg-[#F8F9FC]">
      <div className="max-w-6xl mx-auto px-5">

        <FadeIn className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Built for India
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tight">
            Everything you need.{' '}
            <span className="font-medium text-gray-400">Nothing you don't.</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            GST, Razorpay, WhatsApp — tools US platforms will never prioritise.
            We built every one.
          </p>
        </FadeIn>

        {/* Bento grid — 3 cols on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <FadeIn
              key={f.title}
              delay={i * 0.045}
              className={f.span === 2 ? 'sm:col-span-2 lg:col-span-2' : ''}
            >
              <div className={`
                group h-full p-7 rounded-2xl bg-white border border-gray-100 shadow-sm
                hover:shadow-md hover:-translate-y-0.5 transition-all duration-200
                flex flex-col relative overflow-hidden
                bg-gradient-to-br ${f.accent} to-white
                ${f.span === 2 ? 'min-h-[148px]' : 'min-h-[140px]'}
              `}>
                {/* Icon row */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-10 h-10 rounded-xl ${f.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                    <f.icon size={18} className={f.iconColor} />
                  </div>
                  {f.tag && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 mt-0.5">
                      {f.tag}
                    </span>
                  )}
                </div>

                <h3 className={`font-bold text-gray-900 leading-snug mb-2 ${f.span === 2 ? 'text-[17px]' : 'text-[15px]'}`}>
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
