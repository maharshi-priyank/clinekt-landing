import { useSeo } from '../lib/useSeo'

const EFFECTIVE_DATE  = 'June 15, 2025'
const LAST_UPDATED    = 'June 15, 2025'
const COMPANY_NAME    = 'ClearWork (operated by Maharshi Vaghela)'
const CONTACT_EMAIL   = 'hello@getclearwork.in'
const APP_URL         = 'https://app.getclearwork.in'
const SITE_URL        = 'https://getclearwork.in'

interface Section {
  id:    string
  title: string
  body:  React.ReactNode
}

const sections: Section[] = [
  {
    id:    'introduction',
    title: '1. Introduction',
    body: (
      <p>
        This Privacy Policy describes how {COMPANY_NAME} ("ClearWork", "we", "us", or "our") collects,
        uses, discloses, and protects information about you when you use our website at{' '}
        <a href={SITE_URL} className="text-indigo-600 hover:underline">{SITE_URL}</a> and our web
        application at{' '}
        <a href={APP_URL} className="text-indigo-600 hover:underline">{APP_URL}</a> (collectively, the
        "Service"). By using the Service, you agree to the collection and use of information in
        accordance with this policy.
      </p>
    ),
  },
  {
    id:    'information-we-collect',
    title: '2. Information We Collect',
    body: (
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">2.1 Account Information</h3>
          <p>When you create an account we collect your name, email address, and optionally your phone number and business name.</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">2.2 Business Data You Create</h3>
          <p>We store the content you create using our Service, including client records, proposals, contracts, invoices, time entries, expenses, and any other documents you upload or generate.</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">2.3 Google Account Data (OAuth Integrations)</h3>
          <p>If you choose to connect your Google account via our optional integrations, we request access to the following scopes only with your explicit consent:</p>
          <ul className="mt-2 space-y-1 list-disc list-inside text-gray-600">
            <li><strong>Google Calendar</strong> — to create calendar events and Google Meet links when you schedule client calls. We read and write calendar events on your behalf. We do not access personal or pre-existing calendar events.</li>
            <li><strong>Google Sheets</strong> — to create and update a ClearWork-owned spreadsheet in your Google Drive that tracks your leads, invoices, and clients. We only read and write files that ClearWork created.</li>
            <li><strong>Google Docs</strong> — to export proposals and contracts to a Google Doc in your Google Drive. We only create new files; we do not read or modify pre-existing documents in your Drive.</li>
            <li><strong>Google Forms</strong> — to receive lead submissions from a form you set up. We read form responses to create leads in your ClearWork account.</li>
          </ul>
          <p className="mt-2">We do not store your Google OAuth tokens beyond what is required to maintain the live integration. You can revoke access at any time from your Google Account security settings or from Settings → Integrations inside ClearWork.</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">2.4 Payment Data</h3>
          <p>We do not store payment card details. All payment processing is handled by PCI-DSS-certified third-party gateways (Razorpay). We receive only a transaction reference and status.</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">2.5 Usage Analytics</h3>
          <p>We collect anonymised usage data (page views, feature interactions) to understand how the product is used. No personally identifiable information is included in analytics data.</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">2.6 Log Data</h3>
          <p>Our servers automatically record standard log data including your IP address, browser type, pages visited, and timestamps when you access the Service. This data is used solely for security monitoring and debugging.</p>
        </div>
      </div>
    ),
  },
  {
    id:    'how-we-use',
    title: '3. How We Use Your Information',
    body: (
      <ul className="space-y-2 list-disc list-inside text-gray-600">
        <li>Provide, operate, and improve the Service</li>
        <li>Process your transactions and manage your subscription</li>
        <li>Send transactional emails (invoice reminders, account activity, security alerts)</li>
        <li>Respond to your support requests</li>
        <li>Detect, prevent, and address security incidents and abuse</li>
        <li>Comply with legal obligations under Indian law</li>
        <li>Send product updates and announcements (you may opt out at any time)</li>
      </ul>
    ),
  },
  {
    id:    'data-sharing',
    title: '4. Data Sharing and Disclosure',
    body: (
      <div className="space-y-4">
        <p>We do not sell your personal data. We share information only in these limited circumstances:</p>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">4.1 Service Providers</h3>
          <p>We use trusted third-party providers to operate the Service: Supabase (database and authentication), Fly.io (API hosting), Vercel (frontend hosting), Razorpay (payment processing), Google (OAuth integrations — only when you opt in), Resend/email providers (transactional email). Each provider is bound by data processing agreements.</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">4.2 Legal Requirements</h3>
          <p>We may disclose your information if required by law, court order, or a lawful government request under the Information Technology Act, 2000 or other applicable Indian legislation.</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">4.3 Business Transfer</h3>
          <p>In the event of a merger, acquisition, or sale of assets, user data may be transferred as part of the transaction. We will notify you before your data is subject to a different privacy policy.</p>
        </div>
      </div>
    ),
  },
  {
    id:    'data-storage',
    title: '5. Data Storage and Security',
    body: (
      <div className="space-y-3">
        <p>Your data is stored on Supabase (PostgreSQL) servers hosted on AWS <strong>ap-south-1 (Mumbai, India)</strong>. Data does not leave Indian jurisdiction during normal operations.</p>
        <ul className="space-y-1 list-disc list-inside text-gray-600">
          <li>All data at rest is encrypted using AES-256</li>
          <li>All data in transit is encrypted via TLS 1.2+</li>
          <li>Sensitive fields (GSTIN, bank account details) are encrypted at the application layer</li>
          <li>Daily automated backups with 30-day retention</li>
          <li>Database is not exposed to the public internet</li>
        </ul>
        <p>While we implement robust security measures, no system is completely secure. Please keep your account credentials confidential.</p>
      </div>
    ),
  },
  {
    id:    'data-retention',
    title: '6. Data Retention',
    body: (
      <p>
        We retain your personal data for as long as your account is active or as needed to provide the
        Service. If you delete your account, we will delete or anonymise your personal information within
        30 days, except where retention is required by law (e.g. financial records under the Income Tax
        Act, 1961 or GST regulations which require record-keeping for a minimum of 6 years). Business
        documents you have shared with clients are your responsibility.
      </p>
    ),
  },
  {
    id:    'your-rights',
    title: '7. Your Rights',
    body: (
      <div className="space-y-3">
        <p>Subject to applicable Indian law, you have the right to:</p>
        <ul className="space-y-1 list-disc list-inside text-gray-600">
          <li><strong>Access</strong> — request a copy of personal data we hold about you</li>
          <li><strong>Correction</strong> — request correction of inaccurate or incomplete data</li>
          <li><strong>Deletion</strong> — request deletion of your account and personal data</li>
          <li><strong>Portability</strong> — request an export of your data in a machine-readable format</li>
          <li><strong>Withdraw consent</strong> — disconnect any Google OAuth integration at any time</li>
          <li><strong>Opt out</strong> — unsubscribe from marketing communications at any time</li>
        </ul>
        <p>
          To exercise these rights, email us at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline">{CONTACT_EMAIL}</a>.
          We will respond within 30 days.
        </p>
      </div>
    ),
  },
  {
    id:    'cookies',
    title: '8. Cookies and Tracking',
    body: (
      <p>
        We use minimal cookies required to keep you logged in (authentication token). We also use
        anonymised analytics (Vercel Analytics or similar) that do not set tracking cookies or collect
        personally identifiable information. We do not use third-party advertising cookies.
      </p>
    ),
  },
  {
    id:    'children',
    title: '9. Children\'s Privacy',
    body: (
      <p>
        The Service is intended for users who are 18 years of age or older. We do not knowingly collect
        personal information from children under 18. If you believe a child has provided us with personal
        information, please contact us and we will delete it promptly.
      </p>
    ),
  },
  {
    id:    'third-party-links',
    title: '10. Third-Party Links',
    body: (
      <p>
        The Service may contain links to third-party websites (e.g. client portals, payment pages). We
        are not responsible for the privacy practices of those sites. We encourage you to review their
        privacy policies before providing any information.
      </p>
    ),
  },
  {
    id:    'changes',
    title: '11. Changes to This Policy',
    body: (
      <p>
        We may update this Privacy Policy from time to time. When we do, we will update the "Last
        Updated" date at the top of this page and, for material changes, notify you by email or an
        in-app notice. Continued use of the Service after changes constitutes your acceptance of the
        revised policy.
      </p>
    ),
  },
  {
    id:    'governing-law',
    title: '12. Governing Law',
    body: (
      <p>
        This Privacy Policy is governed by the laws of India, including the Information Technology Act,
        2000 and the Information Technology (Amendment) Act, 2008. Any disputes shall be subject to the
        exclusive jurisdiction of courts located in Gujarat, India.
      </p>
    ),
  },
  {
    id:    'contact',
    title: '13. Contact Us',
    body: (
      <p>
        If you have questions about this Privacy Policy or our data practices, please contact us at:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline font-medium">{CONTACT_EMAIL}</a>
      </p>
    ),
  },
]

export default function Privacy() {
  useSeo(
    'Privacy Policy — ClearWork',
    'Read how ClearWork collects, uses, and protects your personal data. Covers Google OAuth integrations, data storage in India, your rights, and how to contact us.',
    `${SITE_URL}/privacy`,
  )

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-5">

        {/* Header */}
        <div className="mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">Legal</span>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-gray-500 text-sm">
            Effective date: <strong className="text-gray-700">{EFFECTIVE_DATE}</strong>
            &nbsp;·&nbsp;
            Last updated: <strong className="text-gray-700">{LAST_UPDATED}</strong>
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Contents</p>
          <ol className="space-y-1">
            {sections.map(s => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-sm text-indigo-600 hover:underline font-medium">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map(s => (
            <section
              key={s.id}
              id={s.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm scroll-mt-24"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h2>
              <div className="text-gray-600 text-sm leading-relaxed">{s.body}</div>
            </section>
          ))}
        </div>

      </div>
    </div>
  )
}
