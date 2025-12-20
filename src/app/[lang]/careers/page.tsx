import { Metadata } from 'next';
import JobCard from './_components/JobCard';
import React from 'react';
import { makeGETRequest } from '@/lib/services/api.service';
import { translate } from '@/lib/translation';
import { Job } from '@/types/careers';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Careers - Join Our Team',
    description: 'Explore exciting career opportunities at HIBARR. Join a team of innovators shaping the future.',
  }
}

export default async function CareersPage() {
  // fetch jobs from backend, fallback to mock data if API is unavailable
  let jobs: Job[] = [];
  try {
    const resp = await makeGETRequest<Job[]>('/jobs');
    jobs = resp?.data?.filter((job) => job.published) ?? [];
  } catch {
    // Use mock data when API is unavailable (e.g., during build time)
    jobs = [] as Job[];
  }

  // Translate the page content
  const [careerOpportunities, exploreOpenRoles, noOpenRoles, checkBackLater] = await Promise.all([
    translate('Our Open Positions'),
    translate('Explore open roles and apply to join our team.'),
    translate('No open roles right now.'),
    translate('Check back later for new opportunities.'),
  ]);

  return (
    <section className='section header-offset gap-4 py-6 pt-14'>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10">
        <div className="col-span-2 flex flex-col gap-4">
          <h1 className='text-5xl font-bold' data-token={careerOpportunities.token}>
            {careerOpportunities.text}
          </h1>
          <p className='text-muted-foreground' data-token={exploreOpenRoles.token}>
            {exploreOpenRoles.text}
          </p>
        </div>
        <div className="col-span-3">
          {jobs.length === 0 ? (
            <div className='flex flex-col items-center gap-4 min-h-[40dvh] justify-center text-center'>
              <h1 data-token={noOpenRoles.token} className='text-3xl !font-semibold'>{noOpenRoles.text}</h1>
              <p className='text-muted-foreground' data-token={checkBackLater.token}>{checkBackLater.text}</p>
            </div>
          ) : (
            <div className='flex flex-col divide-y'>
              {jobs.map((job) => (
                <JobCard key={String(job.id)} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
