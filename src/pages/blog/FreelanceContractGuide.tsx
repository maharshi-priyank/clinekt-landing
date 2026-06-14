import BlogLayout, {
  H2, H3, P, Callout, Table, UL, ToolCTA, FAQ,
  type BlogMeta,
} from '../../components/BlogLayout'
import { useSeo } from '../../lib/useSeo'
import { useScrollDepth } from '../../hooks/useScrollDepth'
import { trackBlogRead } from '../../lib/analytics'

const meta: BlogMeta = {
  title: 'How to Write a Freelance Contract in India (That Actually Protects You)',
  description: '8 essential clauses every Indian freelance contract needs: scope, payment terms, IP ownership, revision policy, kill fee, NDA, dispute resolution, and e-sign under IT Act 2000.',
  date: 'June 2026',
  datePublished: '2026-06-14',
  readTime: '7 min',
  category: 'Legal & Contracts',
  canonical: 'https://getclearwork.in/blog/how-to-write-freelance-contract-india',
}

export default function FreelanceContractGuide() {
  useSeo(meta.title, meta.description, meta.canonical)

  return (
    <BlogLayout meta={meta}>

      <P>
        Yes, you need a written contract — every time, for every client. A freelance contract in
        India should include scope of work, payment terms, IP ownership, revision limits, a
        termination clause, an NDA, a dispute resolution clause, and an e-signature provision under
        the IT Act 2000. Without these, you have a WhatsApp conversation. With them, you have a
        legally enforceable agreement.
      </P>

      <Callout type="warn">
        A client I'd worked with for three months — ₹1.8 lakh in work — decided the "final" logo
        needed 14 more rounds of changes because we "never agreed on a number." We hadn't. There was
        nothing in writing. I ate the cost and lost a month.
      </Callout>

      <H2>Why Is a Written Contract Non-Negotiable for Indian Freelancers?</H2>

      <P>
        Verbal agreements are technically valid under the <strong>Indian Contract Act, 1872</strong> —
        Section 10 says any agreement made with free consent, competent parties, lawful consideration,
        and a lawful object is a contract. But "valid" and "enforceable in practice" are different
        things entirely.
      </P>

      <P>A written freelance contract in India also:</P>

      <UL items={[
        'Establishes which court has jurisdiction if things go wrong',
        'Triggers your right to charge late payment interest',
        'Determines who owns the deliverables',
        'Creates a paper trail that makes dispute resolution faster and cheaper',
      ]} />

      <H2>The 8 Essential Clauses Every Freelance Contract Must Have</H2>

      <H3>1. Scope of Work — and a Change Request Clause</H3>
      <P>
        Define the deliverables with obsessive specificity: how many pages, what formats, what
        platforms, what language, what dimensions. Add a <strong>change request clause</strong> —
        any modification outside the agreed scope requires a written change order.
      </P>
      <Callout type="info">
        "Any modifications to the agreed deliverables shall be requested in writing. Changes beyond
        2 hours will be billed at ₹[X]/hour and require a revised SOW before work commences."
      </Callout>

      <H3>2. Payment Terms — Advance, Milestones, and Late Payment Interest</H3>
      <P>
        Never start work without an advance. Standard in India is <strong>30–50% upfront</strong>,
        balance tied to milestones or final delivery. Include late payment interest — typically 1.5–2%
        per month:
      </P>
      <Callout type="info">
        "Invoices unpaid beyond 14 days from the due date will attract interest at 1.5% per month
        on the outstanding amount."
      </Callout>

      <H3>3. Intellectual Property Ownership</H3>
      <P>
        Under Indian IP law, the creator owns the copyright by default unless explicitly transferred.
        IP transfers to the client <strong>only upon receipt of full payment</strong>:
      </P>
      <Callout type="info">
        "All intellectual property rights in the deliverables shall remain with [Your Name] until
        full payment is received. Upon receipt of final payment, all rights are assigned to the Client."
      </Callout>
      <P>Also retain: the right to show the work in your portfolio and mention the client's name.</P>

      <H3>4. Revision Policy</H3>
      <P>
        Define exactly what counts as a revision versus a new requirement. Typically include 2–3
        rounds of revisions:
      </P>
      <Callout type="info">
        "A revision is minor adjustments to existing approved work. A change to the concept,
        direction, or fundamental requirements constitutes new scope and will be quoted separately."
      </Callout>

      <H3>5. Termination Clause — Kill Fee and Notice Period</H3>
      <UL items={[
        <><strong>Notice period:</strong> either party can terminate with 7–14 days' written notice</>,
        <><strong>Kill fee:</strong> if the client terminates mid-project, they owe 25–50% of the remaining contract value</>,
      ]} />
      <Callout type="info">
        "If the Client terminates this agreement after work has commenced, a kill fee of 30% of the
        remaining unpaid contract value shall be due within 7 days of termination."
      </Callout>

      <H3>6. Confidentiality / NDA</H3>
      <P>
        Keep it mutual. Standard duration: two years from project completion. Exclude publicly
        available information and information you already knew independently.
      </P>

      <H3>7. Dispute Resolution — Arbitration or Court?</H3>
      <Table
        headers={['Option', 'When to use', 'Key detail']}
        rows={[
          ['Arbitration', 'Contracts under ₹10 lakh', 'Faster, cheaper, private. Single arbitrator, Arbitration & Conciliation Act 1996'],
          ['Civil court', 'Larger disputes', 'Specify your city as exclusive jurisdiction'],
        ]}
      />
      <Callout type="info">
        "Any disputes shall be subject to the exclusive jurisdiction of the courts of [Your City], India."
      </Callout>

      <H3>8. E-Signature and Enforceability Under IT Act 2000</H3>
      <P>
        An e-signed contract is legally valid in India under Section 5 of the IT Act 2000. The most
        legally robust option is <strong>Aadhaar/OTP-based eSign</strong>, listed in the IT Act's
        Second Schedule.
      </P>
      <Callout type="warn">
        <strong>Stamp duty note:</strong> For contracts above ₹500 in most states, nominal stamp
        duty applies — and an unstamped contract may be inadmissible as evidence in court. Most
        states now allow e-stamping online.
      </Callout>

      <H2>Most Common Mistakes Indian Freelancers Make with Contracts</H2>

      <UL items={[
        <><strong>Using a Western template without adapting it.</strong> US/UK templates reference laws that don't exist in India. "Work for hire" under US copyright law does not apply here.</>,
        <><strong>Not specifying TDS.</strong> If your client is a company and the project exceeds ₹30,000, they deduct TDS at 10% under Section 194J. State that the client will provide Form 16A and that your invoice is before TDS deduction.</>,
        <><strong>Leaving the jurisdiction blank.</strong> "Subject to Indian law" is meaningless. Which courts? Which city?</>,
        <><strong>No payment milestone before final delivery.</strong> Transferring final files before full payment gives you zero leverage.</>,
        <><strong>Copy-pasting without reading.</strong> A contract you don't understand is a contract you can't enforce.</>,
      ]} />

      <ToolCTA
        href="/tools/freelance-contract-generator"
        toolName="Free Freelance Contract Generator"
        cta="All 8 clauses pre-built. IP protection, payment terms, kill fee, NDA, OTP e-sign compliant with IT Act 2000. Free, no signup, instant PDF."
      />

      <FAQ items={[
        {
          q: 'Is a freelance contract legally enforceable in India without a physical signature?',
          a: 'Yes. Under the IT Act 2000, an electronically signed contract using OTP/Aadhaar eSign is legally enforceable. Physical "wet ink" signatures are not required for commercial service agreements.',
        },
        {
          q: 'What if my client refuses to sign a contract?',
          a: 'Treat it as a red flag. A client who refuses to put terms in writing expects to renegotiate later. A one-page agreement covering scope, payment, and IP is better than nothing — but working with zero documentation is rarely worth the risk.',
        },
        {
          q: 'Do I need to register my freelance contract anywhere?',
          a: "No. Most freelance agreements don't require registration, but may require stamping for evidentiary admissibility. Check your state's e-stamping facility.",
        },
        {
          q: 'Can I use the same template for all clients?',
          a: 'Use a base template, but customise the scope, payment terms, and jurisdiction for each engagement. The 8 clauses above should appear every time; the specifics inside each should reflect the actual project.',
        },
      ]} />

    </BlogLayout>
  )
  useScrollDepth('how-to-write-freelance-contract-india')
  trackBlogRead('how-to-write-freelance-contract-india')
}
