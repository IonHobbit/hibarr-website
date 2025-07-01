import { Button } from '@/components/ui/button'
import { translate } from '@/lib/translation'
import { HomePage } from '@/types/sanity.types'

type InvestorCommunitySectionProps = {
  data: HomePage['investorCommunitySection']
}

export default async function InvestorCommunitySection({ data }: InvestorCommunitySectionProps) {
  const title = await translate('Join our community of Investors now on Facebook');
  const buttonText = await translate('Join Here');

  return (
    <section id='investor-community' className="section">
      <div className="flex flex-col gap-4 bg-primary p-6 rounded-lg">
        {/* <Image src="/images/smart-investor.png" alt="Smart Investor" width={1000} height={1000} className='w-full h-auto' /> */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-10">
          <h3 className='text-3xl md:text-5xl text-center md:text-left text-primary-foreground' data-token={title.token}>{title.text}</h3>
          <Button size="lg" variant="accent" className='w-full md:w-auto font-semibold' href={data?.CTA?.url ?? ''} target='_blank' addLocaleToHref>
            {data?.CTA?.label ?? buttonText.text}
          </Button>
        </div>
      </div>
    </section>
  )
}
