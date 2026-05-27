import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Bell, IndianRupee, Pen, ChevronRight, Users } from 'lucide-react'
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

  return (
    <section className="relative pt-20 pb-0 overflow-hidden bg-white">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.3] pointer-events-none" />
      {/* Top glow blob */}
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-50/80 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-5rem)]">

          {/* ── Left: Copy ── */}
          <motion.div
            variants={stagger} initial="hidden" animate="show"
            className="flex flex-col justify-center py-12 lg:py-0 max-w-xl"
          >
            {/* Badge */}
            <motion.div variants={item} className="mb-7">
              <a href="#waitlist" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-gray-600 hover:border-gray-300 transition-colors group">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Now accepting early access signups
                <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={item}
              className="text-5xl sm:text-6xl xl:text-[4.25rem] font-extrabold leading-[1.04] tracking-tighter text-gray-950"
            >
              Run your freelance{' '}
              <br />
              business.{' '}
              <span className="shimmer-text">All of it.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={item}
              className="mt-6 text-lg text-gray-500 leading-relaxed max-w-md"
            >
              Leads → Proposals → E-sign → GST Invoices → Razorpay.
              Built for Indian freelancers. No spreadsheets, no chasing.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href="#waitlist"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 transition-all duration-200 shadow-lg shadow-gray-950/10">
                Join the waitlist — it's free
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-gray-700 font-semibold text-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
                See how it works
              </a>
            </motion.div>

            {/* Trust checks */}
            <motion.div variants={item} className="flex flex-wrap gap-x-6 gap-y-2 mt-7">
              {['Free forever plan', 'No credit card', 'GST + Razorpay built-in'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-gray-400">
                  <CheckCircle2 size={13} className="text-emerald-500" strokeWidth={2.5} />
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Social proof */}
            <motion.div variants={item} className="flex items-center gap-2.5 mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100">
                <Users size={14} className="text-emerald-600" />
              </div>
              <span className="text-sm text-gray-500 font-medium">
                {waitlistCount !== null
                  ? <><strong className="text-gray-900">{waitlistCount.toLocaleString('en-IN')}</strong> freelancers on the waitlist</>
                  : 'Indian freelancers on the waitlist'
                }
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Early access open
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right: Product screenshot ── */}
          <motion.div
            initial={{ opacity: 0, x: 48, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="relative hidden lg:flex items-end justify-end pb-0"
          >
            {/* Screenshot glow */}
            <div className="absolute inset-0 -bottom-8 bg-indigo-100/40 blur-3xl rounded-full pointer-events-none" />

            {/* Browser frame */}
            <div className="relative w-full rounded-tl-2xl rounded-tr-2xl shadow-2xl shadow-indigo-900/10 border border-gray-200 border-b-0 bg-white overflow-hidden"
              style={{ marginRight: '-2rem' }}>
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50/90 border-b border-gray-150">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="max-w-52 mx-auto h-6 bg-white rounded-md border border-gray-200 flex items-center justify-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[11px] text-gray-400 font-medium">app.clinekt.io/dashboard</span>
                  </div>
                </div>
              </div>

              {/* Dashboard screenshot */}
              <img
                src="/screenshots/screenshot-dashboard.png"
                alt="Clinekt dashboard — lead pipeline, revenue, invoice status"
                className="w-full block"
                loading="eager"
              />
            </div>

            {/* Floating: payment received */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-8 -left-4 flex items-center gap-2.5 px-4 py-3 bg-white rounded-2xl shadow-xl shadow-gray-200/70 border border-gray-100 z-10"
            >
              <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                <IndianRupee size={15} className="text-emerald-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">₹29,500 received</div>
                <div className="text-[11px] text-gray-400 mt-0.5">Paid via Razorpay · just now</div>
              </div>
            </motion.div>

            {/* Floating: proposal opened */}
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="absolute bottom-16 -left-6 flex items-center gap-2.5 px-4 py-3 bg-white rounded-2xl shadow-xl shadow-gray-200/70 border border-gray-100 z-10"
            >
              <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                <Bell size={15} className="text-indigo-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">Prashant opened your proposal</div>
                <div className="text-[11px] text-gray-400 mt-0.5">4 min on pricing page</div>
              </div>
            </motion.div>

            {/* Floating: contract signed */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
              className="absolute top-1/2 -translate-y-1/2 -right-2 flex items-center gap-2.5 px-4 py-3 bg-white rounded-2xl shadow-xl shadow-gray-200/70 border border-gray-100 z-10"
            >
              <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                <Pen size={15} className="text-orange-500" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">Contract signed</div>
                <div className="text-[11px] text-gray-400 mt-0.5">Prashant · 2 min ago</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease }}
        className="relative z-10 mt-8 border-t border-gray-100 bg-gray-50/70"
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-wrap justify-center divide-x divide-gray-200">
            {[
              { val: '15M+',  label: 'Indian freelancers' },
              { val: '6 hrs', label: 'saved every week' },
              { val: '2 min', label: 'to first invoice' },
              { val: '₹0',    label: 'to get started' },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center px-10 py-6">
                <div className="text-2xl font-bold text-gray-950 tracking-tight">{s.val}</div>
                <div className="text-xs text-gray-400 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
