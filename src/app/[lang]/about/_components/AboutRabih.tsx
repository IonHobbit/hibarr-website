import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AboutPage } from "@/types/sanity.types";

type AboutRabihProps = {
  data: AboutPage['aboutRabihSection'];
}

export default function AboutRabih({ data }: AboutRabihProps) {
  return (
    <section id='about-rabih' className='section md:h-[80vh]'>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 h-full">
        <div className="relative w-full h-[60vh] md:h-full">
          <Image src="/images/rabih.jpg" alt="Rabih" fill className='object-cover' />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl md:text-4xl">{data?.title}</h3>
            <p className="text-muted-foreground md:text-lg">{data?.subTitle}</p>
          </div>
          <p className="text-muted-foreground md:text-lg">{data?.paragraph1}</p>
          <p className="text-muted-foreground md:text-lg">{data?.paragraph2}</p>
          <Button href={data?.cta?.url ?? ''} addLocaleToHref variant="accent" size="lg" className='w-max'>
            {data?.cta?.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
