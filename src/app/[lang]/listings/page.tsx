import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';

export default async function ListingsPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{dictionary.listings.title}</h1>
        <p className="text-gray-600 mb-8">{dictionary.listings.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Listing cards will go here */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Sample Listing</h2>
            <p className="text-gray-600">Listing description will go here.</p>
          </div>
        </div>
      </div>
    </main>
  );
} 