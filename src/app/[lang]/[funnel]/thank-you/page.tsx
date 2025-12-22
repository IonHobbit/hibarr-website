import WebinarThankYouFunnel from './_components/WebinarThankYouFunnel';
import EbookThankYouFunnel from './_components/EbookThankYouFunnel';
import ConsultationThankYouFunnel from './_components/ConsultationThankYouFunnel';
import FacebookGroupThankYouFunnel from './_components/FacebookGroupThankYouFunnel';
import { getHreflangAlternates } from '@/lib/seo-metadata';
import { Metadata } from 'next';
import { Locale } from '@/lib/i18n-config';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale, funnel: string }> }): Promise<Metadata> {
  const { lang, funnel } = await params;
  return {
    title: 'Thank You',
    alternates: getHreflangAlternates(`/${funnel}/thank-you`, lang)
  }
}
export default async function ThankYouPage({ params }: { params: Promise<{ funnel: string, lang: Locale }> }) {
  const { funnel } = await params;

  if (!funnel) {
    return <div>No funnel found</div>
  }

  return (
    <section id='hero' className="relative w-full overflow-hidden px-4 pt-28 pb-10 sm:px-6 lg:px-8 lg:py-10 grid place-items-center md:place-content-center min-h-screen">
      {{
        webinar: <WebinarThankYouFunnel />,
        webinaar: <WebinarThankYouFunnel />,
        ebook: <EbookThankYouFunnel />,
        consultation: <ConsultationThankYouFunnel />,
        'facebook-group': <FacebookGroupThankYouFunnel />,
      }[funnel]}
    </section>
  )
}
