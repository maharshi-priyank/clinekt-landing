import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2, UserSearch, FileText, PenLine, Receipt, CheckCircle } from 'lucide-react'
import { useWaitlistCount } from '../hooks/useWaitlistCount'
import { trackWaitlistClick } from '../lib/analytics'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
const SIGNUP_URL = 'https://app.getclearwork.in/signup'

/* Full business workflow — lead to project done */
const flow = [
  { icon: UserSearch, label: 'Lead',     color: 'text-sky-400',    bg: 'bg-sky-400/10'    },
  { icon: FileText,   label: 'Proposal', color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { icon: PenLine,    label: 'Contract', color: 'text-violet-400', bg: 'bg-violet-400/10' },
  { icon: Receipt,    label: 'Invoice',  color: 'text-amber-400',  bg: 'bg-amber-400/10'  },
  { icon: CheckCircle,label: 'Done',     color: 'text-emerald-400',bg: 'bg-emerald-400/10'},
]

const perks = [
  '15-day free Pro trial',
  'No credit card required',
  'GST + UPI + e-sign built-in',
]

export default function WaitlistSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useWaitlistCount()

  return (
    <section
      id="waitlist"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#0C0A09' }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-dark pointer-events-none opacity-60" />

      {/* Centered radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 55% at 50% 40%, rgba(79,70,229,0.16) 0%, transparent 70%)',
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 pt-28 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
          className="flex flex-col items-center"
        >

          {/* Live badge */}
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold
            border border-white/10 bg-white/5 text-white/55 mb-10">
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              style={{ animation: 'glow-pulse 2.2s ease-in-out infinite' }}
            />
            Now live · Free 15-day Pro trial
          </span>

          {/* Workflow strip — shows the end-to-end promise */}
          <motion.div
            className="flex items-center gap-2 mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            {flow.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${step.bg} border border-white/6`}>
                  <step.icon size={13} className={step.color} strokeWidth={2} />
                  <span className={`text-[12px] font-semibold ${step.color}`}>{step.label}</span>
                </div>
                {i < flow.length - 1 && (
                  <ArrowRight size={13} className="text-white/18 shrink-0" />
                )}
              </div>
            ))}
          </motion.div>

          {/* Headline */}
          <h2
            className="font-black text-white leading-[1.02] tracking-tight mb-5"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '-0.03em' }}
          >
            Your entire business.
            <br />
            <span
              className="serif-accent"
              style={{
                fontSize: 'clamp(38px, 6.2vw, 75px)',
                background: 'linear-gradient(135deg, #C7D2FE 0%, #A5B4FC 50%, #818CF8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 400,
              }}
            >
              One platform.
            </span>
          </h2>

          {/* Sub */}
          <p
            className="text-white/45 leading-relaxed mb-10"
            style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', maxWidth: 520 }}
          >
            Stop juggling 5+ tools. ClearWork is the all-in-one platform for service businesses in
            India — freelancers, consultants, and agencies — from capturing your first lead to
            getting the project done and paid. Proposals, e-sign contracts, GST invoices, UPI
            payments, and project tracking, all connected.
          </p>

          {/* CTA */}
          <motion.a
            href={SIGNUP_URL}
            onClick={() => trackWaitlistClick('waitlist_section')}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 36px rgba(245,158,11,0.28)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full
              bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[15px]
              shadow-[0_4px_24px_rgba(245,158,11,0.25)] transition-colors duration-200"
          >
            Start your free 15-day trial
            <ArrowRight size={16} />
          </motion.a>

          {/* Perks */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-5">
            {perks.map(p => (
              <span key={p} className="flex items-center gap-1.5 text-sm text-white/35">
                <CheckCircle2 size={12} className="text-emerald-500" strokeWidth={2.5} />
                {p}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div
            className="w-full mt-16 pt-10 grid grid-cols-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {[
              { val: count !== null && count > 50 ? `${count.toLocaleString('en-IN')}+` : '150+', label: 'freelancers & agencies' },
              { val: '5+',   label: 'tools replaced' },
              { val: '₹0',   label: 'to get started' },
            ].map((s, i) => (
              <div
                key={s.label}
                className="text-center px-4"
                style={i > 0 ? { borderLeft: '1px solid rgba(255,255,255,0.07)' } : {}}
              >
                <div
                  className="font-black text-white"
                  style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', letterSpacing: '-0.025em' }}
                >
                  {s.val}
                </div>
                <div className="text-xs text-white/30 mt-1.5 font-medium">{s.label}</div>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}
