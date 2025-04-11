import React, { Fragment } from 'react';
import { Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionary';
import { Metadata } from 'next';
import { Icon } from '@iconify/react';
import FAQAccordion from '../_components/FAQAccordion';
// import CalendlyEmbed from '@/components/CalendlyEmbed';
import { client } from '@/lib/sanity/client';
import { ConsultationPage as ConsultationPageType } from '@/lib/sanity/sanity.types';
import ConsultationForm from './_components/ConsultationForm';

export const metadata: Metadata = {
  title: 'Consultation',
  description: 'Consultation page',
}

export default async function ConsultationPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);

  const data = await client.fetch<ConsultationPageType>(`*[_type == "consultationPage" && language == $lang][0]`, { lang });

  return (
    <Fragment>
      <section id='root' className="relative grid place-items-center place-content-center min-h-screen bg-[url('/images/hibarr-oscar.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="section grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 z-10">
          <div className='flex flex-col gap-6'>
            <h1 className="text-5xl md:text-6xl text-primary-foreground">
              {data?.title}
            </h1>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl text-primary-foreground">{data?.subtitle}</h3>
                <p className="text-primary-foreground">
                  {data?.offerInformation?.label}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {data?.offerInformation?.items?.map((offering, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <Icon icon={offering.icon ?? ''} className="text-primary-foreground text-5xl md:text-7xl text-center" />
                    <p className="text-base md:text-lg text-primary-foreground text-center">{offering.title}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl text-primary-foreground">{data?.closerInformation?.title}</h3>
                <p className="text-primary-foreground">
                  {data?.closerInformation?.subtitle}
                </p>
              </div>
            </div>
          </div>
          <div className='relative w-full rounded-lg overflow-hidden bg-secondary grid place-items-center'>
            <ConsultationForm />
            {/* <CalendlyEmbed url="https://calendly.com/rabihrabea/appointmentbooking?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=D6A319" /> */}
          </div>
        </div>
        <div className='absolute inset-0 bg-gradient-to-b from-primary via-primary/70 to-transparent'></div>
      </section>
      <section className="section">
        <video src="https://hibarr.de/wp-content/uploads/2025/03/flyer.mp4" autoPlay muted loop playsInline className='w-full h-full object-cover aspect-video rounded-lg overflow-hidden' />
      </section>
      <section id="faqs" className="section">
        <div className="bg-primary rounded-lg py-6 px-10 flex flex-col gap-6">
          <h2 className="text-2xl md:text-4xl text-primary-foreground">Frequently Asked Questions</h2>
          <FAQAccordion lang={lang} />
        </div>
      </section>
    </Fragment>
  );
} 