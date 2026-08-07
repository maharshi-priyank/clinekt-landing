import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles, Zap, ShieldCheck, Globe, ArrowRight, Star, FileText, IndianRupee,
  Target, Compass, TrendingUp, Quote,
} from 'lucide-react'
import { useSeo } from '../lib/useSeo'
import { FadeIn } from '../components/ui/FadeIn'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const missionPoints = [
  'Find more clients',
  'Win more of the work they pitch for',
  'Deliver without the admin drag',
  'Get paid faster',
  'Keep clients coming back',
]

const values = [
  {
    icon: Compass,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    title: 'Built for how the work actually happens',
    body: 'Every decision — GST fields, UPI links, OTP e-sign, WhatsApp reminders — is made for how freelancers and agencies actually run their business, not adapted from a template built for someone else.',
  },
  {
    icon: Zap,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    title: 'Simple over clever',
    body: 'You are running a business, not learning software. Every feature ships only when it can be understood in under 30 seconds.',
  },
  {
    icon: ShieldCheck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    title: 'Honest by default',
    body: 'No dark patterns, no hidden limits, no bait-and-switch pricing. What you see today is the full product — not a crippled demo.',
  },
]

const differentiators = [
  {
    icon: IndianRupee,
    label: 'GST-native invoicing',
    detail: 'CGST/SGST/IGST auto-detected by client state. Rule 46 compliant.',
    bg: 'bg-indigo-50',
    color: 'text-indigo-600',
  },
  {
    icon: FileText,
    label: 'IT Act 2000 e-sign',
    detail: 'OTP-based contracts legally valid under Indian law — no DocuSign needed.',
    bg: 'bg-emerald-50',
    color: 'text-emerald-600',
  },
  {
    icon: Globe,
    label: 'UPI payment collection',
    detail: 'Embedded UPI payment links and automated payment reminders over WhatsApp.',
    bg: 'bg-amber-50',
    color: 'text-amber-600',
  },
  {
    icon: Star,
    label: 'One end-to-end workflow',
    detail: 'Lead → proposal → contract → invoice → payment in a single tool.',
    bg: 'bg-violet-50',
    color: 'text-violet-600',
  },
]

const growthLadder = ['Freelancers', 'Agencies', 'Professional services', 'Consultancies', 'Every service business']

