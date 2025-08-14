import { Suspense } from "react";
import VideoArchiveForm from "./_components/VideoArchiveForm";

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
