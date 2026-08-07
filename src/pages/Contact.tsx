import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail, Send, CheckCircle2, AlertCircle, Clock, MessageCircle, Briefcase,
  Megaphone, LifeBuoy, Plus, ArrowUpRight,
} from 'lucide-react'
import { useSeo } from '../lib/useSeo'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const CATEGORIES = [
  'General enquiry',
  'Product feedback',
  'Support',
  'Partnership',
  'Press',
] as const

type Category = typeof CATEGORIES[number]

interface FormState {
  name: string
  email: string
  category: Category | ''
  message: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3000'

const channels = [
  {
    icon: LifeBuoy,
    title: 'Support & product help',
    body: 'Stuck on something in the app, or found a bug? Tell us exactly what happened — screenshots help.',
    bg: 'bg-indigo-50', color: 'text-indigo-600',
  },
  {
    icon: MessageCircle,
    title: 'Product feedback',
    body: 'Missing a feature, or something feels clunky? Every message here goes straight into our roadmap review.',
    bg: 'bg-emerald-50', color: 'text-emerald-600',
  },
  {
    icon: Briefcase,
    title: 'Partnerships',
    body: 'Building something that fits alongside ClearWork, or want to explore an integration or referral partnership?',
    bg: 'bg-amber-50', color: 'text-amber-600',
  },
  {
    icon: Megaphone,
    title: 'Press & media',
    body: 'Writing about ClearWork or the Indian freelance/agency market? We\'re happy to talk on or off record.',
    bg: 'bg-violet-50', color: 'text-violet-600',
  },
]

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/getclearwork' },
  { label: 'Product Hunt', href: 'https://www.producthunt.com/products/clearwork' },
]

