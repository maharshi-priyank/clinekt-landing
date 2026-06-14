import BlogLayout, {
  H2, H3, P, Callout, Table, UL, ToolCTA, FAQ,
  type BlogMeta,
} from '../../components/BlogLayout'
import { useSeo } from '../../lib/useSeo'
import { useScrollDepth } from '../../hooks/useScrollDepth'
import { trackBlogRead } from '../../lib/analytics'

const meta: BlogMeta = {
  title: 'TDS on Freelance Income: Section 194J vs 194C Explained',
  description: 'TDS at 10% under Section 194J applies to most Indian freelancers — not 194C. Learn rates, thresholds, Form 26AS, refund claims, and how to handle TDS on invoices.',
  date: 'June 2026',
  datePublished: '2026-06-14',
  readTime: '7 min',
  category: 'Tax & TDS',
  canonical: 'https://getclearwork.in/blog/tds-on-freelance-income-194j-194c-india',
}

export default function TdsGuide() {
  useSeo(meta.title, meta.description, meta.canonical)

  return (
    <BlogLayout meta={meta}>

      <P>
        <strong>TDS (Tax Deducted at Source)</strong> is tax your client deducts before paying you.
        For most Indian freelancers — developers, designers, writers, consultants —
        <strong> Section 194J applies</strong>, not 194C. The rate under 194J is 10% (or 2% for
        technical services). Here is everything you need to know to stay on top of it.
      </P>

      <H2>What Exactly Is TDS, and Why Does It Affect Freelancers?</H2>

      <P>
        When a registered business or company pays you as a freelancer, they are legally required to
        deduct a percentage of your fee upfront and deposit it with the Income Tax Department on your
        behalf. You receive the balance. That deducted amount is called TDS.
      </P>

      <P>
        It is not an extra tax. It is an advance against your final income tax liability. If too much
        is deducted, you get a refund when you file your ITR.
      </P>

      <Callout type="warn">
        The catch: many freelancers receive payments with TDS deducted under the wrong section — and
        that creates mismatches in their Form 26AS that are annoying to fix.
      </Callout>

      <H2>Which Section Applies to Your Freelance Work — 194J or 194C?</H2>

      <H3>Section 194J — Professional or Technical Services</H3>
      <UL items={[
        'Software developers and IT consultants',
        'Graphic designers and UI/UX designers',
        'Content writers, copywriters, and editors',
        'Management consultants, legal advisors, chartered accountants',
        'Photographers, videographers, and creative professionals',
        'Marketing and SEO consultants',
      ]} />

      <H3>Section 194C — Work Contractors</H3>
      <UL items={[
        'Printing and publishing jobs',
        'Advertising agencies fulfilling a production contract',
        'Transportation or logistics services',
        'Event management (contractual execution)',
      ]} />

      <Callout type="tip">
        The practical rule: if you are selling your expertise, knowledge, or skill — you fall under
        <strong> 194J</strong>. If you are delivering a manufactured product or executing a
        logistics-type contract, 194C may apply. When in doubt, 194J is the correct section for
        freelance professional work.
      </Callout>

      <H2>TDS Rates and Threshold Limits</H2>

      <Table
        headers={['Feature', 'Section 194J', 'Section 194C']}
        rows={[
          ['Applicable to', 'Professional fees, technical services, royalties', 'Work contracts, sub-contracts'],
          ['Standard TDS rate', '10% (professional) / 2% (technical services)', '1% (individual/HUF) / 2% (others)'],
          ['Annual threshold', '₹30,000 per financial year', '₹30,000 per single payment OR ₹1,00,000 aggregate'],
          ['Who must deduct', 'Companies, firms, audit-liable individuals/HUFs', 'Same'],
          ['PAN not provided', '20%', '20%'],
          ['Relevant for freelancers?', '✓ Yes — primary section', 'Rarely, only for contractual output work'],
        ]}
      />

      <ToolCTA
        href="/tools/tds-calculator"
        toolName="Free TDS Calculator"
        cta="Calculate TDS deduction for any invoice amount. Covers Section 194J, 194C, 194JA. Free, instant, no signup."
      />

      <H2>Who Is Responsible for Deducting TDS?</H2>

      <P>
        TDS is the <strong>payer's responsibility</strong>, not yours. Your client deducts it before
        transferring your fee. Not every client deducts TDS. The obligation applies to:
      </P>

      <UL items={[
        'Companies (public or private)',
        'Firms and LLPs',
        'Individuals and HUFs whose business turnover exceeded ₹1 crore (business) or ₹50 lakh (profession) in the preceding financial year',
      ]} />

      <P>
        Individual clients — a solo founder paying you person-to-person — generally do not have a
        TDS deduction obligation. That is why some clients deduct TDS and others don't.
      </P>

      <H2>How to Check How Much TDS Has Been Deducted</H2>

      <P>
        The place to verify this is <strong>Form 26AS</strong> — your annual tax statement maintained
        by the Income Tax Department.
      </P>

      <UL items={[
        'Log in to the Income Tax e-filing portal',
        'Go to e-File > Income Tax Returns > View Form 26AS',
        'You will be redirected to the TRACES portal',
        'Download the statement for the relevant financial year',
      ]} />

      <P>
        Check <strong>Part A</strong> of Form 26AS. Each entry shows the deductor's name and TAN,
        the section used (194J or 194C), amount deducted, and whether it has been deposited with
        the government. If it doesn't appear in 26AS, the client hasn't deposited it yet — you can
        only claim credit for TDS that appears in 26AS.
      </P>

      <H2>How to Claim a TDS Refund When Filing ITR</H2>

      <P>
        TDS is an advance tax payment. When you file your ITR, the system calculates your actual tax
        liability. If TDS deducted exceeds your liability, the excess is refunded.
      </P>

      <UL items={[
        <><strong>Choose the right ITR form.</strong> For freelancers with professional income: ITR-3 (if you maintain books) or ITR-4 (Sugam) under the Section 44ADA presumptive scheme.</>,
        <><strong>Report gross income.</strong> Enter the full amount billed to the client — not the net amount received after TDS.</>,
        <><strong>Pre-fill TDS data.</strong> The portal pulls TDS entries directly from Form 26AS. Verify every deduction entry.</>,
        <><strong>Compute tax.</strong> If total TDS &gt; total tax payable, the difference is your refund — credited directly to your bank account.</>,
      ]} />

      <Callout type="warn">
        Common mistake: entering the <strong>post-TDS amount</strong> as your income. Always report
        the full billing amount.
      </Callout>

      <H2>Form 15G and Form 15H</H2>

      <P>
        <strong>Form 15G</strong> (under 60) and <strong>Form 15H</strong> (senior citizens) are
        self-declarations stating your income is below the exemption limit and TDS should not be
        deducted. Eligibility for Form 15G:
      </P>

      <UL items={[
        'You are a resident individual',
        'Your estimated total income for the year is below ₹2.5 lakh',
        'Tax liability on total income is nil',
      ]} />

      <P>
        For most active freelancers, Form 15G will not apply. File your ITR and claim the refund instead.
      </P>

      <H2>Form 16A</H2>

      <P>
        <strong>Form 16A</strong> is the TDS certificate issued by your client for non-salary
        payments — including freelance fees under 194J. Your client must issue it within 15 days of
        the TDS return due date. It contains the deductor's TAN, your PAN, amount paid, TDS
        deducted and deposited, and BSR code with challan number.
      </P>

      <P>
        If a client refuses to issue Form 16A, you can still file using Form 26AS — but Form 16A
        makes reconciliation cleaner.
      </P>

      <FAQ items={[
        {
          q: 'Is TDS on freelance income compulsory for all clients?',
          a: 'No. Only companies, firms, and audit-liable individuals/HUFs are required to deduct TDS. Individual clients without audit liability are generally exempt.',
        },
        {
          q: 'What happens if TDS is deducted under 194C instead of 194J?',
          a: 'The credit still appears in Form 26AS and can be claimed in your ITR. However, 194C rates (1–2%) are lower than 194J (10%), so the client may be underpaying — their compliance risk, not yours.',
        },
        {
          q: 'Can I get a TDS refund if I am under the tax exemption limit?',
          a: 'Yes. If your total income is below the basic exemption limit, your entire TDS is refunded when you file your ITR. Filing is mandatory to trigger the refund.',
        },
        {
          q: 'Do I add GST and TDS both on the same invoice?',
          a: 'TDS is deducted on the base value excluding GST. On a ₹1,00,000 + ₹18,000 GST invoice, TDS at 10% is ₹10,000 — deducted from the base only. You receive ₹90,000 + ₹18,000 = ₹1,08,000.',
        },
      ]} />

    </BlogLayout>
  )
  useScrollDepth('tds-on-freelance-income-194j-194c-india')
  trackBlogRead('tds-on-freelance-income-194j-194c-india')
}
