'use client'

import Image from 'next/image'
import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ThreeDBook from '@/components/ThreeDBook';


export default function WaitlistThankYouPage() {
  const router = useRouter()

  const redirectToWaitlist = useCallback(() => {
    router.push('/waitlist');
  }, [router]);

  useEffect(() => {
    const waitlistFormData = localStorage.getItem('waitlist-form-data')
    const formData = waitlistFormData ? JSON.parse(waitlistFormData) : null

    if (!formData) {
      redirectToWaitlist();
    }
  }, [redirectToWaitlist])

  return (
    <section id='hero' className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-10 grid place-items-center place-content-center min-h-screen bg-gradient-to-b from-primary via-primary/80 to-transparent">
      <div className='absolute inset-0 w-full h-full -z-10'>
        <Image src="/images/webinar-registration-background.webp" alt="Waitlist Hero" fill className='w-full h-full object-cover absolute' />
      </div>

      <div className="max-w-xl text-center flex flex-col gap-4 px-8 bg-secondary p-6 rounded-lg header-offset">
        <div className='flex flex-col gap-2'>
          <h3 className="text-3xl font-semibold text-primary">
            You will receive an email shortly to join the waitlist
          </h3>
          <p className='text-primary'>in the mean time, check out our Ultimate Cyprus Investment Guide</p>
        </div>

        <div className="relative w-full h-[450px] flex items-center justify-center p-2">
          <div className="relative w-full h-full p-1 rounded-lg overflow-hidden">
            <Image src="/images/freebie-book-background.jpg" alt="Book Background" fill sizes="100%" className="object-cover object-top blur-sm " />
          </div>
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <ThreeDBook />
          </div>
        </div>
        <Button variant='accent' className='w-full'>Download Guide</Button>
        {/* <FreebieForm data={data.freebieSignupSection} postSubmissionPath='/' /> */}
      </div>
    </section>
  )
}
