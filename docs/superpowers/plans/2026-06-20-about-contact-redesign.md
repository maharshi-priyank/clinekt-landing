# About & Contact Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite About and Contact pages — About gets hero text + differentiator color polish; Contact gets a real contact form replacing the mailto links, backed by a new public `POST /api/v1/contact` endpoint on pakka-api.

**Architecture:** Two independent changes. (1) pakka-api gets a new `ContactModule` with its own controller/service/DTO that uses nodemailer directly (no workspace scope). (2) pakka-landing Contact.tsx becomes a controlled form that POSTs to that endpoint; About.tsx gets a headline and colour polish.

**Tech Stack:** NestJS + nodemailer (pakka-api) · React + Tailwind v4 + lucide-react (pakka-landing)

---

## File Map

### pakka-api (new files)
- `src/modules/contact/contact.dto.ts` — request validation
- `src/modules/contact/contact.service.ts` — nodemailer send
- `src/modules/contact/contact.controller.ts` — `POST /contact` public route
- `src/modules/contact/contact.module.ts` — module wiring
- `src/app.module.ts` — import ContactModule

### pakka-landing (modify)
- `src/pages/Contact.tsx` — full rewrite with form + API call
- `src/pages/About.tsx` — hero text + differentiator card colors

---

## Task 1: ContactDto — pakka-api

**Files:**
- Create: `src/modules/contact/contact.dto.ts`

- [ ] **Create the DTO file**

```ts
// src/modules/contact/contact.dto.ts
import { IsString, IsEmail, IsIn, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

const CATEGORIES = ['General enquiry', 'Product feedback', 'Support', 'Partnership', 'Press'] as const

export class ContactDto {
  @ApiProperty({ example: 'Maharshi' })
  @IsString()
  @MinLength(2)
  name: string

  @ApiProperty({ example: 'hello@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ enum: CATEGORIES })
  @IsIn(CATEGORIES)
  category: string

  @ApiProperty({ example: 'I had a question about...' })
  @IsString()
  @MinLength(10)
  message: string
}
```

- [ ] **Commit**
```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-api
git add src/modules/contact/contact.dto.ts
git commit -m "feat(contact): add ContactDto"
```

---

## Task 2: ContactService — pakka-api

**Files:**
- Create: `src/modules/contact/contact.service.ts`

- [ ] **Create the service**

```ts
// src/modules/contact/contact.service.ts
import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'
import { ContactDto } from './contact.dto'

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name)
  private transporter: nodemailer.Transporter | null = null

  constructor(private readonly config: ConfigService) {
    const user = this.config.get<string>('email.user')
    const pass = this.config.get<string>('email.pass')
    if (user && pass) {
      const port = this.config.get<number>('email.port') ?? 587
      this.transporter = nodemailer.createTransport({
        host: this.config.get<string>('email.host'),
        port,
        secure: port === 465,
        auth: { user, pass },
      })
    } else {
      this.logger.warn('EMAIL_USER/EMAIL_PASS not set — contact emails will be skipped')
    }
  }

  async send(dto: ContactDto): Promise<void> {
    const to = 'hello@getclearwork.in'
    const from = this.config.get<string>('email.from') ?? 'ClearWork <noreply@getclearwork.in>'
    const subject = `[ClearWork Contact] ${dto.category} — ${dto.name}`
    const text = [
      `Name:     ${dto.name}`,
      `Email:    ${dto.email}`,
      `Category: ${dto.category}`,
      ``,
      `Message:`,
      dto.message,
    ].join('\n')

    if (!this.transporter) {
      this.logger.debug(`[contact-skip] from=${dto.email} subject="${subject}"`)
      return
    }

    try {
      await this.transporter.sendMail({ from, to, replyTo: dto.email, subject, text })
      this.logger.log(`[contact-sent] from=${dto.email}`)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      this.logger.error(`[contact-failed] error=${msg}`)
      throw new InternalServerErrorException('Failed to send message')
    }
  }
}
```

- [ ] **Commit**
```bash
git add src/modules/contact/contact.service.ts
git commit -m "feat(contact): add ContactService"
```

---

## Task 3: ContactController — pakka-api

**Files:**
- Create: `src/modules/contact/contact.controller.ts`

- [ ] **Create the controller**

```ts
// src/modules/contact/contact.controller.ts
import { Controller, Post, Body, HttpCode } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { ContactService } from './contact.service'
import { ContactDto } from './contact.dto'

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Submit a contact form message (public)' })
  async submit(@Body() dto: ContactDto): Promise<{ success: boolean }> {
    await this.contactService.send(dto)
    return { success: true }
  }
}
```

