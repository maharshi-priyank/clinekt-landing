import { Link } from 'react-router-dom'
import { Heart, MapPin } from 'lucide-react'

const nav = {
  Product: ['How it works', 'Features', 'Pricing', 'Changelog'],
  Company: ['About', 'Blog', 'ProductHunt', 'LinkedIn'],
  Legal:   ['Privacy Policy', 'Terms of Service', 'Security'],
}

export default function Footer() {
  return (
    <footer className="px-4 pb-4" style={{ background: '#ccd8e2' }}>
      <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm px-8 sm:px-10 pt-10 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-10">
          <div className="col-span-2">
            <img src="/logo/clearwork_full_dark.png" alt="ClearWork" style={{ height: 28, width: 'auto', display: 'block', marginBottom: 16 }} />
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

        {/* Bottom bar — inside the card */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-400">© 2026 ClearWork</p>
          <p className="text-xs text-gray-400">Built for 15M Indian freelancers who deserve better tools.</p>
        </div>

      </div>
    </footer>
  )
}
