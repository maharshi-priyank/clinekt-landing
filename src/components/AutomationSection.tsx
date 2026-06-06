import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  UserPlus, FileText, PenLine, Receipt, IndianRupee,
  Zap, ArrowRight, Settings2, Building2, Camera, Code2,
  Palette, TrendingUp, Megaphone,
} from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease }}>
      {children}
    </motion.div>
  )
}

// ─── Pipeline steps ──────────────────────────────────────────────────────────
const pipeline = [
  { icon: UserPlus,     label: 'Lead captured',      by: 'you',  byLabel: 'You add it' },
  { icon: FileText,     label: 'Proposal sent',       by: 'you',  byLabel: 'You click send' },
  { icon: PenLine,      label: 'Contract generated',  by: 'auto', byLabel: 'Auto' },
  { icon: Receipt,      label: 'Invoice raised',       by: 'auto', byLabel: 'Auto' },
  { icon: IndianRupee,  label: 'Payment collected',    by: 'auto', byLabel: 'Auto' },
]

// ─── Automation rules ────────────────────────────────────────────────────────
const rules = [
  {
    on: true,
    trigger: 'Proposal accepted by client',
    action: 'Contract auto-generated and sent for e-sign',
    chip: null,
  },
  {
    on: true,
    trigger: 'Contract e-signed',
    action: 'First invoice sent automatically',
    chip: 'After 0 hrs',
  },
  {
    on: true,
    trigger: 'Invoice unpaid after 3 days',
    action: 'WhatsApp reminder sent to client',
    chip: 'Day 3 · 7 · 14',
  },
  {
    on: true,
    trigger: 'Lead cold for 7 days',
    action: 'Follow-up nudge to your WhatsApp',
    chip: '7 days',
  },
  {
    on: false,
    trigger: 'New enquiry via contact form',
    action: 'Auto-add to CRM + assign pipeline stage',
    chip: 'Incoming',
  },
]

// ─── Business types ──────────────────────────────────────────────────────────
const bizTypes = [
  {
    icon: Building2, label: 'Architecture',
    flow: ['Enquiry', 'Schematic', 'Design Dev', 'Construction'],
  },
  {
    icon: Palette, label: 'Design Studio',
    flow: ['Brief', 'Concept', 'Production', 'Delivery'],
  },
  {
    icon: Code2, label: 'Dev Agency',
    flow: ['Scope', 'Sprint', 'Launch', 'Support'],
  },
  {
    icon: Camera, label: 'Photography',
    flow: ['Booking', 'Shoot', 'Edit', 'Deliver'],
  },
  {
    icon: TrendingUp, label: 'Consultant',
    flow: ['Proposal', 'Onboard', 'Retainer', 'Review'],
  },
  {
    icon: Megaphone, label: 'Marketing',
    flow: ['Onboard', 'Campaign', 'Report', 'Renew'],
  },
]

