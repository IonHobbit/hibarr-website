'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

type BounceCardImage = string | { src: string; alt: string };

interface BounceCardsProps {
  className?: string;
  images?: BounceCardImage[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}

const DEFAULT_TRANSFORM_STYLES = [
  "rotate(10deg) translate(-170px)",
  "rotate(5deg) translate(-85px)",
  "rotate(-3deg)",
  "rotate(-10deg) translate(85px)",
  "rotate(2deg) translate(170px)",
];

export default function BounceCards({
  className = "",
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = DEFAULT_TRANSFORM_STYLES,
  enableHover = false,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {
      gsap.fromTo(
        ".card",
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        },
      );
    }, containerRef);

    return () => ctx.current?.revert();
  }, [animationDelay, animationStagger, easeType]);

  const [transformStates, setTransformStates] = useState<
    { angle: number; distance: number }[]
  >([]);

  useEffect(() => {
    // Parse initial transform styles once
    const parsedTransforms = transformStyles.map((style) => {
      const rotateMatch = style.match(/rotate\(([-0-9.]+)deg\)/);
      const translateMatch = style.match(/translate\(([-0-9.]+)px\)/);
      return {
        angle: rotateMatch ? parseFloat(rotateMatch[1]) : 0,
        distance: translateMatch ? parseFloat(translateMatch[1]) : 0,
      };
    });
    setTransformStates(parsedTransforms);
  }, [transformStyles]);

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || transformStates.length === 0) return;

    ctx.current?.add(() => {
      images.forEach((_, i) => {
        const selector = `.card-${i}`;
        gsap.killTweensOf(selector);

        const current = transformStates[i];
        if (!current) return;

        if (i === hoveredIdx) {
          // No rotation for hovered card
          gsap.to(selector, {
            transform: `rotate(0deg) translate(${current.distance}px)`,
            duration: 0.4,
            ease: "back.out(1.4)",
            overwrite: "auto",
          });
        } else {
          const offsetX = i < hoveredIdx ? -160 : 160;
          const newDistance = current.distance + offsetX;

          // Push siblings while maintaining angle
          gsap.to(selector, {
            transform: `rotate(${current.angle}deg) translate(${newDistance}px)`,
            duration: 0.4,
            ease: "back.out(1.4)",
            delay: Math.abs(hoveredIdx - i) * 0.05,
            overwrite: "auto",
          });
        }
      });
    });
  };

  const resetSiblings = () => {
    if (!enableHover || transformStates.length === 0) return;

    ctx.current?.add(() => {
      images.forEach((_, i) => {
        const selector = `.card-${i}`;
        gsap.killTweensOf(selector);

        const current = transformStates[i];

        gsap.to(selector, {
          transform: `rotate(${current.angle}deg) translate(${current.distance}px)`,
          duration: 0.4,
          ease: "back.out(1.4)",
          overwrite: "auto",
        });
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {images.map((item, idx) => {
        const src = typeof item === "string" ? item : item.src;
        const alt = typeof item === "string" ? `card-${idx}` : item.alt;
        return (
          <div
            key={idx}
            className={`card card-${idx} absolute w-[280px] aspect-square border-[3px] border-white rounded-[30px] overflow-hidden`}
            style={{
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              transform: transformStyles[idx] || "none",
            }}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
          >
            <Image
              className="w-full h-full object-cover absolute"
              fill
              src={src}
              loading="lazy"
              alt={alt}
            />
          </div>
        );
      })}
    </div>
  );
}
