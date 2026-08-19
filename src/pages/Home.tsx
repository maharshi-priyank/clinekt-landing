import { useSeo } from '../lib/useSeo'
import { useSchemaOrg } from '../lib/useSchemaOrg'
import { useScrollDepth } from '../hooks/useScrollDepth'
import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import StatStrip from '../components/StatStrip'
import LeadFinderSection from '../components/LeadFinderSection'
import HubSpokeSection from '../components/HubSpokeSection'
import HowItWorks from '../components/HowItWorks'
import ClientJourneySection from '../components/ClientJourneySection'
import FeaturesSection from '../components/FeaturesSection'
import AhaMoments from '../components/AhaMoments'
import MobileAppSection from '../components/MobileAppSection'
import PricingSection from '../components/PricingSection'
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
    'description': 'The all-in-one platform for service businesses in India — freelancers, consultants, and agencies. Tracked proposals, e-sign contracts, GST invoices, UPI payments — one place, zero spreadsheets.',
    'offers': [
      { '@type': 'Offer', 'name': 'Free',   'price': '0',   'priceCurrency': 'INR', 'description': 'Up to 5 clients, 10 active projects' },
      { '@type': 'Offer', 'name': 'Pro',    'price': '149', 'priceCurrency': 'INR', 'description': 'Up to 30 clients, 60 projects, 5 team members. New accounts get a free 15-day trial.' },
      { '@type': 'Offer', 'name': 'Studio', 'price': '649', 'priceCurrency': 'INR', 'description': 'Unlimited clients, projects, and team members' },
    ],
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
    'description': 'India-first, all-in-one platform for service businesses — freelancers, consultants, and agencies — from winning clients to getting paid.',
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
    'ClearWork — All-in-One Platform for Service Businesses in India',
    'ClearWork is the all-in-one platform for service businesses — freelancers, consultants, and agencies — with tracked proposals, e-sign contracts, GST invoices, UPI payments, and AI-powered lead discovery. Free 15-day Pro trial, no credit card required.',
    'https://getclearwork.in/',
  )
  return (
    <main>
      <Hero />
      <TrustStrip />
      <StatStrip />
      <LeadFinderSection />
      <HubSpokeSection />
      <HowItWorks />
      <ClientJourneySection />
      <FeaturesSection />
      <AhaMoments />
      <MobileAppSection />
      <PricingSection />
      <FounderNote />
      <TrustpilotSection />
      <WaitlistSection />
    </main>
  )
}
