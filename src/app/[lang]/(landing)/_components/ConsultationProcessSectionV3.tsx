import { HomePage } from "@/types/sanity.types";
import { Icon } from "@iconify/react";

type ConsultationProcessSection = {
  data: HomePage['consultationProcessSection'];
}

export default function ConsultationProcessSection({ data }: ConsultationProcessSection) {
  return (
    <section id='consultation-process' className='section max-w-screen-lg bg-cover bg-center'>
      <div className="bg-primary rounded-lg p-6 md:p-9 flex flex-col gap-6 bg-[url('/images/wave-background.webp')] bg-no-repeat bg-center">
        <div className="max-w-screen-lg mx-auto flex flex-col gap-3">
          <h3 className='text-3xl md:text-5xl text-center text-primary-foreground'>{data?.title}</h3>
          <p className="text-sm md:text-lg text-primary-foreground text-center">{data?.description}</p>
        </div>
        <div className="grid grid-cols-1 place-items-center gap-10">
          {data?.steps?.map((step, index) => (
            <div
              key={index}
              className="group relative max-w-sm cursor-default flex flex-col gap-4 rounded-xl p-4 py-5 basis-full bg-white md:basis-[31.5%] md:nth-last-[-n+2]:basis-[48%] transition-all duration-300">
              <div className="flex flex-wrap items-center gap-2">
                <Icon icon={step.icon || ''} className="text-primary shrink-0 text-3xl group-hover:scale-110 transition-all duration-300" />
                <div className="flex flex-col gap-1">
                  <h4 className="text-xl md:text-2xl text-primary truncate">{step.title}</h4>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-primary h-full flex flex-col gap-1.5">
                <p className="text-xs md:text-sm text-accent uppercase font-medium md:whitespace-nowrap">{step.subtitle}</p>
                <p className="text-base md:text-lg text-white">{step.description}</p>
              </div>
              <div className="absolute h-20 w-1 bg-white -bottom-20 left-1/2 -translate-x-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
