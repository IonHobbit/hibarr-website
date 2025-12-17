"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";

type InfiniteMovingCardsProps = {
  items: string[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }

      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "10s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
      setStart(true);
    }
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        className={cn(
          " flex min-w-full shrink-0 w-full flex-nowrap gap-10",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={`original-${idx}`}
            className="relative flex-shrink-0 flex items-center w-max"
          >
            <div className="flex items-center justify-center relative w-40 h-20">
              <Image
                src={item}
                alt={item || ''}
                sizes="100%"
                fill
                loading='lazy'
                className="object-contain absolute grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </li>
        ))}
        {items.map((item, idx) => (
          <li
            key={`duplicate-${idx}`}
            className="relative flex-shrink-0 flex items-center w-max"
            aria-hidden="true"
          >
            <div className="flex items-center justify-center relative w-40 h-20">
              <Image
                src={item}
                alt={item || ''}
                sizes="100%"
                fill
                loading='lazy'
                className="object-contain absolute grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};