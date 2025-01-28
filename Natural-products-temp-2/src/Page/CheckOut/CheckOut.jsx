import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ExtraSpace from "../../Components/ExtraSpace";
import { motion } from "framer-motion";

export default function Checkout() {
    const { cart, userAuthenticated } = useSelector((state) => state?.N4N);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zipCode: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });
    const [success, setSuccess] = useState(false);

    const total = cart.reduce((sum, item) => {
        const discountedPrice =
            item.price * (1 - (item.discountPercentage || 0) / 100);
        return sum + discountedPrice * item.quantity;
    }, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Format card number with spaces
        if (name === "cardNumber") {
            formattedValue =
                value
                    .replace(/\s/g, "")
                    .match(/.{1,4}/g)
                    ?.join(" ") || "";
            if (formattedValue.length > 19) return; // Limit to 16 digits + 3 spaces
        }

        // Format expiry date
        if (name === "expiryDate") {
            formattedValue = value.replace(/\D/g, "");
            if (formattedValue.length > 2) {
                formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(
                    2,
                    4
                )}`;
            }
            if (formattedValue.length > 5) return;
        }

        // Format CVV
        if (name === "cvv") {
            formattedValue = value.replace(/\D/g, "");
            if (formattedValue.length > 3) return;
        }

        setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simulating order submission
            setSuccess(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Order submitted:", { ...formData, items: cart, total });
            // Show success message or redirect
        } catch (error) {
            console.error("Error submitting order:", error);
        } finally {
            setSuccess(false);
        }
    };

    return (
        <>
            <ExtraSpace />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-center mb-8">Checkout</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Product Summary */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold">Order Summary</h2>
                        </div>
                        <div className="divide-y max-h-[100vh] overflow-y-auto p-6">
                            {cart.map((item) => {
                                const discountedPrice =
                                    item.price * (1 - (item.discountPercentage || 0) / 100);
                                const itemTotal = discountedPrice * item.quantity;

                                return (
                                    <div
                                        key={item.id}
                                        className="py-4 first:pt-0 last:pb-0 group transition-all duration-300"
                                    >
                                        <div className="flex gap-4">
                                            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                                                <img
                                                    src={item.thumbnail || "/api/placeholder/200/200"}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <h3 className="font-medium text-lg">{item.title}</h3>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-lg font-semibold">
                                                        ${discountedPrice.toFixed(2)}
                                                    </span>
                                                    {item.discountPercentage > 0 && (
                                                        <>
                                                            <span className="text-sm line-through text-gray-500">
                                                                ${item.price}
                                                            </span>
                                                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                                                {item.discountPercentage}% OFF
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">
                                                        Quantity: {item.quantity}
                                                    </span>
                                                    <span className="font-medium">
                                                        ${itemTotal.toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="p-6 bg-gray-50">
                            <div className="flex justify-between items-center text-lg font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {success ? (
                            <div className="w-full h-[400px] flex justify-center items-center">Order placeholder</div>
                        ) : (
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Shipping Information */}
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold">
                                        Shipping Information
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    ZIP Code
                                                </label>
                                                <input
                                                    type="text"
                                                    name="zipCode"
                                                    value={formData.zipCode}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Information */}
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold pt-4 border-t">
                                        Payment Information
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                Card Number
                                            </label>
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                placeholder="0000 0000 0000 0000"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Expiry Date
                                                </label>
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    value={formData.expiryDate}
                                                    onChange={handleInputChange}
                                                    placeholder="MM/YY"
                                                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    CVV
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    placeholder="123"
                                                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg font-medium 
                                         hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                                         transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Place Order (${total.toFixed(2)})
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
