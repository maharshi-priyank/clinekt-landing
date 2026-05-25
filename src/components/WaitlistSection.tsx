import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const perks = [
  'Free plan forever',
  'Early bird price ₹299/mo — locked for life',
  'Vote on features we build next',
  'No credit card required',
]

export default function WaitlistSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section id="waitlist" className="py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-5 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Now accepting early access signups
          </span>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-950 leading-tight tracking-tight mb-5">
            Stop juggling tools.{' '}
            <br className="hidden sm:block" />
            <span className="gradient-text">Start getting paid.</span>
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join 500+ Indian freelancers already on the waitlist.
            Early bird pricing at ₹299/mo — locked for life.
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
              <p className="text-gray-500">
                We'll reach out at <strong className="text-gray-900">{email}</strong> when it's your turn.
              </p>
              <p className="text-sm text-gray-400">
                Meanwhile, tell a fellow freelancer — they'll thank you for it.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" required
                className="flex-1 px-5 py-4 rounded-2xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm text-sm"
              />
              <button type="submit" disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 disabled:opacity-60 transition-all flex-shrink-0 shadow-sm">
                {loading
                  ? <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  : <><span>Get early access</span><ArrowRight size={16} /></>
                }
              </button>
            </form>
          )}

          {/* Perks */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6">
            {perks.map(p => (
              <span key={p} className="flex items-center gap-1.5 text-sm text-gray-500">
                <CheckCircle2 size={13} className="text-emerald-500" strokeWidth={2.5} />
                {p}
              </span>
            ))}
          </div>

          {/* Numbers */}
          <div className="flex flex-wrap justify-center gap-10 mt-14 pt-10 border-t border-gray-100">
            {[
              { val: '500+', label: 'on the waitlist' },
              { val: '₹299/mo', label: 'early bird price' },
              { val: '₹699/mo', label: 'launch price' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{s.val}</div>
                <div className="text-xs text-gray-400 mt-0.5 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
