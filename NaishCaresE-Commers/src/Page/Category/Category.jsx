import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Category() {
    const navigate = useNavigate();
    const categories = [
        "Dairy",
        "Vegetables",
        "Fruits",
        "Grains",
        "Pulses",
        "Spices",
        "Cooking Oils",
        "Farm Products",
        "Herbs",
    ];

    const handleCategoryClick = (category) => {
        navigate(`/products/${category.toLowerCase()}`);
    };

    return (
        <div className="w-[100%] md:w-[15%] flex justify-center items-center flex-col border-r-2 px-5 py-4 bg-gray-50">
            <div className="w-full text-lg md:text-xl font-semibold mb-4 text-gray-700">
                Category
            </div>
            <ul className={`w-full flex flex-wrap px-4 md:px-0 md:flex-col justify-start items-start`}>
                {categories.map((category, i) => (
                    <li key={i}>
                        <button
                            onClick={() => handleCategoryClick(category)}
                            className="block px-3 py-1 rounded-md text-gray-700 hover:text-orange-500 transition-colors duration-300"
                        >
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
    ""
}
