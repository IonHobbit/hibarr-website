import { Metadata } from "next";
import { Inter, Figtree } from "next/font/google";
import { Locale } from "@/lib/i18n-config";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { PostHogProvider } from "@/providers/PostHogProvider";
import MetaPixel from "@/components/analytics/MetaPixel";
import ThemeProvider from "@/providers/ThemeProvider";
import GA4 from "@/components/analytics/GTMHead";
import GTMBody from "@/components/analytics/GTMBody";

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

export const metadata: Metadata = {
  title: {
    template: "%s - HIBARR Trading",
    default: "HIBARR Trading",
  },
  description: "Unlock the potential of North Cyprus and see why it is the preferred choice for international investors.",
  keywords: ["North Cyprus", "real estate", "investment", "property", "HIBARR", "trading"],
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
  },
  twitter: {
    card: "summary_large_image",
    title: "HIBARR Trading",
    description: "Unlock the potential of North Cyprus and see why it is the preferred choice for international investors.",
  },
};

export default async function RootLayout(
  props: Readonly<{
    params: Promise<{ lang: Locale }>;
    children: React.ReactNode;
  }>
) {
  const { params, children } = props;
  const { lang } = await params;

  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <GA4 />
        <MetaPixel />
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
        <GTMBody />
        <ThemeProvider>
          <PostHogProvider>
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}