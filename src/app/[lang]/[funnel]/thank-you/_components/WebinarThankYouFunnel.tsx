'use client'

import { Button } from '@/components/ui/button';
import Video from '@/components/Video';
import useTranslation from '@/hooks/useTranslation';
import { fetchSanityData } from '@/lib/third-party/sanity.client';
import storage from '@/lib/storage.util';
import { StorageKey } from '@/lib/storage.util';
import { Icon } from '@/components/icons';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function WebinarThankYouFunnel() {

  const { data } = useQuery({
    queryKey: ['next-webinar-date'],
    queryFn: () => fetchSanityData<{ date: string }>(`*[_type == "webinarPage" && language == "en"][0]{ "date": webinarInformationSection.date }`)
  })

  const nextWebinarDate = data?.date ? new Date(data.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : null;

  const isBookedConsultation = storage.get<boolean>(StorageKey.BOOKED_CONSULTATION);
  const isRegisteredForWaitlist = storage.get<boolean>(StorageKey.REGISTERED_WAITLIST);

  const { data: title, isLoading: isLoadingTitle } = useTranslation('You are registered!')
  const { data: subtitle, isLoading: isLoadingSubtitle } = useTranslation('Join us on Tuesday, {nextWebinarDate}')
  const { data: nextStepsTitle, isLoading: isLoadingNextStepsTitle } = useTranslation('What happens next')
  const { data: emailConfirmation, isLoading: isLoadingEmailConfirmation } = useTranslation('Calendar invite sent to your email')
  const { data: prepareQuestions, isLoading: isLoadingPrepareQuestions } = useTranslation('Prepare your questions for the Q&A session')
  const { data: testAudio, isLoading: isLoadingTestAudio } = useTranslation('Join 5 minutes early to test your audio')
  const { data: bookConsultation, isLoading: isLoadingBookConsultation } = useTranslation('Book a consultation')
  const { data: joinFacebookGroup, isLoading: isLoadingJoinFacebookGroup } = useTranslation('Join the Facebook Group')
  const { data: returnHome, isLoading: isLoadingReturnHome } = useTranslation('Return home')

  const isLoading = isLoadingTitle || isLoadingSubtitle || isLoadingNextStepsTitle || isLoadingEmailConfirmation || isLoadingPrepareQuestions || isLoadingTestAudio || isLoadingBookConsultation || isLoadingJoinFacebookGroup || isLoadingReturnHome;

  return (
    <div className='flex flex-col lg:flex-row items-center gap-6 max-w-screen-lg mx-auto'>
      <Video
        hls
        src='https://vz-da4cd036-d13.b-cdn.net/94d83fce-96d4-4981-97b9-22f6466a5ff9/playlist.m3u8'
        fallbackMp4='https://vz-da4cd036-d13.b-cdn.net/94d83fce-96d4-4981-97b9-22f6466a5ff9/play_720p.mp4'
      />
      {isLoading ? (
        <div className='flex items-center justify-center w-full'>
          <Icon icon="ri:loader-4-line" className="size-8 text-black animate-spin" />
        </div>
      ) : (
        <div className='flex flex-col shrink-0 items-center gap-4 rounded-lg overflow-hidden border-[0.5px] max-w-sm'>
          <div className='flex flex-col items-center gap-2 bg-green-50 p-5 w-full'>
            <div className='rounded-lg bg-white p-2'>
              <Icon icon="mdi:movie-edit-outline" className='size-9 text-green-600' />
            </div>
            <div className='flex flex-col items-center gap-2'>
              <h4 className='text-2xl font-semibold text-center'>{title?.text}</h4>
              <p className='text-center text-sm font-medium'>{subtitle?.text.replace('{nextWebinarDate}', nextWebinarDate || '')}</p>
            </div>
          </div >
          <div className='flex flex-col items-center gap-4 w-full px-5 pb-5'>
            <div className='w-full overflow-hidden rounded flex flex-col gap-2 border-[0.5px]'>
              <div className="flex py-1.5 px-4 bg-gray-50">
                <p className='text-sm font-medium text-center'>{nextStepsTitle?.text}</p>
              </div>
              <div className='flex flex-col gap-2 px-4 pb-4'>
                <p className='text-xs'>- {emailConfirmation?.text}</p>
                <p className='text-xs'>- {prepareQuestions?.text}</p>
                <p className='text-xs'>- {testAudio?.text}</p>
              </div>
            </div>
            {!isBookedConsultation && (
              <Button className='w-full' asChild>
                <Link href={`/consultation`}>
                  {bookConsultation?.text}
                </Link>
              </Button>
            )}
            {!isRegisteredForWaitlist && (
              <Button variant='accent' className='w-full' asChild>
                <Link href={`/facebook-group`}>
                  {joinFacebookGroup?.text}
                </Link>
              </Button>
            )}
            <Button className='w-full' variant='ghost' asChild>
              <Link href="/" className='flex items-center justify-center'>
                <Icon icon="" className='size-4 mr-2' />
                {returnHome?.text}
              </Link>
            </Button>
          </div>
        </div >
      )}
    </div >
  )
}
