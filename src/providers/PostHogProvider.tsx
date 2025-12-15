"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react"
import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      // Delay PostHog initialization slightly to reduce initial load impact on iOS
      const initTimer = setTimeout(() => {
        try {
          // Detect mobile devices for optimization
          const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          
          posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: "/ingest",
            ui_host: "https://eu.posthog.com",
            capture_pageview: false, // We capture pageviews manually
            capture_pageleave: true, // Enable pageleave capture
            debug: false,
            // Optimize for mobile performance - reduce batch size for mobile devices
            ...(isMobile && { batch_size: 5 }),
          })
        } catch (error) {
          // Silently fail if PostHog initialization fails to prevent crashes
          if (process.env.NODE_ENV === 'development') {
            console.error('PostHog initialization failed:', error);
          }
        }
      }, 100); // Small delay to let critical content load first

      return () => clearTimeout(initTimer);
    }
  }, [])

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      const search = searchParams.toString()
      if (search) {
        url += `?${search}`
      }
      posthog.capture("$pageview", { "$current_url": url })
    }

    const handlePageLeave = () => {
      posthog.capture("$pageleave")
    }

    window.addEventListener("beforeunload", handlePageLeave)

    return () => {
      window.removeEventListener("beforeunload", handlePageLeave)
    }
  }, [pathname, searchParams, posthog])
  return null
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}