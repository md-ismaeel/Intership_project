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
  const wishList = useSelector((state) => state?.Ecommers?.wishList || []);

  const activeClass = ({ isActive }) =>`${isActive? "text-orange-400 relative after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-white"
      : "hover:text-gray-300"
    } font-semibold transition-all duration-300 ease-in-out transform hover:scale-105`;

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

      <ul className="hidden md:flex md:w-[50%] justify-center gap-5 items-center text-white text-[15px] sm:text-[15px]">
        {navLinks.map((link) => (
          <NavLink key={link.path} to={link.path} className={activeClass}>
            {link.label}
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-2 sm:gap-4">
        {/*search Icons */}
        <div
          onClick={() => handleNavigate("/products")}
          className="relative rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-green-600 cursor-pointer hover:bg-green-700 transition-colors group"
        >
          <button
            aria-label="Products"
            className="text-[20px] sm:text-[25px] w-full h-full text-white flex justify-center items-center"
          >
            <IoSearchOutline className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* cart icon */}
        <div
          onClick={() => navigate("/cart")}
          className="relative rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-green-600 cursor-pointer hover:bg-green-700 transition-colors group"
        >
          <button
            aria-label="View cart"
            className="text-[20px] sm:text-[25px] w-full h-full text-white flex justify-center items-center"
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

        {/* wishlist icon */}
        <div
          onClick={() => handleNavigate("/wishList")}
          className="relative rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-green-600 cursor-pointer hover:bg-green-700 transition-colors group"
        >
          <button
            aria-label="View cart"
            className="text-[20px] sm:text-[25px] w-full h-full text-white flex justify-center items-center"
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
        {/* profile icon */}
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
              className="absolute top-4 right-4 text-[22px] text-red-600 hover:text-red-800 transition-colors"
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

// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import { FaCartArrowDown, FaSearch } from "react-icons/fa";
// import { AiOutlineHeart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import { IoSearchOutline } from "react-icons/io5";
// import { useSelector } from "react-redux";
// import logo from "../../assets/natural-logo.png";
// import Profile from "../Profile/Profile";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearchExpanded, setIsSearchExpanded] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isScrolled, setIsScrolled] = useState(false);

//   const cart = useSelector((state) => state?.Ecommers?.cartItem || []);
//   const wishList = useSelector((state) => state?.Ecommers?.wishList || []);

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Search handler
//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//       setIsSearchExpanded(false);
//     }
//   };

//   const activeClass = ({ isActive }) =>
//     `${isActive ? "text-orange-400 underline" : "hover:text-gray-300"}
//      font-semibold transition-all duration-300 ease-in-out transform hover:scale-105`;

//   const navLinks = [
//     { path: "/", label: "Home" },
//     { path: "/products", label: "Products" },
//     { path: "/about", label: "About" },
//     { path: "/contact", label: "Contact" },
//   ];

//   return (
//     <nav
//       className={`
//         w-full h-16 fixed z-50 flex justify-between items-center
//         ${isScrolled ? 'bg-primary shadow-lg' : 'bg-primary/80 backdrop-blur-sm'}
//         px-4 sm:px-10 py-1 transition-all duration-300 ease-in-out
//       `}
//     >
//       {/* Logo with hover effect */}
//       <div
//         onClick={() => navigate("/")}
//         className="cursor-pointer flex justify-end items-center transition-transform duration-300 hover:scale-110"
//       >
//         <img
//           src={logo}
//           alt="Naisha Naturals logo"
//           className="w-[40px] sm:w-[45px] h-[40px] sm:h-[45px] rounded-full shadow-md hover:shadow-lg"
//         />
//       </div>

//       {/* Desktop Navigation */}
//       <ul className="hidden md:flex md:w-[50%] justify-center gap-5 items-center text-white text-[15px] sm:text-[15px]">
//         {navLinks.map((link) => (
//           <NavLink
//             key={link.path}
//             to={link.path}
//             className={activeClass}
//           >
//             {link.label}
//           </NavLink>
//         ))}
//       </ul>

//       {/* Icons and Interactive Search */}
//       <div className="flex items-center gap-2 sm:gap-4">
//         {/* Enhanced Search */}
//         <div className="relative">
//           {isSearchExpanded ? (
//             <form onSubmit={handleSearch} className="flex items-center">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="
//                   w-full pl-2 pr-10 py-1 rounded-full
//                   text-gray-700 bg-white focus:outline-none
//                   focus:ring-2 focus:ring-green-500
//                   transition-all duration-300
//                 "
//                 autoFocus
//               />
//               <button
//                 type="submit"
//                 className="absolute right-2 text-green-600"
//               >
//                 <FaSearch />
//               </button>
//             </form>
//           ) : (
//             <button
//               onClick={() => setIsSearchExpanded(true)}
//               aria-label="Open search"
//               className="text-[20px] sm:text-[25px] text-white bg-green-600 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center hover:bg-green-700 transition-colors"
//             >
//               <IoSearchOutline />
//             </button>
//           )}
//         </div>

//         {/* Cart with hover and interactive badge */}
//         <div
//           onClick={() => navigate("/cart")}
//           className="relative rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-green-600 cursor-pointer hover:bg-green-700 transition-colors group"
//         >
//           <button
//             aria-label="View cart"
//             className="text-[20px] sm:text-[25px] w-full h-full text-white flex justify-center items-center"
//           >
//             <FaCartArrowDown className="group-hover:scale-110 transition-transform" />
//           </button>
//           {Array.isArray(cart) && cart.length > 0 && (
//             <span className="
//               absolute bg-red-500 top-[-5px] right-[-6px]
//               h-5 w-5 sm:h-6 sm:w-6 rounded-full
//               text-xs sm:text-sm text-white
//               flex justify-center items-center
//               animate-pulse
//             ">
//               {cart.length}
//             </span>
//           )}
//         </div>

//         {/* Wishlist with hover and interactive badge */}
//         <div
//           onClick={() => navigate("/wishList")}
//           className="relative rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-green-600 cursor-pointer hover:bg-green-700 transition-colors group"
//         >
//           <button
//             aria-label="View wishlist"
//             className="text-[20px] sm:text-[25px] w-full h-full text-white flex justify-center items-center"
//           >
//             <AiOutlineHeart className="group-hover:scale-110 transition-transform" />
//           </button>
//           {Array.isArray(wishList) && wishList.length > 0 && (
//             <span className="
//               absolute bg-red-500 top-[-5px] right-[-6px]
//               h-5 w-5 sm:h-6 sm:w-6 rounded-full
//               text-xs sm:text-sm text-white
//               flex justify-center items-center
//               animate-pulse
//             ">
//               {wishList.length}
//             </span>
//           )}
//         </div>

//         <Profile />

//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden text-white text-[25px] hover:text-orange-400 transition-colors"
//           onClick={() => setIsMenuOpen((prev) => !prev)}
//           aria-label="Toggle mobile menu"
//         >
//           {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
//         </button>
//       </div>

//       {/* Mobile Menu with Slide Animation */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 z-50 flex">
//           <div
//             className="absolute inset-0 bg-black bg-opacity-50"
//             onClick={() => setIsMenuOpen(false)}
//             aria-label="Close menu overlay"
//           ></div>
//           <ul className="
//             absolute top-0 right-0 w-[50%] h-screen
//             bg-primary flex flex-col justify-start
//             items-start gap-4 p-4 text-white text-[16px]
//             transform transition-transform translate-x-0
//             animate-slide-in-right
//           ">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.path}
//                 to={link.path}
//                 className={activeClass}
//                 onClick={() => handleNavigate(link.path)}
//               >
//                 {link.label}
//               </NavLink>
//             ))}
//             <button
//               className="absolute top-4 right-4 text-[22px] text-red-600 hover:text-red-800 transition-colors"
//               onClick={() => setIsMenuOpen(false)}
//               aria-label="Close menu"
//             >
//               <AiOutlineClose />
//             </button>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }
