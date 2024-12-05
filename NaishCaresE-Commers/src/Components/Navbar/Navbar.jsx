import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import Search from "../Search/Search";
export default function Navbar() {
  const navigator = useNavigate();
  return (
    <div
      className={`w-full h-14 fixed z-50 flex justify-between items-center bg-green-500`}
    >
      <div
        onClick={() => navigator("/")}
        className={`w-[10%] h-[50px] cursor-pointer`}
      >
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/41hQSUGNWyL._UL500_.jpg"
          alt="logo"
          className="w-full h-full rounded-lg flex justify-center items-center"
        />
      </div>

      <ul
        className={`w-[55%] flex justify-center gap-5 items-center text-white text-lg`}
      >
        <NavLink to={"/"} className={``}>
          Home
        </NavLink>
        <NavLink to={"/product"} className={``}>
          Products
        </NavLink>
        <NavLink to={"/about"} className={``}>
          About
        </NavLink>
        <NavLink to={"/contact"} className={``}>
          Contact
        </NavLink>
      </ul>

      <div className={`w-[20%] flex justify-between items-center`}>
        <Search />
        <FaCartArrowDown />
        <button className="" onClick={() => ""}>
          {!isAuthenticated ? "Sign In" : ""}
        </button>
      </div>
    </div>
  );
}
