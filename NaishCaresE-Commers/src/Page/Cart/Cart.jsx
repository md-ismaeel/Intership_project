import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart, clearCart, updateCartItem, } from "../../Redux/slices/usersSlice";
import { toast } from "material-react-toastify";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function Cart() {
    const cartItem = useSelector((state) => state?.Ecommers?.cartItem || []);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const handleIncrease = (item) => {
        dispatch(addToCart(item));
    };

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            dispatch(updateCartItem({ id: item.id, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeFromCart(item));
            toast.warning(`${item.name} removed from cart.`);
        }
    };

    const handleRemove = (item) => {
        dispatch(removeFromCart(item));
        toast.warning(`${item.name} removed from cart.`);
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.error("Cart cleared!");
    };

    const totalPrice = cartItem.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <section className="container min-h-screen mx-auto px-2 py-8 max-w-4xl">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800 tracking-tight">
                Products Cart
            </h1>
            {cartItem.length === 0 ? (
                <div className="bg-white shadow-lg rounded-lg p-8 text-center transition-all duration-300 hover:shadow-xl">
                    <p className="text-gray-600 mb-6 text-xl">Your cart is empty!</p>
                    <button
                        onClick={() => navigator("/products")}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg 
                        hover:bg-blue-700 transition-colors duration-300 
                        transform hover:scale-105 active:scale-95 
                        shadow-md hover:shadow-lg"
                    >
                        Explore Products
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {cartItem.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row 
                            justify-between items-center space-y-4 md:space-y-0 
                            hover:shadow-lg transition-all duration-300 
                            transform hover:scale-[1.01]"
                        >
                            <div className="flex-grow">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">
                                    {item.name}
                                </h2>
                                <div className="text-gray-600 space-y-1">
                                    <p>
                                        Price:{" "}
                                        <span className="font-semibold text-green-600">
                                            ${item.price}
                                        </span>
                                    </p>
                                    <p>
                                        Quantity:{" "}
                                        <span className="font-semibold">{item.quantity}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleIncrease(item)}
                                    className="w-10 h-10 bg-green-500 text-white rounded-full 
                                    flex items-center justify-center 
                                    hover:bg-green-600 transition-all 
                                    active:scale-90 shadow-md hover:shadow-lg"
                                >
                                    <FaPlus />
                                </button>
                                <button
                                    onClick={() => handleDecrease(item)}
                                    className="w-10 h-10 bg-yellow-500 text-white rounded-full 
                                    flex items-center justify-center 
                                    hover:bg-yellow-600 transition-all 
                                    active:scale-90 shadow-md hover:shadow-lg"
                                    disabled={item.quantity <= 1}
                                >
                                    <FaMinus />
                                </button>
                                <button
                                    onClick={() => handleRemove(item)}
                                    className="w-10 h-10 bg-red-500 text-white rounded-full 
                                    flex items-center justify-center 
                                    hover:bg-red-600 transition-all 
                                    active:scale-90 shadow-md hover:shadow-lg"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="bg-gray-100 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Total Price:{" "}
                            <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                        </h2>

                        <div className="flex gap-4 flex-col md:flex-row">
                            <button
                                onClick={handleClearCart}
                                className="px-6 py-3 bg-red-600 text-white rounded-lg 
                            hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 ease-in-out transform
                            shadow-md hover:shadow-lg"
                            >
                                Clear Cart
                            </button>

                            <button
                                onClick={() => navigator("/checkout")}
                                className="px-6 py-3 bg-primary text-white rounded-lg 
                            hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-in-out transform 
                            shadow-md hover:shadow-lg"
                            >
                                Check Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
