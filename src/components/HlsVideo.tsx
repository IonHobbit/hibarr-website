"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import Hls from 'hls.js';
import { cn } from '@/lib/utils';

interface HlsVideoProps {
    src: string; // m3u8 manifest url
    poster?: string;
    className?: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    fallbackMp4?: string; // optional MP4 fallback
    preload?: 'auto' | 'metadata' | 'none';
}

const HlsVideo = ({
    src,
    poster,
    className,
    autoPlay = false,
    muted = false,
    loop = false,
    fallbackMp4,
    preload = 'auto'
    }: HlsVideoProps, forwardedRef: React.Ref<HTMLVideoElement>) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // Expose underlying video element to parent via ref
    useImperativeHandle(forwardedRef, () => videoRef.current as HTMLVideoElement, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let hls: Hls | undefined;
        let startupTimer: ReturnType<typeof setTimeout> | undefined;
        let fallbackUsed = false;

        const fallbackToMp4 = (reason: string) => {
            if (fallbackUsed) return; // ensure single execution
            fallbackUsed = true;
            if (!fallbackMp4) {
                console.warn('[HLS][Fallback] Requested but no fallbackMp4 provided. Reason:', reason);
                return;
            }
            console.warn('[HLS][Fallback] Activating fallback MP4. Reason:', reason);
            try {
                if (hls) {
                    hls.destroy();
                    hls = undefined;
                }
                video.removeAttribute('src');
                video.src = fallbackMp4;
                video.load();
                if (autoPlay) {
                    video.play().catch(err => console.debug('[HLS][Fallback] Autoplay blocked:', err));
                }
            } catch (e) {
                console.error('[HLS][Fallback] Failed to start fallback MP4', e);
            }
        };

        const clearStartupTimer = () => {
            if (startupTimer) clearTimeout(startupTimer);
            startupTimer = undefined;
        };

        const attachNativeErrorHandlers = () => {
            const onError = () => {
                const mediaError = (video.error && video.error.message) || video.error?.code;
                console.error('[HLS][Native] Video error event', mediaError);
                fallbackToMp4('native-video-error');
            };
            video.addEventListener('error', onError);
            return () => video.removeEventListener('error', onError);
        };

        let detachNativeError: (() => void) | undefined;
        let startLoadHandler: (() => void) | undefined;

        try {
            const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent);
            
            if (isIos || video.canPlayType('application/vnd.apple.mpegurl')) {
                console.debug('[HLS] Using native HLS');
                video.src = src;
                detachNativeError = attachNativeErrorHandlers();
            } else if (Hls.isSupported()) {
                console.debug('[HLS] Using hls.js for', src);
                hls = new Hls({
                    enableWorker: true,
                    lowLatencyMode: true,
                    backBufferLength: 60,
                    autoStartLoad: autoPlay || (video.preload !== 'none'),
                });

                if (!autoPlay && video.preload === 'none') {
                    startLoadHandler = () => {
                        if (hls && !fallbackUsed) {
                            console.debug('[HLS] Starting load on play');
                            hls.startLoad();
                        }
                    };
                    video.addEventListener('play', startLoadHandler);
                }

                hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                    console.debug('[HLS] Media attached');
                });
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    console.debug('[HLS] Manifest parsed');
                });
                hls.on(Hls.Events.ERROR, (event, data) => {
                    if (data.fatal) {
                         // Only log fatal errors, non-fatal are common and noisy
                         console.error('[HLS] Fatal Error event', data.type, data.details, data);
                    }
                    
                    if (data.type === Hls.ErrorTypes.NETWORK_ERROR && (
                        data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR ||
                        data.details === Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT ||
                        data.details === Hls.ErrorDetails.LEVEL_LOAD_ERROR
                    )) {
                        // Fallback immediately on manifest/level network errors
                        fallbackToMp4('manifest-or-level-network-error');
                        return;
                    }
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                // Initiate a retry for network errors
                                console.warn('[HLS] Fatal NETWORK_ERROR -> retrying startLoad');
                                hls?.startLoad();
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                console.warn('[HLS] Fatal MEDIA_ERROR -> attempting recoverMediaError');
                                hls?.recoverMediaError();
                                break;
                            default:
                                fallbackToMp4('fatal-unknown');
                        }
                    }
                });
                hls.loadSource(src);
                hls.attachMedia(video);
            } else {
                fallbackToMp4('no-hls-support');
            }

            // Startup timeout: if no metadata within 5s, fallback. 
            // Only strictly enforce this if we are auto-playing or preloading.
            // If preload is none, we shouldn't fallback just because it hasn't loaded yet.
            if (autoPlay || (video.preload !== 'none')) {
                startupTimer = setTimeout(() => {
                    if (!fallbackUsed && !video.duration && !video.currentTime) {
                        // Check currentTime as well, sometimes duration is stuck but video plays
                         console.warn('[HLS] Startup timeout reached - checking status');
                         // Only fallback if truly stuck? For now keeping original logic but less aggressive
                        if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE || video.readyState === 0) {
                             fallbackToMp4('startup-timeout');
                        }
                    }
                }, 8000); // 5s might be too tight for slow connections
            }

            const onLoadedMetadata = () => {
                console.debug('[HLS] loadedmetadata');
                clearStartupTimer();
            };
            video.addEventListener('loadedmetadata', onLoadedMetadata);

            if (autoPlay) {
                video.play().catch(err => console.debug('[HLS] Autoplay rejected (maybe policy) -> will rely on user gesture', err));
            }

            return () => {
                clearStartupTimer();
                if (hls) hls.destroy();
                video.removeEventListener('loadedmetadata', onLoadedMetadata);
                if (detachNativeError) detachNativeError();
                if (startLoadHandler) video.removeEventListener('play', startLoadHandler);
            };
        } catch (err) {
            console.error('[HLS] Unexpected setup error', err);
            fallbackToMp4('setup-exception');
        }
    }, [src, autoPlay, fallbackMp4]);

    return (
        <video
            ref={videoRef}
            className={cn('w-full h-full', className)}
            poster={poster}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline
            preload={preload}
        />
    );
}

export default forwardRef<HTMLVideoElement, HlsVideoProps>(HlsVideo);