"use client";
import { HeroProps } from "@/app/Type/Type";
import React from "react";
import "react-multi-carousel/lib/styles.css";
import dynamic from "next/dynamic";
import Image from "next/image";
import banner1 from "@/app/assets/Banners/img.jpg";
import banner3 from "@/app/assets/Banners/img2.jpg";
import banner4 from "@/app/assets/Banners/imh3.jpg";

const Carousel = dynamic(() => import("react-multi-carousel"), { ssr: false });

const Hero: React.FC<HeroProps> = ({ deviceType }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="relative w-full mt-2 px-5 pt-4">
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={deviceType !== "mobile"}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="all.5"
        transitionDuration={500}
        containerClass="relative z-0"
        removeArrowOnDeviceType={["mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="px-0"
      >
        <div className="relative h-[300px] md:h-[500px]">
          <Image
            src={banner1}
            alt="Banner 2"
            className="absolute inset-0 w-full h-full bg-center rounded-md"
            width={800} // Add width
            height={500} // Add height
          />
        </div>
        <div className="relative h-[300px] md:h-[500px]">
          <Image
            src={banner3}
            alt="Banner 2"
            className="absolute inset-0 w-full h-full bg-center rounded-md"
            width={800} // Add width
            height={500} // Add height
          />
        </div>
        <div className="relative h-[300px] md:h-[500px]">
          <Image
            src={banner4}
            alt="Banner 2"
            className="absolute inset-0 w-full h-full bg-center rounded-md"
            width={800} // Add width
            height={500} // Add height
          />
        </div>
      </Carousel>
    </div>
  );
};
export default Hero;
