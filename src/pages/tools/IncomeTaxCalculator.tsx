import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Plus, Shield, Zap, IndianRupee, Calculator, Copy, Check,
  TrendingDown, TrendingUp,
} from 'lucide-react'
import { fmtINR } from '../../lib/gst'
import { useSeo } from '../../lib/useSeo'
import { compute, type ComputeResult, type OldRegimeDeductions, type Regime } from '../../lib/incomeTax'

type Mode = 'new' | 'old' | 'compare'

const STORAGE_KEY = 'clearwork-income-tax-state'

interface Input {
  mode:   Mode
  income: string

  // Old regime deductions
  d80c:     string
  d80d:     string
  d80ccd1b: string
  hra:      string
  homeLoan: string
  other:    string
}

function defaults(): Input {
  return {
    mode:    'new',
    income:  '',
    d80c:    '',
    d80d:    '',
    d80ccd1b:'',
    hra:     '',
    homeLoan:'',
    other:   '',
  }
}

function loadState(): Input {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaults(), ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return defaults()
}

function asDeductions(input: Input): OldRegimeDeductions {
  return {
    d80c:     Number(input.d80c)     || 0,
    d80d:     Number(input.d80d)     || 0,
    d80ccd1b: Number(input.d80ccd1b) || 0,
    hra:      Number(input.hra)      || 0,
    homeLoan: Number(input.homeLoan) || 0,
    other:    Number(input.other)    || 0,
  }
}

