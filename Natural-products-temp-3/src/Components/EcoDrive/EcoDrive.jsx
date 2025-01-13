import React from "react";
import image1 from "../../assets/Collections/face-care.webp";
import image2 from "../../assets/Collections/shop-1.webp";
import image3 from "../../assets/Collections/shop-2.webp";
import image4 from "../../assets/Collections/here-care.webp";
import image5 from "../../assets/Collections/body-care.webp";
import image6 from "../../assets/Collections/shop-3.webp";
import { collectionsStyle } from "../../Constant/Constant";
import ImageCard from "../Templates/ImageCard";

export default function EcoDrive() {
    return (
        <>
            <section
                className={`className="w-full min-h-screen flex flex-col justify-center items-center mb-12`}
            >
                <div className="w-full text-[25px] lg:text-[44px] text-center font-medium text-[#707E7A] mb-4">Eco-driven, science-backed – Explore the skincare evolution.
                </div>

                <div className={collectionsStyle.collectionContainer}>
                    <div className={collectionsStyle.mainDiv}>
                        <ImageCard image={image1} category={""} title={"Are you ready to put your best face forward?"} />
                        <ImageCard image={image2} category={"fragrances"} title={""} shopNow={"Shop Now"} />
                    </div>

                    <div className={collectionsStyle.mainDiv}>
                        <ImageCard image={image3} category={"beauty"} title={""} shopNow={"Shop Now"} />
                        <ImageCard image={image4} category={""} title={"Our hair care products will leave your locks feeling fabulous!"} />
                    </div>

                    <div className={collectionsStyle.mainDiv}>
                        <ImageCard image={image5} category={""} title={"A body-licious routine that will leave your skin wanting for more!"} />
                        <ImageCard image={image6} category={"groceries"} title={""} shopNow={"Shop Now"} />
                    </div>
                </div>
            </section>
        </>
    );
}
