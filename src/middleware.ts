import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

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
  const pathname = request.nextUrl.pathname;

  if (pathname.includes('/src/internal/') ||
    pathname.endsWith('.ts') ||
    pathname.endsWith('.js.map') ||
    pathname.includes('node_modules')) {
    // Return 204 No Content for these requests to stop the logging
    return new NextResponse(null, { status: 204 });
  }

  // Check if the pathname already starts with a language code
  const pathnameHasLocale = languages.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    // Add the current pathname to headers so we can access it in server components
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    response.headers.set('x-locale', pathname.split('/')[1]);
    return response;
  }

  // Redirect if there is no locale
  const locale = getPreferredLanguage(request);
  request.nextUrl.pathname = `/${locale}${pathname}`

  const response = NextResponse.redirect(request.nextUrl);
  // Add the current pathname to headers so we can access it in server components
  response.headers.set('x-pathname', pathname);
  response.headers.set('x-locale', locale);
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|logos|featured|images|favicon.ico|sitemap.xml|robots.txt|ingest|expose/testimonials|tools|external/alpha-cash).*)',
    '/:path*/src/internal/:file*',
  ],
} 