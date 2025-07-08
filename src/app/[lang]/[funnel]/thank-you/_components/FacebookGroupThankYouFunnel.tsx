'use client';

import { Button } from '@/components/ui/button';
import { StorageKey } from '@/lib/storage.util';
import storage from '@/lib/storage.util';
import useTranslation from '@/hooks/useTranslation';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';

export default function FacebookGroupThankYouFunnel() {

  const isBookedConsultation = storage.get<boolean>(StorageKey.BOOKED_CONSULTATION);

  const { data: title } = useTranslation('You are in!');
  const { data: subtitle } = useTranslation('We will send you an email shortly to confirm your Facebook Group membership.');
  const { data: nextStepsTitle } = useTranslation('What happens next');
  const { data: facebookGroupConfirmation } = useTranslation('Check your email for Facebook Group confirmation');
  const { data: nextWebinar } = useTranslation('You will be notified when the next webinar is scheduled.');
  const { data: bookConsultation } = useTranslation('Book a consultation');
  const { data: returnHome } = useTranslation('Return home');

  return (
    <div className='flex flex-col items-center gap-4 rounded-lg overflow-hidden border-[0.5px] max-w-sm'>
      <div className='flex flex-col items-center gap-2 bg-green-50 p-5 w-full'>
        <div className='rounded-lg bg-white p-2'>
          <Icon icon="mdi:list-status" className='size-9 text-green-600' />
        </div>
        <div className='flex flex-col items-center gap-2'>
          <h4 className='text-2xl font-semibold text-center'>{title?.text || 'You are in!'}</h4>
          <p className='text-center text-sm font-medium'>{subtitle?.text || 'We will send you an email shortly to confirm your Facebook Group membership.'}</p>
        </div>
      </div>
      <div className='flex flex-col items-center gap-4 w-full px-5 pb-5'>
        <div className='w-full overflow-hidden rounded flex flex-col gap-2 border-[0.5px]'>
          <div className="flex py-1.5 px-4 bg-gray-50">
            <p className='text-sm font-medium text-center'>{nextStepsTitle?.text || 'What happens next'}</p>
          </div>
          <div className='flex flex-col gap-2 px-4 pb-4'>
            <p className='text-xs'>- {facebookGroupConfirmation?.text || 'Check your email for Facebook Group confirmation'}</p>
            <p className='text-xs'>- {nextWebinar?.text || 'You will be notified when the next webinar is scheduled.'}</p>
          </div>
        </div>
        {!isBookedConsultation && (
          <Button className='w-full' asChild>
            <Link href={`/consultation`}>
              {bookConsultation?.text || 'Book a consultation'}
            </Link>
          </Button>
        )}
        <Button className='w-full' variant='ghost' asChild>
          <Link href="/" className='flex items-center justify-center'>
            <Icon icon="" className='size-4 mr-2' />
            {returnHome?.text || 'Return home'}
          </Link>
        </Button>
      </div>
    </div>
  )
}
