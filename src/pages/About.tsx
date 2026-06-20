import { Link } from 'react-router-dom'
import { Users, MapPin, Heart, Zap, ShieldCheck, Globe, ArrowRight, Star, FileText, IndianRupee } from 'lucide-react'
import { useSeo } from '../lib/useSeo'

const values = [
  {
    icon: MapPin,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    title: 'India-first, always',
    body: 'Every decision — GST fields, UPI links, OTP e-sign, WhatsApp reminders — is made for how Indian freelancers actually work, not adapted from a US product.',
  },
  {
    icon: Zap,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    title: 'Simple over clever',
    body: 'Freelancers are running businesses, not learning software. Every feature ships only when it can be understood in under 30 seconds.',
  },
  {
    icon: ShieldCheck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    title: 'Honest by default',
    body: 'No dark patterns, no hidden limits, no bait-and-switch pricing. What you see during free access is the full product — not a crippled demo.',
  },
]

const differentiators = [
  {
    icon: IndianRupee,
    label: 'GST-native invoicing',
    detail: 'CGST/SGST/IGST auto-detected by client state. Rule 46 compliant.',
    bg: 'bg-indigo-50',
    color: 'text-indigo-600',
  },
  {
    icon: FileText,
    label: 'IT Act 2000 e-sign',
    detail: 'OTP-based contracts legally valid under Indian law — no DocuSign needed.',
    bg: 'bg-emerald-50',
    color: 'text-emerald-600',
  },
  {
    icon: Globe,
    label: 'UPI payment collection',
    detail: 'Embedded UPI payment links and automated payment reminders over WhatsApp.',
    bg: 'bg-amber-50',
    color: 'text-amber-600',
  },
  {
    icon: Star,
    label: 'One end-to-end workflow',
    detail: 'Lead → proposal → contract → invoice → payment in a single tool.',
    bg: 'bg-violet-50',
    color: 'text-violet-600',
  },
]

export default function About() {
  useSeo(
    'About ClearWork — Built for Indian Freelancers',
    'ClearWork is India\'s all-in-one client workflow platform for freelancers. Built in Bengaluru by freelancers who needed GST, UPI, e-sign, and WhatsApp in one tool.',
    'https://getclearwork.in/about',
  )

  return (
    <div className="min-h-screen bg-[#F4F6FB] pt-16">

      {/* Hero */}
      <section className="bg-[#101828] text-white py-16 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-5">
            <Users size={28} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            India's client workflow platform
          </h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
            Built for 15M Indian freelancers who needed GST, UPI, and e-sign in one tool — not five.
          </p>
          <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-gray-300">
            <MapPin size={11} />
            Made with <Heart size={11} className="fill-current text-rose-400" /> in Bengaluru, India
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100 py-6 px-5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { val: '2025', label: 'Founded' },
            { val: 'Bengaluru', label: 'Headquarters' },
            { val: '15M+', label: 'Indian freelancers we serve' },
            { val: 'Free', label: 'During early access' },
          ].map(({ val, label }) => (
            <div key={label}>
              <p className="text-lg font-bold text-gray-900">{val}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-5">
        <div className="max-w-3xl mx-auto space-y-5">

          {/* Story */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Why we built this</h2>
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>
                Indian freelancers — designers, developers, consultants, photographers — are running
                real businesses. They're sending proposals over WhatsApp, signing contracts via email
                attachments, raising GST invoices in Excel, and manually chasing clients for payments
                every month. Each step lives in a different tool, and none of those tools were built
                for India.
              </p>
              <p>
                The global alternatives — HoneyBook, Bonsai, Dubsado — look great on product screenshots
                but fall apart the moment an Indian freelancer tries to use them. No GST fields.
                No UPI payments. USD-only pricing. E-sign that doesn't meet IT Act 2000 requirements.
                You're paying ₹1,400/month for a tool that still doesn't help you get compliant invoices
                to your clients.
              </p>
              <p>
                ClearWork is the tool we wish existed: a single platform that handles the full client
                workflow — from first proposal to final payment — built entirely around how freelance
                work actually happens in India.
              </p>
            </div>
          </div>

          {/* What makes us different */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <h2 className="text-xl font-bold text-gray-900 mb-5">What we built differently</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {differentiators.map(({ icon: Icon, label, detail, bg, color }) => (
                <div key={label} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
                  <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center shrink-0`}>
                    <Icon size={16} className={color} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{label}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <h2 className="text-xl font-bold text-gray-900 mb-5">What we believe in</h2>
            <div className="space-y-4">
              {values.map(({ icon: Icon, color, bg, title, body }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon size={18} className={color} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{title}</p>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Early access note */}
          <div className="bg-indigo-600 rounded-2xl p-7 text-white">
            <h2 className="text-lg font-bold mb-2">We're in early access</h2>
            <p className="text-indigo-200 text-sm leading-relaxed mb-5">
              ClearWork is free for everyone right now — full Studio plan, every feature, no credit card.
              We're gathering feedback from real freelancers to shape the product before public launch.
              Early access users lock in founding pricing permanently.
            </p>
            <a
              href="https://app.getclearwork.in/signup"
              className="inline-flex items-center gap-1.5 bg-white text-indigo-700 rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-50 transition-colors"
            >
              Get started free <ArrowRight size={14} />
            </a>
          </div>

          {/* Contact nudge */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">Have questions or feedback?</p>
              <p className="text-xs text-gray-400 mt-0.5">We read every message personally.</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors shrink-0"
            >
              Contact us <ArrowRight size={13} />
            </Link>
          </div>

          <p className="text-center text-xs text-gray-400 pt-2">
            <Link to="/" className="underline hover:text-gray-700">← Back to home</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
