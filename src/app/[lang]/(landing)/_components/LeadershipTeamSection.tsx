import { fetchSanityData } from "@/lib/third-party/sanity.client";
import { HomePage, Team } from "@/types/sanity.types";
import { teamContent } from "@/lib/content/team";
import { Locale } from "@/lib/i18n-config";
import TeamMemberCard from "./TeamMemberCard";

type LeadershipTeamSectionProps = {
  lang: Locale;
  data: HomePage['leadershipTeamSection'];
}

export default async function LeadershipTeamSection({ lang, data }: LeadershipTeamSectionProps) {
  const leadershipTeam = await fetchSanityData<Team[]>(`*[_type == "team" && leadership == true] | order(order asc)`);
  const restOfTeam = await fetchSanityData<Team[]>(`*[_type == "team" && leadership != true] | order(order asc)`);

  const content = teamContent[lang ?? 'en'] ?? teamContent.en;

  return (
    <section id='leadership-team' className='min-h-[50dvh] bg-gray-50/50'>
      <div className="section">
        <div className="max-w-screen-md mx-auto flex flex-col gap-2">
          <h3 className="text-3xl md:text-4xl text-center">{data?.title}</h3>
          <p className="text-center md:text-lg text-muted-foreground">{data?.description}</p>
        </div>
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 md:flex flex-wrap justify-center gap-4">
            {leadershipTeam.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </div>
      <div className="section">
        <div className="max-w-screen-md mx-auto flex flex-col gap-2">
          <h3 className="text-3xl md:text-4xl text-center">{content.legalTeamTitle}</h3>
          {/* <p className="text-center md:text-lg text-muted-foreground">{data?.description}</p> */}
        </div>
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 md:flex flex-wrap justify-center gap-4">
            {restOfTeam.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}