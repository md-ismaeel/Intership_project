import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

const FloatingLabelInput = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
}) => {
  const [isHidden, setHidden] = useState(true);
  const inputTypes = type === "password" ? (isHidden ? "password" : "text") : type;

  const handleVisibility = (e) => {
    e.preventDefault();
    setHidden(!isHidden);
  };

  return (
    <div className="relative w-full">
      <input
        type={inputTypes}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`block w-full px-4 h-[45px] text-bas text-white border rounded-lg appearance-none transition-colors duration-200 focus:outline-none focus:ring-2  ${disabled ? "opacity-50 cursor-not-allowed" : ""
          } peer placeholder:text-gray-800 `}
      />
      {required && <span className="text-red-500 ml-1">*</span>}
      {type === "password" && (
        <button
          type="button"
          className={`absolute top-[9px] right-5 cursor-pointer z-10 px-2 py-1`}
          onClick={handleVisibility}
        >
          {isHidden ? (
            <FaEyeSlash className="text-xl text-gray-500" />
          ) : (
            <IoEyeSharp className="text-xl text-gray-500" />
          )}
        </button>
      )}
    </div>
  );
};

export default FloatingLabelInput;
