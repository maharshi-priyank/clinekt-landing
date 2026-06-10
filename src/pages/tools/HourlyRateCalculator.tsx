import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Plus, Shield, IndianRupee, Calculator, Copy, Check,
  Clock,
} from 'lucide-react'
import { fmtINR } from '../../lib/gst'
import { useSeo } from '../../lib/useSeo'
import { trackToolUsed } from '../../lib/analytics'
import { useSchemaOrg, breadcrumbSchema } from '../../lib/useSchemaOrg'

type Mode = 'monthly' | 'annual'

const STORAGE_KEY = 'clearwork-hourly-rate-state'

interface Input {
  mode:           Mode
  income:         string
  hoursPerWeek:   number
  weeksPerYear:   number
  bufferPercent:  number
  showWithGst:    boolean
  showAfterTds:   boolean
}

function defaults(): Input {
  return {
    mode:           'monthly',
    income:         '',
    hoursPerWeek:   40,
    weeksPerYear:   48,
    bufferPercent:  30,
    showWithGst:    false,
    showAfterTds:   false,
  }
}

function loadState(): Input {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaults(), ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return defaults()
}

export default function HourlyRateCalculator() {
  useSeo(
    'Hourly Rate Calculator for Indian freelancers — Free | ClearWork',
    'Find your ideal hourly rate based on your income target. Accounts for non-billable time, GST, and TDS. Built for Indian freelancers.',
    'https://getclearwork.in/tools/hourly-rate-calculator',
  )
  useEffect(() => { trackToolUsed('hourly_rate_calculator') }, [])
  useSchemaOrg(breadcrumbSchema([
    { name: 'Home',       item: 'https://getclearwork.in/' },
    { name: 'Free Tools', item: 'https://getclearwork.in/tools' },
    { name: 'Hourly Rate Calculator', item: 'https://getclearwork.in/tools/hourly-rate-calculator' },
  ]))

  const [input, setInput] = useState<Input>(loadState)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(input)) } catch { /* ignore */ }
  }, [input])

  const result = useMemo(() => {
    const incomeNum = Number(input.income) || 0
    const annualTarget = input.mode === 'monthly' ? incomeNum * 12 : incomeNum

    const grossHours = input.hoursPerWeek * input.weeksPerYear
    const billableHours = grossHours * (1 - input.bufferPercent / 100)

    const baseRate = billableHours > 0 ? annualTarget / billableHours : 0
    const rateWithGst = baseRate * 1.18
    // After 10% TDS (194J) — net rate the client effectively pays you AFTER deduction
    // i.e. the rate you'd need to quote so net = baseRate
    const grossedUpForTds = baseRate / 0.9

    return {
      annualTarget, grossHours, billableHours,
      baseRate, rateWithGst, grossedUpForTds,
      hasInput: incomeNum > 0,
    }
  }, [input])

  function set<K extends keyof Input>(key: K, value: Input[K]) {
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
            name:       'Hourly Rate Calculator for Freelancers',
            applicationCategory: 'BusinessApplication',
            operatingSystem:     'Web',
            description:         'Calculate your ideal freelance hourly rate based on income target. Accounts for non-billable time, GST, and TDS.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
            audience: { '@type': 'Audience', audienceType: 'Indian freelancers' },
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
              <ModeButton active={input.mode === 'monthly'} onClick={() => set('mode', 'monthly')} label="Monthly target" />
              <ModeButton active={input.mode === 'annual'}  onClick={() => set('mode', 'annual')}  label="Annual target" />
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              {/* Income target */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  {input.mode === 'monthly' ? 'How much do you want to earn per month?' : 'How much do you want to earn per year?'}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-medium">₹</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="any"
                    value={input.income}
                    onChange={e => set('income', e.target.value)}
                    placeholder={input.mode === 'monthly' ? '1,00,000' : '12,00,000'}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-lg font-semibold text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
                    autoFocus
                  />
                </div>
              </div>

              {/* Hours per week */}
              <SliderRow
                label="Hours you can work per week"
                value={input.hoursPerWeek}
                min={5} max={80} step={1}
                onChange={v => set('hoursPerWeek', v)}
                suffix="hrs/week"
              />

              {/* Weeks per year */}
              <SliderRow
                label="Working weeks per year (52 minus holidays / vacation)"
                value={input.weeksPerYear}
                min={20} max={52} step={1}
                onChange={v => set('weeksPerYear', v)}
                suffix="weeks/year"
              />

              {/* Buffer */}
              <SliderRow
                label="Non-billable time (admin, sales, learning, breaks)"
                value={input.bufferPercent}
                min={0} max={60} step={5}
                onChange={v => set('bufferPercent', v)}
                suffix="%"
                hint="Most freelancers spend 25-35% of work time on non-billable activities"
              />

              {/* Toggles */}
              <div className="flex flex-col gap-2.5">
                <CheckRow checked={input.showWithGst}  onChange={v => set('showWithGst', v)}  label="Show rate with 18% GST added" />
                <CheckRow checked={input.showAfterTds} onChange={v => set('showAfterTds', v)} label="Show rate grossed up to absorb 10% TDS" hint="What you should quote so your net (post-TDS) hits the calculated rate" />
              </div>
            </div>

            {/* Result */}
            <div className="border-t border-gray-100 bg-gray-50/40 p-5 sm:p-6">
              <ResultRow label="Annual target" value={result.annualTarget} muted hasInput={result.hasInput} />
              <ResultRow label={`Billable hours / year (${input.bufferPercent}% buffer)`} value={result.billableHours} muted hasInput={result.hasInput} unit="hrs" />

              <div className="border-t border-gray-200 mt-3 pt-3 space-y-1.5">
                <ResultRow label="Hourly rate" value={result.baseRate} bold hasInput={result.hasInput} copyable />
                {input.showWithGst && (
                  <ResultRow label="Rate with 18% GST" value={result.rateWithGst} muted hasInput={result.hasInput} />
                )}
                {input.showAfterTds && (
                  <ResultRow label="Quote this to net the above (after 10% TDS)" value={result.grossedUpForTds} muted hasInput={result.hasInput} />
                )}
              </div>

              {/* Project pricing samples */}
              {result.hasInput && result.baseRate > 0 && (
                <div className="mt-5 pt-5 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 mb-3">Quick project pricing</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { hours: 10,  label: '10 hr sprint' },
                      { hours: 40,  label: '40 hr project' },
                      { hours: 100, label: '100 hr retainer' },
                    ].map(p => (
                      <div key={p.label} className="rounded-xl bg-white border border-gray-200 p-3">
                        <p className="text-[10.5px] text-gray-400 uppercase tracking-wide font-semibold">{p.label}</p>
                        <p className="text-[15px] font-extrabold text-gray-900 mt-1 tabular-nums">₹{fmtINR(result.baseRate * p.hours)}</p>
                      </div>
                    ))}
                  </div>
                </div>
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

function SliderRow({
  label, value, min, max, step, onChange, suffix, hint,
}: {
  label:    string
  value:    number
  min:      number
  max:      number
  step:     number
  onChange: (v: number) => void
  suffix:   string
  hint?:    string
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="text-xs font-semibold text-gray-500">{label}</label>
        <span className="text-[13px] font-bold text-gray-900 tabular-nums">{value} <span className="text-[11px] text-gray-400 font-medium">{suffix}</span></span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-gray-900"
      />
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}

function CheckRow({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-start gap-2 text-[12.5px] font-semibold text-gray-500 hover:text-gray-800 transition-colors text-left w-full"
    >
      <span className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors mt-0.5 shrink-0 ${
        checked ? 'bg-gray-950 border-gray-950' : 'border-gray-300'
      }`}>
        {checked && <Check size={10} className="text-white" strokeWidth={3} />}
      </span>
      <span>
        {label}
        {hint && <span className="block text-[11.5px] text-gray-400 font-normal mt-0.5">{hint}</span>}
      </span>
    </button>
  )
}

function ResultRow({
  label, value, bold = false, muted = false, copyable = false, hasInput, unit = '₹',
}: {
  label:    string
  value:    number
  bold?:    boolean
  muted?:   boolean
  copyable?: boolean
  hasInput: boolean
  unit?:    string
}) {
  const [copied, setCopied] = useState(false)

  const display = !hasInput ? '—' :
    unit === 'hrs' ? `${Math.round(value).toLocaleString('en-IN')}` :
    `₹${fmtINR(value)}`

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
        }`}>{display}{unit === 'hrs' && hasInput && <span className="text-[11px] text-gray-400 font-medium ml-1">hrs</span>}</span>
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
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto px-5 relative z-10 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-600 shadow-sm mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Free Hourly Rate Calculator
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-gray-950 leading-[1.05]">
          Stop guessing your rate.
          <br />
          <span className="text-gray-400">Reverse-engineer it from your income goal.</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          Most freelancers undercharge by 30-40%. Plug in what you want to earn, your real working hours, and your non-billable buffer — get the rate that gets you there.
        </p>
        <div className="mt-7 flex flex-wrap justify-center items-center gap-x-6 gap-y-2.5">
          {[
            { icon: Shield,      label: 'No signup, ever' },
            { icon: Clock,       label: 'Real billable hours' },
            { icon: IndianRupee, label: 'GST + TDS-aware' },
            { icon: Calculator,  label: 'Project pricing samples' },
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
    { title: 'Lock in your rate, never re-quote',    desc: 'Save your hourly rate once. Every proposal you write auto-prices itself based on hours estimated. Less anchoring on past lowballs.' },
    { title: 'Track time against the rate',          desc: 'Built-in time tracker tags every minute to a project. End of month, see if you actually hit your hourly target.' },
    { title: 'Project profitability, not just hours',desc: 'ClearWork shows realised hourly rate per project — accounting for time spent, expenses, and what was actually paid. The truth your gut never tells you.' },
    { title: 'Charge upfront retainers easily',      desc: 'Generate a recurring monthly invoice for retainer clients in two clicks. Hours bank rolls over automatically.' },
    { title: 'Quote with confidence',                desc: 'Proposals show line-item rates, total hours, and total cost. Clients see clear value, not a single big number to negotiate down.' },
    { title: 'Send via WhatsApp, get paid via UPI',  desc: 'Indian-first workflow — invoice and payment link in one WhatsApp message. No more "did you receive my email?".' },
  ]

  return (
    <section className="py-16 sm:py-20 bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-white/80 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Knowing your rate is step 1
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Charging it consistently is step 2.
            <br />
            <span className="text-gray-400">ClearWork makes both effortless.</span>
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
    q: 'Why a non-billable buffer? Why not 100% billable?',
    a: 'Because no freelancer actually bills 40 hours a week, every week. You spend time on sales calls, proposals, admin, learning, debugging your own systems, replying to emails, fixing issues nobody pays for. 25-35% of your time is non-billable in a healthy business. Pricing as if you bill 100% of hours is the single biggest reason freelancers undercharge.',
  },
  {
    q: 'What is a typical hourly rate for Indian freelancers?',
    a: 'Wide range. Junior generalists: ₹500-1,500. Mid-level designers/developers: ₹1,500-3,500. Specialised consultants (data, AI, senior strategy): ₹3,500-10,000+. Top international rates can hit ₹15,000-30,000+/hr. The number this calculator gives you is what YOU need to charge, not the market rate — if it is far above market, lower your buffer or work more hours; if it is far below, you are leaving money on the table.',
  },
  {
    q: 'Should I include 18% GST in my hourly rate or quote it separately?',
    a: 'Always quote separately. Show your client "₹2,000/hr + GST" or "₹2,000/hr (₹2,360 inclusive of 18% GST)". Pricing inclusive of GST hides the real value of your work and makes it harder to raise rates later. The "Show rate with 18% GST added" toggle gives you both numbers.',
  },
  {
    q: 'Why the "grossed up for TDS" option?',
    a: 'When your client deducts 10% TDS at source, you only receive 90% of what you invoiced. If you wanted ₹2,000/hr in your bank, you should quote ₹2,222/hr (= 2000 / 0.9), so after the 10% deduction, ₹2,000 lands. You will reclaim the deducted amount when filing your ITR, but it sits with the government for 3-15 months. The "grossed up" mode adjusts for this cash-flow gap.',
  },
  {
    q: 'How often should I re-calculate my rate?',
    a: 'Annually at minimum. Twice a year is better. As your skills improve, your portfolio expands, and your reputation grows, your rate should follow. The biggest pricing mistake freelancers make is sticking with the rate they set in their first year. Re-run this calculator every 6 months with your real income data.',
  },
  {
    q: 'Should I price by the hour or by the project?',
    a: 'For client-facing quotes, almost always project-priced. Clients hate hourly because it caps your speed/efficiency at exactly what hurts them. But internally, you must know your effective hourly rate per project — that is the single number that tells you if a project was profitable. Quote project, track hours, evaluate by hour. ClearWork does this automatically.',
  },
  {
    q: 'I am a beginner — should I undercharge to win clients?',
    a: 'A little, sometimes. But not for long, and not by much. Charging too low signals low quality and attracts clients who fight on price. Better strategy: charge fairly from day one but offer something extra to win the first 5-10 clients (faster turnaround, extra revisions, a smaller pilot scope). Then portfolio those wins and raise rates immediately.',
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
