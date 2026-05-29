import jsPDF from 'jspdf'
import { fmtINR } from './gst'

const PAGE_W = 210
const PAGE_H = 297
const M      = 20
const TW     = PAGE_W - 2 * M // text width

export type IpTransfer     = 'full_payment' | 'upfront' | 'work_for_hire'
export type ScheduleType   = '50_50' | '30_40_30' | 'on_completion' | 'custom'

export interface Milestone   { id: string; description: string; percent: number; dueDate: string }
export interface Deliverable { id: string; text: string }

export interface ContractInput {
  agreementDate:      string
  // Freelancer
  freelancerName:     string
  freelancerAddress:  string
  freelancerGstin:    string
  freelancerEmail:    string
  freelancerPhone:    string
  // Client
  clientName:         string
  clientCompany:      string
  clientAddress:      string
  clientGstin:        string
  clientEmail:        string
  // Project
  projectTitle:       string
  serviceDescription: string
  deliverables:       Deliverable[]
  startDate:          string
  endDate:            string
  // Payment
  totalAmount:        string
  scheduleType:       ScheduleType
  customMilestones:   Milestone[]
  lateFeePercent:     number
  paymentDueDays:     number
  // Terms
  revisionsIncluded:  number
  ipTransfer:         IpTransfer
  confidentiality:    boolean
  terminationDays:    number
  governingState:     string
}

// ── DocWriter helper ──────────────────────────────────────────────────────────

class DocWriter {
  doc:      jsPDF
  y:        number
  page:     number
  constructor() {
    this.doc  = new jsPDF({ unit: 'mm', format: 'a4' })
    this.y    = M
    this.page = 1
  }

  private addPage() {
    this.doc.addPage()
    this.page++
    this.y = M + 6
  }

  private ensureSpace(needed: number) {
    if (this.y + needed > PAGE_H - M) this.addPage()
  }

  // Decorative header on page 1
  docHeader(title: string, subtitle: string) {
    const doc = this.doc
    doc.setFillColor('#101828')
    doc.rect(0, 0, PAGE_W, 28, 'F')
    doc.setFont('helvetica', 'bold').setFontSize(14).setTextColor('#FFFFFF')
    doc.text(title, PAGE_W / 2, 12, { align: 'center' })
    doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor('rgba(255,255,255,0.7)')
    doc.text(subtitle, PAGE_W / 2, 19, { align: 'center' })
    this.y = 36
  }

  private pageFooter() {
    const doc = this.doc
    const totalPages = this.page
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p)
      doc.setFont('helvetica', 'normal').setFontSize(7.5).setTextColor('#98A2B3')
      doc.text(`Page ${p} of ${totalPages}`, PAGE_W / 2, PAGE_H - 8, { align: 'center' })
      doc.text('Generated free with Rupway — rupway.in/tools/freelance-contract-generator', PAGE_W / 2, PAGE_H - 4, { align: 'center' })
    }
  }

  sectionHeading(num: string, text: string) {
    this.ensureSpace(14)
    const doc = this.doc
    doc.setFont('helvetica', 'bold').setFontSize(9).setTextColor('#101828')
    doc.text(`${num}.  ${text.toUpperCase()}`, M, this.y)
    this.y += 6
  }

  body(text: string, indent = 0) {
    const doc = this.doc
    doc.setFont('helvetica', 'normal').setFontSize(9.5).setTextColor('#344054')
    const lines = doc.splitTextToSize(text, TW - indent)
    this.ensureSpace(lines.length * 4.8)
    doc.text(lines, M + indent, this.y)
    this.y += lines.length * 4.8 + 1
  }

  bullet(text: string) {
    const doc = this.doc
    const INDENT = 8
    doc.setFont('helvetica', 'normal').setFontSize(9.5).setTextColor('#344054')
    doc.text('•', M + 3, this.y)
    const lines = doc.splitTextToSize(text, TW - INDENT)
    this.ensureSpace(lines.length * 4.8)
    doc.text(lines, M + INDENT, this.y)
    this.y += lines.length * 4.8 + 1
  }

  labelValue(label: string, value: string) {
    const doc = this.doc
    this.ensureSpace(6)
    doc.setFont('helvetica', 'bold').setFontSize(9).setTextColor('#667085')
    doc.text(label + ':', M, this.y)
    doc.setFont('helvetica', 'normal').setTextColor('#344054')
    doc.text(value || '—', M + 45, this.y)
    this.y += 5
  }

  gap(n = 4) { this.y += n }

  divider() {
    this.ensureSpace(6)
    this.doc.setDrawColor('#EAECF0').setLineWidth(0.25).line(M, this.y, PAGE_W - M, this.y)
    this.y += 5
  }

  signatureBlock(leftName: string, rightName: string) {
    this.ensureSpace(44)
    const doc = this.doc
    this.gap(4)

    const lx = M
    const rx = PAGE_W / 2 + 4

    doc.setDrawColor('#344054').setLineWidth(0.3)
    doc.line(lx, this.y + 14, lx + 70, this.y + 14)
    doc.line(rx, this.y + 14, rx + 70, this.y + 14)

    doc.setFont('helvetica', 'bold').setFontSize(8.5).setTextColor('#101828')
    doc.text('SERVICE PROVIDER', lx, this.y + 20)
    doc.text('CLIENT', rx, this.y + 20)

    doc.setFont('helvetica', 'normal').setFontSize(8.5).setTextColor('#667085')
    doc.text(leftName || '________________________', lx, this.y + 26)
    doc.text(rightName || '________________________', rx, this.y + 26)

    doc.text('Signature', lx, this.y + 32)
    doc.text('Signature', rx, this.y + 32)

    doc.text('Date: ___________________', lx, this.y + 38)
    doc.text('Date: ___________________', rx, this.y + 38)
  }

  finalise(filename: string) {
    this.pageFooter()
    this.doc.save(filename)
  }
}

