import { IndianRupee, TrendingDown, Users, Coffee } from 'lucide-react'
import { FadeIn } from './ui/FadeIn'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-500 shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
      {children}
    </span>
  )
}

const affordability = [
  { icon: IndianRupee, stat: '₹149/mo', label: 'Full Pro plan — less than ₹5 a day' },
  { icon: TrendingDown, stat: '10–20×', label: 'Cheaper than Zoho CRM, HubSpot, or Freshsales per seat' },
  { icon: Users, stat: '₹0', label: 'Free plan forever for up to 5 clients — no card, ever' },
]

/**
 * Shared "priced for any business" affordability block. Used on any page
 * making a price-comparison argument (CRM alternative pages, Pricing page).
 */
export default function AffordabilitySection({ className = 'py-20' }: { className?: string }) {
  return (
    <section className={className}>
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <FadeIn className="text-center mb-12">
          <SectionLabel>Priced for any business</SectionLabel>
          <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-950 tracking-tight">
            So affordable, every business can afford it.
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto flex items-center justify-center gap-1.5">
            <Coffee size={15} className="text-amber-600 shrink-0" />
            ₹149/month is less than the price of two cups of coffee — for your entire CRM, proposals, and invoicing.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-3 gap-5">
          {affordability.map(({ icon: Icon, stat, label }, i) => (
            <FadeIn key={label} delay={i * 0.08}>
              <div className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                  <Icon size={18} className="text-emerald-600" />
                </div>
                <p className="text-3xl font-extrabold text-gray-950 tracking-tight">{stat}</p>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
