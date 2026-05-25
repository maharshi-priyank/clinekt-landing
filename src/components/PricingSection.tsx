import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Star, Zap } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const plans = [
  {
    name: 'Free',
    monthly: 0, annual: 0,
    desc: 'Try before you buy. No card needed.',
    features: ['3 active projects', '3 proposals / month', 'GST invoice generator', 'Basic e-sign', 'Clinekt watermark on docs', 'Community support'],
    cta: 'Get started free',
    ctaClass: 'bg-gray-900 text-white hover:bg-gray-800',
    highlight: false,
  },
  {
    name: 'Solo',
    monthly: 699, annual: 6999,
    desc: 'For solo freelancers earning ₹30k+/mo.',
    features: [
      'Unlimited projects & leads',
      'Proposal tracking + WhatsApp alerts',
      'E-sign contract (IT Act 2000)',
      'GST invoice + TDS flagging',
      'Razorpay + UPI in invoices',
      'Auto payment reminders',
      'Client portal (branded)',
      'Revenue dashboard',
      'Remove Clinekt watermark',
      'Email support',
    ],
    cta: 'Join waitlist',
    ctaClass: 'bg-gray-950 text-white hover:bg-gray-800 shadow-sm',
    highlight: true,
  },
  {
    name: 'Studio',
    monthly: 1799, annual: 17999,
    desc: 'For agencies with 2–10 team members.',
    features: [
      'Everything in Solo',
      '5 team members',
      'White-label portal domain',
      'AI follow-up message drafter',
      'WhatsApp bot for lead capture',
      'Automation builder',
      'Team inbox',
      'Multi-currency invoicing',
      'GST report export',
      'Priority WhatsApp support',
    ],
    cta: 'Join waitlist',
    ctaClass: 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300',
    highlight: false,
  },
]

const benchmarks = [
  { name: 'Clinekt Solo', price: '₹699/mo', note: 'Full India workflow ✓', good: true },
  { name: 'Bonsai Essential', price: '₹1,600/mo', note: 'No GST, no India support', good: false },
  { name: 'HoneyBook Starter', price: '₹3,000/mo', note: 'Blocked in India', good: false },
  { name: 'Dubsado Basic', price: '₹2,500/mo', note: 'No Razorpay, USD only', good: false },
]

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

export default function PricingSection() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-5">
        <FadeIn className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Simple pricing.{' '}
            <span className="gradient-text">No surprises.</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
            No transaction fees on your earnings. We earn from subscriptions —
            not by taking a cut of your work.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm font-semibold transition-colors ${!annual ? 'text-gray-900' : 'text-gray-400'}`}>Monthly</span>
            <button onClick={() => setAnnual(!annual)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${annual ? 'bg-indigo-600' : 'bg-gray-200'}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${annual ? 'left-5.5' : 'left-0.5'}`} style={{ left: annual ? '22px' : '2px' }} />
            </button>
            <span className={`text-sm font-semibold transition-colors ${annual ? 'text-gray-900' : 'text-gray-400'}`}>
              Annual{' '}
              <span className="text-emerald-600 font-bold">save 17%</span>
            </span>
          </div>
        </FadeIn>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch mb-12">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.08}>
              <div className={`relative h-full rounded-2xl flex flex-col p-6 transition-all duration-300 ${
                plan.highlight
                  ? 'bg-white border-2 border-indigo-500 shadow-2xl shadow-indigo-100 scale-[1.02]'
                  : 'bg-white border border-gray-200 shadow-sm'
              }`}>
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-gray-950 text-white shadow-md">
                      <Star size={11} className="fill-white" />
                      Most popular
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{plan.desc}</p>
                </div>

                <div className="mb-6">
                  {plan.monthly === 0 ? (
                    <span className="text-4xl font-bold text-gray-900">Free</span>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-gray-900">
                          ₹{annual
                            ? Math.round(plan.annual / 12).toLocaleString('en-IN')
                            : plan.monthly.toLocaleString('en-IN')}
                        </span>
                        <span className="text-gray-400 text-sm font-medium">/mo</span>
                      </div>
                      {annual && (
                        <p className="text-xs text-emerald-600 font-semibold mt-1">
                          ₹{plan.annual.toLocaleString('en-IN')} billed annually
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <a href="#waitlist"
                  className={`block text-center py-3 px-5 rounded-xl font-bold text-sm transition-all duration-200 mb-6 ${plan.ctaClass}`}>
                  {plan.cta}
                </a>

                <ul className="space-y-2.5 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={14} strokeWidth={2.5}
                        className={`flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-indigo-500' : 'text-gray-400'}`} />
                      <span className="text-sm text-gray-600">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Benchmark comparison */}
        <FadeIn delay={0.2}>
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Zap size={16} className="text-indigo-600" />
              <span className="font-bold text-gray-900 text-sm">Why Clinekt wins on price</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {benchmarks.map(b => (
                <div key={b.name} className={`p-4 rounded-xl border ${b.good ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="text-xs text-gray-500 font-medium mb-1">{b.name}</div>
                  <div className={`text-lg font-bold ${b.good ? 'text-indigo-700' : 'text-gray-700'}`}>{b.price}</div>
                  <div className={`text-xs mt-1 font-semibold ${b.good ? 'text-emerald-600' : 'text-gray-400'}`}>{b.note}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
