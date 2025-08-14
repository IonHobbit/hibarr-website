'use client'

import { Button } from '@/components/ui/button';
import Video from '@/components/Video';
import useTranslation from '@/hooks/useTranslation';
import { fetchSanityData } from '@/lib/third-party/sanity.client'
import storage, { StorageKey } from '@/lib/storage.util';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link';

export default function ConsultationThankYouFunnel() {
  const currentDate = new Date();
  const consultationDate = new Date(currentDate.setDate(currentDate.getDate() + 1));

  const { data } = useQuery({
    queryKey: ['next-webinar-date'],
    queryFn: () => fetchSanityData<{ date: string }>(`*[_type == "webinarPage" && language == "en"][0]{ "date": webinarInformationSection.date }`)
  })

  const isRegisteredForWebinar = storage.get<boolean>(StorageKey.REGISTERED_WEBINAR);
  const isRegisteredForWaitlist = storage.get<boolean>(StorageKey.REGISTERED_WAITLIST);

  const nextWebinarDate = data?.date ? new Date(data.date) : null;

  const isWebinarBeforeConsultation = nextWebinarDate && nextWebinarDate > new Date() && nextWebinarDate < consultationDate;

  const { data: title, isLoading: isLoadingTitle } = useTranslation('Consultation confirmed!')
  const { data: subtitle, isLoading: isLoadingSubtitle } = useTranslation('Thank you for booking your consultation with us. We are looking forward to meeting you.')
  const { data: nextStepsTitle, isLoading: isLoadingNextStepsTitle } = useTranslation('What happens next:')
  const { data: emailConfirmation, isLoading: isLoadingEmailConfirmation } = useTranslation('Check your email for the meeting details.')
  const { data: recordedMeeting, isLoading: isLoadingRecordedMeeting } = useTranslation('The meeting will be recorded for you to watch later.')
  const { data: registerForWebinar, isLoading: isLoadingRegisterForWebinar } = useTranslation('Register for our next webinar')
  const { data: joinFacebookGroup, isLoading: isLoadingJoinFacebookGroup } = useTranslation('Join the Facebook Group')
  const { data: returnHome, isLoading: isLoadingReturnHome } = useTranslation('Return home')

  const isLoading = isLoadingTitle || isLoadingSubtitle || isLoadingNextStepsTitle || isLoadingEmailConfirmation || isLoadingRecordedMeeting || isLoadingRegisterForWebinar || isLoadingJoinFacebookGroup || isLoadingReturnHome;

  return (
    <div className='flex flex-col lg:flex-row items-center gap-6 max-w-screen-lg mx-auto'>
      <Video src='https://vz-da4cd036-d13.b-cdn.net/94d83fce-96d4-4981-97b9-22f6466a5ff9/play_720p.mp4' />
      {isLoading ? (
        <div className='flex items-center justify-center w-full'>
          <Icon icon="ri:loader-4-line" className="size-8 text-black animate-spin" />
        </div>
      ) : (
        <div className='flex flex-col shrink-0 items-center gap-4 rounded-lg overflow-hidden border-[0.5px] max-w-sm'>
          <div className='flex flex-col items-center gap-2 bg-green-50 p-5 w-full'>
            <div className='rounded-lg bg-white p-2'>
              <Icon icon="mdi:calendar-check" className='size-9 text-green-600' />
            </div>
            <div className='flex flex-col items-center gap-2'>
              <h4 className='text-2xl font-semibold text-center'>{title?.text}</h4>
              <p className='text-center text-sm font-medium'>{subtitle?.text}</p>
            </div>
          </div>
          <div className='flex flex-col items-center gap-4 w-full px-5 pb-5'>
            <div className='w-full rounded overflow-hidden flex flex-col gap-2 border-[0.5px]'>
              <div className="flex p-2 px-4 bg-gray-100">
                <p className='text-sm font-medium text-center'>{nextStepsTitle?.text}</p>
              </div>
              <div className='flex flex-col gap-2 px-4 pb-4'>
                <p className='text-xs'>- {emailConfirmation?.text}</p>
                <p className='text-xs'>- {recordedMeeting?.text}</p>
              </div>
            </div>
            {(isWebinarBeforeConsultation && !isRegisteredForWebinar) && (
              <Button className='w-full' asChild>
                <Link href={`/webinar`}>
                  {registerForWebinar?.text}
                </Link>
              </Button>
            )}
            {((!isWebinarBeforeConsultation || isRegisteredForWebinar) && !isRegisteredForWaitlist) && (
              <Button className='w-full' asChild>
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
        </div>
      )}
    </div>
  )
}
