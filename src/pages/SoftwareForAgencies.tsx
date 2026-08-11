import { motion } from 'framer-motion'
import {
  ArrowRight, IndianRupee, Receipt, FileSignature, Users2, CheckCircle2, X, Plus, Palette, Code2, Globe,
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

const industries = [
  { icon: Palette, label: 'Design studios' },
  { icon: Code2, label: 'Software & IT services' },
  { icon: Globe, label: 'Digital marketing agencies' },
  { icon: Users2, label: 'Creative production houses' },
]

const comparison = [
  { label: 'Built for', clearwork: 'Small agencies & studios (2\u201310 people)', others: 'Enterprise agencies with dedicated ops teams' },
  { label: 'Price', clearwork: '₹0–₹649/mo total, not per seat', others: '$9\u201349/user/month' },
  { label: 'Setup time', clearwork: 'Minutes, no onboarding call needed', others: 'Days, often needs guided onboarding' },
  { label: 'GST invoicing + UPI payments', clearwork: true, others: false },
  { label: 'White-label client portal', clearwork: true, others: 'Often paid add-on' },
  { label: 'Team task allocation', clearwork: true, others: true },
]

const painPoints = [
  { icon: FileSignature, title: 'Proposals and contracts, not just tasks', body: 'Most project tools start after the deal is won. ClearWork covers the part before it too — tracked proposals and OTP e-signed contracts, so nothing is verbal or "over email."' },
  { icon: IndianRupee, title: 'Priced per business, not per seat', body: 'A 5-person studio on a per-seat tool pays 5x. ClearWork\'s Studio plan is one flat ₹649/month for unlimited team members — the math changes completely as you grow.' },
  { icon: Receipt, title: 'GST invoicing that\'s actually compliant', body: 'CGST/SGST/IGST auto-split by client state, SAC codes pre-filled, UPI payment link on every invoice — built for how Indian studios actually bill, not adapted from a US template.' },
  { icon: Users2, title: 'White-label everything, on Studio', body: 'Remove ClearWork branding from documents and put the client portal on your own domain — your studio\'s brand, not ours, in front of your clients.' },
]

const faqs = [
  {
    q: 'Is ClearWork suitable for a small creative or design agency?',
    a: 'Yes — ClearWork is built specifically for agencies and studios of 2–10 people: design studios, digital marketing agencies, software/IT services shops, and creative production houses. It covers the full workflow from lead to paid invoice, with team task allocation and white-labelling on the Studio plan.',
  },
  {
    q: 'How is pricing different from tools like Bonsai or Zoho?',
    a: 'Most competitors charge per user per month, so a 5-person studio pays 5x the listed price. ClearWork\'s Studio plan is a flat ₹649/month for the whole team, unlimited members — not per seat.',
  },
  {
    q: 'Can each team member have their own login and assigned tasks?',
    a: 'Yes. Pro includes up to 5 team member seats; Studio removes the limit. Each member gets their own login, and tasks/projects can be assigned and tracked per person.',
  },
  {
    q: 'Can we put our own branding on the client portal?',
    a: 'Yes, on the Studio plan — white-label documents (no "Powered by ClearWork") and a white-labelled client portal on your own domain.',
  },
]

export default function SoftwareForAgencies() {
  useSeo(
    'Software for Agencies & Studios — CRM, Proposals & Invoicing | ClearWork',
    'All-in-one software for small agencies and studios — design, marketing, IT services, and creative production. CRM, proposals, e-sign, GST invoicing. Flat pricing, not per seat.',
    'https://getclearwork.in/software-for-agencies',
  )

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <SectionLabel>Software for agencies & studios</SectionLabel>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.05]">
              Run your studio,{' '}
              <span className="gradient-text">priced like one team.</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Leads, proposals, e-signed contracts, projects, and GST invoicing in one place — built
              for small design, marketing, and IT service agencies. One flat price for the whole
              team, not per seat.
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
              {['Flat price, unlimited team on Studio', 'White-label portal', '15-day free Pro trial'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-gray-400">
                  <CheckCircle2 size={12} className="text-emerald-500" strokeWidth={2.5} />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Who it's for ── */}
      <section className="py-14 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {industries.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2.5 text-center p-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Icon size={18} className="text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Pain points ── */}
      <section className="py-20 bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-14">
            <SectionLabel>Built for small teams</SectionLabel>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              Everything an agency needs, none of the per-seat math.
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
              vs. Bonsai, Zoho & enterprise agency tools
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              They're built for teams of 30+. You're a team of 5.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Feature</th>
                    <th className="text-left px-5 py-4 font-semibold text-indigo-600 text-xs uppercase tracking-wide">ClearWork</th>
                    <th className="text-left px-5 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Enterprise agency tools</th>
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
            Run your whole studio from one place.
          </h2>
          <a href={APP_URL}
            className="inline-flex items-center justify-center gap-2 mt-7 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
            Start free trial
            <ArrowRight size={15} />
          </a>
          <p className="text-xs text-gray-400 mt-3">15-day free Pro trial · Then free forever · No credit card needed</p>
          <p className="text-sm text-gray-400 mt-6">
            Running marketing campaigns specifically?{' '}
            <a href="/crm-for-marketing-agencies" className="text-indigo-600 font-medium hover:underline">See CRM for marketing agencies</a>
          </p>
        </div>
      </section>
    </div>
  )
}
