import React from 'react';
import { notFound } from 'next/navigation';
import ApplicationForm from './_components/ApplicationForm';
import { makeGETRequest } from '@/lib/services/api.service';
import { mockJobs } from '@/lib/mockdata';
import { translate } from '@/lib/translation';
import { Job } from '@/types/careers';

export default async function CareerPage({ params }: { params: Promise<{ slug: string, lang?: string }> }) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);

  // fetch all jobs and find by slug, fallback to mock data if API is unavailable
  let jobs: Job[] = [];
  try {
    const resp = await makeGETRequest<Job[]>('/jobs');
    jobs = resp?.data ?? [];
  } catch {
    // Use mock data when API is unavailable (e.g., during build time)
    jobs = mockJobs;
  }
  
  const job = jobs.find((j) => String(j.slug) === decoded || String(j.id) === decoded);

  if (!job) return notFound();

  // Translate the page content
  const [responsibilities, requirements, minimumExperience, applyForThisRole] = await Promise.all([
    translate('Responsibilities'),
    translate('Requirements'),
    translate('Minimum Experience'),
    translate('Apply for this role')
  ]);

  return (
    <main>
      <section className='section header-offset'>
          <div className='grid grid-cols-1 md:grid-cols-5 gap-6'>
            <aside className='md:col-span-2 bg-secondary rounded-lg flex flex-col gap-4'>
              <h1 className='text-3xl font-bold mb-2'>{job.title}</h1>
              <p className='text-muted-foreground mb-2'>{job.department} • {job.location} • {job.type}</p>
              <p className='mb-4'>{job.description}</p>
              <div>
                <h3 className='text-xl font-semibold mb-2' data-token={responsibilities.token}>
                  {responsibilities.text}
                </h3>
                <ul className='list-disc pl-5'>
                  {(job.responsibilities ?? []).map((r: string, i: number) => <li key={i}>{r}</li>)}
                </ul>
              </div>
              <div>
                <h3 className='text-xl font-semibold mb-2' data-token={requirements.token}>
                  {requirements.text}
                </h3>
                <ul className='list-disc pl-5'>
                  {(job.requirements ?? []).map((r: string, i: number) => <li key={i}>{r}</li>)}
                </ul>
              </div>
              <div>
                <p className='font-medium' data-token={minimumExperience.token}>
                  {minimumExperience.text}
                </p>
                <p className='text-muted-foreground mb-4'>{job.minWorkExperience}</p>
              </div>
            </aside>
            <div className='md:col-span-3 flex flex-col gap-4'>
              <div id='apply' className='bg-secondary rounded-lg'>
                <h3 className='text-xl font-semibold mb-2' data-token={applyForThisRole.token}>
                  {applyForThisRole.text}
                </h3>
                <ApplicationForm jobId={String(job.id)} />
              </div>
            </div>
          </div>
      </section>
    </main>
  )
}
