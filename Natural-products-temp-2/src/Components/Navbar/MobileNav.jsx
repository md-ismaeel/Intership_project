import React, { useState } from "react";
import { isActiveClass, navLinks, navStyles } from "../../Constant/Constant";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenCart, setUserAuthenticated } from "../../Redux/Slice/N4NSlice";
import { IoCloseOutline } from "react-icons/io5";

export default function MobileNav({ isMenuOpen, toggleMenu }) {
  const { userAuthenticated, cart, isOpenCart } = useSelector((state) => state?.N4N);
  const navigator = useNavigate();
  const [navBg, setNavBg] = useState(false);
  const dispatch = useDispatch()

  function handleOpenCart() {
    dispatch(setIsOpenCart(!isOpenCart))
  }

  return (
    <>
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="absolute top-0 w-full h-screen z-40 bg-black opacity-70 "
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 w-[100%] h-full bg-gray-200 z-50 transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* User Authentication Icon */}
        <div className="absolute top-5 left-5">
          <div className="relative group">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-700">
              <svg
                width="24"
                height="24"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                id="svgkp"
              >
                <path
                  d="M22.9129 12.935L13.7571 23.0474C13.5348 23.2929 13.1284 23.1084 13.1669 22.7794L14.0816 14.9731H10.6991C10.4034 14.9731 10.2484 14.6219 10.4478 14.4035L20.3133 3.59739C20.5589 3.32834 20.9984 3.58134 20.8891 3.92887L18.2354 12.3664H22.6607C22.9557 12.3664 23.1109 12.7163 22.9129 12.935Z"
                  fill="#FEA203"
                ></path>
                <path
                  id="svgkp-path"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.6079 5.35819C16.4805 5.1933 16.3421 5.03582 16.1932 4.8869C15.2702 3.96387 14.0183 3.44531 12.7129 3.44531C11.4075 3.44531 10.1556 3.96387 9.2326 4.8869C8.30957 5.80993 7.79102 7.06183 7.79102 8.36719C7.79102 9.67255 8.30957 10.9244 9.2326 11.8475C9.48368 12.0986 9.75909 12.3197 10.0533 12.5086L11.0235 11.4503C10.7335 11.2914 10.4649 11.0911 10.227 10.8531C9.56766 10.1938 9.19727 9.29959 9.19727 8.36719C9.19727 7.43479 9.56766 6.54057 10.227 5.88127C10.8863 5.22196 11.7805 4.85156 12.7129 4.85156C13.6453 4.85156 14.5395 5.22196 15.1988 5.88127C15.3636 6.04604 15.5103 6.22549 15.6377 6.41654L16.6079 5.35819ZM20.6413 18.6497L19.6746 19.7132C20.1676 20.4122 20.4473 21.2264 20.4473 22.0781V23.8359C20.4473 24.2243 20.7621 24.5391 21.1504 24.5391C21.5387 24.5391 21.8535 24.2243 21.8535 23.8359V22.0781C21.8535 20.7863 21.4016 19.6103 20.6413 18.6497ZM12.3111 17.5078H10.3026C7.27113 17.5078 4.97852 19.6394 4.97852 22.0781V23.8359C4.97852 24.2243 4.66372 24.5391 4.27539 24.5391C3.88707 24.5391 3.57227 24.2243 3.57227 23.8359V22.0781C3.57227 18.6922 6.67684 16.1016 10.3026 16.1016H12.4885L12.3111 17.5078Z"
                  fill="currentColor"
                  stroke="currentColor"
                ></path>
              </svg>
            </button>

            <div className="absolute left-0 z-[100000] mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {userAuthenticated && userAuthenticated ? (
                <div className="py-2">
                  <button className={navStyles.authBtn}>
                    Profile
                  </button>
                  <button onClick={() => navigator("/wishList")} className={navStyles.authBtn}>
                    wishList
                  </button>
                  <button className={navStyles.authBtn}>
                    Settings
                  </button>
                  <button onClick={() => dispatch(setUserAuthenticated(false))} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="py-2">
                  <button
                    onClick={() => {
                      navigator("/signin");
                      toggleMenu();
                    }}
                    className={navStyles.authBtn}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigator("/signup");
                      toggleMenu();
                    }}
                    className={navStyles.authBtn}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>


        {/* close button */}
        <button onClick={toggleMenu}
          className={`absolute right-3 top-6 text-gray-700 transition all duration-1000 hover:rotate-180`}>
          <IoCloseOutline className="h-6 w-6" />
        </button>

        <ul className="w-full flex flex-col border-2 border-t-gray-300 py-2 items-start justify-start gap-3 mt-16 text-[16px] font-medium">
          {navLinks.map((link) => (
            <NavLink
              onClick={toggleMenu}
              key={link.id}
              to={link.path}
              className={`${isActiveClass} w-full hover:scale-100 border-b border-gray-400 p-2 px-5 text-[14px]`}
            >
              {link.Label}
            </NavLink>
          ))}

          {/* left container */}
          <div className="flex flex-col justify-center items-center gap-0">
            {/* search icon */}
            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                onClick={() => navigator("/cart")}
              >
                <IoSearchOutline className="text-2xl text-gray-700" />
              </button>
            </div>

            {/* Cart Icon */}
            <div className="absolute top-5 left-20">
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  onClick={handleOpenCart}
                >
                  <IoCartOutline className="text-2xl text-gray-700" />
                  {Array.isArray(cart) && cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
}
