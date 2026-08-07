import { motion } from 'framer-motion'
import { Search, MapPin, Users, Sparkles, ArrowRight, Telescope } from 'lucide-react'
import { FadeIn } from './ui/FadeIn'
import { trackCTAClick } from '../lib/analytics'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const APP_REGISTER = 'https://app.getclearwork.in/signup'

const sources = [
  { icon: Users, label: 'LinkedIn' },
  { icon: MapPin, label: 'Google Maps' },
  { icon: Search, label: 'Business directories' },
]

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

/* Illustrative mock — not a real screenshot, since this feature is in early access build */
function ProspectCardMock({ name, biz, match, delay }: { name: string; biz: string; match: number; delay: number }) {
  return (
    <motion.div
      variants={card}
      transition={{ duration: 0.5, delay, ease }}
      className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-stone-100 shadow-[0_1px_4px_rgba(0,0,0,0.05)]"
    >
      <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 font-bold text-indigo-600 text-xs">
        {name.slice(0, 2).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-stone-800 leading-none truncate">{name}</p>
        <p className="text-[11px] text-stone-400 mt-0.5 truncate">{biz}</p>
      </div>
      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 shrink-0">
        {match}% match
      </span>
    </motion.div>
  )
}

export default function LeadFinderSection() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: '#0C0A09' }}>
      <div className="absolute inset-0 grid-dark pointer-events-none opacity-50" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(79,70,229,0.18) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-amber-400/25 bg-amber-400/10 text-amber-300 mb-6">
              <Sparkles size={11} />
              Coming soon · Early access
            </span>

            <h2
              className="font-black text-white tracking-tight leading-[1.05]"
              style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', letterSpacing: '-0.02em' }}
            >
              "How do I find more clients?"
            </h2>
            <p className="text-white/50 text-base mt-2 font-medium">
              The question every freelancer asks — before any CRM matters.
            </p>

            <p className="text-white/50 leading-relaxed mt-5 max-w-md">
              We're building an AI Lead Finder that searches LinkedIn, Google Maps, and business
              directories for people who actually need your service — scores them by fit, and
              drops them straight into your ClearWork pipeline. No more guessing who to pitch.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {sources.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
                >
                  <s.icon size={12} />
                  {s.label}
                </span>
              ))}
            </div>

            <motion.a
              href={APP_REGISTER}
              onClick={() => trackCTAClick('leadfinder_early_access', 'lead_finder_section')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-white text-stone-950 font-semibold text-sm shadow-[0_4px_20px_rgba(255,255,255,0.12)]"
            >
              Get early access
              <ArrowRight size={14} />
            </motion.a>
          </FadeIn>

          {/* Illustrative prospect list mock */}
          <FadeIn delay={0.12}>
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-500/10 rounded-3xl blur-2xl pointer-events-none" />
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4">
                <div className="flex items-center gap-2 mb-4 px-1">
                  <Telescope size={14} className="text-indigo-300" />
                  <span className="text-xs font-semibold text-white/60">AI Lead Finder — preview</span>
                  <span className="ml-auto text-[10px] font-bold text-amber-300/80 uppercase tracking-wide">In build</span>
                </div>
                <motion.div
                  variants={grid}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  className="space-y-2.5"
                >
                  <ProspectCardMock name="Rina Studio" biz="Interior design · Mumbai" match={92} delay={0} />
                  <ProspectCardMock name="Kunal Verma" biz="D2C brand · Bengaluru" match={87} delay={0.08} />
                  <ProspectCardMock name="Cafe Noor" biz="Hospitality · Delhi" match={81} delay={0.16} />
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
