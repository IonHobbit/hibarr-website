import { Button } from '@/components/ui/button';
import React from 'react';
import { Job } from '@/types/careers';

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className='bg-secondary flex flex-col gap-3 py-8'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-4xl !font-semibold'>{job.title}</h3>
          <p className='text-sm text-muted-foreground font-light'>{job.department} • {job.location} • {job.type}</p>
        </div>
        <div className='hidden md:block'>
          <Button href={`/careers/${encodeURIComponent(String(job.slug ?? job.id))}`} addLocaleToHref>
            Submit Application
          </Button>
        </div>
      </div>
      <p className='text-base text-muted-foreground line-clamp-2'>{job.description}</p>
      <div className='flex gap-2 md:hidden w-full'>
        <Button href={`/careers/${encodeURIComponent(String(job.slug ?? job.id))}`} addLocaleToHref fullWidth>Submit Application</Button>
      </div>
    </div>
  )
}
