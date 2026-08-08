import { motion } from 'framer-motion'
import { ArrowRight, FileText, Shield, Bell, RefreshCw, CheckCircle2, X, Plus } from 'lucide-react'
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
  { label: 'Built for', clearwork: 'Freelancers & small agencies', others: 'Enterprise legal/procurement teams' },
  { label: 'Price', clearwork: '₹149/mo, unlimited contracts', others: '$7-700+/user/month' },
  { label: 'Setup time', clearwork: 'Minutes', others: 'Weeks (implementation team)' },
  { label: 'Auto-fills from proposal', clearwork: true, others: false },
  { label: 'OTP e-sign, IT Act 2000', clearwork: true, others: 'Varies' },
  { label: 'Converts to invoice in 1 click', clearwork: true, others: false },
  { label: 'AI clause-risk analysis', clearwork: false, others: true },
]

const features = [
  { icon: FileText, title: 'Every contract starts from a won proposal', body: 'Scope, price, and timeline carry over automatically — nothing retyped, no mismatch between what was agreed and what\'s signed.' },
  { icon: Shield, title: 'OTP e-signature, legally valid in India', body: 'Your client signs from any device via a one-time password — no account, no app, valid under the IT Act 2000.' },
  { icon: Bell, title: 'Track every contract\'s status in one place', body: 'Sent, viewed, signed, or overdue — see exactly where every client agreement stands without digging through email.' },
  { icon: RefreshCw, title: 'Scope changes become a real amendment', body: 'When a client asks for more, a change order updates the contract and generates the extra invoice — instead of scope creep nobody signed off on.' },
]

const faqs = [
  {
    q: 'Is this the same as enterprise contract lifecycle management (CLM) software?',
    a: 'No — enterprise CLM tools like Icertis or Ironclad are built for legal and procurement teams managing hundreds of vendor contracts, with pricing to match ($7-700+ per user/month). ClearWork is contract management scoped to what a freelancer or small agency actually needs: creating, signing, tracking, and amending client service agreements — at a flat ₹149/mo.',
  },
  {
    q: 'How does a contract get created?',
    a: 'It\'s auto-generated the moment a client accepts your proposal — scope, pricing, and timeline are pre-filled, so you\'re reviewing and sending, not drafting from scratch.',
  },
  {
    q: 'What happens when a client wants to change the scope mid-project?',
    a: 'You issue a change order — it updates the contract terms and can generate an additional invoice for the extra work, so scope changes are documented and billed instead of silently absorbed.',
  },
  {
    q: 'Is the e-signature on these contracts legally binding?',
    a: 'Yes — signatures are OTP-based and valid under the IT Act 2000 (Second Schedule), with a full audit trail (timestamp, IP address, OTP confirmation) stored with the signed document.',
  },
  {
    q: 'Can I store and search past contracts?',
    a: 'Yes — every signed contract is stored against the client\'s record, searchable anytime, alongside the proposal and invoices that came from it.',
  },
]

export default function ContractManagementSoftware() {
  useSeo(
    'Contract Management Software for Freelancers & Agencies | ClearWork',
    'Contract management software built for freelancers and small agencies — auto-generate from your proposal, e-sign under IT Act 2000, track status, and convert to invoice in one click.',
    'https://getclearwork.in/contract-management-software',
  )

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <SectionLabel>Contract management software</SectionLabel>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.05]">
              Contract management,{' '}
              <span className="gradient-text">sized for freelancers.</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Enterprise CLM tools are built for legal teams managing hundreds of vendor
              contracts. You're signing client agreements. ClearWork auto-generates,
              e-signs, tracks, and invoices off the same contract — for ₹149/mo.
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
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-14">
            <SectionLabel>The full lifecycle</SectionLabel>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              From draft to signed to invoiced — one record.
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map(({ icon: Icon, title, body }, i) => (
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
              vs. Icertis, Ironclad & DocuSign CLM
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Excellent for enterprise legal ops. Overkill and overpriced for a freelance business.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Factor</th>
                    <th className="text-left px-5 py-4 font-semibold text-indigo-600 text-xs uppercase tracking-wide">ClearWork</th>
                    <th className="text-left px-5 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Enterprise CLM tools</th>
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
      <section className="py-20 bg-gray-50 border-t border-gray-100">
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
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight">
            Manage your first contract today.
          </h2>
          <a href={APP_URL}
            className="inline-flex items-center justify-center gap-2 mt-7 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
            Get started free
            <ArrowRight size={15} />
          </a>
          <p className="text-xs text-gray-400 mt-3">Free until our first 50 users · No credit card needed</p>
          <p className="text-sm text-gray-400 mt-6">
            Just need the signature step? See our{' '}
            <a href="/e-signature-software" className="text-indigo-600 font-medium hover:underline">e-sign software</a>.
          </p>
        </div>
      </section>
    </div>
  )
}
