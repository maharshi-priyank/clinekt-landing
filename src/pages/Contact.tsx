import { Link } from 'react-router-dom'
import { Mail, MessageCircle, Briefcase, Clock, ArrowRight, HelpCircle } from 'lucide-react'
import { useSeo } from '../lib/useSeo'

const channels = [
  {
    icon: Mail,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    title: 'General inquiries',
    detail: 'Questions about ClearWork, your account, or anything else.',
    action: 'hello@getclearwork.in',
    href: 'mailto:hello@getclearwork.in',
  },
  {
    icon: MessageCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    title: 'Product support',
    detail: 'Something not working as expected? We\'ll sort it out fast.',
    action: 'support@getclearwork.in',
    href: 'mailto:support@getclearwork.in',
  },
  {
    icon: Briefcase,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    title: 'Partnerships',
    detail: 'CA firms, agencies, communities — let\'s talk about working together.',
    action: 'partners@getclearwork.in',
    href: 'mailto:partners@getclearwork.in',
  },
]

const faqs = [
  {
    q: 'How long does it take to get a response?',
    a: 'We respond to all emails within 24–48 hours on business days. Support issues are usually resolved same-day.',
  },
  {
    q: 'Is ClearWork really free right now?',
    a: 'Yes — completely free during early access. Full Studio plan, all features, no credit card required. Early access users lock in founding pricing before the public launch.',
  },
  {
    q: 'I found a bug or have a feature request.',
    a: 'Email support@getclearwork.in with the details. We log every report and share updates when the fix ships. Feature requests are reviewed weekly.',
  },
  {
    q: 'Can I get a demo or walkthrough?',
    a: 'Email hello@getclearwork.in and we\'ll set up a quick call. We\'re happy to walk through the product live and understand your workflow.',
  },
  {
    q: 'How do I report a security issue?',
    a: 'Email security@getclearwork.in directly. We treat security reports as high priority and respond within 24 hours. Please do not share vulnerability details publicly before we\'ve had a chance to address them.',
  },
]

export default function Contact() {
  useSeo(
    'Contact ClearWork — Get in Touch',
    'Contact the ClearWork team for support, partnerships, or general questions. We respond within 24–48 hours. hello@getclearwork.in',
    'https://getclearwork.in/contact',
  )

  return (
    <div className="min-h-screen bg-[#F4F6FB] pt-16">

      {/* Hero */}
      <section className="bg-[#101828] text-white py-16 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-5">
            <Mail size={28} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Get in touch</h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
            We're a small, India-based team and we read every message personally.
            Whether it's a support issue, a feature request, or just a question — reach out.
          </p>
        </div>
      </section>

      {/* Response time bar */}
      <section className="bg-white border-b border-gray-100 py-5 px-5">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 text-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={15} className="text-indigo-500" />
            <span>Response within <strong className="text-gray-900">24–48 hours</strong></span>
          </div>
          <div className="w-px h-4 bg-gray-200 hidden sm:block" />
          <div className="text-sm text-gray-600">
            Support issues resolved <strong className="text-gray-900">same day</strong> when possible
          </div>
          <div className="w-px h-4 bg-gray-200 hidden sm:block" />
          <div className="text-sm text-gray-600">
            Business hours: <strong className="text-gray-900">Mon–Fri, 10am–7pm IST</strong>
          </div>
        </div>
      </section>

      <section className="py-12 px-5">
        <div className="max-w-3xl mx-auto space-y-5">

          {/* Contact channels */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <h2 className="text-lg font-bold text-gray-900 mb-5">How to reach us</h2>
            <div className="space-y-4">
              {channels.map(({ icon: Icon, color, bg, title, detail, action, href }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all group"
                >
                  <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{detail}</p>
                    <p className="text-sm font-medium text-indigo-600 mt-2 group-hover:text-indigo-800 transition-colors">{action}</p>
                  </div>
                  <ArrowRight size={15} className="text-gray-300 group-hover:text-indigo-400 transition-colors mt-0.5 shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <div className="flex items-center gap-2.5 mb-5">
              <HelpCircle size={18} className="text-indigo-500" />
              <h2 className="text-lg font-bold text-gray-900">Common questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <div key={q} className="border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                  <p className="text-sm font-semibold text-gray-900 mb-1.5">{q}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Social / community */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-sm font-semibold text-gray-900 mb-1">Find us online</p>
            <p className="text-xs text-gray-400 mb-4">Follow product updates, release notes, and community conversations.</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/company/getclearwork"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:border-indigo-200 hover:text-indigo-700 transition-all"
              >
                LinkedIn
              </a>
              <a
                href="https://www.producthunt.com/products/clearwork"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:border-orange-200 hover:text-orange-600 transition-all"
              >
                Product Hunt
              </a>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 pt-2">
            Also see our{' '}
            <Link to="/security" className="underline hover:text-gray-700">Security & Privacy</Link>
            {' '}page.{' '}
            <Link to="/" className="underline hover:text-gray-700">← Back to home</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
