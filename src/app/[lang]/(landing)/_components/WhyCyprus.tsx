import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomePage } from "@/types/sanity.types";
import Video from "@/components/Video";

type WhyCyprusProps = {
  data: HomePage['whyCyprusSection'];
  link?: string;
}

export default function WhyCyprus({ data, link }: WhyCyprusProps) {
  return (
    <section id='why-cyprus' className='section'>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10">
        <div>
          <Video
            src="https://vz-da4cd036-d13.b-cdn.net/31c737df-ff40-48a5-a2ab-e8fc0a829df5/play_720p.mp4"
            poster="/images/about-north-cyprus.jpg"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-3xl">{data?.title}</h3>
          <div className="flex flex-col gap-4">
            {data?.reasons?.map((reason) => (
              <div key={reason.title} className="flex gap-2">
                <p className="text-sm font-semibold">{reason.title}: <span className="font-normal">{reason.description}</span></p>
              </div>
            ))}
          </div>
          <Button className="w-max" variant="accent" size="lg" asChild>
            <Link href={link ?? data?.CTA?.url ?? ''}>{data?.CTA?.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
