import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ExtraSpace from "../../Components/ExtraSpace";
import image1 from "../../assets/Collections/body-care.webp";
import image2 from "../../assets/Collections/combo01.webp";
import image3 from "../../assets/Collections/face-care.webp";
import image4 from "../../assets/Collections/here-care.webp";
import ImageCard from "../../Components/Templates/ImageCard";
import { collectionsStyle } from "../../Constant/Constant";

export default function Collection() {
  const { selectedCategory } = useSelector((state) => state?.N4N)
  const navigator = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `Product | Collections | ${selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).toLowerCase() : ""}`;
  }, [selectedCategory]);


  return (
    <>
      <ExtraSpace />
      <section className="w-full min-h-screen flex flex-col justify-center items-center mt-4 mb-12">
        {/* Category title */}
        <div className="flex flex-col items-center gap-2 mb-5">
          <h1 className="text-sm uppercase font-medium tracking-widest">Category</h1>
          <p className="w-10 h-1 bg-gray-300"></p>
        </div>

        {/* Container */}
        <div className={collectionsStyle.collectionContainer}>
          {/* First row */}
          <div className={collectionsStyle.mainDiv}>
            <ImageCard image={image1} category={"beauty"} title={"beauty"} />
            <ImageCard image={image2} category={"fragrances"} title={"fragrances"} />
          </div>

          {/* Second row */}
          <div className={collectionsStyle.mainDiv}>
            <ImageCard image={image3} category={"furniture"} title={"furniture"} />
            <ImageCard image={image4} category={"groceries"} title={"groceries"} />
          </div>

        </div>
      </section>
    </>
  );
}

