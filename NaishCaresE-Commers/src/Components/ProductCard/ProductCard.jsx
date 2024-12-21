import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist, addToCart } from "../../Redux/slices/usersSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { toast } from "material-react-toastify";
import defaultImage from "../../assets/Product-images/organic.png";

export default function ProductCard({ item }) {
    const { id, name, category, price, brand, image, weight, discount, flash } = item;
    const dispatch = useDispatch();
    const wishList = useSelector((state) => state.Ecommers.wishList);

    const handleWishlistToggle = () => {
        const product = { id, name, category, price, image };
        dispatch(toggleWishlist(product));
        toast.info(wishList.some((fav) => fav.id === id) ? `Removed ${product.name} from wishlist` : `Added ${product.name} to wishlist`);
    };

    const handleAddToCart = () => {
        const product = { id, name, category, price, image, quantity: 1 };
        dispatch(addToCart(product));
        toast.success(`${product.name} added to cart!`);
    };

    const isWishlisted = wishList.some((fav) => fav.id === id);

    return (
        <div className="w-70 md:w-56 h-70 bg-white border rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 relative group">
            <div className="w-full h-[50%] flex justify-center items-center relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full bg-center rounded-t-lg transition-transform duration-300 ease-in-out object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <p className="text-white font-semibold text-sm truncate">{name}</p>
                    <p className="text-white text-xs mt-1">{category}</p>
                </div>

                {/* Hover Details */}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 text-white flex flex-col justify-center items-center space-y-2">
                    <p className="text-sm z-20">Weight: {weight}</p>
                    {discount > 0 && (
                        <p className="text-green-300 font-semibold z-20">{discount}% OFF</p>
                    )}
                    <button
                        onClick={handleAddToCart}
                        className="bg-primary z-20 text-white py-1 px-4 rounded-full hover:bg-orange-700 transition duration-300 flex items-center space-x-2"
                    >
                        <IoCartOutline />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
            <div className="p-3 flex flex-col justify-center items-start h-[40%]">
                <div className="w-full flex justify-between items-center">
                    <p className="text-gray-500 text-sm">{category}</p>
                    <p className="text-gray-500 text-sm">{brand}</p>
                </div>
                <div className="w-full flex justify-start items-center mt-2 gap-3">
                    <p className="text-xl font-semibold text-primary space-x-3">${price}</p>
                    {discount > 0 && (
                        <p className="text-xs text-red-500 line-through">${(price * (1 + discount / 100)).toFixed(2)}</p>
                    )}
                </div>
            </div>
            <button
                onClick={handleWishlistToggle}
                className="absolute top-2 right-2 bg-gray-100 rounded-full h-8 w-8 flex justify-center items-center text-lg z-30 hover:bg-gray-200 transition border border-pink-300"
            >
                {isWishlisted ? (
                    <AiFillHeart className="text-red-500" />
                ) : (
                    <AiOutlineHeart className="text-gray-500" />
                )}
            </button>
            {flash && <button className="absolute top-2 left-2 rounded-md text-sm bg-orange-500 text-white px-2 py-1">{flash}</button>}
            <div className="absolute inset-0 bg-black  opacity-0 group-hover:opacity-25 transition-opacity duration-300 ease-in-out"></div>
        </div>
    );
}
