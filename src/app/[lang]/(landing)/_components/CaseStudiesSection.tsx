import { fetchSanityData } from "@/lib/third-party/sanity.client";
import { CaseStudy, HomePage } from "@/types/sanity.types";
import CaseStudies from "./CaseStudies";
import { Locale } from "@/lib/i18n-config";

type CaseStudiesSectionProps = {
  data: HomePage['caseStudiesSection'];
  lang: Locale;
  disableMedia?: boolean;
}

export default async function CaseStudiesSection({ data, lang, disableMedia }: CaseStudiesSectionProps) {
  const caseStudies = await fetchSanityData<CaseStudy[]>(`*[_type == "caseStudy" && language == $lang]`, { lang });

  return (
    <section id='case-studies' className='section md:min-h-[50dvh]'>
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
        <CaseStudies caseStudies={caseStudies} disableMedia={disableMedia} />
      </div>
    </section>
  )
}
