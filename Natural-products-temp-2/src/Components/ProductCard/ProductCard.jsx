import React, { useState, useEffect } from "react";
import { ProductRating } from "../ProductRating/ProductRating";
import { toast } from "material-react-toastify";
import { addToCart, toggleWishList } from "../../Redux/Slice/N4NSlice";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { HeartIcon } from "../../Components/ProductRating/ProductRating";

const ProductCard = ({ item }) => {
    const { wishList } = useSelector((state) => state?.N4N);
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const { id, title, price, discountPercentage, rating, stock, images, brand, sale } = item;

    const discountedPrice = price - price * (discountPercentage / 100);

    // Sync isFavorite state with the wishList
    useEffect(() => {
        const isInWishlist = wishList && wishList.some((fav) => fav.id === id);
        setIsFavorite(isInWishlist);
    }, [wishList, id]);

    const handleAddToCart = (e) => {
        e.preventDefault();

        if (stock === 0) {
            toast.error("Sorry, item is out of stock!");
        } else {
            dispatch(addToCart(item));
            setIsAddedToCart(true);
            setTimeout(() => setIsAddedToCart(false), 500);
            toast.success("Added to cart successfully!");
        }
    };

    const handleFavorite = (e) => {
        e.preventDefault();
        dispatch(toggleWishList(item));


        if (isFavorite) {
            toast.info(`Removed ${title} from your wishlist`);
        } else {
            toast.success(`Added ${title} to your wishlist`);
        }
    };

    return (
        <div className="relative w-[18rem] h-[23rem] bg-white rounded-lg shadow-lg overflow-hidden group">
            {/* Favorite Button */}
            <button
                onClick={handleFavorite}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 transform hover:scale-110 z-10"
            >
                <HeartIcon filled={isFavorite} />
            </button>

            {/* Product Image with Hover Overlay and Cart Button */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                    src={images[0]}
                    alt={title}
                    className="w-full h-full bg-center transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Add to Cart Button - Shows on hover */}
                <button
                    onClick={handleAddToCart}
                    disabled={stock === 0}
                    className={`absolute w-[90%] left-3 bottom-3 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-1000 delay-200 ease-in-out text-[12px] py-3 px-6 rounded-sm flex items-center justify-center gap-2
                        ${stock === 0 ? "cursor-not-allowed bg-white hover:bg-gray-100" : "bg-white text-gray-800 hover:bg-gray-100"}`}
                >
                    <span>
                        {isAddedToCart ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 absolute top-[0.6rem] left-[18%]" />
                        ) : (
                            <ShoppingCart className="absolute top-[0.5rem] left-[20%] text-gray-700" />
                        )}
                    </span>
                    <span className="uppercase text-sm">
                        {isAddedToCart ? "Added to cart..." : "Add to Cart"}
                    </span>
                </button>

                {sale && (
                    <div className="absolute top-0 left-0 uppercase text-[12px] bg-white rounded-l-t-lg px-4 py-1 tracking-widest">
                        {sale}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300">
                            {brand || "N/A"}
                        </p>
                        <h3 className="font-semibold text-lg">
                            {title.length > 24 ? `${title.slice(0, 20)}...` : title}
                        </h3>
                    </div>
                </div>

                <ProductRating rating={rating} />

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-2 mb-2">
                    <span className="text-lg font-semibold text-gray-700">${discountedPrice.toFixed(2)}</span>
                    {discountPercentage > 0 && (
                        <span className="text-sm text-orange-600 line-through opacity-80">${price}</span>
                    )}
                </div>

                {/* Stock Status */}
                <p className="text-sm text-gray-600">
                    {stock > 0 ? (
                        <span className="text-green-600">{stock} in stock</span>
                    ) : (
                        <span className="text-red-600">Out of stock</span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
