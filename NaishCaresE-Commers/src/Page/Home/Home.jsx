import React from "react";
import Hero from "../../Components/Hero/Hero";
import Category from "../Category/Category";
import Products from "../Products/Products";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center mt-5">
      <div className={`w-full h-full flex justify-between items-start`}>
        <Category />
        <Hero />
      </div>
      {/* <Products /> */}
    </main>
  )
}
