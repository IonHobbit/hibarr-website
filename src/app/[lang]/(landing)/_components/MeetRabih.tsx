import Link from "next/link";
import { Dictionary } from "@/lib/dictionary";
import { Button } from "@/components/ui/button";
import { HomePage } from "@/lib/sanity/sanity.types";

type MeetRabihProps = {
  data: HomePage['meetRabihSection'];
}

export default function MeetRabih({ data }: MeetRabihProps) {
  return (
    <section id='meet-rabih' className='section min-h-[50vh]'>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-bold">{data?.title}</h3>
            <p className="text-muted-foreground">{data?.subTitle}</p>
          </div>
          <p className="text-muted-foreground">{data?.paragraph1}</p>
          <p className="text-muted-foreground">{data?.paragraph2}</p>
          <Button variant="accent" className='w-max' asChild>
            <Link href={data?.CTA?.url ?? ''}>
              {data?.CTA?.label}
            </Link>
          </Button>
        </div>
        <video src="https://vz-da4cd036-d13.b-cdn.net/56b164f5-3dcc-4a0b-8640-7310d9110a4f/play_720p.mp4"
          poster="/images/about-rabih-thumbnail.png"
          playsInline controls className='w-full object-cover rounded-lg aspect-video' />
        {/* <div className="relative w-full h-[450px]">
          <Image src="/images/rabih.jpg" alt="Rabih" fill className='object-cover object-top' />
        </div> */}
      </div>
    </section>
  )
}
