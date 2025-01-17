import React, { useState } from "react";
import ExtraSpace from "../../Components/ExtraSpace/ExtraSpace";
import { useSelector } from "react-redux";
import { toast } from "material-react-toastify";
import { NavLink } from "react-router-dom";
import { createUrlSlug } from "../../Constant/Constant";
import ProductCard from "../../Components/ProductCard/ProductCard";

export default function Search() {
    const { data, filteredProd } = useSelector((state) => state?.Org);
    return (
        <>
            <ExtraSpace />
            <section className="w-full min-h-screen flex justify-start items-center flex-col py-6">
                {filteredProd.length > 0 && <h1 className="mt-7 mb-2 uppercase text-lg tracking-widest w-[10%]  md:w-full flex justify-end items-center md:block md:ml-14 lg:ml-5 font-semibold px-3">Top <span className='text-yellow-500 ml-2 md:ml-0'>Category</span> </h1>}

                {/* Search Results */}
                <ul className="flex flex-wrap items-center justify-center gap-10">
                    {filteredProd && filteredProd.length > 0 ? (

                        data.map((item) => (
                            <NavLink
                                to={`/product/${createUrlSlug(item.title)}`}
                                key={item.id}
                            >
                                <ProductCard item={item} />
                            </NavLink>
                        ))

                    ) : (
                        <div className="text-center text-gray-500 test-green-600 font-semibold  tex-2xl">No Search products found!</div>
                    )}
                </ul>
            </section>
        </>
    );
}
