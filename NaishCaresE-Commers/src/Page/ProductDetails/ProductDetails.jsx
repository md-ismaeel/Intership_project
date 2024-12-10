import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, toggleWishlist } from "../../Redux/slices/usersSlice";
import { IoCartOutline, IoShareSocialOutline } from "react-icons/io5";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "material-react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const data = useSelector((state) => state.Ecommers.data);
  const wishList = useSelector((state) => state.Ecommers.wishList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = data.find((item) => item.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      toast.error("Product not found.");
      navigate("/products");
    }
    setLoading(false);
  }, [id, data, navigate]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success(`${product.name} (${quantity}) added to your cart!`);
  };

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist(product));
    toast.info(wishList.some((fav) => fav.id === product.id)
      ? `Removed ${product.name} from wishlist`
      : `Added ${product.name} to wishlist`
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, text: `Check out this amazing product: ${product.name}`, url: window.location.href }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard!");
    }
  };

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-10 md:flex md:space-x-10">
      {/* Product Image Section */}
      <div className="md:w-1/2 relative group">
        <div className="sticky top-20">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-contain rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={handleWishlistToggle}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              >
                {wishList.some((fav) => fav.id === product.id) ? (
                  <AiFillHeart className="text-red-500 text-2xl" />
                ) : (
                  <AiOutlineHeart className="text-gray-500 text-2xl" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              >
                <IoShareSocialOutline className="text-gray-500 text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="md:w-1/2 mt-6 md:mt-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.category}</p>

        <div className="flex items-center space-x-4 mb-6">
          <span className="text-3xl font-bold text-primary">
            ${product.price}
          </span>
          {product.discount > 0 && (
            <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>

        <p className="text-gray-700 mb-6">{product.description}</p>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-gray-700">Quantity:</span>
          <div className="flex items-center border rounded-full">
            <button
              onClick={handleDecrease}
              className="p-2 hover:bg-gray-100 rounded-l-full"
            >
              <FaMinus className="text-gray-600" />
            </button>
            <span className="px-4 text-lg font-semibold">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="p-2 hover:bg-gray-100 rounded-r-full"
            >
              <FaPlus className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-primary text-white py-3 rounded-full flex items-center justify-center space-x-2 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-in-out transform mb-4"
        >
          <IoCartOutline className="text-2xl" />
          <span>Add to Cart</span>
        </button>

        {/* Product Details */}
        <div className="border-t pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Brand</p>
              <p className="font-semibold">{product.brand}</p>
            </div>
            <div>
              <p className="text-gray-600">Type</p>
              <p className="font-semibold">{product.type}</p>
            </div>
            <div>
              <p className="text-gray-600">Weight</p>
              <p className="font-semibold">{product.weight}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
