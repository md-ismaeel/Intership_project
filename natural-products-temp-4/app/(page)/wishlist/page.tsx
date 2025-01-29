"use client";
import ProductCard from "@/app/Components/ProductCard/ProductCard";
import { useAppSelector } from "@/app/Store/index";
import { Product } from "@/app/Type/Type";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import React from "react";

export default function WishList() {
  const wishList = useAppSelector((state) => state.wish?.wishList ?? []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-6 h-6 text-red-500" />
          <h1 className="text-2xl font-bold">My Wishlist</h1>
        </div>
        <p className="text-gray-600">
          {wishList.length} {wishList.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      {/* Main Content */}
      {wishList.length > 0 ? (
        <div className="space-y-8">
          {/* Grid of Products */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishList.map((prod: Product) => (
              <li key={prod.id} className="">
                <Link href={`/Ps/${prod.id}`}>
                  <ProductCard item={prod} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Empty State
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">
            Start adding items you love to your wishlist
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
}
