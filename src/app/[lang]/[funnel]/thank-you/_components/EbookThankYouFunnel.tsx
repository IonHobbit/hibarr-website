import ThreeDBook from '@/components/ThreeDBook';
import { Button } from '@/components/ui/button';
import { StorageKey } from '@/lib/storage.util';
import storage from '@/lib/storage.util';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';

export default function WaitlistThankYouFunnel() {

  const isRegisteredForWebinar = storage.get<boolean>(StorageKey.REGISTERED_WEBINAR);

  return (
    <div className='flex flex-col lg:flex-row items-center gap-6 max-w-screen-lg w-full mx-auto'>
      <div className='w-4/6'>
        <ThreeDBook scale={0.8} />
      </div>
      <div className='flex flex-col items-center gap-4 rounded-lg overflow-hidden border-[0.5px] max-w-sm'>
        <div className='flex flex-col items-center gap-2 bg-green-50 p-5 w-full'>
          <div className='rounded-lg bg-white p-2'>
            <Icon icon="mdi:list-status" className='size-9 text-green-600' />
          </div>
          <div className='flex flex-col items-center gap-2'>
            <h4 className='text-2xl font-semibold text-center'>Your eBook is ready!</h4>
            <p className='text-center text-sm font-medium'>We will send you an email with the download link shortly.</p>
          </div>
        </div>
        <div className='flex flex-col items-center gap-4 w-full px-5 pb-5'>
          <div className='w-full overflow-hidden rounded flex flex-col gap-2 border-[0.5px]'>
            <div className="flex py-1.5 px-4 bg-gray-50">
              <p className='text-sm font-medium text-center'>What happens next</p>
            </div>
            <div className='flex flex-col gap-2 px-4 pb-4'>
              <p className='text-xs'>- Check your email for the link to download the ebook</p>
            </div>
          </div>
          {!isRegisteredForWebinar && (
            <Button className='w-full' asChild>
              <Link href={`/webinar`}>
                Join the webinar
              </Link>
            </Button>
          )}
          {isRegisteredForWebinar && (
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
    </div>
  )
}
