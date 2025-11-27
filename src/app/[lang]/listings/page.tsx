import { Metadata } from 'next';
import { Fragment, Suspense } from 'react';
import { SuspendedSearchBar } from './_components/SearchBar';
import PropertyList from './_components/PropertyList';
import { Locale } from '@/lib/i18n-config';
import { seoDescriptions } from '@/data/seo-descriptions';

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;

  return {
    title: 'Listings',
    description: seoDescriptions[lang]?.listings,
  }
}

export default async function ListingsPage() {
  return (
    <Fragment>
      <section id='root' className="pt-40 pb-20 xl:pt-32 relative grid place-items-center place-content-center min-h-[40vh] bg-[url('https://res.cloudinary.com/hibarr/image/upload/listings-hero_z1qom9')] bg-cover bg-center bg-no-repeat">
        <div className="max-w-screen-sm xl:max-w-screen-xl mx-auto z-10">
          <SuspendedSearchBar />
        </div>
        <div className='absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-transparent'></div>
      </section>
      <SuspendedPropertyList />
    </Fragment>
  );
}

const SuspendedPropertyList = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertyList />
    </Suspense>
  )
}