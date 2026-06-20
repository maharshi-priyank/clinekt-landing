import { useState } from 'react'
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { useSeo } from '../lib/useSeo'

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

export default function Contact() {
  useSeo(
    'Contact ClearWork — Get in Touch',
    'Contact the ClearWork team for support, product feedback, partnerships, or general questions. We respond within 24–48 hours.',
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
    <div className="min-h-screen bg-[#F4F6FB] pt-16">

      {/* Hero */}
      <section className="bg-[#101828] text-white py-16 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-5">
            <Mail size={28} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Get in touch</h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
            We read every message personally. Usually respond within 24–48 hours.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-12 px-5">
        <div className="max-w-lg mx-auto">

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
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5"
            >
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

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={form.category}
                  onChange={e => handleChange('category', e.target.value)}
                  onBlur={() => handleBlur('category')}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors appearance-none bg-white ${getError('category') ? 'border-red-400 bg-red-50' : 'border-gray-200'} ${form.category === '' ? 'text-gray-400' : 'text-gray-900'}`}
                >
                  <option value="" disabled>Select a category</option>
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {getError('category') && <p className="mt-1 text-xs text-red-600">{getError('category')}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
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

          {/* Email line */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Mail size={13} />
            <span>hello@getclearwork.in · Replies within 24–48h</span>
          </div>
        </div>
      </section>
    </div>
  )
}
