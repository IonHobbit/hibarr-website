import WebinarThankYouFunnel from './_components/WebinarThankYouFunnel';
import EbookThankYouFunnel from './_components/EbookThankYouFunnel';
import ConsultationThankYouFunnel from './_components/ConsultationThankYouFunnel';
import FacebookGroupThankYouFunnel from './_components/FacebookGroupThankYouFunnel';

export default async function ThankYouPage({ params }: { params: Promise<{ funnel: string }> }) {
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
