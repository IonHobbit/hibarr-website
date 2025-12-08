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


	const data = await fetchSanityData<ConsultationPageType>(`*[_type == "consultationPage" && language == $lang][0]`, { lang }, { cache: 'no-store' });
	const formTitle = await translate('Book a Free Consultation');


	const [firstName, lastName, email, phoneNumber] = await translateBatch([
		'First Name',
		'Last Name',
		'Email Address',
		'Phone Number'
	]);

	const [interestReasonHeader, investmentTimelineHeader] = await translateBatch([
		'What made you interested in this opportunity today?',
		'How soon are you looking to invest?'
	]);

	const interestReasonLabels = await translateBatch([
		'Pension capital not growing',
		'Inflation protection',
		'Rental income',
		'Diversifying outside the EU',
		'Attractive pricing',
		'Other'
	]);

	const investmentTimelineLabels = await translateBatch([
		'As soon as possible',
		'Within 3 months',
		'Within 6–12 months',
		'I\'m still researching'
	]);

	const [submitButton, otherPlaceholder] = await translateBatch([
		'Schedule Consultation',
		'Please specify'
	]);

	const form = {
		firstName: firstName.text,
		lastName: lastName.text,
		email: email.text,
		phoneNumber: phoneNumber.text,
	}

	const headers = {
		interestReason: interestReasonHeader.text,
		investmentTimeline: investmentTimelineHeader.text,
	}

	const options = {
		interestReasons: [
			{ label: interestReasonLabels[0].text, value: 'pension_capital' },
			{ label: interestReasonLabels[1].text, value: 'inflation_protection' },
			{ label: interestReasonLabels[2].text, value: 'rental_income' },
			{ label: interestReasonLabels[3].text, value: 'diversifying_eu' },
			{ label: interestReasonLabels[4].text, value: 'attractive_pricing' },
			{ label: interestReasonLabels[5].text, value: 'other' },
		],
		investmentTimelines: [
			{ label: investmentTimelineLabels[0].text, value: 'asap' },
			{ label: investmentTimelineLabels[1].text, value: '3_months' },
			{ label: investmentTimelineLabels[2].text, value: '6_12_months' },
			{ label: investmentTimelineLabels[3].text, value: 'researching' },
		],
	}

	const placeholders = {
		interestReasonOther: otherPlaceholder.text,
	}

	const buttons = {
		submitButton: submitButton.text,
	}

	const translations = {
		formTitle: formTitle.text,
		form,
		headers,
		options,
		placeholders,
		buttons,
	}

	return (
		<section className="relative grid place-items-center min-h-screen bg-[url('https://res.cloudinary.com/hibarr/image/upload/v1765222618/16-min_jqxljs.png')] bg-cover bg-center bg-no-repeat">
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
						<div className="flex flex-col gap-4">
							{data?.offerInformation?.items?.map((offering, index) => (
								<ul key={index} role="list" className="flex flex-col gap-2 list-disc pl-4">
									<li className="text-base font-medium text-primary-foreground">{offering.title}</li>
								</ul>
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
				<div className="relative z-10 w-full flex justify-center items-center px-4 py-12">
					<SqueezeConsultationForm translations={translations} />
				</div>
			</div>
			<div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/70 to-primary/50"></div>
		</section>
	);
}
