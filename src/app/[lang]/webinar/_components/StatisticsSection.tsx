import CountUp from '@/components/bits/CountUp/CountUp'
import { WebinarPage } from '@/types/sanity.types'
import React from 'react'

type StatisticsSectionProps = {
  data: WebinarPage['statisticsSection']
}

export default function StatisticsSection({ data }: StatisticsSectionProps) {
  return (
    <section id='statistics' className='bg-primary bg-[url("/images/wave-background.webp")] bg-blend-overlay bg-cover bg-center'>
      <div className="sectiion grid place-items-center place-content-center gap-10 py-20 max-w-screen-md mx-auto">
        <h3 className='text-4xl text-primary-foreground text-center'>Unlocking Success in Exclusive Real Estate with Rabih Rabea</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {data?.map((statistic, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <p className="text-6xl font-semibold text-primary-foreground">
                {statistic.prefix && <span>{statistic.prefix}</span>}
                <CountUp from={0} to={statistic.number ?? 0} />
                {statistic.postfix && <span>{statistic.postfix}</span>}
              </p>
              <p className="text-sm md:text-base text-primary-foreground">{statistic.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
