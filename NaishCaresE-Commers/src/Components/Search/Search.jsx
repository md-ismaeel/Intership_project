import { toast } from "material-react-toastify";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function Search() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const inputVal = e.target.value.trim();
    setValue(inputVal);
  };

  function handleSearch(e) {
    e.preventDefault();

    if (!value) {
      toast.error("please provide keys");
    }
    setValue("")
  }
  return (
    <>
      <form onSubmit={handleSearch} className={`relative w-[240px] h-[35px] flex justify-center items-center`}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search products!"
          className={`w-full h-full rounded-l-md border px-5 py-1 outline-none`}
        />
        <button
          type="submit"
          className="h-[35px] w-[45px] bg-orange-600 flex justify-center items-center text-xl text-white font-semibold rounded-r-md "
        >
          <IoSearchOutline />
        </button>
      </form>
    </>
  );
}
