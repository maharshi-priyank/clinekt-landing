import { Link } from 'react-router-dom'
import { ArrowRight, Wrench } from 'lucide-react'
import { TOOLS } from '../lib/tools'

interface Props {
  currentHref: string
}

export default function OtherToolsSection({ currentHref }: Props) {
  const others = TOOLS.filter(t => t.href !== currentHref)

  // Show popular tools first, then fill up to 4 total
  const sorted = [
    ...others.filter(t => t.popular),
    ...others.filter(t => !t.popular),
  ].slice(0, 4)

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-5">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Wrench size={16} className="text-indigo-600" />
            <h2 className="text-lg font-bold text-gray-900">More free tools</h2>
          </div>
          <Link
            to="/tools"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View all tools <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sorted.map(tool => (
            <Link
              key={tool.href}
              to={tool.href}
              className="group block rounded-2xl bg-white border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 group-hover:text-indigo-700 transition-colors">
                {tool.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{tool.desc}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {tool.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-500">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
