import * as React from "react";

// Usage (in a Server Component):
// import { ServerIcon } from "@/components/icons/server";
// <ServerIcon icon="mdi:chevron-down" className="w-4 h-4 text-primary" />

export type ServerIconName = string;

const iconFilenameOverrides: Record<string, string> = {
  // Add overrides here only if a filename deviates from the standard pattern.
};

function deriveFilename(icon: string): string {
  return iconFilenameOverrides[icon] ?? icon.replace(":", "-") + ".svg";
}

interface ServerIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: ServerIconName;
  title?: string;
}

export function ServerIcon({ icon, className, title, style, ...rest }: ServerIconProps) {
  if (!icon) return null;
  const filename = deriveFilename(icon);
  const src = `/icons/${filename}`;

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
    // Apply default size only if user didn't set one
    ...(className && /(^|\s)(w-|h-|size-)/.test(className) ? {} : { width: "1em", height: "1em" }),
    ...(style || {}),
  };

  return (
    <span
      role={title ? "img" : "presentation"}
      aria-label={title}
      className={["inline-block", className].filter(Boolean).join(" ")}
      style={maskStyle}
      {...rest}
    />
  );
}
