import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight, Users } from 'lucide-react'
import { useWaitlistCount } from '../hooks/useWaitlistCount'
import { ContainerScroll } from './ui/container-scroll-animation'

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
  const waitlistCount = useWaitlistCount()

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #deeaf4 0%, #e4ecf4 50%, #eaecf0 72%, #edeae6 100%)' }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
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
                  href="#waitlist"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/70 bg-white/50 backdrop-blur-sm shadow-sm text-sm font-medium text-gray-700 hover:bg-white/70 transition-colors group"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Now accepting early access signups
                  <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={item}
                className="font-black leading-[1.02] tracking-tighter text-gray-950"
                style={{ fontSize: 'clamp(52px, 7.5vw, 88px)' }}
              >
                Run your freelance<br />business like a pro
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={item}
                className="mt-6 text-gray-600 leading-relaxed"
                style={{ fontSize: 'clamp(16px, 1.35vw, 19px)', maxWidth: 520 }}
              >
                All-in-one platform for managing clients, projects, and payments without the chaos.
                From first contract to final invoice, we've got your back.
              </motion.p>

              {/* CTA — hidden for now, using navbar join waitlist button instead */}
              {/* <motion.div variants={item} className="mt-9">
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/20"
                >
                  Join the waitlist — it's free
                  <ArrowRight size={15} />
                </a>
              </motion.div> */}

              {/* Trust micro-row */}
              <motion.div variants={item} className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
                {['Free forever plan', 'No credit card', 'GST + Razorpay built-in'].map(t => (
                  <span key={t} className="flex items-center gap-1.5 text-sm text-gray-500/90">
                    <CheckCircle2 size={13} className="text-emerald-600" strokeWidth={2.5} />
                    {t}
                  </span>
                ))}
              </motion.div>

              {/* Waitlist count */}
              {waitlistCount !== null && (
                <motion.div variants={item} className="flex items-center gap-2 mt-4">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/55 border border-white/80">
                    <Users size={13} className="text-emerald-600" />
                  </div>
                  <span className="text-sm text-gray-500">
                    <strong className="text-gray-800">{waitlistCount.toLocaleString('en-IN')}</strong> freelancers on the waitlist
                  </span>
                </motion.div>
              )}
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
