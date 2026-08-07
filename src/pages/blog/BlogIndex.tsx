import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { useSeo } from '../../lib/useSeo'
import { useScrollDepth } from '../../hooks/useScrollDepth'
import { trackBlogRead } from '../../lib/analytics'

const POSTS = [
  {
    slug: 'how-to-write-freelance-proposal-india',
    title: 'How to Write a Freelance Proposal That Gets Signed (India Guide)',
    description: 'A 6-part structure for freelance proposals that actually get signed in India — with a real worked example, GST-clear pricing, and what to do the moment a client says yes.',
    date: 'August 2026',
    readTime: '9 min',
    category: 'Proposals & Contracts',
    toolHref: '/tools/quote-generator',
    toolLabel: 'Free Quote Generator',
  },
  {
    slug: 'freelancer-client-follow-up-india',
    title: "Client Ghosted After Your Proposal? Here's How to Follow Up (India)",
    description: 'Most freelancers lose deals from silence, not rejection. A 3-touch WhatsApp follow-up system for Indian freelancers, with copy-paste scripts that actually get replies.',
    date: 'August 2026',
    readTime: '8 min',
    category: 'Client Management',
  },
  {
    slug: 'gst-for-freelancers-india-complete-guide',
    title: 'GST for Freelancers in India: The Complete 2026 Guide',
    description: 'Do you need GST registration as a freelancer? Thresholds, rates, filing deadlines, and common mistakes — the complete 2026 guide for Indian freelancers and consultants.',
    date: 'August 2026',
    readTime: '11 min',
    category: 'GST & Invoicing',
    toolHref: '/tools/gst-calculator',
    toolLabel: 'Free GST Calculator',
  },
  {
    slug: 'how-to-create-gst-invoice-india',
    title: 'How to Create a GST Invoice in India: Complete Guide for Freelancers',
    description: 'Step-by-step guide to creating GST-compliant invoices as a freelancer. Covers mandatory fields, CGST/SGST/IGST, SAC codes, due dates, and common mistakes.',
    date: 'June 2026',
    readTime: '8 min',
    category: 'GST & Invoicing',
    toolHref: '/tools/gst-invoice-generator',
    toolLabel: 'Free GST Invoice Generator',
  },
  {
    slug: 'is-e-signature-legal-india',
    title: 'Is E-Signature Legal in India? Everything Freelancers Need to Know',
    description: "E-signatures are fully legal in India under the IT Act 2000. Learn which contracts they cover, which they don't, and what makes your digital contract enforceable.",
    date: 'June 2026',
    readTime: '7 min',
    category: 'Legal & Contracts',
    toolHref: '/tools/freelance-contract-generator',
    toolLabel: 'Free Contract Generator',
  },
  {
    slug: 'tds-on-freelance-income-194j-194c-india',
    title: 'TDS on Freelance Income: Section 194J vs 194C Explained',
    description: 'TDS at 10% under Section 194J applies to most Indian freelancers — not 194C. Learn rates, thresholds, Form 26AS, refund claims, and how to handle TDS on invoices.',
    date: 'June 2026',
    readTime: '7 min',
    category: 'Tax & TDS',
    toolHref: '/tools/tds-calculator',
    toolLabel: 'Free TDS Calculator',
  },
  {
    slug: 'how-to-write-freelance-contract-india',
    title: 'How to Write a Freelance Contract in India (That Actually Protects You)',
    description: '8 essential clauses every Indian freelance contract needs: scope, payment terms, IP ownership, revision policy, kill fee, NDA, dispute resolution, and e-sign under IT Act 2000.',
    date: 'June 2026',
    readTime: '7 min',
    category: 'Legal & Contracts',
    toolHref: '/tools/freelance-contract-generator',
    toolLabel: 'Free Contract Generator',
  },
  {
    slug: 'old-vs-new-tax-regime-freelancer-india',
    title: 'Old vs New Tax Regime for Freelancers in India (2026): Which One Saves More?',
    description: 'New vs old tax regime FY 2025-26: updated slabs, 3 worked examples at ₹8L/₹15L/₹25L, Section 44ADA explained, ITR-3 vs ITR-4, and when to file Form 10-IEA.',
    date: 'June 2026',
    readTime: '8 min',
    category: 'Tax & TDS',
    toolHref: '/tools/income-tax-calculator',
    toolLabel: 'Income Tax Calculator',
  },
  {
    slug: 'honeybook-alternative-india',
    title: 'HoneyBook Alternative India — Why HoneyBook Doesn\'t Work for Indian Freelancers',
    description: 'HoneyBook is not available in India — no GST, no UPI, Stripe-only payments. ClearWork is the India-ready alternative with GST invoicing, UPI payments, and e-sign contracts from ₹149/mo.',
    date: 'June 2026',
    readTime: '6 min',
    category: 'Freelancer Tools',
  },
  {
    slug: 'bonsai-alternative-india',
    title: 'Bonsai Alternative India — Why Indian Freelancers Need More Than Bonsai',
    description: 'Bonsai has no GST support, no UPI payment link, and costs $17/mo (₹1,400). ClearWork is the India-ready alternative with full GST invoicing, UPI payments, and WhatsApp reminders at ₹149/mo.',
    date: 'June 2026',
    readTime: '5 min',
    category: 'Freelancer Tools',
  },
  {
    slug: 'refrens-alternative-india',
    title: 'Refrens Alternative India — ClearWork vs Refrens Compared (2026)',
    description: 'Refrens is excellent for invoicing but has no proposals, no e-sign contracts, no CRM, and no client portal. ClearWork covers the full freelance workflow in one tool.',
    date: 'June 2026',
    readTime: '5 min',
    category: 'Freelancer Tools',
  },
  {
    slug: 'honeybook-bonsai-dubsado-alternative-india',
    title: 'HoneyBook vs Bonsai vs Dubsado Alternative India — What Indian Freelancers Actually Need',
    description: 'HoneyBook is blocked in India. Bonsai and Dubsado lack GST and UPI. Compare all three global tools vs ClearWork — the India-built alternative with GST invoicing, UPI payments, and IT Act e-sign from ₹149/mo.',
    date: 'June 2026',
    readTime: '10 min',
    category: 'Freelancer Tools',
  },
  {
    slug: 'best-freelancer-software-india-2026',
    title: 'Best Freelancer Software India 2026 — Complete Comparison (All-in-One Tools)',
    description: 'The 6 best freelancer tools for India in 2026 — compared on GST invoicing, UPI payments, e-sign, and INR pricing. ClearWork is the only tool that passes all India-specific criteria.',
    date: 'June 2026',
    readTime: '8 min',
    category: 'Freelancer Tools',
  },
  {
    slug: 'free-invoice-software-india',
    title: 'Free Invoice Software for Freelancers India 2026 — GST-Ready Options Compared',
    description: 'The best free invoice software for Indian freelancers in 2026 — with GST (CGST/SGST/IGST), UPI payment links, and TDS support. ClearWork is free during early access with full Studio features.',
    date: 'June 2026',
    readTime: '7 min',
    category: 'GST & Invoicing',
    toolHref: '/tools/gst-invoice-generator',
    toolLabel: 'Free GST Invoice Generator',
  },
  {
    slug: 'free-client-management-software-india',
    title: 'Free Client Management Software for Freelancers India 2026',
    description: 'The best free client management software for Indian freelancers — proposals, contracts, GST invoices, and UPI payments in one tool. ClearWork is fully free during early access.',
    date: 'June 2026',
    readTime: '7 min',
    category: 'Freelancer Tools',
  },
  {
    slug: 'freelancer-billing-software-india',
    title: 'Best Freelancer Billing Software India 2026 — GST, UPI & TDS in One Tool',
    description: 'The best billing software for Indian freelancers — GST auto-calculation, UPI payment links, TDS tracking, and WhatsApp reminders. ClearWork is free during early access.',
    date: 'June 2026',
    readTime: '8 min',
    category: 'GST & Invoicing',
    toolHref: '/tools/tds-calculator',
    toolLabel: 'Free TDS Calculator',
  },
  {
    slug: 'how-to-manage-clients-freelancer-india',
    title: 'How to Manage Clients as a Freelancer in India — Complete 2026 Guide',
    description: 'A complete guide to managing freelance clients in India — from first contact to final payment. Covers proposals, contracts, GST invoices, TDS, and getting paid via UPI without chasing clients.',
    date: 'June 2026',
    readTime: '9 min',
    category: 'Freelancer Tools',
  },
  {
    slug: 'bonsai-zoom-acquisition-india-alternative',
    title: 'Bonsai Acquired by Zoom: What Indian Freelancers Should Do Now',
    description: 'Zoom acquired Bonsai. For Indian freelancers this changes everything — Bonsai never supported GST or UPI anyway. Here\'s the best India alternative in 2026.',
    date: 'June 2026',
    readTime: '7 min',
    category: 'Freelancer Tools',
  },
  {
    slug: 'zoho-books-alternative-india-freelancers',
    title: 'Zoho Books Alternative India — Simpler Tools for Freelancers',
    description: 'Zoho Books is built for businesses with accountants, not solo freelancers. Compare simpler alternatives with GST invoicing, UPI payments, and proposals built in.',
    date: 'June 2026',
    readTime: '8 min',
    category: 'Freelancer Tools',
  },
  {
    slug: 'refrens-vs-clearwork',
    title: 'Refrens vs ClearWork — Which Is Right for Indian Freelancers?',
    description: 'Refrens is great for GST invoicing but stops there. ClearWork adds proposals, e-sign contracts, CRM, and WhatsApp reminders. Full feature comparison for Indian freelancers.',
    date: 'June 2026',
    readTime: '7 min',
    category: 'Freelancer Tools',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  'GST & Invoicing':      'bg-indigo-50 text-indigo-700',
  'Legal & Contracts':    'bg-emerald-50 text-emerald-700',
  'Tax & TDS':            'bg-amber-50 text-amber-700',
  'Freelancer Tools':     'bg-violet-50 text-violet-700',
  'Proposals & Contracts': 'bg-sky-50 text-sky-700',
  'Client Management':    'bg-rose-50 text-rose-700',
}

export default function BlogIndex() {
  useSeo(
    'Blog — GST, Contracts & Freelance Finance Guides | ClearWork',
    'Practical guides for Indian freelancers: GST invoicing, e-sign contracts, TDS, income tax, and getting paid on time. Free tools included.',
    'https://getclearwork.in/blog',
  )
  useScrollDepth('blog')
  trackBlogRead('blog')

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-5 py-12 md:py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Blog</h1>
          <p className="text-lg text-gray-500 max-w-xl">
            Practical guides on GST invoicing, contracts, and getting paid — written for
            Indian freelancers and small agencies.
          </p>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-4xl mx-auto px-5 py-12">
        <div className="space-y-6">
          {POSTS.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block bg-white border border-gray-100 rounded-2xl p-7 hover:border-indigo-100 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-600'}`}>
                      {post.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-indigo-700 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-500 text-[15px] leading-relaxed mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  <div className="flex items-center gap-5 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {post.readTime} read
                    </span>
                    {post.toolLabel && (
                      <span className="text-indigo-400 text-xs font-medium">
                        Includes: {post.toolLabel}
                      </span>
                    )}
                  </div>
                </div>

                <ArrowRight
                  size={20}
                  className="text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all mt-1 shrink-0"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
