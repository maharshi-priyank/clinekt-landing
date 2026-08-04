import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import { useWaitlistCount } from '../hooks/useWaitlistCount'
import { trackWaitlistClick } from '../lib/analytics'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const NOISE = "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"

const perks = [
  'Full Studio access — free right now',
  'Vote on features we build next',
  'No credit card required',
  'Early pricing locked before public launch',
]

const SIGNUP_URL = 'https://app.getclearwork.in/signup'

export default function WaitlistSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useWaitlistCount()

  return (
    <section
      id="waitlist"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f7f4f1 0%, #f0ece6 40%, #eaecef 75%, #e4ecf4 100%)' }}
      ref={ref}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("${NOISE}")` }}
      />

      <div className="max-w-3xl mx-auto px-5 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
        >
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600 shadow-sm mb-6 border border-white/80"
            style={{ background: 'rgba(255,255,255,0.60)', backdropFilter: 'blur(8px)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Now open — start for free
          </span>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-950 leading-tight tracking-tight mb-5">
            Stop juggling tools.{' '}
            <br className="hidden sm:block" />
            <span className="gradient-text">Start getting paid.</span>
          </h2>

          {/* Early access banner */}
          <div
            className="flex items-start gap-2.5 rounded-xl px-4 py-3 mb-8 border border-white/70 max-w-md mx-auto text-left"
            style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(8px)' }}
          >
            <Zap size={15} className="text-emerald-500 shrink-0" />
            <p className="text-sm text-emerald-800 font-medium text-left">
              <strong>Early access is free:</strong> Full Studio plan at no cost while we build with you.
            </p>
          </div>

          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            {count !== null
              ? <><strong className="text-gray-900">{count.toLocaleString('en-IN')}</strong> freelancers & agencies already using ClearWork. Free during early access — no credit card required.</>
              : <>Join Indian freelancers & agencies. Free during early access — use everything, no credit card required.</>
            }
          </p>

          <a
            href={SIGNUP_URL}
            onClick={() => trackWaitlistClick('waitlist_section')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-sm"
          >
            Get early access
            <ArrowRight size={16} />
          </a>

          {/* Perks */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6">
            {perks.map(p => (
              <span key={p} className="flex items-center gap-1.5 text-sm text-gray-600">
                <CheckCircle2 size={13} className="text-emerald-600" strokeWidth={2.5} />
                {p}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 mt-14 pt-10 border-t border-white/40">
            {[
              { val: count !== null ? count.toLocaleString('en-IN') : '—', label: 'using ClearWork' },
              { val: '₹0', label: 'cost right now' },
              { val: '100%', label: 'features included' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{s.val}</div>
                <div className="text-xs text-gray-600 mt-0.5 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
