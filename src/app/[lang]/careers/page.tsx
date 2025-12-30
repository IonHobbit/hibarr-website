import React, { Fragment } from 'react';
import { makeGETRequest } from '@/lib/services/api.service';
import { Job } from '@/types/careers';
import { Button } from '@/components/ui/button';
import { Locale } from '@/lib/i18n-config';
import { Metadata } from 'next';

import HlsVideo from '@/components/HlsVideo';
import { careersContent } from '@/lib/content/careers';
import JobCard from './_components/JobCard';
import { getHreflangAlternates } from '@/lib/seo-metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const content = careersContent[lang] ?? careersContent.en;

  return {
    title: content.title,
    description: content.description,
    alternates: getHreflangAlternates('/careers', lang),
  };
}

export default async function CareersPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  const content = careersContent[lang] ?? careersContent.en;

  let jobs: Job[] = [];
  try {
    const resp = await makeGETRequest<Job[]>('/jobs');
    jobs = resp?.data.filter((job: Job) => job.published) ?? [];
  } catch (err) {
    console.error('Failed to fetch jobs', err);
    jobs = [];
  }

  return (
    <Fragment>
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
              {content.title}
            </h1>
            <p className="mt-4 text-lg text-white md:text-xl drop-shadow-md">
              {content.description}
            </p>
            <div className="mt-8">
              <Button
                href="#open-positions"
                variant="accent"
                size="lg"
                className="uppercase"
              >
                {content.applyNow}
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
              {content.ourOpenPositions}
            </h2>
            <p className="mt-2 text-[#6B7280]">
              {content.exploreOpenRolesDescription}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 h-[40dvh] flex flex-col items-center justify-center">
                <p className='text-lg font-medium'>{content.noOpenPositions}</p>
                <p className='text-sm text-gray-500'>{content.pleaseCheckBackLater}</p>
              </div>
            ) : (
              jobs.map((job) => (
                <JobCard key={job.id} job={job} lang={lang} />
              ))
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
}
