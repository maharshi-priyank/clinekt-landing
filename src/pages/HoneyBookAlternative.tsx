import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, IndianRupee, Receipt, FileSignature, MessageCircle, CheckCircle2, X, Plus,
  Zap, Shield, Users, FolderKanban, LayoutGrid, Globe, CreditCard,
} from 'lucide-react'
import { useSeo } from '../lib/useSeo'
import { FadeIn } from '../components/ui/FadeIn'
import AffordabilitySection from '../components/AffordabilitySection'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const APP_URL = 'https://app.getclearwork.in/signup'
const CANONICAL = 'https://getclearwork.in/alternatives/honeybook-alternative-india'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
      {children}
    </span>
  )
}

const painPoints = [
  {
    title: 'Dollar pricing',
    body: 'HoneyBook bills in USD, so the real cost in rupees is higher than it looks and shifts with the exchange rate.',
  },
  {
    title: 'Not built for GST',
    body: 'Invoices follow US tax norms — no GSTIN field, no CGST/SGST/IGST split, no SAC codes for Indian compliance.',
  },
  {
    title: 'Payments assume US rails',
    body: 'Stripe-based payouts do not support Indian bank accounts or UPI the way your clients actually pay.',
  },
  {
    title: 'No lasting free plan',
    body: 'HoneyBook is paid-only with a short trial. There is no free tier to grow into while you build your client base.',
  },
]

const clearworkFeatures = [
  { icon: FileSignature, title: 'Proposals & e-sign', body: 'Send polished proposals clients accept and sign digitally — OTP e-sign valid under the IT Act 2000.' },
  { icon: Receipt, title: 'GST invoicing', body: 'Rule 46 compliant invoices with your GSTIN, SAC codes, and automatic CGST/SGST/IGST split.' },
  { icon: FolderKanban, title: 'Projects & tasks', body: 'Kanban boards, deadlines, and budgets for every client engagement — not just documents.' },
  { icon: Users, title: 'CRM & pipeline', body: 'Leads, contacts, and a visual pipeline from first enquiry to paid invoice in one place.' },
  { icon: LayoutGrid, title: 'Client portal', body: 'A branded portal where clients view work, sign documents, and download invoices.' },
  { icon: CreditCard, title: 'Payments & tracking', body: 'Razorpay payment links — UPI, cards, net banking — plus overdue reminders on WhatsApp.' },
]

const otherAlternatives = [
  {
    name: 'Dubsado',
    body: 'Deep workflows and forms for creatives — but US-focused, dollar-priced, and missing GST and UPI native to India.',
    href: '/alternatives/dubsado-alternative-india',
  },
  {
    name: 'Bonsai',
    body: 'Polished all-in-one for US freelancers. Works technically in India but lacks GST invoicing and UPI collection.',
    href: '/alternatives/bonsai-alternative-india',
  },
  {
    name: 'Refrens',
    body: 'Strong Indian invoicing and GST billing. Better on the invoice side than the full proposal-to-portal client flow.',
    href: '/blog/refrens-alternative-india',
  },
  {
    name: 'Clienter',
    body: 'India-first creative suite with GST and rupee pricing (from ₹199/mo). Similar market — compare proposal depth, portals, and team features for your workflow.',
    href: 'https://clienter.co.in/alternatives/honeybook-alternative-india',
    external: true,
  },
]

const shortCompare = [
  { honeybook: 'Priced in US dollars', clearwork: 'Rupee pricing — free plan + Pro from ₹149/mo' },
  { honeybook: 'Invoicing built around US tax norms', clearwork: 'GST-ready invoices with your GSTIN' },
  { honeybook: 'Payments via Stripe — no UPI', clearwork: 'Razorpay — UPI, cards, net banking' },
  { honeybook: 'Not available for Indian payouts', clearwork: 'Built for how India bills and gets paid' },
  { honeybook: 'Paid-only, no lasting free tier', clearwork: '15-day Pro trial, then free plan forever' },
]

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

