import { fetchSanityData } from '@/lib/third-party/sanity.client'
import { generateSEOMetadata } from '@/lib/utils'
import { BankPackagesPage } from '@/types/sanity.types'
import { Locale } from '@/lib/i18n-config'
import { Metadata } from 'next'

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const bankingPackages = await fetchSanityData<BankPackagesPage>(`*[_type == "bankPackagesPage" && language == $lang][0]{seo}`, { lang })

  return generateSEOMetadata(bankingPackages.seo)
}

export default function BankingPackagesLayout({ children }: { children: React.ReactNode }) {
  return children
}
