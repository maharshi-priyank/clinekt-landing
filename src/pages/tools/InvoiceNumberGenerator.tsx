import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Copy, Check, Download, ChevronDown, Hash, Zap, Shield,
} from 'lucide-react'
import { useSeo } from '../../lib/useSeo'

const STORAGE_KEY = 'clearwork-inv-num-gen-state'

type Separator = '-' | '/' | '_' | ''
type YearFormat = 'YYYY' | 'YY' | 'none'
type MonthFormat = 'MM' | 'none'

interface Config {
  prefix:       string
  yearFormat:   YearFormat
  monthFormat:  MonthFormat
  separator:    Separator
  startNumber:  number
  padding:      number
  count:        number
}

function defaults(): Config {
  return {
    prefix:      'INV',
    yearFormat:  'YYYY',
    monthFormat: 'MM',
    separator:   '-',
    startNumber: 1,
    padding:     3,
    count:       5,
  }
}

function loadState(): Config {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaults(), ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return defaults()
}

function pad(n: number, width: number): string {
  return String(n).padStart(width, '0')
}

function generateNumber(cfg: Config, seq: number): string {
  const now = new Date()
  const parts: string[] = []

  if (cfg.prefix.trim()) parts.push(cfg.prefix.trim())
  if (cfg.yearFormat === 'YYYY') parts.push(String(now.getFullYear()))
  if (cfg.yearFormat === 'YY')   parts.push(String(now.getFullYear()).slice(-2))
  if (cfg.monthFormat === 'MM')  parts.push(pad(now.getMonth() + 1, 2))
  parts.push(pad(seq, cfg.padding))

  return parts.join(cfg.separator)
}

