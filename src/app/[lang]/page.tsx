import { Fragment } from 'react';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const params = await props.params;

  const {
    lang
  } = params;

  const dictionary = await getDictionary(lang);

  return (
    <Fragment>
      <div className="relative grid place-items-center place-content-center h-screen bg-gradient-to-b from-primary via-primary/80 to-transparent">
        <div className='absolute inset-0 w-full h-full -z-10'>
          <video src="https://vz-da4cd036-d13.b-cdn.net/15ac0674-e562-4448-9853-a4992db2b7ab/play_720p.mp4" autoPlay muted loop playsInline className='w-full h-full object-cover' />
        </div>

        <div className="max-w-2xl text-center flex flex-col gap-10">
          <div className='flex flex-col gap-2'>
            <h1 className="text-6xl font-bold mb-4 text-background">
              {dictionary.home.title}
            </h1>
            <p className="text-md text-background">
              {dictionary.home.subtitle}
            </p>
          </div>
          <div className='flex items-center justify-center gap-4'>
            {dictionary.home.buttons.map((button, index) => (
              <Button key={index} variant={index === 0 ? 'accent' : 'outline'} size="lg" asChild>
                <Link href={button.href} className='uppercase font-semibold'>
                  {button.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Fragment >
  );
} 