import { Button } from '@/components/ui/button';
import Video from '@/components/Video';
import { client } from '@/lib/sanity/client'
import storage, { StorageKey } from '@/lib/storage.util';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link';

export default function ConsultationThankYouFunnel() {
  const currentDate = new Date();
  const consultationDate = new Date(currentDate.setDate(currentDate.getDate() + 1));

  const { data } = useQuery({
    queryKey: ['next-webinar-date'],
    queryFn: () => client.fetch(`*[_type == "webinarPage" && language == "en"][0]{ "date": webinarInformationSection.date }`)
  })

  const isRegisteredForWebinar = storage.get<boolean>(StorageKey.REGISTERED_WEBINAR);
  const isRegisteredForWaitlist = storage.get<boolean>(StorageKey.REGISTERED_WAITLIST);

  const nextWebinarDate = new Date(data?.date);

  const isWebinarBeforeConsultation = nextWebinarDate > new Date() && nextWebinarDate < consultationDate;

  return (
    <div className='flex flex-col lg:flex-row items-center gap-6 max-w-screen-lg mx-auto'>
      <Video src='https://vz-da4cd036-d13.b-cdn.net/94d83fce-96d4-4981-97b9-22f6466a5ff9/play_720p.mp4' />
      <div className='flex flex-col shrink-0 items-center gap-4 rounded-lg overflow-hidden border-[0.5px] max-w-sm'>
        <div className='flex flex-col items-center gap-2 bg-green-50 p-5 w-full'>
          <div className='rounded-lg bg-white p-2'>
            <Icon icon="mdi:calendar-check" className='size-9 text-green-600' />
          </div>
          <div className='flex flex-col items-center gap-2'>
            <h4 className='text-2xl font-semibold text-center'>Consultation confirmed!</h4>
            <p className='text-center text-sm font-medium'>Thank you for booking your consultation with us. We are looking forward to meeting you.</p>
          </div>
        </div>
        <div className='flex flex-col items-center gap-4 w-full px-5 pb-5'>
          <div className='w-full rounded overflow-hidden flex flex-col gap-2 border-[0.5px]'>
            <div className="flex p-2 px-4 bg-gray-100">
              <p className='text-sm font-medium text-center'>What happens next:</p>
            </div>
            <div className='flex flex-col gap-2 px-4 pb-4'>
              <p className='text-xs'>- Check your email for the meeting details.</p>
              <p className='text-xs'>- The meeting will be recorded for you to watch later.</p>
            </div>
          </div>
          {(isWebinarBeforeConsultation && !isRegisteredForWebinar) && (
            <Button className='w-full' asChild>
              <Link href={`/webinar`}>
                Register for our next webinar
              </Link>
            </Button>
          )}
          {((!isWebinarBeforeConsultation || isRegisteredForWebinar) && !isRegisteredForWaitlist) && (
            <Button className='w-full' asChild>
              <Link href={`/waitlist`}>
                Register for the waitlist (Facebook Group)
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
