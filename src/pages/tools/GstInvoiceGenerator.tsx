import OtherToolsSection from '../../components/OtherToolsSection'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Download, Plus, Trash2, FileText, Shield, Zap, Check,
  IndianRupee, RefreshCw,
} from 'lucide-react'
import {
  INDIAN_STATES, GST_RATES,
  calcLineTotal, calcTotals, findStateName, fmtINR, inWords,
  type InvoiceInput, type InvoiceItem,
} from '../../lib/gst'
import { generateInvoicePdf } from '../../lib/invoicePdf'
import { useSeo } from '../../lib/useSeo'
import { trackToolUsed } from '../../lib/analytics'
import { useSchemaOrg, breadcrumbSchema } from '../../lib/useSchemaOrg'

const STORAGE_KEY = 'clearwork-gst-invoice-draft'

const emptyItem: InvoiceItem = { description: '', hsnSac: '', quantity: 1, rate: 0 }

function defaultInput(): InvoiceInput {
  const today = new Date().toISOString().slice(0, 10)
  const due   = new Date(Date.now() + 14 * 86400_000).toISOString().slice(0, 10)
  return {
    invoiceNumber: 'INV-001',
    invoiceDate:   today,
    dueDate:       due,
    sellerName:    '',
    sellerAddress: '',
    sellerGstin:   '',
    sellerState:   '',
    sellerEmail:   '',
    sellerPhone:   '',
    buyerName:     '',
    buyerAddress:  '',
    buyerGstin:    '',
    buyerState:    '',
    items:         [{ ...emptyItem }],
    gstRate:       18,
    notes:         '',
  }
}

function loadDraft(): InvoiceInput {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaultInput(), ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return defaultInput()
}

