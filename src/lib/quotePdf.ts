import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { fmtINR, inWords } from './gst'

const PAGE_W = 210
const M = 14

export interface QuoteItem {
  description: string
  quantity:    string
  rate:        string
}

export interface QuoteInput {
  quoteNumber:    string
  quoteDate:      string
  validDays:      number
  // From
  fromName:       string
  fromAddress:    string
  fromGstin:      string
  fromEmail:      string
  fromPhone:      string
  // To
  toName:         string
  toCompany:      string
  toAddress:      string
  toEmail:        string
  // Items
  items:          QuoteItem[]
  gstRate:        number
  applyGst:       boolean
  // Footer
  notes:          string
  terms:          string
}

export interface QuoteTotals {
  subtotal:  number
  gstAmount: number
  total:     number
}

export function calcQuoteTotals(input: Pick<QuoteInput, 'items' | 'gstRate' | 'applyGst'>): QuoteTotals {
  const subtotal = input.items.reduce((sum, it) => {
    return sum + (Number(it.quantity) || 0) * (Number(it.rate) || 0)
  }, 0)
  const gstAmount = input.applyGst ? subtotal * (input.gstRate / 100) : 0
  return { subtotal, gstAmount, total: subtotal + gstAmount }
}

export function generateQuotePdf(input: QuoteInput) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const totals = calcQuoteTotals(input)

  let y = M

  // ── Dark header band ───────────────────────────────────────────────────────
  doc.setFillColor('#101828')
  doc.rect(0, 0, PAGE_W, 26, 'F')
  doc.setFont('helvetica', 'bold').setFontSize(16).setTextColor('#FFFFFF')
  doc.text('QUOTATION', M, 12)
  doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor('rgba(255,255,255,0.6)')
  if (input.quoteNumber) doc.text(`#${input.quoteNumber}`, M, 19)
  doc.text(`Date: ${input.quoteDate || '—'}`, PAGE_W - M, 12, { align: 'right' })
  if (input.validDays > 0) {
    doc.text(`Valid for ${input.validDays} days`, PAGE_W - M, 19, { align: 'right' })
  }
  y = 34

  // ── From / To ──────────────────────────────────────────────────────────────
  const colW = (PAGE_W - 2 * M - 6) / 2
  const lx = M
  const rx = M + colW + 6

  doc.setFont('helvetica', 'bold').setFontSize(7.5).setTextColor('#98A2B3')
  doc.text('FROM', lx, y)
  doc.text('PREPARED FOR', rx, y)
  y += 5

  doc.setFont('helvetica', 'bold').setFontSize(11).setTextColor('#101828')
  doc.text(input.fromName || '—', lx, y)
  const toDisplay = input.toCompany || input.toName || '—'
  doc.text(toDisplay, rx, y)
  y += 5

  doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor('#475467')
  const fromLines: string[] = []
  if (input.fromAddress) fromLines.push(input.fromAddress)
  if (input.fromGstin)   fromLines.push(`GSTIN: ${input.fromGstin}`)
  if (input.fromEmail)   fromLines.push(input.fromEmail)
  if (input.fromPhone)   fromLines.push(input.fromPhone)

  const toLines: string[] = []
  if (input.toCompany && input.toName) toLines.push(input.toName)
  if (input.toAddress) toLines.push(input.toAddress)
  if (input.toEmail)   toLines.push(input.toEmail)

  const maxRows = Math.max(fromLines.length, toLines.length)
  for (let i = 0; i < maxRows; i++) {
    if (fromLines[i]) doc.text(fromLines[i], lx, y)
    if (toLines[i])   doc.text(toLines[i],   rx, y)
    y += 4.5
  }

  y += 6

  // ── Line items table ───────────────────────────────────────────────────────
  const rows = input.items
    .filter(it => it.description.trim())
    .map((it, i) => {
      const qty = Number(it.quantity) || 0
      const rate = Number(it.rate) || 0
      return [String(i + 1), it.description, qty > 0 ? String(qty) : '—', rate > 0 ? fmtINR(rate) : '—', fmtINR(qty * rate)]
    })

  autoTable(doc, {
    startY: y,
    head: [['#', 'Description / Service', 'Qty', 'Rate (₹)', 'Amount (₹)']],
    body: rows.length ? rows : [['1', '—', '—', '—', '—']],
    margin: { left: M, right: M },
    styles: { fontSize: 9, cellPadding: 3, textColor: '#344054' },
    headStyles: { fillColor: '#F9FAFB', textColor: '#667085', fontStyle: 'bold', fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      2: { cellWidth: 18, halign: 'center' },
      3: { cellWidth: 30, halign: 'right' },
      4: { cellWidth: 32, halign: 'right' },
    },
    alternateRowStyles: { fillColor: '#FAFAFA' },
    tableLineColor: '#EAECF0',
    tableLineWidth: 0.2,
  })

  y = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 6

  // ── Totals block ───────────────────────────────────────────────────────────
  const totX = PAGE_W - M - 70
  const valX = PAGE_W - M

  function totRow(label: string, value: string, bold = false) {
    doc.setFont('helvetica', bold ? 'bold' : 'normal')
       .setFontSize(bold ? 10 : 9)
       .setTextColor(bold ? '#101828' : '#667085')
    doc.text(label, totX, y)
    doc.text(value, valX, y, { align: 'right' })
    y += bold ? 6 : 5
  }

  totRow('Subtotal', `₹ ${fmtINR(totals.subtotal)}`)
  if (input.applyGst && input.gstRate > 0) {
    totRow(`GST @ ${input.gstRate}%`, `₹ ${fmtINR(totals.gstAmount)}`)
  }

  doc.setDrawColor('#EAECF0').setLineWidth(0.2).line(totX, y - 1, valX, y - 1)
  y += 2
  totRow('TOTAL', `₹ ${fmtINR(totals.total)}`, true)

  y += 2
  doc.setFont('helvetica', 'italic').setFontSize(8.5).setTextColor('#98A2B3')
  doc.text(`Amount in words: ${inWords(Math.round(totals.total))} Rupees Only`, M, y)
  y += 8

  // ── Notes ──────────────────────────────────────────────────────────────────
  if (input.notes.trim()) {
    doc.setFont('helvetica', 'bold').setFontSize(8.5).setTextColor('#344054')
    doc.text('Notes', M, y)
    y += 4
    doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor('#475467')
    const noteLines = doc.splitTextToSize(input.notes, PAGE_W - 2 * M)
    doc.text(noteLines, M, y)
    y += noteLines.length * 4.8 + 4
  }

  // ── Terms ──────────────────────────────────────────────────────────────────
  if (input.terms.trim()) {
    doc.setFont('helvetica', 'bold').setFontSize(8.5).setTextColor('#344054')
    doc.text('Terms & Conditions', M, y)
    y += 4
    doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor('#475467')
    const termLines = doc.splitTextToSize(input.terms, PAGE_W - 2 * M)
    doc.text(termLines, M, y)
  }

  // ── Footer ─────────────────────────────────────────────────────────────────
  const totalPages = doc.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    doc.setFont('helvetica', 'normal').setFontSize(7.5).setTextColor('#98A2B3')
    doc.text(`Page ${p} of ${totalPages}`, PAGE_W / 2, 292, { align: 'center' })
    doc.text('Generated free with ClearWork — getclearwork.in/tools/quote-generator', PAGE_W / 2, 296, { align: 'center' })
  }

  const filename = `Quote-${input.quoteNumber || 'draft'}.pdf`
  doc.save(filename)
}
