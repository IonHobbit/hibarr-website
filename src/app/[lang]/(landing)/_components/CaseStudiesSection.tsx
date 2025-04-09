import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dictionary } from "@/lib/dictionary";

type CaseStudiesSectionProps = {
  dictionary: Dictionary;
}

export default function CaseStudiesSection({ dictionary }: CaseStudiesSectionProps) {
  const caseStudies = [
    {
      title: "Case Study 1",
      image: "https://vz-da4cd036-d13.b-cdn.net/17736d3c-9ed0-441a-8a24-f6f9d5ccffa3/thumbnail_9ca5f86b.jpg",
      video: "https://vz-da4cd036-d13.b-cdn.net/17736d3c-9ed0-441a-8a24-f6f9d5ccffa3/playlist.m3u8"
    },
    {
      title: "Case Study 2",
      image: "https://vz-da4cd036-d13.b-cdn.net/17736d3c-9ed0-441a-8a24-f6f9d5ccffa3/thumbnail_9ca5f86b.jpg",
      video: "https://vz-da4cd036-d13.b-cdn.net/17736d3c-9ed0-441a-8a24-f6f9d5ccffa3/playlist.m3u8"
    },
    {
      title: "Case Study 3",
      image: "https://vz-da4cd036-d13.b-cdn.net/17736d3c-9ed0-441a-8a24-f6f9d5ccffa3/thumbnail_9ca5f86b.jpg",
      video: "https://vz-da4cd036-d13.b-cdn.net/17736d3c-9ed0-441a-8a24-f6f9d5ccffa3/playlist.m3u8"
    }
  ]
  return (
    <section id='case-studies' className='section min-h-[50vh]'>
      <div className="max-w-screen-md mx-auto flex flex-col gap-2">
        <h3 className="text-3xl font-bold text-center">{dictionary.home.caseStudies.title}</h3>
        <p className="text-center text-muted-foreground">{dictionary.home.caseStudies.description}</p>
      </div>
      <div className="max-w-screen-md mx-auto w-full overflow-hidden md:overflow-visible">
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {caseStudies.map((caseStudy, index) => (
              <CarouselItem key={index}>
                <video src={caseStudy.video} poster={caseStudy.image} playsInline className='w-full h-full object-cover' />
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
