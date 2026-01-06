import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fetchSanityData } from "@/lib/third-party/sanity.client";
import { Faq } from "@/types/sanity.types";
import { Locale } from "@/lib/i18n-config";

type FAQAccordionProps = {
  lang: Locale;
  items?: { question: string; answer: string }[];
}

export default async function FAQAccordion({ lang, items }: FAQAccordionProps) {
  const data = items || await fetchSanityData<Faq[]>(`*[_type == "faq" && language == $lang]`, { lang }, { cache: 'no-store' });

  return (
    <Accordion type='single' collapsible>
      {data?.map((faq, index) => (
        <AccordionItem key={index} value={faq.question || ''}>
          <AccordionTrigger>
            <p className='text-primary-foreground text-lg md:text-xl !font-sans font-medium text-left'>{faq.question}</p>
          </AccordionTrigger>
          <AccordionContent>
            <p className='text-sm md:text-lg text-primary-foreground'>{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}