import { Locale } from "@/lib/i18n-config";
import { fetchSanityData } from "@/lib/sanity/client";
import { Navigation } from "@/types/sanity.types";
import ClientHeader from "./ClientHeader";

type HeaderProps = {
  params: Promise<{ lang: Locale }>;
}

export const revalidate = 60;

export default async function Header(props: HeaderProps) {
  const { lang } = await props.params;
  const data = await fetchSanityData<Navigation>(`*[_type == "navigation" && language == $lang][0]`, { lang });

  return (
    <ClientHeader lang={lang} navigationData={data} />
  )
}