import React from 'react';
import { Locale } from '@/lib/i18n-config';
import { Metadata } from 'next';
import { seoDescriptions } from '@/data/seo-descriptions';
import { seoTitles } from '@/lib/seo-titles';
import { fetchRawSanityData, fetchSanityData } from '@/lib/third-party/sanity.client';
import { generateSEOMetadata } from '@/lib/utils';
import { getHreflangAlternates } from '@/lib/seo-metadata';
import { CaseStudy, ConsultationPage as ConsultationPageType, SeoMetaFields } from '@/types/sanity.types';
import { headers as nextHeaders } from 'next/headers';
import { gecitkaleConsultationContent } from '@/lib/content/gecitkale-consultation';
import GecitkaleConsultationPageContent from './_components/GecitkaleConsultationPageContent';

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const { seo } = await fetchRawSanityData<ConsultationPageType>(`*[_type == "consultationPage" && language == $lang][0]`, { lang });

  return generateSEOMetadata({ ...seo, metaTitle: seoTitles[lang].consultation, metaDescription: seoDescriptions[lang].consultation } as SeoMetaFields, {
    alternates: getHreflangAlternates('/consultation/gecitkale', lang)
  })
}

export default async function GecitkaleConsultationPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;
  const headerList = await nextHeaders();
  const nonce = headerList.get('x-nonce') || undefined;

  const caseStudies = await fetchSanityData<CaseStudy[]>(`*[_type == "caseStudy" && language == $lang]`, { lang });

  const content = gecitkaleConsultationContent[lang] ?? gecitkaleConsultationContent.en;

  return <GecitkaleConsultationPageContent content={content} nonce={nonce} caseStudies={caseStudies} />
}
