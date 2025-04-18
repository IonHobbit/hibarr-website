import { useRouter } from 'next/navigation';
import useURL from './useURL';

export default function useRegistrationCheck() {

  const router = useRouter();
  const { searchParams } = useURL();
  const registration = searchParams.get('registration');

  const register = (path: string, hash?: string) => router.push(`${path}${hash ? `#${hash}` : ''}?registration=done`);

  const isRegistered = registration === 'done';

  return { isRegistered, register };
}
