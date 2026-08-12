import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, IndianRupee, Receipt, FileSignature, MessageCircle, CheckCircle2, X, Plus, Zap, Shield,
} from 'lucide-react'
import { useSeo } from '../lib/useSeo'
import { FadeIn } from '../components/ui/FadeIn'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const APP_URL = 'https://app.getclearwork.in/signup'
const CANONICAL = 'https://getclearwork.in/alternatives/bonsai-alternative-india'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
      {children}
    </span>
  )
}

const comparison = [
  { label: 'Price', clearwork: '₹149/mo (Pro), free plan forever', others: '$17–20/mo (~₹1,400–1,700), 7-day trial only' },
  { label: 'GST invoicing (CGST/SGST/IGST)', clearwork: true, others: false },
  { label: 'UPI payment collection', clearwork: true, others: false },
  { label: 'E-sign valid under IT Act 2000', clearwork: true, others: false },
  { label: 'TDS tracking (194J/194C)', clearwork: true, others: false },
  { label: 'WhatsApp payment reminders', clearwork: true, others: false },
  { label: 'Proposals + contracts + invoicing', clearwork: true, others: true },
  { label: 'Client portal', clearwork: true, others: true },
]

const reasons = [
  { icon: IndianRupee, title: 'GST invoicing, not USD line items', body: 'Bonsai has no GSTIN field, no CGST/SGST/IGST split, no SAC codes. ClearWork auto-calculates the right tax split based on your client\'s state — every invoice is Rule 46 compliant.' },
  { icon: Receipt, title: 'UPI payments, not Stripe/PayPal only', body: 'Bonsai collects money through Stripe and PayPal — neither works well for Indian clients. Every ClearWork invoice has a UPI + card link via Razorpay, so clients pay in one tap.' },
  { icon: FileSignature, title: 'E-sign that holds up in Indian courts', body: 'Bonsai\'s e-sign isn\'t validated under the IT Act 2000. ClearWork uses OTP-based signing that\'s legally enforceable under the IT Act 2000\'s Second Schedule.' },
  { icon: MessageCircle, title: 'WhatsApp reminders, not just email', body: 'Indian clients respond to WhatsApp, not email. ClearWork sends automatic reminders at 3, 7, and 14 days overdue — Bonsai only emails.' },
]

const faqs = [
  {
    q: 'Is Bonsai available in India?',
    a: 'Bonsai works technically (you can create an account), but it has no GST invoicing, no UPI payment collection, and its e-signature isn\'t validated under India\'s IT Act 2000. Most Indian freelancers end up needing a second tool alongside it for taxes and payments.',
  },
  {
    q: 'How much cheaper is ClearWork than Bonsai?',
    a: 'Bonsai\'s cheapest plan is $17/month (~₹1,400). ClearWork\'s Pro plan is ₹149/month — about 9x cheaper — and there\'s a free plan forever for freelancers with up to 5 clients, which Bonsai doesn\'t offer beyond a 7-day trial.',
  },
  {
    q: 'Can I migrate my Bonsai clients and data to ClearWork?',
    a: 'Yes. Export your client list from Bonsai as a CSV (Settings → Export) and import it into ClearWork in a few minutes. You\'ll recreate your invoice template once (GSTIN, bank details, UPI ID) and you\'re set up for new projects going forward.',
  },
  {
    q: 'Does ClearWork have everything Bonsai has?',
    a: 'ClearWork covers proposals, e-sign contracts, invoicing, time tracking, and a client portal — the full Bonsai feature set — plus GST compliance, UPI payments, TDS tracking, and WhatsApp reminders that Bonsai doesn\'t have. Bonsai remains a fine choice if you only invoice in USD and never need Indian tax compliance.',
  },
]

export default function BonsaiAlternative() {
  useSeo(
    'Bonsai Alternative for India — GST, UPI & IT Act E-Sign | ClearWork',
    'The best Bonsai alternative for Indian freelancers. GST invoicing, UPI payments, and IT Act 2000 e-sign — from \u20b90/mo, 9x cheaper than Bonsai\u2019s $17/mo plan.',
    CANONICAL,
  )

  return (
    <div className="bg-white">

      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-5 lg:px-8 pt-24 pb-2">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-400">
          <li><Link to="/" className="hover:text-gray-600">Home</Link></li>
          <li>/</li>
          <li><Link to="/alternatives" className="hover:text-gray-600">Alternatives</Link></li>
          <li>/</li>
          <li className="text-gray-600 font-medium">Bonsai Alternative India</li>
        </ol>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <SectionLabel>Bonsai alternative</SectionLabel>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.05]">
              The Bonsai alternative{' '}
              <span className="gradient-text">built for India.</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Bonsai is a good tool — for US freelancers billing in USD via Stripe. ClearWork covers
              the same proposals → contracts → invoicing workflow, plus GST, UPI, and IT Act 2000
              e-sign that Bonsai simply doesn't have. And it's about 9x cheaper.
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
              {['9x cheaper than Bonsai', 'GST + UPI built-in', '15-day free Pro trial'].map(t => (
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
            <SectionLabel>Why freelancers switch from Bonsai</SectionLabel>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              Everything Bonsai does. Plus everything India needs.
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
              ClearWork vs. Bonsai
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Same workflow. A fraction of the price. Built for how Indian clients actually pay.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Feature</th>
                    <th className="text-left px-5 py-4 font-semibold text-indigo-600 text-xs uppercase tracking-wide">ClearWork</th>
                    <th className="text-left px-5 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Bonsai</th>
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
                { icon: IndianRupee, label: '₹149/mo vs $17/mo' },
                { icon: Zap, label: 'Migrate in under an hour' },
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
            Switch from Bonsai in under an hour.
          </h2>
          <a href={APP_URL}
            className="inline-flex items-center justify-center gap-2 mt-7 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
            Start free trial
            <ArrowRight size={15} />
          </a>
          <p className="text-xs text-gray-400 mt-3">15-day free Pro trial · Then free forever · No credit card needed</p>
          <p className="text-sm text-gray-400 mt-6">
            Also comparing other tools?{' '}
            <Link to="/alternatives/honeybook-alternative-india" className="text-indigo-600 font-medium hover:underline">HoneyBook alternative</Link>{' '}
            ·{' '}
            <Link to="/alternatives/dubsado-alternative-india" className="text-indigo-600 font-medium hover:underline">Dubsado alternative</Link>
            {' · '}
            <Link to="/alternatives" className="text-indigo-600 font-medium hover:underline">All alternatives</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
