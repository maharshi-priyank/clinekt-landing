import { motion } from 'framer-motion'
import { Bell, IndianRupee, PenLine, ArrowRight } from 'lucide-react'
import { FadeIn } from './ui/FadeIn'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

const moments = [
  {
    icon: Bell,
    number: '01',
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
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    accentBorder: 'border-t-2 border-t-emerald-500',
    title: 'Paid in under 5 minutes',
    story: 'You send an invoice. Client clicks the payment link. Pays via UPI. You get a push notification. No bank-details copy-paste, no "did you receive it?" WhatsApp.',
    outcome: 'You tell everyone you know.',
    outcomeColor: 'text-emerald-600',
  },
  {
    icon: PenLine,
    number: '03',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    accentBorder: 'border-t-2 border-t-indigo-500',
    title: 'Contract signed in 3 minutes',
    story: 'Client accepts the proposal. One click: contract generated with all scope, price, timelines pre-filled. Client signs via OTP on their phone.',
    outcome: 'Legally valid before you open a new tab.',
    outcomeColor: 'text-indigo-600',
  },
]

type Moment = typeof moments[0]

function Card({ m }: { m: Moment }) {
  return (
    <motion.div
      variants={card}
      className={`h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col ${m.accentBorder}`}
    >
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${m.iconBg}`}>
            <m.icon size={18} className={m.iconColor} />
          </div>
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{m.number}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-950 leading-snug mb-3">{m.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{m.story}</p>

        <div className="flex items-center gap-2 pt-4 mt-4 border-t border-gray-100">
          <ArrowRight size={13} className={m.outcomeColor} />
          <p className={`text-xs font-bold ${m.outcomeColor}`}>{m.outcome}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function AhaMoments() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-5xl mx-auto px-5">
        <FadeIn className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Why users never go back
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tight">
            3 moments that make you{' '}
            <span className="gradient-text">never go back.</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            The exact seconds where the value hits — so hard you can't believe
            you worked without it.
          </p>
        </FadeIn>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          {moments.map((m) => (
            <Card key={m.number} m={m} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
