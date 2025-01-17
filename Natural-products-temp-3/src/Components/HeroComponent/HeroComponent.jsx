import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import banner1 from "../../assets/banner/img1.jpg";
import banner2 from "../../assets/banner/img2.jpg";
import banner3 from "../../assets/banner/img3.jpg";

export default function HeroComponent({ deviceType }) {
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
        <div className="relative w-full mt-2">
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
                customTransition="all .5"
                transitionDuration={500}
                containerClass="relative z-0"
                removeArrowOnDeviceType={["mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="px-0"
            >
                <div className="relative h-[300px] md:h-[500px]">
                    <img
                        src={banner2}
                        alt="Banner 2"
                        className="absolute inset-0 w-full h-full bg-center rounded-md"
                    />
                </div>
                <div className="relative h-[300px] md:h-[500px]">
                    <img
                        src={banner3}
                        alt="Banner 2"
                        className="absolute inset-0 w-full h-full bg-center rounded-md"
                    />
                </div>
                <div className="relative h-[300px] md:h-[500px]">
                    <img
                        src={banner1}
                        alt="Banner 3"
                        className="absolute inset-0 w-full h-full bg-center rounded-md"
                    />
                </div>
            </Carousel>

        </div>
    );
}