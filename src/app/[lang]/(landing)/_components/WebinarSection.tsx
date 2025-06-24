import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { translate } from '@/lib/translation'

export default async function WebinarSection() {
  const title = await translate('Unlock Exclusive North Cyprus Opportunities');
  const subText = await translate('Join Our Free Webinar today');

  const subTitle1 = await translate('What you will learn');
  const subTitle2 = await translate('Benefits of joining our webinar');

  const content1 = await translate('Join our webinar to gain exclusive insights into investment in North Cyprus, including market updates, actionable strategies, and expert-backed advice. Learn about high rental yields, tax benefits, affordable property opportunities, and network with like-minded investors. With flexible payment plans and no credit checks, investing in North Cyprus has never been easier. Don&apos;t miss this chance to unlock your investment potential!');
  const content2 = await translate('Joining our webinar offers you direct access to market insights, expert strategies, and actionable techniques to boost your results. Whether you&apos;re just starting or an experienced professional, you&apos;ll find valuable knowledge tailored to your level. The webinar provides opportunities to network with other professionals, learn from industry leaders, and hear real-world experiences. Plus, you&apos;ll gain all this at no cost price, without the need to search for information elsewhere.');

  const buttonText = await translate('Join Here');

  return (
    <section id='free-webinar' className='bg-gray-50/60'>
      <div className="section md:min-h-[50vh]">
        <div className="flex flex-col items-center gap-1.5">
          <h3 className='text-2xl md:text-4xl text-center md:text-left' data-token={title.token}>{title.text}</h3>
          <p className='text-sm md:text-xl text-center md:text-left' data-token={subText.token}>{subText.text}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-full grow">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <h3 className='text-2xl md:text-3xl' data-token={subTitle1.token}>{subTitle1.text}</h3>
              <p className='text-sm md:text-base' data-token={content1.token}>{content1.text}</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className='text-2xl md:text-3xl' data-token={subTitle2.token}>{subTitle2.text}</h3>
              <p className='text-sm md:text-base' data-token={content2.token}>{content2.text}</p>
            </div>
            <Button size="lg" variant="accent" className='w-full md:w-max font-semibold' asChild>
              <Link href="/webinar" data-token={buttonText.token}>{buttonText.text}</Link>
            </Button>
          </div>
          <div className="relative w-full h-80 md:h-full">
            <Image src="/images/freebie-image.webp" alt="Webinar" fill sizes="100%" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
