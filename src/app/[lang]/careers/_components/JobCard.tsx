import { Button } from '@/components/ui/button';
import React from 'react';
type Job = {
  id: number | string;
  slug?: string;
  title: string;
  department?: string;
  location?: string;
  type?: string;
  description?: string;
}

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className='bg-secondary rounded-lg p-6 flex flex-col gap-3'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-2xl font-bold'>{job.title}</h3>
          <p className='text-sm text-muted-foreground'>{job.department} • {job.location} • {job.type}</p>
        </div>
        <div className='hidden md:block'>
          <Button href={`/careers/${encodeURIComponent(String(job.slug ?? job.id))}`} addLocaleToHref>View</Button>
        </div>
      </div>
      <p className='text-base text-muted-foreground'>{job.description}</p>
      <div className='flex gap-2 md:hidden'>
        <Button href={`/careers/${encodeURIComponent(String(job.slug ?? job.id))}`} addLocaleToHref size='sm'>View</Button>
      </div>
    </div>
  )
}
