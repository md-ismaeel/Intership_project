import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import banner1 from "../../assets/Banners/banner-2.jpg";
// import banner3 from "../../assets/Banners/banner-3.jpg"
import banner2 from "../../assets/Banners/image.png";

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
        <header className="w-[100%] mx-auto z-0">
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
                removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                dotListClass="absolute bottom-5 right-5 flex justify-end items-center space-x-2"
                itemClass="carousel-item-padding-40-px"
            >
                <div className="h-[250px] md:h-[550px]">
                    <img
                        src={banner1}
                        alt="Banner 2"
                        className="w-full h-full bg-center rounded-md"
                    />
                </div>
                <div className="h-[250px] md:h-[550px]">
                    <img
                        src={banner2}
                        alt="Banner 2"
                        className="w-full h-full bg-center rounded-md"
                    />
                </div>
                {/* <div className="h-[250px] md:h-[550px]">
                    <img
                        src={banner3}
                        alt="Banner 3"
                        className="w-full h-full bg-center rounded-md"
                    />
                </div> */}

            </Carousel>
        </header>
    );
}
