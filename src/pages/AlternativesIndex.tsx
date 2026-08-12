import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Scale } from 'lucide-react'
import { useSeo } from '../lib/useSeo'
import { FadeIn } from '../components/ui/FadeIn'

const CANONICAL = 'https://getclearwork.in/alternatives'

const comparisons = [
  {
    title: 'HoneyBook Alternative India',
    desc: 'HoneyBook is not available in India — no UPI, no GST, Stripe-only payouts. See the India-ready alternative.',
    href: '/alternatives/honeybook-alternative-india',
    primary: true,
  },
  {
    title: 'Bonsai Alternative',
    desc: 'Same all-in-one workflow as Bonsai, with GST invoicing, UPI, and IT Act e-sign built for India.',
    href: '/alternatives/bonsai-alternative-india',
  },
  {
    title: 'Dubsado Alternative',
    desc: 'Simpler setup than Dubsado, with rupee pricing and India-native billing from day one.',
    href: '/alternatives/dubsado-alternative-india',
  },
  {
    title: 'HoneyBook vs Bonsai vs Dubsado',
    desc: 'Hub comparing all three global freelancer suites against ClearWork for Indian service businesses.',
    href: '/blog/honeybook-bonsai-dubsado-alternative-india',
  },
  {
    title: 'Refrens Alternative',
    desc: 'Beyond invoicing — full proposals, contracts, client portal, and CRM in one workflow.',
    href: '/blog/refrens-alternative-india',
  },
  {
    title: 'Best Freelancer Software India 2026',
    desc: 'Round-up of every major tool — who passes the India checklist and who does not.',
    href: '/blog/best-freelancer-software-india-2026',
  },
]

export default function AlternativesIndex() {
  useSeo(
    'ClearWork Alternatives Hub — Compare Freelancer & Agency Tools for India',
    'Compare ClearWork to HoneyBook, Bonsai, Dubsado, Refrens, and other tools. India-focused alternative pages with GST, UPI, and rupee pricing.',
    CANONICAL,
  )

  return (
    <div className="bg-white">
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-[0.25] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm">
              <Scale size={12} />
              Compare
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight">
              Tool alternatives, built for India
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Honest comparisons of global freelancer platforms vs ClearWork — GST, UPI, rupee pricing,
              and IT Act e-sign included.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <div className="grid gap-4">
            {comparisons.map((item, i) => (
              <FadeIn key={item.href} delay={i * 0.05}>
                <Link
                  to={item.href}
                  className={`group flex items-start gap-4 rounded-2xl border p-6 transition-all hover:shadow-md ${
                    item.primary
                      ? 'border-gray-900 bg-gray-950 text-white hover:bg-gray-900'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <h2 className={`text-lg font-bold ${item.primary ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </h2>
                    <p className={`mt-1.5 text-sm leading-relaxed ${item.primary ? 'text-white/70' : 'text-gray-500'}`}>
                      {item.desc}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className={`shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 ${
                      item.primary ? 'text-white/60' : 'text-gray-400'
                    }`}
                  />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
