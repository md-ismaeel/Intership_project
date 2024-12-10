import React, { useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { TRENDING } from '../../ProductsData'
import { NavLink } from 'react-router-dom'

export default function TrendingProducts() {
    const [trending, setTrending] = useState(TRENDING)
    return (
        <section className={`mt-10`}>
            <div className={`w-full text-lg font-semibold flex justify-start items-center mb-2`}>
                <div className="ml-[4.5rem] md:ml-8 flex justify-end items-center gap-1">
                    <p className="bg-primary w-3 h-7"></p>
                    <h1 className="mt-4">Trending Products</h1>
                </div>
            </div>
            <div
                className={`h-auto flex justify-center items-center gap-5 flex-wrap`}
            >
                {trending && trending.length > 0 ? (
                    trending.map((prod) => (
                        <NavLink to={`/products-details/${prod.id}`} key={prod.id}>
                            <ProductCard item={prod} />
                        </NavLink>
                    ))
                ) : (
                    <div>No data</div>
                )}
            </div>
        </section>
    )
}
