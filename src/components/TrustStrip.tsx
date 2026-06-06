import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, FileCheck, Lock, BadgeCheck, IndianRupee, Landmark } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const badges = [
  { icon: IndianRupee, label: 'Razorpay payments', sub: 'UPI · Cards · Net banking', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: FileCheck,   label: 'GST e-invoice ready', sub: 'IRN & QR code spec', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: BadgeCheck,  label: 'IT Act 2000 e-sign', sub: 'Legally valid in India', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { icon: Lock,        label: 'AES-256 encrypted', sub: 'Bank-grade data security', color: 'text-gray-700', bg: 'bg-gray-100' },
  { icon: Landmark,    label: 'Hosted in India', sub: 'Data stays on Indian servers', color: 'text-orange-600', bg: 'bg-orange-50' },
  { icon: ShieldCheck, label: '30-day refund', sub: 'No questions asked', color: 'text-rose-600', bg: 'bg-rose-50' },
]

export default function TrustStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} className="bg-white border-y border-gray-100 py-10 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-7"
        >
          Built for India. Serious about trust.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-3">
          {badges.map(({ icon: Icon, label, sub, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06, ease }}
              className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-gray-100 shadow-sm"
            >
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={14} className={color} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900 leading-snug">{label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
