import { Locale } from "@/lib/i18n-config";
import { client } from "@/lib/sanity/client";
import { Navigation } from "@/types/sanity.types";
import ClientHeader from "./ClientHeader";

export default async function Header(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;
  const data = await client.fetch<Navigation>(`*[_type == "navigation" && language == $lang][0]`, { lang }, { cache: 'no-store' });

  return (
    <ClientHeader lang={lang} navigationData={data} />
  )
}