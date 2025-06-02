'use client'

import { useEffect, useState, useRef } from 'react'

export default function BitrixForm() {
  const [mounted, setMounted] = useState(false)
  const [scriptError, setScriptError] = useState(false)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const loadScript = () => {
      try {
        if (scriptRef.current && scriptRef.current.parentNode) {
          scriptRef.current.parentNode.removeChild(scriptRef.current)
        }

        const script = document.createElement('script')
        scriptRef.current = script

        script.setAttribute('data-b24-form', 'inline/128/rrzj10')
        script.setAttribute('data-skip-moving', 'true')
        script.async = true
        script.defer = true
        script.src = 'https://cdn.bitrix24.de/b26123245/crm/form/loader_128.js'

        script.onerror = (error) => {
          console.warn('Bitrix24 form script failed to load:', error)
          setScriptError(true)
        }

        script.onload = () => {
          setScriptError(false)
        }

        const isolatedContainer = document.createElement('div')
        isolatedContainer.style.cssText = 'isolation: isolate; contain: content;'
        isolatedContainer.appendChild(script)
        
        if (containerRef.current) {
          containerRef.current.appendChild(isolatedContainer)
        }
      } catch (error) {
        console.error('Error loading Bitrix24 form script:', error)
        setScriptError(true)
      }
    }

    timeoutRef.current = setTimeout(() => {
      loadScript()
    }, 1000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current)
      }
    }
  }, [mounted])

  if (!mounted) {
    return (
      <div 
        className="w-full h-full min-h-[50vh] md:min-h-[45vh] p-8"
        suppressHydrationWarning
      />
    )
  }

  if (scriptError) {
    return (
      <div className="w-full h-full min-h-[50vh] md:min-h-[45vh] p-8 flex flex-col items-center justify-center text-center">
        <h3 className="text-xl font-medium mb-4">Form Loading Error</h3>
        <p className="text-muted-foreground mb-4">
          We&apos;re having trouble loading the form. This might be due to your browser&apos;s privacy settings or an ad blocker.
        </p>
        <p className="text-sm text-muted-foreground">
          Please try disabling your ad blocker or contact us directly at{' '}
          <a href="mailto:contact@hibarr.de" className="text-primary hover:underline">
            contact@hibarr.de
          </a>
        </p>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full min-h-[50vh] md:min-h-[45vh] p-8"
      suppressHydrationWarning
      style={{ isolation: 'isolate' }}
    />
  )
} 