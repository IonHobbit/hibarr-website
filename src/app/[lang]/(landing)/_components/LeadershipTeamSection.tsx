import { HomePage } from "@/lib/sanity/sanity.types";
import Image from "next/image";

type LeadershipTeamSectionProps = {
  data: HomePage['leadershipTeamSection'];
}

export default function LeadershipTeamSection({ data }: LeadershipTeamSectionProps) {
  const leadershipTeam = [
    {
      name: "Rabih Rabea",
      image: "/images/rabih.jpg",
      title: "Founder and CEO",
    },
    {
      name: "Philip Janzen",
      image: "/images/team/philip.jpg",
      title: "Chief Operating Officer (COO)",
    },
    {
      name: "Jürgen Lehmann",
      image: "/images/team/jurgen.png",
      title: "Chief Sales Officer (CSO)",
    },
    {
      name: "Paradox Enabulele",
      image: "/images/team/paradox.jpg",
      title: "Chief Marketing Officer (CMO)",
    },
    {
      name: "Manuela Gebhardt",
      image: "/images/team/manuela.png",
      title: "Brand Manager",
    },
    {
      name: "Christoph Fiedelsberger",
      image: "/images/team/christoph.webp",
      title: "Director of Process Innovation and Automation",
    },
    {
      name: "Florian Wilk",
      image: "/images/team/florian.png",
      title: "International Tax Expert",
    },

  ]

  return (
    <section id='leadership-team' className='min-h-[50vh] bg-gray-50/50'>
      <div className="section">
        <div className="max-w-screen-md mx-auto flex flex-col gap-2">
          <h3 className="text-4xl text-center">{data?.title}</h3>
          <p className="text-center text-muted-foreground">{data?.description}</p>
        </div>
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 md:flex flex-wrap justify-center gap-4">
            {leadershipTeam.map((member) => (
              <div key={member.name} className="flex flex-col gap-2 border p-4 bg-white basis-full md:basis-[23.5%]">
                <div className="relative w-full h-80 md:h-52">
                  <Image src={member.image} alt={member.name} fill sizes="100%" className="object-cover object-top w-full h-full" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-lg">{member.name}</h4>
                  <p className="text-muted-foreground text-sm">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