const faqs = [
  {
    q: 'What is the best HoneyBook alternative in India?',
    a: 'For Indian service businesses, the best HoneyBook alternative is one that keeps the smooth proposal-to-payment flow but adds GST invoicing, UPI payments, and rupee pricing. ClearWork covers proposals with e-sign, GST invoices, projects, CRM, and a client portal — starting with a 15-day Pro trial and a free plan after.',
  },
  {
    q: 'Is HoneyBook available in India?',
    a: 'No. HoneyBook is a US-centric product — its payment processing runs on Stripe, which does not support Indian bank accounts for merchant payouts. Indian freelancers cannot receive client payments through HoneyBook in a practical way.',
  },
  {
    q: 'Is ClearWork cheaper than HoneyBook?',
    a: 'For Indian users, yes. HoneyBook\'s starter plan is about $16/month (~₹1,340). ClearWork Pro is ₹149/month during early access (regular ₹249/mo) with a free plan for up to 5 clients — no credit card required to start.',
  },
  {
    q: 'Does ClearWork do proposals and contracts like HoneyBook?',
    a: 'Yes — ClearWork supports quotations and proposals with OTP e-sign so clients can accept and sign inside their portal. HoneyBook has a longer history of US contract templates; for typical Indian proposal-to-invoice workflows, ClearWork covers the full path.',
  },
  {
    q: 'How does ClearWork compare to Clienter for HoneyBook alternatives?',
    a: 'Both are India-first tools targeting creatives and service businesses HoneyBook cannot serve. ClearWork emphasises the full lead-to-payment workflow (CRM, proposals, contracts, GST invoicing, client portal) from a 15-day Pro trial with a free tier after. Clienter is another credible option — compare pricing, portal features, and project management depth for your specific business.',
  },
  {
    q: 'Can I use ClearWork if some clients are international?',
    a: 'Yes. ClearWork supports multi-currency invoicing on the Studio plan, and OTP e-sign works for any client with a phone number regardless of location.',
  },
]

