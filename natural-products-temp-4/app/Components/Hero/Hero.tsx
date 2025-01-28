"use client"
import { HeroProps } from "@/app/Type/Type";
import React from "react";
import "react-multi-carousel/lib/styles.css";
import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("react-multi-carousel"), { ssr: false });

import banner1 from "@/app/assets/Banners/banner1.png"
import banner2 from "@/app/assets/Banners/banner2.png"


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
                    <img
                        src={"https://marketplace.canva.com/EAGTPnb3Pe8/1/0/1600w/canva-teal-orange-yellow-and-white-illustrative-e-commerce-trends-presentation-TL0s0VmdfTE.jpg"}
                        alt="Banner 2"
                        className="absolute inset-0 w-full h-full bg-center rounded-md"
                    />
                </div>
                <div className="relative h-[300px] md:h-[500px]">
                    <img
                        src={"https://img.freepik.com/free-vector/shopping-time-banner-with-realistic-map-cart-gift-bags-vector-illustration_548887-120.jpg"}
                        alt="Banner 2"
                        className="absolute inset-0 w-full h-full bg-center rounded-md"
                    />
                </div>
            </Carousel>
        </div>
    );
}
export default Hero;