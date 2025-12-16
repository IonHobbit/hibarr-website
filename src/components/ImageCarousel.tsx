"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ImageCarouselProps = {
  items: string[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const ImageCarousel = ({ items, direction = "left", speed = "fast", pauseOnHover = true, className }: ImageCarouselProps) => {
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
        {items.map((item, idx) => (
          <li
            key={`original-${idx}`}
            className="relative w-32 h-16 flex-shrink-0 flex items-center"
          >
            <Image
              src={item}
              alt={item || ''}
              fill
              sizes='100%'
              className='object-contain grayscale hover:grayscale-0 transition-all duration-300 px-4'
              loading="lazy"
              quality={75}
            />
          </li>
        ))}
        {items.map((item, idx) => (
          <li
            key={`duplicate-${idx}`}
            className="relative w-32 h-16 flex-shrink-0 flex items-center"
            aria-hidden="true"
          >
            <Image
              src={item}
              alt={item || ''}
              fill
              sizes='100%'
              className='object-contain grayscale hover:grayscale-0 transition-all duration-300 px-4'
              loading="lazy"
              quality={75}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  // const { isIOS } = useDeviceDetection();

  // const settings: Settings = {
  //   infinite: true,
  //   autoplay: true,
  //   autoplaySpeed: 2500,
  //   speed: 1000,
  //   slidesToShow: 5,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   dots: false,
  //   swipe: true,
  //   swipeToSlide: true,
  //   pauseOnHover: true,
  //   pauseOnFocus: true,
  //   centerMode: true,
  //   responsive: [
  //     {
  //       breakpoint: 768, // md breakpoint
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         centerMode: true,
  //       }
  //     },
  //     {
  //       breakpoint: 1024, // lg breakpoint
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         centerMode: true,
  //       }
  //     }
  //   ]
  // }

  // // Don't render anything until mounted (prevents hydration mismatch)
  // if (!items || items.length === 0) {
  //   return null;
  // }

  // // Render simple horizontal scroll for iOS devices
  // // if (isIOS) {
  // //   return (
  // //     <div className="w-full overflow-x-auto">
  // //       <div className="flex gap-8 px-4 py-4">
  // //         {items.map((item, index) => (
  // //           <div key={index} className="relative w-32 h-16 flex-shrink-0">
  // //             <Image
  // //               src={item}
  // //               alt={item || ''}
  // //               fill
  // //               sizes='128px'
  // //               className='object-contain grayscale'
  // //               loading="lazy"
  // //               quality={75}
  // //             />
  // //           </div>
  // //         ))}
  // //       </div>
  // //     </div>
  // //   );
  // // }

  // return (
  //   <Slider {...settings}>
  //     {items.map((item, index) => (
  //       <div key={index} className="relative w-32 h-16 px-4 focus:outline-none">
  //         <Image
  //           key={index}
  //           src={item}
  //           alt={item || ''}
  //           fill
  //           sizes='100%'
  //           className='object-contain grayscale hover:grayscale-0 transition-all duration-300 px-4'
  //           loading="lazy"
  //           quality={75}
  //         />
  //       </div>
  //     ))}
  //   </Slider>
  // );
};