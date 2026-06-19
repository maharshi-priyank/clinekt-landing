import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, ChevronDown, BookOpen, Wrench } from 'lucide-react'
import { trackCTAClick } from '../lib/analytics'

const links = [
  { label: 'How it works', anchor: 'how-it-works', href: null },
  { label: 'Features',     anchor: null,            href: '/features' },
]

const resourceLinks = [
  { label: 'Blog',  href: '/blog',  icon: BookOpen,  desc: 'Guides on GST, contracts & taxes' },
  { label: 'Tools', href: '/tools', icon: Wrench,    desc: 'Free calculators & generators' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const resourcesRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const hrefFor = (anchor: string) => isHome ? `#${anchor}` : `/#${anchor}`
  const registerHref = 'https://app.getclearwork.in/signup'
  const loginHref    = 'https://app.getclearwork.in/login'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'px-4 pt-3' : ''}`}
    >
      {/* Pill appears on scroll; transparent at top */}
      <div className={`flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? 'max-w-5xl mx-auto px-6 h-[58px] rounded-2xl bg-white/92 backdrop-blur-2xl shadow-lg shadow-gray-900/10 border border-gray-200/80'
          : 'max-w-6xl mx-auto px-6 h-[68px]'
      }`}>

        {/* Logo */}
        <a href="/" className="flex items-center shrink-0">
          <img src="/logo/clearwork_full_dark.png" alt="ClearWork" style={{ height: 26, width: 'auto', display: 'block' }} />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {links.map(l => l.href
            ? (
              <Link key={l.label} to={l.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${pathname === l.href ? 'text-gray-900 bg-gray-100' : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'}`}>
                {l.label}
              </Link>
            ) : (
              <a key={l.anchor!} href={hrefFor(l.anchor!)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-black/5 rounded-full transition-all">
                {l.label}
              </a>
            )
          )}

          {/* Resources dropdown */}
          <div ref={resourcesRef} className="relative">
            <button
              onClick={() => setResourcesOpen(v => !v)}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all ${resourcesOpen ? 'text-gray-900 bg-gray-100' : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'}`}
            >
              Resources
              <ChevronDown size={13} className={`transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-gray-900/10 border border-gray-100 overflow-hidden z-50"
                >
                  {resourceLinks.map(r => {
                    const Icon = r.icon
                    return (
                      <Link
                        key={r.href}
                        to={r.href}
                        onClick={() => setResourcesOpen(false)}
                        className="flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="mt-0.5 w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                          <Icon size={14} className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{r.label}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
                        </div>
                      </Link>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <a href={loginHref} className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full hover:bg-black/5 transition-all">
            Sign in
          </a>
          <a href={registerHref}
            onClick={() => trackCTAClick('get_started', 'navbar')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full bg-gray-950 text-white hover:bg-gray-800 shadow-sm transition-all">
            Get started free
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-600 hover:text-gray-900">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden max-w-5xl mx-auto mt-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map(l => l.href
                ? (
                  <Link key={l.label} to={l.href} onClick={() => setOpen(false)}
                    className="px-4 py-3 text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all">
                    {l.label}
                  </Link>
                ) : (
                  <a key={l.anchor!} href={hrefFor(l.anchor!)} onClick={() => setOpen(false)}
                    className="px-4 py-3 text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all">
                    {l.label}
                  </a>
                )
              )}

              {/* Mobile Resources */}
              <button
                onClick={() => setMobileResourcesOpen(v => !v)}
                className="flex items-center justify-between px-4 py-3 text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all"
              >
                Resources
                <ChevronDown size={14} className={`transition-transform duration-200 ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileResourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 flex flex-col gap-0.5 pb-1">
                      {resourceLinks.map(r => {
                        const Icon = r.icon
                        return (
                          <Link
                            key={r.href}
                            to={r.href}
                            onClick={() => { setOpen(false); setMobileResourcesOpen(false) }}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all"
                          >
                            <Icon size={14} className="text-indigo-500" />
                            <span className="text-sm font-medium">{r.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-2 pt-3 border-t border-gray-100">
                <a href={registerHref} onClick={() => { setOpen(false); trackCTAClick('get_started', 'navbar_mobile') }}
                  className="flex items-center justify-center gap-1.5 font-semibold px-5 py-3 rounded-full bg-gray-950 text-white">
                  Get started free <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