// ─── Toggle component ─────────────────────────────────────────────────────────
function Toggle({ on }: { on: boolean }) {
  return (
    <div className={`relative w-9 h-5 rounded-full flex-shrink-0 transition-colors ${on ? 'bg-indigo-600' : 'bg-gray-200'}`}>
      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${on ? 'left-4.5' : 'left-0.5'}`}
        style={{ left: on ? '18px' : '2px' }} />
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function AutomationSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <FadeIn className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
            <Zap size={11} className="text-indigo-500" />
            Automation engine
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tight">
            Configure once.{' '}
            <span className="gradient-text">Runs forever.</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            Set your business rules in 10 minutes. Every lead, proposal, contract,
            and invoice flows automatically — exactly the way your business works.
            You focus on the actual work.
          </p>
        </FadeIn>

        {/* Pipeline flow */}
        <FadeIn delay={0.08}>
          <div className="relative mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-0 overflow-x-auto pb-2">
              {pipeline.map((step, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-center flex-1 min-w-0">
                  {/* Step node */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border ${
                      step.by === 'auto'
                        ? 'bg-indigo-600 border-indigo-700'
                        : 'bg-white border-gray-200'
                    }`}>
                      <step.icon size={22} className={step.by === 'auto' ? 'text-white' : 'text-gray-600'} />
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-bold text-gray-900 whitespace-nowrap">{step.label}</div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 inline-block ${
                        step.by === 'auto'
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {step.byLabel}
                      </span>
                    </div>
                  </div>

                  {/* Connector arrow */}
                  {i < pipeline.length - 1 && (
                    <div className="flex flex-col items-center mx-1 sm:mx-2 flex-1 min-w-[32px]">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-50 border border-gray-100">
                        <Zap size={9} className="text-indigo-400" />
                        <span className="text-[9px] font-bold text-indigo-500 whitespace-nowrap hidden sm:block">triggers</span>
                      </div>
                      <ArrowRight size={14} className="text-gray-300 mt-1 hidden sm:block" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Caption */}
            <p className="text-center text-xs text-gray-400 mt-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-indigo-600 inline-block" />
                Handled automatically by ClearWork
              </span>
              <span className="mx-3 text-gray-200">|</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-white border border-gray-300 inline-block" />
                One action from you
              </span>
            </p>
          </div>
        </FadeIn>

        {/* Two columns: Automation rules + Business types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Automation rules panel */}
          <FadeIn delay={0.12}>
            <div className="h-full rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              {/* Panel header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <Settings2 size={15} className="text-indigo-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Automation rules</div>
                  <div className="text-xs text-gray-400">Configure once — runs on every new project</div>
                </div>
              </div>

              {/* Rules list */}
              <div className="divide-y divide-gray-50">
                {rules.map((rule, i) => (
                  <div key={i} className={`flex items-start gap-4 px-6 py-4 transition-colors ${rule.on ? '' : 'opacity-50'}`}>
                    <Toggle on={rule.on} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">When</span>
                        <span className="text-sm font-semibold text-gray-900">{rule.trigger}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <ArrowRight size={11} className="text-indigo-400 flex-shrink-0" />
                        <span className="text-sm text-gray-500">{rule.action}</span>
                        {rule.chip && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 flex-shrink-0">
                            {rule.chip}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <div className="px-6 py-3 bg-gray-50/60 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  All timings and templates are customisable per project type.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Business type templates */}
          <FadeIn delay={0.18}>
            <div className="h-full rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              {/* Panel header */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="font-bold text-gray-900 text-sm">Works for every business type</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Pick your industry — workflow templates pre-configured
                </div>
              </div>

              {/* Business type grid */}
              <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {bizTypes.map((biz, i) => (
                  <div key={i} className={`group p-4 rounded-xl border cursor-pointer transition-all duration-150 ${
                    i === 0
                      ? 'border-indigo-200 bg-indigo-50'
                      : 'border-gray-100 bg-gray-50 hover:border-indigo-200 hover:bg-indigo-50/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        i === 0 ? 'bg-indigo-100' : 'bg-white border border-gray-200 group-hover:bg-indigo-100 group-hover:border-indigo-100'
                      } transition-colors`}>
                        <biz.icon size={14} className={i === 0 ? 'text-indigo-600' : 'text-gray-500 group-hover:text-indigo-600'} />
                      </div>
                      <span className={`text-xs font-bold ${i === 0 ? 'text-indigo-700' : 'text-gray-700'}`}>{biz.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {biz.flow.map((stage, j) => (
                        <span key={j} className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                          i === 0 ? 'bg-indigo-100 text-indigo-600' : 'bg-white text-gray-500 border border-gray-200'
                        }`}>
                          {stage}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <div className="px-6 py-3 bg-gray-50/60 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Custom workflow stages and fields — your business, your rules.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Bottom callout */}
        <FadeIn delay={0.2}>
          <div className="mt-8 p-6 rounded-2xl bg-indigo-50 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-bold text-gray-900 text-base">Set up your automation in under 10 minutes.</div>
              <div className="text-sm text-gray-500 mt-1">
                Our onboarding wizard walks you through every rule. No coding. No ops team. Just configure and go.
              </div>
            </div>
            <a href="#waitlist"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 whitespace-nowrap">
              Get early access
              <ArrowRight size={14} />
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
