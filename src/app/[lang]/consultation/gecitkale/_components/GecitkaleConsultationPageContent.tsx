'use client'

import { GecitkaleConsultationContent } from '@/lib/content/gecitkale-consultation'
import { useFeatureFlagVariantKey } from 'posthog-js/react';
import { Locale } from '@/lib/i18n-config';
import Image from 'next/image';
import SqueezeConsultationForm from './SqueezeConsultationForm';
import { Icon } from '@/components/icons';
import CieloVistaImageSlider from './CieloVistaImageSlider';
import CaseStudies from '@/app/[lang]/(landing)/_components/CaseStudies';
import { CaseStudy } from '@/types/sanity.types';

type GecitkaleConsultationPageContentProps = {
	content: GecitkaleConsultationContent[Locale]
	nonce?: string
	caseStudies: CaseStudy[]
}

export enum PageContentVariant {
	CONTROL = 'control',
	PLAIN = 'plain-form',
}

export default function GecitkaleConsultationPageContent({ content, nonce, caseStudies }: GecitkaleConsultationPageContentProps) {

	const pageVariantKey = useFeatureFlagVariantKey('gecitkale-consultation');

	console.log(pageVariantKey);	

	if (pageVariantKey === PageContentVariant.PLAIN) {
		return (
			<section className="relative grid place-items-start min-h-[95dvh] overflow-hidden bg-[url('https://res.cloudinary.com/hibarr/image/upload/v1765222618/16-min_jqxljs.png')] bg-cover bg-bottom bg-no-repeat">
				<div className='min-h-[75dvh] section section !max-w-screen-2xl z-10 lg:mt-10'>
					<div className="grid grid-cols-1 gap-10">
						<Image src="/logos/logo.png" alt="Hibarr Estates Logo" loading='eager' className="object-contain h-auto mb-4 mx-auto" width={110} height={30} />
						<div className='relative w-full h-max max-w-xl mx-auto rounded-lg overflow-hidden bg-secondary grid place-items-center'>
							<SqueezeConsultationForm nonce={nonce} />
						</div>
					</div>
				</div>
				<div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/30 to-primary/10"></div>
			</section>
		)
	}

	return (
		<section className='flex flex-col gap-10'>
			<section className="relative grid place-items-start min-h-[95dvh] pb-10 overflow-hidden bg-[url('https://res.cloudinary.com/hibarr/image/upload/v1765222618/16-min_jqxljs.png')] bg-cover bg-bottom bg-no-repeat">
				<div className='min-h-[75dvh] section section !max-w-screen-2xl z-10 lg:mt-10'>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
						<div className='flex flex-col gap-6'>
							<Image src="/logos/logo.png" alt="Hibarr Estates Logo" loading='eager' className="object-contain h-auto mb-4 mx-auto lg:mx-0" width={110} height={30} />
							<h1 className="text-4xl lg:text-5xl xl:text-6xl text-primary-foreground text-center lg:text-left">
								{(content.title)}
							</h1>
							<p className="text-primary-foreground text-center lg:text-left text-xl lg:text-3xl">
								{(content.subtitle)}
							</p>
							<div className="hidden md:flex flex-col gap-6 max-w-xl lg:max-w-none mx-auto lg:mx-0">
								<div className="hidden md:flex flex-col p-6 bg-white/10 rounded-lg border border-white/10 backdrop-blur-lg">
									<ul className="list-disc list-inside flex flex-col gap-4">
										{(content.features).map((feature, index) => (
											<li key={index} className="text-primary-foreground text-2xl">
												{feature}
											</li>
										))}
									</ul>
								</div>
								{/* <CieloVistaImageSlider /> */}
							</div>
						</div>
						<div className='relative w-full h-max max-w-xl mx-auto rounded-lg overflow-hidden bg-secondary grid place-items-center'>
							<SqueezeConsultationForm nonce={nonce} />
						</div>
					</div>
				</div>
				<div className='section !max-w-screen-2xl z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden'>
					<CieloVistaImageSlider />
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
					<div className="section !max-w-screen-2xl mt-auto grid grid-cols-1 pb-0 md:pb-10 place-items-center lg:grid-cols-2 z-10">
						<div className='order-2 md:order-1 md:translate-y-20'>
							<Image src="https://res.cloudinary.com/hibarr/image/upload/v1766075868/rabih_gq2nko_tbgelk.webp" alt={content.imageAlt.rabih} width={450} height={450} />
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
				<div className='bg-gray-100 w-full z-10 overflow-hidden py-10 md:py-20'>
					<div className="max-w-screen-md mx-auto	 flex flex-col gap-2 mb-4">
						<h3 className="text-3xl md:text-4xl font-bold text-center">{content.caseStudiesTitle}</h3>
						<p className="text-center md:text-lg text-muted-foreground">{content.caseStudiesDescription}</p>
					</div>
					<div className="max-w-screen-md mx-auto w-full overflow-hiddens md:overflow-visible">
						<CaseStudies caseStudies={caseStudies} />
					</div>
				</div>

				<div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/30 to-primary/10"></div>
			</section>
		</section>
	)
}