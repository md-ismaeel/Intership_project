import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Category({ isSearch }) {
    const navigate = useNavigate();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const categories = [
        { name: "Dairy" },
        { name: "Vegetables" },
        { name: "Fruits" },
        { name: "Grains" },
        { name: "Pulses" },
        { name: "Spices" },
        { name: "Cooking Oils" },
        { name: "Farm Products" },
        { name: "Herbs" },
    ];

    const handleCategoryClick = (category) => {
        navigate(`/products/${category.name.toLowerCase()}`);
    };

    const handleCheckboxChange = (categoryName) => {
        setSelectedCategories((prev) => prev.includes(categoryName) ? prev.filter((c) => c !== categoryName) : [...prev, categoryName]);
    };

    return (
        <div
            className={`flex flex-col w-full min-h-[100px] border-r border-gray-100 transition-all duration-300 ${isSearch ? "md:w-[60%]" : "md:w-[18%] bg-white"}`}
        >
            {!isSearch && (
                <div className="w-full p-4 bg-white border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 md:text-xl">
                        Categories
                    </h2>
                </div>
            )}

            <ul
                className={`flex flex-wrap items-start justify-start ${isSearch ? "md:flex-wrap md:flex-row" : "md:flex-col"}`}
            >
                {categories.map((category, i) => (
                    <li
                        key={i}
                        onClick={() => handleCategoryClick(category)}
                        className="w-full md:w-auto"
                    >
                        <div className="group flex items-center w-full gap-3 px-4 py-2.5 text-gray-600 transition-all duration-200 rounded-lg hover:bg-gray-50 active:bg-gray-100 focus:outline-none">
                            <input
                                type="checkbox"
                                id={`category-${i}`}
                                checked={selectedCategories.includes(category.name)}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    handleCheckboxChange(category.name);
                                }}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200 cursor-pointer"
                            />
                            <label
                                htmlFor={`category-${i}`}
                                className="text-sm font-medium transition-colors duration-200 cursor-pointer md:text-base group-hover:text-gray-900"
                            >
                                {category.name}
                            </label>
                            <ChevronRight className="ml-auto w-4 h-4 text-gray-400 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-1" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
