import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Faq } from "@/types/sanity.types";

type FAQsProps = {
  faqs: Faq[];
}

export default async function FAQs({ faqs }: FAQsProps) {
  return (
    <Accordion type='single' collapsible>
      {faqs?.map((faq, index) => (
        <AccordionItem key={index} value={faq.question ?? ''}>
          <AccordionTrigger>
            <p className=' text-lg md:text-xl !font-sans font-medium'>{faq.question}</p>
          </AccordionTrigger>
          <AccordionContent>
            <p className='text-sm md:text-lg '>{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}