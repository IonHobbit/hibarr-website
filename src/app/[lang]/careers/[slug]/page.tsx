import React from 'react';
import { notFound } from 'next/navigation';
import ApplicationForm from './_components/ApplicationForm';
import { makeGETRequest } from '@/lib/services/api.service';

type Job = {
  id: number | string;
  slug?: string;
  title: string;
  department?: string;
  location?: string;
  type?: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  minWorkExperience?: string;
}

export default async function CareerPage(props: { params: { slug: string } | Promise<{ slug: string }> }) {
  const { params } = props;
  const { slug } = (await params) as { slug: string };
  const decoded = decodeURIComponent(slug);

  // fetch all jobs and find by slug (backend provides slug field)
  const resp = await makeGETRequest<Job[]>('/jobs');
  const jobs = resp?.data ?? [];
  const job = jobs.find((j) => String(j.slug) === decoded || String(j.id) === decoded);

  if (!job) return notFound();

  return (
    <main>
      <section className='section header-offset'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <h1 className='text-4xl font-bold'>{job.title}</h1>
            <p className='text-muted-foreground mt-1'>{job.department} • {job.location} • {job.type}</p>
            <p className='mt-4'>{job.description}</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
          <div className='md:col-span-2 flex flex-col gap-4'>
            <div className='bg-secondary rounded-lg p-6'>
              <h3 className='text-xl font-semibold mb-2'>Responsibilities</h3>
              <ul className='list-disc pl-5'>
                {(job.responsibilities ?? []).map((r: string, i: number) => <li key={i}>{r}</li>)}
              </ul>
            </div>
            <div className='bg-secondary rounded-lg p-6'>
              <h3 className='text-xl font-semibold mb-2'>Requirements</h3>
              <ul className='list-disc pl-5'>
                {(job.requirements ?? []).map((r: string, i: number) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          </div>
          <aside className='bg-secondary rounded-lg p-6'>
            <p className='font-medium'>Minimum Experience</p>
            <p className='text-muted-foreground mb-4'>{job.minWorkExperience}</p>
            <p className='font-medium'>Department</p>
            <p className='text-muted-foreground mb-4'>{job.department}</p>
            <p className='font-medium'>Type</p>
            <p className='text-muted-foreground mb-4'>{job.type}</p>
            <div id='apply' className='mt-4'>
              <ApplicationForm jobId={String(job.id)} />
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
