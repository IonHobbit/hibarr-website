import WaveReveal from '@/components/animata/text/wave-reveal';
import { Locale } from '@/lib/i18n-config';
import { client } from '@/lib/sanity/client';
import { cn } from '@/lib/utils';
import { PropertyKind } from '@/types/sanity.types';
import Image from 'next/image';

export default async function FindrPage({ params }: { params: Promise<{ lang: Locale, type: string }> }) {
  const { type } = await params;

  const data = await client.fetch<{ images: string[] } & PropertyKind>(`*[_type == "propertyKind" && slug.current == $type][0]{
    ...,
    "images": images[].asset->url,
  }`, { type })

  return (
    <div className='mt-18 section px-4 gap-4'>
      <div className="flex flex-col gap-2">
        <WaveReveal
          duration="1000ms"
          className="items-start justify-start font-bold text-xl sm:text-2xl md:text-6xl"
          text={data.name || ''}
          direction="up"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* <PortableText value={data.description || []} /> */}
        <div className={"relative rounded-lg overflow-hidden h-96 col-span-2"}>
          <Image src={data.images?.[0] || ''} alt={data.name || ''} fill sizes='100%' className='object-cover absolute rounded-lg' />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {data.images.slice(1).map((image, index) => {
          const rowIndex = Math.floor(index / 2);
          const isEvenRow = rowIndex % 2 === 0;
          const isFirstInRow = index % 2 === 0;
          return (
            <div
              className={cn(
                "relative rounded-lg overflow-hidden h-96",
                isEvenRow
                  ? (isFirstInRow ? "md:col-span-2" : "md:col-span-1")
                  : (isFirstInRow ? "md:col-span-1" : "md:col-span-2")
              )}
              key={index}
            >
              <Image src={image} alt={data.name || ''} fill sizes='100%' className='object-cover absolute rounded-lg' />
            </div>
          );
        })}
      </div>
    </div>
  )
}
