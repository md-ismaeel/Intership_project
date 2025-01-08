import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDown, ChevronUp } from "lucide-react";
import { setData, resetData, setSelectedCategory } from "../../Redux/Slice/N4NSlice";

export default function AllCollections() {
    const { data, originalData, selectedCategory = "" } = useSelector((state) => state?.N4N);
    const dispatch = useDispatch();
    const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
    const [availability, setAvailability] = useState("");
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const categories = [...new Set(data?.map((item) => item?.category).filter(Boolean) ?? [])];

    const handleCategorySelect = (category) => {
        dispatch(setSelectedCategory(category));
        setIsCategoryOpen(false);
    };

    const handleAvailabilitySelect = (value) => {
        setAvailability(value);
        setIsAvailabilityOpen(false);
    };

    useEffect(() => {
        let filteredProducts = originalData;

        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(
                (item) => item.category === selectedCategory
            );
        }

        if (availability === "inStock") {
            filteredProducts = filteredProducts.filter((item) => item.stock > 0);
        } else if (availability === "outOfStock") {
            filteredProducts = filteredProducts.filter((item) => item.stock === 0);
        }

        dispatch(setData(filteredProducts));
    }, [selectedCategory, availability, dispatch, originalData]);

    const handleClearFilters = () => {
        dispatch(setSelectedCategory(""));
        setAvailability("");
        dispatch(resetData());
    };

    // Click outside handlers
    useEffect(() => {
        const handleClickOutside = (event) => {
            const categoryDropdown = document.getElementById("category-dropdown");
            const availabilityDropdown = document.getElementById("availability-dropdown");

            if (categoryDropdown && !categoryDropdown.contains(event.target)) {
                setIsCategoryOpen(false);
            }
            if (availabilityDropdown && !availabilityDropdown.contains(event.target)) {
                setIsAvailabilityOpen(false);
            }
        };

        if (isCategoryOpen || isAvailabilityOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCategoryOpen, isAvailabilityOpen]);

    return (
        <div className="container mt-5 z-20 flex justify-center items-center">
            <div className="w-[95%] grid grid-cols-1 lg:grid-cols-3 justify-center items-center">
                {/* Category Filter */}
                <div className="bg-white w-72 rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow duration-200">
                    <h2 className="uppercase text-sm font-medium mb-4 text-gray-700">
                        All Collections
                    </h2>

                    <div className="relative" id="category-dropdown">
                        <button
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className="w-full px-3 py-2 border rounded text-left text-[12px] uppercase bg-white
                                hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                                transition-all duration-200 outline-none flex justify-between items-center"
                        >
                            <span className={selectedCategory ? "text-gray-800" : "text-gray-500"}>
                                {selectedCategory || "Select Category"}
                            </span>
                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {isCategoryOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-auto">
                                <div
                                    onClick={() => handleCategorySelect("")}
                                    className="text-[12px] uppercase px-3 py-2 cursor-pointer hover:bg-black hover:text-white
                                        transition-colors duration-150"
                                >
                                    All Categories
                                </div>
                                {categories.map((category) => (
                                    <div
                                        key={category}
                                        onClick={() => handleCategorySelect(category)}
                                        className="text-[12px] uppercase px-3 py-2 cursor-pointer hover:bg-black hover:text-white
                                            transition-colors duration-150 z-30"
                                    >
                                        {category}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Stock Availability */}
                <div className="bg-white w-72 rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow duration-200">
                    <h2 className="uppercase text-sm font-medium mb-4 text-gray-700">
                        Availability
                    </h2>

                    <div className="relative" id="availability-dropdown">
                        <button
                            onClick={() => setIsAvailabilityOpen(!isAvailabilityOpen)}
                            className="w-full px-3 py-2 border rounded text-left text-[12px] uppercase bg-white
                                hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                                transition-all duration-200 outline-none flex justify-between items-center"
                        >
                            <span className={availability ? "text-gray-800" : "text-gray-500"}>
                                {availability === "inStock"
                                    ? "In Stock"
                                    : availability === "outOfStock"
                                        ? "Out of Stock"
                                        : "Select Availability"}
                            </span>
                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-200 ${isAvailabilityOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {isAvailabilityOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-auto">
                                <div
                                    onClick={() => handleAvailabilitySelect("")}
                                    className="text-[12px] uppercase px-3 py-2 cursor-pointer hover:bg-black hover:text-white
                                        transition-colors duration-150"
                                >
                                    All Items
                                </div>
                                <div
                                    onClick={() => handleAvailabilitySelect("inStock")}
                                    className="text-[12px] uppercase px-3 py-2 cursor-pointer hover:bg-black hover:text-white
                                        transition-colors duration-150"
                                >
                                    In Stock
                                </div>
                                <div
                                    onClick={() => handleAvailabilitySelect("outOfStock")}
                                    className="text-[12px] uppercase px-3 py-2 cursor-pointer hover:bg-black hover:text-white
                                        transition-colors duration-150"
                                >
                                    Out of Stock
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Selected Filter Display */}
                {(selectedCategory || availability) && (
                    <div className="w-72 h-[6rem] p-4 bg-white rounded-lg shadow-sm border">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-medium">Active Filters</h3>
                            <button
                                onClick={handleClearFilters}
                                className="text-sm text-red-600 hover:text-red-700 transition-colors duration-200"
                            >
                                Clear
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selectedCategory && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100">
                                    {selectedCategory}
                                    <button
                                        onClick={() => dispatch(setSelectedCategory(""))}
                                        className="ml-2 text-gray-500 hover:text-gray-700 transition-transform duration-200"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            {availability && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100">
                                    {availability === "inStock" ? "In Stock" : "Out of Stock"}
                                    <button
                                        onClick={() => setAvailability("")}
                                        className="ml-2 text-gray-500 hover:text-gray-700 transition-transform duration-200"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}