export default function GstInvoiceGenerator() {
  useSeo(
    'Free GST Invoice Generator (India) — CGST/SGST/IGST auto-split | ClearWork',
    'Generate a GST-compliant invoice PDF in seconds. Free, no signup. Auto CGST/SGST/IGST split by state. Built for Indian freelancers and small businesses.',
    'https://getclearwork.in/tools/gst-invoice-generator',
  )
  useEffect(() => { trackToolUsed('gst_invoice_generator') }, [])
  useSchemaOrg(breadcrumbSchema([
    { name: 'Home',       item: 'https://getclearwork.in/' },
    { name: 'Free Tools', item: 'https://getclearwork.in/tools' },
    { name: 'GST Invoice Generator', item: 'https://getclearwork.in/tools/gst-invoice-generator' },
  ]))

  const [input, setInput] = useState<InvoiceInput>(loadDraft)

  // Persist to localStorage on every change
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(input)) } catch { /* ignore */ }
  }, [input])

  const totals = useMemo(() => calcTotals(input), [input])

  function set<K extends keyof InvoiceInput>(key: K, value: InvoiceInput[K]) {
    setInput(prev => ({ ...prev, [key]: value }))
  }

  function updateItem(idx: number, patch: Partial<InvoiceItem>) {
    setInput(prev => ({
      ...prev,
      items: prev.items.map((it, i) => (i === idx ? { ...it, ...patch } : it)),
    }))
  }

  function addItem() {
    setInput(prev => ({ ...prev, items: [...prev.items, { ...emptyItem }] }))
  }

  function removeItem(idx: number) {
    setInput(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }))
  }

  function reset() {
    if (!confirm('Clear all fields and start over?')) return
    localStorage.removeItem(STORAGE_KEY)
    setInput(defaultInput())
  }

  function download() {
    generateInvoicePdf(input)
  }

  return (
    <>
      {/* JSON-LD: SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'SoftwareApplication',
            name:       'Free GST Invoice Generator',
            applicationCategory: 'BusinessApplication',
            operatingSystem:     'Web',
            description:         'Generate GST-compliant invoices for India. Auto CGST/SGST/IGST split by state. Free, no signup.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
            audience: { '@type': 'Audience', audienceType: 'Indian freelancers and small businesses' },
          }),
        }}
      />

      <Hero />

      {/* ── Tool ────────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Form (left) */}
            <div className="lg:col-span-5 space-y-5">

              {/* Invoice details */}
              <Card title="Invoice details">
                <Grid cols={2}>
                  <Field label="Invoice number">
                    <input value={input.invoiceNumber} onChange={e => set('invoiceNumber', e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="GST rate">
                    <select value={input.gstRate} onChange={e => set('gstRate', Number(e.target.value))} className={inputCls}>
                      {GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                    </select>
                  </Field>
                  <Field label="Invoice date">
                    <input type="date" value={input.invoiceDate} onChange={e => set('invoiceDate', e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Due date">
                    <input type="date" value={input.dueDate} onChange={e => set('dueDate', e.target.value)} className={inputCls} />
                  </Field>
                </Grid>
              </Card>

              {/* Seller */}
              <Card title="From (your business)">
                <Field label="Business name *">
                  <input value={input.sellerName} onChange={e => set('sellerName', e.target.value)} placeholder="Acme Design Studio" className={inputCls} />
                </Field>
                <Field label="Address">
                  <textarea value={input.sellerAddress} onChange={e => set('sellerAddress', e.target.value)} rows={2} placeholder="Office address, city, PIN" className={inputCls + ' resize-none'} />
                </Field>
                <Grid cols={2}>
                  <Field label="State *">
                    <StateSelect value={input.sellerState} onChange={v => set('sellerState', v)} />
                  </Field>
                  <Field label="GSTIN">
                    <input value={input.sellerGstin} onChange={e => set('sellerGstin', e.target.value.toUpperCase())} placeholder="29ABCDE1234F1Z5" className={inputCls} />
                  </Field>
                  <Field label="Email">
                    <input type="email" value={input.sellerEmail} onChange={e => set('sellerEmail', e.target.value)} placeholder="hello@yourbusiness.com" className={inputCls} />
                  </Field>
                  <Field label="Phone">
                    <input value={input.sellerPhone} onChange={e => set('sellerPhone', e.target.value)} placeholder="+91 98765 43210" className={inputCls} />
                  </Field>
                </Grid>
              </Card>

              {/* Buyer */}
              <Card title="Bill to (your client)">
                <Field label="Client name *">
                  <input value={input.buyerName} onChange={e => set('buyerName', e.target.value)} placeholder="TechStart Pvt Ltd" className={inputCls} />
                </Field>
                <Field label="Address">
                  <textarea value={input.buyerAddress} onChange={e => set('buyerAddress', e.target.value)} rows={2} placeholder="Client address, city, PIN" className={inputCls + ' resize-none'} />
                </Field>
                <Grid cols={2}>
                  <Field label="State *">
                    <StateSelect value={input.buyerState} onChange={v => set('buyerState', v)} />
                  </Field>
                  <Field label="GSTIN (if any)">
                    <input value={input.buyerGstin} onChange={e => set('buyerGstin', e.target.value.toUpperCase())} placeholder="27AAAAA0000A1Z5" className={inputCls} />
                  </Field>
                </Grid>
              </Card>

              {/* Items */}
              <Card title="Line items">
                <div className="space-y-3">
                  {input.items.map((item, idx) => (
                    <div key={idx} className="rounded-xl border border-gray-200 bg-gray-50/50 p-3.5 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Item {idx + 1}</span>
                        {input.items.length > 1 && (
                          <button onClick={() => removeItem(idx)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                      <Field label="Description *" tight>
                        <input value={item.description} onChange={e => updateItem(idx, { description: e.target.value })} placeholder="Brand identity design" className={inputCls} />
                      </Field>
                      <Grid cols={3}>
                        <Field label="HSN/SAC" tight>
                          <input value={item.hsnSac} onChange={e => updateItem(idx, { hsnSac: e.target.value })} placeholder="998391" className={inputCls} />
                        </Field>
                        <Field label="Qty" tight>
                          <input type="number" min={0} step="any" value={item.quantity} onChange={e => updateItem(idx, { quantity: Number(e.target.value) })} className={inputCls} />
                        </Field>
                        <Field label="Rate (₹)" tight>
                          <input type="number" min={0} step="any" value={item.rate} onChange={e => updateItem(idx, { rate: Number(e.target.value) })} className={inputCls} />
                        </Field>
                      </Grid>
                      <div className="text-xs text-gray-500 text-right pt-1">
                        Amount: <span className="font-semibold text-gray-900">₹{fmtINR(calcLineTotal(item))}</span>
                      </div>
                    </div>
                  ))}
                  <button onClick={addItem} className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border-2 border-dashed border-gray-300 text-sm font-semibold text-gray-500 hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                    <Plus size={14} /> Add another item
                  </button>
                </div>
              </Card>

              {/* Notes */}
              <Card title="Notes (optional)">
                <textarea value={input.notes} onChange={e => set('notes', e.target.value)} rows={3} placeholder="Payment terms, thank-you note…" className={inputCls + ' resize-none'} />
              </Card>

              {/* Bank / UPI */}
              <Card title="Payment details (optional)">
                <Grid cols={2}>
                  <Field label="UPI ID">
                    <input value={input.upiId ?? ''} onChange={e => set('upiId', e.target.value)} placeholder="yourname@okaxis" className={inputCls} />
                  </Field>
                  <Field label="Bank name">
                    <input value={input.bankName ?? ''} onChange={e => set('bankName', e.target.value)} placeholder="HDFC Bank" className={inputCls} />
                  </Field>
                  <Field label="Account holder name">
                    <input value={input.bankAccountName ?? ''} onChange={e => set('bankAccountName', e.target.value)} placeholder="Maharshi Vaghela" className={inputCls} />
                  </Field>
                  <Field label="Account number">
                    <input value={input.bankAccountNumber ?? ''} onChange={e => set('bankAccountNumber', e.target.value)} placeholder="012345678901" className={inputCls + ' font-mono tracking-wider'} />
                  </Field>
                  <Field label="IFSC code">
                    <input value={input.bankIfsc ?? ''} onChange={e => set('bankIfsc', e.target.value.toUpperCase())} placeholder="HDFC0001234" className={inputCls + ' font-mono uppercase'} />
                  </Field>
                </Grid>
              </Card>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 sticky bottom-4 bg-white p-3 rounded-xl border border-gray-200 shadow-lg">
                <button
                  onClick={download}
                  disabled={!input.sellerName || !input.buyerName || input.items.every(i => !i.description)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-950 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Download size={14} /> Download PDF
                </button>
                <button onClick={reset} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
                  <RefreshCw size={13} /> Reset
                </button>
                <span className="text-xs text-gray-400 ml-auto">Auto-saved on this device</span>
              </div>
            </div>

            {/* Preview (right) */}
            <div className="lg:col-span-7">
              <div className="lg:sticky lg:top-20">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Live preview</p>
                <InvoicePreview input={input} totals={totals} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Upsell />
      <FAQ />
      <OtherToolsSection currentHref="/tools/gst-invoice-generator" />
    </>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-colors'

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 space-y-3.5">
      <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, children, tight = false }: { label: string; children: React.ReactNode; tight?: boolean }) {
  return (
    <div className={tight ? 'space-y-1' : 'space-y-1.5'}>
      <label className="block text-xs font-semibold text-gray-500">{label}</label>
      {children}
    </div>
  )
}

function Grid({ cols, children }: { cols: 2 | 3; children: React.ReactNode }) {
  // Static classes so Tailwind JIT picks them up
  const cls = cols === 2
    ? 'grid grid-cols-1 sm:grid-cols-2 gap-3'
    : 'grid grid-cols-1 sm:grid-cols-3 gap-3'
  return <div className={cls}>{children}</div>
}

function StateSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className={inputCls}>
      <option value="">Select state</option>
      {INDIAN_STATES.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
    </select>
  )
}

// ─── Invoice preview ──────────────────────────────────────────────────────────

function InvoicePreview({ input, totals }: { input: InvoiceInput; totals: ReturnType<typeof calcTotals> }) {
  const showHsn = input.items.some(i => i.hsnSac)

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8 text-[12.5px] text-gray-700">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-[22px] font-extrabold text-gray-900 leading-none tracking-tight">TAX INVOICE</h2>
            <p className="text-[11px] text-gray-400 mt-1">{input.invoiceNumber || 'INV-...'}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-gray-400">Date</p>
            <p className="font-semibold text-gray-900">{input.invoiceDate || '—'}</p>
            {input.dueDate && (
              <>
                <p className="text-[11px] text-gray-400 mt-1.5">Due</p>
                <p className="font-semibold text-gray-900">{input.dueDate}</p>
              </>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-5 grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">From</p>
            <p className="font-bold text-gray-900 text-[13px]">{input.sellerName || 'Your business'}</p>
            {input.sellerAddress && <p className="text-gray-600 mt-0.5 whitespace-pre-line">{input.sellerAddress}</p>}
            {input.sellerState   && <p className="text-gray-600 mt-0.5">{findStateName(input.sellerState)}</p>}
            {input.sellerGstin   && <p className="text-gray-600 mt-1">GSTIN: <span className="font-mono">{input.sellerGstin}</span></p>}
            {input.sellerEmail   && <p className="text-gray-500 mt-0.5">{input.sellerEmail}</p>}
            {input.sellerPhone   && <p className="text-gray-500">{input.sellerPhone}</p>}
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Bill to</p>
            <p className="font-bold text-gray-900 text-[13px]">{input.buyerName || 'Client name'}</p>
            {input.buyerAddress && <p className="text-gray-600 mt-0.5 whitespace-pre-line">{input.buyerAddress}</p>}
            {input.buyerState   && <p className="text-gray-600 mt-0.5">{findStateName(input.buyerState)}</p>}
            {input.buyerGstin   && <p className="text-gray-600 mt-1">GSTIN: <span className="font-mono">{input.buyerGstin}</span></p>}
          </div>
        </div>

        {/* Items */}
        <div className="rounded-lg overflow-hidden border border-gray-200 mb-5">
          <table className="w-full text-[11.5px]">
            <thead className="bg-gray-950 text-white">
              <tr>
                <th className="text-center px-2 py-2 font-semibold w-8">#</th>
                <th className="text-left px-3 py-2 font-semibold">Description</th>
                {showHsn && <th className="text-center px-2 py-2 font-semibold">HSN/SAC</th>}
                <th className="text-right px-2 py-2 font-semibold w-12">Qty</th>
                <th className="text-right px-2 py-2 font-semibold w-20">Rate</th>
                <th className="text-right px-3 py-2 font-semibold w-24">Amount</th>
              </tr>
            </thead>
            <tbody>
              {input.items.map((it, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="text-center px-2 py-2 text-gray-400">{i + 1}</td>
                  <td className="px-3 py-2 text-gray-900">{it.description || <span className="text-gray-300">Item description</span>}</td>
                  {showHsn && <td className="text-center px-2 py-2 text-gray-500 font-mono">{it.hsnSac || '—'}</td>}
                  <td className="text-right px-2 py-2 text-gray-700">{it.quantity || 0}</td>
                  <td className="text-right px-2 py-2 text-gray-700">₹{fmtINR(Number(it.rate) || 0)}</td>
                  <td className="text-right px-3 py-2 font-semibold text-gray-900">₹{fmtINR(calcLineTotal(it))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full sm:w-72 space-y-1.5">
            <Row label="Subtotal" value={`₹${fmtINR(totals.subtotal)}`} />
            {totals.sameState ? (
              <>
                <Row label={`CGST @ ${input.gstRate / 2}%`} value={`₹${fmtINR(totals.cgstAmount)}`} muted />
                <Row label={`SGST @ ${input.gstRate / 2}%`} value={`₹${fmtINR(totals.sgstAmount)}`} muted />
              </>
            ) : (
              <Row label={`IGST @ ${input.gstRate}%`} value={`₹${fmtINR(totals.igstAmount)}`} muted />
            )}
            <div className="border-t border-gray-900 pt-2 mt-2 flex items-baseline justify-between">
              <span className="text-[13px] font-bold text-gray-900">Total</span>
              <span className="text-[18px] font-extrabold text-gray-900">₹{fmtINR(totals.total)}</span>
            </div>
          </div>
        </div>

        {totals.total > 0 && (
          <p className="text-[11px] italic text-gray-500 mt-4 pt-3 border-t border-gray-100">
            Amount in words: {inWords(totals.total)} Rupees Only
          </p>
        )}

        {input.notes && (
          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Notes</p>
            <p className="text-gray-700 whitespace-pre-line">{input.notes}</p>
          </div>
        )}

        {(input.bankAccountNumber || input.upiId) && (
          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Payment Details</p>
            {input.upiId && (
              <p className="text-gray-700"><span className="font-semibold">UPI:</span> {input.upiId}</p>
            )}
            {input.bankAccountNumber && (
              <p className="text-gray-700 mt-0.5">
                {[input.bankName, input.bankAccountName ? `A/C Name: ${input.bankAccountName}` : null, `A/C: ${input.bankAccountNumber}`, input.bankIfsc ? `IFSC: ${input.bankIfsc}` : null].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>
        )}

        <p className="mt-6 text-[10px] text-gray-300 text-center">
          Generated free with ClearWork — getclearwork.in
        </p>
      </div>
    </div>
  )
}

function Row({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className={`text-[12px] ${muted ? 'text-gray-500' : 'text-gray-700'}`}>{label}</span>
      <span className={`text-[12.5px] font-semibold ${muted ? 'text-gray-700' : 'text-gray-900'}`}>{value}</span>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative pt-28 pb-10 sm:pb-14 overflow-hidden bg-white">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 relative z-10 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-600 shadow-sm mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Free GST Invoice Generator
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-gray-950 leading-[1.05]">
          GST-compliant invoices in 30 seconds.
          <br />
          <span className="text-gray-400">No signup. No watermark.</span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          Auto CGST/SGST/IGST split by state. Auto-saves on your device.
          Download a clean PDF — built for Indian freelancers and small businesses.
        </p>

        <div className="mt-7 flex flex-wrap justify-center items-center gap-x-6 gap-y-2.5">
          {[
            { icon: Shield,      label: 'No signup, ever' },
            { icon: IndianRupee, label: 'Auto CGST/SGST/IGST' },
            { icon: Zap,         label: 'Live preview' },
            { icon: FileText,    label: 'Clean PDF download' },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 text-[13px] text-gray-500">
              <Icon size={13} className="text-emerald-500" strokeWidth={2.2} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Upsell ───────────────────────────────────────────────────────────────────

function Upsell() {
  const reasons = [
    { title: 'Save invoices automatically',  desc: 'Every invoice you generate is stored and searchable. Pull up any past invoice in one click.' },
    { title: 'Send via WhatsApp + email',    desc: 'One click sends the invoice to your client with a Razorpay UPI payment link embedded.' },
    { title: 'See when clients open them',   desc: 'Get a notification the second your client opens the invoice — perfect timing for a follow-up.' },
    { title: 'Track payments end-to-end',    desc: 'Razorpay + UPI + cards built in. Auto-mark as paid. Auto-reminder if overdue at day 3, 7, 14.' },
    { title: 'GST report for your CA',       desc: 'Quarter-wise GST summary export. CA-ready PDF you can share on WhatsApp. Saves hours every quarter.' },
    { title: 'Recurring clients pre-filled', desc: 'Save client details once. Next invoice for the same client auto-fills GSTIN, address, state.' },
  ]

  return (
    <section className="py-16 sm:py-20 bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-white/80 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Doing this every week?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Stop generating invoices one by one.
            <br />
            <span className="text-gray-400">Run your whole business on ClearWork.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {reasons.map(r => (
            <div key={r.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="text-emerald-400" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-white">{r.title}</h3>
                  <p className="text-[13px] text-gray-400 mt-1 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/#waitlist"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-gray-950 font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg"
          >
            Try ClearWork free
            <ArrowRight size={15} />
          </Link>
          <p className="text-xs text-gray-500 mt-3">Free forever plan. No credit card needed.</p>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'Is this GST invoice generator really free?',
    a: 'Yes — fully free, no signup required, no watermark on the PDF. Generate as many invoices as you want. The tool runs entirely in your browser; nothing is stored on our servers.',
  },
  {
    q: 'When is CGST/SGST applied vs IGST?',
    a: 'When seller and buyer are in the same Indian state, GST is split equally into CGST (Central) and SGST (State). When the states are different, the entire GST amount is charged as IGST (Integrated GST). This calculator picks the right split automatically based on the states you select.',
  },
  {
    q: 'What is HSN/SAC code?',
    a: 'HSN (Harmonised System of Nomenclature) is for goods, SAC (Services Accounting Code) is for services. As a freelancer or service provider, you typically use SAC codes (e.g. 998391 for advertising services, 998314 for IT design, 998313 for IT consulting). The HSN/SAC is required if your turnover exceeds ₹5 crore; otherwise it is optional.',
  },
  {
    q: 'What is GSTIN format?',
    a: 'A GSTIN is 15 characters: first 2 digits are the state code (e.g. 29 for Karnataka, 27 for Maharashtra), next 10 are the PAN of the business, the 13th is the entity number, the 14th is "Z" by default, and the 15th is a checksum. Example: 29ABCDE1234F1Z5.',
  },
  {
    q: 'Do I need a GSTIN as a freelancer?',
    a: 'Only if your annual turnover crosses ₹20 lakh (₹10 lakh for special-category states). Below that you do not need to register for GST. If you are not GST-registered, leave the GSTIN field blank — the invoice is still valid as a normal invoice.',
  },
  {
    q: 'Is this invoice legally valid?',
    a: 'Yes — a GST-compliant invoice generated here is legally valid as long as it contains the mandatory fields: invoice number, date, seller and buyer details (with GSTIN if applicable), HSN/SAC code (if mandatory for you), description, quantity, rate, and tax breakdown. The PDF this tool generates includes all of these.',
  },
  {
    q: 'Can I save invoices and send them automatically?',
    a: 'Not with this free tool — it generates a PDF for you to download and send manually. If you want auto-saving, automatic Razorpay payment links inside the invoice, WhatsApp + email delivery, and follow-up reminders, sign up for ClearWork — there is a free plan.',
  },
] as const

function FAQ() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'FAQPage',
            mainEntity: faqs.map(f => ({
              '@type': 'Question',
              name:    f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              FAQs
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Common questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(f => (
              <details key={f.q} className="group rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 [&_summary]:cursor-pointer">
                <summary className="flex items-center justify-between gap-4 list-none">
                  <span className="text-[14.5px] font-semibold text-gray-900">{f.q}</span>
                  <span className="text-gray-400 group-open:rotate-45 transition-transform shrink-0"><Plus size={16} /></span>
                </summary>
                <p className="mt-3 text-[13.5px] text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
