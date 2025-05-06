'use client'

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Video from '@/components/Video';


export default function WaitlistThankYouPage() {
  const router = useRouter()

  const redirectToWebinar = useCallback(() => {
    router.push('/webinar');
  }, [router]);

  useEffect(() => {
    const waitlistFormData = localStorage.getItem('waitlist-form-data')
    const formData = waitlistFormData ? JSON.parse(waitlistFormData) : null

    if (!formData) {
      redirectToWebinar();
    }
  }, [redirectToWebinar])

  return (
    <section id='hero' className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-10 grid place-items-center place-content-center min-h-screen">
      <div className='flex flex-col items-center gap-4 max-w-screen-xl w-full'>
        <h1 className='text-4xl font-semibold text-primary'>THANK YOU!</h1>
        <div className="max-w-xl text-center flex flex-col gap-4 px-8 bg-secondary p-6 rounded-lg">
          <p className="text-3xl font-medium text-primary">
            You will receive an email to join the waitlist shortly
          </p>
        </div>
        {/* <div style={{ position: 'relative' }} className='w-full aspect-video'>
          <iframe src="https://iframe.mediadelivery.net/embed/380780/94d83fce-96d4-4981-97b9-22f6466a5ff9?autoplay=true&loop=false&muted=false&preload=false&responsive=true" loading="lazy" style={{ border: '0', position: 'absolute', top: '0', height: '100%', width: '100%' }} allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowFullScreen={true}></iframe>
        </div> */}
        <Video src='https://vz-da4cd036-d13.b-cdn.net/94d83fce-96d4-4981-97b9-22f6466a5ff9/play_720p.mp4' />
      </div>
    </section>
  )
}
