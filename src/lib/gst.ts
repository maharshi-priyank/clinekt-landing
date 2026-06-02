// ─── Indian states (with GST state codes) ────────────────────────────────────

export const INDIAN_STATES = [
  { code: '01', name: 'Jammu and Kashmir' },
  { code: '02', name: 'Himachal Pradesh' },
  { code: '03', name: 'Punjab' },
  { code: '04', name: 'Chandigarh' },
  { code: '05', name: 'Uttarakhand' },
  { code: '06', name: 'Haryana' },
  { code: '07', name: 'Delhi' },
  { code: '08', name: 'Rajasthan' },
  { code: '09', name: 'Uttar Pradesh' },
  { code: '10', name: 'Bihar' },
  { code: '11', name: 'Sikkim' },
  { code: '12', name: 'Arunachal Pradesh' },
  { code: '13', name: 'Nagaland' },
  { code: '14', name: 'Manipur' },
  { code: '15', name: 'Mizoram' },
  { code: '16', name: 'Tripura' },
  { code: '17', name: 'Meghalaya' },
  { code: '18', name: 'Assam' },
  { code: '19', name: 'West Bengal' },
  { code: '20', name: 'Jharkhand' },
  { code: '21', name: 'Odisha' },
  { code: '22', name: 'Chhattisgarh' },
  { code: '23', name: 'Madhya Pradesh' },
  { code: '24', name: 'Gujarat' },
  { code: '26', name: 'Dadra and Nagar Haveli and Daman and Diu' },
  { code: '27', name: 'Maharashtra' },
  { code: '29', name: 'Karnataka' },
  { code: '30', name: 'Goa' },
  { code: '31', name: 'Lakshadweep' },
  { code: '32', name: 'Kerala' },
  { code: '33', name: 'Tamil Nadu' },
  { code: '34', name: 'Puducherry' },
  { code: '35', name: 'Andaman and Nicobar Islands' },
  { code: '36', name: 'Telangana' },
  { code: '37', name: 'Andhra Pradesh' },
  { code: '38', name: 'Ladakh' },
] as const

export const GST_RATES = [0, 5, 12, 18, 28] as const
export type GstRate = typeof GST_RATES[number]

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InvoiceItem {
  description: string
  hsnSac:      string
  quantity:    number
  rate:        number
}

export interface InvoiceInput {
  invoiceNumber: string
  invoiceDate:   string
  dueDate:       string

  sellerName:    string
  sellerAddress: string
  sellerGstin:   string
  sellerState:   string
  sellerEmail:   string
  sellerPhone:   string

  buyerName:    string
  buyerAddress: string
  buyerGstin:   string
  buyerState:   string

  items:    InvoiceItem[]
  gstRate:  number
  notes:    string

  // Bank / UPI (optional — shown at bottom of invoice)
  bankName?:          string
  bankAccountName?:   string
  bankAccountNumber?: string
  bankIfsc?:          string
  upiId?:             string
}

export interface InvoiceTotals {
  subtotal:   number
  cgstAmount: number
  sgstAmount: number
  igstAmount: number
  totalGst:   number
  total:      number
  sameState:  boolean
}

// ─── Calculations ─────────────────────────────────────────────────────────────

export function calcLineTotal(item: InvoiceItem): number {
  const q = Number(item.quantity) || 0
  const r = Number(item.rate)     || 0
  return q * r
}

export function calcTotals(input: Pick<InvoiceInput, 'items' | 'gstRate' | 'sellerState' | 'buyerState'>): InvoiceTotals {
  const subtotal = input.items.reduce((sum, it) => sum + calcLineTotal(it), 0)
  const rate     = Number(input.gstRate) || 0
  const totalGst = subtotal * (rate / 100)

  const sameState = !!input.sellerState && !!input.buyerState && input.sellerState === input.buyerState
  const cgstAmount = sameState ? totalGst / 2 : 0
  const sgstAmount = sameState ? totalGst / 2 : 0
  const igstAmount = sameState ? 0 : totalGst

  return {
    subtotal,
    cgstAmount,
    sgstAmount,
    igstAmount,
    totalGst,
    total: subtotal + totalGst,
    sameState,
  }
}

export function fmtINR(n: number): string {
  return Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Convert number to Indian-currency words (e.g. "Forty-five thousand rupees only")
// Used for the "Amount in words" line on the invoice.
const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

function twoDigits(n: number): string {
  if (n === 0)   return ''
  if (n < 10)    return ones[n]
  if (n < 20)    return teens[n - 10]
  return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '')
}

function threeDigits(n: number): string {
  const h = Math.floor(n / 100)
  const r = n % 100
  return (h ? ones[h] + ' Hundred' + (r ? ' ' : '') : '') + twoDigits(r)
}

export function inWords(n: number): string {
  if (n === 0) return 'Zero'
  const negative = n < 0
  n = Math.abs(Math.round(n))

  let result = ''
  const crore = Math.floor(n / 1_00_00_000); n %= 1_00_00_000
  const lakh  = Math.floor(n / 1_00_000);    n %= 1_00_000
  const thou  = Math.floor(n / 1000);        n %= 1000
  const rest  = n

  if (crore) result += threeDigits(crore) + ' Crore '
  if (lakh)  result += threeDigits(lakh)  + ' Lakh '
  if (thou)  result += threeDigits(thou)  + ' Thousand '
  if (rest)  result += threeDigits(rest)
  return (negative ? 'Minus ' : '') + result.trim()
}

export function findStateName(code: string): string {
  return INDIAN_STATES.find(s => s.code === code)?.name ?? ''
}
