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

  return { searchParams, updateParams, replaceParams, clearParams }
}