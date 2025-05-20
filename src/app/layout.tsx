import { Metadata } from "next";
import { Playfair_Display, Inter, Work_Sans } from "next/font/google";
import { Locale } from "@/lib/i18n-config";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { PostHogProvider } from "@/providers/PostHogProvider";
import MetaPixel from "@/components/MetaPixel";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - HIBARR Estates",
    default: "HIBARR Estates",
  },
  description: "Unlock the potential of real estate in North Cyprus and see why it is the preferred choice for international investors.",
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
        <MetaPixel />
      </head>
      <body
        className={`${playfairDisplay.variable} ${inter.variable} ${workSans.variable} antialiased relative w-screen`}
      >
        <PostHogProvider>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}