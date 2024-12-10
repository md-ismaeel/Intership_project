import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../Redux/slices/usersSlice';
import { toast } from 'material-react-toastify';

export default function Checkout() {
    const cartItems = useSelector((state) => state?.Ecommers?.cartItems);
    const dispatch = useDispatch();
    const navigator = useNavigate()
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const totalPrice = cartItems && cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


    const handleCheckout = () => {
        if (address && paymentMethod) {
            console.log('Order placed:', { cartItems, address, paymentMethod, totalPrice });
            dispatch(clearCart());
            toast.success('Checkout successful!');
        } else {
            toast.error('Please provide all details!');
        }
    };

    return (
        <div className="container w-[90%] md:w-[60%] mx-auto p-4 md:p-8">
            <h1 className="w-full text-center text-3xl font-bold mb-6">Checkout</h1>

            {/* Cart Items */}
            <div className="cart-items mb-6">
                <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
                {Array.isArray(cartItems) && cartItems.length === 0 ? (
                    <p className="text-lg text-gray-600">Your cart is empty!</p>
                ) : (
                    <ul>
                        {Array.isArray(cartItems) && cartItems.map((item) => (
                            <li key={item.id} className="border-b py-4">
                                <p className="text-lg font-medium">{item.name}</p>
                                <p className="text-gray-600">Price: ${item.price}</p>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                <p className="text-gray-600">Total: ${item.price * item.quantity}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Address Form */}
            <div className="address-form mb-6">
                <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
                <input
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Payment Method */}
            <div className="payment-method mb-6">
                <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a payment method</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash-on-delivery">Cash on Delivery</option>
                </select>
            </div>

            {/* Total Price */}
            <div className="total-price mb-6">
                <h3 className="text-2xl font-semibold">Total: ${totalPrice}</h3>
            </div>

            {/* Checkout Button */}
            <button
                onClick={handleCheckout}
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            >
                Complete Checkout
            </button>

            {/* Go back to shopping */}
            <button onClick={() => navigator("/products")} className="w-full mt-2 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
                Continue Shopping
            </button>

        </div>
    );
}
