import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import { submitWaitlist } from '../lib/waitlist'
import { useWaitlistCount } from '../hooks/useWaitlistCount'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const NOISE = "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"

const perks = [
  'Free plan forever',
  'Early bird ₹299/mo — locked for life',
  'Vote on features we build next',
  'No credit card required',
]

const FOUNDING_CAP = 100

export default function WaitlistSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const count = useWaitlistCount()

  const spotsLeft = count !== null ? Math.max(0, FOUNDING_CAP - count) : null
  const foundingFull = spotsLeft !== null && spotsLeft <= 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')
    try {
      await submitWaitlist(email)
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="waitlist"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f0ece6 0%, #e6dfd5 40%, #d8dbd5 75%, #ccd8e2 100%)' }}
      ref={ref}
    >
      {/* Noise texture — matches Hero */}
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
            Now accepting early access signups
          </span>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-950 leading-tight tracking-tight mb-5">
            Stop juggling tools.{' '}
            <br className="hidden sm:block" />
            <span className="gradient-text">Start getting paid.</span>
          </h2>

          {/* Founding member urgency banner */}
          {!foundingFull && (
            <div
              className="flex items-start gap-2.5 rounded-xl px-4 py-3 mb-8 border border-white/70 max-w-md mx-auto text-left"
              style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(8px)' }}
            >
              <Zap size={15} className="text-amber-500 shrink-0" />
              <p className="text-sm text-amber-800 font-medium text-left">
                <strong>Founding member offer:</strong> First {FOUNDING_CAP} signups lock ₹299/mo for life
                {spotsLeft !== null && spotsLeft > 0 && (
                  <span className="ml-1 font-bold text-amber-900">— {spotsLeft} spot{spotsLeft === 1 ? '' : 's'} left</span>
                )}
              </p>
            </div>
          )}

          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            {count !== null
              ? <><strong className="text-gray-900">{count.toLocaleString('en-IN')}</strong> Indian freelancers already on the waitlist. Early bird pricing at ₹299/mo — locked for life.</>
              : <>Join Indian freelancers on the waitlist. Early bird pricing at ₹299/mo — locked for life.</>
            }
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              className="py-10 flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100">
                <CheckCircle2 size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">You're on the list!</h3>
              <p className="text-gray-600">
                We'll reach out at <strong className="text-gray-900">{email}</strong> when it's your turn.
              </p>
              <p className="text-sm text-gray-500">
                Meanwhile, tell a fellow freelancer — they'll thank you for it.
              </p>
            </motion.div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required
                  className="flex-1 px-5 py-4 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent shadow-sm text-sm border border-white/80"
                  style={{ background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(8px)' }}
                />
                <button type="submit" disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 disabled:opacity-60 transition-all flex-shrink-0 shadow-sm">
                  {loading
                    ? <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    : <><span>Get early access</span><ArrowRight size={16} /></>
                  }
                </button>
              </form>
              {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
            </>
          )}

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
              { val: count !== null ? count.toLocaleString('en-IN') : '—', label: 'on the waitlist' },
              { val: '₹299/mo', label: 'early bird price' },
              { val: '₹699/mo', label: 'launch price' },
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
