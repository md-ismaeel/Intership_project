import React, { useState } from 'react'
import { TOP_DEALS } from '../../data';
import { NavLink } from 'react-router-dom'
import ProductCard from '../ProductCard/ProductCard'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { createUrlSlug } from "../../Constant/Constant"

export default function TopDeals() {
    const [top, setTop] = useState(TOP_DEALS);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };
    return (
        <section className="w-full mt-10">

            <div className="w-full flex justify-start items-center mb-2">
                <h1 className="mt-4 uppercase text-sm tracking-widest w-[37%] md:full flex justify-end items-center md:block md:ml-14 lg:ml-5 font-semibold">top <span className='text-yellow-500 ml-2 md:ml-0'>Deals</span></h1>
            </div>


            {/* Products Carousel Container */}
            <div className="relative w-full z-20">
                <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    responsive={responsive}
                    infinite={true}
                    autoPlay={false}
                    autoPlaySpeed={3000}
                    removeArrowOnDeviceType={["mobile"]}
                    keyBoardControl={true}
                    customTransition="all .5s ease"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    dotListClass="custom-dot-list-style"
                    itemClass="px-2 flex justify-center item-center"
                    className="w-full"

                >
                    {top && top.length > 0 ? (
                        top.map((prod) => (
                            <div key={prod.id} className="p-2">
                                <NavLink to={`/product/${createUrlSlug(prod.title)}`}>
                                    <ProductCard item={prod} />
                                </NavLink>
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-full text-gray-500">
                            No trending products available
                        </div>
                    )}
                </Carousel>
            </div>
        </section>
    )
}


