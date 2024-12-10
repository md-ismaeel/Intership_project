import React, { useState } from 'react'
import { BESTSELLER } from '../../ProductsData'
import { NavLink } from 'react-router-dom'
import ProductCard from '../ProductCard/ProductCard'

export default function BestSeller() {
    const [bestSeller, setBestSeller] = useState(BESTSELLER)
    return (
        <section className={`mt-12`}>
            <div className={`w-full text-lg font-semibold flex justify-start items-center mb-2`}>
                <div className="ml-[4.5rem] md:ml-8 flex justify-end items-center gap-1">
                    <p className="bg-primary w-3 h-7"></p>
                    <h1 className="mt-4">Best Seller Products</h1>
                </div>
            </div>
            <div
                className={`h-auto flex justify-center items-center gap-5 flex-wrap`}
            >
                {bestSeller && bestSeller.length > 0 ? (
                    bestSeller.map((prod) => (
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
