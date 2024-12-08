import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import Search from "../Search/Search";
import logo from "../../assets/natural-logo.jpeg";
import Profile from "../Profile/Profile";
import { AiOutlineHeart } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";

export default function Navbar() {
  const navigator = useNavigate();
  const active = ({ isActive }) => `${isActive ? "text-orange-400" : "hover:text-gray-300"} font-medium`;

  return (
    <nav
      className={`w-full h-14 fixed z-50 flex justify-between items-center bg-primary px-10 py-1`}
    >
      <div
        onClick={() => navigator("/")}
        className={`w-[10%] h-[50px] cursor-pointer flex justify-end items-center`}
      >
        <img
          src={logo}
          alt="logo"
          className="w-[45px] h-[45px] rounded-full flex justify-center items-center"
        />
      </div>

      <ul
        className={`w-[50%] flex justify-center gap-5 items-center text-white text-[18px]`}
      >
        <NavLink to="/" className={active}>Home</NavLink>
        <NavLink to="/product" className={active}>Products</NavLink>
        <NavLink to="/about" className={active}>About</NavLink>
        <NavLink to="/contact" className={active}>Contact</NavLink>
      </ul>

      <div className={`w-[15%] flex justify-between items-center`}>
        <button onClick={() => navigator("/search")}></button>
        <button
          onClick={() => navigator("/cart")}
          className="text-[30px] text-white"
        >
          <FaCartArrowDown />
        </button>
        <button
          onClick={() => navigator("/wishList")}
          className="text-[30px] text-white"
        >
          <AiOutlineHeart />
        </button>
        <Profile />
      </div>
    </nav>
  );
}
