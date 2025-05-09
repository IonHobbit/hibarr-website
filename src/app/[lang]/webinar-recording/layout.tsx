import { Metadata } from 'next'
import { generateSEOMetadata } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata(undefined, { title: 'Video Archive' })
}

export default function BankingPackagesLayout({ children }: { children: React.ReactNode }) {
  return children
}