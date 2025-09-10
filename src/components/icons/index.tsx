import * as React from "react";

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
function LocalMaskedSvg({ src, className, title, style, ...rest }: { src: string; title?: string } & React.HTMLAttributes<HTMLSpanElement>) {
  const hasExplicitSize = Boolean(
    (className && /(^|\s)(w-|h-|size-)/.test(className)) ||
    (style && (style.width || style.height))
  );
  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    backgroundColor: "currentColor",
    ...(hasExplicitSize ? {} : { width: "1em", height: "1em" }),
  };
  const mergedClass = ["inline-block", className].filter(Boolean).join(" ");
  return <span role={title ? "img" : "presentation"} aria-label={title} className={mergedClass} style={{ ...maskStyle, ...style }} {...rest} />;
}

export function Icon({ icon, className, title, ...rest }: { icon: IconName; title?: string } & React.HTMLAttributes<HTMLSpanElement>) {
  if (!icon) return null;
  const filename = deriveFilename(icon);
  const src = `/icons/${filename}`;
  return <LocalMaskedSvg src={src} className={className} title={title} {...rest} />;
}

