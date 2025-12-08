'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { usePostHog } from 'posthog-js/react';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function WebVitals() {
  const posthog = usePostHog();

  useReportWebVitals((metric) => {
    // Send to PostHog
    if (posthog) {
      posthog.capture('web_vitals', metric);
    }
    
    // Send to GTM
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'web-vitals', ...metric });
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(metric);
    }
  });

  return null;
}
