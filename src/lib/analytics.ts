const GA_ID = 'G-NEGSZC249H'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag(...args)
}

export function trackPageview(path: string) {
  gtag('config', GA_ID, { page_path: path })
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  gtag('event', name, params)
}

// ── Specific events ────────────────────────────────────────────────────────

export function trackWaitlistClick(location: string) {
  trackEvent('waitlist_click', { location })
}

export function trackCTAClick(label: string, location?: string) {
  trackEvent('cta_click', { label, location })
}

export function trackToolUsed(toolName: string) {
  trackEvent('tool_used', { tool_name: toolName })
}

export function trackScrollDepth(percent: 25 | 50 | 75 | 100, page?: string) {
  trackEvent('scroll_depth', { percent, page })
}

export function trackBlogRead(slug: string) {
  trackEvent('blog_read', { slug })
}
