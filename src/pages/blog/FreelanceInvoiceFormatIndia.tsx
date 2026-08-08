import BlogLayout, {
  H2, H3, P, Callout, Table, UL, ToolCTA, FAQ,
  type BlogMeta,
} from '../../components/BlogLayout'
import { useSeo } from '../../lib/useSeo'

const meta: BlogMeta = {
  title: 'GST Invoice Format vs Regular Invoice: Which One Do You Need?',
  description: 'Not every Indian freelancer needs the GST invoice format. Here\'s the correct invoice format whether you\'re GST-registered or not, with every mandatory field and a worked example.',
  date: 'August 2026',
  datePublished: '2026-08-08',
  readTime: '8 min',
  category: 'GST & Invoicing',
  canonical: 'https://getclearwork.in/blog/freelance-invoice-format-india',
}

export default function FreelanceInvoiceFormatIndia() {
  useSeo(meta.title, meta.description, meta.canonical)

  return (
    <BlogLayout meta={meta}>

      <P>
        Not every Indian freelancer needs a GST invoice — and sending one when you're not
        GST-registered is a mistake that can cause real problems. This guide covers the correct
        invoice format for both situations: what a standard (non-GST) freelance invoice needs,
        what changes once you register for GST, and the fields that trip people up either way.
      </P>

      <Callout type="info">
        If you're not sure whether you need to register for GST at all, read our{' '}
        <a href="/blog/gst-for-freelancers-india-complete-guide" className="text-indigo-500 hover:underline">
          complete GST guide for freelancers
        </a>{' '}
        first — this post assumes you already know your registration status and just need the
        right invoice format.
      </Callout>

      <H2>Do you need a GST invoice, or a regular invoice?</H2>

      <Table
        headers={['Your situation', 'Invoice type']}
        rows={[
          ['Not GST-registered (below ₹20L / ₹10L threshold, haven\'t opted in)', 'Regular invoice — no GST fields, no GSTIN'],
          ['GST-registered', 'GST invoice — GSTIN, CGST/SGST or IGST breakdown, HSN/SAC code'],
          ['Not registered, but client insists on a "GST invoice"', 'You legally cannot charge GST without a GSTIN — explain this, or consider voluntary registration if this happens often'],
        ]}
      />

      <Callout type="warn">
        Charging GST on an invoice without a valid GSTIN is not legally permitted — even if a
        client asks for it "to make it official." If corporate clients frequently push back on
        this, that's a signal it may be worth registering voluntarily, covered in our GST guide.
      </Callout>

      <H2>What every freelance invoice needs — GST or not</H2>

      <P>
        Regardless of your registration status, these fields are the baseline for any
        professional invoice in India:
      </P>

      <UL items={[
        'Your name/business name and address',
        'Client\'s name and address',
        'Unique invoice number (sequential — don\'t reuse or skip numbers)',
        'Invoice date and due date',
        'Description of services rendered',
        'Amount, itemised if the engagement has multiple components',
        'Payment terms (due date, late fee if applicable)',
        'Bank account details or a payment link (UPI, card, net banking)',
        'PAN (optional but recommended for higher-value invoices, especially with corporate clients who need it for their TDS records)',
      ]} />

      <H3>Non-GST invoice — worked example</H3>

      <Callout type="tip">
        <strong>Invoice #INV-0042</strong><br />
        <strong>From:</strong> [Your name], [Address]<br />
        <strong>To:</strong> [Client name], [Address]<br />
        <strong>Date:</strong> 8 Aug 2026 &nbsp;&nbsp; <strong>Due:</strong> 22 Aug 2026<br /><br />
        <strong>Description:</strong> Website design &amp; development — 5 pages, per signed proposal dated 20 Jul 2026<br />
        <strong>Amount:</strong> ₹45,000<br /><br />
        <strong>Payment terms:</strong> Due within 14 days. 2% monthly interest on overdue balance.<br />
        <strong>Pay via:</strong> UPI — yourname@upi &nbsp;|&nbsp; Bank transfer — [Account details]
      </Callout>

      <H2>What changes once you're GST-registered</H2>

      <P>
        A GST invoice needs everything above, plus these additional mandatory fields under
        Rule 46 of the CGST Rules:
      </P>

      <UL items={[
        'Your GSTIN, clearly displayed',
        'Client\'s GSTIN (if they\'re also registered — mandatory for B2B invoices)',
        'HSN/SAC code for the service provided',
        'Place of supply (determines CGST/SGST vs IGST)',
        'GST rate applied and the tax amount, split as CGST + SGST (same state) or IGST (different state)',
        'Total amount inclusive of tax',
        'A declaration if the invoice is for an export of services (zero-rated, with LUT reference)',
      ]} />

      <Table
        headers={['Field', 'Non-GST invoice', 'GST invoice']}
        rows={[
          ['GSTIN', 'Not shown (you don\'t have one)', 'Mandatory — yours, and client\'s if B2B'],
          ['Tax breakdown', 'None — invoice amount is final', 'CGST+SGST or IGST shown separately'],
          ['SAC code', 'Not required', 'Mandatory'],
          ['Can claim Input Tax Credit (ITC)?', 'N/A', 'Client can claim ITC only against a valid GST invoice'],
        ]}
      />

      <Callout type="info">
        This is often the real reason a corporate client insists on GST invoices — they want to
        claim Input Tax Credit against what they pay you, which only works with a properly
        formatted GST invoice from a registered supplier.
      </Callout>

      <H2>Common formatting mistakes (both types)</H2>

      <UL items={[
        <><strong>Skipping invoice numbers</strong> or restarting the sequence randomly — looks unprofessional and complicates your own bookkeeping.</>,
        <><strong>No payment link.</strong> A bank account number alone means the client has to manually initiate a transfer — a UPI or card payment link removes friction and gets you paid faster.</>,
        <><strong>Vague service description.</strong> "Consulting services" invites questions later; "Brand strategy consulting — 3 sessions per signed proposal dated [date]" doesn't.</>,
        <><strong>Missing due date.</strong> "Payment due" with no specific date is an invitation to be paid whenever the client gets around to it.</>,
      ]} />

      <ToolCTA
        href="/tools/gst-invoice-generator"
        toolName="Free GST Invoice Generator"
        cta="Generate a correctly formatted invoice — with or without GST — including CGST/SGST/IGST auto-split and a UPI payment link. Free, no signup required."
      />

      <FAQ items={[
        {
          q: 'Can I send an invoice without being GST-registered?',
          a: 'Yes — a standard, non-GST invoice is completely valid for freelancers below the registration threshold. Just don\'t include any GST fields, GSTIN, or tax breakdown, since you\'re not authorised to charge or collect GST without registration.',
        },
        {
          q: 'What happens if I accidentally charge GST without a GSTIN?',
          a: 'This isn\'t legally permitted and can cause issues for both you and your client (who cannot claim ITC against an invalid GST charge). If this comes up, issue a corrected invoice without the GST line, or consider registering if you\'re close to needing to anyway.',
        },
        {
          q: 'Do I need to mention my PAN on every invoice?',
          a: 'Not legally mandatory on a non-GST invoice, but including it is common practice and often requested by corporate clients for their TDS deduction and Form 16A records.',
        },
        {
          q: 'What\'s the difference between an invoice and a bill?',
          a: 'In everyday freelance use they\'re used interchangeably. Formally, an "invoice" is typically issued before payment as a request for payment, while a "bill" or "receipt" often refers to confirmation after payment is received — but for freelance work, one properly formatted invoice covering both purposes is standard practice.',
        },
      ]} />

    </BlogLayout>
  )
}
