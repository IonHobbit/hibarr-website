'use client'

import { HomePage } from "@/types/sanity.types";
import { Icon } from "@/components/icons";

type ConsultationProcessSection = {
  data: HomePage['consultationProcessSection'];
}

export default function ConsultationProcessSection({ data }: ConsultationProcessSection) {
  return (
    <section id='consultation-process' className='section'>
      <div className="bg-primary rounded-lg p-6 md:p-9 flex flex-col gap-6">
        <div className="max-w-screen-lg mx-auto flex flex-col gap-3">
          <h2 className='text-3xl md:text-5xl text-center text-primary-foreground'>{data?.title}</h2>
          <p className="text-sm md:text-lg text-primary-foreground/80 text-center">{data?.description}</p>
        </div>
        <div className="grid grid-cols-1 lg:flex flex-wrap justify-center gap-6">
          {data?.steps?.map((step, index) => (
            <div
              key={index}
              className="group overflow-hidden cursor-default shrink-0 flex flex-col gap-4 border rounded-lg p-4 basis-full md:basis-[31.5%] md:nth-last-[-n+2]:basis-[48%] hover:bg-background/5 transition-all duration-300">
              <div className="flex flex-wrap items-center gap-4">
                <Icon icon={step.icon || ''} className="text-primary-foreground/80 shrink-0 text-4xl group-hover:scale-110 transition-all duration-300" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl md:text-2xl text-primary-foreground truncate">{step.title}</h3>
                  <p className="text-xs md:text-sm text-primary-foreground/80 uppercase font-medium md:whitespace-nowrap">{step.subtitle}</p>
                </div>
              </div>
              <p className="text-base md:text-lg text-primary-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
