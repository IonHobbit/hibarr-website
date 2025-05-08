import { client } from '@/lib/sanity/client'
import { generateSEOMetadata } from '@/lib/utils'
import { BankPackagesPage } from '@/types/sanity.types'
import { Locale } from '@/lib/i18n-config'
import { Metadata } from 'next'

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;

  return generateSEOMetadata()//undefined,(title:webinarPLayback)
}

export default function BankingPackagesLayout({ children }: { children: React.ReactNode }) {
  return children
}