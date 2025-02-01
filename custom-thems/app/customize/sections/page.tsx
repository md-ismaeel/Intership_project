"use client"
import ToggleButton from "@/app/Components/ToggleButton/ToggleButton";
import UpdateButton from "@/app/Components/UpdateButton/UpdateButton";
import React from "react";

export default function sections() {
  const sectionData = [
    {
      title: "Feature product",
      des: "make your best product standout with this section",
    },
    {
      title: "Image with overlay",
      des: "upload photos of your business, product, or offerings for customer to see.",
    },
    {
      title: "Customer testimonial",
      des: "Build trust among new buyers with testimonial from your existing customers",
    },
    {
      title: "Brand story",
      des: "Use this section to share information about your brands,products,category,etc with your customers.",
    },
  ];
  return (
    <>
      <section className="w-[75%] h-[500px] flex flex-col justify-center items-center gap-2 overflow-y-auto">
        {sectionData.map((item) => <ToggleButton key={item.title} title={item.title} description={item.des} />)}
        <UpdateButton selectedTheme={"true"}/>
      </section>
    </>
  );
}