// ── Payment schedule ──────────────────────────────────────────────────────────

function buildMilestones(input: ContractInput): { description: string; percent: number; amount: number }[] {
  const total = Number(input.totalAmount) || 0
  switch (input.scheduleType) {
    case '50_50':
      return [
        { description: 'On signing this Agreement',   percent: 50, amount: total * 0.5 },
        { description: 'On final delivery',            percent: 50, amount: total * 0.5 },
      ]
    case '30_40_30':
      return [
        { description: 'On signing this Agreement',   percent: 30, amount: total * 0.3 },
        { description: 'On approval of first draft',  percent: 40, amount: total * 0.4 },
        { description: 'On final delivery',           percent: 30, amount: total * 0.3 },
      ]
    case 'on_completion':
      return [
        { description: 'On final delivery',           percent: 100, amount: total },
      ]
    case 'custom':
      return input.customMilestones.map(m => ({
        description: m.description,
        percent:     m.percent,
        amount:      total * (m.percent / 100),
      }))
  }
}

function ipTransferText(t: IpTransfer): string {
  if (t === 'full_payment')   return 'upon receipt of full payment as per this Agreement'
  if (t === 'upfront')        return 'upon receipt of the upfront payment'
  return 'from the date of this Agreement (work-for-hire arrangement)'
}

// ── Main export ───────────────────────────────────────────────────────────────

