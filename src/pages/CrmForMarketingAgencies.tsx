import { motion } from 'framer-motion'
import {
  ArrowRight, IndianRupee, Receipt, Repeat, Users2, CheckCircle2, X, Plus, MessageSquare, FolderKanban,
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
  { label: 'Built for', clearwork: 'Agencies running proposals, retainers & invoicing', others: 'Sales pipelines for outbound sales teams' },
  { label: 'Price', clearwork: '₹0–₹649/mo, unlimited leads', others: '₹500–₹3,000/user/month' },
  { label: 'Retainer billing (recurring invoices)', clearwork: true, others: false },
  { label: 'GST invoicing built in', clearwork: true, others: false },
  { label: 'Client portal per account', clearwork: true, others: false },
  { label: 'Team task allocation', clearwork: true, others: 'Sometimes, add-on' },
  { label: 'Telephony / cold-call dialer', clearwork: false, others: true },
]

const painPoints = [
  { icon: FolderKanban, title: 'One record per client, not five tools', body: 'Pitch deck in Canva, proposal in Docs, contract on WhatsApp, invoice in a separate tool. ClearWork keeps the whole client record — proposal, contract, project, invoices — in one place.' },
  { icon: Repeat, title: 'Retainer clients, billed automatically', body: 'Set a monthly retainer once and ClearWork raises and sends the GST invoice on schedule — no manually re-creating the same invoice every month.' },
  { icon: Users2, title: 'Assign work across your team', body: 'Give each team member their own login, assign tasks per project, and see who owes what — without a separate project management tool.' },
  { icon: MessageSquare, title: 'Clients get their own portal, not a WhatsApp thread', body: 'Every client account gets a branded portal showing proposals, contracts, invoices, and project updates — no more "can you resend that PDF" messages.' },
]

const faqs = [
  {
    q: 'Is ClearWork a CRM for marketing agencies specifically?',
    a: 'ClearWork is built for service-based agencies whose real pipeline is leads → proposals → contracts → project delivery → invoicing → retainer renewal — which is exactly how most marketing and creative agencies operate, unlike generic sales CRMs built for outbound cold-calling teams.',
  },
  {
    q: 'Can I bill retainer clients automatically?',
    a: 'Yes. Set a project or client as a recurring retainer and ClearWork generates and sends the GST invoice on your chosen schedule (e.g. monthly), so you don\'t have to manually recreate the same invoice every billing cycle.',
  },
  {
    q: 'How many team members can I add?',
    a: 'The Pro plan includes up to 5 team members; Studio removes the limit entirely for larger agencies. Each team member gets their own login and can be assigned tasks and projects.',
  },
  {
    q: 'Do clients need to create an account to see their proposals and invoices?',
    a: 'No. Each client gets a branded portal link — no login, no app download. They can view proposals, sign contracts via OTP, see invoices, and pay directly from the portal.',
  },
]

export default function CrmForMarketingAgencies() {
  useSeo(
    'CRM for Marketing Agencies — Proposals, Retainers & Invoicing | ClearWork',
    'A CRM built for marketing agencies — proposals, e-sign contracts, recurring retainer billing, GST invoicing, and client portals. Free plan, from \u20b9149/mo.',
    'https://getclearwork.in/crm-for-marketing-agencies',
  )

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <SectionLabel>CRM for marketing agencies</SectionLabel>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.05]">
              A CRM built for how{' '}
              <span className="gradient-text">agencies actually get paid.</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Not a sales-team dialer. A pipeline built around proposals, contracts, retainers, and
              GST invoicing — with a portal every client gets to see their own work in.
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
              {['Recurring retainer billing', 'Team task allocation', '15-day free Pro trial'].map(t => (
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
            <SectionLabel>Built for agency work</SectionLabel>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              Everything scattered across five tools, in one.
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
              vs. Zoho CRM, HubSpot & Freshsales
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Great CRMs for sales floors. Not built for retainers, GST, or a client portal.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Feature</th>
                    <th className="text-left px-5 py-4 font-semibold text-indigo-600 text-xs uppercase tracking-wide">ClearWork</th>
                    <th className="text-left px-5 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Generic sales CRMs</th>
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
                { icon: Repeat, label: 'Automated retainer billing' },
                { icon: Users2, label: 'Team task allocation' },
                { icon: Receipt, label: 'GST invoicing built in' },
                { icon: IndianRupee, label: 'From \u20b90/mo' },
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
            Run your agency without the five-tool juggle.
          </h2>
          <a href={APP_URL}
            className="inline-flex items-center justify-center gap-2 mt-7 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
            Start free trial
            <ArrowRight size={15} />
          </a>
          <p className="text-xs text-gray-400 mt-3">15-day free Pro trial · Then free forever · No credit card needed</p>
          <p className="text-sm text-gray-400 mt-6">
            Solo consultant instead of an agency?{' '}
            <a href="/software-for-consultants" className="text-indigo-600 font-medium hover:underline">See software for consultants</a>
          </p>
        </div>
      </section>
    </div>
  )
}
