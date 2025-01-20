import React from "react";

export default function FocusCard({ img }) {
  return (
    <div className="focus w-[21rem] md:w-[14rem] lg:w-[22rem] h-60 flex flex-col justify-center items-center overflow-hidden rounded-md">
      <img src={img} alt="img" className={`w-full h-[90%] rounded-md hover:scale-105 cursor-pointer transition-all duration-500 ease-in-out`} />
      <span className="mt-1">Lorem ipsum dolor sit amet adipisicing elit.</span>
    </div>
  );
}
