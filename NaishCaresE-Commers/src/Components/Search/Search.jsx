import { toast } from "material-react-toastify";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../../Redux/slices/usersSlice";

export default function Search() {
  const [value, setValue] = useState("");
  const originalData = useSelector((state) => state.Ecommers.data);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const inputVal = e.target.value;
    setValue(inputVal);

    // Real-time filtering
    if (inputVal) {
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

    if (!value) {
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
    }

    dispatch(setData(filtered));
    setValue("");
  };

  return (
    <div className="w-full flex justify-center items-center">
      <form
        onSubmit={handleSearch}
        className="relative w-[90%] md:w-[500px] h-[45px] flex justify-center items-center"
      >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search products!"
          className="w-full h-full rounded-md border px-5 py-1 outline-none transition-all duration-300 ease-in-out 
          focus:ring-1 focus:ring-orange-600 focus:border-orange-600 hover:shadow-md"
        />
        <button
          type="submit"
          className="absolute top-0 right-0 h-[44.5px] w-[50px] md:w-[70px] bg-orange-600 flex justify-center items-center text-xl text-white font-semibold rounded-r-md 
          hover:bg-orange-700 transition-colors duration-300"
        >
          <IoSearchOutline />
        </button>
      </form>
    </div>
  );
}
