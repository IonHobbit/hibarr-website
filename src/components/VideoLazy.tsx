'use client'

import dynamic from 'next/dynamic'

const Video = dynamic(() => import('@/components/Video'), {
  loading: () => <div className="w-full aspect-video bg-muted rounded-lg animate-pulse" />,
  ssr: false
})

export default Video
