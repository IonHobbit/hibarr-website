import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dictionary } from "@/lib/dictionary";

type FAQAccordionProps = {
  faqs: Dictionary['faqs'];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <Accordion type='single' collapsible>
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={faq.question}>
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