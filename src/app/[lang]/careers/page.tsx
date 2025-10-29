import { Metadata } from 'next';
import JobCard from './_components/JobCard';
import React from 'react';
import { makeGETRequest } from '@/lib/services/api.service';
import { translate } from '@/lib/translation';
import { Job } from '@/types/careers';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Career opportunities at Hibarr',
}

export default async function CareersPage() {
  // fetch jobs from backend, fallback to mock data if API is unavailable
  let jobs: Job[] = [];
  try {
    const resp = await makeGETRequest<Job[]>('/jobs');
    jobs = resp?.data ?? [];
  } catch {
    // Use mock data when API is unavailable (e.g., during build time)
    jobs = [] as Job[];
  }

  // Translate the page content
  const [careerOpportunities, exploreOpenRoles] = await Promise.all([
    translate('Career Opportunities'),
    translate('Explore open roles and apply to join our team.')
  ]);

  return (
    <main>
      <section className='section header-offset'>
        <h1 className='text-4xl font-bold mb-2' data-token={careerOpportunities.token}>
          {careerOpportunities.text}
        </h1>
        <p className='text-muted-foreground mb-6' data-token={exploreOpenRoles.token}>
          {exploreOpenRoles.text}
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {jobs.map((job) => (
            <JobCard key={String(job.id)} job={job} />
          ))}
        </div>
      </section>
    </main>
  )
}
