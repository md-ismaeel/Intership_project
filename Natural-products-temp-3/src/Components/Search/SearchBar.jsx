import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredProd } from "../../Redux/Slice/OrgSlice";

export default function SearchBar() {
    const { originalData, filteredProd } = useSelector((state) => state?.Org);
    const dispatch = useDispatch();
    const [inputVal, setInputVal] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [showNoResults, setShowNoResults] = useState(false);

    const handleInputChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setInputVal(inputValue);

        if (inputValue.trim() === "") {
            dispatch(setFilteredProd([]));
            setShowNoResults(false);
            return;
        }

        // Filter data based on title, category, or price
        const filtered = originalData?.filter((item) =>
            item.title.toLowerCase().includes(inputValue) ||
            item.category.toLowerCase().includes(inputValue) ||
            item.price.toString().includes(inputValue)
        );

        dispatch(setFilteredProd(filtered));
        setShowNoResults(filtered.length === 0);
    };

    const handleClear = () => {
        setInputVal("");
        dispatch(setFilteredProd([]));
        setShowNoResults(false);
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="relative">
                <div
                    className={`flex items-center rounded-lg bg-white ${isFocused ? "shadow-lg" : ""
                        } transition-all duration-200 px-2`}
                >
                    <Search
                        className={`w-5 h-5 ${isFocused ? "text-green-500" : "text-gray-500"
                            } transition-colors duration-200`}
                    />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={inputVal}
                        onChange={handleInputChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-full h-12 px-4 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
                        aria-label="Search products"
                    />
                    {inputVal && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
                            aria-label="Clear search"
                        >
                            <span className="text-gray-500 text-xl">×</span>
                        </button>
                    )}
                </div>

                {showNoResults && (
                    <div className="absolute top-14 p-3 w-full bg-blue-50 text-blue-800 rounded-lg">
                        No products found for "{inputVal}"
                    </div>
                )}

                {/* {inputVal && filteredProd?.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-md border border-gray-200 max-h-60 overflow-y-auto z-10">
                        <div className="p-2">
                            <div className="text-sm text-gray-500">
                                Found {filteredProd.length} results
                            </div>
                            <div className="mt-1 space-y-1">
                                {filteredProd.map((item, index) => (
                                    <div
                                        key={item.id || index}
                                        className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                                    >
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
}