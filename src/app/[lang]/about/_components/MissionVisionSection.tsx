import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { AboutPage } from '@/types/sanity.types';

type MissionVisionSectionProps = {
  data: AboutPage['missionVisionSection'];
}

export default function MissionVisionSection({ data }: MissionVisionSectionProps) {
  return (
    <section id='mission-vision' className="section">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-4 order-2 md:order-1">
          <div className='relative w-full h-96 rounded-lg overflow-hidden'>
            <Image src="/images/about/vision.png" alt="About Vision" fill sizes='100%' className='object-cover' />
          </div>
          <h3 className="text-3xl md:text-4xl">
            {data?.vision?.title}
          </h3>
          <p className="md:text-lg">
            {data?.vision?.content}
          </p>
          <Button variant="accent" size="lg" className='w-max' asChild>
            <Link href={data?.CTA?.url ?? ''}>
              {data?.CTA?.label}
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-4 order-1 md:order-2">
          <h3 className="text-3xl md:text-4xl">
            {data?.mission?.title}
          </h3>
          <p className="md:text-lg">
            {data?.mission?.content}
          </p>
          <div className='relative w-full h-96 rounded-lg overflow-hidden'>
            <Image src="/images/about/mission.png" alt="About Mission" fill sizes='100%' className='object-cover' />
          </div>
        </div>
      </div>
    </section>
  )
}
