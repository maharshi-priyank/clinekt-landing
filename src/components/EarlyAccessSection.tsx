import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const APP_URL = 'https://app.getclearwork.in/signup'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease }}>
      {children}
    </motion.div>
  )
}

const features = [
  'Proposals with open tracking & e-sign contracts',
  'GST invoicing — CGST/SGST/IGST auto-split',
  'UPI + card payments directly in invoices',
  'WhatsApp payment reminders',
  'Client portal — no login required for clients',
  'AI proposal drafter',
  'Team collaboration (multi-seat)',
  'Revenue dashboard & reports',
]

export default function EarlyAccessSection() {
  return (
    <section id="early-access" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-5">
        <FadeIn className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
            <Sparkles size={11} className="text-indigo-500" />
            Early Access — Currently Free
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything free,{' '}
            <span className="gradient-text">right now.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            We're in early access and giving everyone full Studio access at no cost.
            No credit card. No trial limits. Use everything while we build with you.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Feature list */}
          <FadeIn delay={0.05}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-5">What you get — completely free</p>
              <ul className="space-y-3">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-sm text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Value prop + CTA */}
          <FadeIn delay={0.12}>
            <div className="space-y-5">
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Sparkles size={15} className="text-indigo-600" />
                  </div>
                  <span className="font-bold text-indigo-900 text-sm">Why free?</span>
                </div>
                <p className="text-sm text-indigo-800 leading-relaxed">
                  We want real freelancers and agencies to use ClearWork daily and tell us what's missing.
                  In exchange, you get the full product for free and early pricing locked in before we launch publicly.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">₹0<span className="text-base font-normal text-gray-400">/mo now</span></div>
                  <p className="text-sm text-gray-500">Full Studio access · No credit card</p>
                </div>
                <a
                  href={APP_URL}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gray-950 text-white font-bold text-sm hover:bg-gray-800 transition-all shadow-sm"
                >
                  Get started free
                  <ArrowRight size={15} />
                </a>
                <p className="text-xs text-center text-gray-400">
                  Join Indian freelancers & agencies already using ClearWork
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Built for India</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'GST invoicing (CGST/IGST)',
                    'UPI payment collection',
                    'IT Act 2000 e-sign',
                    'TDS 194J/194C support',
                    'WhatsApp reminders',
                    'INR pricing always',
                  ].map(t => (
                    <div key={t} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <CheckCircle2 size={11} className="text-emerald-500 shrink-0" strokeWidth={2.5} />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
