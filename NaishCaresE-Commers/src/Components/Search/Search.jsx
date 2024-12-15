import React, { useState, useEffect, useRef } from 'react';
import { toast } from "material-react-toastify";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../../Redux/slices/usersSlice";

export default function Search() {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const originalData = useSelector((state) => state.Ecommers.data);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  // Generate suggestions based on input
  const generateSuggestions = (inputVal) => {
    if (!inputVal) return [];

    return originalData.filter((item) =>
      item.name.toLowerCase().includes(inputVal.toLowerCase()) ||
      item.price.toString().includes(inputVal)
    ).slice(0, 5);
  };

  // Handle input change with real-time filtering
  const handleChange = (e) => {
    const inputVal = e.target.value;
    setValue(inputVal);

    // Generate suggestions
    const suggestedItems = generateSuggestions(inputVal);
    setSuggestions(suggestedItems);

    if (inputVal.trim()) {
      const filtered = originalData.filter((item) =>
        item.name.toLowerCase().includes(inputVal.toLowerCase()) ||
        item.price.toString().includes(inputVal)
      );
      dispatch(setData(filtered));
    } else {
      dispatch(setData(originalData));
    }
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();

    if (!value.trim()) {
      // If no input, restore original data
      dispatch(setData(originalData));
      toast.error("Please provide a valid search query.");
      return;
    }

    const filtered = originalData.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()) || item.price.toString().includes(value));

    if (filtered.length === 0) {
      toast.warn("No products found matching your search.");
      // Restore original data if no results
      dispatch(setData(originalData));
    } else {
      toast.success(`Found ${filtered.length} product(s)`);
      dispatch(setData(filtered));
    }

    setSuggestions([]);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion.name);
    dispatch(setData([suggestion]));
    setSuggestions([]);
    inputRef.current.blur();
    toast.success("Product selected");
  };

  // Clear search
  const handleClear = () => {
    setValue("");
    setSuggestions([]);
    // Explicitly restore original data
    dispatch(setData(originalData));
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <form
        onSubmit={handleSearch}
        className="relative max-w-xl mx-auto"
      >
        <div className="relative w-full flex justify-center items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoSearchOutline className="text-gray-400" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search products..."
            className="w-[100%] h-12 md:h-14 pl-10 pr-12 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent 
              transition-all duration-300 ease-in-out shadow-sm"
          />

          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-16 my-auto flex items-center 
                text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <IoCloseOutline className="h-5 w-5" />
            </button>
          )}

          <button
            type="submit"
            className="absolute inset-y-0 right-0 w-16 bg-orange-600 text-white 
              rounded-r-lg hover:bg-orange-700 focus:outline-none focus:ring-2 
              focus:ring-orange-500 flex items-center justify-center 
              transition-colors duration-300"
          >
            <IoSearchOutline className="h-5 w-5" />
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {isFocused && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 
            rounded-b-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer 
                  flex justify-between items-center transition-colors 
                  duration-200 last:rounded-b-lg"
              >
                <span className="truncate mr-2">{suggestion.name}</span>
                <span className="text-gray-500 text-sm shrink-0">
                  ${suggestion.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}