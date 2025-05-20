import { Button } from '@/components/ui/button';
import Video from '@/components/Video';
import { client } from '@/lib/sanity/client';
import storage from '@/lib/storage.util';
import { StorageKey } from '@/lib/storage.util';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function WebinarThankYouFunnel() {

  const { data } = useQuery({
    queryKey: ['next-webinar-date'],
    queryFn: () => client.fetch(`*[_type == "webinarPage" && language == "en"][0]{ "date": webinarInformationSection.date }`)
  })

  const nextWebinarDate = new Date(data?.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const isBookedConsultation = storage.get<boolean>(StorageKey.BOOKED_CONSULTATION);
  const isRegisteredForWaitlist = storage.get<boolean>(StorageKey.REGISTERED_WAITLIST);

  return (
    <div className='flex flex-col lg:flex-row items-center gap-6 max-w-screen-lg mx-auto'>
      <Video src='https://vz-da4cd036-d13.b-cdn.net/94d83fce-96d4-4981-97b9-22f6466a5ff9/play_720p.mp4' />
      <div className='flex flex-col shrink-0 items-center gap-4 rounded-lg overflow-hidden border-[0.5px] max-w-sm'>
        <div className='flex flex-col items-center gap-2 bg-green-50 p-5 w-full'>
          <div className='rounded-lg bg-white p-2'>
            <Icon icon="mdi:movie-edit-outline" className='size-9 text-green-600' />
          </div>
          <div className='flex flex-col items-center gap-2'>
            <h4 className='text-2xl font-semibold text-center'>You are registered!</h4>
            <p className='text-center text-sm font-medium'>Join us on Tuesday, {nextWebinarDate}</p>
          </div>
        </div>
        <div className='flex flex-col items-center gap-4 w-full px-5 pb-5'>
          <div className='w-full overflow-hidden rounded flex flex-col gap-2 border-[0.5px]'>
            <div className="flex py-1.5 px-4 bg-gray-50">
              <p className='text-sm font-medium text-center'>What happens next</p>
            </div>
            <div className='flex flex-col gap-2 px-4 pb-4'>
              <p className='text-xs'>- Calendar invite sent to your email</p>
              <p className='text-xs'>- Prepare your questions for the Q&A session</p>
              <p className='text-xs'>- Join 5 minutes early to test your audio</p>
            </div>
          </div>
          {!isBookedConsultation && (
            <Button className='w-full' asChild>
              <Link href={`/consultation`}>
                Book a consultation
              </Link>
            </Button>
          )}
          {!isRegisteredForWaitlist && (
            <Button variant='accent' className='w-full' asChild>
              <Link href={`/waitlist`}>
                Join the waitlist
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
    </div>
  )
}
