'use client'

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';

const ThreeDBook = dynamic(() => import('@/components/ThreeDBook'), {
  loading: () => (
    <div className="w-full h-96 bg-muted rounded-lg animate-pulse" />
  ),
  ssr: false
});
import useTranslation from '@/hooks/useTranslation';
import { StorageKey } from '@/lib/storage.util';
import storage from '@/lib/storage.util';
import { Icon } from '@/components/icons';
import Link from 'next/link';

export default function WaitlistThankYouFunnel() {

  const isRegisteredForWebinar = storage.get<boolean>(StorageKey.REGISTERED_WEBINAR);

  const { data: title, isLoading: isLoadingTitle } = useTranslation('Your eBook is ready!')
  const { data: subtitle, isLoading: isLoadingSubtitle } = useTranslation('We will send you an email with the download link shortly.')
  const { data: nextStepsTitle, isLoading: isLoadingNextStepsTitle } = useTranslation('What happens next')
  const { data: emailConfirmation, isLoading: isLoadingEmailConfirmation } = useTranslation('Check your email for the link to download the ebook')
  const { data: joinWebinar, isLoading: isLoadingJoinWebinar } = useTranslation('Join the webinar')
  const { data: bookConsultation, isLoading: isLoadingBookConsultation } = useTranslation('Book a consultation')
  const { data: returnHome, isLoading: isLoadingReturnHome } = useTranslation('Return home')

  const isLoading = isLoadingTitle || isLoadingSubtitle || isLoadingNextStepsTitle || isLoadingEmailConfirmation || isLoadingJoinWebinar || isLoadingBookConsultation || isLoadingReturnHome;

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-full'>
        <Icon icon="ri:loader-4-line" className="size-8 text-black animate-spin" />
      </div>
    )
  }

  return (
    <div className='flex flex-col lg:flex-row items-center gap-6 lg:gap-20 max-w-screen-lg w-full mx-auto'>
      <div className='w-4/6'>
        <ThreeDBook scale={0.8} />
      </div>
      <div className='flex flex-col items-center gap-4 rounded-lg overflow-hidden border-[0.5px] max-w-sm'>
        <div className='flex flex-col items-center gap-2 bg-green-50 p-5 w-full'>
          <div className='rounded-lg bg-white p-2'>
            <Icon icon="mdi:list-status" className='size-9 text-green-600' />
          </div>
          <div className='flex flex-col items-center gap-2'>
            <h4 className='text-2xl font-semibold text-center'>{title?.text}</h4>
            <p className='text-center text-sm font-medium'>{subtitle?.text}</p>
          </div>
        </div>
        <div className='flex flex-col items-center gap-4 w-full px-5 pb-5'>
          <div className='w-full overflow-hidden rounded flex flex-col gap-2 border-[0.5px]'>
            <div className="flex py-1.5 px-4 bg-gray-50">
              <p className='text-sm font-medium text-center'>{nextStepsTitle?.text}</p>
            </div>
            <div className='flex flex-col gap-2 px-4 pb-4'>
              <p className='text-xs'>{emailConfirmation?.text}</p>
            </div>
          </div>
          {!isRegisteredForWebinar && (
            <Button className='w-full' asChild>
              <Link href={`/webinar`}>
                {joinWebinar?.text}
              </Link>
            </Button>
          )}
          {isRegisteredForWebinar && (
            <Button className='w-full' asChild>
              <Link href={`/consultation`}>
                {bookConsultation?.text}
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
    </div>
  )
}
