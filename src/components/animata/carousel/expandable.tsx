'use client';

import { HTMLAttributes, useEffect, useState } from "react";

// import WaveReveal from "@/animata/text/wave-reveal";
import { cn } from "@/lib/utils";
import WaveReveal from "../text/wave-reveal";

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  item: { image: string; title: string };
  index: number;
  activeItem: number;
  onItemClick?: (item: { image: string; title: string }) => void;
}

interface ExpandableProps {
  list?: { image: string; title: string }[];
  autoPlay?: boolean;
  className?: string;
  onItemClick?: (item: { image: string; title: string }) => void;
}

const List = ({ item, className, index, activeItem, onItemClick, ...props }: ImageProps) => {
  return (
    <div
      onClick={() => onItemClick?.(item)}
      className={cn(
        "relative group flex h-full w-20 min-w-10 cursor-pointer overflow-hidden rounded-md transition-all delay-0 duration-300 ease-in-out",
        {
          "flex-grow": index === activeItem,
        },
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-primary/30 z-10 group-hover:opacity-100 opacity-0 transition-all duration-300 delay-300 ease-in-out" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.title}
        className={cn("h-full w-full object-cover group-hover:scale-115 transition-all duration-300 delay-300 ease-in-out z-0", {
          "blur-[2px]": index !== activeItem,
        })}
      />
      {index === activeItem && (
        <div className="absolute bottom-4 left-4 min-w-fit text-white md:bottom-8 md:left-8 z-10">
          <WaveReveal
            duration="1000ms"
            className="items-start justify-start text-xl sm:text-2xl md:text-6xl"
            text={item.title}
            direction="up"
          />
        </div>
      )}
    </div>
  );
};

const items = [
  {
    image:
      "https://images.unsplash.com/photo-1541753236788-b0ac1fc5009d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Mountains",
  },
  {
    image:
      "https://images.unsplash.com/photo-1718027808460-7069cf0ca9ae?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Great Wall of China",
  },
  {
    image:
      "https://images.unsplash.com/photo-1584968173934-bc0b588eb806?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Texture & Patterns",
  },
];

export default function Expandable({ list = items, autoPlay = true, className, onItemClick }: ExpandableProps) {
  const [activeItem, setActiveItem] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveItem((prev) => (prev + 1) % list.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, list.length, isHovering]);

  return (
    <div className={cn("flex h-96 w-full gap-1", className)}>
      {list.map((item, index) => (
        <List
          key={item.title}
          item={item}
          index={index}
          activeItem={activeItem}
          onItemClick={onItemClick}
          onMouseEnter={() => {
            setActiveItem(index);
            setIsHovering(true);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}
        />
      ))}
    </div>
  );
}