const PRESETS: { label: string; desc: string; cfg: Partial<Config> }[] = [
  { label: 'Simple',     desc: 'INV-001',            cfg: { prefix: 'INV', yearFormat: 'none', monthFormat: 'none', separator: '-', padding: 3 } },
  { label: 'With year',  desc: 'INV-2025-001',        cfg: { prefix: 'INV', yearFormat: 'YYYY', monthFormat: 'none', separator: '-', padding: 3 } },
  { label: 'Full date',  desc: 'INV-2025-05-001',     cfg: { prefix: 'INV', yearFormat: 'YYYY', monthFormat: 'MM', separator: '-', padding: 3 } },
  { label: 'FY format',  desc: 'FY25-001',            cfg: { prefix: 'FY25', yearFormat: 'none', monthFormat: 'none', separator: '-', padding: 3 } },
  { label: 'Slash',      desc: 'INV/2025/001',        cfg: { prefix: 'INV', yearFormat: 'YYYY', monthFormat: 'none', separator: '/', padding: 3 } },
  { label: 'No sep.',    desc: 'INV202501001',         cfg: { prefix: 'INV', yearFormat: 'YYYY', monthFormat: 'MM', separator: '', padding: 3 } },
]

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
    >
      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export default function InvoiceNumberGenerator() {
  useSeo(
    'Invoice Number Generator — Create GST-Compliant Invoice Numbers | ClearWork',
    'Generate professional invoice numbers for Indian freelancers. Customise prefix, year, month, and sequence padding. Preview and copy instantly. Free, no signup.',
  )

  const [cfg, setCfg] = useState<Config>(loadState)
  const [copiedAll, setCopiedAll] = useState(false)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg)) } catch { /* ignore */ }
  }, [cfg])

  function set<K extends keyof Config>(key: K, val: Config[K]) {
    setCfg(prev => ({ ...prev, [key]: val }))
  }

  const sequence = useMemo(
    () => Array.from({ length: Math.max(1, Math.min(cfg.count, 20)) }, (_, i) => ({
      seq: cfg.startNumber + i,
      number: generateNumber(cfg, cfg.startNumber + i),
    })),
    [cfg],
  )

  const currentNumber = generateNumber(cfg, cfg.startNumber)

  function handleCopyAll() {
    const text = sequence.map(s => s.number).join('\n')
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAll(true)
      setTimeout(() => setCopiedAll(false), 2000)
    })
  }

  function handleDownloadCsv() {
    const rows = ['Invoice Number', ...sequence.map(s => s.number)].join('\n')
    const blob = new Blob([rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'invoice-numbers.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  function applyPreset(p: Partial<Config>) {
    setCfg(prev => ({ ...prev, ...p }))
  }

  return (
    <div className="min-h-screen bg-[#F4F6FB] pt-16">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="bg-[#101828] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium mb-5">
            <Hash size={12} />
            Free Invoice Number Generator
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
            Invoice Number Generator<br className="hidden sm:block" /> for Indian Freelancers
          </h1>
          <p className="text-gray-400 text-base max-w-2xl">
            Build a custom invoice numbering format — choose your prefix, date format, separator, and sequence padding. Preview instantly. Copy or export as CSV.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><Zap size={13} className="text-amber-400" /> Live preview</span>
            <span className="flex items-center gap-1.5"><Shield size={13} className="text-emerald-400" /> Works offline</span>
            <span className="flex items-center gap-1.5"><Download size={13} className="text-blue-400" /> Export as CSV</span>
          </div>
        </div>
      </section>

      {/* ── Tool ────────────────────────────────────────────────────────── */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* ── LEFT CONTROLS ─────────────────────────────────────────── */}
            <div className="flex-1 min-w-0 space-y-5">

              {/* Presets */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Quick Presets</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRESETS.map(p => (
                    <button
                      key={p.label}
                      onClick={() => applyPreset(p.cfg)}
                      className="flex flex-col items-start px-3 py-2.5 rounded-xl border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="text-xs font-semibold text-gray-900">{p.label}</span>
                      <span className="text-[11px] text-gray-400 font-mono mt-0.5">{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Config */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Format Settings</p>

                {/* Prefix */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Prefix</label>
                  <input
                    type="text"
                    value={cfg.prefix}
                    onChange={e => set('prefix', e.target.value.toUpperCase())}
                    placeholder="INV"
                    maxLength={10}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">E.g. INV, BILL, CLI, your initials</p>
                </div>

                {/* Year format */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Year</label>
                  <div className="flex gap-2">
                    {(['YYYY', 'YY', 'none'] as YearFormat[]).map(v => (
                      <button
                        key={v}
                        onClick={() => set('yearFormat', v)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                          cfg.yearFormat === v ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {v === 'none' ? 'No year' : v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Month format */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Month</label>
                  <div className="flex gap-2">
                    {(['MM', 'none'] as MonthFormat[]).map(v => (
                      <button
                        key={v}
                        onClick={() => set('monthFormat', v)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                          cfg.monthFormat === v ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {v === 'none' ? 'No month' : 'MM (01–12)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Separator */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Separator</label>
                  <div className="flex gap-2">
                    {(['-', '/', '_', ''] as Separator[]).map(v => (
                      <button
                        key={JSON.stringify(v)}
                        onClick={() => set('separator', v)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border font-mono transition-colors ${
                          cfg.separator === v ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {v === '' ? 'None' : `"${v}"`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Padding */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Sequence Padding (digits)</label>
                    <div className="flex gap-2">
                      {[2, 3, 4, 5].map(n => (
                        <button
                          key={n}
                          onClick={() => set('padding', n)}
                          className={`w-10 py-1.5 rounded-lg text-sm font-medium border font-mono transition-colors ${
                            cfg.padding === n ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600 hover:border-gray-400'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {cfg.padding === 2 ? 'e.g. 01, 02 … 99' : cfg.padding === 3 ? 'e.g. 001, 002 … 999' : cfg.padding === 4 ? 'e.g. 0001 … 9999' : 'e.g. 00001 … 99999'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Starting Number</label>
                    <input
                      type="number"
                      min={1}
                      value={cfg.startNumber}
                      onChange={e => set('startNumber', Math.max(1, Number(e.target.value)))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>

                {/* Preview count */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Preview count (1–20)</label>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={cfg.count}
                    onChange={e => set('count', Number(e.target.value))}
                    className="w-full accent-gray-900"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Showing {cfg.count} invoice number{cfg.count > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>

            {/* ── RIGHT PREVIEW ─────────────────────────────────────────── */}
            <div className="w-full lg:w-[360px] shrink-0 sticky top-20 space-y-4">

              {/* Current number — large display */}
              <div className="bg-[#101828] rounded-2xl p-6 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Your next invoice number</p>
                <p className="text-3xl font-bold text-white font-mono tracking-wide break-all">{currentNumber}</p>
                <div className="flex justify-center gap-2 mt-4">
                  <CopyBtn text={currentNumber} />
                </div>
              </div>

              {/* Sequence list */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Sequence Preview</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyAll}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
                    >
                      {copiedAll ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                      {copiedAll ? 'Copied!' : 'Copy all'}
                    </button>
                    <button
                      onClick={handleDownloadCsv}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
                    >
                      <Download size={11} />
                      CSV
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-gray-50">
                  {sequence.map(({ seq, number }) => (
                    <div key={seq} className="flex items-center justify-between px-4 py-2.5">
                      <span className="font-mono text-sm text-gray-900 font-medium">{number}</span>
                      <CopyBtn text={number} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why consistent numbering ────────────────────────────────────── */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Invoice Numbering Matters</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: '🏛️',
                title: 'GST compliance',
                desc: 'The GST Act requires every tax invoice to have a unique, sequential invoice number within a financial year. Gaps or duplicates can trigger scrutiny during assessments.',
              },
              {
                icon: '📑',
                title: 'Professional appearance',
                desc: 'Clients and accountants expect structured invoice numbers. A consistent format (e.g. INV-2025-001) signals you run a serious business.',
              },
              {
                icon: '🔍',
                title: 'Easy audit trail',
                desc: 'Sequential numbers make it trivial to spot missing invoices during year-end reconciliation or when responding to GST notices.',
              },
              {
                icon: '🤝',
                title: 'TDS tracking',
                desc: 'When clients deduct TDS, they reference your invoice number in Form 16A. A clear, consistent number helps match TDS certificates to your records.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <span className="text-2xl shrink-0">{icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-[#F4F6FB]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'What is the GST rule for invoice numbering?',
                a: 'Under GST Rules, a tax invoice must have a unique serial number not exceeding 16 characters, using alphabets, numbers, or special characters like "/" and "-". The series must be consecutive within a financial year (April–March). You can maintain different series for different types of invoices (e.g., one for services, one for goods).',
              },
              {
                q: 'Should I reset the sequence every financial year?',
                a: 'Yes, it\'s common practice to restart the sequence at the beginning of each financial year (April 1). Many freelancers embed the year in the number (e.g., INV-2025-001) so they automatically reset. Just remember to update your starting number here each April.',
              },
              {
                q: 'What happens if I skip an invoice number?',
                a: 'Skipping numbers is not ideal under GST as it can appear as if invoices were raised and then hidden. If you cancel an invoice, use a credit note against that number rather than skipping it. Keep records of cancelled invoices.',
              },
              {
                q: 'Can I use my company initials as a prefix?',
                a: 'Yes, absolutely. Many freelancers use their initials (e.g., RS-001) or a short business name abbreviation. Keep the total length under 16 characters including separators and the sequence number.',
              },
              {
                q: 'Should I include the month in the invoice number?',
                a: 'Including month (MM) makes it easy to retrieve invoices by period, which helps during quarterly GST filing (GSTR-1). However it\'s optional — what matters is uniqueness and sequence within the financial year.',
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
          <h2 className="text-3xl font-bold mb-4">Auto-generate invoice numbers in your billing workflow.</h2>
          <p className="text-gray-400 mb-8 text-base max-w-xl mx-auto">
            ClearWork auto-assigns the next invoice number when you create an invoice — no more manual tracking. Plus GST invoicing, Razorpay payments, and client portal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/#waitlist"
              className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-xl px-6 py-3 font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              Join the Waitlist <ArrowRight size={16} />
            </a>
            <Link
              to="/tools/gst-invoice-generator"
              className="inline-flex items-center gap-2 border border-white/20 text-white rounded-xl px-6 py-3 font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              Try GST Invoice Generator
            </Link>
          </div>
        </div>
      </section>

      {/* ── JSON-LD ─────────────────────────────────────────────────────────── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Invoice Number Generator for Indian Freelancers — ClearWork',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'Generate custom invoice number formats with prefix, year, month, separator and sequence padding. Preview and export as CSV. Free.',
        url: 'https://clearwork.in/tools/invoice-number-generator',
      }) }} />
    </div>
  )
}