const faqs = [
  {
    q: 'How fast do you actually respond?',
    a: 'Within 24–48 hours on weekdays, usually much sooner. The whole team reads every message — nobody\'s message goes to a queue nobody checks.',
  },
  {
    q: 'I found a bug. What should I include?',
    a: 'Pick "Support" as the category, and include what you were trying to do, what happened instead, and a screenshot if you have one. That\'s usually enough for us to reproduce it fast.',
  },
  {
    q: 'Can I request a feature?',
    a: 'Yes — pick "Product feedback." We read every request and use them to shape what we build next. If a lot of people ask for the same thing, it moves up the list.',
  },
  {
    q: 'Do you offer onboarding calls or demos?',
    a: 'For agencies migrating from another tool, yes — mention it in your message with your team size and current setup, and we\'ll set up a short call.',
  },
]

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Contact() {
  useSeo(
    'Contact ClearWork — Support, Feedback & Partnerships',
    'Reach the ClearWork team for support, product feedback, partnerships, or press. We respond within 24–48 hours — real people, no ticket queue.',
    'https://getclearwork.in/contact',
  )

  const [form, setForm] = useState<FormState>({ name: '', email: '', category: '', message: '' })
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [submittedEmail, setSubmittedEmail] = useState('')

  function validate(field: keyof FormState, value: string): string {
    if (field === 'name') return value.trim().length < 2 ? 'Name must be at least 2 characters' : ''
    if (field === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address'
    if (field === 'category') return value === '' ? 'Please select a category' : ''
    if (field === 'message') return value.trim().length < 10 ? 'Message must be at least 10 characters' : ''
    return ''
  }

  function getError(field: keyof FormState): string {
    if (!touched[field]) return ''
    return validate(field, form[field])
  }

  function handleBlur(field: keyof FormState) {
    setTouched(t => ({ ...t, [field]: true }))
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function selectCategory(c: Category) {
    setForm(f => ({ ...f, category: c }))
    setTouched(t => ({ ...t, category: true }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const allTouched: Partial<Record<keyof FormState, boolean>> = { name: true, email: true, category: true, message: true }
    setTouched(allTouched)
    const hasErrors = (Object.keys(form) as Array<keyof FormState>).some(f => validate(f, form[f]) !== '')
    if (hasErrors) return

    setStatus('submitting')
    setSubmittedEmail(form.email)

    try {
      const res = await fetch(`${API_BASE}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-white pt-16">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-16 px-5" style={{ background: 'linear-gradient(160deg, #0F0D1A 0%, #161327 55%, #0C0A09 100%)' }}>
        <div className="absolute inset-0 grid-dark pointer-events-none opacity-40" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(99,102,241,0.22) 0%, transparent 70%)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-white/10 bg-white/5 text-white/60 mb-6">
            <Clock size={11} className="text-emerald-400" />
            Replies within 24–48 hours
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-[1.08] tracking-tight">
            Let's talk.
          </h1>
          <p className="text-white/50 text-lg max-w-lg mx-auto leading-relaxed">
            Support, feedback, partnerships, or press — pick what fits below,
            or just send a message. A real person reads every one.
          </p>
        </motion.div>
      </section>

      {/* ── Main content ── */}
      <section className="py-16 px-5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Sidebar — channels */}
          <div className="lg:col-span-2 space-y-4">
            <FadeIn>
              <div className="space-y-3">
                {channels.map(({ icon: Icon, title, body, bg, color }) => (
                  <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-3.5">
                    <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon size={17} className={color} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{title}</p>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="bg-gray-950 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Mail size={14} className="text-indigo-300" />
                  <span className="text-xs font-bold uppercase tracking-wide text-white/50">Prefer email?</span>
                </div>
                <a href="mailto:hello@getclearwork.in" className="text-sm font-semibold hover:underline">
                  hello@getclearwork.in
                </a>
                <p className="text-xs text-white/40 mt-2">We read this inbox every day, no ticket queue.</p>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                  {socials.map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-full px-3 py-1.5 transition-colors"
                    >
                      {s.label}
                      <ArrowUpRight size={11} />
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <FadeIn delay={0.05}>
              {status === 'success' ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                  <div className="flex justify-center mb-4">
                    <CheckCircle2 size={48} className="text-emerald-500" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Message sent!</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    We'll get back to you at{' '}
                    <span className="font-medium text-gray-700">{submittedEmail}</span>{' '}
                    within 24–48 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5"
                >
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Send us a message</h2>
                    <p className="text-xs text-gray-400 mt-1">All fields are required.</p>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl p-3.5 text-sm text-red-700">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <span>
                        Something went wrong. Please try again or email us at{' '}
                        <a href="mailto:hello@getclearwork.in" className="underline font-medium">
                          hello@getclearwork.in
                        </a>.
                      </span>
                    </div>
                  )}

                  {/* Category — pill selector for better UX than a plain select */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What's this about? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => selectCategory(c)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                            form.category === c
                              ? 'bg-gray-950 text-white border-gray-950'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    {getError('category') && <p className="mt-1.5 text-xs text-red-600">{getError('category')}</p>}
                  </div>

                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={e => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        placeholder="Your name"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${getError('name') ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
                      />
                      {getError('name') && <p className="mt-1 text-xs text-red-600">{getError('name')}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={e => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="you@example.com"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${getError('email') ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
                      />
                      {getError('email') && <p className="mt-1 text-xs text-red-600">{getError('email')}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={e => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      placeholder="Tell us what's on your mind..."
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none ${getError('message') ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
                    />
                    {getError('message') && <p className="mt-1 text-xs text-red-600">{getError('message')}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-5 py-3 text-sm transition-colors"
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send message
                      </>
                    )}
                  </button>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
      <section className="py-16 px-5 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto">
          <FadeIn className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              FAQs
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Before you write in</h2>
          </FadeIn>
          <div className="space-y-3">
            {faqs.map(f => (
              <details key={f.q} className="group rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 [&_summary]:cursor-pointer">
                <summary className="flex items-center justify-between gap-4 list-none">
                  <span className="text-[14.5px] font-semibold text-gray-900">{f.q}</span>
                  <span className="text-gray-400 group-open:rotate-45 transition-transform shrink-0"><Plus size={16} /></span>
                </summary>
                <p className="mt-3 text-[13.5px] text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
