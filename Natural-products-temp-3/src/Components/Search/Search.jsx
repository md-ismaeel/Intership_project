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
                {filteredProd.length > 0 && <h2 className="text-sm font-semibold uppercase tracking-wider mb-5 md:px-10">Search Result</h2>}

                {/* Search Results */}
                {filteredProd && filteredProd.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {data.map((item) => (
                            <NavLink
                                to={`/product/${createUrlSlug(item.title)}`}
                                key={item.id}
                            >
                                <ProductCard item={item} />
                            </NavLink>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center text-gray-500 test-green-600 font-semibold  tex-2xl">No Search products found!</div>
                )}
            </section>
        </>
    );
}
