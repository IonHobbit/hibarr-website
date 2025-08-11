import { Fragment, Suspense } from 'react';
import { i18n } from '@/lib/i18n-config';
import type { Locale } from '@/lib/i18n-config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/app/[lang]/_components/ScrollToTop';
import Script from 'next/script';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>;
  }
) {
  const { params, children } = props;

  return (
    <Fragment>
      <Suspense fallback={
        <div className='flex justify-center items-center h-screen'>
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      }>
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
      <Script
        id='bitrix-script'
        strategy="lazyOnload"
      >
        {`(function(w,d,u){
              var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
              var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
      })(window,document,'https://cdn.bitrix24.de/b26123245/crm/site_button/loader_4_mnv0cr.js');`}
      </Script>
    </Fragment>
  );
} 