'use client'

import dynamic from 'next/dynamic'

const CountUp = dynamic(() => import('./CountUp'), {
  loading: () => <span>0</span>,
  ssr: false
})

export default CountUp
