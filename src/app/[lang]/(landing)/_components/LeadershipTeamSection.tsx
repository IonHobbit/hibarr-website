import { fetchSanityData } from "@/lib/sanity/client";
import { HomePage, Team } from "@/types/sanity.types";
import Image from "next/image";
import { generateImageUrl } from "@/lib/utils";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

type LeadershipTeamSectionProps = {
  data: HomePage['leadershipTeamSection'];
}

export default async function LeadershipTeamSection({ data }: LeadershipTeamSectionProps) {
  const leadershipTeam = await fetchSanityData<Team[]>(`*[_type == "team" && leadership == true] | order(order asc)`);

  return (
    <section id='leadership-team' className='min-h-[50vh] bg-gray-50/50'>
      <div className="section">
        <div className="max-w-screen-md mx-auto flex flex-col gap-2">
          <h3 className="text-3xl md:text-4xl text-center">{data?.title}</h3>
          <p className="text-center md:text-lg text-muted-foreground">{data?.description}</p>
        </div>
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 md:flex flex-wrap justify-center gap-4">
            {leadershipTeam.map((member) => (
              <div key={member.name} className="flex flex-col gap-2 border p-4 bg-white basis-full md:basis-[23.5%]">
                <div className="relative w-full h-80 md:h-52">
                  <Image src={generateImageUrl(member.image as SanityImageSource).url() || ''} alt={member.name || ''} fill sizes="100%" className="object-cover object-top w-full h-full" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-lg md:text-xl">{member.name}</h4>
                  <p className="text-muted-foreground text-sm md:text-base">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
