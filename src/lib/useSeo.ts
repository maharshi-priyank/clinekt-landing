import { useEffect } from 'react'

export function useSeo(title: string, description: string, canonical?: string) {
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

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = canonical
      setMeta('og:url', canonical, 'property')
    }

    return () => { document.title = prev }
  }, [title, description, canonical])
}
