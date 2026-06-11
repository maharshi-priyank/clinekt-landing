import OtherToolsSection from '../../components/OtherToolsSection'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Plus, Shield, Zap, IndianRupee, Trash2, Download,
  FileText, RotateCcw, ChevronDown,
} from 'lucide-react'
import { useSeo } from '../../lib/useSeo'
import { trackToolUsed } from '../../lib/analytics'
import { useSchemaOrg, breadcrumbSchema } from '../../lib/useSchemaOrg'
import { fmtINR, GST_RATES } from '../../lib/gst'
import {
  generateQuotePdf, calcQuoteTotals,
  type QuoteInput, type QuoteItem,
} from '../../lib/quotePdf'

const STORAGE_KEY = 'clearwork-quote-gen-state'

function newItem(): QuoteItem {
  return { description: '', quantity: '1', rate: '' }
}

function defaults(): QuoteInput {
  return {
    quoteNumber:  '',
    quoteDate:    new Date().toISOString().split('T')[0],
    validDays:    30,
    fromName:     '',
    fromAddress:  '',
    fromGstin:    '',
    fromEmail:    '',
    fromPhone:    '',
    toName:       '',
    toCompany:    '',
    toAddress:    '',
    toEmail:      '',
    items:        [newItem()],
    gstRate:      18,
    applyGst:     true,
    notes:        '',
    terms:        'This quotation is valid for the specified number of days from the quote date.\nPrices are subject to change after the validity period.\n50% advance payment required to begin work.',
  }
}

function loadState(): QuoteInput {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as QuoteInput
      return { ...defaults(), ...parsed }
    }
  } catch { /* ignore */ }
  return defaults()
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{children}</p>
}

function Input({
  label, value, onChange, placeholder, type = 'text', className = '',
}: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
      />
    </div>
  )
}

