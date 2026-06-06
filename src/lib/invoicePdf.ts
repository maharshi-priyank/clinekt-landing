import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {
  calcLineTotal, calcTotals, findStateName, fmtINR, inWords,
  type InvoiceInput,
} from './gst'

const PAGE_W = 210 // A4 mm
const M = 14      // outer margin

export function generateInvoicePdf(input: InvoiceInput) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const totals = calcTotals(input)

  let y = M

  // ── Header ────────────────────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold').setFontSize(22).setTextColor('#101828')
  doc.text('TAX INVOICE', M, y)
  y += 7

  doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor('#667085')
  doc.text(`Invoice ${input.invoiceNumber || '—'}`, M, y)
  doc.text(`Date: ${input.invoiceDate || '—'}`, PAGE_W - M, y, { align: 'right' })
  y += 4
  if (input.dueDate) {
    doc.text(`Due: ${input.dueDate}`, PAGE_W - M, y, { align: 'right' })
    y += 4
  }

  y += 4
  doc.setDrawColor('#EAECF0').setLineWidth(0.3).line(M, y, PAGE_W - M, y)
  y += 6

  // ── Seller / Buyer (two columns) ──────────────────────────────────────────
  const colW = (PAGE_W - 2 * M - 6) / 2
  const leftX = M
  const rightX = M + colW + 6

  doc.setFont('helvetica', 'bold').setFontSize(8).setTextColor('#98A2B3')
  doc.text('FROM', leftX, y)
  doc.text('BILL TO', rightX, y)
  y += 5

  doc.setFont('helvetica', 'bold').setFontSize(11).setTextColor('#101828')
  doc.text(input.sellerName || '—', leftX, y)
  doc.text(input.buyerName  || '—', rightX, y)
  y += 5

  doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor('#475467')

  const seller: string[] = []
  if (input.sellerAddress) seller.push(input.sellerAddress)
  if (input.sellerState)   seller.push(findStateName(input.sellerState))
  if (input.sellerGstin)   seller.push(`GSTIN: ${input.sellerGstin}`)
  if (input.sellerEmail)   seller.push(input.sellerEmail)
  if (input.sellerPhone)   seller.push(input.sellerPhone)

  const buyer: string[] = []
  if (input.buyerAddress) buyer.push(input.buyerAddress)
  if (input.buyerState)   buyer.push(findStateName(input.buyerState))
  if (input.buyerGstin)   buyer.push(`GSTIN: ${input.buyerGstin}`)

  const sellerLines = seller.flatMap(s => doc.splitTextToSize(s, colW))
  const buyerLines  = buyer.flatMap(s => doc.splitTextToSize(s, colW))
  const maxLines = Math.max(sellerLines.length, buyerLines.length)

  for (let i = 0; i < maxLines; i++) {
    if (sellerLines[i]) doc.text(sellerLines[i], leftX, y + i * 4.5)
    if (buyerLines[i])  doc.text(buyerLines[i],  rightX, y + i * 4.5)
  }
  y += maxLines * 4.5 + 6

  // ── Line items table ──────────────────────────────────────────────────────
  const showHsn = input.items.some(i => i.hsnSac)
  const head = showHsn
    ? [['#', 'Description', 'HSN/SAC', 'Qty', 'Rate', 'Amount']]
    : [['#', 'Description', 'Qty', 'Rate', 'Amount']]

  const body = input.items.map((it, i) => {
    const amt = fmtINR(calcLineTotal(it))
    const row = [
      String(i + 1),
      it.description || '—',
      ...(showHsn ? [it.hsnSac || '—'] : []),
      String(it.quantity || 0),
      fmtINR(Number(it.rate) || 0),
      amt,
    ]
    return row
  })

  autoTable(doc, {
    head,
    body,
    startY: y,
    margin: { left: M, right: M },
    styles: {
      font: 'helvetica',
      fontSize: 9,
      cellPadding: 2.5,
      lineColor: '#EAECF0',
      lineWidth: 0.2,
      textColor: '#344054',
    },
    headStyles: {
      fillColor:  '#101828',
      textColor:  '#FFFFFF',
      fontStyle:  'bold',
      fontSize:   8.5,
      halign:     'left',
    },
    columnStyles: showHsn
      ? {
          0: { halign: 'center', cellWidth: 8 },
          1: { halign: 'left' },
          2: { halign: 'center', cellWidth: 22 },
          3: { halign: 'right',  cellWidth: 14 },
          4: { halign: 'right',  cellWidth: 24 },
          5: { halign: 'right',  cellWidth: 28 },
        }
      : {
          0: { halign: 'center', cellWidth: 8 },
          1: { halign: 'left' },
          2: { halign: 'right',  cellWidth: 14 },
          3: { halign: 'right',  cellWidth: 24 },
          4: { halign: 'right',  cellWidth: 28 },
        },
  })

  // Get the Y after the table
  // @ts-expect-error — lastAutoTable is added by autoTable plugin
  y = (doc.lastAutoTable?.finalY ?? y) + 8

  // ── Totals (right-aligned) ────────────────────────────────────────────────
  const labelX = PAGE_W - M - 60
  const valueX = PAGE_W - M

  function totalLine(label: string, value: string, opts?: { bold?: boolean; size?: number }) {
    doc.setFont('helvetica', opts?.bold ? 'bold' : 'normal')
       .setFontSize(opts?.size ?? 9.5)
       .setTextColor(opts?.bold ? '#101828' : '#475467')
    doc.text(label, labelX, y)
    doc.text(value, valueX, y, { align: 'right' })
    y += opts?.size ? opts.size / 2.2 : 5
  }

  totalLine('Subtotal', `₹${fmtINR(totals.subtotal)}`)

  if (totals.sameState) {
    totalLine(`CGST @ ${input.gstRate / 2}%`, `₹${fmtINR(totals.cgstAmount)}`)
    totalLine(`SGST @ ${input.gstRate / 2}%`, `₹${fmtINR(totals.sgstAmount)}`)
  } else {
    totalLine(`IGST @ ${input.gstRate}%`, `₹${fmtINR(totals.igstAmount)}`)
  }

  y += 1
  doc.setDrawColor('#101828').setLineWidth(0.4)
  doc.line(labelX, y, valueX, y)
  y += 5

  totalLine('Total', `₹${fmtINR(totals.total)}`, { bold: true, size: 12 })

  y += 4
  doc.setFont('helvetica', 'italic').setFontSize(9).setTextColor('#667085')
  const wordsLine = doc.splitTextToSize(
    `Amount in words: ${inWords(totals.total)} Rupees Only`,
    PAGE_W - 2 * M,
  )
  doc.text(wordsLine, M, y)
  y += wordsLine.length * 4.5 + 6

  // ── Notes ─────────────────────────────────────────────────────────────────
  if (input.notes) {
    doc.setFont('helvetica', 'bold').setFontSize(9).setTextColor('#101828')
    doc.text('Notes', M, y)
    y += 4.5
    doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor('#475467')
    const notesLines = doc.splitTextToSize(input.notes, PAGE_W - 2 * M)
    doc.text(notesLines, M, y)
    y += notesLines.length * 4.5 + 4
  }

  // ── Bank / UPI ────────────────────────────────────────────────────────────
  if (input.bankAccountNumber || input.upiId) {
    doc.setDrawColor('#EAECF0').setLineWidth(0.3).line(M, y, PAGE_W - M, y)
    y += 5

    doc.setFont('helvetica', 'bold').setFontSize(9).setTextColor('#101828')
    doc.text('Payment Details', M, y)
    y += 5

    doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor('#475467')
    if (input.upiId) {
      doc.text(`UPI ID: ${input.upiId}`, M, y)
      y += 4.5
    }
    if (input.bankAccountNumber) {
      const bankLine = [
        input.bankName,
        input.bankAccountName ? `A/C Name: ${input.bankAccountName}` : null,
        `A/C: ${input.bankAccountNumber}`,
        input.bankIfsc ? `IFSC: ${input.bankIfsc}` : null,
      ].filter(Boolean).join(' · ')
      const bankLines = doc.splitTextToSize(bankLine, PAGE_W - 2 * M)
      doc.text(bankLines, M, y)
      y += bankLines.length * 4.5
    }
    y += 4
  }

  // ── Footer ────────────────────────────────────────────────────────────────
  const pageH = doc.internal.pageSize.getHeight()
  doc.setFont('helvetica', 'normal').setFontSize(8).setTextColor('#98A2B3')
  doc.text(
    'Generated free with ClearWork — clearwork.in/tools/gst-invoice-generator',
    PAGE_W / 2,
    pageH - 8,
    { align: 'center' },
  )

  const filename = `Invoice-${(input.invoiceNumber || 'draft').replace(/[^a-z0-9-]/gi, '_')}.pdf`
  doc.save(filename)
}
