import { useSeo } from '../lib/useSeo'

const EFFECTIVE_DATE = 'June 15, 2025'
const LAST_UPDATED   = 'June 15, 2025'
const COMPANY_NAME   = 'ClearWork (operated by Maharshi Vaghela)'
const CONTACT_EMAIL  = 'hello@getclearwork.in'
const APP_URL        = 'https://app.getclearwork.in'
const SITE_URL       = 'https://getclearwork.in'

interface Section {
  id:    string
  title: string
  body:  React.ReactNode
}

const sections: Section[] = [
  {
    id:    'agreement',
    title: '1. Agreement to Terms',
    body: (
      <p>
        By accessing or using ClearWork's website at{' '}
        <a href={SITE_URL} className="text-indigo-600 hover:underline">{SITE_URL}</a> or web application
        at{' '}
        <a href={APP_URL} className="text-indigo-600 hover:underline">{APP_URL}</a> (the "Service"),
        you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms,
        do not access or use the Service. {COMPANY_NAME} reserves the right to update these Terms at
        any time, and your continued use of the Service after any such changes constitutes your
        acceptance of the new Terms.
      </p>
    ),
  },
  {
    id:    'description',
    title: '2. Description of Service',
    body: (
      <p>
        ClearWork is a business management platform designed for freelancers, consultants, and small
        agencies in India. The Service allows users to manage clients, create proposals and contracts,
        send GST-compliant invoices, track time and expenses, and connect optional third-party
        integrations (Google Calendar, Google Sheets, Google Docs, Google Forms, ClickUp, and others).
      </p>
    ),
  },
  {
    id:    'accounts',
    title: '3. Accounts and Eligibility',
    body: (
      <div className="space-y-3">
        <p>To use the Service you must:</p>
        <ul className="space-y-1 list-disc list-inside text-gray-600">
          <li>Be at least 18 years of age</li>
          <li>Have the legal capacity to enter into a binding contract under Indian law</li>
          <li>Provide accurate and complete registration information</li>
          <li>Maintain the security of your account password</li>
        </ul>
        <p>You are responsible for all activity that occurs under your account. Notify us immediately at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline">{CONTACT_EMAIL}</a>{' '}
          if you suspect unauthorised access.
        </p>
        <p>You may not create an account on behalf of another person without their authorisation, or create multiple accounts to circumvent plan limits.</p>
      </div>
    ),
  },
  {
    id:    'plans-billing',
    title: '4. Plans, Billing, and Refunds',
    body: (
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">4.1 Free Plan</h3>
          <p>A free tier is available with limited features. No payment information is required to use the Free plan.</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">4.2 Paid Plans</h3>
          <p>Paid plans (Solo, Studio) are billed monthly or annually in Indian Rupees (INR). All prices are inclusive of applicable taxes unless stated otherwise. Founding pricing is available for a limited time as indicated on the pricing page.</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">4.3 Renewals and Cancellations</h3>
          <p>Subscriptions auto-renew at the end of each billing period. You may cancel at any time from Settings → Billing. Cancellation takes effect at the end of the current billing period. You will retain access to paid features until that date.</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">4.4 Refunds</h3>
          <p>We offer a 7-day refund for first-time paid plan purchases if you are unsatisfied. Refunds are not provided for subsequent renewals or partial periods. To request a refund, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline">{CONTACT_EMAIL}</a>{' '}
            within 7 days of the charge.
          </p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">4.5 Price Changes</h3>
          <p>We reserve the right to change our pricing. We will provide at least 30 days' notice before any price change takes effect for existing subscribers.</p>
        </div>
      </div>
    ),
  },
  {
    id:    'acceptable-use',
    title: '5. Acceptable Use',
    body: (
      <div className="space-y-3">
        <p>You agree not to use the Service to:</p>
        <ul className="space-y-1 list-disc list-inside text-gray-600">
          <li>Violate any applicable law or regulation</li>
          <li>Create fraudulent invoices, proposals, or contracts</li>
          <li>Impersonate any person or entity</li>
          <li>Upload or transmit any malware, viruses, or malicious code</li>
          <li>Attempt to gain unauthorised access to any part of the Service or another user's account</li>
          <li>Scrape, copy, or reverse-engineer any part of the Service</li>
          <li>Use the Service for any purpose other than legitimate business management</li>
          <li>Resell, sublicense, or commercially exploit the Service without our written consent</li>
        </ul>
        <p>We reserve the right to suspend or terminate accounts that violate these rules without prior notice.</p>
      </div>
    ),
  },
  {
    id:    'content-ownership',
    title: '6. Content and Intellectual Property',
    body: (
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">6.1 Your Content</h3>
          <p>You retain full ownership of all content you create using the Service (proposals, contracts, invoices, client data, etc.). By using the Service, you grant us a limited, non-exclusive licence to store and process your content solely to provide the Service to you.</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">6.2 Our Intellectual Property</h3>
          <p>The ClearWork platform, including all software, design, text, logos, and trademarks, is owned by or licensed to us and protected by applicable intellectual property laws. Nothing in these Terms grants you a right to use our trademarks, trade names, or other proprietary materials.</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">6.3 Feedback</h3>
          <p>If you provide suggestions or feedback about the Service, you grant us the right to use that feedback without restriction or compensation.</p>
        </div>
      </div>
    ),
  },
  {
    id:    'third-party',
    title: '7. Third-Party Integrations',
    body: (
      <p>
        The Service offers optional integrations with third-party platforms (Google Workspace, ClickUp,
        Razorpay, Flodesk, and others). Your use of these integrations is subject to the respective
        third party's terms of service and privacy policies. ClearWork is not responsible for any
        third-party service, its availability, accuracy, or content. Connecting a third-party integration
        is always optional and can be revoked at any time.
      </p>
    ),
  },
  {
    id:    'client-portal',
    title: '8. Client Portal',
    body: (
      <p>
        ClearWork provides a client-facing portal that your clients may access to view proposals,
        sign contracts, and pay invoices. You are responsible for the accuracy of all documents you
        share through the client portal. We are not a party to any agreement between you and your
        clients. You must not use the client portal to send fraudulent, illegal, or misleading
        documents.
      </p>
    ),
  },
  {
    id:    'disclaimer',
    title: '9. Disclaimer of Warranties',
    body: (
      <p>
        The Service is provided on an "as is" and "as available" basis without warranties of any kind,
        express or implied, including but not limited to warranties of merchantability, fitness for a
        particular purpose, or non-infringement. We do not warrant that the Service will be
        uninterrupted, error-free, or completely secure. Any reliance you place on the Service for
        financial, tax, or legal decisions is at your own risk. Always consult a qualified chartered
        accountant or legal professional for specific advice.
      </p>
    ),
  },
  {
    id:    'limitation-of-liability',
    title: '10. Limitation of Liability',
    body: (
      <p>
        To the maximum extent permitted by applicable law, ClearWork and its operators shall not be
        liable for any indirect, incidental, special, consequential, or punitive damages — including
        loss of profits, data, or goodwill — arising out of or in connection with your use of the
        Service. Our total liability to you for any claim arising from these Terms or the Service
        shall not exceed the amount you paid us in the 3 months preceding the claim.
      </p>
    ),
  },
  {
    id:    'termination',
    title: '11. Termination',
    body: (
      <div className="space-y-3">
        <p>
          You may terminate your account at any time by going to Settings → Account → Delete Account.
          We may suspend or terminate your access to the Service at any time, with or without notice,
          if we determine you have violated these Terms, engaged in fraudulent activity, or if
          continued operation is not commercially viable.
        </p>
        <p>
          Upon termination, your right to use the Service ceases immediately. You may request an export
          of your data within 30 days of termination. After 30 days, we may permanently delete your data
          subject to any legal retention obligations.
        </p>
      </div>
    ),
  },
  {
    id:    'governing-law',
    title: '12. Governing Law and Disputes',
    body: (
      <p>
        These Terms are governed by the laws of India. Any dispute arising out of or in connection
        with these Terms or the Service shall first be attempted to be resolved through good-faith
        negotiation. If unresolved, disputes shall be subject to the exclusive jurisdiction of the
        courts located in Gujarat, India. The application of the United Nations Convention on
        Contracts for the International Sale of Goods is excluded.
      </p>
    ),
  },
  {
    id:    'changes',
    title: '13. Changes to These Terms',
    body: (
      <p>
        We reserve the right to modify these Terms at any time. We will notify you of material changes
        by email or through an in-app notice at least 14 days before the changes take effect. Your
        continued use of the Service after the effective date of the revised Terms constitutes your
        acceptance of the changes.
      </p>
    ),
  },
  {
    id:    'contact',
    title: '14. Contact',
    body: (
      <p>
        For questions about these Terms, please contact us at:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline font-medium">{CONTACT_EMAIL}</a>
      </p>
    ),
  },
]

export default function Terms() {
  useSeo(
    'Terms of Service — ClearWork',
    'Read the Terms of Service for ClearWork — billing, acceptable use, intellectual property, limitation of liability, and governing law for Indian freelancers.',
    `${SITE_URL}/terms`,
  )

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-5">

        {/* Header */}
        <div className="mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">Legal</span>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Terms of Service</h1>
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
