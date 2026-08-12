import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react'
import { trackCTAClick } from '../lib/analytics'

const links = [
  { label: 'How it works', anchor: 'how-it-works', href: null },
  { label: 'Features',     anchor: null,            href: '/features' },
  { label: 'Pricing',      anchor: null,            href: '/pricing' },
]

type SimpleLink = { label: string; href: string }

const solutionSections: { title: string; links: SimpleLink[] }[] = [
  {
    title: 'Industries',
    links: [
      { label: 'Service Businesses', href: '/software-for-service-businesses' },
      { label: 'Consultants',        href: '/software-for-consultants' },
      { label: 'Marketing Agencies', href: '/crm-for-marketing-agencies' },
      { label: 'Agencies & Studios', href: '/software-for-agencies' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'CRM Software',         href: '/crm-for-small-business' },
      { label: 'Contract Management',  href: '/contract-management-software' },
      { label: 'E-Signature Software', href: '/e-signature-software' },
      { label: 'All Features',         href: '/features' },
    ],
  },
  {
    title: 'Compare',
    links: [
      { label: 'All Alternatives',      href: '/alternatives' },
      { label: 'HoneyBook Alternative', href: '/alternatives/honeybook-alternative-india' },
      { label: 'Bonsai Alternative',    href: '/alternatives/bonsai-alternative-india' },
      { label: 'Dubsado Alternative',   href: '/alternatives/dubsado-alternative-india' },
    ],
  },
]

