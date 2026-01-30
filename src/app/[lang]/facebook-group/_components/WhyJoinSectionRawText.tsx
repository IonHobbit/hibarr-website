import { translate, translateBatch } from "@/lib/translation"

export default async function WhyJoinSectionRawText() {
  const title = await translate('Why Join?')

  const benefits = [
    "The Ultimate Guide to North Cyprus Investment Opportunities - Normally 4.99 euros. Yours for free, instantly after joining.",
    "Exclusive Investment Deals - Off market listings and offers sent to you three days before public release.",
    // "Expert Trainings - Learn about relocation, tax strategies, legal residency & profitable investments.",
    "Insider Market Updates - Get notified of important legal changes and market shifts.",
    "Private Insights - Tips and advice we don't publish anywhere else.",
    "Elite Networking - Connect with high-net-worth investors and real buyers.",
    "Real Stories & Investor Tips - Hear directly from members who've successfully relocated or invested."
  ]

  const translated = await translateBatch(benefits);

  return (
    <section className="rounded-2xl my-8 w-full">
      <div className="w-full">
        <div className="text-left mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {title.text}
          </h2>
          {/* <p className="text-sm text-primary-foreground/80 max-w-2xl mx-auto">
            {subtitle.text}
          </p> */}
        </div>

        <ul className="space-y-4">
          {translated.map((benefit, index) => (
            <li
              key={index}
              className="list-disc list-outside text-primary-foreground text-lg leading-relaxed"
            >
              {benefit.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
} 