import React from 'react';
import { Locale } from '@/lib/i18n-config';
import { Metadata } from 'next';
import SqueezeConsultationForm from './_components/SqueezeConsultationForm';
import { translate, translateBatch } from '@/lib/translation';
import { seoDescriptions } from '@/data/seo-descriptions';
import { seoTitles } from '@/lib/seo-titles';
import { fetchRawSanityData, fetchSanityData } from '@/lib/third-party/sanity.client';
import { generateSEOMetadata } from '@/lib/utils';
import { ConsultationPage as ConsultationPageType, SeoMetaFields } from '@/types/sanity.types';
import { seoH1s } from '@/lib/seo-h1';
import { headers as nextHeaders } from 'next/headers';
import { gecitkaleConsultationContent } from '@/lib/content/gecitkale-consultation';
import { Icon } from '@/components/icons';
import Image from 'next/image';

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const { seo } = await fetchRawSanityData<ConsultationPageType>(`*[_type == "consultationPage" && language == $lang][0]`, { lang });

  return generateSEOMetadata({ ...seo, metaTitle: seoTitles[lang].consultation, metaDescription: seoDescriptions[lang].consultation } as SeoMetaFields)
}

export default async function GecitkaleConsultationPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;
  const headerList = await nextHeaders();
  const nonce = headerList.get('x-nonce') || undefined;

  const content = gecitkaleConsultationContent[lang] ?? gecitkaleConsultationContent.en;

  return (
    <section className='flex flex-col gap-10'>
      <section className="relative grid place-items-start min-h-[95dvh] pb-10 overflow-hidden bg-[url('https://res.cloudinary.com/hibarr/image/upload/v1765222618/16-min_jqxljs.png')] bg-cover bg-center bg-no-repeat">
        <div className="section !max-w-screen-2xl grid grid-cols-1 md:grid-cols-2 gap-10 z-10 mt-16 md:mt-20">
          <div className='flex flex-col gap-6'>
            <Image src="/logos/logo.png" alt="Hibarr Estates Logo" loading='eager' className="object-contain h-auto" width={140} height={30} />
            <h1 className="text-5xl md:text-6xl text-primary-foreground">
              {(content.title)}
            </h1>
            <p className="text-primary-foreground text-3xl">
              {(content.subtitle)}
            </p>
            <div className="hidden md:flex flex-col p-6 bg-white/10 rounded-lg border border-white/10 backdrop-blur-lg">
              <ul className="list-disc list-inside flex flex-col gap-6">
                {(content.features).map((feature, index) => (
                  <li key={index} className="text-primary-foreground text-2xl">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='relative w-full max-w-lg mx-auto rounded-lg overflow-hidden bg-secondary grid place-items-center'>
            <SqueezeConsultationForm nonce={nonce} />
          </div>
        </div>
        <div className='section !max-w-screen-2xl z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden'>
          <div className="rounded-lg border border-white/10 overflow-hidden relative min-h-60">
            <Image alt={content.imageAlt.project} src="https://res.cloudinary.com/hibarr/image/upload/v1765821711/2_evtbnz.png" fill sizes='100%' className='w-full h-full object-cover scale-x-[-1]' />
          </div>
          <div className="flex flex-col p-4 bg-white/10 rounded-lg border border-white/10 backdrop-blur-lg">
            <ul className="list-disc list-inside flex flex-col gap-2">
              {(content.features).map((feature, index) => (
                <li key={index} className="text-primary-foreground text-lg">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='bg-white w-full z-10 overflow-hidden'>
          <div className="section !max-w-screen-2xl mt-auto grid grid-cols-1 pb-0 md:pb-10 place-items-center md:grid-cols-2 z-10">
            <div className='order-2 md:order-1 md:translate-y-20'>
              <Image src="https://res.cloudinary.com/hibarr/image/upload/v1765820506/Rabih_zx3wdo.png" alt={content.imageAlt.rabih} width={450} height={450} />
            </div>
            <div className='p-6 md:p-8 flex flex-col gap-6'>
              <h3 className='text-3xl md:text-4xl text-primary'>{content.aboutRabih.title}</h3>
              <p className='text-primary text-lg md:text-xl'>
                {content.aboutRabih.description}
              </p>
              <div className="flex flex-col gap-6">
                {(content.trust).map((trust, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <Icon icon="game-icons:check-mark" className="text-accent text-lg md:text-2xl shrink-0" />
                    <p className="text-primary text-lg md:text-xl">{trust}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/70 to-primary/50"></div>
      </section>
    </section>
  );
}
