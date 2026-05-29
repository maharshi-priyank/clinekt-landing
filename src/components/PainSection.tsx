import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, Image, Table2, QrCode, ArrowRight, X, Check } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease }}>
      {children}
    </motion.div>
  )
}

const before = [
  { icon: MessageCircle, name: 'WhatsApp', pain: 'Leads buried in chats',       color: 'text-green-600', bg: 'bg-green-50',  border: 'border-green-200' },
  { icon: Image,         name: 'Canva',    pain: 'Proposals with no tracking',  color: 'text-pink-600',  bg: 'bg-pink-50',   border: 'border-pink-200' },
  { icon: Table2,        name: 'Google Sheets', pain: 'Manual GST split',       color: 'text-blue-600',  bg: 'bg-blue-50',   border: 'border-blue-200' },
  { icon: QrCode,        name: 'UPI QR code',   pain: 'Chase payment on WhatsApp', color: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-200' },
]

const after = [
  'Lead CRM — pipeline, follow-up, reminders',
  'Branded proposals with real-time open tracking',
  'GST invoice with CGST/SGST/IGST auto-split',
  'Razorpay + UPI embedded — client pays in one tap',
  'Auto WhatsApp reminder for overdue invoices',
  'Client portal — all docs in one branded link',
]

const stats = [
  { stat: '80%',   text: 'lose clients from no follow-up system' },
  { stat: '65%',   text: 'of proposals are never followed up' },
  { stat: '72%',   text: 'get paid 30+ days late' },
  { stat: '6 hrs', text: 'wasted every week on admin' },
]

export default function PainSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <FadeIn className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            The problem
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            You're managing your business{' '}
            <br className="hidden md:block" />
            across <span className="text-red-500">4 broken tools.</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Every Indian freelancer runs the same chaotic workflow.
            It costs 6+ hours a week — and deals along the way.
          </p>
        </FadeIn>

        {/* Before / After */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Before */}
          <FadeIn delay={0.1}>
            <div className="h-full rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-red-50 border-b border-red-100 flex items-center gap-2">
                <X size={15} className="text-red-500" strokeWidth={2.5} />
                <span className="font-bold text-red-600 text-sm">Before Rupway — the chaos</span>
              </div>
              <div className="p-5 space-y-3">
                {before.map((tool, i) => (
                  <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${tool.border} ${tool.bg}`}>
                    <div className={`w-9 h-9 bg-white rounded-xl border ${tool.border} flex items-center justify-center flex-shrink-0`}>
                      <tool.icon size={16} className={tool.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm">{tool.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{tool.pain}</div>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <X size={10} className="text-red-500" strokeWidth={3} />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center p-3 rounded-xl bg-red-50 border border-red-100 mt-1">
                  <span className="text-sm font-semibold text-red-600">= 6 hrs/week wasted on admin</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* After */}
          <FadeIn delay={0.18}>
            <div className="h-full rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-emerald-50 border-b border-emerald-100 flex items-center gap-2">
                <Check size={15} className="text-emerald-600" strokeWidth={2.5} />
                <span className="font-bold text-emerald-700 text-sm">After Rupway — one tool, done</span>
              </div>
              <div className="p-5 space-y-3">
                {after.map((label, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-indigo-50/40 hover:border-indigo-100 transition-colors duration-150">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-emerald-600" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </div>
                ))}
                <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-indigo-50 border border-indigo-100 mt-1">
                  <span className="text-sm font-semibold text-indigo-700">₹499/mo replaces 4 tools</span>
                  <ArrowRight size={13} className="text-indigo-600" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Stats row — all indigo, consistent */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="text-center p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="text-3xl font-bold text-indigo-600">{s.stat}</div>
                <div className="text-xs text-gray-500 mt-2 leading-relaxed">{s.text}</div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
