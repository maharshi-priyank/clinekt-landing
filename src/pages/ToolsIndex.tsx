import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowUpRight, Wrench, CheckCircle2,
  Receipt, ClipboardList, FileText, Calculator, Landmark,
  Clock, BarChart3, Hash, Unlock, Lock,
} from 'lucide-react'
import { useSeo } from '../lib/useSeo'
import { useSchemaOrg, breadcrumbSchema } from '../lib/useSchemaOrg'
import type { LucideIcon } from 'lucide-react'

const TOOLS: {
  href: string
  icon: LucideIcon
  iconColor: string
  iconBg: string
  title: string
  desc: string
  tags: string[]
  popular: boolean
}[] = [
  {
    href:      '/tools/gst-invoice-generator',
    icon:      Receipt,
    iconColor: 'text-emerald-600',
    iconBg:    'bg-emerald-50',
    title:     'GST Invoice Generator',
    desc:      'Create professional tax invoices with auto CGST/SGST/IGST split, amount in words, and PDF download. Perfect for registered freelancers.',
    tags:      ['GST', 'Invoice', 'PDF'],
    popular:   true,
  },
  {
    href:      '/tools/quote-generator',
    icon:      ClipboardList,
    iconColor: 'text-blue-600',
    iconBg:    'bg-blue-50',
    title:     'Quote / Estimate Generator',
    desc:      'Build a professional quotation with line items, optional GST, validity period, and terms. Download a client-ready PDF instantly.',
    tags:      ['Quote', 'Estimate', 'PDF'],
    popular:   false,
  },
  {
    href:      '/tools/freelance-contract-generator',
    icon:      FileText,
    iconColor: 'text-violet-600',
    iconBg:    'bg-violet-50',
    title:     'Freelance Contract Generator',
    desc:      'Generate a legally-worded freelance service agreement — IP transfer, revision limits, confidentiality, termination clauses, and more.',
    tags:      ['Contract', 'Legal', 'PDF'],
    popular:   true,
  },
  {
    href:      '/tools/gst-calculator',
    icon:      Calculator,
    iconColor: 'text-orange-600',
    iconBg:    'bg-orange-50',
    title:     'GST Calculator',
    desc:      'Add or remove GST at any rate (0%, 5%, 12%, 18%, 28%). Optional CGST/SGST/IGST split by state. Copy results in one click.',
    tags:      ['GST', 'Calculator'],
    popular:   false,
  },
  {
    href:      '/tools/tds-calculator',
    icon:      Landmark,
    iconColor: 'text-gray-700',
    iconBg:    'bg-gray-100',
    title:     'TDS Calculator',
    desc:      'Calculate TDS under Sections 194J, 194JA, 194JB, and 194C. Handles 206AA (no PAN) and threshold detection.',
    tags:      ['TDS', 'Tax', 'Calculator'],
    popular:   false,
  },
  {
    href:      '/tools/hourly-rate-calculator',
    icon:      Clock,
    iconColor: 'text-amber-600',
    iconBg:    'bg-amber-50',
    title:     'Hourly Rate Calculator',
    desc:      'Work backwards from your income target to a minimum hourly rate. Accounts for GST gross-up, TDS deduction, and non-billable time.',
    tags:      ['Pricing', 'Calculator'],
    popular:   false,
  },
  {
    href:      '/tools/income-tax-calculator',
    icon:      BarChart3,
    iconColor: 'text-indigo-600',
    iconBg:    'bg-indigo-50',
    title:     'Income Tax Calculator',
    desc:      'Compare old vs new regime for FY 2025-26. Enter 80C, 80D, HRA, home loan deductions and see which regime saves more.',
    tags:      ['Income Tax', 'FY 2025-26', 'Calculator'],
    popular:   true,
  },
  {
    href:      '/tools/invoice-number-generator',
    icon:      Hash,
    iconColor: 'text-rose-600',
    iconBg:    'bg-rose-50',
    title:     'Invoice Number Generator',
    desc:      'Design a consistent invoice numbering format with custom prefix, year, month, separator and padding. Preview and export as CSV.',
    tags:      ['Invoice', 'GST'],
    popular:   false,
  },
]

const TRUST_ITEMS = [
  'Free forever',
  'No signup',
  'Works offline',
  'Built for India',
]

