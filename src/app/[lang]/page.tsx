import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';

export default async function Home(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const params = await props.params;

  const {
    lang
  } = params;

  const dictionary = await getDictionary(lang);

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {dictionary.home.title}
        </h1>
        <p className="text-xl text-gray-600">
          {dictionary.home.subtitle}
        </p>
      </div>
    </main>
  );
} 