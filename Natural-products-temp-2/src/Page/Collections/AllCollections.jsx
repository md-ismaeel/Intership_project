import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDown, ChevronUp } from "lucide-react";
import { setData, resetData, setSelectedCategory } from "../../Redux/Slice/N4NSlice";

export default function AllCollections() {
    const { data, originalData, selectedCategory = "" } = useSelector((state) => state?.N4N);
    const dispatch = useDispatch();
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(true);
    const [inStock, setInStock] = useState(false);
    const [outOfStock, setOutOfStock] = useState(false);

    const categories = [...new Set(data?.map((item) => item?.category).filter(Boolean) ?? [])];

    useEffect(() => {
        let filteredProducts = originalData;

        // Filter by category
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(
                (item) => item.category === selectedCategory
            );
        }

        // Filter by availability
        if (inStock && outOfStock) {
            // Show all products regardless of stock status
        } else if (inStock) {
            filteredProducts = filteredProducts.filter((item) => item.stock > 0);
        } else if (outOfStock) {
            filteredProducts = filteredProducts.filter((item) => item.stock === 0);
        }

        // Dispatch filtered data
        dispatch(setData(filteredProducts));
    }, [selectedCategory, inStock, outOfStock, dispatch, originalData]);

    const handleCategoryChange = (category) => {
        dispatch(setSelectedCategory(category === selectedCategory ? "" : category))
    };

    const handleClearFilters = () => {
        dispatch(setSelectedCategory(""));
        setInStock(false);
        setOutOfStock(false);
        dispatch(resetData());
    };

    return (
        <div className="container mb-10 px-4 flex justify-center items-center">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filter Sidebar */}
                <div className="w-72 flex-shrink-0">
                    {/* Collections Filter */}
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="w-full flex justify-between items-center mb-4 font-medium px-1.5"
                        >
                            <h2 className="uppercase text-sm">All Collections</h2>
                            <span className="hover:bg-gray-100 rounded-full">
                                {isFilterOpen ? (
                                    <ChevronUp size={20} />
                                ) : (
                                    <ChevronDown size={20} />
                                )}
                            </span>
                        </button>

                        <div
                            className={`space-y-3 overflow-hidden transition-all duration-500 ease-in-out ${isFilterOpen ? "max-h-screen" : "max-h-0"
                                }`}
                        >
                            {isFilterOpen &&
                                categories.length > 0 &&
                                categories.map((category) => (
                                    <label
                                        key={category}
                                        className="flex items-center justify-between hover:bg-gray-50 p-2 rounded cursor-pointer transition-all duration-200 ease-in-out"
                                    >
                                        <span className="text-sm uppercase">{category}</span>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategory === category}
                                            onChange={() => handleCategoryChange(category)}
                                            className="w-4 h-4 accent-black cursor-pointer"
                                        />
                                    </label>
                                ))}
                        </div>
                    </div>

                    {/* Stock Availability */}
                    <div className="bg-white rounded-lg shadow-sm border p-4 mt-5">
                        <button
                            onClick={() => setIsAvailabilityOpen(!isAvailabilityOpen)}
                            className="w-full flex justify-between items-center mb-4 font-medium px-1.5"
                        >
                            <h2 className="text-sm uppercase">Availability</h2>
                            <span className="hover:bg-gray-100 rounded-full">
                                {isAvailabilityOpen ? (
                                    <ChevronUp size={20} />
                                ) : (
                                    <ChevronDown size={20} />
                                )}
                            </span>
                        </button>
                        <div
                            className={`space-y-3 overflow-hidden transition-all duration-500 ease-in-out ${isAvailabilityOpen ? "max-h-screen" : "max-h-0"
                                }`}
                        >
                            {isAvailabilityOpen && (
                                <div className="space-y-1">
                                    <label className="flex items-center justify-between hover:bg-gray-50 p-2 rounded cursor-pointer transition-all duration-200 ease-in-out">
                                        <span className="text-sm uppercase">In Stock</span>
                                        <input
                                            type="checkbox"
                                            checked={inStock}
                                            onChange={() => setInStock(!inStock)}
                                            className="w-4 h-4 accent-black"
                                        />
                                    </label>
                                    <label className="flex items-center justify-between hover:bg-gray-50 p-2 rounded cursor-pointer transition-all duration-200 ease-in-out">
                                        <span className="text-sm uppercase">Out of Stock</span>
                                        <input
                                            type="checkbox"
                                            checked={outOfStock}
                                            onChange={() => setOutOfStock(!outOfStock)}
                                            className="w-4 h-4 accent-black"
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Selected Filter Display */}
                    {(selectedCategory || inStock || outOfStock) && (
                        <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border">
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
                                            onClick={() => handleCategoryChange(selectedCategory)}
                                            className="ml-2 text-gray-500 hover:text-gray-700 transition-transform duration-200"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                                {inStock && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100">
                                        In Stock
                                        <button
                                            onClick={() => setInStock(false)}
                                            className="ml-2 text-gray-500 hover:text-gray-700 transition-transform duration-200"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                                {outOfStock && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100">
                                        Out of Stock
                                        <button
                                            onClick={() => setOutOfStock(false)}
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
        </div>
    );
}
