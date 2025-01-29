"use client";
import { useAppSelector } from "@/app/Store";
import Image from "next/image";
import React from "react";

export default function CheckOutCartData() {
    const { cart } = useAppSelector((state) => state?.cart);
    const calculateGrandTotal = () => {
        return (cart?.reduce((total, item) => total + item.price * item.quantity, 0) || 0);
    };

    return (
        <div className="w-1/2 min-h-screen border rounded-md p-6 -mt-6">
            {/* Check if the cart has items */}
            {cart?.length > 0 ? (
                <>
                    {/* Cart Items */}
                    <div className="overflow-y-auto">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between border-b pb-4"
                            >
                                {/* Product Image */}
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 overflow-hidden rounded-lg">
                                        <Image
                                            src={item.image}
                                            alt={item.category}
                                            width={100}
                                            height={100}
                                            className="w-full h-full bg-center"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg">{item.category}</h3>
                                        <p className="text-sm text-gray-500">
                                            Unit Price: ${item.price.toFixed(2)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>
                                </div>

                                {/* Total Price for Item */}
                                <div className="text-lg font-semibold">
                                    ${((item.price || 0) * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Grand Total */}
                    <div className="flex justify-between items-center pt-6 border-t">
                        <span className="text-xl font-medium">Grand Total:</span>
                        <span className="text-2xl font-bold">
                            ${calculateGrandTotal().toFixed(2)}
                        </span>
                    </div>
                </>
            ) : (<div className="text-center py-20">
                <h3 className="text-2xl font-semibold text-gray-700">
                    Your cart is empty
                </h3>
                <p className="text-gray-500 mt-2">
                    Looks like you haven’t added anything to your cart yet.
                </p>
            </div>
            )}
        </div>
    );
}
