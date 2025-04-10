import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dictionary } from "@/lib/dictionary";

type CallToActionSectionProps = {
  dictionary: Dictionary;
}

export default function CallToActionSection({ dictionary }: CallToActionSectionProps) {
  return (
    <section id='call-to-action' className='section'>
      <div className="bg-primary rounded-lg p-9 overflow-hidden">
        <div className="max-w-screen-lg mx-auto flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h3 className='text-4xl text-center text-primary-foreground'>{dictionary.home.callToAction.title}</h3>
            <p className="text-primary-foreground text-center max-w-screen-md mx-auto">{dictionary.home.callToAction.description}</p>
          </div>
          <Button className="w-fit mx-auto" variant="accent" asChild>
            <Link href={dictionary.home.callToAction.cta.href} className="uppercase font-semibold whitespace-break-spaces">
              {dictionary.home.callToAction.cta.text}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
