import { Button } from '@/components/ui/button'
import Image from 'next/image'
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
            <Image
              src="https://res.cloudinary.com/hibarr/image/upload/about-team-meeting-boardroom_xsrpol"
              alt="Hibarr team meeting in a boardroom, discussing company vision"
              fill
              sizes='100%'
              className='object-cover'
            />
          </div>
          <h2 className="text-3xl md:text-4xl">
            {data?.vision?.title}
          </h2>
          <p className="md:text-lg">
            {data?.vision?.content}
          </p>
          <Button href={data?.CTA?.url || ''} addLocaleToHref variant="accent" size="lg" className='w-max'>
            {data?.CTA?.label}
          </Button>
        </div>
        <div className="flex flex-col gap-4 order-1 md:order-2">
          <h2 className="text-3xl md:text-4xl">
            {data?.mission?.title}
          </h2>
          <p className="md:text-lg">
            {data?.mission?.content}
          </p>
          <div className='relative w-full h-96 rounded-lg overflow-hidden'>
            <Image
              src="https://res.cloudinary.com/hibarr/image/upload/about-team-collaboration-analytics_hvhjrh"
              alt="Team collaborating while reviewing analytics dashboards"
              fill
              sizes='100%'
              className='object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
