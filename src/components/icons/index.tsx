"use client";

import * as React from "react";
import { Icon as IconifyIcon } from "@iconify/react";

export type IconName = string;

// Default rule: "prefix:name" -> "prefix-name.svg"
const iconFilenameOverrides: Record<string, string> = {
  // Add entries here only if any icon file does not match the default derived filename.
  // For example:
  // "mdi:chevron-down": "mdi-chevron-down.svg",
};

function deriveFilename(icon: string): string {
  const override = iconFilenameOverrides[icon];
  if (override) return override;
  return icon.replace(":", "-") + ".svg";
}

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
  const hasIcon = Boolean(icon);
  const filename = hasIcon ? deriveFilename(icon) : "";
  const src = hasIcon ? `/icons/${filename}` : "";

  // In development, probe for missing files and fall back to Iconify with a helpful warning.
  const [missing, setMissing] = React.useState(false);
  React.useEffect(() => {
    if (!hasIcon || process.env.NODE_ENV === "production") return;
    let canceled = false;
    const img = new Image();
    img.onload = () => {
      if (!canceled) setMissing(false);
    };
    img.onerror = () => {
      if (!canceled) {
        setMissing(true);
        console.warn(
          `[Icon] Missing local SVG for "${icon}" at ${src}. Falling back to Iconify. Place file at public/icons/${filename} or add an override in iconFilenameOverrides.`
        );
      }
    };
    img.src = src;
    return () => {
      canceled = true;
    };
  }, [hasIcon, icon, src, filename]);

  if (!hasIcon) return null;
  if (missing) {
    return <IconifyIcon icon={icon} className={className} />;
  }
  return <LocalMaskedSvg src={src} className={className} title={title} {...rest} />;
}

