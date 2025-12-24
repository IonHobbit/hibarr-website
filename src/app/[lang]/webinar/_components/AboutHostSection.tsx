import { AboutPage } from "@/types/sanity.types";
import dynamic from "next/dynamic";

const Video = dynamic(() => import('@/components/Video'), {
  loading: () => <div className="w-full aspect-video bg-muted animate-pulse rounded-lg" />
})

type AboutHostSectionProps = {
  data: AboutPage['aboutRabihSection'];
}

export default function AboutHostSection({ data }: AboutHostSectionProps) {
  return (
    <section id='about-rabih' className='section md:h-[70dvh]'>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 h-full">
        <div className="flex flex-col gap-6 md:col-span-1">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-bold">{data?.title}</h2>
            <p className="text-muted-foreground md:text-lg">{data?.subTitle}</p>
          </div>
          <p className="text-muted-foreground md:text-lg">{data?.paragraph1}</p>
          <p className="text-muted-foreground md:text-lg">{data?.paragraph2}</p>
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
