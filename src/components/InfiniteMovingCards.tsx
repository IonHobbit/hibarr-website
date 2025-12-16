"use client";

import { CloudinaryFile } from "@/lib/third-party/cloudinary.client";
import Image from "next/image";
import Slider, { Settings } from "react-slick";

export const InfiniteMovingCards = ({ items }: { items: CloudinaryFile[]; }) => {

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
  }

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Slider {...settings}>
      {items.map((item, index) => (
        <div key={index} className="relative w-32 h-16 px-4 focus:outline-none">
          <Image key={index} src={item.secure_url} alt={item.display_name} fill sizes='100%' className='object-contain grayscale hover:grayscale-0 transition-all duration-300 px-4' />
        </div>
      ))}
    </Slider>
  );
};
