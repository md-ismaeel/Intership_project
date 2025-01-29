"use client";
import React, { useState } from "react";
import Navigation from "./Navigation";
import Image from "next/image";
import logo from "@/app/assets/ecomers.webp";
import Link from "next/link";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/clerk-react";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { BsCart3, BsHeart } from "react-icons/bs";
import { navLinks } from "@/app/Constants/Constants";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/Store";
import { setIsOpenCart } from "@/app/Store/Feature/Cart/CartSlice";
import { useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { cart, isOpenCart } = useAppSelector((state) => state?.cart);
  const { wishList } = useAppSelector((state) => state?.wish);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  function handleOpen() {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "unset";
  }

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    dispatch(setIsOpenCart(!isOpenCart));
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    router.push("/wishlist");
  };

  return (
    <>
      <header className="fixed top-0 w-full h-16 flex justify-between items-center border-b-2 bg-gray-50/95 backdrop-blur-sm px-4 md:px-10 z-[1000]">
        {/* Logo and menu */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              className="w-10 h-10 rounded-full hidden md:block hover:scale-105 transition-transform"
            />
          </Link>

          <button
            onClick={handleOpen}
            className="md:hidden text-3xl text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            <HiMenuAlt2 />
          </button>
        </div>

        {/* mobile view */}
        <div
          className={`h-screen fixed inset-0 bg-black/50 z-[100] transition-opacity duration-500 md:hidden ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleOpen}
        />
        <div
          className={`fixed top-0 left-0 z-[1000] w-2/3 h-screen bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="md:hidden flex flex-col justify-center items-start px-5 gap-3 mt-14">
            {navLinks.map((link) => (
              <div key={link.id} onClick={handleOpen} className="w-full">
                <Link
                  href={link.path}
                  className={`block py-2 px-4 rounded-lg transition-all duration-300 text-sm tracking-wider uppercase relative hover:bg-gray-100 ${
                    pathname === link.path
                      ? "text-gray-900 font-semibold"
                      : "text-gray-900"
                  }`}
                >
                  {link.label}
                  {pathname === link.path && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-red-500 rounded-md" />
                  )}
                </Link>
              </div>
            ))}
          </div>

          <button
            onClick={handleOpen}
            className="absolute top-4 right-4 p-2 text-2xl text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Navigation */}
        <Navigation />

        <div className="flex items-center gap-4">
          {/* Cart */}
          {isSignedIn && (
            <div
              className="relative group cursor-pointer"
              onClick={handleCartClick}
            >
              <BsCart3 className="text-2xl text-gray-700 hover:text-gray-900 transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {cart.length}
                </span>
              )}
            </div>
          )}

          {/* Wishlist */}
          {isSignedIn && (
            <button
              onClick={handleWishlistClick}
              className="relative"
              aria-label="Go to wishlist"
            >
              <BsHeart className="text-2xl text-gray-700 hover:text-gray-900 transition-colors" />
              {wishList.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {wishList.length}
                </span>
              )}
            </button>
          )}

          {/* Authentication */}
          <div className="ml-1">
            <SignedOut>
              <div className="px-4 py-1.5 bg-gray-700 hover:bg-gray-900 text-white rounded-md font-medium transition-colors">
                <SignInButton />
              </div>
            </SignedOut>

            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16" />
    </>
  );
}