export function generateContractPdf(input: ContractInput) {
  const w      = new DocWriter()
  const total  = Number(input.totalAmount) || 0
  const milestones = buildMilestones(input)
  const clientDisplay = input.clientCompany
    ? `${input.clientName} (${input.clientCompany})`
    : input.clientName

  // ── Page 1 header ──────────────────────────────────────────────────────────
  w.docHeader(
    'FREELANCE SERVICE AGREEMENT',
    `Effective Date: ${input.agreementDate || '___________'}`,
  )

  // Parties preamble
  w.body(
    `This Freelance Service Agreement ("Agreement") is entered into as of ${input.agreementDate || '___________'} ` +
    `between ${input.freelancerName || '[Service Provider Name]'} ("Service Provider") and ` +
    `${clientDisplay || '[Client Name]'} ("Client").`,
  )
  w.gap()

  // ── 1. PARTIES ─────────────────────────────────────────────────────────────
  w.sectionHeading('1', 'Parties')
  w.body('Service Provider:')
  w.labelValue('Name',    input.freelancerName)
  w.labelValue('Address', input.freelancerAddress)
  if (input.freelancerGstin) w.labelValue('GSTIN', input.freelancerGstin)
  w.labelValue('Email',   input.freelancerEmail)
  if (input.freelancerPhone) w.labelValue('Phone', input.freelancerPhone)
  w.gap(3)
  w.body('Client:')
  w.labelValue('Name',    input.clientName)
  if (input.clientCompany) w.labelValue('Company', input.clientCompany)
  w.labelValue('Address', input.clientAddress)
  if (input.clientGstin)  w.labelValue('GSTIN',   input.clientGstin)
  w.labelValue('Email',   input.clientEmail)
  w.gap()

  // ── 2. SERVICES ────────────────────────────────────────────────────────────
  w.sectionHeading('2', 'Services')
  w.body(
    `The Service Provider agrees to provide the following services to the Client ` +
    `("Project"): ${input.projectTitle || '[Project Title]'}.`,
  )
  if (input.serviceDescription) {
    w.gap(2)
    w.body(input.serviceDescription)
  }
  w.gap()

  // ── 3. DELIVERABLES ────────────────────────────────────────────────────────
  w.sectionHeading('3', 'Deliverables')
  w.body('The Service Provider shall deliver the following to the Client:')
  w.gap(2)
  const delivs = input.deliverables.filter(d => d.text.trim())
  if (delivs.length > 0) {
    delivs.forEach(d => w.bullet(d.text))
  } else {
    w.bullet('As agreed between the parties.')
  }
  w.gap()

  // ── 4. TIMELINE ────────────────────────────────────────────────────────────
  w.sectionHeading('4', 'Project Timeline')
  w.body(
    `Project Start Date: ${input.startDate || 'To be agreed'}. ` +
    `Estimated Completion Date: ${input.endDate || 'To be agreed'}.`,
  )
  w.gap(2)
  w.body(
    'Timelines are estimates and may be adjusted by mutual written agreement. ' +
    'Delays caused by the Client (including delayed feedback, approvals, or content delivery) ' +
    'shall not constitute a breach by the Service Provider and shall extend the deadline accordingly.',
  )
  w.gap()

  // ── 5. PAYMENT ─────────────────────────────────────────────────────────────
  w.sectionHeading('5', 'Payment')
  w.body(`Total Contract Value: INR ${fmtINR(total)} (exclusive of applicable GST).`)
  w.gap(2)
  w.body('Payment Schedule:')
  w.gap(2)
  milestones.forEach((m, i) => {
    w.bullet(`Milestone ${i + 1}: ${m.description} — INR ${fmtINR(m.amount)} (${m.percent}%)`)
  })
  w.gap(2)
  w.body(
    `All invoices are payable within ${input.paymentDueDays} days of issuance. ` +
    `Overdue amounts shall attract a late fee of ${input.lateFeePercent}% per month (or part thereof). ` +
    `GST shall be charged at the applicable rate on all invoices. The Client shall deduct TDS as required ` +
    `under the Income Tax Act, 1961, and shall promptly provide Form 16A to the Service Provider.`,
  )
  w.gap(2)
  w.body(
    'Payments may be made by bank transfer (NEFT/RTGS/IMPS), UPI, or Razorpay payment link. ' +
    'Communication via WhatsApp or email constitutes valid official communication for payment-related matters.',
  )
  w.gap()

  // ── 6. REVISIONS ──────────────────────────────────────────────────────────
  w.sectionHeading('6', 'Revisions')
  w.body(
    `This Agreement includes ${input.revisionsIncluded} round(s) of revisions. ` +
    'A single revision round is defined as one consolidated set of feedback submitted at one time. ' +
    'Additional revision rounds beyond the included rounds shall be billed at the Service Provider\'s ' +
    'standard hourly rate, with a quote provided in advance. ' +
    'Requests that materially change the original scope are not considered revisions and will be quoted separately.',
  )
  w.gap()

  // ── 7. INTELLECTUAL PROPERTY ───────────────────────────────────────────────
  w.sectionHeading('7', 'Intellectual Property')
  w.body(
    `Upon ${ipTransferText(input.ipTransfer)}, ` +
    'all intellectual property rights in the final deliverables shall transfer to and vest in the Client. ' +
    'Until such payment is received in full, all IP rights remain with the Service Provider. ' +
    'The Service Provider retains the right to display the work in their portfolio unless otherwise agreed in writing.',
  )
  w.gap(2)
  w.body(
    'The Service Provider warrants that all work delivered is original and does not infringe any third-party ' +
    'intellectual property rights. The Client warrants that all content, materials, or assets provided to ' +
    'the Service Provider are licensed or owned by the Client.',
  )
  w.gap()

  // ── 8. CONFIDENTIALITY ─────────────────────────────────────────────────────
  if (input.confidentiality) {
    w.sectionHeading('8', 'Confidentiality')
    w.body(
      'Each party agrees to keep confidential all non-public information of the other party disclosed ' +
      'in connection with this Agreement ("Confidential Information"), and to not disclose such information ' +
      'to any third party without prior written consent. ' +
      'This obligation survives for a period of two (2) years from the date of this Agreement.',
    )
    w.gap(2)
    w.body(
      'Confidential Information does not include information that: (a) is or becomes publicly available ' +
      'without breach of this Agreement; (b) was known to the receiving party before disclosure; ' +
      'or (c) is required to be disclosed by law or court order.',
    )
    w.gap()
  }

  const clauseOffset = input.confidentiality ? 1 : 0

  // ── 9/8. TERMINATION ───────────────────────────────────────────────────────
  w.sectionHeading(String(8 + clauseOffset), 'Termination')
  w.body(
    `Either party may terminate this Agreement by providing ${input.terminationDays} days' written notice ` +
    'to the other party. Upon termination:',
  )
  w.gap(2)
  w.bullet('The Client shall pay for all work completed and approved up to the date of termination, pro-rated based on milestones achieved.')
  w.bullet('The Service Provider shall deliver all completed work-in-progress to the Client within 5 business days.')
  w.bullet('If the Client terminates without cause after the Service Provider has commenced work, the upfront deposit / first milestone payment shall be non-refundable.')
  w.gap()

  // ── 10/9. WARRANTIES ───────────────────────────────────────────────────────
  w.sectionHeading(String(9 + clauseOffset), 'Representations and Warranties')
  w.body('Each party represents and warrants that:')
  w.gap(2)
  w.bullet('It has full legal authority to enter into this Agreement.')
  w.bullet('It will comply with all applicable laws and regulations in performing its obligations.')
  w.bullet('The Service Provider warrants that deliverables will substantially conform to the agreed specifications for thirty (30) days after final delivery.')
  w.gap()

  // ── 11/10. LIABILITY ───────────────────────────────────────────────────────
  w.sectionHeading(String(10 + clauseOffset), 'Limitation of Liability')
  w.body(
    `Neither party shall be liable for any indirect, incidental, consequential, or punitive damages ` +
    'arising out of or related to this Agreement. The Service Provider\'s total aggregate liability ' +
    `for any claims arising under this Agreement shall not exceed the total fees paid under this Agreement (INR ${fmtINR(total)}).`,
  )
  w.gap()

  // ── 12/11. GENERAL ─────────────────────────────────────────────────────────
  w.sectionHeading(String(11 + clauseOffset), 'General Provisions')
  w.body(
    `Governing Law: This Agreement shall be governed by and construed in accordance with the laws of India. ` +
    `Any disputes shall be subject to the exclusive jurisdiction of the courts located in ` +
    `${input.governingState || '[City, State]'}.`,
  )
  w.gap(2)
  w.body(
    'Entire Agreement: This Agreement constitutes the entire agreement between the parties and supersedes ' +
    'all prior discussions, representations, or agreements, whether oral or written.',
  )
  w.gap(2)
  w.body(
    'Amendments: Any modification to this Agreement must be in writing and signed by both parties. ' +
    'Mutual agreement expressed via email or WhatsApp between the named parties herein shall constitute valid written consent.',
  )
  w.gap(2)
  w.body(
    'Force Majeure: Neither party shall be in breach of this Agreement for any delay or failure to ' +
    'perform caused by circumstances beyond their reasonable control (including natural disasters, ' +
    'government restrictions, or health emergencies), provided they notify the other party promptly.',
  )
  w.gap(2)
  w.body(
    'Severability: If any provision of this Agreement is found to be unenforceable, the remaining ' +
    'provisions shall continue in full force and effect.',
  )
  w.gap()

  // ── SIGNATURES ─────────────────────────────────────────────────────────────
  w.divider()
  w.body('By signing below, both parties agree to the terms of this Agreement.')
  w.signatureBlock(input.freelancerName, clientDisplay)

  const filename = `Contract-${(input.projectTitle || 'project').replace(/[^a-z0-9\s]/gi, '').trim().replace(/\s+/g, '-')}.pdf`
  w.finalise(filename)
}
