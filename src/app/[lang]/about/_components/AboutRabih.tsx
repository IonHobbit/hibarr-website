import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AboutPage } from "@/types/sanity.types";

type AboutRabihProps = {
  data: AboutPage['aboutRabihSection'];
  enrichedContent?: { bio: string; expertise: string[]; achievements: string };
}

export default function AboutRabih({ data, enrichedContent }: AboutRabihProps) {
  const bio = enrichedContent?.bio || data?.paragraph1;
  const achievements = enrichedContent?.achievements || data?.paragraph2;

  return (
    <section id='about-rabih' className='section md:h-[80dvh]'>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 h-full">
        <div className="relative w-full h-[60dvh] md:h-full">
          <Image src="https://res.cloudinary.com/hibarr/image/upload/rabih_wfmpqv" alt="Rabih" fill className='object-cover' />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl">{data?.title}</h2>
            <p className="text-muted-foreground md:text-lg">{data?.subTitle}</p>
          </div>
          
          <div className="flex flex-col gap-4">
             <p className="text-muted-foreground md:text-lg">{bio}</p>
             
             {enrichedContent?.expertise && (
                 <div className="flex flex-wrap gap-2">
                     {enrichedContent.expertise.map(exp => (
                         <span key={exp} className="bg-muted px-3 py-1 rounded-full text-sm font-medium">{exp}</span>
                     ))}
                 </div>
             )}

             <p className="text-muted-foreground md:text-lg">{achievements}</p>
          </div>

          <Button href={data?.cta?.url || ''} addLocaleToHref variant="accent" size="lg" className='w-max'>
            {data?.cta?.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
