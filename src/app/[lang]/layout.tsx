import { Fragment, Suspense } from 'react';
import { i18n } from '@/lib/i18n-config';
import type { Locale } from '@/lib/i18n-config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import ScrollToTop from '@/app/[lang]/_components/ScrollToTop';
import Script from 'next/script';
import { translate } from '@/lib/translation';

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
    <Suspense fallback={
      <div className='flex justify-center items-center h-screen'>
        <Image src='/logos/logo-blue.png' className='animate-pulse' alt='logo' width={250} height={50} />
      </div>
    }>
      <Fragment>
        <Header params={params} />
        <main className='min-h-screen overflow-x-hidden w-full'>
          {children}
        </main>
        <ScrollToTop />
        <Footer params={params} />
        <Script id='bitrix-script'>
          {`(function(w,d,u){
                var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
                var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
        })(window,document,'https://cdn.bitrix24.de/b26123245/crm/site_button/loader_4_mnv0cr.js');`}
        </Script>
      </Fragment>
    </Suspense>
  );
} 