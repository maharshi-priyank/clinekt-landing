import { useEffect, useState, useId } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Plus, Trash2, Download, RefreshCw, Shield, Zap, Check,
  FileText, Lock, AlertCircle,
} from 'lucide-react'
import { INDIAN_STATES, fmtINR } from '../../lib/gst'
import { useSeo } from '../../lib/useSeo'
import { useSchemaOrg, breadcrumbSchema } from '../../lib/useSchemaOrg'
import {
  generateContractPdf,
  type ContractInput, type Milestone,
  type IpTransfer, type ScheduleType,
} from '../../lib/contractPdf'

const STORAGE_KEY = 'clearwork-contract-gen-state'

function uid() { return Math.random().toString(36).slice(2, 9) }

function defaults(): ContractInput {
  const today = new Date().toISOString().slice(0, 10)
  return {
    agreementDate:      today,
    freelancerName:     '',
    freelancerAddress:  '',
    freelancerGstin:    '',
    freelancerEmail:    '',
    freelancerPhone:    '',
    clientName:         '',
    clientCompany:      '',
    clientAddress:      '',
    clientGstin:        '',
    clientEmail:        '',
    projectTitle:       '',
    serviceDescription: '',
    deliverables:       [{ id: uid(), text: '' }],
    startDate:          today,
    endDate:            '',
    totalAmount:        '',
    scheduleType:       '50_50',
    customMilestones:   [{ id: uid(), description: 'On signing', percent: 50, dueDate: '' }],
    lateFeePercent:     2,
    paymentDueDays:     7,
    revisionsIncluded:  2,
    ipTransfer:         'full_payment',
    confidentiality:    true,
    terminationDays:    7,
    governingState:     '',
  }
}

function load(): ContractInput {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaults(), ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return defaults()
}

const SCHEDULE_OPTIONS: { value: ScheduleType; label: string; hint: string }[] = [
  { value: '50_50',         label: '50 / 50',            hint: '50% upfront + 50% on delivery' },
  { value: '30_40_30',      label: '30 / 40 / 30',       hint: '30% start + 40% draft + 30% delivery' },
  { value: 'on_completion', label: '100% on delivery',   hint: 'Full payment on final delivery' },
  { value: 'custom',        label: 'Custom milestones',  hint: 'Define your own payment schedule' },
]

const IP_OPTIONS: { value: IpTransfer; label: string; hint: string }[] = [
  { value: 'full_payment', label: 'On full payment',      hint: 'IP transfers to client after all payments received (recommended)' },
  { value: 'upfront',      label: 'On upfront payment',  hint: 'IP transfers after first/upfront payment' },
  { value: 'work_for_hire',label: 'Work-for-hire',       hint: 'Client owns IP from day one (use for salaried or buy-out arrangements)' },
]

