import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Plus, Shield, Zap, IndianRupee, Calculator, Copy, Check,
  AlertCircle,
} from 'lucide-react'
import { fmtINR } from '../../lib/gst'
import { useSeo } from '../../lib/useSeo'

interface TdsSection {
  code:        string
  rate:        number
  rateNoPan:   number
  label:       string
  description: string
  threshold:   { single?: number; aggregate?: number; perMonth?: number }
}

const SECTIONS: TdsSection[] = [
  {
    code: '194J',
    rate: 10,
    rateNoPan: 20,
    label: '194J — Professional / technical services',
    description: 'Most common for freelancers — design, consulting, IT, content, legal, accounting, architecture.',
    threshold: { single: 30_000, aggregate: 30_000 },
  },
  {
    code: '194JA',
    rate: 2,
    rateNoPan: 20,
    label: '194JA — Technical services (lower rate)',
    description: 'For purely technical services where the freelancer is not a "professional" by definition.',
    threshold: { single: 30_000, aggregate: 30_000 },
  },
  {
    code: '194JB',
    rate: 10,
    rateNoPan: 20,
    label: '194JB — Royalty or fees for technical services',
    description: 'For royalty-based payments, software licensing, certain IP arrangements.',
    threshold: { single: 30_000, aggregate: 30_000 },
  },
  {
    code: '194C-IND',
    rate: 1,
    rateNoPan: 20,
    label: '194C — Contract work (individual / HUF)',
    description: 'Pure contract work — printing, manufacturing, transport, advertising contracts (not professional fees).',
    threshold: { single: 30_000, aggregate: 1_00_000 },
  },
  {
    code: '194C-OTH',
    rate: 2,
    rateNoPan: 20,
    label: '194C — Contract work (companies, firms)',
    description: 'Same as 194C above, but when the deductee is a company / firm rather than an individual or HUF.',
    threshold: { single: 30_000, aggregate: 1_00_000 },
  },
  {
    code: '194-IB',
    rate: 5,
    rateNoPan: 20,
    label: '194-IB — Rent above ₹50,000 / month',
    description: 'For tenants paying monthly rent above ₹50,000. Deduction is once a year (March or end of tenancy).',
    threshold: { perMonth: 50_000 },
  },
  {
    code: 'CUSTOM',
    rate: 10,
    rateNoPan: 20,
    label: 'Custom rate',
    description: 'Use this if your section is not listed. Set the rate manually.',
    threshold: {},
  },
]

const STORAGE_KEY = 'clinekt-tds-calc-state'

interface TdsInput {
  amount:       string
  sectionCode:  string
  customRate:   number
  panProvided:  boolean
}

function defaults(): TdsInput {
  return { amount: '', sectionCode: '194J', customRate: 10, panProvided: true }
}

function loadState(): TdsInput {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaults(), ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return defaults()
}

