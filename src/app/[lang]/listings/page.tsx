import { Metadata } from 'next';
import { Fragment } from 'react';
import SearchBar from './_components/SearchBar';
import PropertyList from './_components/PropertyList';

export const metadata: Metadata = {
  title: 'Listings',
  description: 'Listings',
}

export default async function ListingsPage() {
  return (
    <Fragment>
      <section id='root' className="pt-40 pb-20 xl:pt-32 relative grid place-items-center place-content-center min-h-[40vh] bg-[url('/images/listings-hero.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="max-w-screen-sm xl:max-w-screen-xl mx-auto z-10">
          <SearchBar />
        </div>
        <div className='absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-transparent'></div>
      </section>
      <PropertyList />
    </Fragment>
  );
} 