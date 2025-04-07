import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { translateObject } from "@/lib/translate";
import { Locale } from "@/lib/i18n-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const generateMetadata = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  console.log(lang)
  // const dictionary = await translateObject({
  //   title: "Hibarr Estates",
  //   description: "Unlock the potential of real estate in North Cyprus and see why it is the preferred choice for international investors.",
  // }, params.lang);

  const dictionary = {
    title: "Hibarr Estates",
    description: "Unlock the potential of real estate in North Cyprus and see why it is the preferred choice for international investors.",
  }

  return {
    title: {
      template: "%s - Hibarr Estates",
      default: dictionary.title,
    },
    description: dictionary.description,
  };
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
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
