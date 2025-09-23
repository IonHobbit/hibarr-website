"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { SanityImageCrop, SanityImageHotspot } from "@/types/sanity.types";
import type { ElementType } from "react";

export type HeadingWithImageBlock = {
  _type: "headingWithImage";
  heading: string;
  subheading?: string;
  backgroundImage?: {
    asset?: {
      url?: string;
      metadata?: { lqip?: string } | null;
    } | null;
    crop?: SanityImageCrop | null;
    hotspot?: SanityImageHotspot | null;
  } | null;
  height?: "sm" | "md" | "lg" | "full";
  align?: "left" | "center" | "right";
  textTone?: "light" | "dark";
  overlayOpacity?: number; // 0-100
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

type Props = HeadingWithImageBlock & {
  className?: string;
  // If this block is expected to be the first block often, allow priority override
  priority?: boolean;
};

/**
 * HeadingWithImage
 * - Renders a hero-like section inline within content flow
 * - Supports background image with hotspot-aware object-position, overlay, alignment, height variants
 * - Accessible: uses heading as alt fallback if image alt is unavailable in CMS
 */
export default function HeadingWithImage({
  heading,
  subheading,
  backgroundImage,
  height = "md",
  align = "center",
  textTone = "light",
  overlayOpacity = 40,
  headingLevel = "h2",
  className,
  priority = false,
}: Props) {

  // Semantic heading tag selection with default and sanitization
  const validLevels = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
  const level = (validLevels.find(v => v === headingLevel) ?? "h2");
  const Tag = level as ElementType;
  // Guard: if no heading, do not render
  if (!heading) return null;

  // Clamp overlay opacity
  const overlay = Math.max(0, Math.min(100, Number.isFinite(overlayOpacity as number) ? (overlayOpacity as number) : 40)) / 100;

  // Text alignment and color
  const textColor = textTone === "dark" ? "#0A0A0A" : "#ffffff";
  const textAlign = align === "left" ? "left" : align === "right" ? "right" : "center";

  // Compute object-position from hotspot if present
  const objectPosition = backgroundImage?.hotspot
    ? `${Math.round(((backgroundImage.hotspot.x ?? 0.5) * 100))}% ${Math.round(((backgroundImage.hotspot.y ?? 0.5) * 100))}%`
    : "50% 50%";

  // Heights: mobile vs desktop (lg: breakpoint)
  const sizeMap = {
    sm: { mobile: 60, desktop: 100 },
    md: { mobile: 140, desktop: 220 },
    lg: { mobile: 240, desktop: 380 },
    full: { mobile: "70vh", desktop: "100vh" as const },
  } as const;

  const size = sizeMap[height] || sizeMap.md;
  const mobileH = typeof size.mobile === "number" ? `${size.mobile}px` : size.mobile;
  const desktopH = typeof size.desktop === "number" ? `${size.desktop}px` : size.desktop;
  const minHMobile = height === "full" ? "360px" : undefined;
  const minHDesktop = height === "full" ? "480px" : undefined;

  const hasImage = Boolean(backgroundImage?.asset?.url);
  const brandBlueHex = "#053160";
  const brandBlueRgb = "5,49,96";

  return (
    <section
      aria-label={heading}
      className={cn(
        "relative w-full overflow-hidden rounded-lg",
        className,
      )}
      style={{
        color: textColor,
        height: mobileH,
        minHeight: minHMobile,
      }}
      data-testid="hwi-section"
    >
      {/* Background Image Layer */}
      {hasImage ? (
        <Image
          src={backgroundImage!.asset!.url as string}
          alt={heading}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 960px"
          className="absolute inset-0 object-cover"
          style={{ objectPosition }}
          placeholder={backgroundImage?.asset?.metadata?.lqip ? "blur" : undefined}
          blurDataURL={backgroundImage?.asset?.metadata?.lqip || undefined}
        />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: brandBlueHex }} />
      )}

      {/* Overlay */}
      {hasImage && overlay > 0 && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(${brandBlueRgb},${overlay})` }}
          aria-hidden
        />
      )}

      {/* Content */}
      <div
        className={cn(
          "relative h-full w-full grid px-4",
          align === "left" && "place-items-center lg:place-items-center",
        )}
        style={{
          // Use CSS grid for vertical + horizontal placement
          placeItems:
            align === "left"
              ? "center start"
              : align === "right"
                ? "center end"
                : "center",
        }}
      >
        <div
          className="max-w-[70ch]"
          style={{ textAlign: textAlign, color: textColor }}
          data-testid="hwi-content"
        >
          <Tag className="m-0 font-semibold" style={{ fontSize: "clamp(28px,4vw,48px)", lineHeight: 1.1 }}>
            {heading}
          </Tag>
          {subheading && (
            <p className="mt-3 opacity-90" style={{ fontSize: "clamp(16px,2.5vw,20px)" }}>
              {subheading}
            </p>
          )}
        </div>
      </div>

      {/* Ensure min-heights for full mode via hidden utility wrapper to avoid tailwind arbitrary issues */}
      <style jsx>{`
        @media (min-width: 1024px) {
          section {
            height: ${desktopH};
            ${minHDesktop ? `min-height: ${minHDesktop};` : ""}
          }
        }
      `}</style>
    </section>
  );
}
