import React, { useState } from "react";
import { Search } from "lucide-react";
import { toast } from "material-react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setData, setFilteredProd } from "../../Redux/Slice/OrgSlice";

export default function SearchBar() {
    const { originalData, filteredProd } = useSelector((state) => state?.Org);
    const dispatch = useDispatch();

    const [inputVal, setInputVal] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [showToast, setShowToast] = useState(true); // Prevent repetitive toasts
    // const [filteredProd, setFilteredProd] = useState([])

    const handleInputChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setInputVal(inputValue);

        if (inputValue.trim() === "") {
            // Restore original data and reset toast state
            dispatch(setFilteredProd([]));
            setShowToast(true);
            // return;
        }

        // Filter data based on title, category, or price
        const filtered = originalData?.filter((item) =>
            item.title.toLowerCase().includes(inputValue) ||
            item.category.toLowerCase().includes(inputValue) ||
            item.price.toString().includes(inputValue)
        );

        if (filtered.length === 0 && showToast) {
            toast.info(`No products found for "${inputValue}"!`);
            setShowToast(false);
        } else if (filtered.length > 0) {
            setShowToast(true);
        }

        dispatch(setFilteredProd(filtered)); // Update the Redux store with filtered data
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (inputVal.trim() === "") {
            toast.warning("Please enter a search term.");
        }
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="relative w-[250px] md:w-[200px] lg:w-[300px] h-[3rem]"
        >
            <div
                className={`flex items-center rounded-lg ${isFocused ? "bg-white shadow-lg" : "bg-white"
                    } transition-all duration-200 px-2`}
            >
                <Search
                    className={`w-5 h-5 ${isFocused ? "text-green-500" : "text-gray-500"
                        } transition-colors duration-300`}
                />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={inputVal}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full h-11 px-5 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
                    aria-label="Search products"
                />
                {inputVal && (
                    <button
                        type="button"
                        onClick={() => setInputVal("")}
                        className="h-7 w-7 hover:bg-gray-100 rounded-full"
                    >
                        <span className="text-gray-500">×</span>
                    </button>
                )}
            </div>

            {inputVal && (
                <div
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 max-h-60 overflow-y-auto z-10"
                    aria-live="polite"
                >
                    <div className="p-2">
                        <div className="text-sm text-gray-500">
                            Searching for "{inputVal}"...
                        </div>
                        {/* You can add search suggestions here */}
                        <div className="mt-1 space-y-1">
                            <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                                {inputVal}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}
