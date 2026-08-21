import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

type PhaseShot = {
  src: string
  alt: string
  label: string
  story: string
  slug: string
}

type Phase = {
  num: string
  tag: string
  tagColor: string
  accentColor: string
  headline: string
  defaultImg: number
  imgs: PhaseShot[]
}

const PHASES: Phase[] = [
  {
    num: '01',
    tag: 'Lead Pipeline',
    tagColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    accentColor: '#6366f1',
    defaultImg: 4,
    headline: 'A new enquiry lands.\nYou\'re already on it.',
    imgs: [
      {
        src: '/screenshots/client_journey/lead_capture_form.png',
        alt: 'Lead intake form',
        label: 'Intake Form',
        slug: '/q/intake',
        story: 'Priya lands on your intake form — shared as a link from your Instagram bio. She fills in her name, company, service needed, budget, and how she found you. No email thread. No missed DMs.',
      },
      {
        src: '/screenshots/client_journey/lead_capture_tab.png',
        alt: 'Leads tab',
        label: 'Leads Tab',
        slug: '/leads',
        story: 'Your Leads tab captures every enquiry in one view. Filter by stage, source, or follow-up date. Every lead you\'ve ever spoken to — organized, never lost.',
      },
      {
        src: '/screenshots/client_journey/add_lead.png',
        alt: 'Add lead modal',
        label: 'Add Lead',
        slug: '/leads?add=true',
        story: 'Got a referral at a coffee meeting? Add them manually in seconds. Name, company, email, budget, source — all captured before you forget.',
      },
      {
        src: '/screenshots/client_journey/lead_added.png',
        alt: 'Lead added confirmation',
        label: 'Lead Added',
        slug: '/leads/priya-nair',
        story: 'Lead created. Priya\'s card appears instantly with all her details intact — budget, company, source. No copy-pasting from a spreadsheet ever again.',
      },
      {
        src: '/screenshots/client_journey/lead_added_in_pipeline.png',
        alt: 'Lead in kanban pipeline',
        label: 'In Pipeline',
        slug: '/leads?view=kanban',
        story: 'The kanban board shows Priya under Enquiry. Drag her card to move stages as your conversation progresses — one glance and you know where every lead stands.',
      },
      {
        src: '/screenshots/client_journey/lead_moved_to_proposal_sent.png',
        alt: 'Lead moved to proposal sent stage',
        label: 'Stage Move',
        slug: '/leads?view=kanban',
        story: 'After your discovery call goes well, move her to Proposal Sent. Set a follow-up date. ClearWork reminds you automatically — so no deal goes cold.',
      },
      {
        src: '/screenshots/client_journey/schedule_meeting_modal.png',
        alt: 'Schedule meeting modal',
        label: 'Schedule Call',
        slug: '/leads/priya-nair?action=schedule',
        story: 'Schedule a discovery call directly from the lead card. A Google Meet link is generated and sent. No Calendly subscription needed.',
      },
      {
        src: '/screenshots/client_journey/meeting_added_in_calender.png',
        alt: 'Meeting added to calendar',
        label: 'In Calendar',
        slug: '/calendar',
        story: 'The call lands in your ClearWork calendar alongside all your other project milestones and follow-ups. Everything in one place — no tab-switching.',
      },
    ],
  },
  {
    num: '02',
    tag: 'AI Proposal',
    tagColor: 'text-violet-600 bg-violet-50 border-violet-200',
    accentColor: '#7c3aed',
    defaultImg: 2,
    headline: 'Proposal drafted by AI.\nSent in 5 minutes.',
    imgs: [
      {
        src: '/screenshots/client_journey/convert_to_client_modal.png',
        alt: 'Convert lead to client',
        label: 'Convert to Client',
        slug: '/leads/priya-nair?action=convert',
        story: 'Priya said yes to a call. One click converts her from a lead to a contact record. Her name, email, and company carry over — no double-entry.',
      },
      {
        src: '/screenshots/client_journey/proposal_choose_template.png',
        alt: 'Choose proposal template',
        label: 'Choose Template',
        slug: '/proposals/new',
        story: 'Pick a proposal template that matches the engagement — web design, branding, consulting. Each template has the right sections pre-built for that kind of work.',
      },
      {
        src: '/screenshots/client_journey/proposal_draft_with_ai.png',
        alt: 'AI drafting proposal',
        label: 'AI Draft',
        slug: '/proposals/new?ai=true',
        story: 'Describe the project in plain English. AI writes the scope, pricing table, timeline milestones, payment terms, and T&Cs. A complete proposal from a one-line brief.',
      },
      {
        src: '/screenshots/client_journey/proposal_edit_page.png',
        alt: 'Edit proposal page',
        label: 'Edit & Polish',
        slug: '/proposals/samay-website/edit',
        story: 'Review every section — Cover, Scope, Pricing, Timeline, Terms, Credibility. Edit anything, add a case study, tweak the pricing. It\'s still your proposal.',
      },
      {
        src: '/screenshots/client_journey/proposal_send_to_client.png',
        alt: 'Send proposal to client',
        label: 'Send',
        slug: '/proposals/samay-website',
        story: 'Set a validity date, attach Priya\'s contact, and hit Send. She gets an email with a clean, branded proposal link — no PDF attachments, no confusing versioning.',
      },
      {
        src: '/screenshots/client_journey/proposal_send_to_client_with_otp.png',
        alt: 'Send with OTP verification',
        label: 'OTP Delivery',
        slug: '/proposals/samay-website?otp=true',
        story: 'Sensitive pricing? Gate the proposal with OTP verification. Only Priya can open it — she enters her phone number and gets a one-time code.',
      },
      {
        src: '/screenshots/client_journey/view_proposal_client_side.png',
        alt: 'Client viewing proposal',
        label: 'Client View',
        slug: '/p/8yt530cb',
        story: 'Priya opens your proposal on her phone. It renders beautifully on any device — your logo, brand colors, structured sections. She looks like you\'ve done this a hundred times.',
      },
      {
        src: '/screenshots/client_journey/proposal_view_client_side.png',
        alt: 'Proposal detail client side',
        label: 'Proposal Detail',
        slug: '/p/8yt530cb#pricing',
        story: 'She scrolls through the scope breakdown, the five-phase timeline, the GST pricing table. Everything she needs to say yes is right here — no follow-up calls required.',
      },
      {
        src: '/screenshots/client_journey/accept_proposal_client_side.png',
        alt: 'Client accepting proposal',
        label: 'Accepted',
        slug: '/p/8yt530cb?accepted=true',
        story: 'Priya clicks Accept. Your proposal flips to Accepted in real time. A contract draft auto-creates with all the details already filled in — the handoff is instant.',
      },
    ],
  },
  {
    num: '03',
    tag: 'E-Sign Contract',
    tagColor: 'text-purple-600 bg-purple-50 border-purple-200',
    accentColor: '#9333ea',
    defaultImg: 3,
    headline: 'Signed on her phone.\nNo app. No DocuSign.',
    imgs: [
      {
        src: '/screenshots/client_journey/draft_contract_from_proposal_acceptance.png',
        alt: 'Auto-created contract draft',
        label: 'Auto-Draft',
        slug: '/contracts',
        story: 'The moment Priya accepts, a contract draft appears in your Contracts tab. Scope, pricing, and payment schedule — all carried over from the proposal. No re-typing.',
      },
      {
        src: '/screenshots/client_journey/contract_edit_page.png',
        alt: 'Edit contract page',
        label: 'Edit Contract',
        slug: '/contracts/samay-website/edit',
        story: 'Add payment milestones, custom clauses, and signer details. ClearWork includes GST type, TDS rate, and legal boilerplate — ready to customise, not start from scratch.',
      },
      {
        src: '/screenshots/client_journey/contract_signing.png',
        alt: 'Contract signing page for client',
        label: 'Signing Page',
        slug: '/sign/cmt00ynek',
        story: 'Priya gets a link to the signing page. The full contract renders in her browser — no app download, no account creation, no DocuSign subscription on her end.',
      },
      {
        src: '/screenshots/client_journey/client_signing_off_with_otp.png',
        alt: 'Client signing with OTP',
        label: 'OTP Sign',
        slug: '/sign/cmt00ynek?otp=true',
        story: 'She enters her number, receives an OTP, and confirms. That\'s the signature. Legally valid under the IT Act 2000. Takes her 30 seconds.',
      },
      {
        src: '/screenshots/client_journey/contract_signed.png',
        alt: 'Contract signed confirmation',
        label: 'Signed',
        slug: '/contracts/samay-website?signed=true',
        story: 'Contract status flips to Signed. The audit trail captures the OTP, timestamp, and IP address. Your first invoice draft auto-creates immediately — the whole pipeline keeps moving.',
      },
    ],
  },
  {
    num: '04',
    tag: 'Project & Tasks',
    tagColor: 'text-sky-600 bg-sky-50 border-sky-200',
    accentColor: '#0284c7',
    defaultImg: 0,
    headline: 'Project live.\nEveryone knows what\'s next.',
    imgs: [
      {
        src: '/screenshots/client_journey/project_add_task.png',
        alt: 'Add task to project board',
        label: 'Task Board',
        slug: '/projects/samay-website/tasks',
        story: 'Build your task board with columns that match your workflow — To Do, In Progress, Review, Done. Add tasks for every deliverable: Wireframes, Homepage Design, Dev Handoff.',
      },
      {
        src: '/screenshots/client_journey/project_task_progress.png',
        alt: 'Task progress view',
        label: 'Track Progress',
        slug: '/projects/samay-website/tasks?view=board',
        story: 'Move cards across columns as work progresses. The board updates in real time. Priya can see project status from her portal — no status update email needed.',
      },
      {
        src: '/screenshots/client_journey/project_teams_tab.png',
        alt: 'Project team tab',
        label: 'Team',
        slug: '/projects/samay-website/team',
        story: 'Add collaborators to the project. Assign tasks, share access, and keep everyone aligned — whether it\'s a solo job or a three-person team.',
      },
      {
        src: '/screenshots/client_journey/project_updates_to_client.png',
        alt: 'Post project update to client',
        label: 'Post Update',
        slug: '/projects/samay-website/updates',
        story: '"Wireframes for Home + About are done. Please review by Friday." Post it as a project update. Priya sees it instantly in her portal — structured, timestamped, professional.',
      },
      {
        src: '/screenshots/client_journey/project_log_time.png',
        alt: 'Log time on project',
        label: 'Log Time',
        slug: '/projects/samay-website/time?log=true',
        story: 'Log hours directly against the project — task name, duration, date, and notes. Toggle whether to share your rate with the client. Full transparency on your terms.',
      },
      {
        src: '/screenshots/client_journey/project_time_&_expense_tab.png',
        alt: 'Time and expense tab',
        label: 'Time & Expenses',
        slug: '/projects/samay-website/time',
        story: 'Every logged hour and expense in one tab. Feeds directly into the project P&L. See at a glance what\'s been spent, what\'s billable, and how the budget is tracking.',
      },
      {
        src: '/screenshots/client_journey/project_add_expense.png',
        alt: 'Add expense to project',
        label: 'Add Expense',
        slug: '/projects/samay-website/time?add=expense',
        story: 'Stock photo license for ₹800. Log it against the project. Mark it as billable or internal. It rolls into the P&L overview automatically — no spreadsheet required.',
      },
    ],
  },
  {
    num: '05',
    tag: 'Client Portal',
    tagColor: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    accentColor: '#06b6d4',
    defaultImg: 2,
    headline: 'Priya\'s private portal.\nProfessional from day one.',
    imgs: [
      {
        src: '/screenshots/client_journey/client_overview_page.png',
        alt: 'Client page in the app',
        label: 'Client Record',
        slug: '/contacts/priya-nair',
        story: 'Your full view of Priya — every proposal, contract, invoice, project, and message in one place. See the full relationship history at a glance before any client call.',
      },
      {
        src: '/screenshots/client_journey/client_portal_overview.png',
        alt: 'Client portal home page',
        label: 'Portal Home',
        slug: '/portal/samay-innovation',
        story: 'Priya logs into her dedicated portal. Active projects, pending invoices, recent updates — all in one clean view. Her own dashboard for the work you\'re doing together.',
      },
      {
        src: '/screenshots/client_journey/client_portal_project_details.png',
        alt: 'Project detail in client portal',
        label: 'Project Detail',
        slug: '/portal/samay-innovation/projects/samay-website',
        story: 'She clicks into Samay Innovation — Website. All the documents you\'ve shared are here. The signed contract. The accepted proposal. The latest update. Everything in order.',
      },
      {
        src: '/screenshots/client_journey/client_portal_project_tab.png',
        alt: 'Portal project sub-tabs',
        label: 'Project Tabs',
        slug: '/portal/samay-innovation/projects/samay-website#docs',
        story: 'Sub-tabs show her Contracts, Proposals, Invoices, Time Logs, and Updates — but only for her project. She never sees your other clients, your pricing notes, or your internal tasks.',
      },
      {
        src: '/screenshots/client_journey/client_portal_change_request.png',
        alt: 'Client raising a change request',
        label: 'Change Request',
        slug: '/portal/samay-innovation/approvals?new=true',
        story: '"Can we add a Testimonials section to the homepage?" Priya raises it directly from her portal. Structured, in writing, tied to the project — not a WhatsApp message you\'ll forget.',
      },
      {
        src: '/screenshots/client_journey/client_portal_change_request_approval.png',
        alt: 'Change request approval flow',
        label: 'Approval Flow',
        slug: '/portal/samay-innovation/approvals',
        story: 'You review the request and respond: Approved, with a note — "Will add this as an additional ₹3,000 milestone." Both sides have a written record. Scope creep is documented.',
      },
      {
        src: '/screenshots/client_journey/project_change_request_acknowledge.png',
        alt: 'Acknowledge change request in app',
        label: 'Acknowledge',
        slug: '/projects/samay-website/changes',
        story: 'The change is acknowledged in your project view. Scope updated, milestone added, both parties aligned. No ambiguity, no invoice disputes six weeks later.',
      },
      {
        src: '/screenshots/client_journey/client_portal_message_from_freelancer.png',
        alt: 'Message from freelancer in portal',
        label: 'Message',
        slug: '/portal/samay-innovation/messages',
        story: '"File access has been shared via the drive link above." You send it from the app. Priya reads it in her portal. Contextual, searchable, attached to the right project.',
      },
      {
        src: '/screenshots/client_journey/message_to_client.png',
        alt: 'Freelancer replying to client',
        label: 'Reply',
        slug: '/inbox/priya-nair',
        story: 'Priya replies. Your inbox captures the full thread — structured messages, not a chaotic WhatsApp chain. Everything is logged, timestamped, and attached to the project.',
      },
      {
        src: '/screenshots/client_journey/client_portal_logged_time_for_project.png',
        alt: 'Time logs visible in client portal',
        label: 'Time Logs',
        slug: '/portal/samay-innovation/projects/samay-website#time',
        story: 'Priya can see how many hours have been logged on her project this week. No awkward "how long did that take?" conversation. Full transparency builds trust.',
      },
    ],
  },
  {
    num: '06',
    tag: 'GST Invoice',
    tagColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    accentColor: '#10b981',
    defaultImg: 3,
    headline: 'GST invoice, UPI link.\nShe pays. You\'re done.',
    imgs: [
      {
        src: '/screenshots/client_journey/invoice_draft.png',
        alt: 'GST invoice draft',
        label: 'Invoice Draft',
        slug: '/invoices/inv-0001/edit',
        story: 'The invoice draft is ready. Line items, HSN code, IGST at 18% for an inter-state project, and TDS at 10% under 194J — all pre-filled from the contract. Just review and send.',
      },
      {
        src: '/screenshots/client_journey/invoices_draft_after_contract_signed.png',
        alt: 'Invoice auto-created after contract signed',
        label: 'Auto-Created',
        slug: '/invoices',
        story: 'ClearWork auto-created this invoice the moment Priya signed the contract. The first milestone amount, GST type, and due date are already in place. You didn\'t have to build it.',
      },
      {
        src: '/screenshots/client_journey/client_portal_invoice_pending.png',
        alt: 'Invoice pending in client portal',
        label: 'Client Sees It',
        slug: '/portal/samay-innovation/invoices',
        story: 'Priya\'s portal shows the invoice immediately. Status: Pending. Amount due: ₹41,300. The UPI link and bank details are right there — no email follow-up needed.',
      },
      {
        src: '/screenshots/client_journey/client_portal_view_invoice.png',
        alt: 'Client viewing full GST invoice',
        label: 'Full Invoice',
        slug: '/invoice/inv-0001',
        story: 'She opens the invoice. GST breakup (₹6,300 IGST), TDS deduction (₹3,500), net payable (₹37,800) — clearly displayed. Professional enough for her accounts team to process immediately.',
      },
      {
        src: '/screenshots/client_journey/record_payment.png',
        alt: 'Record payment in app',
        label: 'Record Payment',
        slug: '/invoices/inv-0001?record=payment',
        story: 'Priya transfers the 50% advance. You record ₹20,650 received. Invoice status updates to Partial. Project overview refreshes — ₹20,650 in, ₹17,150 outstanding.',
      },
      {
        src: '/screenshots/client_journey/client_portal_invoices_paid.png',
        alt: 'Invoice marked paid in portal',
        label: 'Paid',
        slug: '/portal/samay-innovation/invoices?status=paid',
        story: 'Final payment received. Invoice status flips to Paid. Project P&L closes at ₹35,000 invoiced, ₹0 outstanding. A thank-you automation fires to Priya. The project is financially complete.',
      },
    ],
  },
  {
    num: '07',
    tag: 'Project Complete',
    tagColor: 'text-amber-600 bg-amber-50 border-amber-200',
    accentColor: '#f59e0b',
    defaultImg: 0,
    headline: '5-star review on\nyour public profile.',
    imgs: [
      {
        src: '/screenshots/client_journey/requesting_signoff_from_client.png',
        alt: 'Request project sign-off from client',
        label: 'Request Sign-off',
        slug: '/projects/samay-website/signoff',
        story: 'All invoices paid. You send Priya a formal sign-off request. She gets a notification in her portal — one click to close out the project officially. No more scope ambiguity.',
      },
      {
        src: '/screenshots/client_journey/client_portal_adding_review_for_project.png',
        alt: 'Client adding a review in portal',
        label: 'Client Review',
        slug: '/portal/samay-innovation/approvals?review=true',
        story: 'Priya approves the sign-off and leaves a review in the same flow: 5 stars. "Maharshi delivered exactly what we needed — on time, professional, and responsive." Took her two minutes.',
      },
      {
        src: '/screenshots/client_journey/review_visible_in_public_profile.png',
        alt: 'Review visible on public freelancer profile',
        label: 'Public Profile',
        slug: '/u/maharshi',
        story: 'Her review goes live on your public ClearWork profile. Every new enquiry — every Priya who finds you on Instagram tomorrow — sees real social proof before they even send a message.',
      },
    ],
  },
]

