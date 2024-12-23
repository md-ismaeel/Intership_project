import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, toggleWishlist } from "../../Redux/slices/usersSlice";
import { IoCartOutline, IoShareSocialOutline } from "react-icons/io5";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "material-react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import defaultImage from "../../assets/Product-images/organic.png";

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
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-opacity-50"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Product Image Section */}
        <div className="relative group p-6 bg-gray-50 flex items-center justify-center">
          <div
            onClick={() => navigate("/products")}
            className="absolute left-4 md:left-10 top-4 md:top-7 z-10">
            <button
              className="text-3xl md:text-4xl text-gray-400 hover:text-primary p-2 
               rounded-full transition-all duration-300 
               hover:bg-gray-100 hover:scale-105 focus:outline-none 
               active:bg-gray-200 active:scale-95"
            >
              <FaArrowLeft />
            </button>
          </div>
          <div className="relative max-w-md w-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={handleWishlistToggle}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                {wishList.some((fav) => fav.id === product.id) ? (
                  <AiFillHeart className="text-red-500 text-2xl" />
                ) : (
                  <AiOutlineHeart className="text-gray-500 text-2xl" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                <IoShareSocialOutline className="text-gray-500 text-2xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="p-8 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-4">{product.category}</p>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-4xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm font-semibold">
                {product.discount}% OFF
              </span>
            )}
          </div>

          <p className="text-gray-700 text-base mb-6 leading-relaxed">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <div className="flex items-center border-2 border-gray-200 rounded-full overflow-hidden">
              <button
                onClick={handleDecrease}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <FaMinus className="text-gray-600" />
              </button>
              <span className="px-4 text-lg font-semibold">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <FaPlus className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-white py-4 rounded-full flex items-center justify-center space-x-3 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out transform active:scale-95 shadow-md"
          >
            <IoCartOutline className="text-2xl" />
            <span className="text-lg font-semibold">Add to Cart</span>
          </button>

          {/* Product Details */}
          <div className="border-t-2 border-gray-200 pt-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Brand", value: product.brand },
                { label: "Type", value: product.type },
                { label: "Weight", value: product.weight }
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-gray-500 text-sm">{label}</p>
                  <p className="font-semibold text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}