export default function About() {
  useSeo(
    'About ClearWork — Our Story & Vision',
    'ClearWork started because we were tired of running our business worse than we ran our client work. Here\'s the story, and where we\'re taking it.',
    'https://getclearwork.in/about',
  )

  return (
    <div className="bg-white pt-16">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 px-5" style={{ background: 'linear-gradient(160deg, #0F0D1A 0%, #161327 55%, #0C0A09 100%)' }}>
        <div className="absolute inset-0 grid-dark pointer-events-none opacity-40" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(99,102,241,0.22) 0%, transparent 70%)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-white/10 bg-white/5 text-white/60 mb-6">
            <Sparkles size={11} className="text-indigo-300" />
            Our story
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-[1.08] tracking-tight">
            We built the tool we
            <br />
            wished existed.
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Not another CRM. A system that actively helps freelancers and agencies
            find clients, win them, deliver great work, and get paid — with less effort.
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-5">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* ── Origin story ── */}
          <FadeIn>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-9">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide bg-gray-100 text-gray-500 mb-5">
                How it started
              </span>
              <div className="space-y-4 text-[15px] text-gray-600 leading-relaxed">
                <p>
                  We ran a small design studio for four years. Some months we were designing.
                  Most months we were chasing payments, fixing GST errors on invoices we'd
                  built in a spreadsheet, and re-sending proposals over WhatsApp because the
                  client had "lost the PDF." The client work was the easy part. Running the
                  business around it was the exhausting part.
                </p>
                <p>
                  Every tool we tried was built for someone else's business. Global platforms
                  looked polished on screenshots but fell apart the moment we tried to use
                  them for real — no GST fields, no UPI payments, e-sign that didn't hold up
                  legally, pricing in a currency we don't invoice in. We were paying real
                  money for tools that still left the actual admin work on us.
                </p>
                <p>
                  So we stopped looking for the tool and built it instead — a single place
                  that carries a client relationship from the first message to the final
                  payment, without seven tabs open and nothing lost in translation between them.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ── Vision / mission ── */}
          <FadeIn delay={0.06}>
            <div className="bg-gray-950 rounded-2xl p-7 sm:p-9 text-white relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 100% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)' }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-5">
                  <Target size={16} className="text-indigo-300" />
                  <span className="text-[11px] font-bold uppercase tracking-wide text-white/50">Our mission</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold leading-snug mb-2">
                  Help every freelancer and agency grow revenue with less effort.
                </p>
                <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-lg">
                  Our job isn't to help you organise your work. It's to move the numbers that
                  actually decide whether your business grows.
                </p>
                <ul className="space-y-2.5">
                  {missionPoints.map((m) => (
                    <li key={m} className="flex items-center gap-2.5 text-sm text-white/80">
                      <ArrowRight size={13} className="text-indigo-300 shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* ── Beliefs / AI philosophy ── */}
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-9">
              <div className="flex items-center gap-2 mb-4">
                <Quote size={16} className="text-indigo-500" />
                <span className="text-[11px] font-bold uppercase tracking-wide text-gray-400">What we believe</span>
              </div>
              <p className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug mb-3">
                Software records history. Intelligence should influence what happens next.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                Most business software shows you dashboards and waits for you to act on them.
                We think the better version tells you what to do before you have to ask —
                who to follow up with today, which proposal needs a nudge, which invoice is
                about to go quiet. That's the direction every feature we build is pointed in.
              </p>
            </div>
          </FadeIn>

          {/* ── What we built differently ── */}
          <FadeIn delay={0.14}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-9">
              <h2 className="text-xl font-bold text-gray-900 mb-5">What we built differently</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {differentiators.map(({ icon: Icon, label, detail, bg, color }) => (
                  <div key={label} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
                    <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center shrink-0`}>
                      <Icon size={16} className={color} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{label}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ── Values ── */}
          <FadeIn delay={0.18}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-9">
              <h2 className="text-xl font-bold text-gray-900 mb-5">How we work</h2>
              <div className="space-y-4">
                {values.map(({ icon: Icon, color, bg, title, body }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon size={18} className={color} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{title}</p>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ── Where we're headed ── */}
          <FadeIn delay={0.22}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-9">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp size={16} className="text-indigo-500" />
                <h2 className="text-xl font-bold text-gray-900">Where we're headed</h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-2xl">
                We're starting with freelancers because the pain is sharpest there — every
                admin hour comes straight out of billable time. But the same problem exists
                for anyone who sells expertise for a living. That's the road ahead.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {growthLadder.map((stage, i) => (
                  <div key={stage} className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                      i === 0 ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-500 border border-gray-200'
                    }`}>
                      {stage}
                    </span>
                    {i < growthLadder.length - 1 && <ArrowRight size={12} className="text-gray-300" />}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ── Early access note ── */}
          <FadeIn delay={0.26}>
            <div className="bg-indigo-600 rounded-2xl p-7 text-white">
              <h2 className="text-lg font-bold mb-2">We're in early access</h2>
              <p className="text-indigo-200 text-sm leading-relaxed mb-5">
                ClearWork is 100% free until we welcome our first 50 users — full Studio plan,
                every feature, no credit card. We're building this with real freelancers and
                agencies before public launch, and every piece of feedback shapes the roadmap.
              </p>
              <a
                href="https://app.getclearwork.in/signup"
                className="inline-flex items-center gap-1.5 bg-white text-indigo-700 rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-indigo-50 transition-colors"
              >
                Get started free <ArrowRight size={14} />
              </a>
            </div>
          </FadeIn>

          {/* ── Contact nudge ── */}
          <FadeIn delay={0.3}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">Have questions or feedback?</p>
                <p className="text-xs text-gray-400 mt-0.5">We read every message personally.</p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors shrink-0"
              >
                Contact us <ArrowRight size={13} />
              </Link>
            </div>
          </FadeIn>

          <p className="text-center text-xs text-gray-400 pt-2">
            <Link to="/" className="underline hover:text-gray-700">← Back to home</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
