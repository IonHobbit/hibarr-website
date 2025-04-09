import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Dictionary } from '@/lib/dictionary'

type MissionVisionSectionProps = {
  dictionary: Dictionary;
}

export default function MissionVisionSection({ dictionary }: MissionVisionSectionProps) {
  return (
    <section id='mission-vision' className="section">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4 order-2 md:order-1">
          <div className='relative w-full h-96 rounded-lg overflow-hidden'>
            <Image src="/images/about/vision.png" alt="About Vision" fill sizes='100%' className='object-cover' />
          </div>
          <h3 className="text-3xl">
            {dictionary.about.vision.title}
          </h3>
          <p className="">
            &quot;To guide our clients through the complexities of the real estate journey with expertise, integrity, and personalized service, providing comprehensive support at every stage – from initial consultation to closing and beyond. We empower them to achieve their real estate goals and build lasting foundations, leveraging our in-depth market knowledge, skilled negotiation, and unwavering commitment to ensure a smooth and successful experience.&quot;
          </p>
          <Button variant="accent" className='w-max' asChild>
            <Link href={dictionary.about.cta.href}>
              {dictionary.about.cta.text}
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-4 order-1 md:order-2">
          <h3 className="text-3xl">
            {dictionary.about.mission.title}
          </h3>
          <p className="">
            &quot;To guide our clients through the complexities of the real estate journey with expertise, integrity, and personalized service, providing comprehensive support at every stage – from initial consultation to closing and beyond. We empower them to achieve their real estate goals and build lasting foundations, leveraging our in-depth market knowledge, skilled negotiation, and unwavering&quot;
          </p>
          <div className='relative w-full h-96 rounded-lg overflow-hidden'>
            <Image src="/images/about/mission.png" alt="About Mission" fill sizes='100%' className='object-cover' />
          </div>
        </div>
      </div>
    </section>
  )
}
