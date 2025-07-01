import { localeInfo } from '@/lib/i18n-config';
import { getUserInfo } from '@/lib/services/user.service';
import { useParams } from 'next/navigation';

export default function useUserInfo() {
  const params = useParams();
  const lang = (params.lang as string) || 'en';
  const language = localeInfo[lang as keyof typeof localeInfo].name || localeInfo.en.name;

  const userInfo = getUserInfo();

  if (!userInfo) {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      language,
    }
  }

  return {
    ...userInfo,
    language,
  }
}
