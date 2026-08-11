import { motion } from 'framer-motion'
import {
  ArrowRight, IndianRupee, Receipt, FileSignature, MessageCircle, CheckCircle2, X, Plus, Zap, Shield,
} from 'lucide-react'
import { useSeo } from '../lib/useSeo'
import { FadeIn } from '../components/ui/FadeIn'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const APP_URL = 'https://app.getclearwork.in/signup'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
      {children}
    </span>
  )
}

const comparison = [
  { label: 'Available in India', clearwork: true, others: false },
  { label: 'Price', clearwork: '₹149/mo (Pro), free plan forever', others: '$16+/mo (~₹1,340), USD only' },
  { label: 'Payment gateway', clearwork: 'Razorpay — UPI, cards, net banking', others: 'Stripe — no UPI, US bank accounts' },
  { label: 'GST invoicing (CGST/SGST/IGST)', clearwork: true, others: false },
  { label: 'E-sign valid under IT Act 2000', clearwork: true, others: false },
  { label: 'TDS tracking (194J/194C)', clearwork: true, others: false },
  { label: 'WhatsApp payment reminders', clearwork: true, others: false },
  { label: 'Proposals + contracts + invoicing', clearwork: true, others: true },
]

const reasons = [
  { icon: IndianRupee, title: 'It actually works in India', body: "HoneyBook's payment gateway is Stripe, which doesn't support Indian bank accounts for merchant payouts. Indian freelancers literally cannot receive client payments through HoneyBook." },
  { icon: Receipt, title: 'GST invoicing, built in', body: 'HoneyBook invoices have no GSTIN field, no CGST/SGST/IGST split, no SAC codes. ClearWork auto-calculates the right tax split for every invoice — Rule 46 compliant, every time.' },
  { icon: FileSignature, title: 'E-sign that holds up in Indian courts', body: "HoneyBook's e-signature isn't validated under India's IT Act 2000. ClearWork's OTP-based e-sign is legally enforceable under the IT Act 2000's Second Schedule." },
  { icon: MessageCircle, title: 'WhatsApp-first, not email-only', body: 'Your clients are on WhatsApp, not email. ClearWork sends automatic payment reminders at 3, 7, and 14 days overdue over WhatsApp.' },
]

const faqs = [
  {
    q: 'Is HoneyBook available in India?',
    a: 'No. HoneyBook is a US-only product — its payment processing runs exclusively on Stripe, which does not support Indian bank accounts for merchant payouts. Indian freelancers cannot create a working HoneyBook account and get paid through it.',
  },
  {
    q: 'What is the best HoneyBook alternative for Indian freelancers?',
    a: 'ClearWork is the closest India-ready equivalent — it covers the same proposals → contracts → invoicing → payments workflow as HoneyBook, but with GST invoicing, UPI payment collection via Razorpay, and OTP e-sign valid under the IT Act 2000.',
  },
  {
    q: 'How much does ClearWork cost compared to HoneyBook?',
    a: "HoneyBook's starter plan is $16/month (~₹1,340). ClearWork's Pro plan is ₹149/month — roughly 9x cheaper — with a free plan forever for up to 5 clients, no credit card required.",
  },
  {
    q: 'Can I use ClearWork if some of my clients are international?',
    a: 'Yes. ClearWork supports multi-currency invoicing on the Studio plan, and OTP e-sign works for any client with a phone number, regardless of location.',
  },
]

export default function HoneyBookAlternative() {
  useSeo(
    'HoneyBook Alternative for India — Actually Accepts Payments | ClearWork',
    'HoneyBook doesn\u2019t work in India \u2014 no UPI, no GST, Stripe-only payments. ClearWork is the India-ready HoneyBook alternative, from \u20b90/mo.',
    'https://getclearwork.in/honeybook-alternative',
  )

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <SectionLabel>HoneyBook alternative</SectionLabel>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.05]">
              The HoneyBook alternative{' '}
              <span className="gradient-text">that actually works in India.</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              HoneyBook is not available in India — its Stripe-only payment gateway can't pay out to
              Indian bank accounts. ClearWork gives you the same proposals-to-payments workflow, with
              GST invoicing, UPI payments, and IT Act 2000 e-sign built in.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <a href={APP_URL}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
                Start free trial
                <ArrowRight size={15} />
              </a>
              <a href="#compare"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-gray-700 font-semibold text-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
                See how it compares
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
              {['Actually works in India', 'GST + UPI built-in', '15-day free Pro trial'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-gray-400">
                  <CheckCircle2 size={12} className="text-emerald-500" strokeWidth={2.5} />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why switch ── */}
      <section className="py-20 bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-14">
            <SectionLabel>Why Indian freelancers can't use HoneyBook</SectionLabel>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              A beautiful tool that simply doesn't work here.
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {reasons.map(({ icon: Icon, title, body }, i) => (
              <FadeIn key={title} delay={i * 0.06}>
                <div className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section id="compare" className="py-20">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-12">
            <SectionLabel>Head to head</SectionLabel>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              ClearWork vs. HoneyBook
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              One of these can actually collect payment from an Indian client.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Feature</th>
                    <th className="text-left px-5 py-4 font-semibold text-indigo-600 text-xs uppercase tracking-wide">ClearWork</th>
                    <th className="text-left px-5 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">HoneyBook</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}>
                      <td className="px-5 py-4 font-medium text-gray-700 border-t border-gray-100">{row.label}</td>
                      <td className="px-5 py-4 border-t border-gray-100">
                        {typeof row.clearwork === 'boolean' ? (
                          row.clearwork ? <CheckCircle2 size={16} className="text-emerald-500" /> : <X size={16} className="text-gray-300" />
                        ) : (
                          <span className="text-gray-900 font-semibold">{row.clearwork}</span>
                        )}
                      </td>
                      <td className="px-5 py-4 border-t border-gray-100">
                        {typeof row.others === 'boolean' ? (
                          row.others ? <CheckCircle2 size={16} className="text-emerald-500" /> : <X size={16} className="text-gray-300" />
                        ) : (
                          <span className="text-gray-500">{row.others}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: IndianRupee, label: '₹149/mo vs $16/mo' },
                { icon: Zap, label: 'Payments that actually land' },
                { icon: Shield, label: 'IT Act 2000 e-sign' },
                { icon: MessageCircle, label: 'WhatsApp reminders' },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium">
                  <Icon size={14} className="text-indigo-300" />
                  {label}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

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
        <div className="max-w-2xl mx-auto px-5">
          <FadeIn className="text-center mb-10">
            <SectionLabel>FAQs</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900">Common questions</h2>
          </FadeIn>
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
            Get a tool that can actually get you paid.
          </h2>
          <a href={APP_URL}
            className="inline-flex items-center justify-center gap-2 mt-7 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
            Start free trial
            <ArrowRight size={15} />
          </a>
          <p className="text-xs text-gray-400 mt-3">15-day free Pro trial · Then free forever · No credit card needed</p>
          <p className="text-sm text-gray-400 mt-6">
            Also comparing other tools?{' '}
            <a href="/bonsai-alternative" className="text-indigo-600 font-medium hover:underline">Bonsai alternative</a>{' '}
            ·{' '}
            <a href="/dubsado-alternative" className="text-indigo-600 font-medium hover:underline">Dubsado alternative</a>
          </p>
        </div>
      </section>
    </div>
  )
}
