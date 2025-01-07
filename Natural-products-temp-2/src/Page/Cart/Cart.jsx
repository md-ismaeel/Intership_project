import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenCart, updateCart, removeFromCart } from "../../Redux/Slice/N4NSlice";
import { IoCloseOutline } from "react-icons/io5";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const { isOpenCart, cart, userAuthenticated } = useSelector((state) => state?.N4N)
    // console.log(cart);

    const dispatch = useDispatch();
    const navigator = useNavigate()

    useEffect(() => {
        document.body.style.overflow = isOpenCart ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpenCart]);

    const updateQuantity = (itemId, change) => {
        const item = cart.find(item => item.id === itemId);
        if (!item) return;

        const newQuantity = Math.max(1, item.quantity + change);
        dispatch(updateCart({ ...item, quantity: newQuantity }));
    };

    const handleRemoveItem = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const calculateTotal = () => {
        const total = cart?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0;
        return total;
    };

    const handleNavigateToProducts = () => {
        dispatch(setIsOpenCart(false));
        navigator("/products")
    };

    const handleNavigateToCheckout = () => {
        if (!userAuthenticated) {
            navigator("/signin")
            dispatch(setIsOpenCart(false));
            return
        }
        dispatch(setIsOpenCart(false));
        navigator("/checkout")
    };

    if (!isOpenCart) return null;

    return (
        <div className="fixed inset-0 z-[100000] overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
                onClick={() => dispatch(setIsOpenCart(false))} />

            <div className={`absolute right-0 top-0 h-full w-full md:w-[40%] bg-white shadow-xl transform transition-transform duration-500 ease-in-out ${isOpenCart ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-sm uppercase">Cart</h2>
                    <button onClick={() => dispatch(setIsOpenCart(false))}
                        className={`text-gray-700 transition all duration-1000 hover:rotate-180`}>
                        <IoCloseOutline className="h-6 w-6" />
                    </button>
                </div>

                {/* Cart Content */}
                <div className="flex flex-col h-[90%]">
                    {cart?.length > 0 ? (
                        <>
                            {/* Items */}
                            <div className="flex-1 overflow-y-auto px-4 py-2">
                                {cart.map((item) => (
                                    <div key={item.id}
                                        className="flex gap-4 border-b py-4">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                                            <img src={item?.images[0]}
                                                alt={item.title}
                                                className="h-full w-full object-cover" />
                                        </div>

                                        <div className="flex flex-1 flex-col justify-between">
                                            <div>
                                                <h3 className="font-medium">{item.title}</h3>
                                                <p className="mt-1 text-gray-600">
                                                    ${item.price?.toFixed(2)}
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center border rounded">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        disabled={item.quantity === 1}
                                                        className="p-2 hover:bg-gray-100 disabled:cursor-not-allowed">
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="px-4">{item.quantity}</span>
                                                    <button
                                                        disabled={item.quantity === item.maximumOrderQuantity}
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="p-2 hover:bg-gray-100 disabled:cursor-not-allowed">
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                <button onClick={() => handleRemoveItem(item.id)}
                                                    className="text-sm text-red-500 hover:text-red-700">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer with total and checkout */}
                            <div className="border-t p-4 space-y-4">
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>${calculateTotal().toFixed(2)}</span>
                                </div>
                                <button onClick={handleNavigateToCheckout} className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full flex flex-col justify-stat items-center">
                            <div className="w-full flex justify-center items-center z-0">
                                <div className="relative w-full bg-gray-100 h-[250px] capitalize text-lg flex justify-center items-center">your cart is empty</div>
                                <button className="flex justify-center items-center text-gray-600 hover:text-gray-800 absolute top-[16rem] z-10 h-[120px] w-[120px] bg-white rounded-full shadow-2xl"><ShoppingCart /></button>
                            </div>
                            <button
                                onClick={handleNavigateToProducts}
                                className="text-sm mt-24 uppercase relative group"
                            >
                                continue browsing
                                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] rounded-full bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}