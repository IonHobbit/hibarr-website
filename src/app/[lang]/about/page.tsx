import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';

export default async function AboutPage(
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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{dictionary.about.title}</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">{dictionary.about.welcome}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">{dictionary.about.mission.title}</h2>
              <p className="text-gray-600">{dictionary.about.mission.content}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">{dictionary.about.vision.title}</h2>
              <p className="text-gray-600">{dictionary.about.vision.content}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 