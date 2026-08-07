import { Link } from 'react-router-dom'
import { MapPin, Heart, ArrowUpRight } from 'lucide-react'

type NavItem = { label: string; href: string; external?: boolean }

const nav: Record<string, NavItem[]> = {
  Product: [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Features',     href: '/features' },
    { label: 'Pricing',      href: '/#pricing' },
    { label: 'Changelog',    href: '#' },
  ],
  Company: [
    { label: 'About',    href: '/about' },
    { label: 'Contact',  href: '/contact' },
    { label: 'Blog',     href: '/blog' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/getclearwork', external: true },
  ],
  Legal: [
    { label: 'Privacy Policy',   href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Security',         href: '/security' },
  ],
}

function FooterLink({ item }: { item: NavItem }) {
  const cls = 'text-sm text-stone-500 hover:text-stone-900 transition-colors duration-150 inline-flex items-center gap-1'
  if (item.href === '#') return <span className="text-sm text-stone-300 cursor-default">{item.label}</span>
  if (item.external) return (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {item.label}<ArrowUpRight size={11} className="text-stone-400 opacity-70" />
    </a>
  )
  if (item.href.startsWith('/') && !item.href.startsWith('/#')) return <Link to={item.href} className={cls}>{item.label}</Link>
  return <a href={item.href} className={cls}>{item.label}</a>
}

export default function Footer() {
  return (
    <footer style={{ background: '#FAFAF9' }}>
      {/* Hard architectural break from dark section — intentional, modern */}
      <div style={{ height: 1, background: '#E5E0D8' }} />

      <div className="max-w-6xl mx-auto px-5 pt-14 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-10 mb-12">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <img
              src="/logo/clearwork_full_dark.png"
              alt="ClearWork"
              style={{ height: 26, width: 'auto', display: 'block', marginBottom: 14 }}
            />
            <p className="text-stone-500 text-sm leading-relaxed" style={{ maxWidth: 220 }}>
              The all-in-one workspace for Indian freelancers and agencies — run your business like a pro, end to end.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                bg-amber-50 border border-amber-100 text-xs font-semibold text-amber-700">
                <MapPin size={10} />
                Made with
                <Heart size={10} className="fill-current text-rose-500" />
                in India
              </span>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(nav).map(([section, items]) => (
            <div key={section}>
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.12em] mb-4">
                {section}
              </div>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item.label}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6"
          style={{ borderTop: '1px solid #E5E0D8' }}
        >
          <p className="text-xs text-stone-400">© 2026 ClearWork · Built for India</p>
          <p className="text-xs text-stone-400">Client management software, built right.</p>
        </div>

      </div>
    </footer>
  )
}
