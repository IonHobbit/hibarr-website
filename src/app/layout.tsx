import { Metadata, Viewport } from "next";
import { Inter, Figtree } from "next/font/google";
import { Locale } from "@/lib/i18n-config";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { PostHogProvider } from "@/providers/PostHogProvider";
import MetaPixel from "@/components/analytics/MetaPixel";
import ThemeProvider from "@/providers/ThemeProvider";
import GA4 from "@/components/analytics/GTMHead";
import GTMBody from "@/components/analytics/GTMBody";
import { WebVitals } from "@/components/analytics/WebVitals";
import { cookies, headers } from "next/headers";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    template: "%s - HIBARR Trading",
    default: "HIBARR Trading",
  },
  description: "Unlock the potential of North Cyprus and see why it is the preferred choice for international investors.",
  keywords: ["North Cyprus", "investment", "HIBARR", "trading", "finance"],
  authors: [{ name: "HIBARR Trading" }],
  creator: "HIBARR Trading",
  publisher: "HIBARR Trading",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hibarr.de",
    title: "HIBARR Trading",
    description: "Unlock the potential of North Cyprus and see why it is the preferred choice for international investors.",
    siteName: "HIBARR Trading",
    images: ["https://hibarr.de/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "HIBARR Trading",
    description: "Unlock the potential of North Cyprus and see why it is the preferred choice for international investors.",
    images: ["https://hibarr.de/twitter-image.jpg"],
    creator: "@hibarr",
    site: "@hibarr",
  },
};

export default async function RootLayout(
  props: Readonly<{
    params: Promise<{ lang: Locale }>;
    children: React.ReactNode;
  }>
) {
  const { params, children } = props;
  const { lang = 'en' } = await params;
  const headerList = await headers();
  const nonce = headerList.get("x-nonce") || undefined;

  const cookieStore = await cookies();
  const analyticsDisabled = cookieStore.get('hibarr_noanalytics')?.value === '1';

  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        {!analyticsDisabled && (
          <>
            <GA4 nonce={nonce} />
            <MetaPixel nonce={nonce} />
          </>
        )}
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://vz-da4cd036-d13.b-cdn.net" />
        <link rel="dns-prefetch" href="https://eu.i.posthog.com" />

      </head>
      <body
        className={`${inter.variable} ${figtree.variable} antialiased relative w-screen overflow-x-hidden`}
      >
        {!analyticsDisabled && <GTMBody />}
        <ThemeProvider>
          {analyticsDisabled ? (
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
          ) : (
            <PostHogProvider>
              <WebVitals />
              <ReactQueryProvider>
                {children}
              </ReactQueryProvider>
            </PostHogProvider>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}