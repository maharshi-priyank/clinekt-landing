import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { useSeo } from '../../lib/useSeo'

const POSTS = [
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
]

const CATEGORY_COLORS: Record<string, string> = {
  'GST & Invoicing':  'bg-indigo-50 text-indigo-700',
  'Legal & Contracts': 'bg-emerald-50 text-emerald-700',
}

export default function BlogIndex() {
  useSeo(
    'Blog — GST, Contracts & Freelance Finance Guides | ClearWork',
    'Practical guides for Indian freelancers: GST invoicing, e-sign contracts, TDS, income tax, and getting paid on time. Free tools included.',
    'https://getclearwork.in/blog',
  )

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
                    <span className="text-indigo-400 text-xs font-medium">
                      Includes: {post.toolLabel}
                    </span>
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
