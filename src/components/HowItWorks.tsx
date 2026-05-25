import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { UserSearch, FileText, PenLine, Receipt, Globe, TrendingUp } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const steps = [
  {
    n: '01', icon: UserSearch, color: 'indigo',
    title: 'Capture every lead',
    desc: "Add leads from Instagram, LinkedIn, WhatsApp or referrals into one Kanban pipeline. Know exactly who's interested, what they want, and when to follow up.",
    pill: 'Lead CRM',
    preview: {
      title: 'New lead added',
      rows: [
        { k: 'Client', v: 'Rohan Sharma' },
        { k: 'Source', v: 'LinkedIn DM' },
        { k: 'Budget', v: '₹45,000' },
        { k: 'Service', v: 'Brand identity' },
        { k: 'Follow-up', v: 'In 2 days · auto-set' },
      ],
    },
  },
  {
    n: '02', icon: FileText, color: 'indigo',
    title: 'Send a tracked proposal',
    desc: "Build a branded proposal with pricing table. Share as a tracked link — not a PDF. You'll know the exact second they open it.",
    pill: 'Proposals',
    preview: {
      title: 'Proposal opened',
      rows: [
        { k: 'Client', v: 'Priya Mehta' },
        { k: 'Event', v: 'Opened just now' },
        { k: 'Time on pricing', v: '4 min 32 sec' },
        { k: 'Location', v: 'Mumbai, India' },
        { k: 'Action', v: 'Call her now →' },
      ],
    },
  },
  {
    n: '03', icon: PenLine, color: 'indigo',
    title: 'E-sign the contract',
    desc: 'One click converts your proposal into a contract. Client signs via OTP — IT Act 2000 compliant. No DocuSign, no printing, no back-and-forth.',
    pill: 'E-sign',
    preview: {
      title: 'Contract signed',
      rows: [
        { k: 'Client', v: 'Neha Kapoor' },
        { k: 'Document', v: 'Website Redesign' },
        { k: 'Signed at', v: '15 Jan · 3:42 PM' },
        { k: 'Method', v: 'OTP verified' },
        { k: 'Status', v: 'Legally valid ✓' },
      ],
    },
  },
  {
    n: '04', icon: Receipt, color: 'emerald',
    title: 'Send a GST invoice',
    desc: 'Auto-filled from your signed contract. CGST/SGST/IGST auto-calculated by client state. Razorpay link embedded — client pays in one tap.',
    pill: 'GST Invoice',
    preview: {
      title: 'INV-0042 · Sent',
      rows: [
        { k: 'Client', v: 'TechStart Inc' },
        { k: 'Amount', v: '₹80,000 + GST' },
        { k: 'IGST 18%', v: '₹14,400' },
        { k: 'Total', v: '₹94,400' },
        { k: 'Payment', v: 'UPI / Card / EMI →' },
      ],
    },
  },
  {
    n: '05', icon: Globe, color: 'indigo',
    title: 'Client portal',
    desc: 'Every client gets a branded portal — all proposals, contracts, invoices, and deliverables in one link. No more "send me the file again."',
    pill: 'Client Portal',
    preview: {
      title: 'portal.yourname.in',
      rows: [
        { k: 'Proposals', v: '3 sent · 2 accepted' },
        { k: 'Contracts', v: '2 signed' },
        { k: 'Invoices', v: '₹1,24,400 paid' },
        { k: 'Overdue', v: '1 invoice' },
        { k: 'Portal visits', v: '2 days ago' },
      ],
    },
  },
  {
    n: '06', icon: TrendingUp, color: 'emerald',
    title: 'Get paid. Track everything.',
    desc: 'Auto WhatsApp + email reminders at day 3, 7, 14 overdue. See MRR, pipeline value, and proposal conversion rate at a glance.',
    pill: 'Dashboard',
    preview: {
      title: 'This month',
      rows: [
        { k: 'Collected', v: '₹2,34,000' },
        { k: 'vs last month', v: '↑ 41%' },
        { k: 'Pipeline', v: '₹5,60,000' },
        { k: 'Auto-reminders', v: '3 sent today' },
        { k: 'Overdue', v: '₹22,000' },
      ],
    },
  },
]

const colorMap: Record<string, { icon: string; pill: string; row: string; accent: string; border: string }> = {
  indigo:  { icon: 'bg-indigo-100 text-indigo-600',   pill: 'bg-indigo-50 text-indigo-700 border-indigo-200',   row: 'border-indigo-50 hover:bg-indigo-50',   accent: 'text-indigo-600',   border: 'border-l-indigo-400' },
  emerald: { icon: 'bg-emerald-100 text-emerald-600', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200', row: 'border-emerald-50 hover:bg-emerald-50', accent: 'text-emerald-600', border: 'border-l-emerald-400' },
}

export default function HowItWorks() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const c = colorMap[steps[active].color]

  return (
    <section id="how-it-works" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            The workflow
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Lead to payment.{' '}
            <span className="gradient-text">In one tool.</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">
            Click each step to see exactly what Clinekt does.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          {/* Steps list */}
          <div className="lg:col-span-3 space-y-2">
            {steps.map((s, i) => {
              const sc = colorMap[s.color]
              const isActive = active === i
              return (
                <button key={s.n} onClick={() => setActive(i)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-250 cursor-pointer ${
                    isActive
                      ? `bg-white border-gray-200 shadow-md border-l-4 ${sc.border}`
                      : 'bg-gray-50/60 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${isActive ? sc.icon : 'bg-gray-100 text-gray-400'}`}>
                      <s.icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold ${isActive ? sc.accent : 'text-gray-400'}`}>{s.n}</span>
                        <span className={`font-semibold text-sm ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>{s.title}</span>
                        {isActive && (
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${sc.pill}`}>{s.pill}</span>
                        )}
                      </div>
                      {isActive && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                          className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                          {s.desc}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Preview card */}
          <div className="lg:col-span-2 lg:sticky lg:top-24 h-fit">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease }}
              className="rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden"
            >
              {/* Card header */}
              <div className={`px-5 py-4 border-b border-gray-100 flex items-center gap-3`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.icon}`}>
                  {(() => { const Icon = steps[active].icon; return <Icon size={17} /> })()}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{steps[active].preview.title}</div>
                  <div className={`text-xs font-semibold ${c.accent}`}>{steps[active].pill}</div>
                </div>
              </div>
              {/* Preview rows */}
              <div className="p-5 space-y-1">
                {steps[active].preview.rows.map((row, i) => (
                  <div key={i} className={`flex items-center justify-between px-3 py-2.5 rounded-lg border transition-colors ${c.row}`}>
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{row.k}</span>
                    <span className="text-sm text-gray-800 font-semibold">{row.v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
