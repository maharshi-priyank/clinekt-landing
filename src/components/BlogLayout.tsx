import { Link } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { useSchemaOrg, breadcrumbSchema } from '../lib/useSchemaOrg'

export interface BlogMeta {
  title: string
  description: string
  date: string
  /** ISO date string e.g. "2026-06-14" — used in schema and visible freshness signal */
  datePublished: string
  readTime: string
  category: string
  canonical: string
}

interface Props {
  meta: BlogMeta
  children: React.ReactNode
}

export default function BlogLayout({ meta, children }: Props) {
  useSchemaOrg([
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: meta.title,
      description: meta.description,
      url: meta.canonical,
      datePublished: meta.datePublished,
      dateModified: meta.datePublished,
      inLanguage: 'en-IN',
      author: {
        '@type': 'Organization',
        name: 'ClearWork',
        url: 'https://getclearwork.in',
      },
      publisher: {
        '@type': 'Organization',
        name: 'ClearWork',
        url: 'https://getclearwork.in',
        logo: {
          '@type': 'ImageObject',
          url: 'https://getclearwork.in/logo/full_logo.svg',
          width: 200,
          height: 60,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': meta.canonical,
      },
    },
    breadcrumbSchema([
      { name: 'Home', item: 'https://getclearwork.in/' },
      { name: 'Blog', item: 'https://getclearwork.in/blog' },
      { name: meta.title, item: meta.canonical },
    ]),
  ])

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-5 py-12 md:py-16">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-6"
          >
            <ArrowLeft size={14} /> Blog
          </Link>

          <div className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {meta.category}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {meta.title}
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed mb-6">
            {meta.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {meta.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {meta.readTime} read
            </span>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            By{' '}
            <a
              href="https://getclearwork.in"
              className="text-indigo-500 hover:underline font-medium"
            >
              ClearWork
            </a>
            {' '}— India's client management platform for freelancers
          </p>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-5 py-10 md:py-14">
        <div className="prose-blog">
          {children}
        </div>

        {/* Author bio — E-E-A-T trust signal */}
        <div className="mt-14 pt-8 border-t border-gray-100">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 text-indigo-600 font-bold text-sm">
              CW
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Written by ClearWork</p>
              <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                ClearWork is India's all-in-one client management platform for freelancers and agencies —
                built by freelancers who got tired of juggling spreadsheets, WhatsApp, and broken invoice templates.{' '}
                <a href="https://getclearwork.in" className="text-indigo-500 hover:underline">getclearwork.in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Reusable prose elements */

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 leading-snug">{children}</h2>
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">{children}</h3>
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">{children}</p>
}

export function Callout({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'tip' | 'warn' }) {
  const styles = {
    info: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    tip:  'bg-emerald-50 border-emerald-200 text-emerald-900',
    warn: 'bg-amber-50 border-amber-200 text-amber-900',
  }
  return (
    <div className={`border rounded-xl px-5 py-4 my-6 text-[14px] leading-relaxed ${styles[type]}`}>
      {children}
    </div>
  )
}

export function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-gray-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {headers.map(h => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-gray-700">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2 my-4 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-gray-600 text-[15px] leading-relaxed">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function ToolCTA({ href, toolName, cta }: { href: string; toolName: string; cta: string }) {
  return (
    <div className="my-10 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl px-7 py-7">
      <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">Free Tool</p>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{toolName}</h3>
      <p className="text-gray-500 text-sm mb-5">{cta}</p>
      <Link
        to={href}
        className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
      >
        Use the free tool →
      </Link>
    </div>
  )
}

export function FAQ({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <div className="mt-12 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-5">
        {items.map(({ q, a }, i) => (
          <div key={i} className="border border-gray-100 rounded-xl px-5 py-4">
            <p className="font-semibold text-gray-900 mb-2 text-[15px]">{q}</p>
            <div className="text-gray-500 text-[14px] leading-relaxed">{a}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
