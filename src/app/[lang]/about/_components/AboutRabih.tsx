import Link from "next/link";
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
            <h3 className="text-3xl font-bold">{data?.title}</h3>
            <p className="text-muted-foreground">{data?.subTitle}</p>
          </div>
          <p className="text-muted-foreground">{data?.paragraph1}</p>
          <p className="text-muted-foreground">{data?.paragraph2}</p>
          <Button variant="accent" className='w-max' asChild>
            <Link href={data?.cta?.url ?? ''}>
              {data?.cta?.label}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
