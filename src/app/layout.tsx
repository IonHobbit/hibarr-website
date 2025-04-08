import { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Locale } from "@/lib/i18n-config";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Hibarr Estates",
    default: "Hibarr Estates",
  },
  description: "Unlock the potential of real estate in North Cyprus and see why it is the preferred choice for international investors.",
}

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
      <body
        className={`${playfairDisplay.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
