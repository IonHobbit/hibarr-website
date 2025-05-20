import { Button } from '@/components/ui/button';
import { StorageKey } from '@/lib/storage.util';
import storage from '@/lib/storage.util';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';

export default function WaitlistThankYouFunnel() {

  const isBookedConsultation = storage.get<boolean>(StorageKey.BOOKED_CONSULTATION);

  return (
    <div className='flex flex-col items-center gap-4 rounded-lg overflow-hidden border-[0.5px] max-w-sm'>
      <div className='flex flex-col items-center gap-2 bg-green-50 p-5 w-full'>
        <div className='rounded-lg bg-white p-2'>
          <Icon icon="mdi:list-status" className='size-9 text-green-600' />
        </div>
        <div className='flex flex-col items-center gap-2'>
          <h4 className='text-2xl font-semibold text-center'>You are on the list!</h4>
          <p className='text-center text-sm font-medium'>We will notify you when the community is ready.</p>
        </div>
      </div>
      <div className='flex flex-col items-center gap-4 w-full px-5 pb-5'>
        <div className='w-full overflow-hidden rounded flex flex-col gap-2 border-[0.5px]'>
          <div className="flex py-1.5 px-4 bg-gray-50">
            <p className='text-sm font-medium text-center'>What happens next</p>
          </div>
          <div className='flex flex-col gap-2 px-4 pb-4'>
            <p className='text-xs'>- Check your email for waitlist confirmation</p>
            <p className='text-xs'>- You will be notified when the next webinar is scheduled.</p>
          </div>
        </div>
        {!isBookedConsultation && (
          <Button className='w-full' asChild>
            <Link href={`/consultation`}>
              Book a consultation
            </Link>
          </Button>
        )}
        <Button className='w-full' variant='ghost' asChild>
          <Link href="/" className='flex items-center justify-center'>
            <Icon icon="" className='size-4 mr-2' />
            Return home
          </Link>
        </Button>
      </div>
    </div>
  )
}
