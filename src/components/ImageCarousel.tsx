"use client";

import { CloudinaryFile } from "@/lib/third-party/cloudinary.client";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import Image from "next/image";
import Slider, { Settings } from "react-slick";

export const ImageCarousel = ({ items }: { items: CloudinaryFile[]; }) => {
  const { isIOS } = useDeviceDetection();

  const settings: Settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    swipe: true,
    swipeToSlide: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 768, // md breakpoint
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        }
      },
      {
        breakpoint: 1024, // lg breakpoint
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
        }
      }
    ]
  }

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!items || items.length === 0) {
    return null;
  }

  // Render simple horizontal scroll for iOS devices
  if (isIOS) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="flex gap-8 px-4 py-4">
          {items.map((item, index) => (
            <div key={index} className="relative w-32 h-16 flex-shrink-0">
              <Image
                src={item.secure_url}
                alt={item.display_name}
                fill
                sizes='128px'
                className='object-contain grayscale'
                loading="lazy"
                quality={75}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Slider {...settings}>
      {items.map((item, index) => (
        <div key={index} className="relative w-32 h-16 px-4 focus:outline-none">
          <Image
            key={index}
            src={item.secure_url}
            alt={item.display_name}
            fill
            sizes='100%'
            className='object-contain grayscale hover:grayscale-0 transition-all duration-300 px-4'
            loading="lazy"
            quality={75}
          />
        </div>
      ))}
    </Slider>
  );
};
