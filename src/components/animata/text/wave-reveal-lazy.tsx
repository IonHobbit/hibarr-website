'use client'

import dynamic from 'next/dynamic'

const WaveReveal = dynamic(() => import('./wave-reveal'), {
  loading: () => <div className="text-xl sm:text-2xl md:text-6xl font-bold animate-pulse">Loading...</div>,
  ssr: false
})

export default WaveReveal
