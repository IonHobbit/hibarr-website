"use client";

import { cn } from "@/lib/utils";

import { ReactNode, useEffect, useRef, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: ReactNode[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure we're mounted before starting animations (prevents SSR issues)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    try {
      const container = containerRef.current;

      // Set animation direction
      const animationDirection = direction === "left" ? "forwards" : "reverse";
      container.style.setProperty("--animation-direction", animationDirection);

      // Set animation duration based on speed
      const durationMap = {
        fast: "20s",
        normal: "40s",
        slow: "80s",
      };
      container.style.setProperty("--animation-duration", durationMap[speed]);

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        setStart(true);
      });
    } catch (error) {
      console.error("Error initializing InfiniteMovingCards:", error);
    }
  }, [direction, speed, isMounted]);

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!isMounted || !items || items.length === 0) {
    return null;
  }

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
          "flex min-w-full shrink-0 w-full flex-nowrap gap-10",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {/* {items.map((item, idx) => (
          <li
            key={`original-${idx}`}
            className="relative flex-shrink-0 flex items-center w-max"
          >
            {item}
          </li>
        ))}
        {items.map((item, idx) => (
          <li
            key={`duplicate-${idx}`}
            className="relative flex-shrink-0 flex items-center w-max"
            aria-hidden="true"
          >
            {item}
          </li>
        ))} */}
      </ul>
    </div>
  );
};
