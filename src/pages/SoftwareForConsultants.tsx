import { motion } from 'framer-motion'
import {
  ArrowRight, IndianRupee, Receipt, FileSignature, Clock, CheckCircle2, X, Plus, Users, TrendingUp,
} from 'lucide-react'
import { useSeo } from '../lib/useSeo'
import { FadeIn } from '../components/ui/FadeIn'
import AffordabilitySection from '../components/AffordabilitySection'

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
  { label: 'Built for', clearwork: 'Consultants — scope, proposals, retainers, TDS', others: 'Generic project trackers or spreadsheets' },
  { label: 'Price', clearwork: '₹0–₹149/mo', others: 'Excel free, but hours of manual work weekly' },
  { label: 'Tracked proposals', clearwork: true, others: false },
  { label: 'GST invoicing + TDS flagging (194J)', clearwork: true, others: false },
  { label: 'E-sign engagement letters', clearwork: true, others: false },
  { label: 'UPI payment collection', clearwork: true, others: false },
  { label: 'Client portal', clearwork: true, others: false },
]

const painPoints = [
  { icon: FileSignature, title: 'Engagement letters, e-signed properly', body: 'Convert an accepted proposal into an engagement letter or contract in one click. Client signs via OTP — legally valid under the IT Act 2000, no printing or scanning.' },
  { icon: Clock, title: 'Track billable hours against the fee', body: 'Log time against a project or retainer and see it against your quoted fee or hourly rate in real time — no separate timesheet spreadsheet.' },
  { icon: IndianRupee, title: 'TDS-aware invoicing (Section 194J)', body: 'Most consulting fees attract 10% TDS under Section 194J. ClearWork flags this on the invoice so both you and your client know the exact net amount, and you can reconcile it against Form 26AS at tax time.' },
  { icon: TrendingUp, title: 'See your real pipeline, not just a task list', body: 'Track every prospective client from first enquiry through proposal, negotiation, and won — with follow-up dates so nobody goes quiet on you.' },
]

const faqs = [
  {
    q: 'What software do independent consultants use to manage clients?',
    a: 'Most independent consultants in India start with a mix of WhatsApp, Google Sheets, and manual GST invoices. ClearWork replaces all three with a single workflow — lead tracking, proposals, e-signed engagement letters, GST/TDS-aware invoicing, and UPI payment collection.',
  },
  {
    q: 'Does ClearWork handle TDS for consulting fees?',
    a: 'Yes. Consulting and professional fees typically attract 10% TDS under Section 194J. ClearWork flags TDS-applicable clients and shows the gross vs. net-of-TDS amount on the invoice, so you can reconcile the credit against Form 26AS during ITR filing.',
  },
  {
    q: 'Can I track retainer clients as well as one-off projects?',
    a: 'Yes. ClearWork supports both project-based engagements and recurring retainers, with recurring invoice generation so you don\'t have to manually re-invoice retainer clients every month.',
  },
  {
    q: 'Is there a free plan for solo consultants just starting out?',
    a: 'Yes — the Free plan covers up to 5 clients and 10 active projects with the full CRM pipeline, GST invoicing, and basic e-sign, forever, no credit card. Every new signup also gets a 15-day free trial of the Pro plan to try the full feature set first.',
  },
]

export default function SoftwareForConsultants() {
  useSeo(
    'Software for Consultants — CRM, Proposals & GST Invoicing | ClearWork',
    'Software built for consultants — track leads, send tracked proposals, e-sign engagement letters, and raise TDS-aware GST invoices. Free plan, Pro from \u20b9149/mo.',
    'https://getclearwork.in/software-for-consultants',
  )

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <SectionLabel>Software for consultants</SectionLabel>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.05]">
              Everything a consultant needs,{' '}
              <span className="gradient-text">minus the spreadsheets.</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Track every client, send tracked proposals, get engagement letters e-signed, and raise
              GST invoices that already know about TDS — all in one place built for how consulting
              work actually gets billed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <a href={APP_URL}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
                Start free trial
                <ArrowRight size={15} />
              </a>
              <a href="#compare"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-gray-700 font-semibold text-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
                See how it's different
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
              {['TDS-aware GST invoicing', 'E-signed engagement letters', '15-day free Pro trial'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-gray-400">
                  <CheckCircle2 size={12} className="text-emerald-500" strokeWidth={2.5} />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Pain points ── */}
      <section className="py-20 bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-14">
            <SectionLabel>Built for consulting work</SectionLabel>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              The billing details that generic tools get wrong.
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {painPoints.map(({ icon: Icon, title, body }, i) => (
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

      {/* ── Affordability ── */}
      <AffordabilitySection />

      {/* ── Comparison ── */}
      <section id="compare" className="py-20">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-12">
            <SectionLabel>The difference</SectionLabel>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              vs. spreadsheets and generic project trackers
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              A spreadsheet doesn't send a proposal, get a contract signed, or flag TDS.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Feature</th>
                    <th className="text-left px-5 py-4 font-semibold text-indigo-600 text-xs uppercase tracking-wide">ClearWork</th>
                    <th className="text-left px-5 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Sheets / generic tools</th>
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
                { icon: IndianRupee, label: 'TDS flagging (194J)' },
                { icon: FileSignature, label: 'IT Act 2000 e-sign' },
                { icon: Receipt, label: 'GST invoicing built in' },
                { icon: Users, label: 'Free plan, no card' },
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
            Run your consulting practice properly.
          </h2>
          <a href={APP_URL}
            className="inline-flex items-center justify-center gap-2 mt-7 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
            Start free trial
            <ArrowRight size={15} />
          </a>
          <p className="text-xs text-gray-400 mt-3">15-day free Pro trial · Then free forever · No credit card needed</p>
          <p className="text-sm text-gray-400 mt-6">
            Running an agency instead?{' '}
            <a href="/crm-for-marketing-agencies" className="text-indigo-600 font-medium hover:underline">See CRM for marketing agencies</a>
          </p>
        </div>
      </section>
    </div>
  )
}
