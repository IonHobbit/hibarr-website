import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomePage } from "@/types/sanity.types";

type CallToActionSectionProps = {
  data: HomePage['callToActionSection'];
}

export default function CallToActionSection({ data }: CallToActionSectionProps) {
  return (
    <section id='call-to-action' className='section'>
      <div className="bg-primary rounded-lg p-9 overflow-hidden">
        <div className="max-w-screen-lg mx-auto flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h3 className='text-4xl text-center text-primary-foreground'>{data?.title}</h3>
            <p className="text-primary-foreground text-center max-w-screen-md mx-auto">{data?.description}</p>
          </div>
          <Button className="w-fit mx-auto" variant="accent" asChild>
            <Link href={data?.CTA?.url ?? ''} className="uppercase font-semibold whitespace-break-spaces">
              {data?.CTA?.label}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
