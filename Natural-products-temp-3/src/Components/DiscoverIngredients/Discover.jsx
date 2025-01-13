import React from 'react'
import DiscoverIngredients from './DiscoverIngredients'
import disCoverImg from "../../assets/Discover/discoverIngredients.webp"
import { useNavigate } from "react-router-dom"

export default function Discover() {
    const navigator = useNavigate();

    return (
        <>
            {/* <DiscoverIngredients /> */}
            <section className={`relative w-full h-[300px] lg:h-[400px] flex justify-center items-center mb-10`}>
                <img src={disCoverImg} alt='logo' className={`w-[95%] h-full bg-center`} />
                <div className={`absolute top-[45%] left-[10%] md:left-[30%] lg:left-[40%] flex flex-col justify-center items-center`}>
                    <h1 className={`text-2xl font-semibold tracking-wide mb-4`}>Nature's Treasure Trove</h1>
                    <button onClick={() => navigator("/discoverIngredients")} className={`text-md bg-[#83A149] px-5 py-2 text-white text-base font-medium uppercase`}>discover ingredients</button>
                </div>
            </section>
        </>
    )
}
