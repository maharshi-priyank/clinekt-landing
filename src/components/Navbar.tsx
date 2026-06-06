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

  const hrefFor = (anchor: string) => isHome ? `#${anchor}` : `/#${anchor}`
  const waitlistHref = hrefFor('waitlist')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 inset-x-0 z-50 px-4 pt-4"
    >
      {/* Always-floating pill */}
      <div className={`max-w-5xl mx-auto px-5 h-[58px] rounded-2xl flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-2xl shadow-lg shadow-gray-900/10 border border-gray-200/80'
          : 'bg-white/60 backdrop-blur-xl border border-white/75 shadow-sm'
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
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <a href={waitlistHref} className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full hover:bg-black/5 transition-all">
            Sign in
          </a>
          <a href={waitlistHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full bg-gray-950 text-white hover:bg-gray-800 shadow-sm transition-all">
            Join waitlist
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
              <div className="mt-2 pt-3 border-t border-gray-100">
                <a href={waitlistHref} onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1.5 font-semibold px-5 py-3 rounded-full bg-gray-950 text-white">
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
