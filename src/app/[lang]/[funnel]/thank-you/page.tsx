'use client'

import { useParams } from 'next/navigation'
import ConsultationThankYouFunnel from './_components/ConsultationThankYouFunnel';
import WaitlistThankYouFunnel from './_components/WaitlistThankYouFunnel';
import WebinarThankYouFunnel from './_components/WebinarThankYouFunnel';

export default function ThankYouPage() {
  const { funnel }: { funnel: string } = useParams();

  if (!funnel) {
    return <div>No funnel found</div>
  }

  return (
    <section id='hero' className="relative w-full overflow-hidden px-4 pt-28 pb-10 sm:px-6 lg:px-8 lg:py-10 grid place-items-center md:place-content-center min-h-screen">
      {{
        consultation: <ConsultationThankYouFunnel />,
        waitlist: <WaitlistThankYouFunnel />,
        webinar: <WebinarThankYouFunnel />,
      }[funnel]}
    </section>
  )
}