const phaseEase = [0.22, 1, 0.36, 1] as [number, number, number, number]
const storyEase = [0.4, 0, 0.2, 1] as [number, number, number, number]

/* ── Thumbnail strip ───────────────────────────────────────────────── */
function ThumbnailStrip({
  phase,
  phaseIdx,
  activeThumb,
  onSelect,
  compact = false,
}: {
  phase: Phase
  phaseIdx: number
  activeThumb: number
  onSelect: (phaseIdx: number, thumbIdx: number) => void
  compact?: boolean
}) {
  const thumbW = compact ? 'w-[72px] h-[46px]' : 'w-[88px] h-[56px]'

  return (
    <div
      className="flex gap-2.5 overflow-x-auto pb-1.5"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
    >
      {phase.imgs.map((img, i) => {
        const isActive = i === activeThumb
        return (
          <button
            key={i}
            type="button"
            aria-label={`View screenshot: ${img.label}`}
            onClick={() => onSelect(phaseIdx, i)}
            style={isActive ? { boxShadow: `0 0 0 2px ${phase.accentColor}` } : { boxShadow: '0 0 0 1px #e2e8f0' }}
            className={`flex-shrink-0 flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-200 focus:outline-none rounded-xl overflow-hidden ${
              isActive ? 'opacity-100 scale-105' : 'opacity-45 hover:opacity-70 hover:scale-[1.02]'
            }`}
          >
            <div className={`overflow-hidden ${thumbW}`}>
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover object-top block"
                loading="lazy"
              />
            </div>
          </button>
        )
      })}
    </div>
  )
}