export default function TdsCalculator() {
  useSeo(
    'Free TDS Calculator (India) — 194J / 194C / freelance | Clinekt',
    'Calculate TDS deduction for Indian freelancers and contractors. Section 194J, 194C, 194JA and more. Free, instant, no signup.',
  )

  const [input, setInput] = useState<TdsInput>(loadState)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(input)) } catch { /* ignore */ }
  }, [input])

  const section = SECTIONS.find(s => s.code === input.sectionCode) ?? SECTIONS[0]
  const isCustom = section.code === 'CUSTOM'

  const result = useMemo(() => {
    const amt = Number(input.amount) || 0
    const rate = isCustom
      ? (input.panProvided ? input.customRate : 20)
      : (input.panProvided ? section.rate : section.rateNoPan)

    // Threshold check
    let belowThreshold = false
    let thresholdNote = ''
    if (section.threshold.single && amt < section.threshold.single) {
      belowThreshold = true
      thresholdNote = `Below the ₹${fmtINR(section.threshold.single)} per-payment threshold — no TDS applicable`
    }

    const tds = amt * (rate / 100)
    const net = amt - tds

    return { rate, tds, net, belowThreshold, thresholdNote, hasInput: amt > 0 }
  }, [input, section, isCustom])

  function set<K extends keyof TdsInput>(key: K, value: TdsInput[K]) {
    setInput(prev => ({ ...prev, [key]: value }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'SoftwareApplication',
            name:       'Free TDS Calculator',
            applicationCategory: 'FinanceApplication',
            operatingSystem:     'Web',
            description:         'Calculate TDS for Indian freelancers and contractors. Section 194J, 194C, 194JA and more.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
            audience: { '@type': 'Audience', audienceType: 'Indian freelancers and contractors' },
          }),
        }}
      />

      <Hero />

      {/* ── Calculator ──────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-2xl mx-auto px-5">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            <div className="p-5 sm:p-6 space-y-5">
              {/* Amount */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Gross payment amount</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-medium">₹</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="any"
                    value={input.amount}
                    onChange={e => set('amount', e.target.value)}
                    placeholder="50,000"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-lg font-semibold text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
                    autoFocus
                  />
                </div>
              </div>

              {/* Section */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">TDS section</label>
                <select
                  value={input.sectionCode}
                  onChange={e => set('sectionCode', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
                >
                  {SECTIONS.map(s => (
                    <option key={s.code} value={s.code}>{s.label} ({s.code === 'CUSTOM' ? 'set rate' : `${s.rate}%`})</option>
                  ))}
                </select>
                <p className="text-[12px] text-gray-500 mt-2 leading-relaxed">{section.description}</p>
              </div>

              {/* Custom rate */}
              {isCustom && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">TDS rate (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    step={0.1}
                    value={input.customRate}
                    onChange={e => set('customRate', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
                  />
                </div>
              )}

              {/* PAN toggle */}
              <button
                onClick={() => set('panProvided', !input.panProvided)}
                className="flex items-start gap-2 text-[12.5px] font-semibold text-gray-500 hover:text-gray-800 transition-colors text-left w-full"
              >
                <span className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors mt-0.5 shrink-0 ${
                  input.panProvided ? 'bg-gray-950 border-gray-950' : 'border-gray-300'
                }`}>
                  {input.panProvided && <Check size={10} className="text-white" strokeWidth={3} />}
                </span>
                <span>
                  PAN provided to client
                  <span className="block text-[11.5px] text-gray-400 font-normal mt-0.5">
                    Uncheck if PAN is missing — TDS jumps to flat 20% under section 206AA
                  </span>
                </span>
              </button>
            </div>

            {/* Result */}
            <div className="border-t border-gray-100 bg-gray-50/40 p-5 sm:p-6">
              {result.belowThreshold && result.hasInput ? (
                <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-2">
                  <AlertCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" strokeWidth={2.2} />
                  <div>
                    <p className="text-[12.5px] font-semibold text-emerald-700">No TDS deduction</p>
                    <p className="text-[11.5px] text-emerald-700/80 mt-0.5">{result.thresholdNote}</p>
                  </div>
                </div>
              ) : null}

              <ResultRow label="Gross amount" value={Number(input.amount) || 0} muted hasInput={result.hasInput} />
              <ResultRow
                label={`TDS @ ${result.rate}%${!input.panProvided && result.hasInput ? ' (no PAN)' : ''}`}
                value={result.belowThreshold ? 0 : result.tds}
                muted
                hasInput={result.hasInput}
              />
              <div className="border-t border-gray-200 mt-3 pt-3">
                <ResultRow
                  label="Net amount you receive"
                  value={result.belowThreshold ? (Number(input.amount) || 0) : result.net}
                  bold
                  hasInput={result.hasInput}
                  copyable
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Upsell />
      <FAQ />
    </>
  )
}

// ─── Result row ──────────────────────────────────────────────────────────────

function ResultRow({
  label, value, bold = false, muted = false, copyable = false, hasInput,
}: {
  label:    string
  value:    number
  bold?:    boolean
  muted?:   boolean
  copyable?: boolean
  hasInput: boolean
}) {
  const [copied, setCopied] = useState(false)
  const display = hasInput ? `₹${fmtINR(value)}` : '—'

  async function copy() {
    if (!hasInput) return
    try {
      await navigator.clipboard.writeText(value.toFixed(2))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { /* ignore */ }
  }

  return (
    <div className="flex items-baseline justify-between py-1">
      <span className={`${bold ? 'text-[13.5px] font-bold text-gray-900' : 'text-[13px] text-gray-600'}`}>{label}</span>
      <div className="flex items-center gap-2">
        <span className={`tabular-nums ${
          bold ? 'text-[20px] font-extrabold text-gray-900' :
          muted ? 'text-[14px] text-gray-700 font-medium' :
          'text-[14px] font-semibold text-gray-900'
        }`}>{display}</span>
        {copyable && hasInput && (
          <button onClick={copy} title="Copy to clipboard" className="text-gray-300 hover:text-gray-700 transition-colors p-1 -mr-1">
            {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative pt-28 pb-10 sm:pb-14 overflow-hidden bg-white">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-50/60 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto px-5 relative z-10 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-600 shadow-sm mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Free TDS Calculator
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-gray-950 leading-[1.05]">
          TDS deduction in seconds.
          <br />
          <span className="text-gray-400">194J, 194C, every section.</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          Find out exactly what your client will deduct — and what hits your bank account. Built for Indian freelancers and small businesses.
        </p>
        <div className="mt-7 flex flex-wrap justify-center items-center gap-x-6 gap-y-2.5">
          {[
            { icon: Shield,      label: 'No signup, ever' },
            { icon: Calculator,  label: 'All TDS sections' },
            { icon: IndianRupee, label: 'PAN / no-PAN handled' },
            { icon: Zap,         label: 'Threshold detection' },
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

// ─── Upsell ──────────────────────────────────────────────────────────────────

function Upsell() {
  const reasons = [
    { title: 'TDS auto-calculated on every invoice',     desc: 'Clinekt picks the right section and rate for your work, applies it correctly, and shows the net you\'ll actually receive — no calculator needed.' },
    { title: 'Form 16A reconciliation',                  desc: 'Track which clients have deposited the TDS they deducted. Match against your Form 26AS at filing time. Save your CA hours of grunt work.' },
    { title: 'Quarter-end TDS summary',                  desc: 'One-click export of all TDS deducted from you this quarter, by section and by client. CA-ready PDF.' },
    { title: 'Send invoices that show TDS clearly',      desc: 'Clients see "Gross ₹50,000 − TDS ₹5,000 = Net ₹45,000" right on the invoice. No confusion, no follow-ups.' },
    { title: 'GST and TDS together',                     desc: 'GST + CGST/SGST/IGST + TDS — all calculated correctly and reflected on the invoice. Indian-specific, none of the US tools handle this.' },
    { title: 'Razorpay + UPI built in',                  desc: 'Send invoice with embedded payment link. Client pays the post-TDS amount directly via UPI, card, or net banking.' },
  ]

  return (
    <section className="py-16 sm:py-20 bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-white/80 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Doing this for every client?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Stop calculating TDS by hand.
            <br />
            <span className="text-gray-400">Clinekt does it on every invoice automatically.</span>
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
            Try Clinekt free
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
    q: 'What is TDS and why does my client deduct it?',
    a: 'TDS = Tax Deducted at Source. The Income Tax Act requires the payer (your client) to deduct a small percentage of certain payments and deposit it with the government on your behalf. You then claim that amount back when you file your annual return — your final tax liability is reduced by what was already paid as TDS.',
  },
  {
    q: 'Which TDS section applies to freelance work?',
    a: 'Most freelancers fall under section 194J (Professional / technical services) at 10%. This covers design, consulting, IT, content, legal, accounting, architecture, medical and other professional services. If your work is pure contract work (printing, manufacturing, transport, advertising contracts), 194C applies at 1% (individuals/HUF) or 2% (companies/firms).',
  },
  {
    q: 'What if my payment is below ₹30,000?',
    a: 'For section 194J, TDS is only deducted if a single payment exceeds ₹30,000 OR your total annual receipts from that client exceed ₹30,000. Below those limits, no TDS is deducted. For 194C, the threshold is ₹30,000 per payment OR ₹1,00,000 aggregate per year.',
  },
  {
    q: 'I do not have a PAN. How does that change things?',
    a: 'Under section 206AA, if you do not provide a valid PAN to your client, TDS is deducted at a flat 20% — regardless of which section applies. Always provide your PAN. There is no benefit to withholding it.',
  },
  {
    q: 'How do I get the TDS deducted back?',
    a: 'Three steps: (1) Your client files a TDS return (Form 26Q) and issues you Form 16A as proof. (2) The TDS amount appears in your Form 26AS / AIS on the income tax portal. (3) When you file your ITR, you claim the TDS as already-paid tax — your tax liability gets reduced by that amount, and any excess is refunded.',
  },
  {
    q: 'My client deducted but I cannot see it in 26AS — what now?',
    a: 'Ask your client for their TAN, the date of TDS deduction, and Form 16A. If the deduction is not showing in 26AS, the client likely has not filed their TDS return yet — TDS returns are quarterly (due 31 Jul / 31 Oct / 31 Jan / 31 May). If the deadline has passed and it is still missing, escalate to the client. Worst case, you can flag this in your ITR and the IT department will reconcile.',
  },
  {
    q: 'Is TDS the same as GST?',
    a: 'No, completely separate. GST is an indirect tax on the value of your services (typically 18%) — you charge it to the client and remit it to the government. TDS is a direct tax on your income that the client pre-pays on your behalf. A typical freelance invoice has both: gross + GST = invoice total, then minus TDS = what the client actually pays you.',
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
