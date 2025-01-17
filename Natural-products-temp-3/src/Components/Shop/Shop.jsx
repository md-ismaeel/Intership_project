import React from "react";
import { useNavigate } from "react-router-dom";

export default function Shop() {
    const navigator = useNavigate();
    const img = `https://thumbs.dreamstime.com/b/green-sale-sign-displaying-front-organic-food-store-display-organic-food-products-green-sale-chalkboard-sign-placed-337683849.jpg`;
    return (
        <>
            <div className={`relative w-full h-[450px] px-5 mt-10 mb-2`}>
                <img
                    src={img}
                    alt="img"
                    className="w-full h-full rounded-md bg-center"
                />
                <h1 className="absolute top-24 left-[5%] z-10 text-white font-bold text-2xl md:text-4xl w-full px-4 md:px-0 leading-8 md:w-[50%] -tracking-tighter capitalize md:leading-2">An organic product is made from materials produced by organic agriculture.</h1>

                <button
                    onClick={() => navigator("/products")}
                    className="absolute bottom-10 left-[10%] bg-orange-500 hover:bg-orange-600 z-10 h-11 w-[130px] text-lg font-medium text-white rounded-md"
                >
                    Shop Now
                </button>
            </div>
        </>
    );
}
