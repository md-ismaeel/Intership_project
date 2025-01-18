import React, { useState } from "react";
import { isActiveClass, navLinks } from "../../Constant/Constant";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenCart, setUserAuthenticated } from "../../Redux/Slice/OrgSlice";
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import SearchBar from "../Search/SearchBar";
import { AiOutlineHeart } from "react-icons/ai";
import { toast } from "material-react-toastify";

export default function Navbar({ toggleMenu }) {
  const { isAuthenticated, cart, isOpenCart, wishList } = useSelector(
    (state) => state?.Org
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  function handleOpenCart() {
    dispatch(setIsOpenCart(!isOpenCart));
  }


  function handleNavigation(path) {
    // toggleMenu(); // Close the menu
    navigator(path); // Navigate to the specified path
  }

  async function handleLogout() {
    try {
      setLoading(true);
      // Add any cleanup logic here (e.g., clearing local storage, cookies)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      dispatch(setUserAuthenticated(false));
      navigator("/");
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Failed to logout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <nav className="fixed top-0 w-full h-[4rem] flex items-center justify-between px-2 lg:px-6 bg-gradient-to-r from-green-100 via-green-200 to-green-100 shadow-md z-[1000]">
      {/* Logo */}
      <div
        onClick={() => navigator("/")}
        className="flex items-center cursor-pointer gap-2"
      >
        <img
          src={
            "https://thumbs.dreamstime.com/b/organic-logo-design-concept-template-organic-logotype-template-organic-farm-fresh-products-unique-sign-icon-art-isolated-97665363.jpg"
          }
          alt="Naturals Logo"
          className="w-[50px] h-[50px] object-contain rounded-full shadow-xl shadow-emerald-900/20"
        />
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-4 text-lg">
        {navLinks.map((link) => (
          <NavLink key={link.id} to={link.path} className={isActiveClass}>
            {link.Label}
          </NavLink>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigator("/search")}>
          <SearchBar />
        </button>

        {/* Cart Icon */}
        <div
          onClick={handleOpenCart}
          className="relative hidden md:block rounded-full bg-green-200 cursor-pointer hover:bg-green-300 transition-colors group focus-within:ring-2 focus-within:ring-green-500"
        >
          <button className="p-2 rounded-full bg-green-200 hover:bg-green-300 transition duration-200">
            <IoMdCart className="text-2xl text-green-800" />
            {Array.isArray(cart) && cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Wishlist Icon */}
        {isAuthenticated && (
          <div
            onClick={() => navigator("/wishList")}
            className="relative hidden md:block rounded-full p-2 bg-green-200 cursor-pointer hover:bg-green-300 transition-colors group focus-within:ring-2 focus-within:ring-green-500"
          >
            <button
              aria-label="View wishlist"
              className="text-[20px] sm:text-[25px] w-full h-full text-green-800 flex justify-center items-center focus:outline-none"
            >
              <AiOutlineHeart />
            </button>
            {Array.isArray(wishList) && wishList.length > 0 && (
              <span className="absolute bg-red-500 top-[-5px] right-[-6px] h-5 w-5 sm:h-6 sm:w-6 rounded-full text-xs sm:text-[12px] text-white flex justify-center items-center">
                {wishList.length}
              </span>
            )}
          </div>
        )}

        {/* User Authentication */}
        <div className="relative hidden md:block rounded-full bg-green-200 cursor-pointer hover:bg-green-300 transition-colors group focus-within:ring-2 focus-within:ring-green-500">
          <button className="p-2 rounded-full bg-green-200 hover:bg-green-300 transition duration-200">
            {isAuthenticated ? (
              <CiLogout className="text-2xl text-green-800" />
            ) : (
              <FaRegUser className="text-2xl text-green-800" />
            )}
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            {isAuthenticated ? (
              <div className="py-2">
                <button
                  onClick={() => handleNavigation("/profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[12px] uppercase"
                >
                  Profile
                </button>
                <button
                  onClick={() => handleNavigation("/wishList")}
                  className="block w-full text-left px-4 py-2 text-[12px] uppercase hover:bg-gray-100"
                >
                  Wishlist
                </button>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="block w-full text-left px-4 py-2 text-[12px] uppercase hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center font-medium gap-2">
                    {loading && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600" />
                    )}
                    {loading ? "Logging out..." : "Logout"}
                  </div>
                </button>
              </div>
            ) : (
              <div className="py-2">
                <button
                  onClick={() => handleNavigation("/signin")}
                  className="block w-full text-left px-4 py-2 text-[12px] uppercase hover:bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation("/signup")}
                  className="block w-full text-left px-4 py-2 text-[12px] uppercase hover:bg-gray-100"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden md:hidden p-2 rounded bg-green-200 hover:bg-green-300 transition duration-200"
        onClick={toggleMenu}
      >
        <IoMenu className="text-2xl text-green-800" />
      </button>
    </nav>
  );
}
