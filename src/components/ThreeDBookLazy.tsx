'use client'

import dynamic from 'next/dynamic'

const ThreeDBook = dynamic(() => import('@/components/ThreeDBook'), {
  loading: () => (
    <div className="w-full h-96 bg-muted rounded-lg animate-pulse flex items-center justify-center">
      <div className="text-muted-foreground">Loading 3D Book...</div>
    </div>
  ),
  ssr: false
})

export default ThreeDBook
