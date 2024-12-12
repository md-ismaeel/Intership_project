import React from "react";
import Hero from "../../Components/Hero/Hero";
import Category from "../Category/Category";
import TrendingProducts from "../../Components/TrendingProducts/TrendingProducts";
import BestSeller from "../../Components/BestSeller/BestSeller";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center mt-5 mb-10 overflow-x-hidden">
      <div className="w-full h-full flex flex-col-reverse md:flex-row justify-between items-start">
        <Category />
        <Hero />
      </div>
      <TrendingProducts />
      <BestSeller />
    </main>

  )
}
