import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import logo from "../../assets/natural-logo.png";
import Profile from "../Profile/Profile";
import { AiOutlineHeart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useSelector((state) => state?.Ecommers?.cartItem || []);
  const isAuthenticated = useSelector((state) => state?.Ecommers?.isAuthenticated);
  const wishList = useSelector((state) => state?.Ecommers?.wishList || []);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const activeClass = ({ isActive }) => `${isActive ? "text-orange-400 relative after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-orange-500" : "hover:text-gray-300"} font-semibold transition-all duration-300 ease-in-out transform hover:scale-105`;

  const handleNavigate = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
  ];

  function handleOpenProfile() {
    setIsProfileOpen((prev) => !prev);
  }

  return (
    <nav className="w-full h-16 fixed z-50 flex justify-between items-center bg-primary px-4 sm:px-6 py-1">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer flex justify-end items-center"
      >
        <img
          src={logo}
          alt="Naisha Naturals logo"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
        />
      </div>

      <ul className="hidden md:flex md:w-[50%] justify-center gap-5 items-center text-white text-[15px] sm:text-[15px]">
        {navLinks.map((link) => (
          <NavLink key={link.path} to={link.path} className={activeClass}>
            {link.label}
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search Icon */}
        <div
          onClick={() => handleNavigate("/products")}
          className="relative rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-green-600 cursor-pointer hover:bg-green-700 transition-colors group focus-within:ring-2 focus-within:ring-green-500"
        >
          <button
            aria-label="Products"
            className="text-[20px] sm:text-[25px] w-full h-full text-white flex justify-center items-center focus:outline-none"
          >
            <IoSearchOutline className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Cart Icon */}
        <div
          onClick={() => navigate("/cart")}
          className="relative rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-green-600 cursor-pointer hover:bg-green-700 transition-colors group focus-within:ring-2 focus-within:ring-green-500"
        >
          <button
            aria-label="View cart"
            className="text-[20px] sm:text-[25px] w-full h-full text-white flex justify-center items-center focus:outline-none"
          >
            <FaCartArrowDown className="group-hover:scale-110 transition-transform" />
          </button>
          {Array.isArray(cart) && cart.length > 0 && (
            <span
              className="
              absolute bg-red-500 top-[-5px] right-[-6px] 
              h-5 w-5 sm:h-6 sm:w-6 rounded-full 
              text-xs sm:text-sm text-white 
              flex justify-center items-center
              animate-pulse
            "
            >
              {cart.length}
            </span>
          )}
        </div>

        {/* Wishlist Icon */}
        <div
          onClick={() => handleNavigate("/wishList")}
          className="relative rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-green-600 cursor-pointer hover:bg-green-700 transition-colors group focus-within:ring-2 focus-within:ring-green-500"
        >
          <button
            aria-label="View wishlist"
            className="text-[20px] sm:text-[25px] w-full h-full text-white flex justify-center items-center focus:outline-none"
          >
            <AiOutlineHeart className="group-hover:scale-110 transition-transform" />
          </button>
          {Array.isArray(wishList) && wishList.length > 0 && (
            <span
              className="
              absolute bg-red-500 top-[-5px] right-[-6px] 
              h-5 w-5 sm:h-6 sm:w-6 rounded-full 
              text-xs sm:text-sm text-white 
              flex justify-center items-center
              animate-pulse"
            >
              {wishList.length}
            </span>
          )}
        </div>

        {/* Profile Icon */}
        <div
          className="relative focus-within:ring-2 focus-within:ring-green-500 rounded-full"
          onClick={handleOpenProfile}
        >
          <button
            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-green-600 cursor-pointer flex justify-center items-center text-white text-[22px] focus:outline-none"
          >
            <FaRegUser />
          </button>
          {isProfileOpen && <Profile />}
        </div>

        <button
          className="md:hidden text-white text-[25px] focus:ring-[1px] focus:ring-green-300 focus:outline-none"
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
          <ul
            className="
            absolute top-0 right-0 w-[50%] h-screen 
            bg-primary flex flex-col justify-start 
            items-start gap-4 p-4 text-white text-[16px] 
            transform transition-transform translate-x-0
            animate-slide-in-right
          "
          >
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
              className="absolute top-4 right-4 text-[22px] text-red-600 hover:text-red-800 transition-colors focus:ring-[1px] focus:ring-red-400 focus:outline-none"
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