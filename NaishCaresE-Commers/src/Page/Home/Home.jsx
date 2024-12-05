import React from "react";
import Hero from "../../Components/Hero/Hero";
import Category from "../Category/Category";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex justify-between items-start mt-5">
      <Category />
      <Hero />
    </main>
  )
}
