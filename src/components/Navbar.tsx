import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const links = [
  { label: 'How it works', anchor: 'how-it-works', href: null },
  { label: 'Features',     anchor: null,            href: '/features' },
  { label: 'Pricing',      anchor: 'pricing',       href: null },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  // On home → in-page anchor; off home → route to home with anchor
  const hrefFor = (anchor: string) => isHome ? `#${anchor}` : `/#${anchor}`
  const waitlistHref = hrefFor('waitlist')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/70 backdrop-blur-2xl backdrop-saturate-200 shadow-sm border-b border-gray-200/60'
          : 'bg-white/40 backdrop-blur-xl backdrop-saturate-150 border-b border-white/20'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <img src="/logo/full_logo.svg" alt="Clinekt" className="h-9 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => l.href
            ? (
              <Link key={l.label} to={l.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${pathname === l.href ? 'text-gray-900 bg-gray-100' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                {l.label}
              </Link>
            ) : (
              <a key={l.anchor!} href={hrefFor(l.anchor!)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                {l.label}
              </a>
            )
          )}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href={waitlistHref} className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors">
            Sign in
          </a>
          <a href={waitlistHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-xl bg-gray-950 text-white hover:bg-gray-800 shadow-sm transition-all">
            Join waitlist
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-600 hover:text-gray-900">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {links.map(l => l.href
                ? (
                  <Link key={l.label} to={l.href} onClick={() => setOpen(false)}
                    className="px-4 py-3 text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                    {l.label}
                  </Link>
                ) : (
                  <a key={l.anchor!} href={hrefFor(l.anchor!)} onClick={() => setOpen(false)}
                    className="px-4 py-3 text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                    {l.label}
                  </a>
                )
              )}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <a href={waitlistHref} onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1.5 font-semibold px-5 py-3 rounded-xl bg-gray-950 text-white">
                  Join waitlist <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
