import React from 'react'
import ExtraSpace from '../../Components/ExtraSpace/ExtraSpace'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { createUrlSlug } from '../../Constant/Constant'
import ProductCard from '../../Components/ProductCard/ProductCard'

export default function WishList() {
    const { wishList } = useSelector((state) => state?.Org)
    return (
        <>
            <ExtraSpace />
            {wishList.length > 0 && <h1 className=" mt-5 -mb-3 uppercase text-lg tracking-widest w-full ml-3 md:ml-5 lg:ml-5 font-semibold px-3">Listed <span className='text-yellow-500 ml-2 md:ml-0'>Product</span> </h1>}
            <section className={`w-full min-h-screen flex justify-center items-start px-5 mt-5`}>
                <div
                    className={`w-full flex flex-wrap justify-start gap-10 items-center mb-12`}
                >
                    {wishList && wishList.length > 0
                        ? wishList.map((item) => (
                            <NavLink key={item.id} to={`/product/${createUrlSlug(item?.title)}`}>
                                <ProductCard item={item} />
                            </NavLink>
                        ))
                        : <div className='w-full grid items-center justify-center mt-20 text-xl font-semibold text-green-800'>No products founds!!</div>}
                </div>
            </section>
        </>
    )
}
