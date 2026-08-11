import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { CheckCircle2, ChevronRight, ArrowDown } from 'lucide-react'
import { trackCTAClick } from '../lib/analytics'

const APP_REGISTER = 'https://app.getclearwork.in/signup'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* Magnetic button — cursor attraction on hover; inert when reduced motion is requested */
function MagneticCTA({ href, children, onClick, className }: {
  href: string; children: React.ReactNode; onClick?: () => void; className?: string
}) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 180, damping: 18 })
  const sy = useSpring(my, { stiffness: 180, damping: 18 })

  function onMove(e: React.MouseEvent) {
    if (shouldReduceMotion || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.28)
    my.set((e.clientY - (r.top  + r.height / 2)) * 0.28)
  }
  function onLeave() { mx.set(0); my.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.a>
  )
}

/* Floating stat badge */
function StatBadge({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1,    y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.25 : 0.6, delay: shouldReduceMotion ? 0 : delay, ease }}
      className={`absolute z-20 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl
        bg-white/90 backdrop-blur-md border border-white/60
        shadow-[0_8px_32px_rgba(0,0,0,0.10)] ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const dashY     = useTransform(scrollYProgress, [0, 1], [0, -80])
  const dashScale = useTransform(scrollYProgress, [0, 1], [1, 0.97])
  const dashOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const heroY       = useTransform(scrollYProgress, [0, 0.55], [0, -40])

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.10 } },
  }
  const item = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.25 } } }
    : {
        hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
        show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.75, ease } },
      }

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #EEF2FF 0%, #F5F3FF 28%, #FAF8FF 55%, #FAFAF9 100%)' }}
    >
      {/* ── Animated mesh orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{
            top: '-15%', left: '-10%',
            width: '60%', height: '65%',
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.22) 0%, transparent 65%)',
            filter: 'blur(80px)',
            animation: shouldReduceMotion ? 'none' : 'mesh-1 18s ease-in-out infinite',
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            top: '-5%', right: '-8%',
            width: '50%', height: '55%',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 65%)',
            filter: 'blur(90px)',
            animation: shouldReduceMotion ? 'none' : 'mesh-2 22s ease-in-out infinite',
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            top: '35%', left: '20%',
            width: '55%', height: '45%',
            background: 'radial-gradient(ellipse, rgba(244,114,182,0.10) 0%, transparent 65%)',
            filter: 'blur(100px)',
            animation: shouldReduceMotion ? 'none' : 'mesh-3 15s ease-in-out infinite',
          }}
        />
      </div>

      {/* Fine grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      {/* Noise grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.045,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── Hero content ── */}
      <motion.div
        style={shouldReduceMotion ? {} : { opacity: heroOpacity, y: heroY }}
        className="relative z-10"
      >
        <div className="max-w-5xl mx-auto px-5 pt-28 sm:pt-36 pb-10 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            {/* Badge */}
            <motion.div variants={item} className="mb-8">
              <a
                href={APP_REGISTER}
                onClick={() => trackCTAClick('early_access_badge', 'hero')}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                  border border-indigo-200/80 bg-white/70 backdrop-blur-sm
                  shadow-[0_2px_12px_rgba(99,102,241,0.12)]
                  text-sm font-medium text-indigo-800 hover:bg-white/90 transition-all duration-200 group"
              >
                <span
                  className="w-2 h-2 rounded-full bg-emerald-500"
                  style={{ animation: shouldReduceMotion ? 'none' : 'glow-pulse 2.2s ease-in-out infinite' }}
                />
Free 15-day Pro trial · No credit card needed
                <ChevronRight size={13} className="text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-black tracking-tight text-stone-900 leading-[1.02]"
              style={{ fontSize: 'clamp(44px, 7vw, 84px)', letterSpacing: '-0.03em' }}
            >
              Find clients. Win them.
              <br />
              <span
                className="serif-accent"
                style={{
                  fontSize: 'clamp(46px, 7.2vw, 87px)',
                  background: 'linear-gradient(135deg, #4338CA 0%, #4F46E5 45%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 400,
                }}
              >
                Get paid.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={item}
              className="mt-6 text-stone-500 leading-relaxed font-normal"
              style={{ fontSize: 'clamp(16px, 1.3vw, 19px)', maxWidth: 540 }}
            >
              The end-to-end business platform for Indian freelancers, consultants, and growing
              agencies — AI-powered lead discovery <em className="text-stone-400 font-normal not-italic">(coming soon)</em>,
              tracked proposals, e-sign contracts, GST invoices, and UPI payments, all connected
              in one place.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="mt-9 flex flex-wrap justify-center gap-3">
              <MagneticCTA
                href={APP_REGISTER}
                onClick={() => trackCTAClick('hero_cta', 'hero')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5
                  rounded-full bg-stone-950 text-white font-semibold text-sm
                  hover:bg-stone-800 transition-colors duration-200
                  shadow-[0_4px_20px_rgba(0,0,0,0.22)]"
              >
                Start free trial
                <ChevronRight size={14} />
              </MagneticCTA>
              <motion.a
                href="#how-it-works"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3.5
                  rounded-full border border-stone-200 bg-white/80 backdrop-blur-sm
                  text-stone-700 font-medium text-sm
                  hover:border-stone-300 hover:bg-white transition-all duration-200"
              >
                See how it works
                <ArrowDown size={13} className="text-stone-400" />
              </motion.a>
            </motion.div>

            {/* Trust micro-row */}
            <motion.div variants={item} className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
              {['15-day free Pro trial', 'No credit card needed', 'GST · UPI · e-sign built-in'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-stone-400">
                  <CheckCircle2 size={12} className="text-emerald-500" strokeWidth={2.5} />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ── Dashboard showcase ── */}
        <div className="relative z-10 max-w-5xl mx-auto px-5 pb-0">
          <motion.div
            style={shouldReduceMotion ? {} : { y: dashY, scale: dashScale, opacity: dashOpacity }}
            className="relative"
          >
            {/* Glow behind dashboard */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: '-24px -32px 0',
                background: 'radial-gradient(ellipse at 50% 80%, rgba(99,102,241,0.18) 0%, transparent 65%)',
                filter: 'blur(24px)',
              }}
            />

            {/* Floating stat badges */}
            <StatBadge delay={0.9} className="-top-4 -left-2 sm:-left-8">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div>
                <p className="text-[11px] font-bold text-stone-800 leading-none">Invoice paid</p>
                <p className="text-[10px] text-stone-400 mt-0.5">₹45,000 · via UPI</p>
              </div>
            </StatBadge>

            <StatBadge delay={1.1} className="-top-4 -right-2 sm:-right-8">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <div>
                <p className="text-[11px] font-bold text-stone-800 leading-none">Proposal opened</p>
                <p className="text-[10px] text-stone-400 mt-0.5">Priya viewed · just now</p>
              </div>
            </StatBadge>

            <StatBadge delay={1.3} className="bottom-12 -left-2 sm:-left-10 hidden sm:flex">
              <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <div>
                <p className="text-[11px] font-bold text-stone-800 leading-none">Contract signed</p>
                <p className="text-[10px] text-stone-400 mt-0.5">OTP verified · IT Act 2000</p>
              </div>
            </StatBadge>

            {/* Browser chrome + screenshot */}
            <motion.div
              initial={{ opacity: 0, y: 48, scale: 0.96 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              transition={{ duration: shouldReduceMotion ? 0.3 : 1.0, delay: shouldReduceMotion ? 0 : 0.55, ease }}
              className="relative rounded-t-2xl overflow-hidden"
              style={{
                boxShadow: '0 -4px 80px rgba(99,102,241,0.14), 0 -2px 0 rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.06)',
              }}
            >
              {/* Mac-style titlebar */}
              <div
                className="flex items-center gap-1.5 px-4 py-2.5"
                style={{ background: 'linear-gradient(180deg, #1C1C1E 0%, #18181B 100%)' }}
              >
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
                <div className="flex-1 mx-3">
                  <div
                    className="max-w-[200px] mx-auto h-5 rounded-md flex items-center justify-center gap-1.5 px-3"
                    style={{ background: 'rgba(255,255,255,0.07)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-white/35 font-mono">app.getclearwork.in</span>
                  </div>
                </div>
              </div>
              <img
                src="/screenshots/screenshot-dashboard.png"
                alt="ClearWork dashboard"
                className="w-full h-auto block"
                loading="eager"
                draggable={false}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
