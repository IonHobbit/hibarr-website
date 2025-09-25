import { AboutPage, WebinarPage } from "@/types/sanity.types";
import Video from "@/components/Video";
import CountUp from "@/components/bits/CountUp/CountUp";

type AboutHostSectionProps = {
  data: AboutPage['aboutRabihSection'];
  statistics: WebinarPage['statisticsSection'];
}

export default function AboutHostSection({ data, statistics }: AboutHostSectionProps) {
  return (
    <section id='about-rabih' className='section md:h-[60vh]'>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 h-full">
        <div className="flex flex-col gap-6 md:col-span-1">
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl md:text-4xl font-bold">{data?.title}</h3>
            <p className="text-muted-foreground md:text-lg">{data?.subTitle}</p>
          </div>
          <p className="text-muted-foreground md:text-lg">{data?.paragraph1}</p>
          <p className="text-muted-foreground md:text-lg">{data?.paragraph2}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {statistics?.map((statistic, index) => (
              <div key={index} className="flex flex-col justify-center items-center gap-2 border hover:scale-105 transition-all duration-300 border-gray-200 text-primary rounded-lg p-4">
                <p className="text-4xl font-semibold">
                  {statistic.prefix && <span>{statistic.prefix}</span>}
                  <CountUp from={0} to={statistic.number ?? 0} />
                  {statistic.postfix && <span>{statistic.postfix}</span>}
                </p>
                <p className="text-sm md:text-base text-primary text-center">{statistic.description}</p>
              </div>
            ))}
          </div>
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
