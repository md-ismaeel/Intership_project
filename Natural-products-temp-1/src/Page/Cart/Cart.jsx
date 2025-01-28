import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart, clearCart, updateCartItem, toggleWishlist } from "../../Redux/slices/usersSlice";
import { toast } from "material-react-toastify";
import { FaMinus, FaPlus, FaTrash, FaShoppingCart, FaHeart, } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";


export default function Cart() {
    const cartItem = useSelector((state) => state?.Ecommers?.cartItem || []);
    const wishlist = useSelector((state) => state?.Ecommers?.wishList || []);
    const isAuthenticated = useSelector((state) => state?.Ecommers?.isAuthenticated);
    const [expandedItemId, setExpandedItemId] = useState(null);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    if (!isAuthenticated) {
        toast("please login first!")
        navigator("/")
        return;
    }
    const handleIncrease = (item) => {
        dispatch(addToCart(item));
        toast.success(`Added another ${item.name} to cart`);
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
        toast.error(`${item.name} removed from cart.`);
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.error("Cart cleared!");
    };

    const handleToggleWishlist = (item) => {
        dispatch(toggleWishlist(item));
        toast.info(wishlist.some((fav) => fav.id === item.id)
            ? `Removed ${item.name} from wishlist`
            : `Added ${item.name} to wishlist`
        );
    };

    const toggleItemDetails = (itemId) => {
        setExpandedItemId((prev) => (prev === itemId ? null : itemId));
    };

    const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <section className="container min-h-screen mx-auto px-4 py-8 max-w-4xl">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-tight flex items-center mb-4 sm:mb-0">
                    <FaShoppingCart className="mr-3 text-blue-600" />
                    Products Cart
                </h1>
                {cartItem.length > 0 && (
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                            {cartItem.length} item{cartItem.length !== 1 ? "s" : ""} in cart
                        </span>
                        <button
                            onClick={() => navigator("/wishlist")}
                            className="relative p-2 rounded-full hover:bg-gray-100 transition"
                        >
                            <FaHeart className="text-red-500" />
                        </button>
                    </div>
                )}
            </div>

            {cartItem.length === 0 ? (
                <div className="bg-white shadow-lg rounded-lg p-8 text-center transition-all duration-300 hover:shadow-xl">
                    <p className="text-gray-600 mb-6 text-xl">Your cart is empty!</p>
                    <button
                        onClick={() => navigator("/products")}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                    >
                        Explore Products
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {cartItem.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] relative"
                        >
                            {/* Product Image and Basic Info */}
                            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                                <div
                                    className="w-24 h-24 flex-shrink-0 cursor-pointer"
                                    onClick={() => toggleItemDetails(item.id)}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded-lg transition-transform hover:scale-110"
                                    />
                                </div>

                                <div className="flex-grow text-center sm:text-left w-full">
                                    <h2 className="text-xl font-bold text-gray-800 mb-1 flex justify-center sm:justify-start items-center">
                                        {item.name}
                                        <button
                                            onClick={() => handleToggleWishlist(item)}
                                            className="ml-2 text-pink-500 hover:text-pink-700 transition"
                                        >
                                            {wishlist.some((fav) => fav.id === item.id) ? <FaHeart className="text-red-500" /> : <FaHeart className="text-gray-200" />}
                                        </button>
                                    </h2>
                                    <p className="text-gray-600 text-center sm:text-left">
                                        Price:{" "}
                                        <span className="font-semibold text-green-600">
                                            ${item.price}
                                        </span>
                                    </p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                    <div className="flex items-center space-x-2">
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
                                        <span className="font-semibold mx-2">{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncrease(item)}
                                            className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-all active:scale-90 shadow-md hover:shadow-lg"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => handleRemove(item)}
                                        className="w-10 h-10 bg-red-500 text-white rounded-full 
                                        flex items-center justify-center 
                                        hover:bg-red-600 transition-all 
                                        active:scale-90 shadow-md hover:shadow-lg ml-2"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>

                            {/* Expandable Item Details */}
                            {expandedItemId === item.id && (
                                <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Product Details
                                    </h3>
                                    <p className="text-gray-600">
                                        {item.description || "No additional details available."}
                                    </p>
                                    {item.size && (
                                        <p className="mt-2 text-sm text-gray-500">
                                            Size: {item.size}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Cart Summary */}
                    <div className="bg-gray-100 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 shadow-md">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center md:text-left w-full md:w-auto mb-4 md:mb-0">
                            Total Price:{" "}
                            <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto justify-center md:justify-end">
                            <button
                                onClick={handleClearCart}
                                className="px-6 py-3 bg-red-600 text-white rounded-lg 
                                hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 
                                transition-all duration-300 ease-in-out transform
                                shadow-md hover:shadow-lg flex items-center justify-center"
                            >
                                <FaTrash className="mr-2" /> Clear Cart
                            </button>

                            <button
                                onClick={() => navigator("/checkout")}
                                className="px-6 py-3 bg-primary text-white rounded-lg 
                                hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 
                                transition-all duration-300 ease-in-out transform 
                                shadow-md hover:shadow-lg flex items-center justify-center"
                            >
                                <FaShoppingCart className="mr-2" /> Check Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
