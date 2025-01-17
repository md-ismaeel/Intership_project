import React from "react";
import FocusCard from "./FocusCard";

const img1 = `https://media.istockphoto.com/id/1367842816/photo/alternative-medicine-herbal-organic-capsule-with-vitamin-e-omega-3-fish-oil-mineral-drug-with.jpg?s=612x612&w=0&k=20&c=uTKSzIxeTAE1xCIdkVgPXxT0yh5JGt6R_xKmnsYPdV4=`;
const img2 = `https://media.istockphoto.com/id/1320934166/photo/cosmetic-skin-care-products-on-green-leaves.jpg?s=612x612&w=0&k=20&c=X4pwnTaBzXHDOGZlcdJdlKxmYd__61xboHVIiR5JMIk=`;
const img3 = `https://img.freepik.com/premium-photo/focus-skincare-products-made-with-natural-ingredients-free-from-harsh-chemicals-synthetic-fragrances-products-gentle-skin-providing-nourishment-protection-generative-ai_661108-3726.jpg`;

export default function FocusOn() {
    return (
        <>
            <h1 className="mt-4 mb-2 uppercase text-sm tracking-widest w-[29%] md:full flex justify-end items-center md:block md:ml-14 lg:ml-5 font-semibold">
                Focus <span className="text-yellow-500 ml-2 md:ml-0">on</span>
            </h1>

            <div className="w-full flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-center px-5 mb-10">
                <FocusCard img={img3} />
                <FocusCard img={img2} />
                <FocusCard img={img1} />
            </div>
        </>
    );
}