export default function HoneyBookAlternative() {
  useSeo(
    'HoneyBook Alternative India — ClearWork for Service Businesses',
    'HoneyBook doesn\u2019t work in India — no UPI, no GST, Stripe-only payments. ClearWork is the India-ready HoneyBook alternative with rupee pricing and a free plan.',
    CANONICAL,
  )

  return (
    <div className="bg-white">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-5 lg:px-8 pt-24 pb-2">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-400">
          <li><Link to="/" className="hover:text-gray-600">Home</Link></li>
          <li>/</li>
          <li><Link to="/alternatives" className="hover:text-gray-600">Alternatives</Link></li>
          <li>/</li>
          <li className="text-gray-600 font-medium">HoneyBook Alternative India</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <SectionLabel>HoneyBook alternative · India</SectionLabel>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.05]">
              The HoneyBook alternative{' '}
              <span className="gradient-text">made for India.</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              HoneyBook is a polished client-management suite — but it is built for the US and priced in
              dollars. ClearWork gives service businesses the same proposal-to-payment flow, tuned for GST,
              rupees, and how Indian clients actually pay.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <a href={APP_URL}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
                Start free trial
                <ArrowRight size={15} />
              </a>
              <a href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-gray-700 font-semibold text-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
                See pricing
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
              {['GST + UPI built-in', '15-day free Pro trial', 'Free plan after trial'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-gray-400">
                  <CheckCircle2 size={12} className="text-emerald-500" strokeWidth={2.5} />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why look for alternatives */}
      <section className="py-16 border-y border-gray-100 bg-gray-50/60">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight">
              Why service businesses look for a HoneyBook alternative in India
            </h2>
            <div className="mt-6 space-y-4 text-[15px] text-gray-600 leading-relaxed">
              <p>
                HoneyBook is genuinely good software for US and Canadian creatives — proposals, contracts,
                payments, and client conversations in one polished product. The friction is geography, not
                quality: HoneyBook is priced in dollars, its tax features follow US norms, and payments run
                through Stripe rather than UPI and Indian bank transfers.
              </p>
              <p>
                For an Indian consultant, agency, or studio, that means a higher real cost in rupees, no
                meaningful GST invoicing, and no practical way to get paid through HoneyBook&apos;s payment
                flow. ClearWork is the India-first alternative: the same end-to-end idea, with GST-ready
                billing, rupee pricing, and a free plan so you can start today.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-14">
            <SectionLabel>Where HoneyBook falls short in India</SectionLabel>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              A mature suite — built for the wrong market.
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {painPoints.map(({ title, body }, i) => (
              <FadeIn key={title} delay={i * 0.06}>
                <div className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How ClearWork fits */}
      <section className="py-20 bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-14">
            <SectionLabel>How ClearWork fits</SectionLabel>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              The proposal-to-payment flow you wanted — tuned for India.
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {clearworkFeatures.map(({ icon: Icon, title, body }, i) => (
              <FadeIn key={title} delay={i * 0.05}>
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

      {/* Other alternatives */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <FadeIn className="mb-10">
            <SectionLabel>Other HoneyBook alternatives worth knowing</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold text-gray-950 tracking-tight">
              ClearWork isn&apos;t the only option — here&apos;s an honest lay of the land.
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Details are our fair reading as of August 2026 — check each tool&apos;s site for current features and pricing.
            </p>
          </FadeIn>
          <div className="space-y-4">
            {otherAlternatives.map((alt, i) => (
              <FadeIn key={alt.name} delay={i * 0.05}>
                {alt.external ? (
                  <a
                    href={alt.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-sm transition-all"
                  >
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      {alt.name}
                      <Globe size={13} className="text-gray-400" />
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{alt.body}</p>
                  </a>
                ) : (
                  <Link
                    to={alt.href}
                    className="block rounded-2xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-sm transition-all"
                  >
                    <h3 className="font-bold text-gray-900">{alt.name}</h3>
                    <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{alt.body}</p>
                  </Link>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Short compare */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              HoneyBook vs ClearWork, in short
            </h2>
            <p className="mt-3 text-white/50 text-sm">Same client-management idea — different home market.</p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-2 bg-white/5 text-xs font-semibold uppercase tracking-wide text-white/40">
                <div className="px-5 py-3 border-b border-white/10">HoneyBook</div>
                <div className="px-5 py-3 border-b border-white/10 border-l border-white/10 text-indigo-300">With ClearWork</div>
              </div>
              {shortCompare.map((row, i) => (
                <div key={row.honeybook} className={`grid grid-cols-2 text-sm ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                  <div className="px-5 py-3.5 text-white/50 border-t border-white/10">{row.honeybook}</div>
                  <div className="px-5 py-3.5 text-white/90 font-medium border-t border-l border-white/10">{row.clearwork}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Full comparison table */}
      <section id="compare" className="py-20">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <FadeIn className="text-center mb-12">
            <SectionLabel>Feature comparison</SectionLabel>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
              ClearWork vs. HoneyBook
            </h2>
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

      <AffordabilitySection className="py-20 bg-gray-50/60 border-y border-gray-100" />

      {/* Trust strip */}
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

      {/* FAQ */}
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
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900">HoneyBook alternative FAQs</h2>
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

      {/* Closing CTA */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight">
            Get a platform built for India
          </h2>
          <p className="mt-3 text-gray-500 text-sm">Start with a 15-day Pro trial — then stay on free if you prefer.</p>
          <a href={APP_URL}
            className="inline-flex items-center justify-center gap-2 mt-7 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/10">
            Create free account
            <ArrowRight size={15} />
          </a>
          <p className="text-sm text-gray-400 mt-8">
            <Link to="/alternatives" className="text-indigo-600 font-medium hover:underline">All alternatives</Link>
            {' · '}
            <Link to="/alternatives/bonsai-alternative-india" className="text-indigo-600 font-medium hover:underline">Bonsai alternative</Link>
            {' · '}
            <Link to="/alternatives/dubsado-alternative-india" className="text-indigo-600 font-medium hover:underline">Dubsado alternative</Link>
            {' · '}
            <Link to="/blog/honeybook-alternative-india" className="text-indigo-600 font-medium hover:underline">Detailed blog guide</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
