import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';

export default async function TestimonialsPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{dictionary.testimonials.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial cards */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
              <div>
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-gray-600 text-sm">{dictionary.testimonials.client}</p>
              </div>
            </div>
            <p className="text-gray-600">
              &quot;Excellent service and professional team. Highly recommended!&quot;
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 