
import Link from 'next/link'
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button'
import { Dictionary } from '@/lib/dictionary';

type LandingSectionProps = {
  dictionary: Dictionary;
}

export default function LandingSection({ dictionary }: LandingSectionProps) {
  return (
    <section id='hero' className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 grid place-items-center place-content-center h-screen bg-gradient-to-b from-primary via-primary/80 to-transparent">
      <div className='absolute inset-0 w-full h-full -z-10'>
        <video src="https://vz-da4cd036-d13.b-cdn.net/15ac0674-e562-4448-9853-a4992db2b7ab/play_720p.mp4" autoPlay muted loop playsInline className='w-full h-full object-cover' />
      </div>

      <div className="max-w-2xl text-center flex flex-col gap-10 px-4">
        <div className='flex flex-col gap-2'>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-background">
            {dictionary.home.title}
          </h1>
          <p className="text-sm md:text-base text-background">
            {dictionary.home.subtitle}
          </p>
        </div>
        <div className='flex flex-wrap items-center justify-center gap-4'>
          {dictionary.home.buttons.map((button, index) => (
            <Button key={index} variant={index === 0 ? 'accent' : 'outline'} size="lg" asChild>
              <Link href={button.href} className='uppercase font-semibold'>
                {button.name}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <Link href="#about" className='absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 text-primary-foreground cursor-pointer'>
        <p className='text-md uppercase tracking-tight'>Scroll</p>
        <div className='flex flex-col items-center gap-1'>
          <Icon icon="iconamoon:mouse-thin" className='size-7' />
          <Icon icon="ph:arrow-down-thin" className='size-4' />
        </div>
        <p className='text-md uppercase'>Down</p>
      </Link>
    </section>
  )
}
