'use client'

import { useMemo, Component, ReactNode } from "react"
import Image from "next/image"
import { InfiniteMovingCards } from "@/components/InfiniteMovingCards"
import { CloudinaryFile } from "@/lib/third-party/cloudinary.client"
import { Locale } from "@/lib/i18n-config"
import { featuredContent } from "@/lib/content/sections/featured"

type FeaturedSectionProps = {
  lang: Locale
  featuredLogos: CloudinaryFile[]
}

// Error Boundary to catch any crashes
class FeaturedSectionErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("FeaturedSection error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return null // Silently fail - don't show anything if there's an error
    }

    return this.props.children
  }
}

function FeaturedSectionContent({ lang, featuredLogos }: FeaturedSectionProps) {
  const content = featuredContent[lang] ?? featuredContent.en

  // Memoize the logo elements to prevent recreation on every render
  const logoElements = useMemo(() => {
    try {
      if (!featuredLogos || !Array.isArray(featuredLogos) || featuredLogos.length === 0) {
        return []
      }

      return featuredLogos
        .filter(item => {
          // Strict validation
          return (
            item &&
            typeof item === 'object' &&
            item.secure_url &&
            typeof item.secure_url === 'string' &&
            item.display_name &&
            typeof item.display_name === 'string'
          )
        })
        .slice(0, 20) // Limit to 20 logos max to prevent performance issues
        .map((item) => (
          <div
            key={item.secure_url}
            className="flex items-center justify-center relative w-40 h-20 flex-shrink-0"
          >
            <Image
              src={item.secure_url}
              alt={item.display_name}
              sizes="160px"
              fill
              loading="lazy"
              quality={75}
              onError={(e) => {
                // Hide image if it fails to load
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
              className="object-contain absolute grayscale hover:grayscale-0 transition-all duration-300 will-change-[filter]"
            />
          </div>
        ))
    } catch (error) {
      console.error("Error creating logo elements:", error)
      return []
    }
  }, [featuredLogos])

  // Don't render if no logos
  if (!logoElements || logoElements.length === 0) {
    return null
  }

  return (
    <section id="featured" className="section">
      <h3 className="text-3xl text-center">{content.title}</h3>
      <div className="relative w-full">
        <InfiniteMovingCards
          items={logoElements}
          speed="fast"
        />
      </div>
    </section>
  )
}

export default function FeaturedSection(props: FeaturedSectionProps) {
  return (
    <FeaturedSectionErrorBoundary>
      <FeaturedSectionContent {...props} />
    </FeaturedSectionErrorBoundary>
  )
}