function Textarea({
  label, value, onChange, placeholder, rows = 3,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
      />
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function QuoteGenerator() {
  useSeo(
    'Free Quote / Estimate Generator for Indian Freelancers | ClearWork',
    'Create professional quotations and estimates in minutes. Add line items, auto-calculate GST, set validity period, and download a clean PDF. Free, no signup.',
    'https://getclearwork.in/tools/quote-generator',
  )
  useEffect(() => { trackToolUsed('quote_generator') }, [])
  useSchemaOrg(breadcrumbSchema([
    { name: 'Home',       item: 'https://getclearwork.in/' },
    { name: 'Free Tools', item: 'https://getclearwork.in/tools' },
    { name: 'Quote Generator', item: 'https://getclearwork.in/tools/quote-generator' },
  ]))

  const [form, setForm] = useState<QuoteInput>(loadState)
  const [showGstOptions, setShowGstOptions] = useState(false)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(form)) } catch { /* ignore */ }
  }, [form])

  const totals = useMemo(() => calcQuoteTotals(form), [form])

  function set<K extends keyof QuoteInput>(key: K, val: QuoteInput[K]) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  function setItem(idx: number, key: keyof QuoteItem, val: string) {
    const items = form.items.map((it, i) => i === idx ? { ...it, [key]: val } : it)
    set('items', items)
  }

  function addItem() { set('items', [...form.items, newItem()]) }

  function removeItem(idx: number) {
    if (form.items.length === 1) return
    set('items', form.items.filter((_, i) => i !== idx))
  }

  function handleDownload() { generateQuotePdf(form) }

  function handleReset() {
    if (confirm('Reset the entire form? This cannot be undone.')) {
      const fresh = defaults()
      setForm(fresh)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh)) } catch { /* ignore */ }
    }
  }

  // ── Preview data ──────────────────────────────────────────────────────────

  const validItems = form.items.filter(it => it.description.trim())

  return (
    <div className="min-h-screen bg-[#F4F6FB] pt-16">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="bg-[#101828] text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium mb-5">
            <FileText size={12} />
            Free Quote Generator
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
            Professional Quotation Generator<br className="hidden sm:block" /> for Indian Freelancers
          </h1>
          <p className="text-gray-400 text-base max-w-2xl">
            Create detailed quotes with line items, GST breakdown, and validity period. Download a client-ready PDF in one click — free, no signup required.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><Zap size={13} className="text-amber-400" /> Instant PDF download</span>
            <span className="flex items-center gap-1.5"><Shield size={13} className="text-emerald-400" /> No data stored on our servers</span>
            <span className="flex items-center gap-1.5"><IndianRupee size={13} className="text-blue-400" /> GST-compliant format</span>
          </div>
        </div>
      </section>

      {/* ── Tool ────────────────────────────────────────────────────────── */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* ── LEFT FORM ─────────────────────────────────────────────── */}
            <div className="flex-1 min-w-0 space-y-5">

              {/* Quote Meta */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <SectionLabel>Quote Details</SectionLabel>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <Input label="Quote Number" value={form.quoteNumber} onChange={v => set('quoteNumber', v)} placeholder="Q-001" />
                  <Input label="Date" value={form.quoteDate} onChange={v => set('quoteDate', v)} type="date" />
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Valid For (days)</label>
                    <input
                      type="number"
                      min={0}
                      value={form.validDays}
                      onChange={e => set('validDays', Number(e.target.value))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* From */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <SectionLabel>Your Details (From)</SectionLabel>
                <div className="space-y-3">
                  <Input label="Your Name / Business Name" value={form.fromName} onChange={v => set('fromName', v)} placeholder="Riya Sharma" />
                  <Input label="Address" value={form.fromAddress} onChange={v => set('fromAddress', v)} placeholder="Mumbai, Maharashtra" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Email" value={form.fromEmail} onChange={v => set('fromEmail', v)} placeholder="riya@example.com" type="email" />
                    <Input label="Phone" value={form.fromPhone} onChange={v => set('fromPhone', v)} placeholder="+91 98765 43210" />
                  </div>
                  <Input label="GSTIN (optional)" value={form.fromGstin} onChange={v => set('fromGstin', v)} placeholder="27AAAAA0000A1Z5" />
                </div>
              </div>

              {/* To */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <SectionLabel>Client Details (Prepared For)</SectionLabel>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Contact Name" value={form.toName} onChange={v => set('toName', v)} placeholder="Aakash Mehta" />
                    <Input label="Company Name (optional)" value={form.toCompany} onChange={v => set('toCompany', v)} placeholder="XYZ Pvt Ltd" />
                  </div>
                  <Input label="Address" value={form.toAddress} onChange={v => set('toAddress', v)} placeholder="Delhi" />
                  <Input label="Email" value={form.toEmail} onChange={v => set('toEmail', v)} placeholder="aakash@company.com" type="email" />
                </div>
              </div>

              {/* Line Items */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <SectionLabel>Services / Line Items</SectionLabel>
                <div className="space-y-2">
                  {/* Header */}
                  <div className="grid grid-cols-[1fr_80px_96px_32px] gap-2 px-1">
                    <span className="text-xs text-gray-400 font-medium">Description</span>
                    <span className="text-xs text-gray-400 font-medium text-center">Qty</span>
                    <span className="text-xs text-gray-400 font-medium text-right">Rate (₹)</span>
                    <span />
                  </div>
                  {form.items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-[1fr_80px_96px_32px] gap-2 items-center">
                      <input
                        type="text"
                        value={item.description}
                        onChange={e => setItem(idx, 'description', e.target.value)}
                        placeholder={`Service ${idx + 1}`}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                      <input
                        type="number"
                        min={0}
                        value={item.quantity}
                        onChange={e => setItem(idx, 'quantity', e.target.value)}
                        className="border border-gray-200 rounded-lg px-2 py-2 text-sm text-gray-900 text-center focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                      <input
                        type="number"
                        min={0}
                        value={item.rate}
                        onChange={e => setItem(idx, 'rate', e.target.value)}
                        placeholder="0"
                        className="border border-gray-200 rounded-lg px-2 py-2 text-sm text-gray-900 text-right focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                      <button
                        onClick={() => removeItem(idx)}
                        disabled={form.items.length === 1}
                        className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addItem}
                  className="mt-3 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors"
                >
                  <Plus size={15} />
                  Add line item
                </button>

                {/* GST */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setShowGstOptions(v => !v)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <span>GST Settings</span>
                    <ChevronDown size={14} className={`transition-transform ${showGstOptions ? 'rotate-180' : ''}`} />
                  </button>
                  {showGstOptions && (
                    <div className="mt-3 space-y-3">
                      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.applyGst}
                          onChange={e => set('applyGst', e.target.checked)}
                          className="accent-gray-900"
                        />
                        Apply GST to this quote
                      </label>
                      {form.applyGst && (
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-2">GST Rate</p>
                          <div className="flex gap-2 flex-wrap">
                            {GST_RATES.map(r => (
                              <button
                                key={r}
                                onClick={() => set('gstRate', r)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                                  form.gstRate === r
                                    ? 'bg-gray-900 text-white border-gray-900'
                                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                                }`}
                              >
                                {r}%
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Notes & Terms */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <SectionLabel>Notes & Terms</SectionLabel>
                <div className="space-y-3">
                  <Textarea
                    label="Notes (optional)"
                    value={form.notes}
                    onChange={v => set('notes', v)}
                    placeholder="Any additional notes for the client..."
                    rows={2}
                  />
                  <Textarea
                    label="Terms & Conditions"
                    value={form.terms}
                    onChange={v => set('terms', v)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white rounded-xl px-5 py-3 text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  <Download size={16} />
                  Download PDF
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 border border-gray-200 text-gray-500 rounded-xl px-4 py-3 text-sm font-medium hover:border-gray-400 hover:text-gray-700 transition-colors"
                >
                  <RotateCcw size={14} />
                  Reset
                </button>
              </div>
            </div>

            {/* ── RIGHT PREVIEW ─────────────────────────────────────────── */}
            <div className="w-full lg:w-[400px] shrink-0 sticky top-20">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header bar preview */}
                <div className="bg-[#101828] text-white px-5 py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Quotation</p>
                      <p className="font-bold text-lg">{form.fromName || 'Your Name'}</p>
                      {form.quoteNumber && <p className="text-xs text-gray-400 mt-0.5">#{form.quoteNumber}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{form.quoteDate || '—'}</p>
                      {form.validDays > 0 && (
                        <p className="text-xs text-amber-400 mt-0.5">Valid {form.validDays} days</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-5">
                  {/* From / To */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">From</p>
                      <p className="font-semibold text-gray-900">{form.fromName || '—'}</p>
                      {form.fromAddress && <p className="text-gray-500 text-xs">{form.fromAddress}</p>}
                      {form.fromEmail && <p className="text-gray-500 text-xs">{form.fromEmail}</p>}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Prepared For</p>
                      <p className="font-semibold text-gray-900">{form.toCompany || form.toName || '—'}</p>
                      {form.toCompany && form.toName && <p className="text-gray-500 text-xs">{form.toName}</p>}
                      {form.toAddress && <p className="text-gray-500 text-xs">{form.toAddress}</p>}
                    </div>
                  </div>

                  {/* Items table */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-3 py-2 font-medium text-gray-500">Description</th>
                          <th className="text-center px-2 py-2 font-medium text-gray-500 w-10">Qty</th>
                          <th className="text-right px-3 py-2 font-medium text-gray-500 w-20">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {validItems.length > 0 ? validItems.map((it, i) => {
                          const qty = Number(it.quantity) || 0
                          const rate = Number(it.rate) || 0
                          return (
                            <tr key={i} className="border-t border-gray-50">
                              <td className="px-3 py-2 text-gray-700">{it.description}</td>
                              <td className="px-2 py-2 text-center text-gray-500">{qty || '—'}</td>
                              <td className="px-3 py-2 text-right font-medium text-gray-900">
                                {rate > 0 ? `₹${fmtINR(qty * rate)}` : '—'}
                              </td>
                            </tr>
                          )
                        }) : (
                          <tr><td colSpan={3} className="px-3 py-4 text-center text-gray-300 text-xs">Add services above</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals */}
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>₹{fmtINR(totals.subtotal)}</span>
                    </div>
                    {form.applyGst && form.gstRate > 0 && (
                      <div className="flex justify-between text-gray-500">
                        <span>GST @ {form.gstRate}%</span>
                        <span>₹{fmtINR(totals.gstAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                      <span>Total</span>
                      <span>₹{fmtINR(totals.total)}</span>
                    </div>
                  </div>

                  {form.terms.trim() && (
                    <div className="text-xs text-gray-400 border-t border-gray-100 pt-3">
                      <p className="font-semibold text-gray-500 mb-1">Terms & Conditions</p>
                      <p className="whitespace-pre-line leading-relaxed">{form.terms.slice(0, 200)}{form.terms.length > 200 ? '…' : ''}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Download CTA below preview */}
              <button
                onClick={handleDownload}
                className="w-full mt-3 flex items-center justify-center gap-2 bg-gray-900 text-white rounded-xl px-5 py-3 text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                <Download size={16} />
                Download Quote PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── How to use ──────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Create a Professional Quote</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Enter your details', desc: 'Add your name, email, and the client\'s information. GSTIN is optional but recommended for GST-registered freelancers.' },
              { step: '2', title: 'Add services & pricing', desc: 'List each deliverable with quantity and rate. Toggle GST on or off depending on whether you\'re registered.' },
              { step: '3', title: 'Download & send', desc: 'Click "Download PDF" to get a clean, client-ready quotation. Attach it to your email or WhatsApp message.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">{step}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-[#F4F6FB]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              {
                q: 'What is a quotation / estimate?',
                a: 'A quotation (or quote/estimate) is a document you send to a potential client before starting work. It outlines the services you\'ll provide, the costs, and your terms. When the client accepts it, it becomes the basis for a formal contract.',
              },
              {
                q: 'Do I need to add GST to my quote?',
                a: 'Only if you\'re GST-registered (i.e., your annual turnover exceeds ₹20 lakh, or ₹10 lakh for some states, or you registered voluntarily). If you\'re not registered, toggle off the GST option.',
              },
              {
                q: 'What\'s the difference between a quote and an invoice?',
                a: 'A quote is sent before the work begins — it\'s an offer showing what you\'ll deliver and at what price. An invoice is sent after delivering the work, requesting payment.',
              },
              {
                q: 'Is this data saved anywhere?',
                a: 'No. All data lives only in your browser\'s local storage. Nothing is sent to our servers. Clearing your browser data will reset the form.',
              },
              {
                q: 'Can I use this quote as a legal contract?',
                a: 'A signed quotation can serve as a basic agreement, but for stronger legal protection use our Freelance Contract Generator which includes IP clauses, revision limits, termination terms, and governing law.',
              },
            ].map(({ q, a }) => (
              <details key={q} className="bg-white rounded-xl border border-gray-100 p-5 group">
                <summary className="font-semibold text-gray-900 cursor-pointer select-none list-none flex justify-between items-center">
                  {q}
                  <ChevronDown size={16} className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
                </summary>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upsell ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#101828] py-14 px-4 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-3">Want more?</p>
          <h2 className="text-3xl font-bold mb-4">Stop juggling tabs. Run your freelance business in one place.</h2>
          <p className="text-gray-400 mb-8 text-base max-w-xl mx-auto">
            ClearWork goes beyond quotes — send proposals, collect e-signatures on contracts, generate GST invoices, and collect Razorpay payments. Built for Indian freelancers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://app.getclearwork.in/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-xl px-6 py-3 font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              Get started free <ArrowRight size={16} />
            </a>
            <Link
              to="/tools/freelance-contract-generator"
              className="inline-flex items-center gap-2 border border-white/20 text-white rounded-xl px-6 py-3 font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              Try Contract Generator
            </Link>
          </div>
        </div>
      </section>

      <OtherToolsSection currentHref="/tools/quote-generator" />

      {/* ── JSON-LD ─────────────────────────────────────────────────────────── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Free Quote Generator for Indian Freelancers — ClearWork',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Create professional quotations with line items, GST, validity period and download a PDF. Free, no signup.',
        url: 'https://getclearwork.in/tools/quote-generator',
      }) }} />
    </div>
  )
}
