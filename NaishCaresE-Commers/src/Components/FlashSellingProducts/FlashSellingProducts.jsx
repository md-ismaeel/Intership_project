import React, { useState } from 'react'
import { FLASHSELLER } from '../../ProductsData'
import { NavLink } from 'react-router-dom'
import ProductCard from '../ProductCard/ProductCard'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function FlashSellingProducts() {
    const [flash, setFlash] = useState(FLASHSELLER);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };
    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 mt-10">
            <div className={`w-full text-lg font-semibold flex justify-start items-center mb-2`}>
                <div className="ml-[1.3rem] md:ml-5 flex justify-end items-center gap-1">
                    <p className="bg-primary w-3 h-7"></p>
                    <h1 className="mt-4">Flash Sales Products</h1>
                </div>
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
                    keyBoardControl={true}
                    customTransition="all .5s ease"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={[]}
                    dotListClass="custom-dot-list-style"
                    itemClass="px-2"
                    className="w-full"
                >
                    {flash && flash.length > 0 ? (
                        flash.map((prod) => (
                            <div key={prod.id} className="p-2">
                                <NavLink to={`/products-details/${prod.id}`}>
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