export default function FreelanceContractGenerator() {
  useSeo(
    'Free Freelance Contract Generator (India) — Download PDF | ClearWork',
    'Generate a legally-worded freelance contract for Indian freelancers. IP clause, payment terms, confidentiality, IT Act. Free, no signup, instant PDF download.',
    'https://getclearwork.in/tools/freelance-contract-generator',
  )
  useSchemaOrg(breadcrumbSchema([
    { name: 'Home',       item: 'https://getclearwork.in/' },
    { name: 'Free Tools', item: 'https://getclearwork.in/tools' },
    { name: 'Freelance Contract Generator', item: 'https://getclearwork.in/tools/freelance-contract-generator' },
  ]))

  const [input,   setInput]   = useState<ContractInput>(load)
  const [section, setSection] = useState(0)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(input)) } catch { /* ignore */ }
  }, [input])

  function set<K extends keyof ContractInput>(key: K, val: ContractInput[K]) {
    setInput(prev => ({ ...prev, [key]: val }))
  }

  // deliverables helpers
  function addDeliverable()  { set('deliverables', [...input.deliverables, { id: uid(), text: '' }]) }
  function removeDeliverable(id: string) { set('deliverables', input.deliverables.filter(d => d.id !== id)) }
  function updateDeliverable(id: string, text: string) {
    set('deliverables', input.deliverables.map(d => d.id === id ? { ...d, text } : d))
  }

  // milestone helpers
  function addMilestone()  { set('customMilestones', [...input.customMilestones, { id: uid(), description: '', percent: 0, dueDate: '' }]) }
  function removeMilestone(id: string) { set('customMilestones', input.customMilestones.filter(m => m.id !== id)) }
  function updateMilestone(id: string, patch: Partial<Milestone>) {
    set('customMilestones', input.customMilestones.map(m => m.id === id ? { ...m, ...patch } : m))
  }
  const milestoneTotal = input.customMilestones.reduce((s, m) => s + (m.percent || 0), 0)
  const milestoneOk   = input.scheduleType !== 'custom' || milestoneTotal === 100

  const canDownload = !!input.freelancerName && !!input.clientName && !!input.projectTitle && milestoneOk

  function reset() {
    if (!confirm('Clear all fields and start over?')) return
    localStorage.removeItem(STORAGE_KEY)
    setInput(defaults())
    setSection(0)
  }

  const SECTIONS = [
    { label: 'Parties',    complete: !!(input.freelancerName && input.clientName) },
    { label: 'Project',    complete: !!(input.projectTitle && input.serviceDescription) },
    { label: 'Payment',    complete: !!(input.totalAmount && milestoneOk) },
    { label: 'Terms',      complete: !!(input.governingState) },
    { label: 'Preview',    complete: false },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'SoftwareApplication',
            name:       'Free Freelance Contract Generator',
            applicationCategory: 'BusinessApplication',
            operatingSystem:     'Web',
            description:         'Generate a legally-worded freelance contract for Indian freelancers. IP clause, payment terms, confidentiality, IT Act.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
            audience: { '@type': 'Audience', audienceType: 'Indian freelancers' },
          }),
        }}
      />

      <Hero />

      {/* ── Builder ──────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left: form */}
            <div className="lg:col-span-5 space-y-4">

              {/* Step nav */}
              <div className="flex items-center gap-1 overflow-x-auto">
                {SECTIONS.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => setSection(i)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold whitespace-nowrap transition-colors ${
                      section === i
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                  >
                    {s.complete && section !== i && <Check size={11} className="text-emerald-500" strokeWidth={3} />}
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Parties */}
              {section === 0 && (
                <div className="space-y-4">
                  <FormCard title="Your details (Service Provider)">
                    <Field label="Full name / Business name *">
                      <input value={input.freelancerName} onChange={e => set('freelancerName', e.target.value)} placeholder="Maharshi Vaghela" className={inp} />
                    </Field>
                    <Field label="Address">
                      <textarea value={input.freelancerAddress} onChange={e => set('freelancerAddress', e.target.value)} rows={2} className={`${inp} resize-none`} placeholder="Flat 12, ABC Residency, Ahmedabad 380001" />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="GSTIN (if any)">
                        <input value={input.freelancerGstin} onChange={e => set('freelancerGstin', e.target.value.toUpperCase())} placeholder="24AABCC1234D1Z5" className={inp} />
                      </Field>
                      <Field label="Email *">
                        <input type="email" value={input.freelancerEmail} onChange={e => set('freelancerEmail', e.target.value)} placeholder="hello@yourbiz.com" className={inp} />
                      </Field>
                      <Field label="Phone">
                        <input value={input.freelancerPhone} onChange={e => set('freelancerPhone', e.target.value)} placeholder="+91 98765 43210" className={inp} />
                      </Field>
                      <Field label="Agreement date">
                        <input type="date" value={input.agreementDate} onChange={e => set('agreementDate', e.target.value)} className={inp} />
                      </Field>
                    </div>
                  </FormCard>

                  <FormCard title="Client details">
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Client name *">
                        <input value={input.clientName} onChange={e => set('clientName', e.target.value)} placeholder="Rohan Sharma" className={inp} />
                      </Field>
                      <Field label="Company (optional)">
                        <input value={input.clientCompany} onChange={e => set('clientCompany', e.target.value)} placeholder="TechStart Pvt Ltd" className={inp} />
                      </Field>
                    </div>
                    <Field label="Address">
                      <textarea value={input.clientAddress} onChange={e => set('clientAddress', e.target.value)} rows={2} className={`${inp} resize-none`} placeholder="Client office address" />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Client GSTIN (if any)">
                        <input value={input.clientGstin} onChange={e => set('clientGstin', e.target.value.toUpperCase())} placeholder="27AABCD5678E1Z9" className={inp} />
                      </Field>
                      <Field label="Client email">
                        <input type="email" value={input.clientEmail} onChange={e => set('clientEmail', e.target.value)} placeholder="rohan@techstart.in" className={inp} />
                      </Field>
                    </div>
                  </FormCard>
                  <SectionNav onNext={() => setSection(1)} />
                </div>
              )}

              {/* Project */}
              {section === 1 && (
                <div className="space-y-4">
                  <FormCard title="Project details">
                    <Field label="Project title *">
                      <input value={input.projectTitle} onChange={e => set('projectTitle', e.target.value)} placeholder="Brand Identity Design" className={inp} />
                    </Field>
                    <Field label="Description of services *">
                      <textarea value={input.serviceDescription} onChange={e => set('serviceDescription', e.target.value)} rows={4} className={`${inp} resize-none`}
                        placeholder="Design a complete brand identity including logo, typography, color palette, and brand guidelines document..." />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Start date">
                        <input type="date" value={input.startDate} onChange={e => set('startDate', e.target.value)} className={inp} />
                      </Field>
                      <Field label="Estimated end date">
                        <input type="date" value={input.endDate} onChange={e => set('endDate', e.target.value)} className={inp} />
                      </Field>
                    </div>
                  </FormCard>

                  <FormCard title="Deliverables">
                    <div className="space-y-2">
                      {input.deliverables.map((d, i) => (
                        <div key={d.id} className="flex items-center gap-2">
                          <input
                            value={d.text}
                            onChange={e => updateDeliverable(d.id, e.target.value)}
                            placeholder={`Deliverable ${i + 1}`}
                            className={`${inp} flex-1`}
                          />
                          {input.deliverables.length > 1 && (
                            <button onClick={() => removeDeliverable(d.id)} className="text-gray-400 hover:text-red-500 transition-colors shrink-0">
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button onClick={addDeliverable} className={addRowBtn}>
                        <Plus size={12} /> Add deliverable
                      </button>
                    </div>
                  </FormCard>
                  <SectionNav onBack={() => setSection(0)} onNext={() => setSection(2)} />
                </div>
              )}

              {/* Payment */}
              {section === 2 && (
                <div className="space-y-4">
                  <FormCard title="Payment">
                    <Field label="Total contract value (₹, excl. GST) *">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                        <input type="number" min={0} step="any" value={input.totalAmount} onChange={e => set('totalAmount', e.target.value)} placeholder="80,000" className={`${inp} pl-7`} />
                      </div>
                    </Field>

                    <Field label="Payment schedule">
                      <div className="space-y-2">
                        {SCHEDULE_OPTIONS.map(o => (
                          <button key={o.value} onClick={() => set('scheduleType', o.value)}
                            className={`w-full flex items-start gap-3 px-3.5 py-3 rounded-xl border-2 text-left transition-all ${
                              input.scheduleType === o.value
                                ? 'border-gray-900 bg-gray-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <span className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                              input.scheduleType === o.value ? 'border-gray-900 bg-gray-900' : 'border-gray-300'
                            }`}>
                              {input.scheduleType === o.value && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                            <div>
                              <p className="text-[13px] font-semibold text-gray-900">{o.label}</p>
                              <p className="text-[11.5px] text-gray-500 mt-0.5">{o.hint}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </Field>

                    {input.scheduleType === 'custom' && (
                      <div className="space-y-2 rounded-xl bg-gray-50 border border-gray-200 p-3.5">
                        <p className="text-xs font-bold text-gray-700">Custom milestones</p>
                        {input.customMilestones.map((m, i) => (
                          <div key={m.id} className="grid grid-cols-12 gap-2 items-center">
                            <input value={m.description} onChange={e => updateMilestone(m.id, { description: e.target.value })}
                              placeholder={`Milestone ${i + 1}`} className={`${inp} col-span-6 text-xs`} />
                            <div className="relative col-span-2">
                              <input type="number" min={0} max={100} value={m.percent || ''}
                                onChange={e => updateMilestone(m.id, { percent: Number(e.target.value) })}
                                placeholder="%" className={`${inp} text-xs pr-5`} />
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
                            </div>
                            <input type="date" value={m.dueDate} onChange={e => updateMilestone(m.id, { dueDate: e.target.value })}
                              className={`${inp} col-span-3 text-xs`} />
                            {input.customMilestones.length > 1 && (
                              <button onClick={() => removeMilestone(m.id)} className="col-span-1 text-gray-400 hover:text-red-500">
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>
                        ))}
                        <div className="flex items-center justify-between">
                          <button onClick={addMilestone} className={addRowBtn}>
                            <Plus size={12} /> Add milestone
                          </button>
                          <span className={`text-[11.5px] font-semibold ${milestoneTotal === 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            Total: {milestoneTotal}% {milestoneTotal !== 100 && '(must equal 100%)'}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Payment due within (days)">
                        <input type="number" min={1} max={90} value={input.paymentDueDays}
                          onChange={e => set('paymentDueDays', Number(e.target.value))} className={inp} />
                      </Field>
                      <Field label="Late fee (% per month)">
                        <input type="number" min={0} max={10} step={0.5} value={input.lateFeePercent}
                          onChange={e => set('lateFeePercent', Number(e.target.value))} className={inp} />
                      </Field>
                    </div>
                  </FormCard>
                  <SectionNav onBack={() => setSection(1)} onNext={() => setSection(3)} />
                </div>
              )}

              {/* Terms */}
              {section === 3 && (
                <div className="space-y-4">
                  <FormCard title="Contract terms">
                    <Field label="Revisions included">
                      <input type="number" min={0} max={20} value={input.revisionsIncluded}
                        onChange={e => set('revisionsIncluded', Number(e.target.value))} className={inp} />
                    </Field>

                    <Field label="Intellectual property transfer">
                      <div className="space-y-2">
                        {IP_OPTIONS.map(o => (
                          <button key={o.value} onClick={() => set('ipTransfer', o.value)}
                            className={`w-full flex items-start gap-3 px-3.5 py-3 rounded-xl border-2 text-left transition-all ${
                              input.ipTransfer === o.value
                                ? 'border-gray-900 bg-gray-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <span className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                              input.ipTransfer === o.value ? 'border-gray-900 bg-gray-900' : 'border-gray-300'
                            }`}>
                              {input.ipTransfer === o.value && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                            <div>
                              <p className="text-[13px] font-semibold text-gray-900">{o.label}</p>
                              <p className="text-[11.5px] text-gray-500 mt-0.5">{o.hint}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </Field>

                    <div className="flex flex-col gap-3">
                      <ToggleRow label="Confidentiality / NDA clause" hint="Prevents both parties from sharing business info with third parties for 2 years"
                        value={input.confidentiality} onChange={v => set('confidentiality', v)} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Termination notice (days)">
                        <input type="number" min={1} max={30} value={input.terminationDays}
                          onChange={e => set('terminationDays', Number(e.target.value))} className={inp} />
                      </Field>
                      <Field label="Governing jurisdiction *">
                        <select value={input.governingState} onChange={e => set('governingState', e.target.value)} className={inp}>
                          <option value="">Select state / city</option>
                          {INDIAN_STATES.map(s => <option key={s.code} value={s.name}>{s.name}</option>)}
                        </select>
                      </Field>
                    </div>
                  </FormCard>

                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                    <AlertCircle size={14} className="text-amber-600 shrink-0 mt-0.5" strokeWidth={2} />
                    <p className="text-[12px] text-amber-800">
                      This template is suitable for most freelance projects. For high-value engagements (₹5L+), complex IP arrangements, or enterprise clients, consult a lawyer.
                    </p>
                  </div>

                  <SectionNav onBack={() => setSection(2)} onNext={() => setSection(4)} nextLabel="Review & Download" />
                </div>
              )}

              {/* Preview / Download */}
              {section === 4 && (
                <div className="space-y-4">
                  <FormCard title="Ready to download">
                    <ContractSummary input={input} />

                    {!canDownload && (
                      <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mt-3">
                        <AlertCircle size={14} className="text-amber-600 shrink-0 mt-0.5" strokeWidth={2} />
                        <p className="text-[12px] text-amber-800">
                          Complete required fields: Freelancer name, Client name, Project title
                          {input.scheduleType === 'custom' && milestoneTotal !== 100 ? ', and milestone % must total 100' : ''}
                          .
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => generateContractPdf(input)}
                        disabled={!canDownload}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-950 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Download size={14} /> Download PDF
                      </button>
                      <button onClick={reset} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
                        <RefreshCw size={13} /> Reset
                      </button>
                      <span className="text-xs text-gray-400 ml-auto">Auto-saved</span>
                    </div>
                  </FormCard>
                </div>
              )}
            </div>

            {/* Right: live preview */}
            <div className="lg:col-span-7">
              <div className="lg:sticky lg:top-20">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Contract preview</p>
                <ContractPreview input={input} />
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

// ─── Small helpers ────────────────────────────────────────────────────────────

const inp = 'w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-colors'
const addRowBtn = 'flex items-center gap-1.5 text-[12px] font-semibold text-gray-500 hover:text-gray-800 border-2 border-dashed border-gray-300 rounded-lg px-3 py-2 w-full justify-center hover:border-gray-400 transition-colors'

function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 space-y-3.5">
      <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-500">{label}</label>
      {children}
    </div>
  )
}

function SectionNav({ onBack, onNext, nextLabel = 'Next →' }: { onBack?: () => void; onNext?: () => void; nextLabel?: string }) {
  return (
    <div className="flex justify-between">
      {onBack ? (
        <button onClick={onBack} className="text-[12.5px] font-semibold text-gray-500 hover:text-gray-800 transition-colors">
          ← Back
        </button>
      ) : <span />}
      {onNext && (
        <button onClick={onNext} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-950 text-white text-[12.5px] font-semibold hover:bg-gray-800 transition-colors">
          {nextLabel}
        </button>
      )}
    </div>
  )
}

function ToggleRow({ label, hint, value, onChange }: { label: string; hint: string; value: boolean; onChange: (v: boolean) => void }) {
  const id = useId()
  return (
    <div className="flex items-center justify-between gap-3 bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3">
      <div>
        <p className="text-[13px] font-semibold text-gray-900">{label}</p>
        <p className="text-[11.5px] text-gray-500 mt-0.5">{hint}</p>
      </div>
      <button
        id={id}
        onClick={() => onChange(!value)}
        className={`relative w-10 h-6 rounded-full transition-colors shrink-0 ${value ? 'bg-gray-950' : 'bg-gray-300'}`}
        role="switch" aria-checked={value}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${value ? 'translate-x-4' : ''}`} />
      </button>
    </div>
  )
}

// ─── Contract summary card ────────────────────────────────────────────────────

function ContractSummary({ input }: { input: ContractInput }) {
  const total = Number(input.totalAmount) || 0
  return (
    <div className="space-y-3 text-[12.5px]">
      {[
        { label: 'Project',        value: input.projectTitle    || '—' },
        { label: 'From',           value: input.freelancerName  || '—' },
        { label: 'To',             value: input.clientName      || '—' },
        { label: 'Total value',    value: total ? `₹${fmtINR(total)} + GST` : '—' },
        { label: 'Payment',        value: SCHEDULE_OPTIONS.find(o => o.value === input.scheduleType)?.hint || '—' },
        { label: 'Revisions',      value: `${input.revisionsIncluded} rounds` },
        { label: 'Jurisdiction',   value: input.governingState || '—' },
        { label: 'Confidentiality',value: input.confidentiality ? 'Yes' : 'No' },
      ].map(({ label, value }) => (
        <div key={label} className="flex justify-between gap-2">
          <span className="text-gray-500 font-medium">{label}</span>
          <span className="text-gray-900 font-semibold text-right">{value}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Contract HTML preview ────────────────────────────────────────────────────

function ContractPreview({ input }: { input: ContractInput }) {
  const total = Number(input.totalAmount) || 0
  const clientDisplay = input.clientCompany ? `${input.clientName} (${input.clientCompany})` : input.clientName

  const scheduleLabel = SCHEDULE_OPTIONS.find(o => o.value === input.scheduleType)?.hint || ''

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden max-h-[80vh] overflow-y-auto">
      {/* Contract header */}
      <div className="bg-gray-950 text-white px-6 py-5 text-center">
        <p className="text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase mb-1">Freelance</p>
        <h2 className="text-[18px] font-extrabold tracking-tight">SERVICE AGREEMENT</h2>
        <p className="text-[11px] text-white/60 mt-1">Effective Date: {input.agreementDate || '___________'}</p>
      </div>

      <div className="p-5 sm:p-6 space-y-5 text-[11.5px] text-gray-700">
        <p className="italic text-gray-600">
          This Freelance Service Agreement is entered into as of {input.agreementDate || '___________'} between{' '}
          <strong className="text-gray-900">{input.freelancerName || '[Service Provider]'}</strong> ("Service Provider") and{' '}
          <strong className="text-gray-900">{clientDisplay || '[Client]'}</strong> ("Client").
        </p>

        <PreviewSection n={1} title="PARTIES">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold text-gray-900 text-[11px] uppercase tracking-wide mb-1">Service Provider</p>
              <p className="font-semibold">{input.freelancerName || '—'}</p>
              {input.freelancerAddress && <p className="text-gray-500 mt-0.5">{input.freelancerAddress}</p>}
              {input.freelancerGstin   && <p className="text-gray-500">GSTIN: {input.freelancerGstin}</p>}
              {input.freelancerEmail   && <p className="text-gray-500">{input.freelancerEmail}</p>}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-[11px] uppercase tracking-wide mb-1">Client</p>
              <p className="font-semibold">{clientDisplay || '—'}</p>
              {input.clientAddress && <p className="text-gray-500 mt-0.5">{input.clientAddress}</p>}
              {input.clientGstin   && <p className="text-gray-500">GSTIN: {input.clientGstin}</p>}
              {input.clientEmail   && <p className="text-gray-500">{input.clientEmail}</p>}
            </div>
          </div>
        </PreviewSection>

        <PreviewSection n={2} title="SERVICES">
          <p className="font-semibold text-gray-900">{input.projectTitle || '[Project Title]'}</p>
          {input.serviceDescription && <p className="mt-1 text-gray-600">{input.serviceDescription}</p>}
        </PreviewSection>

        <PreviewSection n={3} title="DELIVERABLES">
          <ul className="space-y-1">
            {input.deliverables.filter(d => d.text).map(d => (
              <li key={d.id} className="flex items-start gap-2"><span className="text-gray-400 shrink-0">•</span>{d.text}</li>
            ))}
            {!input.deliverables.some(d => d.text) && <li className="text-gray-400">As agreed between the parties.</li>}
          </ul>
        </PreviewSection>

        <PreviewSection n={4} title="TIMELINE">
          <p>Start: <strong>{input.startDate || '—'}</strong> · End: <strong>{input.endDate || 'TBD'}</strong></p>
        </PreviewSection>

        <PreviewSection n={5} title="PAYMENT">
          <p className="font-semibold text-gray-900">Total: INR {total ? fmtINR(total) : '—'} (excl. GST)</p>
          <p className="text-gray-500 mt-0.5">Schedule: {scheduleLabel}</p>
          <p className="text-gray-500 mt-0.5">Due within {input.paymentDueDays} days · Late fee {input.lateFeePercent}% per month</p>
          <p className="text-gray-500 mt-0.5">Client to deduct TDS as applicable and provide Form 16A.</p>
        </PreviewSection>

        <PreviewSection n={6} title="REVISIONS">
          <p>{input.revisionsIncluded} revision round{input.revisionsIncluded !== 1 ? 's' : ''} included. Additional rounds billed at standard rate.</p>
        </PreviewSection>

        <PreviewSection n={7} title="INTELLECTUAL PROPERTY">
          <p>IP transfers to Client <strong>{input.ipTransfer === 'full_payment' ? 'upon receipt of full payment' : input.ipTransfer === 'upfront' ? 'upon upfront payment' : 'from date of this Agreement'}</strong>. Service Provider retains portfolio rights.</p>
        </PreviewSection>

        {input.confidentiality && (
          <PreviewSection n={8} title="CONFIDENTIALITY">
            <p>Both parties agree to maintain confidentiality of all non-public information for 2 years.</p>
          </PreviewSection>
        )}

        <PreviewSection n={input.confidentiality ? 9 : 8} title="TERMINATION">
          <p>{input.terminationDays} days' written notice by either party.</p>
        </PreviewSection>

        <PreviewSection n={input.confidentiality ? 11 : 10} title="GENERAL">
          <p>Governed by Indian law · Jurisdiction: {input.governingState || '[State]'}</p>
        </PreviewSection>

        {/* Signature blocks */}
        <div className="border-t border-gray-200 pt-4 grid grid-cols-2 gap-6">
          <div>
            <div className="border-b border-gray-400 pb-1 mb-1.5 h-7" />
            <p className="font-bold text-gray-900 text-[10.5px] uppercase tracking-wide">Service Provider</p>
            <p className="text-gray-600">{input.freelancerName || '________________________'}</p>
          </div>
          <div>
            <div className="border-b border-gray-400 pb-1 mb-1.5 h-7" />
            <p className="font-bold text-gray-900 text-[10.5px] uppercase tracking-wide">Client</p>
            <p className="text-gray-600">{clientDisplay || '________________________'}</p>
          </div>
        </div>

        <p className="text-[10px] text-gray-300 text-center pt-2">
          Generated free with ClearWork — getclearwork.in
        </p>
      </div>
    </div>
  )
}

function PreviewSection({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10.5px] font-bold text-gray-900 uppercase tracking-wider mb-1.5">{n}. {title}</p>
      <div className="text-[11.5px] text-gray-700 space-y-1">{children}</div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative pt-28 pb-10 sm:pb-14 overflow-hidden bg-white">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-purple-50/60 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto px-5 relative z-10 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-600 shadow-sm mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Free Freelance Contract Generator
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-gray-950 leading-[1.05]">
          A real contract in 2 minutes.
          <br />
          <span className="text-gray-400">No lawyer. No signup. Free PDF.</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          IP clause, payment terms, confidentiality, TDS acknowledgment, termination rights.
          Built for Indian freelancers. Download a signed-ready PDF instantly.
        </p>
        <div className="mt-7 flex flex-wrap justify-center items-center gap-x-6 gap-y-2.5">
          {[
            { icon: Shield,   label: 'No signup, ever' },
            { icon: FileText, label: 'Legally-worded clauses' },
            { icon: Lock,     label: 'IP + confidentiality' },
            { icon: Zap,      label: 'Indian law & jurisdiction' },
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
    { title: 'One click from proposal to contract',   desc: 'In ClearWork, a client accepting your proposal auto-generates the contract — pre-filled with scope, amount, and client details. No copy-paste, no Word doc.' },
    { title: 'E-sign with OTP (IT Act 2000)',          desc: 'Client signs the contract with a 6-digit OTP sent to their email. Legally binding under India\'s IT Act 2000. Timestamped audit trail PDF auto-generated.' },
    { title: 'Auto-invoice on contract milestones',   desc: 'Set a milestone in the contract, and ClearWork creates and sends the invoice automatically on the due date — no manual chasing.' },
    { title: 'Client portal for all docs',            desc: 'Every client gets a branded portal link with their contract, invoices, and project status. No more "can you resend the contract?".' },
    { title: 'Track if they opened it',               desc: 'You\'ll know the second a client opens the contract to sign. Perfect timing for a WhatsApp follow-up.' },
    { title: 'Everything in one place',               desc: 'Lead → Proposal → Contract → Invoice → Payment — the whole workflow, linked together, in one tool built for Indian freelancers.' },
  ]

  return (
    <section className="py-16 sm:py-20 bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-white/80 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Using Word docs for contracts?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Good contracts get signed.
            <br />
            <span className="text-gray-400">ClearWork makes the whole process automatic.</span>
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
          <Link to="/#waitlist" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-gray-950 font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg">
            Try ClearWork free <ArrowRight size={15} />
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
    q: 'Is this freelance contract legally valid in India?',
    a: 'Yes — a signed written contract is enforceable under the Indian Contract Act, 1872. This template includes all elements required for a valid contract: offer, acceptance, consideration, competent parties, and lawful purpose. For it to be fully enforceable, both parties need to sign. The PDF you download can be printed and wet-signed, or signed digitally (OTP/email confirmation counts under the IT Act 2000). For very high-value work (₹5L+), we recommend having a lawyer review it.',
  },
  {
    q: 'Do I need a stamp paper for a freelance contract?',
    a: 'For most freelance contracts in India, stamp paper is NOT required. Stamp duty is typically required for contracts involving property, loans, or partnerships — not for service agreements. A plain-paper contract with signatures is valid. However, some states (notably Maharashtra and Rajasthan) may require nominal stamp duty for service agreements above a certain threshold. Check your state\'s rules if in doubt.',
  },
  {
    q: 'What is the IP transfer clause? Why does it matter?',
    a: 'The intellectual property clause determines who owns the work you create. "On full payment" (recommended for most) means your client only owns the final deliverables once they\'ve paid you completely — if they short-pay, you still own the IP. "Work-for-hire" means the client owns the work from day one, regardless of payment. Always use "on full payment" unless you have a specific reason not to. It is your main leverage if a client disputes payment.',
  },
  {
    q: 'Should I include a TDS clause in my contract?',
    a: 'Yes, and this template does. The TDS clause acknowledges that the client will deduct TDS under Section 194J (10%) before paying you, and obligates them to provide Form 16A promptly. This protects you because (1) you know the gross amount, (2) you have a document proving the deduction, and (3) it removes disputes about whether TDS was supposed to be deducted. Without this clause, some clients try to deduct TDS from the agreed amount instead of treating it as a deduction over the total.',
  },
  {
    q: 'What is the confidentiality (NDA) clause?',
    a: 'The NDA clause prevents both parties from sharing each other\'s confidential business information with third parties for 2 years. This protects the client\'s business secrets AND your pricing, methods, and client list. Most clients will expect a mutual NDA. If your client handles sensitive data (fintech, healthtech, government), they may have their own stronger NDA they want you to sign in addition to this.',
  },
  {
    q: 'What payment schedule should I pick?',
    a: 'For projects under 2 weeks: "100% on completion" is fine if you trust the client; otherwise 50/50. For projects 2-8 weeks: "50/50" is standard — 50% upfront protects you from starting without commitment, and the client is protected because you have to deliver to get the second 50%. For larger projects (2+ months): "30/40/30" spreads risk for both parties. Never start work without at least an upfront payment unless it is an existing trusted client.',
  },
  {
    q: 'Can I use this contract for international clients?',
    a: 'The template is designed for Indian jurisdiction and INR payments. For international clients, you would need to: (1) change the currency, (2) update the governing law clause (typically the client\'s country or a neutral jurisdiction like Singapore), (3) remove the TDS clause (TDS does not apply to foreign clients), and (4) add an FEMA compliance clause if the amount exceeds $250K/year. For small international gigs, this template works as-is if the client agrees to Indian jurisdiction.',
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
