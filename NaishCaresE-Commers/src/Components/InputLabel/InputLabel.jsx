import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

const IngLabelInput = ({ type = "text", name, value, onChange, placeholder = "", required = false, disabled = false }) => {
  const [isHidden, setHidden] = useState(true);
  const inputTypes = type === "password" ? (isHidden ? "password" : "text") : type;

  const handleVisibility = (e) => {
    e.preventDefault();
    setHidden(!isHidden);
  };

  const styleCss = {
    container: `relative w-full`,
    inputField: `block w-full px-4 h-[45px] text-bas text-gray-800 border rounded-lg appearance-none transition-colors duration-200 focus:outline-none focus-within:ring-2 focus-within:ring-green-300  ${disabled ? "opacity-50 cursor-not-allowed" : ""} peer placeholder:text-gray-400`,
    eyeBtn: `absolute top-[9px] right-5 cursor-pointer z-10 px-2 py-1`,
    eyeIcon: `text-xl text-gray-500`
  }

  return (
    <div className={styleCss.container}>
      <input
        type={inputTypes}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={styleCss.inputField}
      />
      {type === "password" && (
        <button
          type="button"
          className={styleCss.eyeBtn}
          onClick={handleVisibility}
        >
          {isHidden ? (
            <FaEyeSlash className={styleCss.eyeIcon} />
          ) : (
            <IoEyeSharp className={styleCss.eyeIcon} />
          )}
        </button>
      )}
    </div>
  );
};

export default IngLabelInput;
