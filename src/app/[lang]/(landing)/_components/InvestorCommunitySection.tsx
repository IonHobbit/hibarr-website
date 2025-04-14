import { Button } from '@/components/ui/button'
import { HomePage } from '@/types/sanity.types'
import Link from 'next/link'

type InvestorCommunitySectionProps = {
  data: HomePage['investorCommunitySection']
}

export default function InvestorCommunitySection({ data }: InvestorCommunitySectionProps) {
  return (
    <section id='investor-community' className="section">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-10 bg-primary p-6 rounded-lg">
        <h3 className='text-3xl md:text-5xl text-center md:text-left text-primary-foreground'>Join our community <br /> of Investors now on <span className='text-secondary'>Facebook</span></h3>
        <Button size="lg" variant="accent" className='w-full md:w-auto font-semibold' asChild>
          <Link href={data?.CTA?.url ?? ''} target='_blank'>
            {data?.CTA?.label ?? 'Join Here'}
          </Link>
        </Button>
      </div>
    </section>
  )
}
