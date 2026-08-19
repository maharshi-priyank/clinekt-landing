import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Calendar, Search, X, FileQuestion } from 'lucide-react'
import { useSeo } from '../../lib/useSeo'
import { useScrollDepth } from '../../hooks/useScrollDepth'
import { trackBlogRead } from '../../lib/analytics'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const POSTS = [
  {
    slug: 'gst-number-format-explained',
    title: 'GST Number Format Explained: How to Read a GSTIN (With Examples)',
    description: 'What does a GST number look like? Full breakdown of the 15-character GSTIN format, a worked example, state codes, how to spot a fake GSTIN, and sample numbers for testing.',
    date: 'August 2026',
    readTime: '7 min',
    category: 'GST & Invoicing',
    toolHref: '/tools/gst-invoice-generator',
    toolLabel: 'Free GST Invoice Generator',
  },
  {
    slug: 'how-to-get-freelance-clients-india',
    title: 'How to Get Freelance Clients in India: 15 Proven Channels (2026)',
    description: 'The 15 channels Indian freelancers actually use to land clients in 2026 — warm referrals, LinkedIn, Google Maps outreach, cold email, and which freelance platforms are worth your time.',
    date: 'August 2026',
    readTime: '10 min',
    category: 'Client Acquisition',
  },
  {
    slug: 'retainer-vs-project-pricing-agencies-india',
    title: 'Monthly Retainer vs Project Pricing: Which Is Better for Your Agency?',
    description: 'Retainer vs project pricing for Indian agencies — cash flow, margins, and client fit compared, plus the 60/40 hybrid model most profitable agencies actually run.',
    date: 'August 2026',
    readTime: '9 min',
    category: 'Agency Operations',
  },
  {
    slug: 'freelance-invoice-format-india',
    title: 'Freelance Invoice Format India: What to Include (GST or Not)',
    description: 'Not every Indian freelancer needs a GST invoice. Here\'s the correct invoice format whether you\'re GST-registered or not, with every mandatory field and a downloadable-style example.',
    date: 'August 2026',
    readTime: '8 min',
    category: 'GST & Invoicing',
    toolHref: '/tools/gst-invoice-generator',
    toolLabel: 'Free GST Invoice Generator',
  },
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
    slug: 'dubsado-alternative-india',
    title: 'Dubsado Alternative India — Why Indian Freelancers Need More Than Dubsado',
    description: 'Dubsado has no GST invoicing, no UPI payments, and costs ~$20/mo (₹1,660). ClearWork is the India-ready alternative — free plan forever, Pro at ₹149/mo.',
    date: 'August 2026',
    readTime: '6 min',
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
    description: 'The best free invoice software for Indian freelancers in 2026 — with GST (CGST/SGST/IGST) and UPI payment links. ClearWork\u2019s Free plan costs nothing, ever.',
    date: 'June 2026',
    readTime: '7 min',
    category: 'GST & Invoicing',
    toolHref: '/tools/gst-invoice-generator',
    toolLabel: 'Free GST Invoice Generator',
  },
  {
    slug: 'free-client-management-software-india',
    title: 'Free Client Management Software for Freelancers India 2026',
    description: 'The best free client management software for Indian freelancers — proposals, contracts, GST invoices, and UPI payments in one tool. Free plan available, no credit card.',
    date: 'June 2026',
    readTime: '7 min',
    category: 'Freelancer Tools',
  },
  {
    slug: 'freelancer-billing-software-india',
    title: 'Best Freelancer Billing Software India 2026 — GST, UPI & TDS in One Tool',
    description: 'The best billing software for Indian freelancers — GST auto-calculation, UPI payment links, TDS tracking, and WhatsApp reminders. Free plan available, Pro from \u20b9149/mo.',
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
  'GST & Invoicing':       'bg-indigo-50 text-indigo-700',
  'Legal & Contracts':     'bg-emerald-50 text-emerald-700',
  'Tax & TDS':             'bg-amber-50 text-amber-700',
  'Freelancer Tools':      'bg-violet-50 text-violet-700',
  'Proposals & Contracts': 'bg-sky-50 text-sky-700',
  'Client Management':     'bg-rose-50 text-rose-700',
  'Client Acquisition':    'bg-orange-50 text-orange-700',
  'Agency Operations':     'bg-teal-50 text-teal-700',
}

const CATEGORIES = ['All', ...Array.from(new Set(POSTS.map(p => p.category)))]

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}
const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
}

