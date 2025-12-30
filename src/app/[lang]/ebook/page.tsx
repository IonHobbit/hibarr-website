import { Locale } from '@/lib/i18n-config'
import { getHreflangAlternates } from '@/lib/seo-metadata'
import { fetchSanityData } from '@/lib/third-party/sanity.client'
import { AboutPage, WebinarPage, Faq } from '@/types/sanity.types'
import { Metadata } from 'next'
import { Fragment } from 'react'
import FeaturedSection from '../_components/FeaturedSection'
import AboutHostSection from './_components/AboutHostSection'
import { generateSEOMetadata } from '@/lib/utils'
import ThreeDBook from '@/components/ThreeDBook'
import { Award, BookOpen, Quote, Star, Users } from 'lucide-react'
import FAQAccordion from '../_components/FAQAccordion'
import EbookSignupForm from './_components/EbookSignupForm'
import { translateBatch } from '@/lib/translation'
import { generateFAQSchema } from '@/lib/seo-schema'
import cloudinaryClient from '@/lib/third-party/cloudinary.client'


export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;

  // const { seo } = await client.fetch<WebinarPage>(`*[_type == "webinarPage" && language == $lang][0]`, { lang }, { cache: 'no-store' });

  return generateSEOMetadata(undefined, {
    title: 'Download the Ultimate Cyprus Investment Guide',
    alternates: getHreflangAlternates('/ebook', lang)
  })
}

type EbookPageProps = {
  params: Promise<{ lang: Locale }>;
};

export default async function EbookPage(
  props: EbookPageProps
) {
  const { lang } = await props.params;

  const [aboutPage, webinarPage, featuredLogos] = await Promise.all([
    fetchSanityData<AboutPage>(`*[_type == "aboutPage" && language == $lang][0]`, { lang }),
    fetchSanityData<WebinarPage>(`*[_type == "webinarPage" && language == $lang][0]`, { lang }),
    cloudinaryClient.fetchFiles('Website/Features'),
  ]);

  const [getTheUltimateCyprusInvestmentGuide, discoverTheInsiderSecrets, hiddenPropertyDeals, stepByStepBuyingProcess, taxLoopholes, boostIncome] = await translateBatch(['Get the Ultimate Cyprus Investment Guide', 'Discover the insider secrets top investors use to maximize profits in North Cyprus! This exclusive guide reveals:', 'Hidden property deals & how to access them before the public', 'Step-by-step buying process to avoid costly mistakes', 'Tax loopholes & financial strategies to keep more money in your pocket', 'How to legally pay less & boost income'])

  const [whatYoullLearn, provenStrategies, expertInsights, actionableTips, everythingYouNeed, whatOurReadersAreSaying] = await translateBatch(['What You\'ll Learn', 'Proven Strategies', 'Expert Insights', 'Actionable Tips', 'Everything you need to transform your business and achieve lasting success', 'What Our Readers Are Saying']);

  const [frequentlyAskedQuestions, downloads] = await translateBatch(['Frequently Asked Questions', '10,000+ Downloads'])
  const [stepByStepMethods, learnFromIndustryLeaders, practicalAdvice] = await translateBatch(['Step-by-step methods that have generated millions in revenue', 'Learn from industry leaders and successful entrepreneurs', 'Practical advice you can implement immediately'])

  const comments = await translateBatch([
    "This ebook completely transformed how I approach my business. The strategies are practical and the results speak for themselves.",
    "Finally, a guide that cuts through the noise. Clear, actionable, and incredibly valuable. Highly recommended!",
    "I've read countless business books, but this one stands out. The insights are fresh and immediately applicable."
  ])
  const roles = await translateBatch([
    "CEO, TechStart",
    "Marketing Director",
    "Entrepreneur"
  ])
  const [sarahJohnson, michaelChen, emmaDavis] = comments;
  const [ceoTechStart, marketingDirector, entrepreneur] = roles;

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: ceoTechStart.text,
      content: sarahJohnson.text,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: marketingDirector.text,
      content: michaelChen.text,
      avatar: "MC"
    },
    {
      name: "Emma Davis",
      role: entrepreneur.text,
      content: emmaDavis.text,
      avatar: "ED"
    }
  ]

  return (
    <Fragment>
      <div className="section my-28 grid lg:grid-cols-2 place-items-center gap-10">
        <div className="max-w-5xl flex flex-col gap-6 mt-10 md:mt-0">
          <div className='flex flex-col gap-2'>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              {getTheUltimateCyprusInvestmentGuide.text}
            </h1>
            <p className="text-sm md:text-base text-primary leading-relaxed">
              {discoverTheInsiderSecrets.text}
            </p>
            <ul className="list-disc list-inside text-primary">
              <li>{hiddenPropertyDeals.text}</li>
              <li>{stepByStepBuyingProcess.text}</li>
              <li>{taxLoopholes.text}</li>
              <li>{boostIncome.text}</li>
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-primary">{downloads.text}</span>
            </div>
          </div>

          <EbookSignupForm />
        </div>
        <ThreeDBook />
      </div>
      <FeaturedSection lang={lang} featuredLogos={featuredLogos.map(logo => logo.secure_url)} />
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{whatYoullLearn.text}</h2>
          <p className="text-gray-600 mb-12">{everythingYouNeed.text}</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8 text-primary" />,
                title: provenStrategies.text,
                description: stepByStepMethods.text
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: expertInsights.text,
                description: learnFromIndustryLeaders.text
              },
              {
                icon: <Award className="w-8 h-8 text-primary" />,
                title: actionableTips.text,
                description: practicalAdvice.text
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 flex flex-col items-center rounded-xl border border-gray-200">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{whatOurReadersAreSaying.text}</h2>
            <div className="flex justify-center items-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-600 ml-2">4.9/5 from 1,247 reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col">
                <Quote className="w-8 h-8 text-primary mb-4" />
                <p className="text-gray-700 mb-4 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <AboutHostSection data={aboutPage?.aboutRabihSection} statistics={webinarPage?.statisticsSection} />
      <section id="faqs" className="section">
        <div className="bg-primary rounded-lg py-6 px-10 flex flex-col gap-6">
          <h2 className="text-2xl md:text-4xl text-primary-foreground">{frequentlyAskedQuestions.text}</h2>
          <FAQAccordion lang={lang} />
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(
            (await fetchSanityData<Faq[]>(`*[_type == "faq" && language == $lang]`, { lang }, { cache: 'no-store' }))
              .map(f => ({ question: f.question || '', answer: f.answer || '' }))
          )),
        }}
      />
    </Fragment >
  )
}
