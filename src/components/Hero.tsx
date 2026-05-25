import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Bell, IndianRupee, Pen, Star, ChevronRight } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

const avatars = ['R', 'P', 'N', 'S', 'A']
const avatarColors = ['bg-indigo-500', 'bg-indigo-400', 'bg-emerald-500', 'bg-indigo-600', 'bg-indigo-300']

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden bg-white">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.35] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-white pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex justify-center mb-8"
        >
          <a href="#waitlist" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-gray-600 hover:border-gray-300 transition-colors group">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Now accepting early access signups</span>
            <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Headline */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="text-center">
          <motion.h1 variants={item}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[1.02] tracking-tighter text-gray-950 max-w-5xl mx-auto"
          >
            Connect clients.{' '}
            <br className="hidden sm:block" />
            Close deals.{' '}
            <br className="hidden sm:block" />
            Get paid.{' '}
            <span className="shimmer-text">Clinekt.</span>
          </motion.h1>

          <motion.p variants={item}
            className="mt-7 text-lg md:text-xl text-gray-500 max-w-lg mx-auto leading-relaxed"
          >
            The only business tool built for Indian freelancers.
            GST invoices, e-signed contracts, and Razorpay payments — all from one place.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
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

          {/* Trust row */}
          <motion.div variants={item} className="flex flex-wrap justify-center items-center gap-6 mt-7">
            {['Free forever plan', 'No credit card required', 'GST + Razorpay built-in'].map(t => (
              <span key={t} className="flex items-center gap-1.5 text-sm text-gray-400">
                <CheckCircle2 size={13} className="text-emerald-500" strokeWidth={2.5} />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex justify-center items-center gap-3 mt-12"
        >
          <div className="flex -space-x-2">
            {avatars.map((a, i) => (
              <div key={i} className={`w-8 h-8 rounded-full ${avatarColors[i]} flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm`}>
                {a}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
          </div>
          <span className="text-sm text-gray-500 font-medium">500+ freelancers on the waitlist</span>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 56, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="mt-16 relative"
        >
          {/* Glow */}
          <div className="absolute inset-x-16 -bottom-4 h-20 bg-indigo-300/30 blur-2xl rounded-full pointer-events-none" />

          {/* Browser frame */}
          <div className="relative rounded-2xl shadow-2xl shadow-gray-300/50 border border-gray-200 bg-white overflow-hidden">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50/80 border-b border-gray-100">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="max-w-xs mx-auto h-6 bg-white rounded-md border border-gray-200 flex items-center justify-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs text-gray-400">app.clinekt.io/dashboard</span>
                </div>
              </div>
            </div>

            {/* App content */}
            <div className="bg-gray-50/50 p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sidebar */}
              <div className="hidden md:flex flex-col gap-0.5">
                {['Dashboard', 'Leads', 'Proposals', 'Contracts', 'Invoices', 'Clients'].map((label, i) => (
                  <div key={label} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    i === 0 ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:bg-white hover:text-gray-800'
                  }`}>
                    <div className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-white' : 'bg-gray-300'}`} />
                    {label}
                  </div>
                ))}
              </div>

              {/* Main area */}
              <div className="md:col-span-2 space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'This month', value: '₹1,59,000', change: '+34%', color: 'text-emerald-600', bg: 'bg-white border-gray-100' },
                    { label: 'Pipeline', value: '₹5,60,000', change: '8 active', color: 'text-indigo-600', bg: 'bg-white border-gray-100' },
                    { label: 'Overdue', value: '₹22,000', change: '1 invoice', color: 'text-orange-600', bg: 'bg-white border-gray-100' },
                  ].map(s => (
                    <div key={s.label} className={`p-3 rounded-xl border ${s.bg}`}>
                      <div className="text-xs text-gray-400 mb-1">{s.label}</div>
                      <div className="font-bold text-gray-900 text-base leading-none">{s.value}</div>
                      <div className={`text-xs mt-1 font-semibold ${s.color}`}>{s.change}</div>
                    </div>
                  ))}
                </div>

                {/* Recent leads */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-gray-50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Active leads</span>
                    <span className="text-xs text-indigo-600 font-semibold">View all</span>
                  </div>
                  {[
                    { name: 'Rohan Sharma', service: 'Brand identity', amount: '₹45,000', status: 'Proposal sent', dot: 'bg-indigo-400' },
                    { name: 'Priya Mehta', service: 'Website redesign', amount: '₹80,000', status: 'Contract signed', dot: 'bg-emerald-400' },
                    { name: 'TechStart Inc', service: 'Social media', amount: '₹22,000', status: 'Invoice overdue', dot: 'bg-amber-400' },
                  ].map((lead, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                      <div className={`w-7 h-7 rounded-full ${['bg-indigo-100', 'bg-emerald-100', 'bg-amber-100'][i]} flex items-center justify-center flex-shrink-0`}>
                        <span className={`text-xs font-bold ${['text-indigo-600', 'text-emerald-600', 'text-amber-600'][i]}`}>{lead.name[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900">{lead.name}</div>
                        <div className="text-xs text-gray-400">{lead.service}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">{lead.amount}</div>
                        <div className="flex items-center gap-1 justify-end mt-0.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${lead.dot}`} />
                          <div className="text-xs text-gray-400">{lead.status}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating notification cards */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -right-2 md:right-4 hidden sm:flex items-center gap-2.5 px-4 py-3 bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100"
          >
            <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center">
              <IndianRupee size={15} className="text-emerald-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">₹45,000 received</div>
              <div className="text-xs text-gray-400">Paid via UPI · just now</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-4 -left-2 md:left-4 hidden sm:flex items-center gap-2.5 px-4 py-3 bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100"
          >
            <div className="w-8 h-8 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Bell size={15} className="text-indigo-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Rahul opened your proposal</div>
              <div className="text-xs text-gray-400">4 min on pricing page</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-1/3 -left-3 md:-left-6 hidden md:flex items-center gap-2.5 px-4 py-3 bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100"
          >
            <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center">
              <Pen size={15} className="text-orange-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Contract signed</div>
              <div className="text-xs text-gray-400">Priya Mehta · 2m ago</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-20 pt-8 border-t border-gray-100 flex flex-wrap justify-center gap-10 md:gap-20"
        >
          {[
            { val: '15M+', label: 'Indian freelancers' },
            { val: '6 hrs', label: 'saved per week' },
            { val: '2 min', label: 'to first invoice' },
            { val: '₹0', label: 'to get started' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-gray-950 tracking-tight">{s.val}</div>
              <div className="text-sm text-gray-400 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
