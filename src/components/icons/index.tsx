"use client";

import * as React from "react";
import { Icon as IconifyIcon } from "@iconify/react";

export type IconName = string;

// Map Iconify names to filenames placed under public/icons/
const iconToFilename: Record<string, string> = {
  "mdi:chevron-down": "mdi-chevron-down.svg",
  "mdi:chevron-up": "mdi-chevron-up.svg",
  "mdi:check": "mdi-check.svg",
  "mdi:arrow-up": "mdi-arrow-up.svg",
  "mdi:list-status": "mdi-list-status.svg",
  "ri:loader-4-line": "ri-loader-4-line.svg",
  "mdi:calendar-check": "mdi-calendar-check.svg",
  "ri:twitter-x-fill": "ri-twitter-x-fill.svg",
  "mdi:facebook": "mdi-facebook.svg",
  "mdi:youtube": "mdi-youtube.svg",
  "mdi:instagram": "mdi-instagram.svg",
  "mdi:email": "mdi-email.svg",
  "mdi:phone": "mdi-phone.svg",
  "mdi:map-marker": "mdi-map-marker.svg",
  "heroicons:bars-2-solid": "heroicons-bars-2-solid.svg",
  "icon-park-outline:quote": "icon-park-outline-quote.svg",
  "iconamoon:mouse-thin": "iconamoon-mouse-thin.svg",
  "ph:arrow-down-thin": "ph-arrow-down-thin.svg",
  "mdi:movie-edit-outline": "mdi-movie-edit-outline.svg",
  "mdi:chevron-right": "mdi-chevron-right.svg",
  "mdi:dots-horizontal": "mdi-dots-horizontal.svg",
  "mdi:loading": "mdi-loading.svg",
  "mdi:chevron-left": "mdi-chevron-left.svg",
  "mdi:circle": "mdi-circle.svg",
  "mdi:close": "mdi-close.svg",
  "mdi:search": "mdi-search.svg",
  "mdi:calendar": "mdi-calendar.svg",
  "mdi:magnify": "mdi-magnify.svg",
  "mdi:bed-outline": "mdi-bed-outline.svg",
  "mdi:bathtub-outline": "mdi-bathtub-outline.svg",
  "mdi:ruler-square": "mdi-ruler-square.svg",
  "mdi:arrow-right": "mdi-arrow-right.svg",
  "mdi:download": "mdi-download.svg",
  "mdi:information-outline": "mdi-information-outline.svg",
  "mdi:alert-outline": "mdi-alert-outline.svg",
  "mdi:close-circle-outline": "mdi-close-circle-outline.svg",
  "mdi:check-circle-outline": "mdi-check-circle-outline.svg",
  "mdi:note-outline": "mdi-note-outline.svg",
  "mdi:lightbulb-outline": "mdi-lightbulb-outline.svg",
  "mdi:pause": "mdi-pause.svg",
  "mdi:play": "mdi-play.svg",
  "mdi:linkedin": "mdi-linkedin.svg",
  "mdi:twitter": "mdi-twitter.svg",
  "mdi:handshake": "mdi-handshake.svg",
  "ri:volume-up-fill": "ri-volume-up-fill.svg",
  "ri:fullscreen-fill": "ri-fullscreen-fill.svg",
  "ri:play-mini-fill": "ri-play-mini-fill.svg",
  "mdi:strategy": "mdi-strategy.svg",
  "mdi:home-search": "mdi-home-search.svg",
  "mdi:file-document-check": "mdi-file-document-check.svg",
  "mdi:headset": "mdi-headset.svg",
  "mdi:people-group": "mdi-people-group.svg",
  "mdi:chart-line": "mdi-chart-line.svg",
  "streamline:investment-selection": "streamline-investment-selection.svg",
  "mdi:home-city": "mdi-home-city.svg",
  "mdi:key": "mdi-key.svg",
  "mdi:shield-alert": "mdi-shield-alert.svg",
  "mdi:lightbulb-on": "mdi-lightbulb-on.svg",
  "mdi:safe": "mdi-safe.svg",
};

// Local SVG renderer (using mask so we can color with currentColor without SVGR)
function LocalMaskedSvg({ src, className, title, ...rest }: { src: string; title?: string } & React.HTMLAttributes<HTMLSpanElement>) {
  const style: React.CSSProperties = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    backgroundColor: "currentColor",
    display: "inline-block",
    width: "1em",
    height: "1em",
  };
  return <span role={title ? "img" : "presentation"} aria-label={title} className={className} style={style} {...rest} />;
}

export function Icon({ icon, className, title, ...rest }: { icon: IconName; title?: string } & React.HTMLAttributes<HTMLSpanElement>) {
  const filename = iconToFilename[icon];
  if (filename) {
    const src = `/icons/${filename}`;
    return <LocalMaskedSvg src={src} className={className} title={title} {...rest} />;
  }
  // Fallback to iconify while migrating, so nothing breaks if a file is missing.
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[Icon] Missing local SVG for "${icon}". Falling back to Iconify.`);
  }
  // Only forward className and title to iconify other span props are not relevant
  return <IconifyIcon icon={icon} className={className} />;
}

