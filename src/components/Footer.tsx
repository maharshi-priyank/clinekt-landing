import { Link } from 'react-router-dom'
import { Heart, MapPin } from 'lucide-react'

type NavItem = { label: string; href: string; external?: boolean }

const nav: Record<string, NavItem[]> = {
  Product: [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Features',     href: '/features' },
    { label: 'Pricing',      href: '/#pricing' },
    { label: 'Changelog',    href: '#' },
  ],
  Company: [
    { label: 'About',        href: '/about' },
    { label: 'Contact',      href: '/contact' },
    { label: 'Blog',         href: '/blog' },
    { label: 'LinkedIn',     href: 'https://www.linkedin.com/company/getclearwork', external: true },
  ],
  Legal: [
    { label: 'Privacy Policy',   href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Security',         href: '/security' },
  ],
}

function FooterLink({ item }: { item: NavItem }) {
  const cls = 'text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium'
  if (item.href === '#') return <span className={`${cls} cursor-default opacity-50`}>{item.label}</span>
  if (item.href.startsWith('/') && !item.href.startsWith('/#')) return <Link to={item.href} className={cls}>{item.label}</Link>
  if (item.href.startsWith('http')) return <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>{item.label}</a>
  return <a href={item.href} className={cls}>{item.label}</a>
}

export default function Footer() {
  return (
    <footer className="px-4 pb-4" style={{ background: '#e4ecf4' }}>
      <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm px-8 sm:px-10 pt-10 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-10 mb-10">
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <img src="/logo/clearwork_full_dark.png" alt="ClearWork" style={{ height: 28, width: 'auto', display: 'block', marginBottom: 16 }} />
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Your favourite business management software. Built for early startup founders.
            </p>
            <div className="mt-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-xs font-semibold text-amber-700">
                <MapPin size={11} />
                Made with
                <Heart size={11} className="fill-current" />
                in India
              </span>
            </div>
          </div>

          {Object.entries(nav).map(([section, items]) => (
            <div key={section}>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{section}</div>
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

        {/* Bottom bar — inside the card */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-400">© 2026 ClearWork</p>
          <p className="text-xs text-gray-400">Client management software, built right.</p>
        </div>

      </div>
    </footer>
  )
}
