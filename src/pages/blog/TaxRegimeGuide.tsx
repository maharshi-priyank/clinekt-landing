import BlogLayout, {
  H2, H3, P, Callout, Table, UL, ToolCTA, FAQ,
  type BlogMeta,
} from '../../components/BlogLayout'
import { useSeo } from '../../lib/useSeo'
import { useScrollDepth } from '../../hooks/useScrollDepth'
import { trackBlogRead } from '../../lib/analytics'

const meta: BlogMeta = {
  title: 'Old vs New Tax Regime for Freelancers in India (2026): Which One Saves More?',
  description: 'New vs old tax regime FY 2025-26: updated slabs, 3 worked examples at ₹8L/₹15L/₹25L, Section 44ADA explained, ITR-3 vs ITR-4, and when to file Form 10-IEA.',
  date: 'June 2026',
  datePublished: '2026-06-14',
  readTime: '8 min',
  category: 'Tax & TDS',
  canonical: 'https://getclearwork.in/blog/old-vs-new-tax-regime-freelancer-india',
}

export default function TaxRegimeGuide() {
  useSeo(meta.title, meta.description, meta.canonical)

  return (
    <BlogLayout meta={meta}>

      <P>
        The new tax regime is now the <strong>default for FY 2025-26 (AY 2026-27)</strong>. If you
        earn under ₹7 lakh, you pay zero tax under the new regime — no deductions needed. Freelancers
        with significant 80C investments, HRA, or home loan interest may still save more under the
        old regime. Here is how to decide.
      </P>

      <H2>What Changed in Budget 2025 for Freelancers?</H2>

      <P>
        Budget 2025 revised the new regime slabs significantly. The most important change: the
        zero-tax threshold effectively rises to <strong>₹12.75 lakh</strong> once you account for
        the ₹75,000 standard deduction and the Section 87A rebate.
      </P>

      <Callout type="warn">
        The old regime is no longer the default. If you file without specifying, you are automatically
        assessed under the new regime. To opt for the old regime, submit <strong>Form 10-IEA</strong> before
        31 July 2026.
      </Callout>

      <H2>Tax Slabs for FY 2025-26 (AY 2026-27)</H2>

      <H3>New Regime (Default)</H3>
      <Table
        headers={['Income Slab', 'Tax Rate']}
        rows={[
          ['Up to ₹4,00,000', 'Nil'],
          ['₹4,00,001 – ₹8,00,000', '5%'],
          ['₹8,00,001 – ₹12,00,000', '10%'],
          ['₹12,00,001 – ₹16,00,000', '15%'],
          ['₹16,00,001 – ₹20,00,000', '20%'],
          ['₹20,00,001 – ₹24,00,000', '25%'],
          ['Above ₹24,00,000', '30%'],
        ]}
      />
      <UL items={[
        'Standard deduction: ₹75,000 (available from FY 2024-25)',
        '87A rebate: zero tax on net income up to ₹12 lakh → effective zero-tax limit ₹12.75 lakh',
        'No 80C, HRA, home loan interest, or other deductions',
      ]} />

      <H3>Old Regime</H3>
      <Table
        headers={['Income Slab', 'Tax Rate']}
        rows={[
          ['Up to ₹2,50,000', 'Nil'],
          ['₹2,50,001 – ₹5,00,000', '5%'],
          ['₹5,00,001 – ₹10,00,000', '20%'],
          ['Above ₹10,00,000', '30%'],
        ]}
      />
      <UL items={[
        '87A rebate up to ₹12,500 for net income up to ₹5 lakh',
        'All deductions available: 80C, 80D, HRA, home loan interest, NPS 80CCD(1B)',
        'No ₹75,000 standard deduction',
      ]} />

      <H2>Deductions Only Available in the Old Regime</H2>

      <Table
        headers={['Deduction', 'Section', 'Maximum Limit']}
        rows={[
          ['PPF, ELSS, LIC, tuition fees', '80C', '₹1,50,000'],
          ['Health insurance premium', '80D', '₹25,000 – ₹1,00,000'],
          ['House Rent Allowance', 'HRA / 10(13A)', 'Actual, formula-based'],
          ['Home loan interest (self-occupied)', 'Section 24(b)', '₹2,00,000'],
          ['Additional NPS contribution', '80CCD(1B)', '₹50,000'],
        ]}
      />

      <Callout type="tip">
        A freelancer maxing 80C + NPS 80CCD(1B) + 80D can reduce taxable income by{' '}
        <strong>₹2.25 lakh</strong> before HRA or home loan interest.
      </Callout>

      <H2>Which Regime Wins at ₹8L, ₹15L, and ₹25L?</H2>

      <P>
        All three examples use <strong>Section 44ADA</strong> (50% of gross receipts = taxable
        profit). Old regime assumes ₹2.25L in deductions (80C + NPS + 80D).
      </P>

      <H3>At ₹8 Lakh Taxable Profit</H3>
      <Table
        headers={['Regime', 'Calculation', 'Tax Payable']}
        rows={[
          ['New', '₹8L − ₹75K standard deduction = ₹7.25L. Within 87A rebate (applies up to ₹12L)', '₹0'],
          ['Old', '₹8L − ₹2.25L deductions = ₹5.75L. Tax = ₹12,500 + ₹15,000', '₹27,500'],
        ]}
      />
      <Callout type="tip"><strong>New regime wins by ₹27,500.</strong></Callout>

      <H3>At ₹15 Lakh Taxable Profit</H3>
      <Table
        headers={['Regime', 'Calculation', 'Tax Payable (incl. 4% cess)']}
        rows={[
          ['New', '₹15L − ₹75K = ₹14.25L. Tax across slabs = ₹93,750', '₹97,500'],
          ['Old', '₹15L − ₹2.25L = ₹12.75L. Tax across slabs = ₹1,95,000', '₹2,02,800'],
        ]}
      />
      <Callout type="tip"><strong>New regime wins by ~₹1.05 lakh.</strong></Callout>

      <H3>At ₹25 Lakh Taxable Profit</H3>
      <Table
        headers={['Regime', 'Calculation', 'Tax Payable (incl. 4% cess)']}
        rows={[
          ['New', '₹25L − ₹75K = ₹24.25L. Tax across slabs = ₹3,07,500', '₹3,19,800'],
          ['Old', '₹25L − ₹2.25L = ₹22.75L. Tax = ₹4,95,000', '₹5,14,800'],
        ]}
      />
      <Callout type="tip"><strong>New regime wins by ~₹1.95 lakh.</strong></Callout>

      <ToolCTA
        href="/tools/income-tax-calculator"
        toolName="Income Tax Calculator FY 2025-26"
        cta="Compare old vs new regime side-by-side with your actual numbers. AY 2026-27. Free, instant, no signup."
      />

      <H2>What Is Section 44ADA and Who Qualifies?</H2>

      <P>
        Section 44ADA lets specified professionals declare <strong>50% of gross receipts as taxable
        profit</strong> — no receipts or books required for the other 50%.
      </P>

      <UL items={[
        'Individuals and partnership firms (not companies)',
        'IT consultants, designers, writers, architects, engineers, legal professionals, doctors, accountants',
        'Gross receipts under ₹75 lakh per financial year',
      ]} />

      <P>
        <strong>ITR form:</strong> File <strong>ITR-4 (Sugam)</strong> if using 44ADA. If you
        maintain actual books (expenses &gt; 50%), file <strong>ITR-3</strong>.
      </P>

      <H2>Which ITR Form Should Freelancers File?</H2>

      <Table
        headers={['Scenario', 'ITR Form']}
        rows={[
          ['Using 44ADA presumptive taxation (receipts ≤ ₹75L)', 'ITR-4 (Sugam)'],
          ['Maintaining actual books (expenses > 50%)', 'ITR-3'],
          ['Freelancer with capital gains in addition to professional income', 'ITR-3'],
        ]}
      />

      <H2>How to Switch to the Old Regime</H2>

      <P>
        For freelancers with business income, switching is <strong>not annual</strong> like it is
        for salaried employees:
      </P>

      <UL items={[
        'You can switch from new to old regime only once',
        'After switching back to the new regime, you cannot switch to old again',
        <>Deadline: Submit <strong>Form 10-IEA</strong> before the ITR due date — <strong>31 July 2026</strong> for AY 2026-27</>,
      ]} />

      <Callout type="warn">
        If you file without Form 10-IEA, the new regime applies automatically.
      </Callout>

      <H2>When Does the Old Regime Still Make Sense?</H2>

      <P>The old regime can beat the new one if:</P>

      <UL items={[
        'You pay significant metro rent with a large HRA deduction (₹2–3L)',
        'You have an active home loan with over ₹2L in annual interest',
        'Your total genuine deductions exceed ₹3.75 lakh',
      ]} />

      <Callout type="tip">
        Quick rule: if your actual deductions are below ₹3.75L, the new regime almost certainly wins.
      </Callout>

      <FAQ items={[
        {
          q: 'Is the new tax regime compulsory for freelancers in FY 2025-26?',
          a: 'No — it is the default, not mandatory. File Form 10-IEA before 31 July 2026 to opt for the old regime.',
        },
        {
          q: 'Can I use Section 44ADA under both regimes?',
          a: 'Yes. Section 44ADA determines how profit is calculated — it works with either the old or new regime.',
        },
        {
          q: 'I earn ₹10 lakh in gross receipts. Do I pay any tax?',
          a: 'Under 44ADA, taxable profit = ₹5L. Under the new regime: ₹5L − ₹75K standard deduction = ₹4.25L net. Within the 87A rebate threshold — tax = ₹0.',
        },
        {
          q: 'What if my receipts exceed ₹75 lakh?',
          a: 'Section 44ADA no longer applies. You must maintain books, get a tax audit under Section 44AB, and file ITR-3.',
        },
      ]} />

    </BlogLayout>
  )
  useScrollDepth('old-vs-new-tax-regime-freelancer-india')
  trackBlogRead('old-vs-new-tax-regime-freelancer-india')
}
