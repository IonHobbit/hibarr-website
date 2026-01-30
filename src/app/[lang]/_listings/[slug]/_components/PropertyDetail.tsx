import { cn } from '@/lib/utils';
import React from 'react'

type PropertyDetailProps = {
  label: string,
  value: string | number | undefined | React.ReactNode,
  capitalize?: boolean,
}

export default function PropertyDetail({ label, value, capitalize }: PropertyDetailProps) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-2">
      <p className='text-base font-medium'>{label}</p>
      <p className={cn('text-lg', capitalize && 'capitalize')}>{value}</p>
    </div>
  )
}
