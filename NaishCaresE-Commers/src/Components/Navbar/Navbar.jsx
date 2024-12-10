import React, { useState, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import logo from "../../assets/natural-logo.png";
import Profile from "../Profile/Profile";
import { AiOutlineHeart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useSelector((state) => state?.Ecommers?.cartItem || []);
  const wishList = useSelector((state) => state?.Ecommers?.wishList || [])

  const activeClass = ({ isActive }) => `${isActive ? "text-orange-400" : "hover:text-gray-300"} font-medium`;


  const handleNavigate = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="w-full h-16 fixed z-50 flex justify-between items-center bg-primary px-4 sm:px-10 py-1">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer flex justify-end items-center"
      >
        <img
          src={logo}
          alt="Naisha Naturals logo"
          className="w-[40px] sm:w-[45px] h-[40px] sm:h-[45px] rounded-full"
        />
      </div>

      <ul className="hidden md:flex md:w-[50%] justify-center gap-5 items-center text-white text-[16px] sm:text-[18px]">
        {navLinks.map((link) => (
          <NavLink key={link.path} to={link.path} className={activeClass}>
            {link.label}
          </NavLink>
        ))}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={() => handleNavigate("/products")}
          aria-label="Search products"
          className="text-[20px] sm:text-[25px] text-white bg-green-600 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center"
        >
          <IoSearchOutline />
        </button>

        <div
          onClick={() => handleNavigate("/cart")}
          className="relative rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-green-600 cursor-pointer"
        >
          <button
            aria-label="View cart"
            className="text-[20px] sm:text-[25px] w-full h-full text-white flex justify-center items-center"
          >
            <FaCartArrowDown />
          </button>
          {Array.isArray(cart) && cart.length > 0 && (
            <span className="absolute bg-red-500 top-[-5px] right-[-6px] h-5 w-5 sm:h-6 sm:w-6 rounded-full text-xs sm:text-sm text-white flex justify-center items-center">
              {cart.length}
            </span>
          )}
        </div>

        <div
          onClick={() => handleNavigate("/wishList")}
          className="relative rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-green-600 cursor-pointer"
        >
          <button
            aria-label="View cart"
            className="text-[20px] sm:text-[25px] w-full h-full text-white flex justify-center items-center"
          >
            <AiOutlineHeart />
          </button>
          {Array.isArray(wishList) && wishList.length > 0 && (
            <span className="absolute bg-red-500 top-[-5px] right-[-6px] h-5 w-5 sm:h-6 sm:w-6 rounded-full text-xs sm:text-sm text-white flex justify-center items-center">
              {wishList.length}
            </span>
          )}
        </div>

        {/* <button
          onClick={() => handleNavigate("/wishList")}
          aria-label="View wishlist"
          className="text-[20px] sm:text-[25px] text-white bg-green-600 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center"
        >
          <AiOutlineHeart />
        </button> */}

        <Profile />

        <button
          className="md:hidden text-white text-[25px]"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle mobile menu"
        >
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu overlay"
          ></div>
          <ul className="absolute top-0 right-0 w-[50%] h-screen bg-primary flex flex-col justify-start items-start gap-4 p-4 text-white text-[16px] transform transition-transform translate-x-0">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={activeClass}
                onClick={() => handleNavigate(link.path)}
              >
                {link.label}
              </NavLink>
            ))}
            <button
              className="absolute top-4 right-4 text-[22px] text-red-600"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <AiOutlineClose />
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
}
