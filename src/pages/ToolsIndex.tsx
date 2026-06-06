import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useSeo } from '../lib/useSeo'

const TOOLS = [
  {
    href:     '/tools/gst-invoice-generator',
    emoji:    '🧾',
    title:    'GST Invoice Generator',
    desc:     'Create professional tax invoices with auto CGST/SGST/IGST split, amount in words, and PDF download. Perfect for registered freelancers.',
    tags:     ['GST', 'Invoice', 'PDF'],
    popular:  true,
  },
  {
    href:     '/tools/quote-generator',
    emoji:    '📋',
    title:    'Quote / Estimate Generator',
    desc:     'Build a professional quotation with line items, optional GST, validity period, and terms. Download a client-ready PDF instantly.',
    tags:     ['Quote', 'Estimate', 'PDF'],
    popular:  false,
  },
  {
    href:     '/tools/freelance-contract-generator',
    emoji:    '📝',
    title:    'Freelance Contract Generator',
    desc:     'Generate a legally-worded freelance service agreement — IP transfer, revision limits, confidentiality, termination clauses, and more.',
    tags:     ['Contract', 'Legal', 'PDF'],
    popular:  true,
  },
  {
    href:     '/tools/gst-calculator',
    emoji:    '🔢',
    title:    'GST Calculator',
    desc:     'Add or remove GST at any rate (0%, 5%, 12%, 18%, 28%). Optional CGST/SGST/IGST split by state. Copy results in one click.',
    tags:     ['GST', 'Calculator'],
    popular:  false,
  },
  {
    href:     '/tools/tds-calculator',
    emoji:    '🏦',
    title:    'TDS Calculator',
    desc:     'Calculate TDS under Sections 194J, 194JA, 194JB, and 194C. Handles 206AA (no PAN) and threshold detection.',
    tags:     ['TDS', 'Tax', 'Calculator'],
    popular:  false,
  },
  {
    href:     '/tools/hourly-rate-calculator',
    emoji:    '⏱️',
    title:    'Hourly Rate Calculator',
    desc:     'Work backwards from your income target to a minimum hourly rate. Accounts for GST gross-up, TDS deduction, and non-billable time.',
    tags:     ['Pricing', 'Calculator'],
    popular:  false,
  },
  {
    href:     '/tools/income-tax-calculator',
    emoji:    '📊',
    title:    'Income Tax Calculator',
    desc:     'Compare old vs new regime for FY 2025-26. Enter 80C, 80D, HRA, home loan deductions and see which regime saves more.',
    tags:     ['Income Tax', 'FY 2025-26', 'Calculator'],
    popular:  true,
  },
  {
    href:     '/tools/invoice-number-generator',
    emoji:    '🔢',
    title:    'Invoice Number Generator',
    desc:     'Design a consistent invoice numbering format with custom prefix, year, month, separator and padding. Preview and export as CSV.',
    tags:     ['Invoice', 'GST'],
    popular:  false,
  },
]

export default function ToolsIndex() {
  useSeo(
    'Free Tools for Indian Freelancers — GST, TDS, Tax, Contracts | ClearWork',
    'Eight free tools built for Indian freelancers: GST invoice generator, quote generator, freelance contract generator, TDS calculator, income tax calculator, and more.',
  )

  return (
    <div className="min-h-screen bg-[#F4F6FB] pt-16">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="bg-[#101828] text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium mb-5">
            🛠️ Free Tools
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            Free Tools for Indian Freelancers
          </h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Eight free, browser-based tools to handle GST invoicing, contracts, tax calculations, and pricing — no signup, no data sent to servers.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm text-gray-400">
            <span>✅ Free forever</span>
            <span>✅ No signup</span>
            <span>✅ Works offline</span>
            <span>✅ Built for India</span>
          </div>
        </div>
      </section>

      {/* ── Tools grid ──────────────────────────────────────────────────── */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS.map(tool => (
              <Link
                key={tool.href}
                to={tool.href}
                className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{tool.emoji}</span>
                  <div className="flex items-center gap-2">
                    {tool.popular && (
                      <span className="text-[10px] font-semibold bg-amber-50 text-amber-600 border border-amber-200 rounded-full px-2 py-0.5">
                        Popular
                      </span>
                    )}
                    <ArrowUpRight size={16} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
                <h2 className="font-bold text-gray-900 mb-2 text-[15px] leading-snug">{tool.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{tool.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {tool.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-medium bg-gray-50 text-gray-500 border border-gray-100 rounded-full px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why we built these ──────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Built for Indian Freelancers</h2>
          <p className="text-gray-500 text-center text-sm leading-relaxed max-w-xl mx-auto mb-8">
            Every tool here is designed specifically for the Indian freelance context — GST slabs, TDS sections, Indian numbering (lakh/crore), and the Income Tax rules for FY 2025-26.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { num: '8', label: 'Free tools', icon: '🛠️' },
              { num: '0', label: 'Signups required', icon: '🔓' },
              { num: '100%', label: 'Browser-side only', icon: '🔒' },
            ].map(({ num, label, icon }) => (
              <div key={label} className="p-5 bg-gray-50 rounded-2xl">
                <p className="text-3xl mb-1">{icon}</p>
                <p className="text-2xl font-bold text-gray-900">{num}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
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
            These tools are standalone, but ClearWork connects them — send a quote, convert it to a contract, collect e-signature, raise a GST invoice, collect Razorpay payment, all in one workflow.
          </p>
          <a
            href="/#waitlist"
            className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-xl px-8 py-3 font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Join the Waitlist <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ── JSON-LD ─────────────────────────────────────────────────────── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Free Tools for Indian Freelancers — ClearWork',
        description: 'Eight free browser-based tools: GST invoice generator, quote generator, freelance contract, TDS calculator, income tax calculator, hourly rate calculator, and invoice number generator.',
        url: 'https://clearwork.in/tools',
        hasPart: TOOLS.map(t => ({
          '@type': 'SoftwareApplication',
          name: t.title,
          url: `https://clearwork.in${t.href}`,
          applicationCategory: 'BusinessApplication',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        })),
      }) }} />
    </div>
  )
}
