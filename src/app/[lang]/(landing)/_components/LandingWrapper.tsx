import AnimatedLandingSection from './AnimatedLandingSection'
import LandingSection from './LandingSection'
import { HomePage } from '@/types/sanity.types'

type LandingWrapperProps = {
  data: HomePage
  isAnimatedSectionActive: boolean
}

export default async function LandingWrapper({ data, isAnimatedSectionActive }: LandingWrapperProps) {
  return (
    isAnimatedSectionActive ? (
      <AnimatedLandingSection data={data} />
    ) : (
      <LandingSection data={data} />
    )
  )
}
