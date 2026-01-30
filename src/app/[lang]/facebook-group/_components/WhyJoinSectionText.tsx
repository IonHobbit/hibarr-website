import { translate, translateBatch } from "@/lib/translation"

export default async function WhyJoinSectionText() {
  const title = await translate('Why Join?')
  const subtitle = await translate('Discover the exclusive benefits that make our community the #1 choice for North Cyprus investment opportunities')

  const benefits = [
    "The Ultimate Guide to North Cyprus Investment Opportunities - Normally 4.99 euros. Yours for free, instantly after joining.",
    "Exclusive Investment Deals - Off market listings and offers sent to you three days before public release.",
    "Expert Trainings - Learn about relocation, tax strategies, legal residency & profitable investments.",
    "Insider Market Updates - Get notified of important legal changes and market shifts.",
    "Private Insights - Tips and advice we don't publish anywhere else.",
    "Elite Networking - Connect with high-net-worth investors and real buyers.",
    "Real Stories & Investor Tips - Hear directly from members who've successfully relocated or invested."
  ]

  const translated = await translateBatch(benefits);

  return (
    <section className="py-8 bg-white/10 backdrop-blur-sm rounded-2xl my-8 w-full">
      <div className="px-6 md:px-8 w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {title.text}
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {subtitle.text}
          </p>
        </div>

        <div className="space-y-4">
          {translated.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/30 transition-all duration-300"
            >
              <p className="text-primary-foreground text-lg leading-relaxed">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 