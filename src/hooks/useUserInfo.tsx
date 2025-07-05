import { localeInfo } from '@/lib/i18n-config';
import { getUserInfo } from '@/lib/services/user.service';
import { useParams } from 'next/navigation';
import useURL from './useURL';

export default function useUserInfo() {
  const params = useParams();
  const { searchParams } = useURL();

  const lang = (params.lang as string) || 'en';
  const language = localeInfo[lang as keyof typeof localeInfo]?.name || localeInfo.en.name;

  const utm = {
    source: searchParams.get('utm_source') || '',
    medium: searchParams.get('utm_medium') || '',
    campaign: searchParams.get('utm_campaign') || '',
    content: searchParams.get('utm_content') || '',
    term: searchParams.get('utm_term') || '',
    audience: searchParams.get('utm_audience') || '',
  }

  const userInfo = getUserInfo();

  if (!userInfo) {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      language,
      utm
    }
  }

  return {
    ...userInfo,
    language,
    utm
  }
}
