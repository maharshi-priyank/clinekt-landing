import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Bell, IndianRupee, PenLine, Bot, FileSpreadsheet, Zap, ArrowRight } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const moments = [
  {
    icon: Bell,
    number: '01',
    tag: 'MVP',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    accentBorder: 'border-t-2 border-t-indigo-500',
    title: 'The proposal open ping',
    story: 'You send a proposal and go for lunch. Your phone buzzes: "Rahul just opened your proposal — spent 4 min on the pricing page." You call him right then.',
    outcome: 'Deal closed before coffee gets cold.',
    outcomeColor: 'text-indigo-600',
  },
  {
    icon: IndianRupee,
    number: '02',
    tag: 'MVP',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    accentBorder: 'border-t-2 border-t-emerald-500',
    title: 'Paid in under 5 minutes',
    story: 'You send an invoice. Client clicks Razorpay. Pays via UPI. You get a push notification. No bank-details copy-paste, no "did you receive it?" WhatsApp.',
    outcome: 'You tell every freelancer you know.',
    outcomeColor: 'text-emerald-600',
  },
  {
    icon: PenLine,
    number: '03',
    tag: 'MVP',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    accentBorder: 'border-t-2 border-t-indigo-500',
    title: 'Contract signed in 3 minutes',
    story: 'Client accepts the proposal. One click: contract generated with all scope, price, timelines pre-filled. Client signs via OTP on their phone.',
    outcome: 'Legally valid before you open a new tab.',
    outcomeColor: 'text-indigo-600',
  },
  {
    icon: Zap,
    number: '04',
    tag: 'Autopilot',
    tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    accentBorder: 'border-t-2 border-t-indigo-500',
    title: 'You wake up. It already happened.',
    story: 'Client accepted the proposal at 11 PM. Rupway auto-generated the contract, sent it for signature, and queued the first invoice. By morning, the contract is signed and payment is on the way. You did nothing.',
    outcome: 'This is what "configured once" feels like.',
    outcomeColor: 'text-indigo-600',
  },
  {
    icon: Bot,
    number: '05',
    tag: 'v2',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-100',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    accentBorder: 'border-t-2 border-t-amber-500',
    title: 'AI follow-up that sounds like you',
    story: 'Paste 3 lines about a lead. AI writes a follow-up that references their specific project, their timeline, your last conversation. Send. Reply in an hour.',
    outcome: 'The moment users upgrade to Studio.',
    outcomeColor: 'text-amber-600',
  },
  {
    icon: FileSpreadsheet,
    number: '06',
    tag: 'v1.5',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-100',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    accentBorder: 'border-t-2 border-t-emerald-500',
    title: 'GST filed without a CA visit',
    story: 'Quarter ends. Open GST report, export PDF, send to CA on WhatsApp. CA replies: "This is perfect." You saved ₹2,000 and 3 hours of back-and-forth.',
    outcome: 'CA recommends you to their other clients.',
    outcomeColor: 'text-emerald-600',
  },
]

type Moment = typeof moments[0]

function Card({ m }: { m: Moment }) {
  return (
    <div className={`h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col ${m.accentBorder}`}>
      <div className="p-6 flex flex-col flex-1">
        {/* Top: icon + number + tag */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${m.iconBg}`}>
              <m.icon size={18} className={m.iconColor} />
            </div>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{m.number}</span>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${m.tagColor}`}>
            {m.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-950 leading-snug mb-3">{m.title}</h3>

        {/* Story */}
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{m.story}</p>

        {/* Outcome */}
        <div className="flex items-center gap-2 pt-4 mt-4 border-t border-gray-100">
          <ArrowRight size={13} className={m.outcomeColor} />
          <p className={`text-xs font-bold ${m.outcomeColor}`}>{m.outcome}</p>
        </div>
      </div>
    </div>
  )
}

export default function AhaMoments() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Why users never leave
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tight">
            6 moments that make you{' '}
            <span className="gradient-text">never go back.</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            The exact seconds where the value hits — so hard you can't believe
            you worked without it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {moments.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
            >
              <Card m={m} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