const resourceSections: { title: string; links: SimpleLink[] }[] = [
  {
    title: 'Blog',
    links: [
      { label: 'All articles',              href: '/blog' },
      { label: 'GST & Invoicing',       href: '/blog/how-to-create-gst-invoice-india' },
      { label: 'Proposals & Contracts', href: '/blog/how-to-write-freelance-proposal-india' },
      { label: 'Client Management',     href: '/blog/freelancer-client-follow-up-india' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { label: 'GST Invoice Generator',  href: '/tools/gst-invoice-generator' },
      { label: 'Income Tax Calculator',  href: '/tools/income-tax-calculator' },
      { label: 'Quote Generator',        href: '/tools/quote-generator' },
      { label: 'TDS Calculator',         href: '/tools/tds-calculator' },
      { label: 'All free tools',         href: '/tools' },
    ],
  },
  {
    title: 'Compare',
    links: [
      { label: 'All Alternatives',      href: '/alternatives' },
      { label: 'HoneyBook Alternative', href: '/alternatives/honeybook-alternative-india' },
      { label: 'Bonsai Alternative',    href: '/alternatives/bonsai-alternative-india' },
      { label: 'Dubsado Alternative',   href: '/alternatives/dubsado-alternative-india' },
    ],
  },
]

function MegaMenuPanel({
  sections,
  featured,
  onClose,
}: {
  sections: { title: string; links: SimpleLink[] }[]
  featured: { image: string; title: string; desc: string; href: string }
  onClose: () => void
}) {
  return (
    <div className="max-w-6xl mx-auto px-8 lg:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-8">
      {sections.map(section => (
        <div key={section.title}>
          <p className="text-[15px] font-semibold text-gray-900 mb-4">{section.title}</p>
          <ul className="flex flex-col gap-2.5">
            {section.links.map(link => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={onClose}
                  className="text-[15px] text-gray-600 hover:text-gray-900 transition-colors leading-snug"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="col-span-2 md:col-span-1">
        {featured.href.startsWith('http') ? (
          <a href={featured.href} onClick={onClose} className="block group">
            <FeaturedCard featured={featured} />
          </a>
        ) : (
          <Link to={featured.href} onClick={onClose} className="block group">
            <FeaturedCard featured={featured} />
          </Link>
        )}
      </div>
    </div>
  )
}

function FeaturedCard({ featured }: { featured: { image: string; title: string; desc: string } }) {
  return (
    <>
      <div className="aspect-[5/4] rounded-xl overflow-hidden bg-gray-100 mb-4 ring-1 ring-gray-200/60">
        <img
          src={featured.image}
          alt=""
          className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 ease-out"
        />
      </div>
      <p className="text-[15px] font-semibold text-gray-900 mb-2 leading-snug group-hover:text-gray-700 transition-colors">
        {featured.title}
      </p>
      <p className="text-sm text-gray-500 leading-relaxed">{featured.desc}</p>
    </>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [onDark, setOnDark] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<'solutions' | 'resources' | null>(null)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const hrefFor = (anchor: string) => isHome ? `#${anchor}` : `/#${anchor}`
  const registerHref = 'https://app.getclearwork.in/signup'
  const loginHref    = 'https://app.getclearwork.in/login'

  const solutionsOpen = activeMenu === 'solutions'
  const resourcesOpen = activeMenu === 'resources'
  const megaOpen = activeMenu !== null

  const openMenu = (menu: 'solutions' | 'resources') => setActiveMenu(menu)
  const closeMenu = () => setActiveMenu(null)

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY
      setScrolled(y > 10)
      const waitlist = document.getElementById('waitlist')
      if (waitlist) {
        const top = waitlist.getBoundingClientRect().top + y
        const darkEnd = top + waitlist.offsetHeight + 64
        setOnDark(y + 40 >= top && y + 40 < darkEnd)
      }
    }
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeMenu()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    closeMenu()
    setOpen(false)
  }, [pathname])

  const navLinkClass = (active: boolean) =>
    `px-4 py-2 text-sm font-medium rounded-lg transition-all ${
      onDark && !megaOpen
        ? active ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/10'
        : active ? 'text-gray-900 bg-gray-100' : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
    }`

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        megaOpen ? 'bg-white shadow-sm' : ''
      } ${scrolled && !megaOpen ? 'px-4 pt-3' : ''}`}
      onMouseLeave={() => closeMenu()}
    >
      <div className={`flex items-center justify-between transition-all duration-300 ${
        scrolled && !megaOpen
          ? onDark
            ? 'max-w-5xl mx-auto px-6 h-[58px] rounded-2xl bg-white/10 backdrop-blur-2xl shadow-lg shadow-black/20 border border-white/12'
            : 'max-w-5xl mx-auto px-6 h-[58px] rounded-2xl bg-white/92 backdrop-blur-2xl shadow-lg shadow-gray-900/10 border border-gray-200/80'
          : megaOpen
            ? 'max-w-6xl mx-auto px-6 lg:px-10 h-[68px] border-b border-gray-100'
            : 'max-w-6xl mx-auto px-6 h-[68px]'
      }`}>

        <a href="/" className="flex items-center shrink-0">
          <img src="/logo/clearwork_full_dark.png" alt="ClearWork" style={{ height: 26, width: 'auto', display: 'block' }} />
        </a>

        <nav className="hidden md:flex items-center gap-0.5">
          {links.map(l => l.href
            ? (
              <Link key={l.label} to={l.href} className={navLinkClass(pathname === l.href)}>
                {l.label}
              </Link>
            ) : (
              <a key={l.anchor!} href={hrefFor(l.anchor!)} className={navLinkClass(false)}>
                {l.label}
              </a>
            )
          )}

          <button
            onMouseEnter={() => openMenu('solutions')}
            onClick={() => setActiveMenu(solutionsOpen ? null : 'solutions')}
            aria-expanded={solutionsOpen}
            className={navLinkClass(solutionsOpen)}
          >
            <span className="flex items-center gap-1">
              Solutions
              <ChevronDown size={13} className={`transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
            </span>
          </button>

          <button
            onMouseEnter={() => openMenu('resources')}
            onClick={() => setActiveMenu(resourcesOpen ? null : 'resources')}
            aria-expanded={resourcesOpen}
            className={navLinkClass(resourcesOpen)}
          >
            <span className="flex items-center gap-1">
              Resources
              <ChevronDown size={13} className={`transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
            </span>
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-2 shrink-0">
          <a href={loginHref} className={`text-sm font-medium px-4 py-2 rounded-full transition-all ${
            onDark && !megaOpen ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
          }`}>
            Sign in
          </a>
          <a href={registerHref}
            onClick={() => trackCTAClick('get_started', 'navbar')}
            className={`inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm transition-all ${
              onDark && !megaOpen
                ? 'bg-white text-stone-950 hover:bg-stone-100'
                : 'bg-gray-950 text-white hover:bg-gray-800'
            }`}>
            Get started free
            <ArrowRight size={14} />
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-600 hover:text-gray-900">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Full-width mega menu panel — Bonsai-style */}
      <AnimatePresence>
        {solutionsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block border-b border-gray-100 bg-white"
            onMouseEnter={() => openMenu('solutions')}
          >
            <MegaMenuPanel
              sections={solutionSections}
              featured={{
                image: '/screenshots/screenshot-dashboard.png',
                title: 'Start your 15-day Pro trial',
                desc: 'Proposals, contracts, invoicing and client portals — one platform for service businesses. No credit card required.',
                href: 'https://app.getclearwork.in/signup',
              }}
              onClose={closeMenu}
            />
          </motion.div>
        )}

        {resourcesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block border-b border-gray-100 bg-white"
            onMouseEnter={() => openMenu('resources')}
          >
            <MegaMenuPanel
              sections={resourceSections}
              featured={{
                image: '/screenshots/screenshot-invoice.png',
                title: 'Free GST tools for freelancers',
                desc: 'Invoice generator, tax calculators and contract templates — use them free, no signup required.',
                href: '/tools',
              }}
              onClose={closeMenu}
            />
          </motion.div>
        )}
      </AnimatePresence>

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

              <button
                onClick={() => setMobileSolutionsOpen(v => !v)}
                className="flex items-center justify-between px-4 py-3 text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all"
              >
                Solutions
                <ChevronDown size={14} className={`transition-transform duration-200 ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileSolutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mx-2 mb-2 px-4 py-3 flex flex-col gap-5">
                      {solutionSections.map(section => (
                        <div key={section.title}>
                          <p className="text-sm font-semibold text-gray-900 mb-2">{section.title}</p>
                          <div className="flex flex-col gap-2 pl-1">
                            {section.links.map(s => (
                              <Link
                                key={s.href}
                                to={s.href}
                                onClick={() => { setOpen(false); setMobileSolutionsOpen(false) }}
                                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                              >
                                {s.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
                    <div className="mx-2 mb-2 px-4 py-3 flex flex-col gap-5">
                      {resourceSections.map(section => (
                        <div key={section.title}>
                          <p className="text-sm font-semibold text-gray-900 mb-2">{section.title}</p>
                          <div className="flex flex-col gap-2 pl-1">
                            {section.links.map(r => (
                              <Link
                                key={r.href}
                                to={r.href}
                                onClick={() => { setOpen(false); setMobileResourcesOpen(false) }}
                                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                              >
                                {r.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
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
