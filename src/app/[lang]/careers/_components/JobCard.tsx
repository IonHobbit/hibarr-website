import { Button } from '@/components/ui/button';
import { Job } from '@/types/careers';
import Image from 'next/image';
import React from 'react'
import { careersContent } from '@/lib/content/careers';
import { Locale } from '@/lib/i18n-config';

type JobCardProps = {
  job: Job;
  lang: Locale;
}

export default function JobCard({ job, lang }: JobCardProps) {
  const type = job.type?.toString().split(',').join(', ');
  const content = careersContent[lang] ?? careersContent.en;

  return (
    <div key={job.id} className="flex flex-col justify-between rounded-lg bg-white p-6 transition hover:shadow-sm border border-gray-100">
      <div>
        <div className="mb-4 flex items-center gap-4">
          {job.icon ? (
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: job.iconColor || '#0F3057' }}
            >
              <Image src={job.icon} alt="" width={32} height={32} className="h-8 w-8" />
            </div>
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
              {/* Fallback Icon */}
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
          )}
          <div className='flex flex-col gap-1'>
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{job.title}</h3>
            <div className="text-sm text-gray-500">
              {job.department ? <span>{job.department} • </span> : null}
              {job.location} {type ? `• ${type}` : ''}
            </div>
          </div>
        </div>
        <p className="mb-6 line-clamp-3 text-gray-600 text-sm">
          {job.description}
        </p>
      </div>
      <Button className='w-full rounded py-2.5' href={`/careers/${job.slug || job.id}`} addLocaleToHref>
        {content.submitApplication}
      </Button>
    </div>
  )
}