- [ ] **Commit**
```bash
git add src/modules/contact/contact.controller.ts
git commit -m "feat(contact): add ContactController POST /contact"
```

---

## Task 4: ContactModule + wire into AppModule — pakka-api

**Files:**
- Create: `src/modules/contact/contact.module.ts`
- Modify: `src/app.module.ts`

- [ ] **Create the module**

```ts
// src/modules/contact/contact.module.ts
import { Module } from '@nestjs/common'
import { ContactController } from './contact.controller'
import { ContactService } from './contact.service'

@Module({
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
```

- [ ] **Add ContactModule import to app.module.ts**

In `src/app.module.ts`, add the import at the top:
```ts
import { ContactModule } from './modules/contact/contact.module';
```

And add `ContactModule` to the `imports` array in `@Module({})` — place it after `PermissionsModule`:
```ts
ContactModule,
```

- [ ] **Type-check**
```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-api
npx tsc --noEmit
```
Expected: 0 errors

- [ ] **Commit**
```bash
git add src/modules/contact/contact.module.ts src/app.module.ts
git commit -m "feat(contact): wire ContactModule into AppModule"
```

---

## Task 5: Rewrite Contact.tsx — pakka-landing

**Files:**
- Modify: `src/pages/Contact.tsx`

The API base URL should come from `import.meta.env.VITE_API_URL` (with fallback `http://localhost:3000`).

- [ ] **Rewrite Contact.tsx**

```tsx
// src/pages/Contact.tsx
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
                We'll get back to you at <span className="font-medium text-gray-700">{submittedEmail}</span> within 24–48 hours.
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
                    <a href="mailto:hello@getclearwork.in" className="underline font-medium">hello@getclearwork.in</a>.
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
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors appearance-none bg-white ${getError('category') ? 'border-red-400 bg-red-50' : 'border-gray-200'} ${form.category === '' ? 'text-gray-400' : 'text-gray-900'}`}
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
```

- [ ] **Commit**
```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-landing
git add src/pages/Contact.tsx
git commit -m "feat(contact): rewrite Contact page with real contact form"
```

---

## Task 6: Update About.tsx — hero text + differentiator colors

**Files:**
- Modify: `src/pages/About.tsx`

Two changes only:
1. Hero `h1` text: change to "India's client workflow platform"
2. Hero `p` text: change to "Built for 15M Indian freelancers who needed GST, UPI, and e-sign in one tool — not five."
3. Differentiator cards: give each a distinct color (currently all `bg-indigo-50 / text-indigo-600`)

- [ ] **Update hero headline and subtext in About.tsx**

Find:
```tsx
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            Built by freelancers,<br className="hidden sm:block" /> for freelancers
          </h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
            ClearWork started because every Indian freelancer we knew was running their business
            across Google Docs, WhatsApp, a broken invoice template, and three separate logins.
            There had to be a better way.
          </p>
```

Replace with:
```tsx
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            India's client workflow platform
          </h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
            Built for 15M Indian freelancers who needed GST, UPI, and e-sign in one tool — not five.
          </p>
```

- [ ] **Update differentiators array to have distinct colors**

Find:
```tsx
const differentiators = [
  {
    icon: IndianRupee,
    label: 'GST-native',
    detail: 'CGST/SGST/IGST auto-detected by client state. Rule 46 compliant.',
  },
  {
    icon: FileText,
    label: 'IT Act 2000 e-sign',
    detail: 'OTP-based contracts legally valid under Indian law — no DocuSign needed.',
  },
  {
    icon: Globe,
    label: 'UPI + WhatsApp',
    detail: 'Embedded UPI payment links and automated payment reminders over WhatsApp.',
  },
  {
    icon: Star,
    label: 'One workflow',
    detail: 'Lead → proposal → contract → invoice → payment in a single tool.',
  },
]
```

Replace with:
```tsx
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
```

- [ ] **Update the differentiators render block to use `d.bg` and `d.color`**

Find:
```tsx
              {differentiators.map(({ icon: Icon, label, detail }) => (
                <div key={label} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
                  <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-indigo-600" />
                  </div>
```

Replace with:
```tsx
              {differentiators.map(({ icon: Icon, label, detail, bg, color }) => (
                <div key={label} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
                  <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center shrink-0`}>
                    <Icon size={16} className={color} />
                  </div>
```

- [ ] **Commit**
```bash
git add src/pages/About.tsx
git commit -m "feat(about): update hero text and differentiator card colors"
```

---

## Task 7: Build verify

- [ ] **Build pakka-api type check**
```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-api
npx tsc --noEmit
```
Expected: 0 errors

- [ ] **Build pakka-landing**
```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-landing
npm run build
```
Expected: 0 errors, all routes prerendered including `/about` and `/contact`
