import React, { useState } from "react";
import ExtraSpace from "../../Components/ExtraSpace/ExtraSpace";
import { useSelector } from "react-redux";
import { toast } from "material-react-toastify";
import { NavLink } from "react-router-dom";
import { createUrlSlug } from "../../Constant/Constant";
import ProductCard from "../../Components/ProductCard/ProductCard";

export default function Search() {
    const { filteredProd } = useSelector((state) => state?.Org);
    console.log(filteredProd);

    return (
        <>
            <ExtraSpace />
            {filteredProd.length > 0 && <h1 className="mt-5 uppercase text-lg tracking-widest ml-3 md:ml-5 lg:ml-5 font-semibold px-3">Search <span className='text-yellow-500 ml-2 md:ml-0'>Results</span> </h1>}
            <section className="w-full min-h-screen flex justify-start items-center flex-col py-2">

                {/* Search Results */}
                <ul className="w-full flex flex-wrap items-center justify-start gap-10 px-5">
                    {filteredProd && filteredProd.length > 0 ? (
                        filteredProd.map((item) => (
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
