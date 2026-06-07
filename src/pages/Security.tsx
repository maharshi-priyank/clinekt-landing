import { Link } from 'react-router-dom'
import { ShieldCheck, Lock, Server, Eye, FileText, RefreshCw, Mail } from 'lucide-react'
import { useSeo } from '../lib/useSeo'

const sections = [
  {
    icon: Lock,
    title: 'Data Encryption',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    items: [
      'All data is encrypted at rest using AES-256.',
      'All data in transit is encrypted via TLS 1.2+ (HTTPS enforced everywhere).',
      'Passwords are never stored — we use secure token-based authentication (JWT).',
      'Sensitive fields (GSTIN, bank details) are encrypted at the application layer.',
    ],
  },
  {
    icon: Server,
    title: 'Infrastructure & Hosting',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    items: [
      'Hosted on Supabase (PostgreSQL) with data stored on AWS ap-south-1 (Mumbai) servers.',
      'Data does not leave Indian jurisdiction.',
      'Daily automated database backups with 30-day retention.',
      'Database is never exposed to the public internet — access only via authenticated API.',
    ],
  },
  {
    icon: Eye,
    title: 'What We Collect',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    items: [
      'Account info: name, email address, phone number (optional).',
      'Business data you create: leads, proposals, contracts, invoices, client records.',
      'Usage analytics: page views, feature usage (anonymised, no personal data in analytics).',
      'We do NOT collect payment card data — all payments are handled by Razorpay (PCI-DSS certified).',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Who Has Access',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    items: [
      'Your data is private to your account. Other users cannot see your clients, invoices, or documents.',
      'ClearWork staff access data only when required to resolve support issues, with your explicit consent.',
      'We do not sell, rent, or share your data with any third party for marketing purposes.',
      'Third-party integrations (Razorpay, Google Calendar) receive only the minimum data required.',
    ],
  },
  {
    icon: FileText,
    title: 'Legal Compliance',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    items: [
      'E-signatures are valid under the Information Technology Act, 2000 (India).',
      'GST invoice generation follows CBIC e-invoice specifications (IRN format).',
      'Designed for compliance with the Digital Personal Data Protection (DPDP) Act, 2023.',
      'GDPR-ready for any EU-based clients using your portal.',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Your Rights',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    items: [
      'Export all your data at any time from Account Settings.',
      'Request permanent account deletion — we will remove all your data within 30 days.',
      'Opt out of non-essential communications at any time.',
      'Request a copy of any personal data we hold about you.',
    ],
  },
]

export default function Security() {
  useSeo(
    'Security & Privacy — ClearWork',
    'How ClearWork protects your data: AES-256 encryption, Indian servers, IT Act 2000 e-sign, DPDP Act compliance, and your rights as a user.',
    'https://getclearwork.in/security',
  )

  return (
    <div className="min-h-screen bg-[#F4F6FB] pt-16">

      {/* Hero */}
      <section className="bg-[#101828] text-white py-14 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-5">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Security & Privacy</h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Your business data is sensitive. Here's exactly how we protect it — in plain language, no legalese.
          </p>
          <p className="text-xs text-gray-500 mt-4">Last updated: May 2026</p>
        </div>
      </section>

      {/* Summary bar */}
      <section className="bg-white border-b border-gray-100 py-6 px-5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { val: 'AES-256', label: 'Encryption at rest' },
            { val: 'TLS 1.2+', label: 'Encryption in transit' },
            { val: 'India', label: 'Data jurisdiction' },
            { val: 'IT Act 2000', label: 'E-sign compliance' },
          ].map(({ val, label }) => (
            <div key={label}>
              <p className="text-lg font-bold text-gray-900">{val}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sections */}
      <section className="py-12 px-5">
        <div className="max-w-3xl mx-auto space-y-5">
          {sections.map(({ icon: Icon, title, color, bg, items }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}>
                  <Icon size={18} className={color} />
                </div>
                <h2 className="text-base font-bold text-gray-900">{title}</h2>
              </div>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="bg-[#101828] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Mail size={18} className="text-white" />
              </div>
              <h2 className="text-base font-bold">Questions or concerns?</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              If you have any security concerns, want to report a vulnerability, or want to exercise your data rights, email us directly. We respond within 48 hours.
            </p>
            <a
              href="mailto:security@getclearwork.in"
              className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              security@getclearwork.in
            </a>
          </div>

          <p className="text-center text-xs text-gray-400 pt-2">
            Also see our{' '}
            <a href="#" className="underline hover:text-gray-700">Privacy Policy</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-gray-700">Terms of Service</a>.
            {' '}
            <Link to="/" className="underline hover:text-gray-700">← Back to home</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
