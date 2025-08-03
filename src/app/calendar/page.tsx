'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Icon } from '@iconify/react'

interface CalendarEvent {
  subject: string
  date: string
  joinUrl: string
}

function CalendarContent() {
  const searchParams = useSearchParams()
  const [event, setEvent] = useState<CalendarEvent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const subject = searchParams.get('subject')
    const date = searchParams.get('date')
    const joinUrl = searchParams.get('joinurl')

    if (subject && date && joinUrl) {
      setEvent({
        subject: decodeURIComponent(subject),
        date: decodeURIComponent(date),
        joinUrl: decodeURIComponent(joinUrl)
      })
    }
    setIsLoading(false)
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Loading Calendar Event</h1>
          <p className="text-gray-600">Preparing your calendar options...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Calendar Event</h1>
          <p className="text-gray-600">Missing required parameters</p>
          <p className="text-sm text-gray-500 mt-2">
            Required: subject, date, joinurl
          </p>
        </div>
      </div>
    )
  }

  const formatDateForGoogle = (dateStr: string) => {
    const date = new Date(dateStr)
    const endDate = new Date(date.getTime() + 60 * 60 * 1000) // 1 hour later
    
    return {
      start: date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''),
      end: endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
    }
  }

  const formatDateForOutlook = (dateStr: string) => {
    const date = new Date(dateStr)
    const endDate = new Date(date.getTime() + 60 * 60 * 1000) // 1 hour later
    
    return {
      start: date.toISOString(),
      end: endDate.toISOString()
    }
  }

  const formatDateForYahoo = (dateStr: string) => {
    const date = new Date(dateStr)
    const endDate = new Date(date.getTime() + 60 * 60 * 1000) // 1 hour later
    
    return {
      start: date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''),
      end: endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
    }
  }

  const generateGoogleCalendarUrl = () => {
    const { start, end } = formatDateForGoogle(event.date)
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.subject,
      dates: `${start}/${end}`,
      details: `Webinar: Vermögen schützen & steuerfrei investieren: ${event.joinUrl}`,
      location: event.joinUrl
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  const generateOutlookCalendarUrl = () => {
    const { start, end } = formatDateForOutlook(event.date)
    const params = new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: event.subject,
      startdt: start,
      enddt: end,
      body: `Webinar: Vermögen schützen & steuerfrei investieren: ${event.joinUrl}`,
      location: event.joinUrl
    })
    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
  }

  const generateYahooCalendarUrl = () => {
    const { start, end } = formatDateForYahoo(event.date)
    const params = new URLSearchParams({
      v: '60',
      title: event.subject,
      st: start,
      et: end,
      desc: `Webinar: Vermögen schützen & steuerfrei investieren: ${event.joinUrl}`,
      in_loc: event.joinUrl
    })
    return `https://calendar.yahoo.com/?${params.toString()}`
  }

  const generateICalData = () => {
    const date = new Date(event.date)
    const endDate = new Date(date.getTime() + 60 * 60 * 1000) // 1 hour later
    
    const icalContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//HIBARR//Calendar Event//EN',
      'BEGIN:VEVENT',
      `DTSTART:${date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
      `DTEND:${endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
      `SUMMARY:${event.subject}`,
      `DESCRIPTION:Webinar: Vermögen schützen & steuerfrei investieren: ${event.joinUrl}`,
      `LOCATION:${event.joinUrl}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    return `data:text/calendar;charset=utf8,${encodeURIComponent(icalContent)}`
  }

  const downloadICal = () => {
    const link = document.createElement('a')
    link.href = generateICalData()
    
    // Format date for filename
    const eventDate = new Date(event.date)
    const dateStr = eventDate.toISOString().split('T')[0] // YYYY-MM-DD format
    
    // Create filename with date
    const sanitizedSubject = event.subject.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    const filename = `${sanitizedSubject}_${dateStr}.ics`
    
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const calendarButtons = [
    {
      name: 'Google Calendar',
      icon: 'logos:google-calendar',
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => window.open(generateGoogleCalendarUrl(), '_blank')
    },
    {
      name: 'Outlook Calendar',
      icon: 'vscode-icons:file-type-outlook',
      color: 'bg-blue-400 hover:bg-blue-500',
      onClick: () => window.open(generateOutlookCalendarUrl(), '_blank')
    },
    {
      name: 'Yahoo Calendar',
      icon: 'ion:logo-yahoo',
      color: 'bg-[#6400CD] hover:bg-purple-600',
      onClick: () => window.open(generateYahooCalendarUrl(), '_blank')
    },
    {
      name: 'Download iCal',
      icon: 'mdi:calendar-download',
      color: 'bg-primary hover:bg-primary/80',
      onClick: downloadICal
    }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <Calendar className="mx-auto h-12 w-12 text-blue-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Add to Calendar</h1>
          <p className="text-gray-600">Choose your preferred calendar</p>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {event.subject}
              </h2>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{new Date(event.date).toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Zoom</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {calendarButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg text-white font-medium transition-colors duration-200 ${button.color} cursor-pointer`}
            >
              <Icon icon={button.icon} className="w-5 h-5" />
              <span>{button.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Loading Calendar Event</h1>
        <p className="text-gray-600">Preparing your calendar options...</p>
      </div>
    </div>
  )
}

export default function CalendarPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CalendarContent />
    </Suspense>
  )
}
