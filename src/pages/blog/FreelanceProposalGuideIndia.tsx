import BlogLayout, {
  H2, H3, P, Callout, Table, UL, ToolCTA, FAQ,
  type BlogMeta,
} from '../../components/BlogLayout'
import { useSeo } from '../../lib/useSeo'

const meta: BlogMeta = {
  title: 'How to Write a Freelance Proposal That Gets Signed (India Guide)',
  description: 'A 6-part structure for freelance proposals that actually get signed in India — with a real worked example, GST-clear pricing, and what to do the moment a client says yes.',
  date: 'August 2026',
  datePublished: '2026-08-08',
  readTime: '9 min',
  category: 'Proposals & Contracts',
  canonical: 'https://getclearwork.in/blog/how-to-write-freelance-proposal-india',
}

export default function FreelanceProposalGuideIndia() {
  useSeo(meta.title, meta.description, meta.canonical)

  return (
    <BlogLayout meta={meta}>

      <P>
        A freelance proposal that gets signed in India needs four things a generic template
        doesn't give you: a scope the client can't misread, pricing that's clear about GST,
        a firm timeline, and one easy way to say yes. Most proposals fail on at least one of
        these — and once you know which one, it's a quick fix.
      </P>

      <P>
        This guide covers the exact structure to use, a full worked example with real ₹ pricing,
        the mistakes that quietly kill your signed rate, and — the part most guides skip entirely —
        what to do the second your client accepts.
      </P>

      <H2>Why most freelance proposals in India get ignored</H2>

      <P>
        Most Indian freelancers send proposals the same way: a Canva PDF or a Google Doc,
        attached to a WhatsApp message, with pricing buried somewhere in paragraph three.
        Three things go wrong almost every time:
      </P>

      <UL items={[
        <><strong>No tracking.</strong> You have no idea if the client opened it, so you don't know when — or whether — to follow up.</>,
        <><strong>Vague pricing.</strong> "₹45,000 for the project" doesn't say whether GST is included, so the client assumes one thing and you assume another.</>,
        <><strong>No clear next step.</strong> The proposal ends with "let me know your thoughts" instead of a specific action.</>,
      ]} />

      <Callout type="info">
        If you've ever sent a proposal and heard nothing back for two weeks, it's rarely because
        the client hated it. It's usually one of the three problems above — and all three are
        fixable in the document itself, before you ever hit send.
      </Callout>

      <H2>The 6-part structure that works</H2>

      <P>
        Every proposal that reliably gets signed follows roughly the same shape. You don't need
        to be a copywriter — you need to include these six things, in this order.
      </P>

      <H3>1. Context — show you understood the brief</H3>
      <P>
        One or two lines restating the client's actual problem in your own words. This is the
        single highest-leverage sentence in the whole document — it's the difference between
        "another freelancer applying" and "someone who gets it."
      </P>

      <H3>2. Scope — as a list, not a paragraph</H3>
      <P>
        Write deliverables as bullet points, not prose. "I'll design your website" invites disputes
        later about what "design your website" actually included. "5 pages, 2 rounds of revisions,
        source files handed over on final payment" doesn't.
      </P>

      <H3>3. Timeline</H3>
      <P>
        A start date and an end date, plus any milestones in between. If the timeline depends on
        the client (e.g. providing content or approvals), say so explicitly — this is what protects
        your deadline when they're the ones who go quiet.
      </P>

      <H3>4. Pricing — in a table, GST called out explicitly</H3>
      <P>
        This is where most Indian freelance proposals fall apart. Always state whether the number
        is inclusive or exclusive of GST — see the worked example below for exactly how to phrase it.
      </P>

      <H3>5. Terms</H3>
      <P>
        Advance percentage (30-50% is standard for new clients), payment schedule for milestone-based
        work, and the revision limit. These three lines prevent 80% of the payment disputes freelancers
        run into later.
      </P>

      <H3>6. One clear next step</H3>
      <P>
        Not "let me know your thoughts" — something specific and low-friction: "Reply 'yes' to this
        message and I'll send the contract for signature" or "Click below to accept and I'll get started
        this week."
      </P>

      <H2>Worked example: a real ₹45,000 proposal</H2>

      <P>
        Here's what that structure looks like in practice, for a freelance logo + brand identity project:
      </P>

      <Callout type="tip">
        <strong>Project:</strong> Logo &amp; brand identity for [Client]'s new café brand<br /><br />
        <strong>Understanding:</strong> You're launching a new café and need a brand identity that feels
        premium but approachable — something that works on a signboard, packaging, and Instagram equally
        well.<br /><br />
        <strong>Scope:</strong>
        <br />— 3 initial logo concepts
        <br />— 2 rounds of revisions on the selected concept
        <br />— Final files: AI, PNG, SVG, PDF
        <br />— Brand colour palette + 2 font pairings
        <br /><br />
        <strong>Timeline:</strong> 2 weeks from advance payment. Concepts shared by Day 5, final files
        delivered by Day 14 (assuming feedback within 48 hours of each round).<br /><br />
        <strong>Pricing:</strong> ₹45,000 + GST (₹8,100 @ 18%) = <strong>₹53,100 total</strong><br /><br />
        <strong>Terms:</strong> 50% advance (₹26,550) to begin, balance on final file delivery. Includes
        2 revision rounds — additional rounds billed at ₹3,000 each.<br /><br />
        <strong>Next step:</strong> Reply "confirmed" and I'll send the contract for e-signature today.
      </Callout>

      <H2>Should your proposal price include GST?</H2>

      <P>
        Either works — the mistake is being vague about which one you mean. Two acceptable formats:
      </P>

      <Table
        headers={['Format', 'Example', 'When to use']}
        rows={[
          ['Exclusive + GST called out', '₹45,000 + GST (18%) = ₹53,100', 'Most common — keeps your base rate clean for your own records'],
          ['All-inclusive', '₹53,100 (inclusive of all taxes)', 'Simpler for clients who just want one final number'],
        ]}
      />

      <Callout type="warn">
        Never write just "₹45,000" with no mention of GST either way. If you're GST-registered,
        the client will expect an invoice that matches the number they agreed to — and a
        conversation about "wait, is this + GST?" after the work is done is not one you want to have.
      </Callout>

      <H2>Common mistakes that quietly kill your signed rate</H2>

      <UL items={[
        <><strong>Scope written as prose, not a list.</strong> Paragraphs get skimmed; bullet points get read.</>,
        <><strong>No revision limit.</strong> "Unlimited revisions" isn't generous — it's a project that never ends.</>,
        <><strong>Sending as an unrackable PDF.</strong> If you don't know when they opened it, you don't know when to follow up — you're just guessing and hoping.</>,
        <><strong>Pricing buried in the middle of a paragraph</strong> instead of its own clearly formatted section.</>,
        <><strong>No advance clause.</strong> Starting work before any payment lands puts 100% of the risk on you.</>,
      ]} />

      <ToolCTA
        href="/tools/quote-generator"
        toolName="Free Quote Generator"
        cta="Generate a clean, professional quote with GST called out correctly in seconds. Free, no signup required."
      />

      <H2>What happens after they say yes</H2>

      <P>
        This is the part almost no proposal guide covers, because most of them are written for
        Upwork bids — not for freelancers and agencies running a full client engagement with
        contracts and invoices attached.
      </P>

      <P>
        Once a client accepts your proposal, three things need to happen fast: the terms you
        just agreed on need to become a contract, that contract needs a valid signature, and the
        advance-payment invoice needs to go out immediately — while the client's "yes" is still
        fresh. Re-typing the same scope, price, and timeline into three separate documents is
        exactly where most freelancers lose momentum (and sometimes lose the advance payment
        altogether, because the invoice went out a week late).
      </P>

      <P>
        This is also why proposal tracking matters more than it sounds. Knowing the exact moment
        a client opens your proposal — and which section they spent the longest on — tells you
        precisely when to follow up and what they're hesitating on, instead of sending the same
        generic "just checking in" message on a schedule you made up.
      </P>

      <FAQ items={[
        {
          q: 'How long should a freelance proposal be in India?',
          a: 'For most freelance projects, one page is enough — context, scope as bullets, timeline, pricing table, terms, and a clear next step. Save the long-form case studies for your portfolio, not the proposal itself.',
        },
        {
          q: 'Should I include GST in my proposal price?',
          a: 'State it explicitly either way — "₹45,000 + GST" or "₹53,100 inclusive of all taxes" both work. What doesn\'t work is a bare number with no mention of tax treatment at all, since that\'s where pricing disputes start.',
        },
        {
          q: "What's the difference between a proposal and a contract?",
          a: 'A proposal is your pitch — scope, price, and timeline, written to get a "yes." A contract is the legally binding version of that same agreement, usually with added clauses (IP ownership, termination terms, dispute resolution) and a signature. Once a proposal is accepted, it should convert directly into a contract rather than being retyped from scratch.',
        },
        {
          q: 'How do I know if my client opened my proposal?',
          a: 'A plain PDF or Google Doc gives you no visibility at all. Tools built for freelancers — including ClearWork — can show you the exact moment a client opens a proposal link and which sections they spent time on, which is far more useful for timing a follow-up than guessing.',
        },
      ]} />

    </BlogLayout>
  )
}
