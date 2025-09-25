"use client";

import Image from "next/image";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import { cn } from "@/lib/utils";

export type TextWithImageBlock = {
  _type: 'textWithImage'
  heading?: string
  body: PortableTextBlock[]
  image?: {
    asset?: { url?: string, metadata?: { lqip?: string } | null } | null
  crop?: Record<string, unknown> | null
  hotspot?: { x?: number, y?: number } | null
    alt?: string
    caption?: string
  } | null
  imagePosition?: 'left' | 'right'
  verticalAlign?: 'start' | 'center' | 'end'
  gap?: 'sm' | 'md' | 'lg'
  imageSize?: '4-6' | '5-5' | '6-4'
  imageRounded?: boolean
}

type Props = TextWithImageBlock & { className?: string }

export default function TextWithImage({
  heading,
  body = [],
  image,
  imagePosition = 'left',
  verticalAlign = 'start',
  gap = 'md',
  imageSize = '5-5',
  imageRounded = true,
  className,
}: Props) {
  const hasImage = Boolean(image?.asset?.url)
  const col = imageSize === '4-6' ? ['40%', '60%'] : imageSize === '6-4' ? ['60%', '40%'] : ['50%', '50%']
  const gapPx = gap === 'sm' ? 16 : gap === 'lg' ? 32 : 24
  const alignItems = verticalAlign === 'center' ? 'center' : verticalAlign === 'end' ? 'end' : 'start'
  const imageFirst = imagePosition !== 'right'
  const radius = imageRounded ? 12 : 0
  const objectPosition = image?.hotspot ? `${Math.round(((image.hotspot.x ?? 0.5) * 100))}% ${Math.round(((image.hotspot.y ?? 0.5) * 100))}%` : '50% 50%'

  return (
    <section className={cn("w-full", className)}>
      <div
        className="grid"
        style={{ gridTemplateColumns: hasImage ? `${col[0]} ${col[1]}` : '1fr', gap: gapPx, alignItems }}
      >
        {hasImage && imageFirst && (
          <figure>
            <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
              <Image
                src={image!.asset!.url as string}
                alt={image?.alt || heading || ''}
                fill
                className="object-cover"
                style={{ objectPosition, borderRadius: radius }}
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder={image?.asset?.metadata?.lqip ? 'blur' : undefined}
                blurDataURL={image?.asset?.metadata?.lqip || undefined}
              />
            </div>
            {image?.caption && (
              <figcaption className="text-sm mt-2" style={{ color: '#5B6B7C' }}>{image.caption}</figcaption>
            )}
          </figure>
        )}

        <div style={{ color: '#053160' }}>
          {heading && <strong className="block mb-2" style={{ color: '#053160' }}>{heading}</strong>}
          <PortableText value={body} />
        </div>

        {hasImage && !imageFirst && (
          <figure>
            <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
              <Image
                src={image!.asset!.url as string}
                alt={image?.alt || heading || ''}
                fill
                className="object-cover"
                style={{ objectPosition, borderRadius: radius }}
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder={image?.asset?.metadata?.lqip ? 'blur' : undefined}
                blurDataURL={image?.asset?.metadata?.lqip || undefined}
              />
            </div>
            {image?.caption && (
              <figcaption className="text-sm mt-2" style={{ color: '#5B6B7C' }}>{image.caption}</figcaption>
            )}
          </figure>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section > div { display: block; }
          section > div > * + * { margin-top: ${gapPx}px; }
          ${imageFirst ? '' : 'section > div > :nth-child(1) { order: 2; }'}
        }
      `}</style>
    </section>
  )
}
