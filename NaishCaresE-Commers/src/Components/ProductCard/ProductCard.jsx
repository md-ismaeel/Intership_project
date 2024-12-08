import React from 'react'

export default function ProductCard({ name, category, price, description, image }) {
    return (
        <div className={`w-[14rem] h-[16rem] border flex justify-center items-start rounded-md bg-white px-2`}>
            <div className='w-full h-[70%] '>
                <img src={image} alt={name} className={`w-full h-full rounded-t-md`} />
            </div>
        </div>
    )
}
