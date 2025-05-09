import { Metadata } from 'next'
import { generateSEOMetadata } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata(undefined, { title: 'Hibarr Webinar Access Form' })
}

export default function BankingPackagesLayout({ children }: { children: React.ReactNode }) {
  return children
}