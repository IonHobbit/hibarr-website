import Image from 'next/image'
import { Icon } from '@/components/icons'
import Link from 'next/link'
import { PropertyListing } from '@/types/property'
import { formatCurrency } from '@/lib/currency'
import useSource from '@/hooks/useSource'
import { areaUnit } from '@/lib/property'

interface PropertyProps {
  property: PropertyListing
}

export default function Property({ property }: PropertyProps) {

  const source = useSource();

  const coverImage = property.images[0]
  const title = property.title || '';
  const price = property.price;
  const bedrooms = property.bedrooms || 0;
  const bathrooms = property.bathrooms || 0;
  const size = property.land_size || 0;
  const type = property.property_type || '';

  const generateLink = () => {
    if (source === 'alpha-cash') {
      return `/external/alpha-cash/listings/${property.id}`
    }
    return `/listings/${property.id}`
  }

  return (
    <Link href={generateLink()} className='border group cursor-pointer overflow-hidden'>
      <div className='relative w-full h-60 overflow-hidden'>
        <Image
          src={
            coverImage
              ? coverImage?.url
              : "https://res.cloudinary.com/hibarr/image/upload/listing-luxury-home-exterior-pool_gjodzh"
          }
          alt={title}
          fill
          sizes='100%'
          className='object-cover group-hover:scale-105 transition-all duration-300'
        />
        <div className='absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300' />
        <div className='absolute top-4 right-4 z-10 flex items-center gap-2'>
          {/* {property.labels.map((label, index) => (
            <div key={index} className='bg-secondary/90 p-1 px-3'>
              <p className='text-xs font-medium uppercase whitespace-nowrap'>{label}</p>
            </div>
          ))} */}
        </div>
        <p className='text-2xl font-semibold text-primary-foreground absolute bottom-4 left-4'>{formatCurrency(price)}</p>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <p className='text-md font-semibold line-clamp-1'>{title}</p>
        <div className="flex items-center gap-2">
          <Icon icon="mdi:bed-outline" className='size-6' />
          <p className='text-sm text-muted-foreground'>{bedrooms}</p>
          <Icon icon="mdi:bathtub-outline" className='size-6' />
          <p className='text-sm text-muted-foreground'>{bathrooms}</p>
          <Icon icon="mdi:ruler-square" className='size-6' />
          <p className='text-sm text-muted-foreground'>{size} {areaUnit['m2' as keyof typeof areaUnit]}</p>
        </div>
        <p className='text-muted-foreground uppercase text-sm'>{type}</p>
      </div>
    </Link>
  )
}
