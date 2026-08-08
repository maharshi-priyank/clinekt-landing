import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare, FileText, IndianRupee, Globe, CheckCircle2, X, Plus } from 'lucide-react'
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
  { label: 'Built for', clearwork: 'Service businesses — freelancers, agencies, consultants', others: 'High-volume sales teams (calling, dialing)' },
  { label: 'Price', clearwork: '₹149/mo, unlimited leads', others: '₹500-3,000/user/month' },
  { label: 'Proposals built in', clearwork: true, others: false },
  { label: 'GST invoicing built in', clearwork: true, others: false },
  { label: 'UPI payment collection', clearwork: true, others: false },
  { label: 'Client portal', clearwork: true, others: false },
  { label: 'Telephony / auto-dialer', clearwork: false, others: true },
]

const features = [
  { icon: MessageSquare, title: 'Capture leads from anywhere', body: 'WhatsApp, Instagram, LinkedIn, referrals, or your website — every enquiry lands in one pipeline, not scattered across apps.' },
  { icon: FileText, title: 'Proposals, not just notes', body: 'Most small-business CRMs stop at "add a note." ClearWork sends a real tracked proposal — and tells you the second the client opens it.' },
  { icon: IndianRupee, title: 'Invoice and get paid from the same record', body: 'Win the deal, e-sign the contract, raise a GST invoice with a UPI link — without leaving the client\'s record.' },
  { icon: Globe, title: 'A portal your client actually sees', body: 'Every client gets one branded link with their proposals, contracts, and invoices — no login required.' },
]

const faqs = [
  {
    q: 'Is ClearWork a CRM like Zoho or HubSpot?',
    a: 'Not quite — Zoho and HubSpot are built for larger sales teams making high call volumes across any industry. ClearWork is purpose-built for small service businesses (freelancers, consultants, agencies) whose real pipeline is leads → proposals → contracts → invoices → payment, not cold-call dialing.',
  },
  {
    q: 'What size of business is ClearWork CRM good for?',
    a: 'Solo freelancers up to small agencies with a handful of team members. If you\'re managing 5-100 active clients and your work involves sending proposals, signing contracts, and invoicing, it fits. It\'s not built for large sales floors or call centers.',
  },
  {
    q: 'Do I need a separate invoicing tool alongside this CRM?',
    a: 'No — GST invoicing (CGST/SGST/IGST auto-split) and UPI/card payment collection are built into the same pipeline, so a won deal can go straight to an invoice without re-entering any data.',
  },
  {
    q: 'Can I use this CRM for free?',
    a: 'Yes — ClearWork is 100% free until we welcome our first 50 users, with no credit card required and no feature limits during that period.',
  },
]

export default function CrmForSmallBusiness() {
  useSeo(
    'CRM for Small Business — Built for Service Businesses | ClearWork',
    'A CRM for small businesses that actually run on proposals and invoices, not cold calls. Free lead pipeline, proposal tracking, GST invoicing, and UPI payments in one place.',
    'https://getclearwork.in/crm-for-small-business',
  )

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <SectionLabel>CRM for small business</SectionLabel>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.05]">
              A CRM built for{' '}
              <span className="gradient-text">service businesses,</span>{' '}
              not sales floors.
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Most small-business CRMs are built for cold-calling teams. If your business actually
              runs on proposals, contracts, and invoices — freelancing, consulting, agency work —
              ClearWork tracks your real pipeline end to end, free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <a href={APP_URL}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
                Get started free
                <ArrowRight size={15} />
              </a>
              <a href="#compare"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-gray-700 font-semibold text-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
                See how it's different
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-14">
            <SectionLabel>What it actually tracks</SectionLabel>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              Your real pipeline — not a generic sales funnel.
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
              vs. Zoho CRM, HubSpot & Freshsales
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Great CRMs for sales teams. Not built for how you actually get hired and paid.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Feature</th>
                    <th className="text-left px-5 py-4 font-semibold text-indigo-600 text-xs uppercase tracking-wide">ClearWork</th>
                    <th className="text-left px-5 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Generic small-business CRMs</th>
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
            Start tracking your real pipeline today.
          </h2>
          <a href={APP_URL}
            className="inline-flex items-center justify-center gap-2 mt-7 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
            Get started free
            <ArrowRight size={15} />
          </a>
          <p className="text-xs text-gray-400 mt-3">Free until our first 50 users · No credit card needed</p>
        </div>
      </section>
    </div>
  )
}
