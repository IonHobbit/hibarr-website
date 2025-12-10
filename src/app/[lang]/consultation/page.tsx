import React, { Fragment } from 'react';
import { seoH1s } from '@/lib/seo-h1';
import Video from '@/components/Video';
import { Locale } from '@/lib/i18n-config';
import { Metadata } from 'next';
import { Icon } from '@/components/icons';
import FAQAccordion from '../_components/FAQAccordion';
// import CalendlyEmbed from '@/components/CalendlyEmbed';
import { fetchRawSanityData, fetchSanityData } from '@/lib/third-party/sanity.client';
import { ConsultationPage as ConsultationPageType, HomePage, SeoMetaFields } from '@/types/sanity.types';
import ConsultationForm from './_components/ConsultationForm';
import { generateSEOMetadata } from '@/lib/utils';
import ConsultationProcessSection from '../(landing)/_components/ConsultationProcessSection';
import { translate, translateBatch } from '@/lib/translation';
import { interestedInOptions, messageOptions, periodOptions } from '@/lib/options';
import { headers as nextHeaders } from 'next/headers';

import { seoTitles } from '@/lib/seo-titles';
import { seoDescriptions } from '@/data/seo-descriptions';

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;

  const { seo } = await fetchRawSanityData<ConsultationPageType>(`*[_type == "consultationPage" && language == $lang][0]`, { lang });

  return generateSEOMetadata({ ...seo, metaTitle: seoTitles[lang].consultation, metaDescription: seoDescriptions[lang].consultation } as SeoMetaFields)
}

export default async function ConsultationPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const headerList = await nextHeaders();
  const nonce = headerList.get('x-nonce') || undefined;
  
  const { lang } = await props.params;

  const data = await fetchSanityData<ConsultationPageType>(`*[_type == "consultationPage" && language == $lang][0]`, { lang }, { cache: 'no-store' });
  const consultationProcessSection = await fetchSanityData<HomePage['consultationProcessSection']>(`*[_type == "homePage" && language == $lang][0].consultationProcessSection`, { lang }, { cache: 'no-store' });

  const frequentlyAskedQuestions = await translate('Frequently Asked Questions');

  const [nameTitle, registedTitle, registedDescription] = await translateBatch(['My name is ...', 'Thank you for your interest in our services!', 'We will schedule a consultation with you soon.']);
  const [myPreferredLanguage, currentlyLivingIn] = await translateBatch(['My preferred language is ...', 'I am currently living in ...']);
  const [nextButton, backButton, submitButton] = await translateBatch(['Next', 'Back', 'Submit']);
  const [interestedIn, planningToBuy, budget, isThereAnyQuestions] = await translateBatch(['I am interested in ...', 'I am planning to buy ...', 'My ideal budget range is ...', 'Is there anything else you would like us to know before our meeting?']);
  const translatedInterestedInOptions = await Promise.all(interestedInOptions.map(async (option) => ({ ...option, label: (await translate(option.label)).text })));
  const translatedPeriodOptions = await Promise.all(periodOptions.map(async (option) => ({ ...option, label: (await translate(option.label)).text })));
  const translatedMessageOptions = await translateBatch(messageOptions);
  const [firstName, lastName, email, phoneNumber] = await translateBatch(['First Name', 'Last Name', 'Email Address', 'Phone Number']);
  const [selectLanguagePlaceholder, questionPlaceholder] = await translateBatch(['Select language', 'For example: I am looking for a property in Istanbul, I am a first time buyer, etc.']);

  const showMessage = await translate('Yes');

  const form = {
    firstName: firstName.text,
    lastName: lastName.text,
    email: email.text,
    phoneNumber: phoneNumber.text,
  }

  const headers = {
    nameTitle: nameTitle.text,
    myPreferredLanguage: myPreferredLanguage.text,
    currentlyLivingIn: currentlyLivingIn.text,
    interestedIn: interestedIn.text,
    planningToBuy: planningToBuy.text,
    budget: budget.text,
    isThereAnyQuestions: isThereAnyQuestions.text,
  }

  const buttons = {
    nextButton: nextButton.text,
    backButton: backButton.text,
    submitButton: submitButton.text,
  }

  const options = {
    interestedIn: translatedInterestedInOptions,
    period: translatedPeriodOptions,
    message: translatedMessageOptions.map(option => option.text),
  }

  const placeholders = {
    selectLanguage: selectLanguagePlaceholder.text,
    question: questionPlaceholder.text,
  }

  const registered = {
    title: registedTitle.text,
    description: registedDescription.text,
  }

  const translations = {
    form,
    headers,
    buttons,
    options,
    placeholders,
    registered,
  }

  return (
    <Fragment>
      <section id='root' className="relative grid place-items-center place-content-center min-h-screen bg-[url('https://res.cloudinary.com/hibarr/image/upload/about-team-group-photo-exterior_ydobgc')] bg-cover bg-center bg-no-repeat">
        <div className="section grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 z-10 mt-16 md:mt-0">
          <div className='flex flex-col gap-6'>
            <h1 className="text-5xl md:text-6xl text-primary-foreground">
              {seoH1s.consultation[lang]}
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
                    <Icon icon={offering.icon || ''} className="text-primary-foreground text-5xl md:text-5xl text-center" />
                    <p className="text-base text-primary-foreground text-center">{offering.title}</p>
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
            <ConsultationForm translations={translations} showMessage={showMessage.text} nonce={nonce} />
            {/* <CalendlyEmbed url="https://calendly.com/rabihrabea/appointmentbooking?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=D6A319" /> */}
          </div>
        </div>
        <div className='absolute inset-0 bg-gradient-to-b from-primary via-primary/70 to-transparent'></div>
      </section>
      <ConsultationProcessSection data={consultationProcessSection} />
      <section className="section">
        <div className='w-full h-full'>
          <Video
            autoPlay
            muted
            loop
            hls
            src="https://vz-da4cd036-d13.b-cdn.net/50e75c2c-6c87-432d-bd6c-e7078c3e580f/playlist.m3u8"
            fallbackMp4="https://vz-da4cd036-d13.b-cdn.net/50e75c2c-6c87-432d-bd6c-e7078c3e580f/play_720p.mp4"
            containerClassName="relative group w-full aspect-video rounded-lg overflow-hidden bg-black"
            videoClassName="w-full h-full object-cover"
          />
        </div>
      </section>
      <section id="faqs" className="section">
        <div className="bg-primary rounded-lg py-6 px-10 flex flex-col gap-6">
          <h2 className="text-2xl md:text-4xl text-primary-foreground" data-token={frequentlyAskedQuestions.token}>{frequentlyAskedQuestions.text}</h2>
          <FAQAccordion lang={lang} />
        </div>
      </section>
    </Fragment>
  );
} 