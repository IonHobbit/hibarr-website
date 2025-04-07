import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Locale } from "@/lib/i18n-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
