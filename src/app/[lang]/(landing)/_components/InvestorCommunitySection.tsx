import { Button } from '@/components/ui/button'

export default function InvestorCommunitySection() {
  return (
    <section id='investor-community' className="section">
      <div className="flex flex-wrap md:grid grid-cols-2 justify-between gap-10 bg-accent p-6 rounded-lg">
        <h3 className='text-3xl md:text-5xl text-center md:text-left text-primary-foreground'>Join our community of Investors now on <span className='text-primary'>Facebook</span></h3>
        <div className="flex items-center gap-4 justify-end w-full">
          <Button size="lg" className='w-full md:w-auto font-semibold'>Join Here</Button>
        </div>
      </div>
    </section>
  )
}
