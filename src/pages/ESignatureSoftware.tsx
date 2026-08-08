import { motion } from 'framer-motion'
import {
  ArrowRight, Shield, Zap, IndianRupee, FileText, Lock, Bell, CheckCircle2, X, Plus,
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
  { label: 'Price', clearwork: '₹149/mo (unlimited)', others: '$10-40/mo, per-user or per-envelope' },
  { label: 'Built for Indian law', clearwork: 'IT Act 2000, OTP-based', others: 'Generic, US/EU-focused' },
  { label: 'GST invoice tie-in', clearwork: true, others: false },
  { label: 'UPI payment collection', clearwork: true, others: false },
  { label: 'Auto-converts from proposal', clearwork: true, others: false },
  { label: 'No client login required', clearwork: true, others: 'Usually requires account' },
]

const howItWorks = [
  { icon: FileText, title: 'Contract auto-fills from your proposal', body: 'Scope, price, and timeline carry over the moment a client accepts — nothing retyped.' },
  { icon: Shield, title: 'Client signs via OTP, no account needed', body: 'They open a link, verify with an OTP sent to their phone, and sign — legally valid under the IT Act 2000, Second Schedule.' },
  { icon: Lock, title: 'Tamper-evident audit trail, stored forever', body: 'Timestamp, IP address, and OTP confirmation are embedded in the signed PDF automatically.' },
  { icon: Bell, title: 'You get notified the instant it\'s signed', body: 'No refreshing your inbox — a push notification the second the contract is complete.' },
]

const faqs = [
  {
    q: 'Is e-sign / digital signature software legally valid in India?',
    a: 'Yes. OTP-based electronic signatures are legally valid under the IT Act 2000 (Second Schedule) and admissible as evidence under Section 65B of the Indian Evidence Act, provided the platform maintains a proper audit trail.',
  },
  {
    q: 'How is this different from DocuSign or PandaDoc?',
    a: 'DocuSign and PandaDoc are excellent general-purpose e-sign tools, but they\'re priced in USD, built for enterprise workflows, and stop at the signature — you still have to manually create the invoice and chase payment. ClearWork\'s e-sign is one step in a connected flow: proposal → contract → GST invoice → UPI payment, all in the same tool.',
  },
  {
    q: 'Does my client need to create an account to sign?',
    a: 'No. Your client opens a link, verifies their identity with an OTP sent to their phone, and signs — no login, no app download, no account required.',
  },
  {
    q: 'What happens to the signed document?',
    a: 'A tamper-evident PDF is generated with the full audit trail (timestamp, IP address, OTP confirmation) embedded, and stored securely — accessible to both you and your client anytime.',
  },
  {
    q: 'Can I use this for contracts with international clients?',
    a: 'Yes — OTP-based signing works for any client with a phone number. If your contract specifies Indian jurisdiction, IT Act 2000 governs regardless of where your client is based.',
  },
]

export default function ESignatureSoftware() {
  useSeo(
    'E-Sign & Digital Signature Software for Indian Freelancers | ClearWork',
    'Digital signature software built for India — OTP-based e-sign, legally valid under IT Act 2000, auto-converts from your proposal, and connects straight to GST invoicing. ₹149/mo.',
    'https://getclearwork.in/e-signature-software',
  )

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <SectionLabel>E-sign & digital signature</SectionLabel>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.05]">
              Digital signature software,{' '}
              <span className="gradient-text">built for India.</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              OTP-based e-sign that's legally valid under the IT Act 2000 — and unlike DocuSign
              or PandaDoc, it doesn't stop at the signature. Your contract flows straight into
              a GST invoice with a UPI payment link, in the same tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <a href={APP_URL}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
                Get started free
                <ArrowRight size={15} />
              </a>
              <a href="#compare"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-gray-700 font-semibold text-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
                See how it compares
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
              {['IT Act 2000 compliant', 'No client login needed', 'Free until our first 50 users'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-gray-400">
                  <CheckCircle2 size={12} className="text-emerald-500" strokeWidth={2.5} />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-14">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              From accepted proposal to signed contract in minutes.
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {howItWorks.map(({ icon: Icon, title, body }, i) => (
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
            <SectionLabel>The difference</SectionLabel>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              vs. DocuSign, PandaDoc & Adobe Sign
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              They're great at signatures. None of them get you paid.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Feature</th>
                    <th className="text-left px-5 py-4 font-semibold text-indigo-600 text-xs uppercase tracking-wide">ClearWork</th>
                    <th className="text-left px-5 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Global e-sign tools</th>
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
                { icon: Shield, label: 'IT Act 2000 compliant' },
                { icon: Zap, label: 'Signed in under 3 minutes' },
                { icon: IndianRupee, label: '₹149/mo, unlimited contracts' },
                { icon: Lock, label: 'Full audit trail, always' },
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
            Get your first contract signed today.
          </h2>
          <a href={APP_URL}
            className="inline-flex items-center justify-center gap-2 mt-7 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
            Get started free
            <ArrowRight size={15} />
          </a>
          <p className="text-xs text-gray-400 mt-3">Free until our first 50 users · No credit card needed</p>
          <p className="text-sm text-gray-400 mt-6">
            Need more than signing? See our full{' '}
            <a href="/contract-management-software" className="text-indigo-600 font-medium hover:underline">contract management software</a>.
          </p>
        </div>
      </section>
    </div>
  )
}
