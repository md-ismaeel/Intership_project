import React, { useState } from "react";
import { FAVORITES, SWEETS } from "../../data";
import ProductCard from "../ProductCard/ProductCard";
import { NavLink } from "react-router-dom";
import { createUrlSlug } from "../../Constant/Constant";

export default function Deals() {
    const [toggleFabSweet, setFabSweet] = useState(false);

    const DEALS_DATA = toggleFabSweet ? SWEETS : FAVORITES;

    return (
        <>
            <div
                className={`w-full min-h-screen flex flex-col items-center justify-start`}
            >

                <div className="text-[13px] mt-14 mb-10">
                    <button
                        onClick={() => setFabSweet(false)}
                        className={`px-4 py-2 rounded-full tracking-widest transition 
                    ${!toggleFabSweet ? "bg-gray-100 hover:bg-gray-100" : "hover:bg-gray-50"}`}
                    >
                        FAN FAVORITES
                    </button>
                    <button
                        onClick={() => setFabSweet(true)}
                        className={`px-4 py-2 rounded-full tracking-widest transition 
                    ${toggleFabSweet ? "bg-gray-100 hover:bg-gray-100" : "hover:bg-gray-50"}`}
                    >
                        SWEET DEALS
                    </button>
                </div>

                <div
                    className={`w-full flex flex-wrap justify-center gap-4 items-center mb-12`}
                >
                    {DEALS_DATA && DEALS_DATA.length > 0
                        ? DEALS_DATA.map((item) => (
                            <NavLink key={item.id} to={`/product/${createUrlSlug(item?.title)}`}>
                                <ProductCard item={item} />
                            </NavLink>
                        ))
                        : "No products founds!!"}
                </div>
                <p className="w-[95%] h-[1px] bg-gray-200"></p>
            </div>
        </>
    );
}
