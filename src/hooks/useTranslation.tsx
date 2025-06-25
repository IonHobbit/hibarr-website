import { useParams } from 'next/navigation';

import { useQuery } from "@tanstack/react-query";
import { fetchTranslation } from '@/lib/services/translation.service';

export default function useTranslation(text: string) {
  const params = useParams();
  const lang = (params.lang as string) || 'en';

  return useQuery({
    queryKey: ['translation', text, lang],
    queryFn: () => fetchTranslation(text, lang),
    enabled: Boolean(text),
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
  })
}