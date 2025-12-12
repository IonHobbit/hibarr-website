import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// List of all supported languages
export const languages = ['en', 'de', 'tr', 'ru']

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

  // Ignore all SVG files (let Next/static serve them directly)
  if (pathname.endsWith('.svg')) {
    return NextResponse.next();
  }

  if (pathname.includes('/src/internal/') ||
    pathname.endsWith('.ts') ||
    pathname.endsWith('.js.map') ||
    pathname.includes('node_modules')) {
    // Return 204 No Content for these requests to stop the logging
    return new NextResponse(null, { status: 204 });
  }

  // Generate nonce for CSP
  const nonce = btoa(crypto.randomUUID());

  // Create a new headers object from the request headers and add the nonce
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  // Define CSP
  // Note: We use 'unsafe-inline' for styles because many CSS-in-JS libraries and Next.js require it.
  // We try to be strict with scripts.
  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' https://connect.facebook.net https://www.googletagmanager.com https://assets.calendly.com https://cdn.bitrix24.de;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https://hibarr.de https://cdn.sanity.io https://res.cloudinary.com https://www.facebook.com;
    font-src 'self' data:;
    connect-src 'self' ${process.env.NEXT_PUBLIC_API_URL} https://www.googletagmanager.com https://region1.google-analytics.com https://www.facebook.com https://www.facebook.com/tr;
    frame-src 'self' https://www.youtube.com https://calendly.com https://www.google.com https://www.googletagmanager.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    media-src 'self' https://vz-da4cd036-d13.b-cdn.net;
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  // Check if the pathname already starts with a language code
  const pathnameHasLocale = languages.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  let response: NextResponse;

  if (pathnameHasLocale) {
    // Add the current pathname to headers so we can access it in server components
    response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    response.headers.set('x-pathname', pathname);
    response.headers.set('x-locale', pathname.split('/')[1]);
  } else {
    // Redirect if there is no locale
    const locale = getPreferredLanguage(request);
    request.nextUrl.pathname = `/${locale}${pathname}`

    response = NextResponse.redirect(request.nextUrl);
    // Add the current pathname to headers so we can access it in server components
    response.headers.set('x-pathname', pathname);
    response.headers.set('x-locale', locale);
  }

  // Set Security Headers
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  // response.headers.set('Content-Security-Policy', csp);

  // Also set the nonce in a response header so it can be read by the client if needed
  response.headers.set('x-nonce', nonce);

  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|logos|featured|images|icons|favicon.ico|sitemap.xml|robots.txt|ingest|expose/testimonials|tools|ebook-showcase|external/alpha-cash|downloads).*)',
    '/:path*/src/internal/:file*',
  ],
}