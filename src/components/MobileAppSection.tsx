import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Share, MoreHorizontal, Plus, Smartphone } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const perks = [
  'Full dashboard — revenue, pipeline, overdue at a glance',
  'Approve proposals and view signed contracts',
  'Send invoices and collect payments from anywhere',
  'Looks and feels like a native app — no store needed',
]

const steps = {
  ios: [
    { icon: Share,         label: 'Tap the Share button in Safari' },
    { icon: Plus,          label: 'Scroll down and tap "Add to Home Screen"' },
    { icon: Smartphone,    label: 'Tap Add — it appears like any app' },
  ],
  android: [
    { icon: MoreHorizontal, label: 'Tap the ⋮ menu in Chrome' },
    { icon: Plus,           label: 'Tap "Add to Home Screen"' },
    { icon: Smartphone,     label: 'Tap Add — opens full-screen, no browser bar' },
  ],
}

export default function MobileAppSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: phone frame */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 scale-110 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />
              <div
                className="relative rounded-[44px] border-[4px] border-white/10 bg-gray-800 shadow-2xl overflow-hidden"
                style={{ width: 260 }}
              >
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full z-10" />
                <img
                  src="/screenshots/screenshot-mobile.png"
                  alt="Clinekt mobile web app"
                  className="w-full block"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: copy */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="flex flex-col"
          >
            <span className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/60 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Works on mobile
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug">
              Your business,{' '}
              <br />
              in your pocket.
            </h2>

            <p className="text-gray-400 text-base mt-4 leading-relaxed max-w-md">
              Clinekt is a web app that installs directly on your phone — no App Store, no Play Store.
              Just open it in your browser and add it to your home screen in seconds.
            </p>

            <ul className="mt-6 space-y-2.5">
              {perks.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={15} className="text-indigo-400 shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-sm text-gray-300 leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>

            {/* Install instructions */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* iOS */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  {/* Apple logo */}
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white/60 shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span className="text-xs font-bold text-white/80">iPhone (Safari)</span>
                </div>
                <ol className="space-y-2">
                  {steps.ios.map((s, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/40 shrink-0">{i + 1}</span>
                      <span className="text-xs text-gray-400 leading-snug">{s.label}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Android */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  {/* Android / Chrome logo */}
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#4285F4"/>
                    <path fill="white" d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                    <circle cx="12" cy="12" r="2" fill="#4285F4"/>
                  </svg>
                  <span className="text-xs font-bold text-white/80">Android (Chrome)</span>
                </div>
                <ol className="space-y-2">
                  {steps.android.map((s, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/40 shrink-0">{i + 1}</span>
                      <span className="text-xs text-gray-400 leading-snug">{s.label}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}
