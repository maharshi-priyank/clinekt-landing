import { useEffect } from 'react'

/**
 * Lightweight per-route SEO meta tag setter (no react-helmet dependency).
 * Sets <title>, description, OG, and Twitter card tags. Restores previous
 * title on unmount.
 */
export function useSeo(title: string, description: string) {
  useEffect(() => {
    const prev = document.title
    document.title = title

    function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.content = content
    }

    setMeta('description', description)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)

    return () => { document.title = prev }
  }, [title, description])
}
