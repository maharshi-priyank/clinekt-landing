import { useState } from 'react'
import { Check, Sparkles, Zap } from 'lucide-react'
import { FadeIn } from './ui/FadeIn'

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
    tagline: 'For getting started',
    price: 0,
    regularPrice: 0,
    limits: ['Up to 2 active clients', 'Up to 10 active projects'],
    features: [
      'Full lead & CRM pipeline — unlimited leads',
      '3 proposals / month',
      'GST invoice generator',
      'Meetings & reminders',
      '"Powered by ClearWork" branding on docs',
      'Community support',
    ],
    cta: 'Get started — it\'s free',
    ctaHref: APP_URL,
    ctaClass: 'bg-gray-900 text-white hover:bg-gray-800',
    highlight: false,
  },
  {
    name: 'Pro',
    tagline: 'For solo freelancers',
    price: 249,
    regularPrice: 249,
    limits: ['Unlimited clients', 'Unlimited projects', '1 seat — just you'],
    features: [
      'Unlimited proposals, invoices & leads',
      'E-sign contracts (IT Act 2000)',
      'GST invoice + TDS flagging',
      'UPI + card payment link in invoices',
      'Auto WhatsApp + email payment reminders',
      'White-label client portal',
      'Revenue dashboard',
      'AI proposal drafter',
      'Priority email support',
    ],
    cta: 'Try free for 15 days',
    ctaHref: APP_URL,
    ctaClass: 'bg-gray-950 text-white hover:bg-gray-800 shadow-sm',
    highlight: true,
  },
  {
    name: 'Studio',
    tagline: 'For agencies at scale',
    price: 799,
    regularPrice: 799,
    limits: ['Unlimited clients', 'Unlimited projects', 'Unlimited team members'],
    features: [
      'Everything in Pro',
      'White-label documents — no ClearWork branding',
      'White-label client portal on your domain',
      'Custom domain for client portal',
      'Multi-currency invoicing',
      'Team roles & task allocation',
      'Dedicated priority support',
    ],
    cta: 'Try free for 15 days',
    ctaHref: APP_URL,
    ctaClass: 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300',
    highlight: false,
  },
]

const benchmarks = [
  { name: 'ClearWork Pro', price: '₹249/mo', note: 'Full India workflow ✓', good: true },
  { name: 'Bonsai Essential', price: '₹1,600/mo', note: 'No GST, no India support', good: false },
  { name: 'HoneyBook Starter', price: '₹3,000/mo', note: 'Blocked in India', good: false },
  { name: 'Dubsado Basic', price: '₹2,500/mo', note: 'No UPI payments, USD only', good: false },
]

export default function PricingSection() {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('INR')
  const currency = CURRENCIES.find(c => c.code === currencyCode)!

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <FadeIn className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Simple pricing.{' '}
            <span className="gradient-text">Priced for any business.</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
            Pro is ₹249/month — less than the cost of a single takeaway lunch — so solo freelancers
            can afford the same workflow bigger studios use. No transaction fees on your earnings, ever.
          </p>

          {/* Trial badge */}
          <div className="inline-flex items-center gap-2 mt-8 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold">
            <Sparkles size={13} className="text-emerald-600" />
            Every new account gets a free 15-day Pro trial — no credit card needed
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
                      <Sparkles size={11} />
                      Most popular
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{plan.tagline}</p>
                </div>

                <div className="mb-6">
                  {plan.regularPrice > plan.price && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-amber-50 text-amber-700 border border-amber-200 mb-2">
                      Early Access Offer
                    </span>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price > 0 ? formatPrice(plan.price, currency) : 'Free'}
                    </span>
                    {plan.price > 0 && <span className="text-sm text-gray-400 font-medium">/mo</span>}
                    {plan.regularPrice > plan.price && (
                      <span className="text-base text-gray-400 line-through">{formatPrice(plan.regularPrice, currency)}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">
                    {plan.price > 0 ? 'Billed monthly, cancel anytime' : 'Free forever, no catch'}
                  </p>

                  {currencyCode !== 'INR' && plan.price > 0 && (
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      ₹{plan.price.toLocaleString('en-IN')}/mo · billed in INR
                    </p>
                  )}
                </div>

                <a href={plan.ctaHref}
                  className={`block text-center py-3 px-5 rounded-xl font-bold text-sm transition-all duration-200 mb-6 ${plan.ctaClass}`}>
                  {plan.cta}
                </a>

                {/* Usage limits — called out first, matching a plan-at-a-glance style */}
                <ul className="space-y-2.5 pb-3 mb-3 border-b border-gray-100">
                  {plan.limits.map(l => (
                    <li key={l} className="flex items-start gap-2.5">
                      <Check size={14} strokeWidth={2.5} className="flex-shrink-0 mt-0.5 text-indigo-500" />
                      <span className="text-sm font-semibold text-gray-800">{l}</span>
                    </li>
                  ))}
                </ul>

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

        {/* Trial explainer */}
        <FadeIn delay={0.15}>
          <p className="text-center text-sm text-gray-500 mb-10 max-w-2xl mx-auto">
            Sign up and every account starts with a <strong className="text-gray-700">free 15-day trial of Pro</strong> —
            no credit card, nothing to cancel. If you don't upgrade, you're automatically moved to the Free plan above
            once the trial ends.
          </p>
        </FadeIn>

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
