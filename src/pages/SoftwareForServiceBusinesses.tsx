import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, UserSearch, FileText, PenLine, Receipt, CheckCircle2, Plus,
  Briefcase, Megaphone, Palette, Code2, Camera, GraduationCap, IndianRupee,
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

const flow = [
  { icon: UserSearch, label: 'Find a client' },
  { icon: FileText, label: 'Send a proposal' },
  { icon: PenLine, label: 'Sign a contract' },
  { icon: Receipt, label: 'Invoice & get paid' },
]

const solutions = [
  { icon: Briefcase, title: 'Consultants', body: 'Engagement letters, TDS-aware invoicing, and a real pipeline instead of a spreadsheet.', href: '/software-for-consultants' },
  { icon: Megaphone, title: 'Marketing agencies', body: 'Retainer billing, client portals, and team task allocation — built for how agencies bill.', href: '/crm-for-marketing-agencies' },
  { icon: Palette, title: 'Design & creative studios', body: 'Proposals, contracts, and invoicing for small studios — priced per business, not per seat.', href: '/software-for-agencies' },
  { icon: Code2, title: 'IT & software services', body: 'Scope-to-invoice workflow for project-based dev shops and technical consultancies.', href: '/software-for-agencies' },
  { icon: Camera, title: 'Freelancers & solopreneurs', body: 'Everything from your first lead to your first ₹1L month, without hiring an ops person.', href: '/crm-for-small-business' },
  { icon: GraduationCap, title: 'Coaches & independent experts', body: 'Sell your expertise with the same professional workflow bigger firms use.', href: '/software-for-consultants' },
]

const faqs = [
  {
    q: 'What counts as a "service business" for ClearWork?',
    a: 'Any business that sells expertise or delivery rather than a physical product — freelancers, consultants, marketing and creative agencies, software/IT services shops, coaches, and studios of any size from solo to a small team. If your work involves quoting a scope, signing a contract, and invoicing for delivered work, ClearWork fits.',
  },
  {
    q: 'Is ClearWork only for freelancers, or does it work for agencies too?',
    a: 'Both. The Free and Pro plans work well for solo freelancers and consultants; Studio adds unlimited team members, white-labelling, and multi-currency invoicing for agencies and studios with a small team.',
  },
  {
    q: 'How is this different from a generic CRM like Zoho or HubSpot?',
    a: 'Generic CRMs are built for outbound sales teams — cold calling, dialers, deal stages. ClearWork is built around the actual workflow of a service business: proposal → contract → project → invoice → payment → retainer renewal, with GST, UPI, and IT Act 2000 e-sign built in from day one.',
  },
  {
    q: 'Do I need to know which "type" of service business I am to sign up?',
    a: 'No — every account gets the same platform. The industry pages exist to show relevant examples, but the underlying product (leads, proposals, contracts, invoices, client portal) is the same for everyone.',
  },
]

export default function SoftwareForServiceBusinesses() {
  useSeo(
    'ClearWork — The All-in-One Platform for Service Businesses in India',
    'ClearWork is the all-in-one platform for service businesses in India \u2014 freelancers, consultants, agencies, and studios. Leads, proposals, e-sign contracts, GST invoices, and UPI payments in one place.',
    'https://getclearwork.in/software-for-service-businesses',
  )

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <SectionLabel>For every kind of service business</SectionLabel>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.05]">
              The all-in-one platform{' '}
              <span className="gradient-text">for service businesses.</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Freelancer, consultant, or a growing agency — if your business runs on winning clients,
              delivering work, and getting paid, ClearWork covers the whole lifecycle. Built for
              India, priced so any business can afford it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <a href={APP_URL}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
                Start free trial
                <ArrowRight size={15} />
              </a>
              <a href="#solutions"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-gray-700 font-semibold text-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
                Find your industry
              </a>
            </div>

            {/* Workflow strip */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
              {flow.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50 border border-indigo-100">
                    <step.icon size={14} className="text-indigo-600" />
                    <span className="text-[13px] font-semibold text-indigo-700">{step.label}</span>
                  </div>
                  {i < flow.length - 1 && <ArrowRight size={13} className="text-gray-300 shrink-0" />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Solutions grid ── */}
      <section id="solutions" className="py-20 bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-14">
            <SectionLabel>Built for your kind of business</SectionLabel>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              One platform. Every service business.
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map(({ icon: Icon, title, body, href }, i) => (
              <FadeIn key={title} delay={i * 0.05}>
                <Link
                  to={href}
                  className="block h-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-indigo-200 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                    <Icon size={18} className="text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5 flex items-center gap-1.5">
                    {title}
                    <ArrowRight size={13} className="text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Affordability ── */}
      <AffordabilitySection />

      {/* ── Trust strip ── */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: IndianRupee, label: 'Free plan, no credit card' },
                { icon: CheckCircle2, label: 'GST + UPI + e-sign built-in' },
                { icon: Briefcase, label: 'Works for solo or a team' },
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
            Whatever kind of service business you run, start here.
          </h2>
          <a href={APP_URL}
            className="inline-flex items-center justify-center gap-2 mt-7 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
            Start free trial
            <ArrowRight size={15} />
          </a>
          <p className="text-xs text-gray-400 mt-3">15-day free Pro trial · Then free forever · No credit card needed</p>
        </div>
      </section>
    </div>
  )
}
