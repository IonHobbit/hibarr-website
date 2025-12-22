'use client'

import { Suspense } from 'react'
import CalendarContent from './_components/CalendarContent'
import useTranslation from '@/hooks/useTranslation'

function LoadingFallback() {

  const title = useTranslation('Loading Calendar Event')
  const description = useTranslation('Preparing your calendar options...')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">{title.data?.text || 'Loading Calendar Event'}</h1>
        <p className="text-gray-600">{description.data?.text || 'Preparing your calendar options...'}</p>
      </div>
    </div>
  )
}

export default function CalendarClientPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CalendarContent />
    </Suspense>
  )
}