/* ── Desktop sticky-scroll ─────────────────────────────────────────── */
function DesktopJourney() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [shotIdx, setShotIdx] = useState(0)

  // Total screenshots across all phases — each gets its own 100vh scroll step
  const totalShots = PHASES.reduce((sum, p) => sum + p.imgs.length, 0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const gIdx = Math.min(totalShots - 1, Math.floor(v * totalShots))
    let rem = gIdx
    for (let i = 0; i < PHASES.length; i++) {
      if (rem < PHASES[i].imgs.length) {
        setPhaseIdx(i)
        setShotIdx(rem)
        return
      }
      rem -= PHASES[i].imgs.length
    }
  })

  const scrollToPhase = (i: number) => {
    if (!sectionRef.current) return
    let startShot = 0
    for (let j = 0; j < i; j++) startShot += PHASES[j].imgs.length
    const scrollTop = window.scrollY + sectionRef.current.getBoundingClientRect().top
    window.scrollTo({ top: scrollTop + (startShot / totalShots) * sectionRef.current.offsetHeight + 10, behavior: 'smooth' })
  }

  const phase = PHASES[phaseIdx]
  const currentShot = phase.imgs[shotIdx]
  // Unique key across all 47 screenshots for animation
  const globalIdx = PHASES.slice(0, phaseIdx).reduce((sum, p) => sum + p.imgs.length, 0) + shotIdx

  return (
    <div ref={sectionRef} style={{ height: `${totalShots * 100}vh` }} className="relative">

      <div
        className="sticky top-[68px] flex items-center overflow-hidden"
        style={{
          height: 'calc(100vh - 68px)',
          backgroundColor: '#F4F6FB',
          backgroundImage: 'radial-gradient(circle, rgba(100,116,139,0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >

        {/* Per-phase ambient tint */}
        <AnimatePresence>
          <motion.div
            key={`tint-${phaseIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 50% 70% at 75% 50%, ${phase.accentColor}0d 0%, transparent 65%)` }}
          />
        </AnimatePresence>

        <div className="w-full h-full flex items-stretch">

          {/* Col 1: Timeline */}
          <div className="flex-shrink-0 w-[72px] flex flex-col items-center justify-center relative pl-8">
            <div className="absolute left-[42px] top-[22%] bottom-[22%] w-px bg-slate-200" />
            <div className="flex flex-col relative z-10">
              {PHASES.map((p, i) => {
                const isActive = i === phaseIdx
                const isPast = i < phaseIdx
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Phase ${p.num}: ${p.tag}`}
                    onClick={() => scrollToPhase(i)}
                    className="flex items-center gap-2 py-[10px] cursor-pointer focus:outline-none"
                  >
                    <motion.div
                      className="w-[9px] h-[9px] rounded-full flex-shrink-0"
                      animate={{
                        backgroundColor: isActive ? p.accentColor : isPast ? '#94a3b8' : 'transparent',
                        scale: isActive ? 1.4 : 1,
                        boxShadow: isActive ? `0 0 0 3px ${p.accentColor}22` : '0 0 0 0px transparent',
                      }}
                      style={{ border: isActive || isPast ? 'none' : '1.5px solid #cbd5e1' }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className="text-[9px] font-mono font-bold tracking-widest whitespace-nowrap"
                      animate={{ color: isActive ? p.accentColor : '#94a3b8', opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {p.num}
                    </motion.span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Col 2: Story panel */}
          <div className="flex-shrink-0 w-[280px] flex flex-col justify-center pr-8">

            {/* Phase tag + headline — animates on phase change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`header-${phaseIdx}`}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.38, ease: phaseEase }}
                className="mb-5"
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.18em] block mb-3"
                  style={{ color: phase.accentColor }}
                >
                  {phase.tag}
                </span>
                <h3 className="text-[1.8rem] font-black text-slate-900 leading-[1.1] tracking-tight whitespace-pre-line">
                  {phase.headline}
                </h3>
              </motion.div>
            </AnimatePresence>

            {/* Per-screenshot story — animates on every scroll step */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`story-${globalIdx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -7 }}
                transition={{ duration: 0.22, ease: storyEase }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: phase.accentColor }} />
                  <span className="text-[12px] font-semibold text-slate-600">{currentShot.label}</span>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">{currentShot.story}</p>
              </motion.div>
            </AnimatePresence>

            {/* Phase progress bar + counter */}
            <div className="flex items-center gap-2.5 mt-6">
              <div className="flex-1 h-px bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: phase.accentColor }}
                  animate={{ width: `${((shotIdx + 1) / phase.imgs.length) * 100}%` }}
                  transition={{ duration: 0.35, ease: storyEase }}
                />
              </div>
              <span className="text-[11px] font-mono text-slate-400 tabular-nums flex-shrink-0">
                {shotIdx + 1}/{phase.imgs.length}
              </span>
            </div>

            {/* Scroll indicator */}
            <div className="flex items-center gap-1.5 mt-5 text-slate-400">
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                className="w-px h-4 bg-gradient-to-b from-slate-300 to-transparent"
              />
              <span className="text-[10px] tracking-[0.18em] uppercase">Scroll</span>
            </div>

            {/* CTA — last screenshot of last phase */}
            <AnimatePresence>
              {phaseIdx === PHASES.length - 1 && shotIdx === phase.imgs.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: phaseEase, delay: 0.25 }}
                  className="mt-7"
                >
                  <Link
                    to="https://app.getclearwork.in/signup"
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold text-[13px] px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                  >
                    Start free trial
                    <ArrowRight size={13} />
                  </Link>
                  <p className="mt-2 text-[11px] text-slate-400">No credit card · 15-day Pro trial</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Col 3: Contained browser — Clienter-style with visible background padding */}
          <div className="flex-1 min-w-0 flex flex-col justify-center py-8 pr-10">
            {/* Outer glow ring — animates with phase accent */}
            <div
              className="rounded-[20px] p-px"
              style={{
                background: `linear-gradient(135deg, ${phase.accentColor}30 0%, transparent 60%)`,
                transition: 'background 0.8s ease',
              }}
            >
            <div
              className="bg-white rounded-[19px] overflow-hidden flex flex-col"
              style={{
                height: 'calc(100vh - 162px)',
                transition: 'box-shadow 0.9s ease',
                boxShadow: `
                  0 0 0 1px rgba(0,0,0,0.04),
                  0 2px 4px rgba(0,0,0,0.04),
                  0 8px 20px rgba(0,0,0,0.07),
                  0 24px 48px rgba(0,0,0,0.10),
                  0 48px 96px -16px ${phase.accentColor}30,
                  inset 0 1px 0 rgba(255,255,255,0.9)
                `,
              }}
            >
              {/* Chrome bar */}
              <div className="flex-shrink-0 bg-[#1e2433] px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />

                <div className="flex-1 mx-3 bg-white/8 rounded-md h-6 flex items-center px-3 gap-2 overflow-hidden border border-white/6">
                  <svg className="w-2.5 h-2.5 flex-shrink-0 opacity-35" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1a7 7 0 100 14A7 7 0 008 1z" stroke="white" strokeWidth="1.2"/>
                    <path d="M5.5 8c0-1.5.5-3 2.5-5 2 2 2.5 3.5 2.5 5s-.5 3-2.5 5c-2-2-2.5-3.5-2.5-5z" stroke="white" strokeWidth="1.2"/>
                    <path d="M1 8h14" stroke="white" strokeWidth="1.2"/>
                  </svg>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`url-${globalIdx}`}
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="text-[10px] text-white/55 font-mono truncate"
                    >
                      app.getclearwork.in{currentShot.slug}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={`badge-${phaseIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.75 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`text-[9px] font-semibold border px-2 py-0.5 rounded-md flex-shrink-0 ${phase.tagColor}`}
                  >
                    {phase.tag}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Screenshot — fills remaining height */}
              <div className="flex-1 overflow-hidden bg-slate-50 relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`img-${globalIdx}`}
                    src={currentShot.src}
                    alt={currentShot.alt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="w-full h-full object-cover object-top absolute inset-0"
                    loading="lazy"
                  />
                </AnimatePresence>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Initial scroll hint */}
        <AnimatePresence>
          {phaseIdx === 0 && shotIdx === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none"
            >
              <div className="flex flex-col items-center gap-1.5 text-slate-400">
                <span className="text-[9px] font-semibold tracking-[0.2em] uppercase">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  className="w-px h-5 bg-gradient-to-b from-slate-300 to-transparent"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Mobile step list ──────────────────────────────────────────────── */
function MobileJourney() {
  const [activeThumbs, setActiveThumbs] = useState(() => PHASES.map(p => p.defaultImg))

  const handleThumbSelect = (phaseIdx: number, thumbIdx: number) => {
    setActiveThumbs(prev => {
      const next = [...prev]
      next[phaseIdx] = thumbIdx
      return next
    })
  }

  return (
    <div className="bg-[#F4F6FB] px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">
          How it works
        </p>
        <p className="text-sm text-slate-500 mt-1">A complete client journey — from lead to 5-star review</p>
      </div>

      <div className="space-y-0">
        {PHASES.map((p, i) => {
          const thumbIdx = activeThumbs[i]
          const currentShot = p.imgs[thumbIdx]
          return (
            <div key={i} className="relative flex gap-3">
              {/* Timeline connector */}
              <div className="flex flex-col items-center">
                <div
                  className="w-7 h-7 rounded-full bg-white border-2 shadow-sm flex items-center justify-center shrink-0 mt-0.5 z-10"
                  style={{ borderColor: p.accentColor }}
                >
                  <span className="text-[9px] font-bold font-mono" style={{ color: p.accentColor }}>{p.num}</span>
                </div>
                {i < PHASES.length - 1 && (
                  <div className="w-px flex-1 bg-gradient-to-b from-slate-200 to-slate-100 my-1" style={{ minHeight: 40 }} />
                )}
              </div>

              <div className="pb-10 flex-1 min-w-0">
                <span className={`text-[10px] font-semibold border px-2 py-0.5 rounded-full mb-2.5 inline-block ${p.tagColor}`}>
                  {p.tag}
                </span>
                <h3 className="text-[1.3rem] font-black text-slate-900 leading-tight mb-3 whitespace-pre-line">
                  {p.headline}
                </h3>

                {/* Per-screenshot story */}
                <div className="mb-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.accentColor }} />
                    <span className="text-[11px] font-semibold text-slate-700">{currentShot.label}</span>
                    <span className="text-[10px] text-slate-400 font-mono ml-auto">{thumbIdx + 1}/{p.imgs.length}</span>
                  </div>
                  <p className="text-[13px] text-slate-600 leading-relaxed">{currentShot.story}</p>
                </div>

                {/* Screenshot card */}
                <div className="mb-3 bg-white rounded-xl shadow-md shadow-slate-200/60 border border-slate-100 overflow-hidden">
                  <div className="bg-[#1e2433] px-3 py-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                    <div className="flex-1 mx-2 bg-white/10 rounded h-4 flex items-center px-2 overflow-hidden">
                      <span className="text-[9px] text-white/60 font-mono truncate">app.getclearwork.in{currentShot.slug}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50">
                    <img
                      src={currentShot.src}
                      alt={currentShot.alt}
                      className="w-full block"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Thumbnail strip */}
                <ThumbnailStrip
                  phase={p}
                  phaseIdx={i}
                  activeThumb={thumbIdx}
                  onSelect={handleThumbSelect}
                  compact
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 text-center">
        <Link
          to="https://app.getclearwork.in/signup"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
        >
          Start your free trial <ArrowRight size={14} />
        </Link>
        <p className="mt-3 text-xs text-slate-500">No credit card · Free 15-day Pro trial</p>
      </div>
    </div>
  )
}

/* ── Export ────────────────────────────────────────────────────────── */
export default function ClientJourneySection() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopJourney />
      </div>
      <div className="lg:hidden">
        <MobileJourney />
      </div>
    </>
  )
}
