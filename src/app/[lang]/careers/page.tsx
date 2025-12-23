import React from 'react';
import { makeGETRequest } from '@/lib/services/api.service';
import { Job } from '@/types/careers';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Locale } from '@/lib/i18n-config';

import HlsVideo from '@/components/HlsVideo';

export default async function CareersPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  
  let jobs: Job[] = [];
  try {
    const resp = await makeGETRequest<Job[]>('/jobs');
    jobs = resp?.data ?? [];
  } catch (err) {
    console.error('Failed to fetch jobs', err);
    jobs = [];
  }

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="relative h-[80dvh] w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <HlsVideo 
              src="https://vz-da4cd036-d13.b-cdn.net/ae6d4543-aa72-4182-9a64-2bd97ca807c2/playlist.m3u8"
              poster="https://res.cloudinary.com/hibarr/image/upload/v1766485116/output_image_dkxmd1.jpg"
              autoPlay
              muted
              loop
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F3057]/90 via-[#0F3057]/60 to-[#0F3057]/20 z-10" />
          <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center p-4 text-center z-20">
             <div className="bg-primary/60 rounded-2xl p-8 md:p-12 max-w-4xl mx-4 backdrop-blur-sm">
                <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                  Elevate Your Career at Hibarr
                </h1>
                <p className="mt-4 text-lg text-white md:text-xl drop-shadow-md">
                  Join a team that works in a structured environment with international standards.
                </p>
                <div className="mt-8">
                  <Button 
                    href="#open-positions" 
                    variant="accent"
                    size="lg"
                    className="font-bold text-base px-8 h-12"
                  >
                    Apply Now
                  </Button>
                </div>
             </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section id="open-positions" className="bg-[#f3f4f6] py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-[#1F2937] md:text-4xl">
                Our Open Positions
              </h2>
              <p className="mt-2 text-[#6B7280]">
                Explore open roles and apply to join our team
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.length === 0 ? (
                <div className="col-span-full text-center text-gray-500">
                  No open positions at the moment.
                </div>
              ) : (
                jobs.map((job) => (
                  <div key={job.id} className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-sm transition hover:shadow-md">
                    <div>
                      <div className="mb-4 flex items-center gap-4">
                        {job.icon ? (
                          <div 
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                            style={{ backgroundColor: job.icon_color || '#0F3057' }}
                          >
                             <Image src={`/icons/job-icons/${job.icon}`} alt="" width={32} height={32} className="h-8 w-8" />
                          </div>
                        ) : (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                            {/* Fallback Icon */}
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{job.title}</h3>
                          <div className="text-sm text-gray-500">
                            {job.department ? <span>{job.department} • </span> : null}
                            {job.location} • {Array.isArray(job.type) ? job.type.join(', ') : (typeof job.type === 'string' && job.type.startsWith('[') ? JSON.parse(job.type).join(', ') : job.type)}
                          </div>
                        </div>
                      </div>
                      <p className="mb-6 line-clamp-3 text-gray-600 text-sm">
                        {job.description}
                      </p>
                    </div>
                    <div>
                      <Link 
                        href={`/${lang}/careers/${job.slug || job.id}`}
                        className="block w-full rounded bg-[#0F3057] py-2 text-center font-medium text-white transition hover:bg-[#091E38]"
                      >
                        Submit Application
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
