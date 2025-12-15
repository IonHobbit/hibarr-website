import { Button } from "@/components/ui/button";
import { HomePage } from "@/types/sanity.types";
import Video from "@/components/Video";

type WhyCyprusProps = {
  data: HomePage['whyCyprusSection'];
  link?: string;
  disableMedia?: boolean;
}

export default function WhyCyprus({ data, link, disableMedia }: WhyCyprusProps) {
  return (
    <section id='why-cyprus' className='section'>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 overflow-hidden">
        <div>
          {disableMedia ? (
            <div
              className="w-full aspect-video rounded-lg bg-cover bg-center"
              style={{ backgroundImage: "url('https://res.cloudinary.com/hibarr/image/upload/about-north-cyprus_q8adcb')" }}
            />
          ) : (
            <Video
              hls
              src="https://vz-da4cd036-d13.b-cdn.net/31c737df-ff40-48a5-a2ab-e8fc0a829df5/playlist.m3u8"
              fallbackMp4="https://vz-da4cd036-d13.b-cdn.net/31c737df-ff40-48a5-a2ab-e8fc0a829df5/play_720p.mp4"
              poster="https://res.cloudinary.com/hibarr/image/upload/about-north-cyprus_q8adcb"
            />
          )}
        </div>
        <div className="flex flex-col gap-6 w-full">
          <h3 className="text-3xl">{data?.title}</h3>
          <div className="flex flex-col gap-4">
            {data?.reasons?.map((reason) => (
              <div key={reason.title} className="flex gap-2">
                <p className="text-sm md:text-base font-semibold"> <span className="rounded-full size-2 bg-primary shrink-0 inline-block mb-0.5"></span> {reason.title}: <span className="font-normal">{reason.description}</span></p>
              </div>
            ))}
          </div>
          <Button className="w-full" variant="accent" size="lg" href={link || data?.CTA?.url || ''} addLocaleToHref>
            {data?.CTA?.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
