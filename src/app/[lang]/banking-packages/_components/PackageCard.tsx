import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@iconify/react'
import React from 'react'

type PackageCardProps = {
  icon: string
  title: string
  description: string
  price: number
  features: string[]
  onSelect: () => void
}

export default function PackageCard({ icon, title, description, price, features, onSelect }: PackageCardProps) {
  return (
    <Card className='flex flex-col gap-2 h-max'>
      <CardHeader>
        <div className="grid place-items-center size-8 bg-accent rounded-sm mb-4">
          <Icon icon={icon} className='text-primary-foreground' />
        </div>
        <CardTitle className='text-xl font-medium'>{title}</CardTitle>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <p className='text-3xl font-semibold'>€{price.toLocaleString()}</p>
        <Button onClick={onSelect}>Click Here to Register</Button>
        <ul className='flex flex-col gap-2'>
          {features.map((feature) => (
            <li key={feature} className='text-sm font-medium'>{feature}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
