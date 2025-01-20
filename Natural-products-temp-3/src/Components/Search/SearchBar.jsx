import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredProd } from "../../Redux/Slice/OrgSlice";
import { toast } from "material-react-toastify";


export default function SearchBar() {
    const { originalData } = useSelector((state) => state?.Org);
    const dispatch = useDispatch();
    const [inputVal, setInputVal] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [showNoResults, setShowNoResults] = useState(false);

    const handleInputChange = (e) => {
        try {
            const inputValue = e.target.value.toLowerCase();
            setInputVal(inputValue);

            if (inputValue.trim() === "") {
                dispatch(setFilteredProd([]));
                setShowNoResults(false);
                return;
            }

            // Enhanced filtering with error handling and trimming
            const filtered = originalData?.filter((item) => {
                if (!item) return false;
                return (
                    item.title?.toLowerCase().trim().includes(inputValue) ||
                    item.category?.toLowerCase().trim().includes(inputValue) ||
                    item.price?.toString().includes(inputValue)
                );
            });

            if (filtered.length === 0) {
                toast.info(`No products found for "${inputValue}"`);
            } else if (filtered.length > 0) {
                toast.success(`Found ${filtered.length} products`);
            }

            dispatch(setFilteredProd(filtered));
            setShowNoResults(filtered.length === 0);
        } catch (error) {
            toast.error("An error occurred while searching");
            console.error("Search error:", error);
        }
    };

    const handleClear = () => {
        setInputVal("");
        dispatch(setFilteredProd([]));
        setShowNoResults(false);
        toast.info("Search cleared");
    };

    return (
        <div className="search-container relative md:w-[250px] lg:w-[400px]">
            <div className="relative">
                <div
                    className={`flex items-center rounded-lg bg-white ${isFocused ? "shadow-lg" : ""
                        } transition-all duration-200 px-2`}
                >
                    <Search
                        className={`w-5 h-5 ${isFocused ? "text-green-500" : "text-gray-500"
                            } transition-colors duration-200`}
                    />
                    <div className="relative flex-1 flex items-center">
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
                            <span
                                onClick={handleClear}
                                className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer"
                                aria-label="Clear search"
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        handleClear();
                                    }
                                }}
                            >
                                <span className="text-gray-500 text-xl">×</span>
                            </span>
                        )}
                    </div>
                </div>

                {showNoResults && (
                    <div className="absolute top-14 p-3 w-full bg-blue-50 text-blue-800 rounded-lg">
                        No products found for "{inputVal}"
                    </div>
                )}
            </div>
        </div>
    );
}
