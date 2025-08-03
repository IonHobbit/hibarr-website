import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add to Calendar',
  description: 'Add our events and webinars to your calendar. Join our exclusive webinars on wealth protection and tax-free investments.',
  keywords: ['calendar', 'events', 'webinars', 'add to calendar', 'HIBARR', 'wealth protection', 'tax-free investment'],
  authors: [{ name: 'HIBARR Trading' }],
  creator: 'HIBARR Trading',
  publisher: 'HIBARR Trading',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hibarr.de/calendar',
    title: 'Add to Calendar',
    description: 'Add our events and webinars to your calendar. Join our exclusive webinars on wealth protection and tax-free investments.',
    siteName: 'HIBARR Trading',
    images: [
      {
        url: '/images/calendar-event-og.jpg',
        width: 1200,
        height: 630,
        alt: 'HIBARR Trading Calendar Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Add to Calendar',
    description: 'Add our events and webinars to your calendar. Join our exclusive webinars on wealth protection and tax-free investments.',
    images: ['/images/calendar-event-og.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  other: {
    'calendar:event_type': 'webinar',
    'calendar:provider': 'hibarr',
    'calendar:category': 'investment_education',
  },
}

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Schema.org structured data for calendar events */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Add to Calendar',
            description: 'Add our events and webinars to your calendar. Join our exclusive webinars on wealth protection and tax-free investments.',
            url: 'https://hibarr.de/calendar',
            mainEntity: {
              '@type': 'Event',
              name: 'HIBARR Trading Webinar',
              description: 'Webinar: Vermögen schützen & steuerfrei investieren',
              startDate: '2024-01-15T14:00:00Z',
              endDate: '2024-01-15T15:00:00Z',
              eventStatus: 'https://schema.org/EventScheduled',
              eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
              location: {
                '@type': 'VirtualLocation',
                url: 'https://zoom.us/j/123456789'
              },
              organizer: {
                '@type': 'Organization',
                name: 'HIBARR Trading',
                url: 'https://hibarr.de'
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                validFrom: '2024-01-01T00:00:00Z'
              }
            }
          })
        }}
      />

      {/* Preconnect to calendar services for faster loading */}
      <link rel="preconnect" href="https://calendar.google.com" />
      <link rel="preconnect" href="https://outlook.live.com" />
      <link rel="preconnect" href="https://calendar.yahoo.com" />

      {children}
    </>
  )
} 