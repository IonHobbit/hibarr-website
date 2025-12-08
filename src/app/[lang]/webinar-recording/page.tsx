import { Suspense } from "react";
import VideoArchiveForm from "./_components/VideoArchiveForm";
import { Metadata } from "next";

import { generateSEOMetadata } from "@/lib/utils";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return generateSEOMetadata(undefined, {
    title: 'Webinar Recording | HIBARR',
    description: 'Watch the recording of our exclusive North Cyprus investment webinar.',
  }, lang)
}

export default async function VideoArchive() {
  return (
    <SuspendedVideoArchiveForm />
  );
}

const SuspendedVideoArchiveForm = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className='bg-primary/20 overflow-x-hidden'>
        <VideoArchiveForm />
      </section>
    </Suspense>
  );
} 
