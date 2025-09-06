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
}

const HlsVideo = ({
    src,
    poster,
    className,
    autoPlay = true,
    muted = true,
    loop = true,
    fallbackMp4
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

        try {
            if (video.canPlayType('application/vnd.apple.mpegurl')) {
                console.debug('[HLS] Using native HLS');
                video.src = src;
                detachNativeError = attachNativeErrorHandlers();
            } else if (Hls.isSupported()) {
                console.debug('[HLS] Using hls.js for', src);
                hls = new Hls({
                    enableWorker: true,
                    lowLatencyMode: true,
                    backBufferLength: 60,
                });
                hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                    console.debug('[HLS] Media attached');
                });
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    console.debug('[HLS] Manifest parsed');
                });
                hls.on(Hls.Events.ERROR, (event, data) => {
                    console.error('[HLS] Error event', data.type, data.details, data);
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
            startupTimer = setTimeout(() => {
                if (!fallbackUsed && !video.duration) {
                    fallbackToMp4('startup-timeout');
                }
            }, 5000);

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
            preload="auto"
        />
    );
}

export default forwardRef<HTMLVideoElement, HlsVideoProps>(HlsVideo);