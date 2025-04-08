import { Dictionary } from "@/lib/dictionary";

type ConsulationProcessSectionProps = {
  dictionary: Dictionary;
}

export default function ConsulationProcessSection({ dictionary }: ConsulationProcessSectionProps) {
  return (
    <section id='consulation-process' className='section'>
      <div className="bg-primary rounded-lg p-9">
        <div className="max-w-screen-lg mx-auto flex flex-col gap-3">
          <h3 className='text-4xl text-center text-primary-foreground'>{dictionary.home.consulationProcess.title}</h3>
          <p className="text-primary-foreground/80 text-center">{dictionary.home.consulationProcess.description}</p>
        </div>
      </div>
    </section>
  )
}
