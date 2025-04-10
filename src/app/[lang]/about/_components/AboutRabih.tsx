import Link from "next/link";
import { Dictionary } from "@/lib/dictionary";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type AboutRabihProps = {
  dictionary: Dictionary;
}

export default function AboutRabih({ dictionary }: AboutRabihProps) {
  return (
    <section id='about-rabih' className='section md:h-[80vh]'>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 h-full">
        <div className="relative w-full h-[60vh] md:h-full">
          <Image src="/images/rabih.jpg" alt="Rabih" fill className='object-cover' />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-bold">{dictionary.about.aboutRabih.title}</h3>
            <p className="text-muted-foreground">{dictionary.home.meetRabih.subTitle}</p>
          </div>
          <p className="text-muted-foreground">{dictionary.home.meetRabih.paragraph1}</p>
          <p className="text-muted-foreground">{dictionary.home.meetRabih.paragraph2}</p>
          <Button variant="accent" className='w-max' asChild>
            <Link href={dictionary.about.aboutRabih.cta.href}>
              {dictionary.about.aboutRabih.cta.text}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
