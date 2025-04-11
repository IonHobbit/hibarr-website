import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { client } from "@/lib/sanity/client";
import { Faq } from "@/lib/sanity/sanity.types";
import { Locale } from "@/lib/i18n-config";

type FAQAccordionProps = {
  lang: Locale;
}

export default async function FAQAccordion({ lang }: FAQAccordionProps) {
  const data = await client.fetch<Faq[]>(`*[_type == "faq" && language == $lang]`, { lang }, { cache: 'no-store' });

  return (
    <Accordion type='single' collapsible>
      {data?.map((faq, index) => (
        <AccordionItem key={index} value={faq.question ?? ''}>
          <AccordionTrigger>
            <p className='text-primary-foreground text-lg md:text-xl !font-sans font-light'>{faq.question}</p>
          </AccordionTrigger>
          <AccordionContent>
            <p className='text-sm md:text-lg text-primary-foreground'>{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}