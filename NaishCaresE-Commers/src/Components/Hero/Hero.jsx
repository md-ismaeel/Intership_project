import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Banner1 from "../../assets/Banners/banner-1.jpg";
import Banner2 from "../../assets/Banners/banner-2.jpg";
import Banner3 from "../../assets/Banners/banner-3.webp";
import Banner4 from "../../assets/Banners/banner-4.jpg";

export default function Hero({ deviceType }) {
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
        <div className="w-[90%] md:w-[80%] mx-auto z-10">
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
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                <div className="h-[200px] md:h-[370px]">
                    <img
                        src={Banner1}
                        alt="Banner 1"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div className="h-[200px] md:h-[370px]">
                    <img
                        src={Banner2}
                        alt="Banner 2"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div className="h-[200px] md:h-[370px]">
                    <img
                        src={Banner3}
                        alt="Banner 3"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div className="h-[200px] md:h-[370px]">
                    <img
                        src={Banner4}
                        alt="Banner 4"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
            </Carousel>
        </div>
    );
}
