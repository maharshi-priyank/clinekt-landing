import { useEffect, useRef } from 'react'
import { trackScrollDepth } from '../lib/analytics'

const THRESHOLDS = [25, 50, 75, 100] as const

export function useScrollDepth(page?: string) {
  const fired = useRef(new Set<number>())

  useEffect(() => {
    fired.current.clear()

    function onScroll() {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      const pct = Math.round((scrolled / total) * 100)

      for (const threshold of THRESHOLDS) {
        if (pct >= threshold && !fired.current.has(threshold)) {
          fired.current.add(threshold)
          trackScrollDepth(threshold, page)
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [page])
}
