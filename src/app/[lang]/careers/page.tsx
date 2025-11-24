import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
    jobs = resp?.data ?? [];
  } catch {
    // Use mock data when API is unavailable (e.g., during build time)
    jobs = [] as Job[];
  }

  // Translate the page content
  const [careerOpportunities, exploreOpenRoles, noOpenRoles, backHome] = await Promise.all([
    translate('Career Opportunities'),
    translate('Explore open roles and apply to join our team.'),
    translate('No open roles right now.'),
    translate('Back to Home')
  ]);

  return (
    <main>
      <section className='section header-offset gap-4 py-6'>
        <h1 className='text-4xl font-bold' data-token={careerOpportunities.token}>
          {careerOpportunities.text}
        </h1>
        <p className='text-muted-foreground' data-token={exploreOpenRoles.token}>
          {exploreOpenRoles.text}
        </p>
        {jobs.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-4 min-h-[40vh] text-center'>
            <p className='text-muted-foreground' data-token={noOpenRoles.token}>
              {noOpenRoles.text}
            </p>
            <Button asChild>
              <Link href='/' data-token={backHome.token}>
                {backHome.text}
              </Link>
            </Button>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {jobs.map((job) => (
              <JobCard key={String(job.id)} job={job} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
