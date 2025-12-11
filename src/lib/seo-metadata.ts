import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hibarr.de'
const languages = ['en', 'de', 'tr', 'ru']

export function getHreflangAlternates(path: string, lang: string = 'en'): Metadata['alternates'] {
  const alternates: Record<string, string> = {}

  // Ensure path starts with / if not empty
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const route = cleanPath === '/' ? '' : cleanPath

  for (const l of languages) {
    alternates[l] = `${baseUrl}/${l}${route}`
  }

  return {
    canonical: `${baseUrl}/${lang}${route}`,
    languages: {
      ...alternates,
      'x-default': `${baseUrl}/en${route}`,
    },
  }
}

export function getCanonical(path: string, lang: string) {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    const route = cleanPath === '/' ? '' : cleanPath
    return `${baseUrl}/${lang}${route}`
}
