'use client'

import useSource from '@/hooks/useSource';
import { Fragment, useEffect } from 'react'

const SOURCE_COLORS = {
  'alpha-cash': {
    primary: 'oklch(0.2998 0.0282 152.73)',
    accent: 'oklch(0.7531 0.1293 90.57)',
    foreground: 'oklch(1 0 0)'
  },
  // Add more themes as needed
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const source = useSource();

  useEffect(() => {
    if (source && SOURCE_COLORS[source as keyof typeof SOURCE_COLORS]) {
      const colors = SOURCE_COLORS[source as keyof typeof SOURCE_COLORS]
      document.documentElement.style.setProperty('--primary', colors.primary)
      document.documentElement.style.setProperty('--accent', colors.accent)
      document.documentElement.style.setProperty('color-scheme', source)
    }
  }, [source])

  return <Fragment>{children}</Fragment>
} 