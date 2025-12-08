import { Suspense } from "react";
import VideoArchiveForm from "./_components/VideoArchiveForm";
import { Metadata } from "next";
import { getHreflangAlternates } from "@/lib/seo-metadata";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    alternates: getHreflangAlternates('/webinar-recording', lang)
  }
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
