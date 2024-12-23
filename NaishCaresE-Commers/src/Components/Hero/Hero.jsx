import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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
        <div className="w-[100%] md:w-[80%] mx-auto z-10">
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
                {/* <div className="h-[200px] md:h-[490px]">
                    <img
                        src={"https://img.pikbest.com/origin/10/04/21/28ApIkbEsTjdK.jpg!w700wp"}
                        alt="Banner 1"
                        className="w-full h-full bg-center rounded-md"
                    />
                </div> */}
                <div className="h-[200px] md:h-[455px]">
                    <img
                        src={Banner2}
                        alt="Banner 2"
                        className="w-full h-full bg-center rounded-md"
                    />
                </div>
                <div className="h-[200px] md:h-[455px]">
                    <img
                        src={Banner3}
                        alt="Banner 3"
                        className="w-full h-full bg-center rounded-md"
                    />
                </div>
                <div className="h-[200px] md:h-[455px]">
                    <img
                        src={"https://vediko.in/cdn/shop/collections/ghee_banner.jpg?v=1656064214"}
                        alt="Banner 4"
                        className="w-full h-full bg-center rounded-md"
                    />
                </div>
            </Carousel>
        </div>
    );
}