export default function IncomeTaxCalculator() {
  useSeo(
    'Income Tax Calculator FY 2025-26 — Old vs New Regime | ClearWork',
    'Calculate income tax for FY 2025-26 (AY 2026-27). Compare old and new regime side-by-side. Free, instant, no signup. Built for Indian freelancers and salaried professionals.',
  )

  const [input, setInput] = useState<Input>(loadState)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(input)) } catch { /* ignore */ }
  }, [input])

  const incomeNum = Number(input.income) || 0
  const showOldDeductions = input.mode === 'old' || input.mode === 'compare'

  const newResult = useMemo(() => compute(incomeNum, 'new'), [incomeNum])
  const oldResult = useMemo(() => compute(incomeNum, 'old', asDeductions(input)), [incomeNum, input])

  function set<K extends keyof Input>(key: K, value: Input[K]) {
    setInput(prev => ({ ...prev, [key]: value }))
  }

  const hasInput = incomeNum > 0
  const better: Regime = hasInput && oldResult.totalTax < newResult.totalTax ? 'old' : 'new'
  const savings = hasInput ? Math.abs(oldResult.totalTax - newResult.totalTax) : 0

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'SoftwareApplication',
            name:       'Income Tax Calculator FY 2025-26',
            applicationCategory: 'FinanceApplication',
            operatingSystem:     'Web',
            description:         'Calculate income tax for FY 2025-26 (AY 2026-27). Compare old and new regime.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
            audience: { '@type': 'Audience', audienceType: 'Indian taxpayers, freelancers and salaried professionals' },
          }),
        }}
      />

      <Hero />

      {/* ── Calculator ──────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-5">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            {/* Mode toggle */}
            <div className="grid grid-cols-3 border-b border-gray-100">
              <ModeButton active={input.mode === 'new'}     onClick={() => set('mode', 'new')}     label="New regime" />
              <ModeButton active={input.mode === 'old'}     onClick={() => set('mode', 'old')}     label="Old regime" />
              <ModeButton active={input.mode === 'compare'} onClick={() => set('mode', 'compare')} label="Compare both" />
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              {/* Income */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Annual gross income</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-medium">₹</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="any"
                    value={input.income}
                    onChange={e => set('income', e.target.value)}
                    placeholder="15,00,000"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-lg font-semibold text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
                    autoFocus
                  />
                </div>
                <p className="text-[11.5px] text-gray-400 mt-1.5">
                  Salary + freelance income + any other taxable income before deductions
                </p>
              </div>

              {/* Old regime deductions */}
              {showOldDeductions && (
                <div className="rounded-xl bg-gray-50/60 border border-gray-200 p-4 space-y-3">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Old regime deductions</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <DeductionField label="80C (PPF, ELSS, LIC)"     hint="Max ₹1,50,000"  value={input.d80c}     onChange={v => set('d80c', v)} />
                    <DeductionField label="80D (Health insurance)"   hint="Max ₹75,000"    value={input.d80d}     onChange={v => set('d80d', v)} />
                    <DeductionField label="80CCD(1B) — NPS extra"    hint="Max ₹50,000"    value={input.d80ccd1b} onChange={v => set('d80ccd1b', v)} />
                    <DeductionField label="HRA exempted"             hint="If salaried"    value={input.hra}      onChange={v => set('hra', v)} />
                    <DeductionField label="Home loan interest (24)"  hint="Max ₹2,00,000"  value={input.homeLoan} onChange={v => set('homeLoan', v)} />
                    <DeductionField label="Other (80E, 80G, etc.)"   hint=""               value={input.other}    onChange={v => set('other', v)} />
                  </div>
                  <p className="text-[11.5px] text-gray-400">Standard deduction of ₹50,000 is auto-applied for old regime; ₹75,000 for new.</p>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="border-t border-gray-100 bg-gray-50/40 p-5 sm:p-6">
              {input.mode === 'compare' ? (
                <CompareResults newR={newResult} oldR={oldResult} hasInput={hasInput} better={better} savings={savings} />
              ) : (
                <SingleResult result={input.mode === 'new' ? newResult : oldResult} hasInput={hasInput} />
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

// ─── Sub-components ──────────────────────────────────────────────────────────

function ModeButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3.5 transition-colors text-center text-sm font-bold ${
        active ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-500 hover:bg-white/60'
      }`}
    >
      {label}
    </button>
  )
}

function DeductionField({ label, hint, value, onChange }: { label: string; hint: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[11.5px] font-semibold text-gray-500 mb-1">
        {label} {hint && <span className="text-gray-400 font-normal">· {hint}</span>}
      </label>
      <div className="relative">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="0"
          className="w-full pl-7 pr-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
        />
      </div>
    </div>
  )
}

function SingleResult({ result, hasInput }: { result: ComputeResult; hasInput: boolean }) {
  return (
    <div className="space-y-1">
      <ResultRow label="Gross income"        value={result.grossIncome}      muted hasInput={hasInput} />
      <ResultRow label="Total deductions"    value={result.totalDeductions}  muted hasInput={hasInput} />
      <ResultRow label="Taxable income"      value={result.taxableIncome}    muted hasInput={hasInput} />
      <div className="border-t border-gray-200 mt-2 pt-2 space-y-1">
        <ResultRow label="Slab tax"          value={result.slabTax}          muted hasInput={hasInput} />
        {result.rebate > 0 && <ResultRow label="− 87A rebate" value={result.rebate} muted hasInput={hasInput} />}
        {result.surcharge > 0 && (
          <ResultRow label={`Surcharge @ ${result.surchargeRate}%`} value={result.surcharge} muted hasInput={hasInput} />
        )}
        <ResultRow label="Cess @ 4%"         value={result.cess}             muted hasInput={hasInput} />
      </div>
      <div className="border-t border-gray-200 mt-3 pt-3">
        <ResultRow label="Total tax"         value={result.totalTax}         bold  hasInput={hasInput} copyable />
        <ResultRow label={`Effective rate (${result.effectiveRate.toFixed(1)}%)`} value={0} hasInput={false} hidden />
        <ResultRow label="Take-home"         value={result.takeHome}         bold2 hasInput={hasInput} />
      </div>
    </div>
  )
}

function CompareResults({
  newR, oldR, hasInput, better, savings,
}: {
  newR: ComputeResult
  oldR: ComputeResult
  hasInput: boolean
  better: Regime
  savings: number
}) {
  return (
    <div className="space-y-4">
      {hasInput && (
        <div className={`flex items-start gap-2.5 rounded-xl p-4 ${
          better === 'new'
            ? 'bg-emerald-50 border border-emerald-200'
            : 'bg-amber-50 border border-amber-200'
        }`}>
          {better === 'new' ? (
            <TrendingDown size={14} className="text-emerald-600 shrink-0 mt-0.5" strokeWidth={2.5} />
          ) : (
            <TrendingUp size={14} className="text-amber-700 shrink-0 mt-0.5" strokeWidth={2.5} />
          )}
          <div>
            <p className={`text-[12.5px] font-bold ${better === 'new' ? 'text-emerald-700' : 'text-amber-800'}`}>
              {better === 'new' ? 'New regime' : 'Old regime'} saves you ₹{fmtINR(savings)}
            </p>
            <p className="text-[11.5px] text-gray-600 mt-0.5">
              Based on your income and deductions. Switch to that regime when filing.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <CompareCard title="New regime" result={newR} hasInput={hasInput} winner={better === 'new'} />
        <CompareCard title="Old regime" result={oldR} hasInput={hasInput} winner={better === 'old'} />
      </div>
    </div>
  )
}

function CompareCard({ title, result, hasInput, winner }: { title: string; result: ComputeResult; hasInput: boolean; winner: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${winner && hasInput ? 'border-emerald-300 bg-emerald-50/40' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{title}</p>
        {winner && hasInput && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-600 text-white">BETTER</span>
        )}
      </div>
      <p className="text-[10.5px] text-gray-400 uppercase tracking-wide font-semibold">Total tax</p>
      <p className={`text-[20px] font-extrabold tabular-nums ${winner && hasInput ? 'text-emerald-700' : 'text-gray-900'}`}>
        {hasInput ? `₹${fmtINR(result.totalTax)}` : '—'}
      </p>
      <p className="text-[10.5px] text-gray-400 uppercase tracking-wide font-semibold mt-3">Take-home</p>
      <p className="text-[14px] font-bold text-gray-900 tabular-nums">
        {hasInput ? `₹${fmtINR(result.takeHome)}` : '—'}
      </p>
      <p className="text-[10.5px] text-gray-400 uppercase tracking-wide font-semibold mt-3">Effective rate</p>
      <p className="text-[13px] font-semibold text-gray-700 tabular-nums">
        {hasInput ? `${result.effectiveRate.toFixed(1)}%` : '—'}
      </p>
    </div>
  )
}

function ResultRow({
  label, value, bold = false, bold2 = false, muted = false, copyable = false, hasInput, hidden = false,
}: {
  label:    string
  value:    number
  bold?:    boolean
  bold2?:   boolean
  muted?:   boolean
  copyable?: boolean
  hasInput: boolean
  hidden?:  boolean
}) {
  const [copied, setCopied] = useState(false)
  if (hidden) return null
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
      <span className={`${bold || bold2 ? 'text-[13.5px] font-bold text-gray-900' : 'text-[13px] text-gray-600'}`}>{label}</span>
      <div className="flex items-center gap-2">
        <span className={`tabular-nums ${
          bold ? 'text-[20px] font-extrabold text-gray-900' :
          bold2 ? 'text-[16px] font-bold text-emerald-700' :
          muted ? 'text-[13.5px] text-gray-700 font-medium' :
          'text-[13.5px] font-semibold text-gray-900'
        }`}>{display}</span>
        {copyable && hasInput && (
          <button onClick={copy} title="Copy" className="text-gray-300 hover:text-gray-700 transition-colors p-1 -mr-1">
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
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-violet-50/60 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto px-5 relative z-10 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-600 shadow-sm mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Income Tax Calculator · FY 2025-26
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-gray-950 leading-[1.05]">
          Old vs new regime,
          <br />
          <span className="text-gray-400">side-by-side in seconds.</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          Plug in your income and deductions. See your tax under both regimes,
          including 87A rebate, surcharge, and 4% cess. Pick the one that saves you more.
        </p>
        <div className="mt-7 flex flex-wrap justify-center items-center gap-x-6 gap-y-2.5">
          {[
            { icon: Shield,      label: 'No signup, ever' },
            { icon: Calculator,  label: 'FY 2025-26 slabs' },
            { icon: IndianRupee, label: '87A rebate + cess' },
            { icon: Zap,         label: 'Compare regimes live' },
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
    { title: 'Track GST + TDS as you earn',           desc: 'ClearWork logs every invoice and the GST + TDS breakdown. At year-end, your taxable income is already tallied — no spreadsheet archaeology.' },
    { title: 'Quarterly GST returns made easy',       desc: 'Auto-aggregated GSTR-1-ready summary by quarter. Export to your CA in one click — they will love you for it.' },
    { title: 'See what you owe, before you owe it',   desc: 'Dashboard shows running tax liability, GST collected, and TDS already deducted. No surprises in March.' },
    { title: 'Form 26AS reconciliation',              desc: 'Track every TDS deduction your clients should have deposited. Match against your 26AS at filing time without spreadsheets.' },
    { title: 'Advance tax reminders',                 desc: 'Hits the 4 advance-tax due dates (15 Jun / 15 Sep / 15 Dec / 15 Mar) with reminders. No penalties for missing instalments.' },
    { title: 'CA-ready P&L',                          desc: 'Income, expenses, GST, TDS, depreciation — exported as a clean P&L PDF. Your CA finishes your ITR in half the time.' },
  ]

  return (
    <section className="py-16 sm:py-20 bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-white/80 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Tax filing should not be a March panic
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Run your year so April is boring.
            <br />
            <span className="text-gray-400">ClearWork keeps your books clean as you work.</span>
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
    q: 'Old regime vs new regime — which one should I pick?',
    a: 'It depends on your deductions. The new regime has lower slabs but almost no deductions allowed. The old regime has higher slabs but you can claim 80C, 80D, HRA, home loan interest, etc. Rule of thumb: if your total deductions (excluding standard deduction) are under ₹2-2.5 lakh, the new regime is usually better. Above that, old regime starts winning. The "Compare both" mode tells you exactly which is cheaper for your numbers.',
  },
  {
    q: 'What is the 87A rebate?',
    a: 'It is a tax rebate for low-to-middle income taxpayers. Under the new regime (FY 2025-26), if your taxable income is up to ₹12,00,000, you get a full rebate — meaning effectively zero tax. Under the old regime, the rebate caps out at ₹12,500 and only kicks in if taxable income is up to ₹5,00,000. This calculator applies both rebates automatically.',
  },
  {
    q: 'What is the standard deduction for FY 2025-26?',
    a: '₹75,000 under the new regime, ₹50,000 under the old. Auto-applied for salaried individuals AND pensioners. Freelancers / business owners do NOT get standard deduction — they deduct actual business expenses instead. This calculator assumes salary-side standard deduction; if you are a freelancer, treat your income as net of business expenses before entering it here.',
  },
  {
    q: 'How does surcharge work?',
    a: 'Surcharge is an additional tax on the tax itself, applicable to high-income taxpayers. Slabs for FY 2025-26: 10% if taxable income is ₹50L-1Cr, 15% if ₹1-2Cr, 25% if ₹2-5Cr, and 37% above ₹5Cr (old regime) or capped at 25% (new regime — one of the new regime\'s key advantages for high earners). This calculator applies the right slab automatically.',
  },
  {
    q: 'What is health and education cess?',
    a: '4% cess applied on top of (Tax + Surcharge), under both regimes. There is no way to reduce or avoid this — it is a flat 4% on whatever your tax liability is.',
  },
  {
    q: 'Can a freelancer use this calculator?',
    a: 'Yes — but with a caveat. Enter your NET income (after deducting business expenses) as "annual gross income" here. Freelancers do not get standard deduction, so technically the new regime\'s ₹75K standard deduction does not apply to you. The numbers will be slightly off (showing tax that is ₹15-25K too low). For exact freelance tax, deduct business expenses, then run this calculator with the result, then add back the standard deduction value (≈₹75K × your slab rate).',
  },
  {
    q: 'Are HRA, home loan interest, and other deductions included in the new regime?',
    a: 'No — under the new regime, you cannot claim 80C, 80D, HRA, home loan interest, NPS additional, education loan interest, or most other deductions. The only deduction available in the new regime is the standard ₹75,000 (for salaried only) and employer\'s NPS contribution under 80CCD(2). This is the trade-off for the lower slab rates.',
  },
  {
    q: 'Is this calculator accurate? Can I rely on it?',
    a: 'It is accurate for the standard cases that 95% of taxpayers fall into. Edge cases — capital gains taxed at special rates, lottery / crypto income, foreign income, multiple house properties, business losses, agricultural income — need a CA. For a simple salary or freelance income with standard deductions, this calculator matches the official IT department calculator to the rupee.',
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
