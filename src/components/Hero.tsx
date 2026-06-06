import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CheckCircle2, ChevronRight, Users } from 'lucide-react'
import { useWaitlistCount } from '../hooks/useWaitlistCount'

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

  const { scrollY } = useScroll()
  const rotateX  = useTransform(scrollY, [0, 420], [14, 0],    { clamp: true })
  const scale    = useTransform(scrollY, [0, 420], [0.88, 1],  { clamp: true })
  const dashY    = useTransform(scrollY, [0, 420], [32, 0],    { clamp: true })
  const opacity  = useTransform(scrollY, [0, 420], [0.92, 1],  { clamp: true })

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #bdd8e6 0%, #cdd4c4 42%, #dccdb8 68%, #e8dfd0 100%)' }}
    >
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      <div className="relative z-10 pt-36 pb-0 px-5">

        {/* ── Centered text stack ── */}
        <motion.div
          variants={stagger} initial="hidden" animate="show"
          className="flex flex-col items-center text-center mx-auto"
          style={{ maxWidth: 780 }}
        >
          {/* Badge */}
          <motion.div variants={item} className="mb-8">
            <a href="#waitlist"
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

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 mt-9">
            <a href="#waitlist"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-950/20"
            >
              Join the waitlist — it's free
              <ArrowRight size={15} />
            </a>
            <a href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/55 backdrop-blur-sm text-gray-800 font-semibold text-sm border border-white/80 hover:bg-white/75 transition-all"
            >
              See how it works
            </a>
          </motion.div>

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

        {/* ── Dashboard mockup — scroll-driven tilt ── */}
        <motion.div
          initial={{ opacity: 0, y: 64 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.45, ease }}
          className="relative mx-auto mt-16"
          style={{ maxWidth: 1080, perspective: 1200, perspectiveOrigin: '50% -10%' }}
        >
          <motion.div style={{ rotateX, scale, y: dashY, opacity, transformOrigin: 'top center' }}>
            <div style={{
              borderRadius: '16px 16px 0 0',
              overflow: 'hidden',
              boxShadow: '0 -4px 80px rgba(15,23,42,0.16), 0 0 0 1px rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.75)',
              borderBottom: 'none',
              background: '#fff',
            }}>
              {/* Browser chrome */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: '#F8F9FA', borderBottom: '1px solid #EAECF0' }}>
                <div style={{ display: 'flex', gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA41' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, padding: '3px 14px', fontSize: 10, color: '#9CA3AF', fontFamily: '"DM Sans", sans-serif' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981' }} />
                    app.clearwork.in
                  </div>
                </div>
              </div>

              {/* Screenshot */}
              <img
                src="/screenshots/screenshot-dashboard.png"
                alt="ClearWork dashboard"
                style={{ width: '100%', display: 'block' }}
                loading="eager"
              />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
