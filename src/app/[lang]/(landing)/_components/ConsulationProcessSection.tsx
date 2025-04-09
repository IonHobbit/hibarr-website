import { Dictionary } from "@/lib/dictionary";
import { Icon } from "@iconify/react";
type ConsulationProcessSectionProps = {
  dictionary: Dictionary;
}

export default function ConsulationProcessSection({ dictionary }: ConsulationProcessSectionProps) {
  return (
    <section id='consulation-process' className='section'>
      <div className="bg-primary rounded-lg p-9 flex flex-col gap-6">
        <div className="max-w-screen-lg mx-auto flex flex-col gap-3">
          <h3 className='text-4xl text-center text-primary-foreground'>{dictionary.home.consulationProcess.title}</h3>
          <p className="text-primary-foreground/80 text-center">{dictionary.home.consulationProcess.description}</p>
        </div>
        <div className="grid grid-cols-1 md:flex flex-wrap justify-center gap-6">
          {dictionary.home.consulationProcess.steps.map((step, index) => (
            <div
              key={index}
              className="group cursor-default flex flex-col gap-4 border rounded-lg p-4 basis-full md:basis-[31.5%] md:nth-last-[-n+2]:basis-[48%] hover:bg-background/5 transition-all duration-300">
              <div className="flex items-center gap-4">
                <Icon icon={step.icon} className="text-primary-foreground/80 text-4xl group-hover:scale-110 transition-all duration-300" />
                <div className="flex flex-col gap-1">
                  <h4 className="text-2xl text-primary-foreground">{step.title}</h4>
                  <p className="text-sm text-accent uppercase font-medium whitespace-nowrap">{step.subTitle}</p>
                </div>
              </div>
              <p className="text-primary-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
