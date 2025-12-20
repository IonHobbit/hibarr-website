import { Button } from "@/components/ui/button";
import { HomePage } from "@/types/sanity.types";
import Video from "@/components/Video";

type MeetRabihProps = {
  data: HomePage['meetRabihSection'];
}

export default function MeetRabih({ data }: MeetRabihProps) {
  return (
    <section id='meet-rabih' className='section min-h-[50dvh]'>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-bold">{data?.title}</h3>
            <p className="text-muted-foreground md:text-lg">{data?.subTitle}</p>
          </div>
          <p className="text-muted-foreground md:text-lg">{data?.paragraph1}</p>
          <p className="text-muted-foreground md:text-lg">{data?.paragraph2}</p>
          <Button href={data?.CTA?.url || ''} addLocaleToHref variant="accent" size="lg" className="w-full sm:w-max">
            {data?.CTA?.label}
          </Button>
        </div>
        <Video
          hls
          src="https://vz-da4cd036-d13.b-cdn.net/56b164f5-3dcc-4a0b-8640-7310d9110a4f/playlist.m3u8"
          fallbackMp4="https://vz-da4cd036-d13.b-cdn.net/56b164f5-3dcc-4a0b-8640-7310d9110a4f/play_720p.mp4"
          poster="https://res.cloudinary.com/hibarr/image/upload/about-rabih-thumbnail_igbyvs"
        />
      </div>
    </section>
  )
}
