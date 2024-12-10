import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProductCard from "../../Components/ProductCard/ProductCard";

export default function WishList() {
    const wishList = useSelector((state) => state?.Ecommers?.wishList || []);
    console.log("wishList", wishList);

    return (
        <section className="w-full min-h-screen flex flex-col justify-start items-center mt-10 mb-10">
            <div className="w-full text-lg font-semibold flex justify-start items-center mt-5 mb-2">
                <div className="ml-[4.5rem] md:ml-8 flex justify-end items-center gap-1">
                    <p className="bg-primary w-3 h-7"></p>
                    <h1 className="mt-4 capitalize">
                        WishList
                    </h1>
                </div>
            </div>

            {/* Product List */}
            <div className="h-auto flex justify-center items-center gap-5 flex-wrap">
                {Array.isArray(wishList) && wishList.length > 0 ? (
                    wishList.map((prod) => (
                        <NavLink to={`/products-details/${prod.id}`} key={prod.id}>
                            <ProductCard item={prod} />
                        </NavLink>
                    ))
                ) : (
                    <div className="text-gray-500 text-center">No products found.</div>
                )}
            </div>
        </section>
    );
}
