import Image from "next/image";
import { AboutPage } from "@/types/sanity.types";

type AboutHostSectionProps = {
  data: AboutPage['aboutRabihSection'];
}

export default function AboutHostSection({ data }: AboutHostSectionProps) {
  return (
    <section id='about-rabih' className='section md:h-[70vh]'>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-10 h-full">
        <div className="flex flex-col gap-6 md:col-span-2">
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-bold">Host: {data?.title}</h3>
            <p className="text-muted-foreground">{data?.subTitle}</p>
          </div>
          <p className="text-muted-foreground">{data?.paragraph1}</p>
          <p className="text-muted-foreground">{data?.paragraph2}</p>
        </div>
        <div className="relative w-full md:rounded-full overflow-hidden aspect-square order-first md:order-last">
          <Image src="/images/rabih.jpg" alt="Rabih" fill className='object-cover' />
        </div>
      </div>
    </section>
  )
}
