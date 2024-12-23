import React, { useState, useEffect, useRef } from "react";
import { toast } from "material-react-toastify";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../../Redux/slices/usersSlice";
import Category from "../../Page/Category/Category";

export default function Search() {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const originalData = useSelector((state) => state.Ecommers.data);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const generateSuggestions = (inputVal) => {
    if (!inputVal) return [];
    return originalData
      .filter(
        (item) =>
          item.name.toLowerCase().includes(inputVal.toLowerCase()) ||
          item.price.toString().includes(inputVal)
      )
      .slice(0, 5);
  };

  const handleChange = (e) => {
    const inputVal = e.target.value;
    setValue(inputVal);
    const suggestedItems = generateSuggestions(inputVal);
    setSuggestions(suggestedItems);

    if (inputVal.trim()) {
      const filtered = originalData.filter(
        (item) =>
          item.name.toLowerCase().includes(inputVal.toLowerCase()) ||
          item.price.toString().includes(inputVal)
      );
      dispatch(setData(filtered));
    } else {
      dispatch(setData(originalData));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      dispatch(setData(originalData));
      toast.error("Please provide a valid search query.");
      return;
    }

    const filtered = originalData.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.price.toString().includes(value)
    );

    if (filtered.length === 0) {
      toast.warn("No products found matching your search.");
      dispatch(setData(originalData));
    } else {
      toast.success(`Found ${filtered.length} product(s)`);
      dispatch(setData(filtered));
    }
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion.name);
    dispatch(setData([suggestion]));
    setSuggestions([]);
    inputRef.current.blur();
    toast.success("Product selected");
  };

  const handleClear = () => {
    setValue("");
    setSuggestions([]);
    dispatch(setData(originalData));
  };

  return (
    <div className="container mx-auto px-4 py-2 w-full flex flex-col justify-center items-center z-40">
      <form
        onSubmit={handleSearch}
        className="relative w-[95%] md:w-[60%] mx-auto transform transition-all duration-300 hover:scale-[1.01]"
      >
        <div className="relative w-full flex justify-center items-center gap-2 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoSearchOutline className="text-gray-400 text-2xl group-hover:text-gray-400 transition-colors duration-300" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search products..."
            className="w-full h-12 md:h-14 pl-10 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-[4px] focus:ring-green-300 focus:border-transparent transition-all duration-300 ease-in-out shadow-sm hover:shadow-md text-base md:text-lg placeholder:text-gray-400 hover:border-green-200 text-dark"
          />

          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-[25%] right-20 my-auto flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transform transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <IoCloseOutline className="h-6 w-6" />
            </button>
          )}

          <button
            type="submit"
            className="w-14 md:w-16 h-12 md:h-14 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 flex items-center justify-center  transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            <IoSearchOutline className="h-6 w-6" />
          </button>
        </div>

        {isFocused && suggestions.length > 0 && (
          <ul
            className="absolute z-50 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg mt-1 max-h-72 overflow-y-auto transform transition-all duration-300 animate-fadeIn"
          >
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-3 hover:bg-green-50 dark:hover:bg-green-700 cursor-pointer flex justify-between items-center  transition-all duration-200 last:rounded-b-lg border-b last:border-b-0 border-gray-100 group"
              >
                <span
                  className="truncate mr-2 group-hover:text-green-700 text-gray-800 dark:group-hover:text-green-300 transition-colors duration-200"
                >
                  {suggestion.name}
                </span>
                <span
                  className="text-gray-500 dark:text-gray-400 text-sm shrink-0 group-hover:text-green-600 dark:group-hover:text-green-300"
                >
                  ${suggestion.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </form>
      <Category isSearch={"isSearch"} />
    </div>
  );
}
