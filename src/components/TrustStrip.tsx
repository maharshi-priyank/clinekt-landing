import {
  ShieldCheck, FileCheck, Lock, BadgeCheck, IndianRupee, Landmark,
  Zap, Users, Wallet, CheckCircle2, Star, Globe,
} from 'lucide-react'

const items = [
  { icon: IndianRupee, label: 'UPI · Cards · Net banking', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: FileCheck,   label: 'GST e-invoice ready',       color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: BadgeCheck,  label: 'OTP e-sign contracts',      color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { icon: Lock,        label: 'AES-256 encrypted',         color: 'text-slate-700', bg: 'bg-slate-100' },
  { icon: Landmark,    label: '99.9% uptime SLA',          color: 'text-orange-600', bg: 'bg-orange-50' },
  { icon: ShieldCheck, label: 'IT Act 2000 compliant',     color: 'text-rose-600', bg: 'bg-rose-50' },
  { icon: Zap,         label: 'Proposal → paid in minutes',color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Users,       label: 'White-label client portal', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Wallet,      label: 'Zero transaction fees',     color: 'text-teal-600', bg: 'bg-teal-50' },
  { icon: CheckCircle2,label: 'No credit card needed',     color: 'text-green-600', bg: 'bg-green-50' },
  { icon: Star,        label: '15-day free Pro trial',       color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { icon: Globe,       label: 'Built for India',           color: 'text-pink-600', bg: 'bg-pink-50' },
]

/* Duplicate array for seamless wrap */
const doubled = [...items, ...items]

function BadgeItem({ icon: Icon, label, color, bg }: typeof items[0]) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shrink-0
      bg-white border border-stone-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)]
      select-none"
    >
      <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
        <Icon size={13} className={color} strokeWidth={2} />
      </div>
      <span className="text-[12px] font-medium text-stone-700 whitespace-nowrap">{label}</span>
    </div>
  )
}

export default function TrustStrip() {
  return (
    <section
      className="relative overflow-hidden py-9"
      style={{ background: '#FFFFFF' }}
    >
      {/* Top + bottom fades to bleed softly */}
      <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #FFFFFF 0%, transparent 100%)' }} />
      <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, #FFFFFF 0%, transparent 100%)' }} />

      {/* Label row */}
      <p className="text-center text-[11px] font-semibold text-stone-400 uppercase tracking-[0.14em] mb-5">
        Trusted by freelancers · Built for India
      </p>

      {/* Row 1 — forward */}
      <div className="overflow-hidden mb-3">
        <div className="flex gap-3 marquee-track" style={{ width: 'max-content' }}>
          {doubled.map((item, i) => (
            <BadgeItem key={i} {...item} />
          ))}
        </div>
      </div>

      {/* Row 2 — reverse (offset by half) */}
      <div className="overflow-hidden">
        <div
          className="flex gap-3 marquee-track-reverse"
          style={{ width: 'max-content', transform: 'translateX(-50%)' }}
        >
          {doubled.map((_item, i) => (
            <BadgeItem key={i} {...items[(i + 4) % items.length]} />
          ))}
        </div>
      </div>

      {/* Trustpilot CTA */}
      <div className="flex justify-center mt-5">
        <a
          href="https://www.trustpilot.com/review/getclearwork.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            border border-stone-200 bg-white shadow-sm
            text-[11px] font-medium text-stone-600
            hover:border-stone-300 hover:shadow-md transition-all duration-200"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#00b67a">
            <path d="M12 2l2.938 6.326L22 9.274l-5 4.869 1.18 6.857L12 17.77l-6.18 3.23L7 14.143 2 9.274l7.062-.948L12 2z"/>
          </svg>
          <span>Leave us a review on Trustpilot</span>
        </a>
      </div>
    </section>
  )
}
