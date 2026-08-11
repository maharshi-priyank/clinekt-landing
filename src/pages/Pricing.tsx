import { motion } from 'framer-motion'
import { ArrowRight, Plus, Sparkles } from 'lucide-react'
import { useSeo } from '../lib/useSeo'
import PricingSection from '../components/PricingSection'
import AffordabilitySection from '../components/AffordabilitySection'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const APP_URL = 'https://app.getclearwork.in/signup'

const faqs = [
  {
    q: 'Do I get a free trial?',
    a: 'Yes. Every new account automatically starts with a 15-day free trial of the Pro plan — full access, no credit card required, nothing to set up. If you don\'t upgrade to a paid plan before the trial ends, you\'re automatically moved to the Free plan — no action needed on your part, and you\'re never charged without opting in.',
  },
  {
    q: 'Is ClearWork really free to start?',
    a: 'Yes. After your 15-day Pro trial, the Free plan is free forever — up to 5 clients and 10 active projects, with the full lead & CRM pipeline, GST invoicing, and basic e-sign included. No credit card required at any point unless you choose to upgrade.',
  },
  {
    q: 'What happens when I hit the Free plan limits?',
    a: 'You\'ll be prompted to upgrade to Pro (₹149/mo) or Studio (₹649/mo) once you pass 5 clients or 10 active projects. Your existing data is never locked or deleted — you just can\'t add more until you upgrade.',
  },
  {
    q: 'Do you take a cut of my payments?',
    a: 'No. ClearWork charges a flat monthly subscription — never a percentage of what you earn. Payments you collect via UPI, card, or net banking go straight to you.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes, you can upgrade or downgrade anytime from your account settings. Your data, clients, and history stay exactly as they are.',
  },
  {
    q: 'What\'s the difference between Pro and Studio?',
    a: 'Pro (₹149/mo) is built for a single freelancer or consultant — up to 30 clients, 60 projects, and 5 team members. Studio (₹649/mo) removes the limits entirely — unlimited clients, projects, and team members — and adds white-labelled documents, a white-labelled client portal, and multi-currency invoicing, built for agencies managing multiple clients.',
  },
]

export default function Pricing() {
  useSeo(
    'ClearWork Pricing — Free 15-Day Pro Trial, Then Free, Pro & Studio Plans',
    'Every new ClearWork account gets a free 15-day trial of Pro. Then choose Free (\u20b90, up to 5 clients), Pro (\u20b9149/mo, up to 30 clients), or Studio (\u20b9649/mo, unlimited). No credit card required, no transaction fees, ever.',
    'https://getclearwork.in/pricing',
  )

  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto px-5 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-6">
              <Sparkles size={11} className="text-emerald-500" />
              Pricing
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.05]">
              Free 15-day Pro trial.{' '}
              <span className="gradient-text">Then pick what fits.</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
              Every new account starts with full Pro access for 15 days — no credit card.
              Don't upgrade? You're automatically moved to the Free plan, no action needed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing cards (shared component) ── */}
      <PricingSection />

      {/* ── Affordability ── */}
      <AffordabilitySection className="py-20 bg-gray-50/60 border-y border-gray-100" />

      {/* ── FAQ ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              FAQs
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Pricing questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(f => (
              <details key={f.q} className="group rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 [&_summary]:cursor-pointer">
                <summary className="flex items-center justify-between gap-4 list-none">
                  <span className="text-[14.5px] font-semibold text-gray-900">{f.q}</span>
                  <span className="text-gray-400 group-open:rotate-45 transition-transform shrink-0"><Plus size={16} /></span>
                </summary>
                <p className="mt-3 text-[13.5px] text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight">
            Try Pro free for 15 days. Upgrade whenever you're ready.
          </h2>
          <a href={APP_URL}
            className="inline-flex items-center justify-center gap-2 mt-7 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
            Start free trial
            <ArrowRight size={15} />
          </a>
          <p className="text-xs text-gray-400 mt-3">15-day free Pro trial · Then Free plan forever · No credit card needed</p>
        </div>
      </section>
    </div>
  )
}
