import { Fragment, Suspense } from 'react';
import { i18n } from '@/lib/i18n-config';
import type { Locale } from '@/lib/i18n-config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import ScrollToTop from '@/app/[lang]/_components/ScrollToTop';
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/seo-schema';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { getHreflangAlternates } from '@/lib/seo-metadata';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  
  // If pathname is /en/about, we want route to be /about
  // x-pathname is just request.nextUrl.pathname. 
  
  let route = pathname;
  for (const locale of i18n.locales) {
     if (route.startsWith(`/${locale}/`) || route === `/${locale}`) {
        route = route.replace(`/${locale}`, "");
        break; // Only replace the first occurrence
     }
  }
  
  // If route became empty string (e.g. from /en), make sure it is handled correctly by getHreflangAlternates
  // getHreflangAlternates logic: 
  // const cleanPath = path.startsWith('/') ? path : `/${path}` 
  // if route is empty string, cleanPath becomes /.
  // const route = cleanPath === '/' ? '' : cleanPath -> ''
  // alternates = baseUrl/l + '' -> correct.

  return {
    alternates: getHreflangAlternates(route, lang),
  };
}

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>;
  }
) {
  const { params, children } = props;

  return (

    <Suspense fallback={
      <div className='flex justify-center items-center h-screen'>
        <Image src='/logos/logo-blue.png' className='animate-pulse' alt='logo' width={250} height={50} />
      </div>
    }>
      <Fragment>
        <Suspense fallback={null}>
          <Header params={params} />
        </Suspense>
        <main className='min-h-screen overflow-x-hidden w-full'>
          {children}
        </main>
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        <Suspense fallback={null}>
          <Footer params={params} />
        </Suspense>
        {/* <Script
          id='bitrix-script'
          strategy="lazyOnload"
          nonce={nonce}
        >
          {`(function(w,d,u){
              var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
              var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
      })(window,document,'https://cdn.bitrix24.de/b26123245/crm/site_button/loader_4_mnv0cr.js');`}
        </Script>*/ }
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateLocalBusinessSchema()),
          }}
        />
      </Fragment>
    </Suspense>
  );
} 