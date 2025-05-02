import { client } from '@/lib/sanity/client'
import { generateSEOMetadata } from '@/lib/utils'
import { BankPackagesPage } from '@/types/sanity.types'

export async function generateMetadata() {
  const bankingPackages = await client.fetch<BankPackagesPage>(`*[_type == "bankPackagesPage"][0]{seo}`)

  return generateSEOMetadata(bankingPackages.seo)
}

export default function BankingPackagesLayout({ children }: { children: React.ReactNode }) {
  return children
}
