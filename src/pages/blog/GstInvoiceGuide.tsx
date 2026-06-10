import BlogLayout, {
  H2, H3, P, Callout, Table, UL, ToolCTA, FAQ,
  type BlogMeta,
} from '../../components/BlogLayout'
import { useSeo } from '../../lib/useSeo'
import { useScrollDepth } from '../../hooks/useScrollDepth'
import { trackBlogRead } from '../../lib/analytics'

const meta: BlogMeta = {
  title: 'How to Create a GST Invoice in India: Complete Guide for Freelancers',
  description: 'Step-by-step guide to creating GST-compliant invoices as a freelancer. Covers mandatory fields, CGST/SGST/IGST, SAC codes, due dates, and common mistakes.',
  date: 'June 2026',
  readTime: '8 min',
  category: 'GST & Invoicing',
  canonical: 'https://getclearwork.in/blog/how-to-create-gst-invoice-india',
}

export default function GstInvoiceGuide() {
  useSeo(meta.title, meta.description, meta.canonical)

  return (
    <BlogLayout meta={meta}>

      <P>
        If you're a freelancer or small agency in India who's just crossed the GST registration threshold — or
        you've been registered for a while but still feel unsure whether your invoices are truly compliant —
        this guide covers everything you need to know. No jargon. Just the rules, the numbers, and exactly
        what to write on every invoice.
      </P>

      <H2>Who Needs to Issue GST Invoices?</H2>

      <P>
        You are required to register for GST and issue GST-compliant invoices if your aggregate annual turnover
        exceeds <strong>₹20 lakh</strong> (₹10 lakh for special category states: Manipur, Mizoram, Nagaland,
        Tripura). If you provide services exclusively, this threshold applies.
      </P>

      <Callout type="tip">
        <strong>Threshold crossed mid-year?</strong> You must register within 30 days of the date your
        turnover exceeded the limit. All invoices issued after registration must be GST-compliant — there's
        no grace period.
      </Callout>

      <P>
        Even if you're <em>below</em> the threshold, some clients — particularly corporates and agencies —
        may require a GST invoice to claim input tax credit (ITC). In that case, voluntary GST registration
        is worth considering.
      </P>

      <H2>Mandatory Fields on a GST Invoice</H2>

      <P>
        Under Rule 46 of the CGST Rules, 2017, a tax invoice must contain these fields. Missing even one
        can make the invoice invalid for your client's ITC claim — and for your own record-keeping.
      </P>

      <Table
        headers={['Field', 'What to write', 'Notes']}
        rows={[
          ['Supplier name & address', 'Your full legal name and registered address', 'Must match GST registration'],
          ['GSTIN (supplier)', 'Your 15-digit GST Identification Number', 'Format: 2 digits state + 10 PAN + 1 + 1 + 1'],
          ['Invoice number', 'Sequential, e.g. INV-2026-047', 'Must be unique within a financial year'],
          ['Invoice date', 'Date of issue', 'Must issue within 30 days of service completion'],
          ['Recipient name & address', "Client's legal/trade name and address", 'As registered with GST if they have GSTIN'],
          ['GSTIN (recipient)', "Client's GSTIN if they're GST-registered", 'Mandatory if client claims ITC'],
          ['Description of services', 'Clear description of work done', 'Brief is fine: "Web design services for March 2026"'],
          ['SAC code', '6-digit Service Accounting Code', 'See SAC codes for freelancers below'],
          ['Taxable value', 'Your fee before tax', ''],
          ['GST rate', '0%, 5%, 12%, 18%, or 28%', 'Most freelance services: 18%'],
          ['CGST + SGST or IGST', 'Depends on intra/inter-state', 'See the section below'],
          ['Total amount', 'Taxable value + GST', 'In figures and words'],
          ['Place of supply', 'State name', 'Determines CGST/SGST vs IGST'],
        ]}
      />

      <H2>CGST + SGST vs IGST: When Each Applies</H2>

      <P>
        This is the question that trips up most freelancers. The rule is simple:
      </P>

      <UL items={[
        <><strong>Intra-state supply</strong> (you and your client are in the same state): charge CGST + SGST, each at half the GST rate. For 18% GST → CGST 9% + SGST 9%.</>,
        <><strong>Inter-state supply</strong> (you and your client are in different states): charge IGST at the full GST rate. For 18% GST → IGST 18%.</>,
        <><strong>Export of services</strong> (client is outside India): zero-rated supply, IGST 0%. You can claim a refund of input tax credit paid on inputs.</>,
      ]} />

      <Callout type="info">
        <strong>How to determine "place of supply" for services:</strong> For most B2B services in India,
        the place of supply is the location of the recipient (your client's state). For B2C (unregistered
        clients), it's the location where the service is actually performed — usually your state.
      </Callout>

      <P>
        <strong>Example:</strong> You're a freelancer in Maharashtra (GSTIN starts with 27). Your client
        is in Karnataka (GSTIN starts with 29). This is inter-state → charge IGST 18%. If the same client
        was also in Maharashtra → charge CGST 9% + SGST 9%.
      </P>

      <H2>SAC Codes for Common Freelance Services</H2>

      <P>
        SAC (Service Accounting Code) is a 6-digit code that classifies services for GST purposes.
        Your invoice must include the correct SAC for your services.
      </P>

      <Table
        headers={['Freelance service', 'SAC code', 'GST rate']}
        rows={[
          ['Website design & development', '998313', '18%'],
          ['Software development / IT services', '998314', '18%'],
          ['Graphic design, branding', '998391', '18%'],
          ['Content writing, copywriting', '998391', '18%'],
          ['Photography / videography', '999612', '18%'],
          ['Management consulting / advisory', '998311', '18%'],
          ['Marketing / PR services', '998361', '18%'],
          ['Accounting / bookkeeping', '998222', '18%'],
          ['Architecture / interior design', '998321', '18%'],
          ['Educational / training services', '999299', '18%'],
        ]}
      />

      <Callout type="warn">
        <strong>When in doubt, use 998314</strong> ("Support services to businesses n.e.c.") — it's
        accepted by most clients and tax authorities for general professional/knowledge work. If you
        have a chartered accountant, confirm the exact code for your specific service.
      </Callout>

      <H2>GST Invoice Due Dates</H2>

      <P>
        You must issue the GST invoice within the time limits below. Late invoices can attract penalties
        and create problems for your client's ITC claim.
      </P>

      <Table
        headers={['Type of supply', 'Invoice due date']}
        rows={[
          ['Services (general)', '30 days from date of supply (service completion)'],
          ['Continuous/subscription services', '30 days from each billing period end'],
          ['Export services', '30 days from service completion'],
        ]}
      />

      <H2>Step-by-Step: Create a GST-Compliant Invoice</H2>

      <H3>Step 1 — Gather your information</H3>
      <P>
        Before you start, have ready: your GSTIN, your client's GSTIN (ask them), both addresses,
        the SAC code for your service, the invoice date, and the agreed fee.
      </P>

      <H3>Step 2 — Calculate GST correctly</H3>
      <P>
        Determine whether the supply is intra-state or inter-state by comparing your state with
        your client's state (look at the first two digits of both GSTINs — if they match, it's
        intra-state). Then apply CGST + SGST or IGST accordingly.
      </P>

      <H3>Step 3 — Assign a sequential invoice number</H3>
      <P>
        Your invoice number must be unique within a financial year (April–March). A simple format like
        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">INV-2026-001</code> works.
        Once you issue invoice 001, the next must be 002 — gaps in the sequence are technically allowed
        but can raise questions during GST audit.
      </P>

      <H3>Step 4 — Use a GST invoice tool or template</H3>
      <P>
        You can use ClearWork's free GST Invoice Generator — it auto-detects intra/inter-state based
        on your state and client state, calculates CGST/SGST/IGST correctly, and generates a
        print-ready PDF you can email directly.
      </P>

      <ToolCTA
        href="/tools/gst-invoice-generator"
        toolName="Free GST Invoice Generator"
        cta="Auto CGST/SGST/IGST split by state. PDF download. No signup, no watermark. Takes 2 minutes."
      />

      <H2>Common Mistakes to Avoid</H2>

      <UL items={[
        <><strong>Wrong tax type:</strong> Charging CGST+SGST for an inter-state client (or IGST for intra-state) is the #1 error. Your client can't claim ITC on incorrectly-structured GST.</>,
        <><strong>Missing GSTIN:</strong> If your client is GST-registered and you omit their GSTIN, they can't claim ITC — they'll ask you to reissue.</>,
        <><strong>Invoice date after payment:</strong> The invoice must be issued before or on the date of payment, or within 30 days of service completion — whichever is earlier.</>,
        <><strong>Incorrect SAC code:</strong> A wrong SAC code can mismatch with your GST returns (GSTR-1) and trigger notices.</>,
        <><strong>Amount mismatch:</strong> The total in figures must match the total in words (amount in words is mandatory). A mismatch invalidates the invoice.</>,
        <><strong>No place of supply:</strong> This field is mandatory and determines which tax applies. Don't skip it.</>,
      ]} />

      <H2>GST Invoice for Exports (If Your Client Is Overseas)</H2>

      <P>
        If you work with international clients (US, UK, EU companies etc.), your services qualify
        as "export of services" under GST — provided payment is received in foreign currency through
        banking channels. These are <strong>zero-rated supplies</strong>: you charge 0% GST (IGST 0%)
        and can claim a refund of any GST paid on your inputs (software subscriptions, equipment, etc.).
      </P>

      <P>
        On your export invoice, write <em>"Supply meant for export / zero-rated supply"</em> in
        the description. Include the client's address and country. No GSTIN required for foreign clients.
      </P>

      <FAQ items={[
        {
          q: 'Do I need a separate invoice for each project milestone?',
          a: 'No — you can issue one invoice covering a full project or issue separate invoices per milestone. What matters is that each invoice is uniquely numbered and correctly reflects the services provided and the date of supply.',
        },
        {
          q: 'Can I issue a GST invoice before the work is complete?',
          a: 'Yes, for advance payments, issue a "receipt voucher" (not a tax invoice). Convert it to a proper tax invoice once the service is completed. Most freelancers skip this and issue a tax invoice directly — technically an advance invoice is allowed if the service will be provided within the same financial year.',
        },
        {
          q: 'What if my client doesn\'t have a GSTIN?',
          a: 'Many individual / small business clients aren\'t GST-registered. Leave the recipient GSTIN field blank. The invoice is still valid. Just note "Unregistered" in the client details field.',
        },
        {
          q: 'Can I cancel or revise a GST invoice?',
          a: 'Yes — issue a "credit note" to cancel or reduce an invoice already issued. Issue a "debit note" to increase the amount. These notes reference the original invoice number.',
        },
        {
          q: 'What GST rate applies to my freelance design / dev / writing work?',
          a: 'Most professional services attract 18% GST. This is split as CGST 9% + SGST 9% (intra-state) or IGST 18% (inter-state). Educational services and a few health-related services attract lower rates, but these rarely apply to typical freelance work.',
        },
        {
          q: 'Is a digital/emailed PDF invoice valid?',
          a: 'Yes, completely. GST doesn\'t require physical paper invoices. A PDF sent by email is a valid tax invoice as long as it contains all mandatory fields. The recipient can print it for their records.',
        },
      ]} />

    </BlogLayout>
  )
  useScrollDepth('how-to-create-gst-invoice-india')
  trackBlogRead('how-to-create-gst-invoice-india')
}
