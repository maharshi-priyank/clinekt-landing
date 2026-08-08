import BlogLayout, {
  H2, P, Callout, Table, UL, ToolCTA, FAQ,
  type BlogMeta,
} from '../../components/BlogLayout'
import { useSeo } from '../../lib/useSeo'

const meta: BlogMeta = {
  title: 'GST Number Format Explained: How to Read a GSTIN (With Examples)',
  description: 'What does a GST number look like? Full breakdown of the 15-character GSTIN format, a worked example, state codes, how to spot a fake GSTIN, and sample numbers for testing.',
  date: 'August 2026',
  datePublished: '2026-08-08',
  readTime: '7 min',
  category: 'GST & Invoicing',
  canonical: 'https://getclearwork.in/blog/gst-number-format-explained',
}

const stateCodes: [string, string][] = [
  ['01', 'Jammu & Kashmir'], ['02', 'Himachal Pradesh'], ['03', 'Punjab'],
  ['05', 'Uttarakhand'], ['06', 'Haryana'], ['07', 'Delhi'],
  ['08', 'Rajasthan'], ['09', 'Uttar Pradesh'], ['10', 'Bihar'],
  ['19', 'West Bengal'], ['21', 'Odisha'], ['22', 'Chhattisgarh'],
  ['23', 'Madhya Pradesh'], ['24', 'Gujarat'], ['27', 'Maharashtra'],
  ['29', 'Karnataka'], ['32', 'Kerala'], ['33', 'Tamil Nadu'],
  ['36', 'Telangana'], ['37', 'Andhra Pradesh'],
]

export default function GstNumberFormatExplained() {
  useSeo(meta.title, meta.description, meta.canonical)

  return (
    <BlogLayout meta={meta}>

      <P>
        A GST number (GSTIN) is always exactly <strong>15 characters</strong>, in a fixed
        format: a 2-digit state code, followed by 10 characters that are the business's PAN,
        followed by 3 more characters that identify the specific registration. Here's exactly
        how to read one, with a worked example.
      </P>

      <H2>The 15-character structure</H2>

      <P>
        Every GSTIN follows the same layout, in this order:
      </P>

      <Table
        headers={['Position', 'Length', 'What it represents']}
        rows={[
          ['1–2', '2 digits', 'State code (where the business is registered)'],
          ['3–12', '10 characters', "The business's PAN (Permanent Account Number) — identical to their income tax PAN"],
          ['13', '1 character', 'Entity number — which registration this is if the same PAN has multiple GST registrations in one state (usually "1")'],
          ['14', '1 character', 'Always the letter "Z" by default'],
          ['15', '1 character', 'Checksum digit — calculated from the other 14 characters, used to detect typos'],
        ]}
      />

      <H2>Worked example</H2>

      <Callout type="tip">
        <strong>29ABCDE1234F1Z5</strong> breaks down as:
        <br />• <strong>29</strong> — Karnataka
        <br />• <strong>ABCDE1234F</strong> — the business's PAN
        <br />• <strong>1</strong> — first GST registration for this PAN in this state
        <br />• <strong>Z</strong> — fixed default character
        <br />• <strong>5</strong> — checksum digit
        <br /><br />
        <em>This is an illustrative example only — it is not a real, active GSTIN.</em>
      </Callout>

      <H2>State codes (most common)</H2>

      <P>
        The first two digits tell you which state the GSTIN was issued in — useful for
        spotting whether a client's GSTIN matches the state they claim to operate from, and
        for figuring out CGST/SGST vs IGST when you're invoicing:
      </P>

      <Table
        headers={['Code', 'State']}
        rows={stateCodes}
      />

      <Callout type="info">
        Full list of all 37 state/UT codes is published on the official GST portal — the table
        above covers the states most freelancers and agencies invoice most often.
      </Callout>

      <H2>How to tell if a GSTIN is valid (without calling the government)</H2>

      <UL items={[
        'It must be exactly 15 characters — anything shorter or longer is invalid',
        'Characters 3–12 (the PAN portion) must follow standard PAN format: 5 letters, 4 digits, 1 letter',
        'The 14th character is always "Z"',
        'The first 2 digits must be a real, currently-used state code (01–37, with a few gaps)',
        'The last character is a checksum calculated from the previous 14 — if it doesn\'t match, the number is either mistyped or fabricated',
      ]} />

      <P>
        If you want to confirm a GSTIN is actually active and registered (not just
        correctly formatted), the only reliable way is the "Search Taxpayer" tool on the
        official GST portal — format validity and active-registration status are two
        different checks.
      </P>

      <H2>"Dummy" and "sample" GST numbers — what people actually need</H2>

      <P>
        A lot of searches for "dummy GST number" or "sample GST number" come from developers
        and freelancers testing an invoice template, a form, or a piece of software that
        validates GSTIN format — not from anyone trying to file with a fake number (which
        isn't legal). If that's you, the safest approach is:
      </P>

      <UL items={[
        <>Use a number that <strong>matches the format</strong> (15 characters, correct structure) but is clearly not a real business's registration — most developers use a well-known placeholder pattern for this.</>,
        <>Never submit a fabricated GSTIN in an actual invoice, GST return, or e-way bill — using one that isn't genuinely registered is a compliance problem, not a shortcut.</>,
        <>If you're testing your own software, check whether your GST software provider offers a proper sandbox/test mode instead of using a placeholder number in a live system.</>,
      ]} />

      <ToolCTA
        href="/tools/gst-invoice-generator"
        toolName="Free GST Invoice Generator"
        cta="Generate a correctly formatted GST invoice with the CGST/SGST/IGST split calculated automatically from your real GSTIN. Free, no signup required."
      />

      <H2>Why the format matters for your invoices</H2>

      <P>
        Beyond satisfying curiosity, the GSTIN format directly affects how you invoice:
        the state code in your client's GSTIN (not their billing address) determines
        whether you charge CGST+SGST or IGST. Two clients in the same city can have GSTINs
        registered in different states if their registered office differs from where you're
        actually doing the work — always go by the GSTIN's state code, not assumptions.
      </P>

      <FAQ items={[
        {
          q: 'How many characters does a GST number have?',
          a: 'Always exactly 15 — 2 digits for the state code, 10 characters for the PAN, 1 entity code, the fixed letter "Z", and 1 checksum digit.',
        },
        {
          q: 'What do the first two digits of a GSTIN mean?',
          a: 'They\'re the state code showing which state the GST registration was issued in — for example, 07 is Delhi, 27 is Maharashtra, 29 is Karnataka.',
        },
        {
          q: 'Is the PAN inside a GST number the same as the income tax PAN?',
          a: 'Yes — characters 3 through 12 of every GSTIN are exactly the business or individual\'s 10-character income tax PAN.',
        },
        {
          q: 'Can I use a dummy GST number for testing an invoice template?',
          a: 'For checking that a template displays and formats correctly, using a clearly fake, correctly-structured placeholder is common practice among developers. Never use a fabricated number on an actual invoice, GST return, or any document submitted for real compliance purposes.',
        },
        {
          q: 'How do I check if a GSTIN is actually real and active, not just correctly formatted?',
          a: 'Format validation (the checks in this guide) only confirms the structure is correct. To confirm a GSTIN is genuinely registered and active, use the "Search Taxpayer" tool on the official GST portal (gst.gov.in).',
        },
      ]} />

    </BlogLayout>
  )
}
