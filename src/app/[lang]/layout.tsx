import { Fragment, Suspense } from 'react';
import { i18n } from '@/lib/i18n-config';
import type { Locale } from '@/lib/i18n-config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

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
        <Image src='/logos/logo-blue.png' alt='logo' width={100} height={100} />
      </div>
    }>
      <Fragment>
        <Header params={params} />
        <main className='min-h-screen overflow-x-hidden w-full'>
          {children}
        </main>
        <Footer params={params} />
      </Fragment>
    </Suspense>
  );
} 