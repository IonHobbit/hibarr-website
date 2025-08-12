import { Locale } from "@/lib/i18n-config";
import { fetchSanityData } from "@/lib/third-party/sanity.client";
import { Footer as FooterType } from "@/types/sanity.types";
import ClientFooter from "./ClientFooter";

export default async function Footer(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  const data = await fetchSanityData<FooterType>(`*[_type == "footer"][0]`, { lang });

  return (
    <ClientFooter lang={lang} footerData={data} />
  )
}
