import React, { useEffect, useState } from "react";
import ExtraSpace from "../../Components/ExtraSpace/ExtraSpace";
import ProductsFilter from "../../Components/ProductsFilter/ProductsFilter";
import { useDispatch, useSelector } from "react-redux";
import { createUrlSlug } from "../../Constant/Constant";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { NavLink } from "react-router-dom";

export default function Products() {

    const { data } = useSelector((state) => state?.Org);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);

        return () => clearTimeout(timer)
    }, [])



    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
                <div className="animate-pulse w-full flex justify-between items-center h-full">
                    <div className="h-64 bg-gray-200 rounded-lg w-[25%]"></div>
                    <div className="h-64 bg-gray-200 rounded-lg w-[70%]" />
                </div>
                <div className="animate-pulse w-full space-y-6 mt-5">
                    <div className="h-10 w-[70%] rounded-lg bg-gray-200"></div>
                    <div className="h-10 rounded-lg w-[60%] bg-gray-200"></div>
                </div>
            </div>
        );
    }

    return (
        <>
            <ExtraSpace />
            <section className={`w-full h-screen flex flex-col lg:flex-row mt-2 mb-10`}>
                <div className="w-[25%] px-4">
                    <ProductsFilter />
                </div>

                {/* Product List */}
                <div
                    className={`product-list w-full lg:w-[80%] px-5 flex flex-wrap justify-center items-center gap-5 overflow-y-auto py-4`}
                >
                    {data && data.length > 0
                        ? data.map((item) => (
                            <NavLink
                                key={item.id}
                                to={`/product/${createUrlSlug(item?.title)}`}
                            >
                                <ProductCard item={item} />
                            </NavLink>
                        ))
                        : "No Products founds!"}
                </div>
            </section>

        </>
    );
}