const STATS = [
  { num: '8',    label: 'Free tools',        Icon: Wrench },
  { num: '0',    label: 'Signups required',  Icon: Unlock },
  { num: '100%', label: 'Browser-side only', Icon: Lock   },
]

export default function ToolsIndex() {
  useSeo(
    'Free Tools for Freelancers & Agencies — GST Calculator, Invoice Generator, TDS, Contracts | ClearWork',
    'Free tools for freelancers, consultants, and service businesses: GST invoice generator, quote generator, freelance contract generator, TDS calculator, hourly rate calculator, income tax calculator, and more.',
    'https://getclearwork.in/tools',
  )
  useSchemaOrg(breadcrumbSchema([
    { name: 'Home',       item: 'https://getclearwork.in/' },
    { name: 'Free Tools', item: 'https://getclearwork.in/tools' },
  ]))

  return (
    <div className="min-h-screen bg-[#F4F6FB]">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500 mb-5">
            <Wrench size={12} className="text-gray-400" />
            Free Tools
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-950 mb-4 leading-tight">
            Free Tools for Freelancers &amp; Agencies
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Eight free, browser-based tools to handle GST invoicing, contracts, tax calculations, and pricing — no signup, no data sent to servers.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm text-gray-500">
            {TRUST_ITEMS.map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-500" strokeWidth={2.5} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools grid ──────────────────────────────────────────────────── */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS.map(tool => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.href}
                  to={tool.href}
                  className={`group relative bg-white rounded-2xl p-6 border transition-all duration-200 flex flex-col hover:-translate-y-0.5 ${
                    tool.popular
                      ? 'border-gray-200 shadow-md hover:shadow-lg hover:border-gray-300'
                      : 'border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'
                  }`}
                >
                  {tool.popular && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200 rounded-full px-2 py-0.5">
                      Popular
                    </span>
                  )}

                  <div className={`w-12 h-12 rounded-2xl ${tool.iconBg} flex items-center justify-center mb-4`}>
                    <Icon size={22} className={tool.iconColor} strokeWidth={1.75} />
                  </div>

                  <h2 className="font-bold text-gray-900 mb-2 text-[15px] leading-snug">{tool.title}</h2>
                  <p className="text-[13px] text-gray-500 leading-relaxed flex-1">{tool.desc}</p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                    <div className="flex flex-wrap gap-1.5">
                      {tool.tags.map(tag => (
                        <span key={tag} className="text-[11px] font-medium bg-gray-50 text-gray-500 border border-gray-100 rounded-full px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ArrowUpRight
                      size={15}
                      className="text-gray-300 group-hover:text-gray-700 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0"
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Why we built these ──────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Built for the Indian freelance context</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
              Every tool uses Indian GST slabs, TDS sections, lakh/crore numbering, and FY 2025-26 Income Tax rules — not generic global calculators.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {STATS.map(({ num, label, Icon }) => (
              <div key={label} className="flex flex-col items-center p-6 bg-[#F4F6FB] rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-4">
                  <Icon size={18} className="text-gray-700" strokeWidth={1.75} />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{num}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upsell ──────────────────────────────────────────────────────── */}
      <section className="bg-[#101828] py-14 px-4 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-3">One platform</p>
          <h2 className="text-3xl font-bold mb-4">Connect all these workflows in one place.</h2>
          <p className="text-gray-400 mb-8 text-base max-w-xl mx-auto">
            These tools are standalone, but ClearWork connects them — send a quote, convert it to a contract, collect e-signature, raise a GST invoice, collect payment, all in one workflow.
          </p>
          <a
            href="https://app.getclearwork.in/signup"
            className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-xl px-8 py-3 font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Get started free <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ── JSON-LD ─────────────────────────────────────────────────────── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Free Tools for Freelancers & Agencies — ClearWork',
        description: 'Eight free browser-based tools: GST invoice generator, quote generator, freelance contract, TDS calculator, income tax calculator, hourly rate calculator, and invoice number generator.',
        url: 'https://getclearwork.in/tools',
        hasPart: TOOLS.map(t => ({
          '@type': 'SoftwareApplication',
          name: t.title,
          url: `https://getclearwork.in${t.href}`,
          applicationCategory: 'BusinessApplication',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        })),
      }) }} />
    </div>
  )
}
