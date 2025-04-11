import Image from 'next/image'
import { PropertyType } from '@/types/main'
import { Icon } from '@iconify/react'
import Link from 'next/link'

interface PropertyProps {
  property: PropertyType
}

export default function Property({ property }: PropertyProps) {
  return (
    <Link href={`/listings/${property.id}`} className='border cursor-pointer'>
      <div className='relative w-full h-60'>
        <Image src={property.images[0]} alt={property.name} fill sizes='100%' className='object-cover' />
        <div className='absolute inset-0 bg-black/20 ' />
        <div className='absolute top-4 right-4 z-10 flex items-center gap-2'>
          {property.labels.map((label, index) => (
            <div key={index} className='bg-secondary/90 p-1 px-3'>
              <p className='text-sm font-medium uppercase'>{label}</p>
            </div>
          ))}
        </div>
        <p className='text-lg font-bold text-primary-foreground absolute bottom-4 left-4'>£{property.price.toLocaleString()}</p>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <p className='text-md font-semibold line-clamp-1'>{property.name}</p>
        <div className="flex items-center gap-2">
          <Icon icon="mdi:bed-outline" className='size-6' />
          <p className='text-sm text-muted-foreground'>{property.bedrooms}</p>
          <Icon icon="mdi:bathtub-outline" className='size-6' />
          <p className='text-sm text-muted-foreground'>{property.bathrooms}</p>
          <Icon icon="mdi:ruler-square" className='size-6' />
          <p className='text-sm text-muted-foreground'>{property.size} m²</p>
        </div>
        <p className='text-muted-foreground uppercase text-sm'>{property.type}</p>
      </div>
    </Link>
  )
}
