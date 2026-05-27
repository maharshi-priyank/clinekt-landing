import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, FileCheck, Lock, BadgeCheck, IndianRupee, Landmark } from 'lucide-react'

const badges = [
  {
    icon: IndianRupee,
    label: 'Razorpay payments',
    sub:   'UPI · Cards · Net banking',
    color: 'text-blue-600',
    bg:    'bg-blue-50',
  },
  {
    icon: FileCheck,
    label: 'GST e-invoice ready',
    sub:   'IRN & QR code spec',
    color: 'text-emerald-600',
    bg:    'bg-emerald-50',
  },
  {
    icon: BadgeCheck,
    label: 'IT Act 2000 e-sign',
    sub:   'Legally valid in India',
    color: 'text-indigo-600',
    bg:    'bg-indigo-50',
  },
  {
    icon: Lock,
    label: 'AES-256 encrypted',
    sub:   'Bank-grade data security',
    color: 'text-gray-700',
    bg:    'bg-gray-100',
  },
  {
    icon: Landmark,
    label: 'Hosted in India',
    sub:   'Data stays on Indian servers',
    color: 'text-orange-600',
    bg:    'bg-orange-50',
  },
  {
    icon: ShieldCheck,
    label: '30-day refund',
    sub:   'No questions asked',
    color: 'text-rose-600',
    bg:    'bg-rose-50',
  },
]

export default function TrustStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} className="bg-gray-50 border-y border-gray-100 py-8 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6"
        >
          Built for India. Serious about trust.
        </motion.p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {badges.map(({ icon: Icon, label, sub, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100 shadow-sm"
            >
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-2`}>
                <Icon size={16} className={color} />
              </div>
              <p className="text-xs font-semibold text-gray-900 leading-snug">{label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
