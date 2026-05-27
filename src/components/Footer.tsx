import { Link } from 'react-router-dom'
import { Heart, MapPin } from 'lucide-react'

const nav = {
  Product: ['How it works', 'Features', 'Pricing', 'Changelog'],
  Company:  ['About', 'Blog', 'ProductHunt', 'LinkedIn'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Security'],
}

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <img src="/logo/full_logo.svg" alt="Clinekt" className="h-9 w-auto" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              India's all-in-one client workflow for freelancers and agencies.
              Proposal → Contract → GST Invoice → Payment. All connected.
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
                  <li key={item}>
                    {item === 'Security' ? (
                      <Link to="/security" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">{item}</Link>
                    ) : (
                      <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">{item}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400">© 2026 Clinekt</p>
          <p className="text-xs text-gray-400">Built for 15M Indian freelancers who deserve better tools.</p>
        </div>
      </div>
    </footer>
  )
}
