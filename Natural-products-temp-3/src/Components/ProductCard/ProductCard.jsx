import React, { useState, useEffect } from "react";
import { ProductRating } from "../ProductRating/ProductRating";
import { toast } from "material-react-toastify";
import { addToCart, toggleWishList } from "../../Redux/Slice/OrgSlice";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { HeartIcon } from "../../Components/ProductRating/ProductRating";

const ProductCard = ({ item }) => {
    const { wishList } = useSelector((state) => state?.Org);
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
        <div className="relative w-[21rem] md:w-[18rem] h-[26.5rem] bg-white rounded-lg shadow-lg overflow-hidden group">
            {/* Favorite Button */}
            <button
                onClick={handleFavorite}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 transform hover:scale-110 z-10"
            >
                <HeartIcon filled={isFavorite} />
            </button>

            {/* Product Image with Hover Overlay */}
            <div className="relative h-52 overflow-hidden bg-gray-100">
                <img
                    src={images[0]}
                    alt={title}
                    className="w-full h-full bg-center transition-transform duration-500 group-hover:scale-110"
                />
                {sale && (
                    <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-br-md">
                        {sale}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300">
                            {brand || "N/A"}
                        </p>
                        <h3 className="font-semibold text-lg text-gray-800">
                            {title.length > 24 ? `${title.slice(0, 20)}...` : title}
                        </h3>
                    </div>
                </div>

                <ProductRating rating={rating} />

                {/* Price */}
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-gray-800">${discountedPrice.toFixed(2)}</span>
                    {discountPercentage > 0 && (
                        <span className="text-sm text-orange-500 line-through">${price}</span>
                    )}
                </div>

                {/* Stock Status */}
                <p className="text-sm mt-1">
                    {stock > 0 ? (
                        <span className="text-green-600">{stock} in stock</span>
                    ) : (
                        <span className="text-red-600">Out of stock</span>
                    )}
                </p>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={stock === 0}
                    className={`w-full mt-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium text-sm transition-colors duration-300 ${stock === 0
                        ? "cursor-not-allowed bg-gray-300 text-gray-500"
                        : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                >
                    {isAddedToCart ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                        <ShoppingCart size={20} />
                    )}
                    <span className="uppercase text-sm">{isAddedToCart ? "Adding..." : "Add to Cart"}</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

