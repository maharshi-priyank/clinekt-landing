import { useSeo } from '../lib/useSeo'
import { useSchemaOrg } from '../lib/useSchemaOrg'
import { useScrollDepth } from '../hooks/useScrollDepth'
import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import HubSpokeSection from '../components/HubSpokeSection'
import HowItWorks from '../components/HowItWorks'
import MobileAppSection from '../components/MobileAppSection'
import FeaturesSection from '../components/FeaturesSection'
import EarlyAccessSection from '../components/EarlyAccessSection'
import FounderNote from '../components/FounderNote'
import TrustpilotSection from '../components/TrustpilotSection'
import WaitlistSection from '../components/WaitlistSection'

const HOME_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'ClearWork',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'Web',
    'url': 'https://getclearwork.in/',
    'description': 'All-in-one client management software for Indian freelancers, consultants, and agencies. Proposals, contracts, GST invoices, UPI payments, and e-sign — one place, zero spreadsheets.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'INR',
      'description': 'Free during early access',
    },
    'featureList': [
      'GST invoicing with CGST/SGST/IGST auto-split',
      'OTP e-sign contracts valid under IT Act 2000',
      'Proposal creation with open tracking',
      'UPI and card payment collection',
      'WhatsApp payment reminders',
      'Client portal — no login required for clients',
      'TDS 194J/194C flagging',
      'AI proposal drafter',
    ],
    'inLanguage': 'en-IN',
    'availableInCountry': 'IN',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'ClearWork',
    'url': 'https://getclearwork.in/',
    'logo': 'https://getclearwork.in/og-image.png',
    'description': 'India-first client management platform for freelancers, consultants, and growing agencies.',
    'foundingDate': '2025',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Bengaluru',
      'addressCountry': 'IN',
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'email': 'hello@getclearwork.in',
      'contactType': 'customer support',
    },
    'sameAs': [
      'https://www.linkedin.com/company/getclearwork',
      'https://www.producthunt.com/products/clearwork',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'ClearWork',
    'url': 'https://getclearwork.in/',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://getclearwork.in/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  },
]

export default function Home() {
  useScrollDepth('home')
  useSchemaOrg(HOME_SCHEMA)
  useSeo(
    'ClearWork — Free Client CRM for Freelancers, Consultants & Agencies | Free during Early Access',
    'ClearWork is completely free during early access. Proposals, contracts, GST invoices, and payments — all in one place. Built for India with GST, UPI, and OTP e-sign. No credit card required.',
    'https://getclearwork.in/',
  )
  return (
    <main>
      <Hero />
      <TrustStrip />
      <HubSpokeSection />
      {/* <FeaturePillars /> */}
      <HowItWorks />
      <MobileAppSection />
      <FeaturesSection />
      <EarlyAccessSection />
      <FounderNote />
      <TrustpilotSection />
      <WaitlistSection />
    </main>
  )
}
