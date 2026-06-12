import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function FounderNote() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 px-5 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Decorative quote mark */}
          <div className="absolute -top-3 -left-2 w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
            <Quote size={18} className="text-indigo-400" />
          </div>

          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 sm:p-10 pl-10 sm:pl-12">
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-medium">
              We built ClearWork because we ran a small design studio for four years
              and spent more time chasing payments and fixing GST errors than actually
              designing. Every tool we tried was built for the US — wrong currency,
              wrong tax system, no UPI payments, no WhatsApp.
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mt-4">
              The fix didn't exist. So we built it ourselves — for the 15 million
              freelancers and agencies who deserve the same professional workflow that
              studios in New York and London take for granted.
            </p>

            <div className="mt-8 flex items-center gap-4 pt-6 border-t border-gray-200">
              <div className="flex -space-x-1">
                {['#6366F1', '#10B981', '#F59E0B', '#EF4444'].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">The ClearWork team</p>
                <p className="text-xs text-gray-400">Freelancers building for freelancers · Bengaluru, India</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
