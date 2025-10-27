import { Metadata } from 'next';
import JobCard from './_components/JobCard';
import React from 'react';
import { makeGETRequest } from '@/lib/services/api.service';

type Job = {
  id: number | string;
  slug?: string;
  title: string;
  department?: string;
  location?: string;
  type?: string;
  description?: string;
}

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Career opportunities at Hibarr',
}

export default async function CareersPage() {
  // fetch jobs from backend
  const resp = await makeGETRequest<Job[]>('/jobs');
  const jobs = resp?.data ?? [];

  return (
    <main>
      <section className='section header-offset'>
        <h1 className='text-4xl font-bold mb-4'>Career Opportunities</h1>
        <p className='text-muted-foreground mb-6'>Explore open roles and apply to join our team.</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {jobs.map((job) => (
            <JobCard key={String(job.id)} job={job as any} />
          ))}
        </div>
      </section>
    </main>
  )
}
