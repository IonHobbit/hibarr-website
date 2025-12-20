"use client";

import { useEffect, useState } from "react";

export type DeviceType = "ios" | "android" | "desktop" | "unknown";

export interface DeviceInfo {
  type: DeviceType;
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  userAgent: string;
}

export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: "unknown",
    isIOS: false,
    isAndroid: false,
    isMobile: false,
    isDesktop: false,
    isTablet: false,
    userAgent: "",
  });

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    // Detect iOS devices
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    // Detect Android devices
    const isAndroid = /android/.test(userAgent);

    // Detect tablets
    const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/.test(userAgent);

    // Detect mobile devices (phone or tablet)
    const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent) || isTablet;

    // Desktop is anything that's not mobile
    const isDesktop = !isMobile;

    // Determine device type
    let type: DeviceType = "unknown";
    if (isIOS) {
      type = "ios";
    } else if (isAndroid) {
      type = "android";
    } else if (isDesktop) {
      type = "desktop";
    }

    setDeviceInfo({
      type,
      isIOS,
      isAndroid,
      isMobile,
      isDesktop,
      isTablet,
      userAgent,
    });
  }, []);

  return deviceInfo;
};

