'use client'

import { useEffect } from 'react'

interface PerformanceMonitorProps {
  onMetrics?: (metrics: {
    fcp: number
    lcp: number
    fid: number
    cls: number
    ttfb: number
  }) => void
}

export default function PerformanceMonitor({ onMetrics }: PerformanceMonitorProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const fcp = entries[0] as PerformanceEntry
      if (fcp && onMetrics) {
        onMetrics({ fcp: fcp.startTime, lcp: 0, fid: 0, cls: 0, ttfb: 0 })
      }
    })

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lcp = entries[entries.length - 1] as PerformanceEntry
      if (lcp && onMetrics) {
        onMetrics({ fcp: 0, lcp: lcp.startTime, fid: 0, cls: 0, ttfb: 0 })
      }
    })

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const fid = entries[0] as PerformanceEntry & { processingStart: number }
      if (fid && onMetrics) {
        onMetrics({ fcp: 0, lcp: 0, fid: fid.processingStart - fid.startTime, cls: 0, ttfb: 0 })
      }
    })

    // Cumulative Layout Shift
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      for (const entry of entries) {
        const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value
        }
      }
      if (onMetrics) {
        onMetrics({ fcp: 0, lcp: 0, fid: 0, cls: clsValue, ttfb: 0 })
      }
    })

    // Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigationEntry && onMetrics) {
      onMetrics({ 
        fcp: 0, 
        lcp: 0, 
        fid: 0, 
        cls: 0, 
        ttfb: navigationEntry.responseStart - navigationEntry.requestStart 
      })
    }

    try {
      fcpObserver.observe({ entryTypes: ['paint'] })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      fidObserver.observe({ entryTypes: ['first-input'] })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    } catch (error) {
      console.warn('Performance monitoring not supported:', error)
    }

    return () => {
      fcpObserver.disconnect()
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
    }
  }, [onMetrics])

  return null
}

