'use client';

import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div onClick={scrollToTop} className={cn("fixed bottom-4 right-4 md:bottom-16 md:right-16 size-10 bg-primary rounded-full flex items-center justify-center transition-all duration-700", isVisible ? 'opacity-100 cursor-pointer' : 'opacity-0 -z-50')}>
      <Icon icon="mdi:arrow-up" className="text-primary-foreground" />
    </div>
  )
}
