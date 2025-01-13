import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSelectedCategory } from "../../Redux/Slice/N4NSlice";
import { collectionsStyle } from "../../Constant/Constant";

export default function ImageCard({ image, category, title, shopNow }) {
    const { selectedCategory } = useSelector((state) => state?.N4N);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    function handleNavigateToProd(category) {
        if (!category) return;
        dispatch(setSelectedCategory(category)); // Dispatch the action
        navigator("/products");
    }

    return (
        <div
            onClick={() => handleNavigateToProd(category)}
            className={collectionsStyle.childDiv}
        >
            <img
                src={image}
                alt="Body Care - Beauty"
                width="100%"
                height="auto"
                className={collectionsStyle.images}
                loading="lazy"
            />
            <h2 className={`${collectionsStyle.categoryType} ${!category ? "top-18 left-6 md:left-[10%] md:top-[50%] lg:left-[20%] lg:top-[60%] w-[90%] lg:w-[70%] capitalize text-3xl" : ""}`}>{title}</h2>
            {shopNow && <button className={`absolute bottom-10 left-16 md:left-[40%] lg:left-[38%] w-[150px] h-[40px] border-[1.5px] border-slate-400 uppercase px-2 py-1 rounded-sm`}>{shopNow}</button>}
        </div>
    );
}
