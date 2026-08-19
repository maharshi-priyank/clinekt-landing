import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, XCircle, Scale, IndianRupee, Smartphone, FileText } from 'lucide-react'
import { useSeo } from '../lib/useSeo'

const CANONICAL = 'https://getclearwork.in/alternatives'

const CRITERIA = [
  { icon: IndianRupee, label: 'GST Invoicing' },
  { icon: Smartphone,  label: 'UPI Payments' },
  { icon: FileText,    label: 'IT Act e-Sign' },
]

const COMPETITORS: {
  name: string
  initials: string
  accentBg: string
  accentText: string
  tagline: string
  desc: string
  href: string
  gst: boolean
  upi: boolean
  esign: boolean
  featured?: boolean
}[] = [
  {
    name:      'HoneyBook',
    initials:  'HB',
    accentBg:  'bg-pink-50',
    accentText:'text-pink-600',
    tagline:   'Not available in India',
    desc:      'HoneyBook is geo-blocked for Indian users — no UPI, no GST invoicing, Stripe-only payouts. See what Indian freelancers use instead.',
    href:      '/alternatives/honeybook-alternative-india',
    gst:       false,
    upi:       false,
    esign:     false,
    featured:  true,
  },
  {
    name:      'Bonsai',
    initials:  'Bo',
    accentBg:  'bg-emerald-50',
    accentText:'text-emerald-700',
    tagline:   'No GST, no UPI, $17/mo',
    desc:      'Bonsai has the right workflow but zero India support — no GST split, no UPI link, and costs ₹1,400/mo in USD. Now acquired by Zoom.',
    href:      '/alternatives/bonsai-alternative-india',
    gst:       false,
    upi:       false,
    esign:     false,
  },
  {
    name:      'Dubsado',
    initials:  'Du',
    accentBg:  'bg-sky-50',
    accentText:'text-sky-700',
    tagline:   'Complex setup, no INR support',
    desc:      'Dubsado is powerful but notoriously complex to set up — and costs ~₹1,660/mo with no GST, no UPI, and no rupee pricing.',
    href:      '/alternatives/dubsado-alternative-india',
    gst:       false,
    upi:       false,
    esign:     false,
  },
  {
    name:      'Refrens',
    initials:  'Re',
    accentBg:  'bg-violet-50',
    accentText:'text-violet-700',
    tagline:   'Invoicing only, no workflow',
    desc:      'Refrens handles invoicing well but has no proposals, no e-sign contracts, no CRM, and no client portal. Compare the full workflow.',
    href:      '/blog/refrens-alternative-india',
    gst:       true,
    upi:       false,
    esign:     false,
  },
]

const ROUNDUPS = [
  {
    title: 'HoneyBook vs Bonsai vs Dubsado — India comparison',
    desc:  'All three global tools compared side-by-side against ClearWork for Indian freelancers.',
    href:  '/blog/honeybook-bonsai-dubsado-alternative-india',
  },
  {
    title: 'Best Freelancer Software India 2026',
    desc:  'Every major tool scored on the India checklist — GST, UPI, ₹ pricing, e-sign.',
    href:  '/blog/best-freelancer-software-india-2026',
  },
]

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }

function CriteriaCheck({ pass }: { pass: boolean }) {
  return pass
    ? <CheckCircle2 size={15} className="text-emerald-500" strokeWidth={2.5} />
    : <XCircle     size={15} className="text-gray-300"    strokeWidth={2}   />
}

export default function AlternativesIndex() {
  useSeo(
    'ClearWork Alternatives Hub — Compare Freelancer & Agency Tools for India',
    'Compare ClearWork to HoneyBook, Bonsai, Dubsado, Refrens, and other tools. India-focused alternative pages with GST, UPI, and rupee pricing.',
    CANONICAL,
  )

  return (
    <div className="bg-[#F4F6FB] min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 pt-28 pb-12 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full px-3 py-1 mb-6">
              <Scale size={11} />
              Honest Comparisons
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-950 leading-tight mb-4">
              Global tools vs India‑first workflow
            </h1>
            <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed mb-8">
              HoneyBook, Bonsai, and Dubsado weren't built for Indian service businesses — no GST, no UPI, no ₹ pricing.
              Here's what actually works.
            </p>

            {/* India checklist */}
            <div className="inline-flex flex-wrap justify-center gap-3">
              {CRITERIA.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3.5 py-1.5 text-xs font-medium text-gray-700">
                  <Icon size={12} className="text-emerald-500" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Competitor cards ─────────────────────────────────────────────── */}
      <section className="py-12 px-5">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
            One-on-one comparisons
          </p>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {COMPETITORS.map(item => (
              <motion.div key={item.href} variants={fadeUp} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                <Link
                  to={item.href}
                  className={`group flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                    item.featured
                      ? 'bg-[#101828] border-[#101828] text-white hover:bg-[#1a2535]'
                      : 'bg-white border-gray-100 hover:border-gray-200'
                  }`}
                >
                  {/* Logo initial */}
                  <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base ${
                    item.featured ? 'bg-white/10 text-white' : `${item.accentBg} ${item.accentText}`
                  }`}>
                    {item.initials}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap mb-1">
                      <h2 className={`font-bold text-[15px] ${item.featured ? 'text-white' : 'text-gray-900'}`}>
                        {item.name} Alternative India
                      </h2>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        item.featured
                          ? 'bg-white/15 text-white/80'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {item.tagline}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${item.featured ? 'text-white/65' : 'text-gray-500'}`}>
                      {item.desc}
                    </p>

                    {/* India criteria row */}
                    <div className="flex items-center gap-4 mt-3">
                      {CRITERIA.map(({ label }, i) => {
                        const pass = i === 0 ? item.gst : i === 1 ? item.upi : item.esign
                        return (
                          <span key={label} className="flex items-center gap-1.5">
                            <CriteriaCheck pass={pass} />
                            <span className={`text-[11px] font-medium ${
                              item.featured ? (pass ? 'text-white/80' : 'text-white/35') : (pass ? 'text-gray-700' : 'text-gray-300')
                            }`}>
                              {label}
                            </span>
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  <ArrowRight
                    size={18}
                    className={`shrink-0 transition-all group-hover:translate-x-1 ${
                      item.featured ? 'text-white/40 group-hover:text-white/70' : 'text-gray-300 group-hover:text-gray-600'
                    }`}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ClearWork pass row ────────────────────────────────────────────── */}
      <section className="px-5 pb-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-bold text-emerald-900 mb-0.5">ClearWork passes all three criteria</p>
              <p className="text-xs text-emerald-700 leading-relaxed">
                GST invoicing with CGST/SGST/IGST, UPI payment links, IT Act 2000 e-sign — built for Indian freelancers from day one.
              </p>
            </div>
            <div className="flex gap-3">
              {CRITERIA.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Icon size={14} className="text-emerald-600" />
                  </div>
                  <span className="text-[10px] font-medium text-emerald-700 leading-tight max-w-[48px]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Round-ups ─────────────────────────────────────────────────────── */}
      <section className="px-5 pb-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
            Round-up guides
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {ROUNDUPS.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <h3 className="font-bold text-gray-900 text-[14px] leading-snug mb-2 group-hover:text-indigo-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{item.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:gap-2 transition-all">
                  Read guide <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
