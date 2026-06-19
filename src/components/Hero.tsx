import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import { trackCTAClick } from '../lib/analytics'
import { ContainerScroll } from './ui/container-scroll-animation'

const APP_REGISTER = 'https://app.getclearwork.in/signup'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #deeaf4 0%, #e4ecf4 50%, #eaecf0 72%, #edeae6 100%)' }}
    >
      {/* Radial glow orbs — ambient breathing light */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '-10%', left: '-8%',
          width: '55%', height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.20) 0%, transparent 68%)',
          filter: 'blur(72px)',
        }}
        animate={{ scale: [1, 1.18, 1], x: [0, 18, 0], y: [0, -14, 0] }}
        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '-8%', right: '-6%',
          width: '48%', height: '55%',
          background: 'radial-gradient(ellipse at center, rgba(251,146,60,0.16) 0%, transparent 68%)',
          filter: 'blur(80px)',
        }}
        animate={{ scale: [1, 1.14, 1], x: [0, -22, 0], y: [0, 16, 0] }}
        transition={{ duration: 13, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', delay: 1.5 }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '28%', left: '25%',
          width: '50%', height: '40%',
          background: 'radial-gradient(ellipse at center, rgba(244,114,182,0.10) 0%, transparent 65%)',
          filter: 'blur(90px)',
        }}
        animate={{ scale: [1, 1.22, 1], x: [0, 12, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', delay: 3 }}
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.055,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative z-10 pt-12 sm:pt-20">
        <ContainerScroll
          titleComponent={
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center text-center mx-auto px-4"
              style={{ maxWidth: 780 }}
            >
              {/* Badge */}
              <motion.div variants={item} className="mb-8">
                <a
                  href={APP_REGISTER}
                  onClick={() => trackCTAClick('early_access_badge', 'hero')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/70 bg-white/50 backdrop-blur-sm shadow-sm text-sm font-medium text-gray-700 hover:bg-white/70 transition-colors group"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Free during Early Access · No credit card needed
                  <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={item}
                className="font-black leading-[1.02] tracking-tighter text-gray-950"
                style={{ fontSize: 'clamp(52px, 7.5vw, 88px)' }}
              >
                Proposals to payments,<br />all in one place.
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={item}
                className="mt-6 text-gray-600 leading-relaxed"
                style={{ fontSize: 'clamp(16px, 1.35vw, 19px)', maxWidth: 520 }}
              >
                The client management software for freelancers, consultants, and growing agencies.
                Proposals, contracts, invoices, and payments — one place, zero spreadsheets.
              </motion.p>

              {/* CTA */}
              <motion.div variants={item} className="mt-9">
                <a
                  href={APP_REGISTER}
                  onClick={() => trackCTAClick('hero_cta', 'hero')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/20"
                >
                  Get started free
                  <ChevronRight size={15} />
                </a>
              </motion.div>

              {/* Trust micro-row */}
              <motion.div variants={item} className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
                {['Completely free right now', 'No credit card', 'GST + UPI payments built-in'].map(t => (
                  <span key={t} className="flex items-center gap-1.5 text-sm text-gray-500/90">
                    <CheckCircle2 size={13} className="text-emerald-600" strokeWidth={2.5} />
                    {t}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          }
        >
          <img
            src="/screenshots/screenshot-dashboard.png"
            alt="ClearWork dashboard"
            className="w-full h-auto block"
            loading="eager"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </section>
  )
}
