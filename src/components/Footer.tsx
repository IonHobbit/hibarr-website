import { Locale } from "@/lib/i18n-config";
import { client } from "@/lib/sanity/client";
import { Footer as FooterType } from "@/types/sanity.types";
import ClientFooter from "./ClientFooter";

export default async function Footer(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const { lang } = await props.params;

  const data = await client.fetch<FooterType>(`*[_type == "footer"][0]`, { lang }, { cache: 'no-store' });

  return (
    <ClientFooter lang={lang} footerData={data} />
  )
}
