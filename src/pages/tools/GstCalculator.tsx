import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Plus, Shield, Zap, IndianRupee, Calculator, Copy, Check,
  ArrowDownRight, ArrowUpRight,
} from 'lucide-react'
import { INDIAN_STATES, GST_RATES, fmtINR } from '../../lib/gst'
import { useSeo } from '../../lib/useSeo'

type Mode = 'add' | 'remove'

const STORAGE_KEY = 'clearwork-gst-calc-state'

interface CalcInput {
  mode:        Mode
  amount:      string  // string so empty doesn't render NaN
  rate:        number
  showStates:  boolean
  sellerState: string
  buyerState:  string
}

function defaults(): CalcInput {
  return {
    mode:        'add',
    amount:      '',
    rate:        18,
    showStates:  false,
    sellerState: '',
    buyerState:  '',
  }
}

function loadState(): CalcInput {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaults(), ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return defaults()
}

export default function GstCalculator() {
  useSeo(
    'Free GST Calculator (India) — CGST/SGST/IGST instant split | ClearWork',
    'Calculate GST instantly in India. Add or remove GST from any amount. CGST/SGST/IGST auto-split by state. Free, no signup, works offline.',
    'https://getclearwork.in/tools/gst-calculator',
  )

  const [input, setInput] = useState<CalcInput>(loadState)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(input)) } catch { /* ignore */ }
  }, [input])

  const result = useMemo(() => {
    const amt = Number(input.amount) || 0
    const rate = Number(input.rate)  || 0
    const sameState = !!input.sellerState && !!input.buyerState && input.sellerState === input.buyerState

    let base: number, gst: number, total: number

    if (input.mode === 'add') {
      base  = amt
      gst   = amt * (rate / 100)
      total = amt + gst
    } else {
      // amt is inclusive total → derive base
      total = amt
      base  = rate === 0 ? amt : amt / (1 + rate / 100)
      gst   = total - base
    }

    const cgst = sameState ? gst / 2 : 0
    const sgst = sameState ? gst / 2 : 0
    const igst = sameState ? 0 : gst

    return { base, gst, total, cgst, sgst, igst, sameState, hasInput: amt > 0 }
  }, [input])

  function set<K extends keyof CalcInput>(key: K, value: CalcInput[K]) {
    setInput(prev => ({ ...prev, [key]: value }))
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
            name:       'Free GST Calculator',
            applicationCategory: 'FinanceApplication',
            operatingSystem:     'Web',
            description:         'Calculate GST instantly. Add or remove GST from any amount. Auto CGST/SGST/IGST split by state.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
            audience: { '@type': 'Audience', audienceType: 'Indian freelancers and small businesses' },
          }),
        }}
      />

      <Hero />

      {/* ── Calculator ──────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-2xl mx-auto px-5">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            {/* Mode toggle */}
            <div className="grid grid-cols-2 border-b border-gray-100">
              <ModeButton
                active={input.mode === 'add'}
                onClick={() => set('mode', 'add')}
                icon={ArrowUpRight}
                label="Add GST"
                hint="Amount is exclusive of GST"
              />
              <ModeButton
                active={input.mode === 'remove'}
                onClick={() => set('mode', 'remove')}
                icon={ArrowDownRight}
                label="Remove GST"
                hint="Amount is inclusive of GST"
              />
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              {/* Amount */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  {input.mode === 'add' ? 'Amount before GST' : 'Total amount (inclusive of GST)'}
                </label>
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

              {/* GST rate */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">GST rate</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {GST_RATES.map(r => (
                    <button
                      key={r}
                      onClick={() => set('rate', r)}
                      className={`py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                        input.rate === r
                          ? 'bg-gray-950 text-white'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Show state split toggle */}
              <button
                onClick={() => set('showStates', !input.showStates)}
                className="flex items-center gap-2 text-[12.5px] font-semibold text-gray-500 hover:text-gray-800 transition-colors"
              >
                <span className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                  input.showStates ? 'bg-gray-950 border-gray-950' : 'border-gray-300'
                }`}>
                  {input.showStates && <Check size={10} className="text-white" strokeWidth={3} />}
                </span>
                Show CGST / SGST / IGST split (optional)
              </button>

              {input.showStates && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl bg-gray-50/60 border border-gray-200 p-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Your state</label>
                    <StateSelect value={input.sellerState} onChange={v => set('sellerState', v)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Client state</label>
                    <StateSelect value={input.buyerState} onChange={v => set('buyerState', v)} />
                  </div>
                </div>
              )}
            </div>

            {/* Result */}
            <div className="border-t border-gray-100 bg-gray-50/40 p-5 sm:p-6">
              <ResultRow
                label={input.mode === 'add' ? 'Base amount' : 'Amount before GST'}
                value={result.base}
                muted
                hasInput={result.hasInput}
              />

              {input.showStates && input.sellerState && input.buyerState ? (
                result.sameState ? (
                  <>
                    <ResultRow label={`CGST @ ${input.rate / 2}%`} value={result.cgst} muted hasInput={result.hasInput} />
                    <ResultRow label={`SGST @ ${input.rate / 2}%`} value={result.sgst} muted hasInput={result.hasInput} />
                  </>
                ) : (
                  <ResultRow label={`IGST @ ${input.rate}%`} value={result.igst} muted hasInput={result.hasInput} />
                )
              ) : (
                <ResultRow label={`GST @ ${input.rate}%`} value={result.gst} muted hasInput={result.hasInput} />
              )}

              <div className="border-t border-gray-200 mt-3 pt-3">
                <ResultRow
                  label={input.mode === 'add' ? 'Total (inclusive of GST)' : 'GST extracted'}
                  value={input.mode === 'add' ? result.total : result.gst}
                  bold
                  hasInput={result.hasInput}
                  copyable
                />
              </div>

              {input.showStates && result.hasInput && (
                <p className="text-[11.5px] text-gray-500 mt-3 italic">
                  {result.sameState
                    ? `Same state (${INDIAN_STATES.find(s => s.code === input.sellerState)?.name}) → CGST + SGST`
                    : !input.sellerState || !input.buyerState
                    ? 'Pick both states to see CGST/SGST vs IGST'
                    : 'Different states → IGST only'}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Upsell />
      <FAQ />
    </>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ModeButton({
  active, onClick, icon: Icon, label, hint,
}: {
  active: boolean
  onClick: () => void
  icon: React.ElementType
  label: string
  hint:  string
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3.5 transition-colors text-left ${
        active ? 'bg-white' : 'bg-gray-50 hover:bg-white/60'
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon size={14} className={active ? 'text-gray-900' : 'text-gray-400'} strokeWidth={2.5} />
        <span className={`text-sm font-bold ${active ? 'text-gray-900' : 'text-gray-500'}`}>{label}</span>
      </div>
      <p className={`text-[11px] mt-0.5 ${active ? 'text-gray-500' : 'text-gray-400'}`}>{hint}</p>
    </button>
  )
}

function StateSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
    >
      <option value="">Select state</option>
      {INDIAN_STATES.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
    </select>
  )
}

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
      <span className={`${bold ? 'text-[13.5px] font-bold text-gray-900' : 'text-[13px] text-gray-600'}`}>
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className={`tabular-nums ${
          bold ? 'text-[20px] font-extrabold text-gray-900' :
          muted ? 'text-[14px] text-gray-700 font-medium' :
          'text-[14px] font-semibold text-gray-900'
        }`}>
          {display}
        </span>
        {copyable && hasInput && (
          <button
            onClick={copy}
            title="Copy to clipboard"
            className="text-gray-300 hover:text-gray-700 transition-colors p-1 -mr-1"
          >
            {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative pt-28 pb-10 sm:pb-14 overflow-hidden bg-white">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-emerald-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 relative z-10 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-600 shadow-sm mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Free GST Calculator
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-gray-950 leading-[1.05]">
          GST in seconds.
          <br />
          <span className="text-gray-400">Add it, remove it, split it.</span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          Add GST to your quote, or work backwards from an inclusive amount.
          Auto CGST/SGST/IGST split by state. Live as you type.
        </p>

        <div className="mt-7 flex flex-wrap justify-center items-center gap-x-6 gap-y-2.5">
          {[
            { icon: Shield,      label: 'No signup, ever' },
            { icon: Calculator,  label: 'Add + remove modes' },
            { icon: IndianRupee, label: 'CGST/SGST/IGST split' },
            { icon: Zap,         label: 'Works offline' },
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
    { title: 'Calculate AND invoice in one click',  desc: 'Skip the calculator entirely — ClearWork auto-applies GST when you generate any invoice, including the right CGST/SGST/IGST split.' },
    { title: 'GSTIN once, never again',             desc: 'Save your GSTIN, address, and state once. Every invoice for every client auto-fills the right tax structure.' },
    { title: 'Quarter-end GST report for your CA',  desc: 'One-click GST summary export — CGST, SGST, IGST collected, GSTR-1 ready format. Saves hours every quarter.' },
    { title: 'TDS handled too',                     desc: 'Indian freelancer-specific: 194J/194C TDS auto-calculated on invoices. CA-friendly.' },
    { title: 'See your tax liability live',         desc: 'Dashboard shows running GST collected this quarter so you know what to set aside. No surprises at filing time.' },
    { title: 'Razorpay + UPI built-in',             desc: 'Send invoice with embedded payment link. Client pays via UPI, card, or net banking — and ClearWork auto-marks paid.' },
  ]

  return (
    <section className="py-16 sm:py-20 bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-white/80 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Doing this for every invoice?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Stop calculating. Start sending.
            <br />
            <span className="text-gray-400">ClearWork does the math, the invoice, and the chase-ups.</span>
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
    q: 'How does this GST calculator work?',
    a: 'Pick a mode — "Add GST" if your amount is before tax, or "Remove GST" if your amount already includes tax. Enter the amount and pick a GST rate. The calculator instantly shows the base, the GST amount, and the total. Optionally pick the seller and buyer states to see CGST/SGST (same-state) or IGST (cross-state) breakdown.',
  },
  {
    q: 'When do I use 5%, 12%, 18%, or 28%?',
    a: 'Most freelance and IT services in India fall under 18% GST. 5% applies to certain essentials (e.g. transport, small restaurants), 12% to specific categories (e.g. processed food, business-class flights), and 28% to luxury/sin items (cars, tobacco). For freelancer services like design, consulting, development, content writing, marketing — the standard rate is 18%.',
  },
  {
    q: 'CGST + SGST vs IGST — what is the difference?',
    a: 'When the seller and the buyer are in the same Indian state, GST is split into two halves: CGST (Central GST, paid to the central government) and SGST (State GST, paid to the state government). When the seller and buyer are in different states, the full GST is charged as IGST (Integrated GST). The total tax is the same — only the split differs. This calculator picks the right structure automatically once you enter both states.',
  },
  {
    q: 'I received ₹59,000 inclusive of 18% GST — what is the base?',
    a: 'Switch to "Remove GST" mode and enter 59000. The calculator shows the base amount (~₹50,000) and the GST extracted (~₹9,000). Formula: base = total / (1 + rate/100), so 59000 / 1.18 = 50000. Use this when the price you quoted to the client was tax-inclusive.',
  },
  {
    q: 'Do I need to register for GST as a freelancer?',
    a: 'GST registration is mandatory once your annual turnover exceeds ₹20 lakh (₹10 lakh for special-category states like the North-East). Below that, you can choose to remain unregistered and skip GST on your invoices. If you work with corporate clients who insist on a GSTIN-bearing invoice, you may need to register voluntarily.',
  },
  {
    q: 'Is this calculator accurate? Can I rely on it for filing?',
    a: 'Yes — the math is straightforward percentage arithmetic, identical to what your accounting software or CA would do. For your actual GST return filing (GSTR-1, GSTR-3B), use the values from your invoices, not from this calculator. This tool is for quick estimates while quoting or invoicing.',
  },
  {
    q: 'Does ClearWork do this automatically inside invoices?',
    a: 'Yes — ClearWork auto-applies GST on every invoice you create, picks CGST/SGST/IGST based on your state and the client\'s state, embeds a Razorpay UPI payment link, and ships the invoice via email + WhatsApp. There is a free plan. Sign up via the home page.',
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
