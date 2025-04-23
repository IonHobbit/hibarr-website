import { client } from "@/lib/sanity/client";
import { CaseStudy, HomePage } from "@/types/sanity.types";
import CaseStudies from "./CaseStudies";

type CaseStudiesSectionProps = {
  data: HomePage['caseStudiesSection'];
}

export default async function CaseStudiesSection({ data }: CaseStudiesSectionProps) {
  const caseStudies = await client.fetch<CaseStudy[]>(`*[_type == "caseStudy"]`, {}, { cache: 'no-store' });

  return (
    <section id='case-studies' className='section md:min-h-[50vh]'>
      {(data?.title || data?.description) && (
        <div className="max-w-screen-md mx-auto flex flex-col gap-2">
          {data?.title && (
            <h3 className="text-3xl md:text-4xl font-bold text-center">{data?.title}</h3>
          )}
          {data?.description && (
            <p className="text-center md:text-lg text-muted-foreground">{data?.description}</p>
          )}
        </div>
      )}
      <div className="max-w-screen-md mx-auto w-full overflow-hidden md:overflow-visible">
        <CaseStudies caseStudies={caseStudies} />
      </div>
    </section>
  )
}
