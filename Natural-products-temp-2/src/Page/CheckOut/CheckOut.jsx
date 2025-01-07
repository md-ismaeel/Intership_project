// import React, { useState } from 'react';
// import ExtraSpace from '../../Components/ExtraSpace';


// export default function Checkout() {
//     const { isOpenCart, cart } = useSelector((state) => state?.N4N)
//     const [quantity, setQuantity] = useState(1);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         address: '',
//         city: '',
//         zipCode: '',
//         cardNumber: '',
//         expiryDate: '',
//         cvv: ''
//     });

//     const product = {
//         title: "Essence Mascara Lash Princess",
//         price: 9.99,
//         discountPercentage: 7.17,
//         stock: 5,
//         availabilityStatus: "Low Stock",
//         thumbnail: "/api/placeholder/200/200"
//     };

//     const discountedPrice = product.price * (1 - product.discountPercentage / 100);
//     const total = discountedPrice * quantity;

//     const handleInputChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Order submitted:', { ...formData, quantity, total });
//     };

//     return (
//         <>
//             <ExtraSpace />
//             <div className="max-w-6xl mx-auto p-6">
//                 <div className="grid md:grid-cols-2 gap-8">
//                     {/* Product Summary */}
//                     <div className="bg-white p-6 rounded-lg shadow">
//                         <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
//                         <div className="flex gap-4">
//                             <img
//                                 src={product.thumbnail}
//                                 alt={product.title}
//                                 className="w-32 h-32 object-cover rounded"
//                             />
//                             <div className="space-y-2">
//                                 <h3 className="font-semibold text-lg">{product.title}</h3>
//                                 <div className="flex items-center gap-2">
//                                     <span className="text-xl font-bold">${discountedPrice.toFixed(2)}</span>
//                                     <span className="text-sm line-through text-gray-500">${product.price}</span>
//                                     <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
//                                         {product.discountPercentage}% OFF
//                                     </span>
//                                 </div>
//                                 <span className="text-sm bg-gray-100 px-2 py-1 rounded">
//                                     {product.availabilityStatus}
//                                 </span>
//                                 <div className="flex items-center gap-2">
//                                     <label htmlFor="quantity" className="text-sm font-medium">
//                                         Quantity:
//                                     </label>
//                                     <input
//                                         id="quantity"
//                                         type="number"
//                                         min="1"
//                                         max={product.stock}
//                                         value={quantity}
//                                         onChange={(e) => setQuantity(Number(e.target.value))}
//                                         className="w-20 px-2 py-1 border rounded"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="mt-4 pt-4 border-t">
//                             <div className="flex justify-between text-lg font-bold">
//                                 <span>Total:</span>
//                                 <span>${total.toFixed(2)}</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Checkout Form */}
//                     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
//                         <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
//                         <div className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium mb-1">Full Name</label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 border rounded"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium mb-1">Email</label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 border rounded"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium mb-1">Address</label>
//                                 <input
//                                     type="text"
//                                     name="address"
//                                     value={formData.address}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 border rounded"
//                                     required
//                                 />
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">City</label>
//                                     <input
//                                         type="text"
//                                         name="city"
//                                         value={formData.city}
//                                         onChange={handleInputChange}
//                                         className="w-full px-3 py-2 border rounded"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">ZIP Code</label>
//                                     <input
//                                         type="text"
//                                         name="zipCode"
//                                         value={formData.zipCode}
//                                         onChange={handleInputChange}
//                                         className="w-full px-3 py-2 border rounded"
//                                         required
//                                     />
//                                 </div>
//                             </div>

//                             <h2 className="text-2xl font-bold mb-4 mt-8">Payment Information</h2>
//                             <div>
//                                 <label className="block text-sm font-medium mb-1">Card Number</label>
//                                 <input
//                                     type="text"
//                                     name="cardNumber"
//                                     value={formData.cardNumber}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 border rounded"
//                                     required
//                                 />
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Expiry Date</label>
//                                     <input
//                                         type="text"
//                                         name="expiryDate"
//                                         value={formData.expiryDate}
//                                         onChange={handleInputChange}
//                                         placeholder="MM/YY"
//                                         className="w-full px-3 py-2 border rounded"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">CVV</label>
//                                     <input
//                                         type="text"
//                                         name="cvv"
//                                         value={formData.cvv}
//                                         onChange={handleInputChange}
//                                         className="w-full px-3 py-2 border rounded"
//                                         required
//                                     />
//                                 </div>
//                             </div>

//                             <button
//                                 type="submit"
//                                 className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors mt-6"
//                             >
//                                 Place Order
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };


import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ExtraSpace from '../../Components/ExtraSpace';

export default function Checkout() {
    const { cart } = useSelector((state) => state?.N4N);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    // Calculate total price from cart items
    const total = cart.reduce((sum, item) => {
        const discountedPrice = item.price * (1 - (item.discountPercentage || 0) / 100);
        return sum + (discountedPrice * item.quantity);
    }, 0);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Order submitted:', { ...formData, items: cart, total });
    };

    return (
        <>
            <ExtraSpace />
            <div className="text-2xl font-semibold capitalize w-full text-center mt-3">Order Summary</div>
            <div className="w-fill min-h-screen grid md:grid-cols-2 gap-8 px-10 mt-4">
                {/* Product Summary */}
                <div className="bg-white px-6 py-8 rounded-lg shadow max-h-[80vh] overflow-y-auto">
                    <div className="space-y-4">
                        {cart.map((item) => {
                            const discountedPrice = item.price * (1 - (item.discountPercentage || 0) / 100);
                            const itemTotal = discountedPrice * item.quantity;

                            return (
                                <div key={item.id} className="flex flex-col lg:flex-row gap-4 pb-4 border-b">
                                    <img
                                        src={item.thumbnail || "/api/placeholder/200/200"}
                                        alt={item.title}
                                        className="w-32 h-32 object-cover rounded flex-shrink-0"
                                    />
                                    <div className="space-y-2 flex-1">
                                        <h3 className="font-semibold text-lg">{item.title}</h3>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-xl font-bold">
                                                ${discountedPrice.toFixed(2)}
                                            </span>
                                            {item.discountPercentage > 0 && (
                                                <>
                                                    <span className="text-sm line-through text-gray-500">
                                                        ${item.price}
                                                    </span>
                                                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                                        {item.discountPercentage}% OFF
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        {item.availabilityStatus && (
                                            <span className="text-sm bg-gray-100 px-2 py-1 rounded inline-block">
                                                {item.availabilityStatus}
                                            </span>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">
                                                Quantity: {item.quantity}
                                            </span>
                                        </div>
                                        <div className="text-right text-sm font-medium">
                                            Item Total: ${itemTotal.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <div className="w-full bg-white">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Checkout Form */}
                <div className="bg-white p-6 rounded-lg shadow max-h-[80vh] overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h2 className="text-2xl font-bold mb-2 sticky top-[-01] bg-white pt-2">Shipping Information</h2>
                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">ZIP Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-4 mt-8">Payment Information</h2>
                        <div>
                            <label className="block text-sm font-medium mb-1">Card Number</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                                <input
                                    type="text"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    placeholder="MM/YY"
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">CVV</label>
                                <input
                                    type="text"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors mt-6"
                        >
                            Place Order
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}