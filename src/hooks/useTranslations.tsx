import { useParams } from 'next/navigation';

export default function useTranslations() {
  const params = useParams();
  const lang = params.lang as string;

  const t = async (text: string) => {
    return text;
  }

  return t;
}