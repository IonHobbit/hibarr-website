'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'


export type BankPackage = {
  title: string
  icon: string
  slug: string
  description: string
  price: number
  buttonText: string
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

  const { title, icon, slug, description, price, buttonText, features } = pkg;

  const handleSelect = () => {
    router.push(`/banking-packages?package=${slug}#register`)
  }

  return (
    <Card className='flex flex-col gap-3 h-max'>
      <CardHeader>
        <div className="grid place-items-center size-8 bg-accent rounded-sm mb-4">
          <Icon icon={icon as string} className='text-primary-foreground' />
        </div>
        <CardTitle className='text-xl font-medium'>{title}</CardTitle>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        <p className='text-4xl font-semibold text-center'>€ {price?.toLocaleString()}</p>
        <Button onClick={() => handleSelect()}>{buttonText}</Button>
        <ul className='flex flex-col gap-2'>
          {features?.map((feature, index) => (
            <li key={index} className='text-sm font-medium'>{feature.title}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
