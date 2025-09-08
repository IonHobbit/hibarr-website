'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/icons'
import Link from 'next/link'

export type BankPackage = {
  title: string
  icon: string
  subtitle: string
  slug: string
  minimumDeposit?: number
  stripePriceId: string
  description: string
  price: number
  buttonText: string
  moreText: string
  features: Array<{
    title: string
    _key: string
  }>
  _key: string
}

type PackageCardProps = {
  pkg: BankPackage
  selectPackage: (slug: string) => void
}

export default function PackageCard({ pkg, selectPackage }: PackageCardProps) {
  // const [isOpen, setIsOpen] = useState(true)
  const isOpen = true;

  const { title, subtitle, icon, slug, description, price, buttonText, features } = pkg;

  return (
    <Card className='flex flex-col gap-3 h-max transition-all duration-300'>
      <CardHeader>
        <div className="flex flex-col lg:flex-row items-start gap-4">
          <div className="grid place-items-center size-8 bg-accent rounded-sm mb-4">
            <Icon icon={icon as string} className='text-primary-foreground' />
          </div>
          <CardTitle className='text-3xl font-semibold flex flex-col gap-0'>{title} {subtitle && <span className='text-sm text-muted-foreground font-bold'>{subtitle}</span>}</CardTitle>
        </div>

        <p className='text-sm text-muted-foreground'>{description}</p>
      </CardHeader>
      <CardContent className='flex flex-col'>
        <p className='text-4xl font-semibold text-center'>€ {price?.toLocaleString()}</p>
        <Link href={`#register`} className='w-full'>
          <Button className='mt-3 w-full' onClick={() => selectPackage(slug)}>
            {buttonText}
          </Button>
        </Link>
        {/* <div className="flex items-center gap-2 cursor-pointer mt-3">
          <p className='text-base font-semibold text-muted-foreground'>{moreText || 'More information'}</p>
          <Icon icon='mdi:chevron-down' className={`text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div> */}
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[900px] mt-3' : 'max-h-0'}`}>
          <ul className='flex flex-col gap-2'>
            {features?.map((feature, index) => (
              <div key={index} className='flex items-start gap-2'>
                {!feature.title.includes('plus...') && <div className='size-1.5 bg-primary mt-1.5 shrink-0' />}
                <li key={index} className={cn('text-sm', feature.title.includes('plus...') && 'font-semibold')}>{feature.title}</li>
              </div>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
