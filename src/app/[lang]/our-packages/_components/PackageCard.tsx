'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export type BankPackage = {
  title: string
  icon: string
  subtitle: string
  slug: string
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
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const { title, subtitle, icon, slug, description, price, buttonText, moreText, features } = pkg;

  const handleSelect = () => {
    router.push(`/banking-packages?package=${slug}#register`)
  }

  return (
    <Card className='flex flex-col gap-3 h-max transition-all duration-300'>
      <CardHeader>
        <div className="grid place-items-center size-8 bg-accent rounded-sm mb-4">
          <Icon icon={icon as string} className='text-primary-foreground' />
        </div>
        <CardTitle className='text-xl font-medium'>{title}</CardTitle>
        {subtitle && <p className='text-sm text-muted-foreground'>{subtitle}</p>}
        <p className='text-sm text-muted-foreground'>{description}</p>
      </CardHeader>
      <CardContent className='flex flex-col'>
        <p className='text-4xl font-semibold text-center'>€ {price?.toLocaleString()}</p>
        <Button onClick={() => handleSelect()} className='mt-3'>{buttonText}</Button>
        <div onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 cursor-pointer mt-3">
          <p className='text-sm text-muted-foreground'>{moreText || 'More information'}</p>
          <Icon icon='mdi:chevron-down' className={`text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mt-3' : 'max-h-0'}`}>
          <ul className='flex flex-col gap-2'>
            {features?.map((feature, index) => (
              <li key={index} className='text-sm font-medium'>{feature.title}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
