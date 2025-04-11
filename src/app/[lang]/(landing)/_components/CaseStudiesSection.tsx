import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Video from "@/components/Video";
import { client } from "@/lib/sanity/client";
import { CaseStudy, HomePage } from "@/lib/sanity/sanity.types";
import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";


type CaseStudiesSectionProps = {
  data: HomePage['caseStudiesSection'];
}

export default async function CaseStudiesSection({ data }: CaseStudiesSectionProps) {
  const caseStudies = await client.fetch<CaseStudy[]>(`*[_type == "caseStudy"]`);


  const imageUrlFor = (source: SanityImageSource) => {
    return createImageUrlBuilder(client).image(source);
  }

  return (
    <section id='case-studies' className='section md:min-h-[50vh]'>
      <div className="max-w-screen-md mx-auto flex flex-col gap-2">
        <h3 className="text-3xl font-bold text-center">{data?.title}</h3>
        <p className="text-center text-muted-foreground">{data?.description}</p>
      </div>
      <div className="max-w-screen-md mx-auto w-full overflow-hidden md:overflow-visible">
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {caseStudies.map((caseStudy, index) => (
              <CarouselItem key={index}>
                <Video src={caseStudy.videoUrl ?? ''} poster={imageUrlFor(caseStudy.thumbnail as SanityImageSource).url()} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='border-none translate-x-16 md:translate-x-0 bg-accent hover:bg-accent/80 cursor-pointer disabled:opacity-0' />
          <CarouselNext className='border-none -translate-x-16 md:translate-x-0 bg-accent hover:bg-accent/80 cursor-pointer disabled:opacity-0' />
        </Carousel>
      </div>
    </section>
  )
}
