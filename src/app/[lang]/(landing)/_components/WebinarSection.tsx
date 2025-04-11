import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function WebinarSection() {
  return (
    <section id='free-webinar' className='bg-gray-100 '>
      <div className="section md:min-h-[50vh]">
        <div className="flex flex-col items-center gap-1.5">
          <h3 className='text-2xl md:text-4xl text-center md:text-left'>Unlock Exclusive North Cyprus Real Estate Opportunities</h3>
          <p className='text-sm md:text-lg text-center md:text-left'>Join Our Free Webinar today</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-full grow">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <h3 className='text-2xl md:text-3xl'>What you will learn</h3>
              <p className='text-sm md:text-base'>Join our webinar to gain exclusive insights into real estate investment in North Cyprus, including market updates, actionable strategies, and expert-backed advice. Learn about high rental yields, tax benefits, affordable property opportunities, and network with like-minded investors. With flexible payment plans and no credit checks, investing in North Cyprus has never been easier. Don&apos;t miss this chance to unlock your investment potential!</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className='text-2xl md:text-3xl'>Benefits of joining our webinar</h3>
              <p className='text-sm md:text-base'>Joining our webinar offers you direct access to market insights, expert strategies, and actionable techniques to boost your results. Whether you&apos;re just starting or an experienced professional, you&apos;ll find valuable knowledge tailored to your level. The webinar provides opportunities to network with other professionals, learn from industry leaders, and hear real-world experiences. Plus, you&apos;ll gain all this at no cost price, without the need to search for information elsewhere.</p>
            </div>
            <Button size="lg" variant="accent" className='w-full md:w-max font-semibold'>Join Here</Button>
          </div>
          <div className="relative w-full h-80 md:h-full">
            <Image src="/images/freebie-image.webp" alt="Webinar" fill sizes="100%" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
