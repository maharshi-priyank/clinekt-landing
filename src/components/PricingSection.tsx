import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Star, Zap } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const APP_URL = 'https://app.getclearwork.in/signup'

const CURRENCIES = [
  { code: 'INR', symbol: '₹', rate: 1,    label: '₹ INR' },
  { code: 'USD', symbol: '$', rate: 84,   label: '$ USD' },
  { code: 'EUR', symbol: '€', rate: 91,   label: '€ EUR' },
  { code: 'GBP', symbol: '£', rate: 107,  label: '£ GBP' },
  { code: 'AED', symbol: 'AED', rate: 23, label: 'AED' },
] as const

type CurrencyCode = typeof CURRENCIES[number]['code']

function formatPrice(inr: number, currency: typeof CURRENCIES[number]): string {
  if (currency.code === 'INR') return `${currency.symbol}${inr.toLocaleString('en-IN')}`
  const converted = inr / currency.rate
  const rounded = converted < 5 ? Math.ceil(converted * 10) / 10 : Math.round(converted)
  if (currency.code === 'AED') return `AED ${rounded}`
  return `${currency.symbol}${rounded}`
}

const plans = [
  {
    name: 'Free',
    monthly: 0,
    foundingPrice: null,
    regularPrice: null,
    desc: 'Try before you buy. No card needed.',
    features: ['3 active projects', '3 proposals / month', 'GST invoice generator', 'Basic e-sign', 'ClearWork watermark on docs', 'Community support'],
    cta: 'Get started free',
    ctaHref: APP_URL,
    ctaClass: 'bg-gray-900 text-white hover:bg-gray-800',
    highlight: false,
  },
  {
    name: 'Solo',
    monthly: 149,
    foundingPrice: 149,
    regularPrice: 299,
    desc: 'For solo freelancers earning ₹30k+/mo.',
    features: [
      'Up to 25 clients',
      'Unlimited projects & leads',
      'E-sign contract (IT Act 2000)',
      'GST invoice + TDS flagging',
      'UPI + card payment link in invoices',
      'Auto payment reminders',
      'Client portal',
      'Revenue dashboard',
      'AI proposal drafter',
      'Email support',
    ],
    cta: 'Get started free',
    ctaHref: APP_URL,
    ctaClass: 'bg-gray-950 text-white hover:bg-gray-800 shadow-sm',
    highlight: true,
  },
  {
    name: 'Studio',
    monthly: 349,
    foundingPrice: 349,
    regularPrice: 699,
    desc: 'For agencies with 2–10 team members.',
    features: [
      'Everything in Solo',
      'Unlimited clients',
      '1 team member seat',
      'White-label documents (no "Powered by ClearWork")',
      'White-label client portal',
      'Multi-currency invoicing',
      'GST report export',
      'AI proposal drafter',
      'Priority email support',
    ],
    cta: 'Get started free',
    ctaHref: APP_URL,
    ctaClass: 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300',
    highlight: false,
  },
]

const benchmarks = [
  { name: 'ClearWork Solo', price: '₹149/mo', note: 'Full India workflow ✓', good: true },
  { name: 'Bonsai Essential', price: '₹1,600/mo', note: 'No GST, no India support', good: false },
  { name: 'HoneyBook Starter', price: '₹3,000/mo', note: 'Blocked in India', good: false },
  { name: 'Dubsado Basic', price: '₹2,500/mo', note: 'No UPI payments, USD only', good: false },
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
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('INR')
  const currency = CURRENCIES.find(c => c.code === currencyCode)!

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

          {/* Founding badge */}
          <div className="inline-flex items-center gap-2 mt-8 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold">
            <Star size={13} className="fill-amber-500 text-amber-500" />
            Founding pricing active — ends Aug 31, 2026
          </div>

          {/* Currency selector */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {CURRENCIES.map(c => (
              <button
                key={c.code}
                onClick={() => setCurrencyCode(c.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  currencyCode === c.code
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          {currencyCode !== 'INR' && (
            <p className="text-xs text-gray-400 mt-2">
              Approximate · Billing always in ₹ INR
            </p>
          )}
        </FadeIn>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch mb-12">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.08}>
              <div className={`relative h-full rounded-2xl flex flex-col p-6 transition-all duration-300 ${
                plan.highlight
                  ? 'bg-white border-2 border-indigo-500 shadow-2xl shadow-indigo-100 md:scale-[1.02]'
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
                        <span className="text-4xl font-bold text-gray-900 tabular-nums">
                          {formatPrice(plan.monthly, currency)}
                        </span>
                        <span className="text-gray-400 text-sm font-medium">/mo</span>
                      </div>
                      {plan.regularPrice && (
                        <p className="text-xs text-gray-400 mt-1">
                          <span className="line-through">{formatPrice(plan.regularPrice, currency)}/mo</span>
                          {' '}after Aug 31
                        </p>
                      )}
                      {currencyCode !== 'INR' && (
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          ₹{plan.monthly.toLocaleString('en-IN')}/mo · approx.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <a href={plan.ctaHref}
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
              <span className="font-bold text-gray-900 text-sm">Why ClearWork wins on price</span>
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
