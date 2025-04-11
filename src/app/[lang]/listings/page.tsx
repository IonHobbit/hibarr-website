import { Metadata } from 'next';
import { Fragment, Suspense } from 'react';
import SearchBar from './_components/SearchBar';
import PropertyList from './_components/PropertyList';

export const metadata: Metadata = {
  title: 'Listings',
  description: 'Listings',
}

export default async function ListingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Fragment>
        <section id='root' className="py-20 pt-40 xl:pt-0 relative grid place-items-center place-content-center min-h-[40vh] bg-[url('/images/listings-hero.jpg')] bg-cover bg-center bg-no-repeat">
          <SearchBar />
          <div className='absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-transparent'></div>
        </section>
        <PropertyList />
      </Fragment>
    </Suspense>
  );
} 