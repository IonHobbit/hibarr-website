import React from 'react';
import { notFound } from 'next/navigation';
import ApplicationForm from './_components/ApplicationForm';
import { makeGETRequest } from '@/lib/services/api.service';
import { translate } from '@/lib/translation';
import { Job } from '@/types/careers';
import Link from 'next/link';
import { Locale } from '@/lib/i18n-config';
import { careersContent } from '@/lib/content/careers';

export default async function CareerPage({ params }: { params: Promise<{ slug: string, lang: Locale }> }) {
  const { slug, lang } = await params;
  const decoded = decodeURIComponent(slug);

  const content = careersContent[lang] ?? careersContent.en;

  // fetch all jobs and find by slug, fallback to mock data if API is unavailable
  let jobs: Job[] = [];
  try {
    const resp = await makeGETRequest<Job[]>('/jobs');
    jobs = resp?.data ?? [];
  } catch {
    // Use mock data when API is unavailable (e.g., during build time)
    jobs = [] as Job[];
  }

  const job = jobs.find((j) => String(j.slug) === decoded || String(j.id) === decoded);

  if (!job) return notFound();

  // Translate the page content
  const [responsibilities, requirements, minimumExperience, applyForThisRole, backToCareers] = await Promise.all([
    translate('Responsibilities'),
    translate('Requirements'),
    translate('Minimum Experience'),
    translate('Apply for this role'),
    translate('Back to Open Positions')
  ]);


  return (
    <main>
      <section className='section header-offset'>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-6'>
          <aside className='md:col-span-2 bg-secondary rounded-lg flex flex-col gap-4'>
            <Link href='/careers' className='text-muted-foreground hover:text-primary transition-colors'>{backToCareers.text}</Link>
            <h1 className='text-3xl font-bold mb-2'>{job.title}</h1>
            <p className='text-muted-foreground mb-2'>{job.department} • {job.location} • {job.type}</p>
            <p className='mb-4'>{job.description}</p>
            <div>
              <h3 className='text-xl font-semibold mb-2' data-token={responsibilities.token}>
                {content.detailContent.responsibilities}
              </h3>
              <ul className='list-disc pl-5'>
                {(job.responsibilities ?? []).map((r: string, i: number) => <li key={i}>{r}</li>)}
              </ul>
            </div>
            <div>
              <h3 className='text-xl font-semibold mb-2' data-token={requirements.token}>
                {content.detailContent.requirements}
              </h3>
              <ul className='list-disc pl-5'>
                {(job.requirements ?? []).map((r: string, i: number) => <li key={i}>{r}</li>)}
              </ul>
            </div>
            <div>
              <p className='font-medium' data-token={minimumExperience.token}>
                {content.detailContent.minimumExperience}
              </p>
              <p className='text-muted-foreground mb-4'>{job.minWorkExperience}</p>
            </div>
          </aside>
          <div className='md:col-span-3 flex flex-col gap-4'>
            <div id='apply' className='bg-secondary rounded-lg'>
              <h3 className='text-2xl font-semibold mb-6' data-token={applyForThisRole.token}>
                {content.applicationForm.title}
              </h3>
              <ApplicationForm jobId={String(job.id)} lang={lang} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
