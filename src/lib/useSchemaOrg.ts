import { useEffect } from 'react'

type Schema = Record<string, unknown>

export function useSchemaOrg(schema: Schema | Schema[]) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
    return () => { script.remove() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export function breadcrumbSchema(
  items: { name: string; item: string }[],
): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, item }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item,
    })),
  }
}
