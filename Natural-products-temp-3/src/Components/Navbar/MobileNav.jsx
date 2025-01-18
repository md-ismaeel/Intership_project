import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserAuthenticated, setIsOpenCart } from "../../Redux/Slice/OrgSlice";
import { isActiveClass, navLinks } from "../../Constant/Constant";
import { IoMdCart } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";

const MobileNav = ({ toggleMenu, isMenuOpen }) => {
  const { cart, isAuthenticated, wishList, isOpenCart } = useSelector((state) => state?.Org);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Toggle the cart open/close state
  function handleOpenCart() {
    dispatch(setIsOpenCart(!isOpenCart));
    toggleMenu()
  }

  // General navigation handler
  function handleNavigation(path) {
    toggleMenu(); // Close the menu
    navigate(path); // Navigate to the specified path
  }

  // Handle login/logout logic
  function handleLoginLogoutNavigation(path, isLoggingOut = false) {
    if (isLoggingOut) {
      // Dispatch logout action and navigate to home
      dispatch(setUserAuthenticated(false));
      navigate(path);
    } else {
      handleNavigation(path); // Navigate to login or signup
    }
  }

  return (
    <>
      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* Main Navigation Menu */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-[10005] transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <IoCloseOutline className="h-6 w-6 text-gray-600" />
            </button>

            <div className="flex items-center gap-2">
              {/* Wishlist */}
              {isAuthenticated && (
                <div
                  onClick={() => handleNavigation("/wishList")}
                  className="relative rounded-full p-2 bg-green-200 cursor-pointer hover:bg-green-300 transition-colors group focus-within:ring-2 focus-within:ring-green-500"
                >
                  <AiOutlineHeart className="text-[20px] sm:text-[25px] text-green-800" />
                  {Array.isArray(wishList) && wishList.length > 0 && (
                    <span
                      className="absolute bg-red-500 top-[-5px] right-[-6px] h-5 w-5 sm:h-6 sm:w-6 rounded-full text-xs sm:text-[12px] text-white flex justify-center items-center"
                    >
                      {wishList.length}
                    </span>
                  )}
                </div>
              )}

              {/* User Profile */}
              <div className="relative rounded-full bg-green-200 cursor-pointer hover:bg-green-300 transition-colors group focus-within:ring-2 focus-within:ring-green-500">
                <button className="p-2 rounded-full">
                  {!isAuthenticated ? (
                    <FaRegUser className="text-xl text-green-800" />
                  ) : (
                    <CiLogout className="text-xl text-green-800" />
                  )}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {isAuthenticated ? (
                    <div className="py-1">
                      <button
                        onClick={() => handleNavigation("/profile")}
                        className="block w-full text-left px-4 py-2 text-[12px] uppercase text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </button>
                      {/* <button
                        onClick={() => handleNavigation("/wishList")}
                        className="block w-full text-left px-4 py-2 text-[12px] uppercase text-gray-700 hover:bg-gray-100"
                      >
                        Wishlist
                      </button> */}
                      <button
                        onClick={() => handleLoginLogoutNavigation("/", true)}
                        className="block w-full text-left px-4 py-2 text-[12px] uppercase text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="py-1">
                      <button
                        onClick={() => handleNavigation("/signin")}
                        className="block w-full text-left px-4 py-2 text-[12px] uppercase text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => handleNavigation("/signup")}
                        className="block w-full text-left px-4 py-2 text-[12px] uppercase text-gray-700 hover:bg-gray-100"
                      >
                        Register
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Cart */}
              <button
                onClick={handleOpenCart}
                className="relative rounded-full p-2 bg-green-200 cursor-pointer hover:bg-green-300 transition-colors group focus-within:ring-2 focus-within:ring-green-500"
              >
                <IoMdCart className="text-xl text-green-800" />
                {Array.isArray(cart) && cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <NavLink
                    to={link.path}
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-lg transition-colors ${isActive ? "bg-green-100 text-green-800" : "text-gray-600 hover:bg-gray-100"
                      }`
                    }
                  >
                    {link.Label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
