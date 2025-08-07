'use client'

import useTranslation from '@/hooks/useTranslation';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useRef, useState } from 'react'

export default function Audio({ audio }: { audio: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElement = useRef<HTMLAudioElement>(null);

  const { data: pause } = useTranslation('Pause')
  const { data: listen } = useTranslation('Listen')

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioElement.current?.pause();
      return;
    } else {
      setIsPlaying(true);
      audioElement.current?.play();
    }
  }

  useEffect(() => {
    audioElement.current?.addEventListener('ended', () => {
      setIsPlaying(false);
    });
  }, []);

  return (
    <div
      className="flex items-center gap-1 cursor-pointer bg-primary text-white px-2 pr-4 py-1 rounded-full transition-all duration-300"
      onClick={handlePlay}
      aria-label="Play audio"
    >
      <audio src={audio} ref={audioElement} hidden />
      {isPlaying ? (
        <Icon icon="mdi:pause" className="text-base" />
      ) : (
        <Icon icon="mdi:play" className="text-base" />
      )}
      <p className="text-xs font-medium">
        {isPlaying ? pause?.text || 'Pause' : listen?.text || 'Listen'}
      </p>
    </div>
  )
}
