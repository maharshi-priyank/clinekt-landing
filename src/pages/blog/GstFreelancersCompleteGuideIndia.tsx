import BlogLayout, {
  H2, H3, P, Callout, Table, UL, ToolCTA, FAQ,
  type BlogMeta,
} from '../../components/BlogLayout'
import { useSeo } from '../../lib/useSeo'

const meta: BlogMeta = {
  title: 'GST for Freelancers in India: The Complete 2026 Guide',
  description: 'Do you need GST registration as a freelancer? Thresholds, rates, filing deadlines, and common mistakes — the complete 2026 guide for Indian freelancers and consultants.',
  date: 'August 2026',
  datePublished: '2026-08-08',
  readTime: '11 min',
  category: 'GST & Invoicing',
  canonical: 'https://getclearwork.in/blog/gst-for-freelancers-india-complete-guide',
}

export default function GstFreelancersCompleteGuideIndia() {
  useSeo(meta.title, meta.description, meta.canonical)

  return (
    <BlogLayout meta={meta}>

      <P>
        You need to register for GST as a freelancer once your annual income crosses{' '}
        <strong>₹20 lakh</strong> (₹10 lakh in special-category states). Below that threshold,
        registration is optional — though there are situations where it's worth registering
        voluntarily even earlier. This guide covers the full picture: whether you need to
        register, how to do it, what rate applies to your work, and the filing calendar you're
        signing up for once you do.
      </P>

      <Callout type="warn">
        This is an educational guide, not a substitute for advice from a chartered accountant.
        GST rules have state-level nuances and change periodically — always confirm current
        thresholds and rates on the official GST portal or with your CA before filing.
      </Callout>

      <H2>Do you actually need to register?</H2>

      <P>
        GST registration for a freelancer providing services is governed by an aggregate
        turnover threshold — not profit, your total billed amount across all clients in a
        financial year.
      </P>

      <Table
        headers={['Category', 'Threshold', 'Notes']}
        rows={[
          ['Most states', '₹20 lakh/year', 'Standard threshold for service providers'],
          ['Special-category states (NE states, Himachal, Uttarakhand, J&K)', '₹10 lakh/year', 'Lower threshold applies'],
          ['Below threshold', 'Optional', 'You can choose to remain unregistered and skip GST on invoices'],
          ['Inter-state supply', 'Registration required regardless of turnover', 'If you serve a client in a different state, some interpretations require registration even under the threshold — confirm with a CA for your specific case'],
        ]}
      />

      <H3>When voluntary registration makes sense below the threshold</H3>
      <UL items={[
        'A corporate client insists on a GSTIN-bearing invoice before they\'ll pay you (common with larger companies and PSUs)',
        'You want to claim Input Tax Credit (ITC) on business expenses — software subscriptions, equipment, coworking space',
        'You\'re about to cross the threshold anyway and want a clean transition instead of a rushed one',
      ]} />

      <H2>How to register (step by step)</H2>

      <UL items={[
        'Go to the GST portal (gst.gov.in) and start a new registration under "Services" → "Registration"',
        'You\'ll need: PAN, Aadhaar, a photograph, proof of business address (rent agreement or utility bill), and bank account details',
        'Choose your business constitution — for most solo freelancers, this is "Proprietorship"',
        'Select your SAC (Services Accounting Code) — this determines what shows up on your invoices and how your services are classified',
        'Verify via OTP and submit — you\'ll typically get your GSTIN within 3-7 working days if documents are in order',
      ]} />

      <Callout type="tip">
        Keep your address proof and bank details ready before you start the application —
        most registration delays happen because of mismatched or incomplete documents, not
        the process itself.
      </Callout>

      <H2>What GST rate applies to your service</H2>

      <P>
        Most professional and creative freelance services in India fall under the standard 18%
        rate. A few categories differ:
      </P>

      <Table
        headers={['Service type', 'Typical GST rate']}
        rows={[
          ['Design, development, consulting, writing, marketing', '18%'],
          ['Certain educational and training services', 'Often exempt or 18%, depending on structure'],
          ['Export of services (client outside India, payment in foreign currency)', '0% (zero-rated, with LUT filed)'],
        ]}
      />

      <Callout type="info">
        If most of your clients are outside India and you're paid in foreign currency, your
        services may qualify as a zero-rated export under GST — meaning no GST is charged, but
        you still need to file a Letter of Undertaking (LUT) to claim this. This is a
        commonly missed step for freelancers working with international clients.
      </Callout>

      <H2>CGST, SGST, and IGST — the short version</H2>

      <P>
        Once you're registered, every invoice needs the correct tax split — CGST + SGST if your
        client is in the same state as you, or IGST if they're in a different state. The rate is
        identical either way; only the split changes. For the full breakdown with worked invoice
        examples, see our{' '}
        <a href="/blog/how-to-create-gst-invoice-india" className="text-indigo-500 hover:underline">
          guide to creating a GST invoice
        </a>.
      </P>

      <H2>Filing cadence: what and when</H2>

      <P>
        Registration is the beginning, not the end — GST comes with an ongoing filing calendar.
        Here's what a freelancer typically files:
      </P>

      <Table
        headers={['Return', 'What it covers', 'Typical due date']}
        rows={[
          ['GSTR-1', 'Details of outward supplies (invoices you\'ve raised)', '11th of the following month (monthly filers)'],
          ['GSTR-3B', 'Summary return + tax payment', '20th of the following month (monthly filers)'],
          ['QRMP scheme', 'Quarterly filing option for smaller taxpayers (turnover up to ₹5 crore)', 'Quarterly GSTR-1, monthly tax payment via a simplified challan'],
        ]}
      />

      <Callout type="tip">
        Most solo freelancers are eligible for the <strong>QRMP scheme</strong>, which lets you file
        GSTR-1 and GSTR-3B quarterly instead of monthly — significantly less admin if your client
        volume doesn't justify monthly filing.
      </Callout>

      <H2>Common freelancer mistakes</H2>

      <UL items={[
        <><strong>Not registering when required</strong> — crossing ₹20L and continuing to invoice without a GSTIN attracts penalties and interest on unpaid tax.</>,
        <><strong>Wrong SAC code</strong> — using a generic or incorrect code can flag your returns for scrutiny.</>,
        <><strong>Missing filing due dates</strong> — even a nil return (no income that period) still needs to be filed; skipping it accrues late fees.</>,
        <><strong>Forgetting reverse charge</strong> — certain services you import (e.g. some SaaS subscriptions from abroad) may require you to self-assess and pay GST under reverse charge.</>,
        <><strong>Not filing an LUT for export services</strong> — meaning you either wrongly charge GST to a foreign client or file incorrectly.</>,
      ]} />

      <H2>How ClearWork handles this automatically</H2>

      <P>
        Once you're registered, the ongoing work is mostly about getting every invoice's tax
        split right and having clean records ready when your CA needs them. ClearWork
        auto-detects CGST/SGST vs IGST based on your state and your client's state on every
        invoice, flags TDS under 194J/194C where applicable, and generates a quarter-wise GST
        summary export you can hand straight to your CA — no manually tallying invoices in a
        spreadsheet at filing time.
      </P>

      <ToolCTA
        href="/tools/gst-calculator"
        toolName="Free GST Calculator"
        cta="Quickly work out the GST amount and CGST/SGST/IGST split on any invoice value. Free, no signup required."
      />

      <FAQ items={[
        {
          q: 'What is the GST registration threshold for freelancers in India?',
          a: '₹20 lakh in aggregate annual turnover for most states, and ₹10 lakh for special-category states (North-East states, Himachal Pradesh, Uttarakhand, Jammu & Kashmir). Below this, registration is optional unless a specific situation (like inter-state supply) requires it.',
        },
        {
          q: 'What happens if I miss a GST filing deadline?',
          a: 'Late fees accrue per day of delay (typically ₹50/day for regular returns, half that for nil returns, subject to a cap), plus interest on any unpaid tax at 18% per annum. Even a return with zero activity for the period still needs to be filed to avoid these penalties.',
        },
        {
          q: 'Do I need to charge GST on income from clients outside India?',
          a: 'Usually no — this typically qualifies as a zero-rated export of services if payment is received in convertible foreign exchange. You still need to be GST-registered and file a Letter of Undertaking (LUT) to invoice at 0% instead of paying GST and claiming a refund later.',
        },
        {
          q: 'Can I opt for the composition scheme as a freelancer?',
          a: 'The composition scheme is generally available to goods suppliers and a narrower set of service providers under specific turnover limits — most professional freelance services don\'t qualify. Check current eligibility on the GST portal or with a CA, as rules here are updated periodically.',
        },
        {
          q: 'Is GST different from income tax for freelancers?',
          a: 'Yes — completely separate systems. GST is a tax you collect from clients and remit to the government on your billed services. Income tax is calculated on your actual profit/income for the year. You may owe both, and one doesn\'t offset the other.',
        },
      ]} />

    </BlogLayout>
  )
}
