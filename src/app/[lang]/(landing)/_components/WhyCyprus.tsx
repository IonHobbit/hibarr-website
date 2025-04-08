import { Button } from "@/components/ui/button";
import { Dictionary } from "@/lib/dictionary";
import Link from "next/link";

type WhyCyprusProps = {
  dictionary: Dictionary;
}

export default function WhyCyprus({ dictionary }: WhyCyprusProps) {
  return (
    <section id='why-cyprus' className='section'>
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10">
        <div>
          <video
            controls playsInline
            className='object-cover rounded-lg aspect-video'
            poster="/images/about-north-cyprus.jpg"
            src="https://vz-da4cd036-d13.b-cdn.net/31c737df-ff40-48a5-a2ab-e8fc0a829df5/play_720p.mp4"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-3xl">{dictionary.home.whyCyprus.title}</h3>
          <div className="flex flex-col gap-4">
            {dictionary.home.whyCyprus.reasons.map((reason) => (
              <div key={reason.title} className="flex gap-2">
                <p className="text-sm font-semibold">{reason.title}: <span className="font-normal">{reason.description}</span></p>
              </div>
            ))}
          </div>
          <Button className="w-max" variant="accent" asChild>
            <Link href={dictionary.home.whyCyprus.cta.href}>{dictionary.home.whyCyprus.cta.text}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
