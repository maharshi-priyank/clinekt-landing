import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { FadeIn } from './ui/FadeIn'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const devices = [
  { id: 'mobile', label: 'Mobile App', src: '/screenshots/mobile_dashboard.png' },
  { id: 'web',    label: 'Web App',    src: '/screenshots/web_dashboard.png'    },
] as const

type DeviceId = (typeof devices)[number]['id']

export default function MobileAppSection() {
  const [active, setActive] = useState<DeviceId>('mobile')
  const current = devices.find(d => d.id === active)!

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })
  const rawScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0])
  const scale = useSpring(rawScale, { stiffness: 80, damping: 20 })

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden" style={{ background: '#FFFFFF' }}>
      <div className="max-w-4xl mx-auto px-5">

        {/* Eyebrow */}
        <FadeIn className="text-center mb-5">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-gray-400">
            Seamless across devices
          </p>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={0.08} className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tight leading-tight">
            Work from anywhere,
            <br />
            stay in sync
          </h2>
        </FadeIn>

        {/* Image card — scroll-driven zoom in → zoom out */}
        <motion.div style={{ scale }}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/10 border border-gray-200/60" style={{ aspectRatio: '16/10', margin: '0 auto' }}>

            {/* Switching image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={current.src}
                alt={`ClearWork ${current.label}`}
                className="w-full h-full object-cover object-top"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease }}
              />
            </AnimatePresence>

            {/* Toggle overlay — bottom center */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 rounded-full"
              style={{ background: 'rgba(30,30,30,0.72)', backdropFilter: 'blur(12px)' }}>
              {devices.map(d => (
                <button
                  key={d.id}
                  onClick={() => setActive(d.id)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    active === d.id
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
