import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type ParamPayload = {
  key: string;
  value: string | number | boolean;
}
export default function useURL() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (payload: ParamPayload | ParamPayload[], path?: string, options?: NavigateOptions) => {
    const params = new URLSearchParams(searchParams)
    if (Array.isArray(payload)) {
      payload.forEach(({ key, value }) => {
        if (value) {
          params.set(key, value.toString())
        } else {
          params.delete(key)
        }
      })
    } else {
      const { key, value } = payload;
      if (value) {
        params.set(key, value.toString())
      } else {
        params.delete(key)
      }
    }
    replace(`${path ?? pathname}?${params.toString()}`, options);
  }

  const replaceParams = (payload: ParamPayload | ParamPayload[], path?: string, options?: NavigateOptions) => {
    const params = new URLSearchParams()
    if (Array.isArray(payload)) {
      payload.forEach(({ key, value }) => {
        params.set(key, value.toString())
      })
    } else {
      params.set(payload.key, payload.value.toString())
    }
    replace(`${path ?? pathname}?${params.toString()}`, options);
  }

  const clearParams = (options?: NavigateOptions) => {
    replace(pathname, options);
  }

  const wrapWithLocale = (path: string) => {
    // Check if the pathname starts with a locale (e.g., /en, /de, /fr, etc.)
    // Assuming locale is always two lowercase letters at the start of the path
    const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
    if (localeMatch) {
      // If locale is present, insert the path after the locale
      return `/${localeMatch[1]}/${path.replace(/^\/+/, '')}`;
    }
    // If no locale, just append the path
    return `/${path.replace(/^\/+/, '')}`;
  }

  return { searchParams, updateParams, replaceParams, clearParams, wrapWithLocale }
}