function PostCard({ post, featured = false }: { post: typeof POSTS[0]; featured?: boolean }) {
  const categoryColor = CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-600'

  if (featured) {
    return (
      <Link
        to={`/blog/${post.slug}`}
        className="group flex flex-col bg-[#101828] rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)] hover:-translate-y-0.5"
      >
        <div className="p-7 sm:p-9 flex flex-col h-full">
          <div className="flex items-center gap-2.5 mb-5">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor}`}>
              {post.category}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/15 text-white/80">Latest</span>
          </div>

          <h2 className="font-bold text-white text-xl sm:text-2xl md:text-3xl leading-snug mb-3 group-hover:text-white/90 transition-colors">
            {post.title}
          </h2>

          <p className="text-gray-400 text-[15px] leading-relaxed mb-6 max-w-2xl flex-1">
            {post.description}
          </p>

          <div className="flex items-center justify-between gap-4 mt-auto">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {post.readTime} read
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 group-hover:text-white/90 group-hover:gap-2 transition-all">
              Read article <ArrowRight size={13} />
            </span>
          </div>

          {post.toolLabel && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-indigo-400 font-medium">Includes: {post.toolLabel}</p>
            </div>
          )}
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-200 hover:border-gray-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
    >
      <div className="mb-3">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor}`}>
          {post.category}
        </span>
      </div>

      <h2 className="font-bold text-gray-900 text-[15px] leading-snug mb-2 group-hover:text-indigo-700 transition-colors">
        {post.title}
      </h2>

      <p className="text-[13px] text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">
        {post.description}
      </p>

      <div className="flex items-center justify-between gap-4 mt-auto pt-3 border-t border-gray-50">
        <div className="flex items-center gap-3 text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {post.readTime}
          </span>
        </div>
        <ArrowRight
          size={15}
          className="text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all shrink-0"
        />
      </div>

      {post.toolLabel && (
        <p className="text-indigo-500 text-[11px] font-medium mt-2.5">
          Includes: {post.toolLabel}
        </p>
      )}
    </Link>
  )
}

export default function BlogIndex() {
  useSeo(
    'Blog — GST, Contracts & Freelance Finance Guides | ClearWork',
    'Practical guides for Indian freelancers: GST invoicing, e-sign contracts, TDS, income tax, and getting paid on time. Free tools included.',
    'https://getclearwork.in/blog',
  )
  useScrollDepth('blog')
  trackBlogRead('blog')

  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return POSTS.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory
      const matchesQuery = q === '' || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory])

  const isFiltering = query.trim() !== '' || activeCategory !== 'All'
  const featuredPost = !isFiltering ? filtered[0] : null
  const gridPosts = featuredPost ? filtered.slice(1) : filtered

  return (
    <div className="bg-[#F4F6FB] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 pt-28 pb-12 md:pb-16">
          <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full px-3 py-1 mb-5">
            {POSTS.length} articles
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-950 mb-3 leading-tight">
            Guides for Indian freelancers
          </h1>
          <p className="text-base text-gray-500 max-w-xl leading-relaxed">
            Practical, India-specific guides on GST invoicing, e-sign contracts, TDS, tax, and getting clients — no fluff.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-10 md:py-12">

        {/* Search + category filters */}
        <div className="mb-10 space-y-4">
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search blog articles"
              className="w-full pl-10 pr-9 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {CATEGORIES.map(cat => {
              const colorClass = cat !== 'All' ? (CATEGORY_COLORS[cat] ?? '') : ''
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? cat === 'All'
                        ? 'bg-gray-950 text-white shadow-sm'
                        : `${colorClass} shadow-sm ring-1 ring-inset ring-current/20`
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 px-5 rounded-2xl border border-dashed border-gray-200">
            <FileQuestion size={32} className="text-gray-300 mb-4" />
            <p className="text-gray-700 font-semibold mb-1">No articles found</p>
            <p className="text-gray-400 text-sm mb-5">Try a different search term or category.</p>
            <button
              type="button"
              onClick={() => { setQuery(''); setActiveCategory('All') }}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            key={`${query}-${activeCategory}`}
            variants={grid}
            initial="hidden"
            animate="show"
          >
            {featuredPost && (
              <motion.div variants={card} className="mb-6">
                <PostCard post={featuredPost} featured />
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {gridPosts.map(post => (
                <motion.div key={post.slug} variants={card} className="h-full">
                  <PostCard post={post} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
