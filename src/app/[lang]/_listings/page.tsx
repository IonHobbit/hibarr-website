import { Metadata } from 'next';
import { Fragment, Suspense } from 'react';
import { getHreflangAlternates } from '@/lib/seo-metadata';
import { SuspendedSearchBar } from './_components/SearchBar';
import PropertyList from './_components/PropertyList';
import { seoTitles } from '@/lib/seo-titles';
import { Locale } from '@/lib/i18n-config';
import { seoDescriptions } from '@/data/seo-descriptions';
import { seoH1s } from '@/lib/seo-h1';
import { SeoMetaFields } from '@/types/sanity.types';
import { generateSEOMetadata } from '@/lib/utils';

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return generateSEOMetadata({ metaTitle: seoTitles[lang].listings, metaDescription: seoDescriptions[lang].listings } as SeoMetaFields, {
    alternates: getHreflangAlternates('/listings', lang)
  })
}


export default async function ListingsPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  return (
    <Fragment>
      <section id='root' className="pt-40 pb-20 xl:pt-32 relative grid place-items-center place-content-center min-h-[40dvh] bg-[url('https://res.cloudinary.com/hibarr/image/upload/listings-hero_z1qom9')] bg-cover bg-center bg-no-repeat">
        <div className="max-w-screen-sm xl:max-w-screen-xl mx-auto z-10 flex flex-col gap-8 items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center drop-shadow-md">
            {seoH1s.listings[lang]}
          </h1>
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