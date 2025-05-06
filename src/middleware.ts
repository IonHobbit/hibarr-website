import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of all supported languages
export const languages = ['en', 'de', 'tr']

// Get the preferred language from the request
function getPreferredLanguage(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return 'en'

  const preferredLanguage = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim())
    .find(lang => languages.includes(lang))

  return preferredLanguage || 'en'
}

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname

  // Check if the pathname already starts with a language code
  const pathnameHasLocale = languages.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getPreferredLanguage(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|logos|featured|images|favicon.ico|ingest|expose/testimonials|tools/report-gen).*)',
  ],
} 