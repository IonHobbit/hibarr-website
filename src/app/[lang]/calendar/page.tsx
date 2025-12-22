import { getHreflangAlternates } from '@/lib/seo-metadata'
import { Metadata } from 'next'
import { Locale } from '@/lib/i18n-config'
import CalendarClientPage from './client-page'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Calendar',
    description: 'Schedule your appointment',
    alternates: getHreflangAlternates('/calendar', lang)
  }
}

export default function CalendarPage() {
  return <CalendarClientPage />
}
