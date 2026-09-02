const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
    oaiq: (...args: unknown[]) => void
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag(...args)
}

// OpenAI Ads Manager measurement pixel — https://developers.openai.com/ads/measurement-pixel
function oaiq(...args: unknown[]) {
  if (typeof window === 'undefined' || !window.oaiq) return
  window.oaiq(...args)
}

export function trackPageview(path: string) {
  gtag('config', GA_ID, { page_path: path })
  oaiq('measure', 'page_viewed', { type: 'contents' })
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  gtag('event', name, params)
}

// ── Specific events ────────────────────────────────────────────────────────

export function trackWaitlistClick(location: string) {
  trackEvent('waitlist_click', { location })
  oaiq('measure', 'lead_created', { type: 'customer_action' })
}

export function trackCTAClick(label: string, location?: string) {
  trackEvent('cta_click', { label, location })
}

// Fire only for CTAs that link straight to the app signup page — this is
// the actual conversion signal OpenAI Ads should optimize toward.
export function trackSignupClick(label: string, location?: string) {
  trackEvent('cta_click', { label, location })
  oaiq('measure', 'lead_created', { type: 'customer_action' })
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
