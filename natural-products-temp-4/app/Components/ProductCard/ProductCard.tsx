"use client";
import React, { useState } from "react";
import { Product } from "@/app/Type/Type";
import { useAppDispatch, useAppSelector } from "@/app/Store";
import { addToCart } from "@/app/Store/Feature/Cart/CartSlice";
import { toast } from "material-react-toastify";
import { Heart } from "lucide-react";
import { toggleWishList } from "@/app/Store/Feature/WishList/WishListSlice";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProductCard({ item }: { item: Product }) {
    const { category, description, image, price, rating } = item;
    const [loading, setLoading] = useState(false);
    const { wishList } = useAppSelector((state) => state.wish);
    const dispatch = useAppDispatch();
    const { isSignedIn } = useUser();
    const router = useRouter();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        setLoading(true)
        setTimeout(() => setLoading(false), 500);
        if (!isSignedIn) {
            toast.error("please login first!");
            router.push("/sign-in");
            return;
        }
        dispatch(addToCart(item));
        toast.success(`Added ${category} to cart`);
    };

    const handleLike = (e: React.FormEvent, item: Product) => {
        e.preventDefault();
        if (!isSignedIn) {
            toast.error("please login first!");
            router.push("/sign-in");
            return;
        }
        if (item && item.id) {
            dispatch(toggleWishList(item));
        }
    };

    const isInWishList = wishList.find((wishItem) => wishItem.id === item.id);

    return (
        <div className="relative w-full md:w-72 p-4 bg-white shadow-2xl border rounded-md">
            <Image
                src={image}
                alt={`Image of ${category}`}
                className="w-full h-40 bg-center rounded-md transition-all duration-500 ease-in-out hover:bg-gray-500 hover:scale-105"
            />
            <h3 className="text-lg font-bold mt-2">{category}</h3>
            <p className="text-sm text-gray-600">
                {description.length > 100
                    ? `${description.slice(0, 100)}...`
                    : description}
            </p>
            <div className="flex justify-between items-center mt-2">
                <span className="text-green-500 font-bold">${price}</span>
                <span className="text-yellow-500 text-sm">
                    ⭐ {rating.rate} ({rating.count})
                </span>
            </div>

            {/* add to cart button */}
            <button
                onClick={handleAddToCart}
                className={`w-full h-12 border uppercase text-sm font-medium mt-2 ${loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                disabled={loading} // Disable the button while loading
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <span className="h-4 w-4 rounded-full border-t-2 border-black animate-spin mr-2"></span>
                        Adding to cart...
                    </span>
                ) : (
                    "Add to cart"
                )}
            </button>


            {/* wishList btn */}
            <button
                onClick={(e) => handleLike(e, item)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-all transform hover:scale-110"
            >
                <Heart
                    color={isInWishList ? "red" : "gray"}
                    fill={isInWishList ? "red" : "none"}
                    className="w-6 h-6"
                />
            </button>
        </div>
    );
}
