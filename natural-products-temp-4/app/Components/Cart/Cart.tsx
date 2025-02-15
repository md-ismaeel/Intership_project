"use client";
import React, { useEffect, useState } from "react";
import { ShoppingBag, X, Minus, Plus, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/Store";
import {
    removeFromCart,
    setIsOpenCart,
    updateCart,
} from "@/app/Store/Feature/Cart/CartSlice";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Cart() {
    const { cart, isOpenCart } = useAppSelector((state) => state?.cart);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [animatingItemId, setAnimatingItemId] = useState<number | null>(null);
    const user = useUser();

    useEffect(() => {
        document.body.style.overflow = isOpenCart ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpenCart]);

    const updateQuantity = (type: "increase" | "decrease", itemId: number) => {
        const cartItem = cart.find((item) => item.id === itemId);
        if (!cartItem) return;

        const currentQuantity = cartItem.quantity || 1;
        let newQuantity = currentQuantity;

        if (type === "increase" && currentQuantity < 20) {
            newQuantity = currentQuantity + 1;
        } else if (type === "decrease" && currentQuantity > 1) {
            newQuantity = currentQuantity - 1;
        }

        if (newQuantity !== currentQuantity) {
            const updatedItem = { ...cartItem, quantity: newQuantity };
            dispatch(updateCart(updatedItem));
        }
    };

    const handleRemoveItem = (itemId: number) => {
        setAnimatingItemId(itemId);
        setTimeout(() => {
            dispatch(removeFromCart(itemId));
            setAnimatingItemId(null);
        }, 300);
    };

    const calculateTotal = () => {
        return (
            cart?.reduce(
                (total, item) => total + item.price * (item.quantity || 1),
                0
            ) || 0
        );
    };

    const handleNavigateToProducts = () => {
        dispatch(setIsOpenCart(false));
        router.push("/products");
    };

    const handleNavigateToCheckout = () => {
        if (!user) {
            dispatch(setIsOpenCart(false));
            router.push("/signin");
        } else {
            dispatch(setIsOpenCart(false));
            router.push("/checkout");
        }
    };

    return (
        <>
            <section
                className={`fixed inset-0 z-[100000] ${isOpenCart ? "visible" : "invisible"
                    }`}
            >
                <div
                    className={`absolute inset-0 transition-all duration-500 ${isOpenCart ? "bg-black/40 backdrop-blur-sm" : "bg-transparent"
                        }`}
                    onClick={() => dispatch(setIsOpenCart(false))}
                />

                <div
                    className={`absolute right-0 top-0 h-full w-full md:w-[450px] bg-white shadow-2xl transform transition-all duration-500 ease-out ${isOpenCart ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                <span className="text-lg font-medium">Your Cart</span>
                                <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full text-sm">
                                    {cart?.length || 0}
                                </span>
                            </div>
                            <button
                                onClick={() => dispatch(setIsOpenCart(false))}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Cart Content */}
                        {cart?.length > 0 ? (
                            <>
                                <div className="flex-1 overflow-y-auto">
                                    <div className="divide-y divide-gray-100">
                                        {cart.map((item) => (
                                            <div
                                                key={item.id}
                                                className={`p-6 transform transition-all duration-300 ${animatingItemId === item.id
                                                    ? "opacity-0 translate-x-full"
                                                    : "opacity-100"
                                                    }`}
                                            >
                                                <div className="flex gap-4">
                                                    <div className="relative group">
                                                        <div className="w-24 h-24 rounded-xl overflow-hidden">
                                                            <Image
                                                                src={item?.image}
                                                                alt={item.category}
                                                                width={100}
                                                                height={100}
                                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex-1 flex flex-col justify-between">
                                                        <div>
                                                            <h3 className="font-medium text-gray-900">
                                                                {item.category}
                                                            </h3>
                                                            <p className="mt-1 text-gray-500 text-sm">
                                                                Unit Price: ${item.price?.toFixed(2)}
                                                            </p>
                                                        </div>

                                                        <div className="flex justify-between items-center mt-4">
                                                            <div className="flex items-center bg-gray-50 rounded-lg overflow-hidden">
                                                                <button
                                                                    onClick={() =>
                                                                        updateQuantity("decrease", item.id)
                                                                    }
                                                                    disabled={item.quantity <= 1}
                                                                    className="p-2 hover:bg-gray-100 disabled:opacity-50 transition-colors duration-200 disabled:cursor-not-allowed"
                                                                >
                                                                    <Minus className="w-4 h-4" />
                                                                </button>
                                                                <span className="w-12 text-center select-none">
                                                                    {item.quantity || 1}
                                                                </span>
                                                                <button
                                                                    onClick={() =>
                                                                        updateQuantity("increase", item.id)
                                                                    }
                                                                    disabled={item.quantity >= 20}
                                                                    className="p-2 hover:bg-gray-100 disabled:opacity-50 transition-colors duration-200 disabled:cursor-not-allowed"
                                                                >
                                                                    <Plus className="w-4 h-4" />
                                                                </button>
                                                            </div>

                                                            <button
                                                                onClick={() => handleRemoveItem(item.id)}
                                                                className="text-sm text-red-500 hover:text-red-600 transition-colors duration-200"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="border-t border-gray-100 p-6 space-y-4 bg-white">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-medium">Total</span>
                                        <span className="text-2xl font-semibold">
                                            ${calculateTotal().toFixed(2)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleNavigateToCheckout}
                                        className="w-full bg-gray-800 text-white py-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-900 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <span>Checkout</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-6">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">
                                    Your cart is empty
                                </h3>
                                <p className="text-gray-500 text-center mb-8">
                                    {"Looks like you haven't added anything to your cart yet"}
                                </p>
                                <button
                                    onClick={handleNavigateToProducts}
                                    className="px-6 py-3 bg-gray-900 text-white rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <span>Continue Shopping</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
