import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUrlSlug } from "../../Constant/Constant";
import { ChevronLeft, Minus, Plus, ShoppingCart, Truck, Package, AlertCircle, CheckCircle, ChevronUp, ChevronDown } from "lucide-react";
import { HeartIcon, ProductRating } from "../../Components/ProductRating/ProductRating";
import { addToCart, setProductDetails, toggleWishList } from "../../Redux/Slice/OrgSlice";
import { toast } from "material-react-toastify";
import { IoShareSocialOutline } from "react-icons/io5"
import ExtraSpace from '../../Components/ExtraSpace/ExtraSpace'

const ProductDetails = () => {
    const { data, productDetails, wishList, isAuthenticated } = useSelector((state) => state?.Org);
    const dispatch = useDispatch()
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(Number(1))
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpenDisc, setIsOpenDisc] = useState(false);
    const [isOpenSpecs, setIsOpenSpecs] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const navigator = useNavigate();
    const { title } = useParams();

    useEffect(() => {
        try {
            setIsLoading(true);
            const slugTitle = createUrlSlug(title);
            const findProduct = data?.find((item) => createUrlSlug(item.title) === slugTitle);

            if (!findProduct) return setError("Product not found");

            dispatch(setProductDetails(findProduct));
        } catch (err) {
            setError("Error loading product details");
        } finally {
            setTimeout(() => setIsLoading(false), 2000);
        }
        return () => dispatch(setProductDetails(null))
    }, [title, data]);

    const discountedPrice = productDetails?.price ? (productDetails.price - productDetails.price * (productDetails.discountPercentage / 100)).toFixed(2) : 0;

    function handleAddToCart() {
        dispatch(addToCart({ ...productDetails, quantity }));
        setIsAddedToCart(true);
        setTimeout(() => setIsAddedToCart(false), 500);
        toast.success("Added to cart successfully!");
    }

    function handleIncrement() {
        setQuantity((prev) => Math.min(prev + 1, productDetails?.maximumOrderQuantity || prev + 1));
    }

    function handleDecrement() {
        setQuantity((prev) => Math.max(prev - 1, 1));
    }

    // Sync isFavorite state with the wishList
    useEffect(() => {
        const isInWishlist = Array.isArray(wishList) && wishList.some((fav) => fav.id === productDetails?.id);
        setIsFavorite(isInWishlist);
    }, [wishList, productDetails]);

    const handleFavorite = (e) => {
        e.preventDefault();
        dispatch(toggleWishList(productDetails));

        if (isFavorite) {
            toast.info(`Removed ${productDetails.title} from your wishlist`);
        } else {
            toast.success(`Added ${productDetails.title} to your wishlist`);
        }
    };

    const handleShare = async () => {
        try {
            const shareData = {
                title: productDetails.title,
                text: `Check out this amazing product: ${productDetails.title}`,
                url: window.location.href
            };

            // Try native share first
            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
                return;
            }

            // Fallback to clipboard
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Product link copied to clipboard!");
        } catch (error) {
            toast.error("Failed to share product");
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto p-4 min-h-screen flex items-center justify-center">
                <div className="animate-pulse space-y-8 w-full">
                    <div className="h-64 bg-gray-200 rounded-lg w-full" />
                    <div className="space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <>
                <ExtraSpace />
                <div className="max-w-6xl mx-auto p-4 min-h-screen">
                    <div className="flex items-center gap-2 p-4 text-red-800 bg-red-100 rounded-lg">
                        <AlertCircle className="h-4 w-4" />
                        <p>{error}</p>
                    </div>
                </div>
            </>
        );
    }

    if (!productDetails) return null;

    return (
        <>
            <ExtraSpace />
            <section className="w-full min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto p-6">
                    <button
                        onClick={() => navigator("/products")}
                        className="group mb-8 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all"
                    >
                        <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Products</span>
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl p-8 shadow-sm">
                        {/* Image Gallery */}
                        <div className="space-y-6">
                            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-50 relative group">
                                <img
                                    src={productDetails?.images[selectedImage]}
                                    alt={productDetails?.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 flex items-center space-x-3">
                                    <button
                                        onClick={handleShare}
                                        className="p-3 rounded-xl bg-white/90 hover:bg-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105"
                                    >
                                        <IoShareSocialOutline className="text-gray-700 text-xl" />
                                    </button>
                                    <button
                                        onClick={handleFavorite}
                                        className="p-3 rounded-xl bg-white/90 hover:bg-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105"
                                    >
                                        <HeartIcon filled={isFavorite} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-4">
                                {productDetails?.images.map((img, index) => (
                                    <button
                                        key={index}
                                        className={`aspect-square overflow-hidden rounded-xl transition-all ${selectedImage === index
                                            ? "ring-2 ring-orange-500 ring-offset-2"
                                            : "hover:ring-2 ring-gray-200 ring-offset-2"
                                            }`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img
                                            src={img}
                                            alt={`Product view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm">
                                    {productDetails?.category}
                                </div>
                                <h1 className="text-3xl font-semibold capitalize leading-tight">
                                    {productDetails?.title}
                                </h1>
                                <div className="space-y-2 text-gray-600">
                                    <p className="text-lg">Brand: {productDetails?.brand}</p>
                                    <p>SKU: {productDetails?.sku}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-6">
                                <ProductRating rating={productDetails?.rating} />
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-600">{productDetails?.reviews?.length || 0} Reviews</span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex flex-wrap items-baseline gap-3">
                                    <span className="text-3xl font-bold">${discountedPrice}</span>
                                    <span className="text-lg text-gray-400 line-through">${productDetails?.price}</span>
                                    <span className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg font-medium">
                                        Save {productDetails?.discountPercentage}%
                                    </span>
                                </div>
                                <p className="text-gray-700 font-medium flex items-center gap-2">
                                    Status:
                                    <span className={`flex items-center gap-1 ${productDetails.stock === 0 ? "text-red-600" : "text-green-600"
                                        }`}>
                                        {productDetails.stock === 0 ? (
                                            <>
                                                <AlertCircle className="h-4 w-4" />
                                                Out of Stock
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="h-4 w-4" />
                                                {productDetails?.availabilityStatus}
                                            </>
                                        )}
                                    </span>
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-between border rounded-xl px-4 py-2 bg-gray-50 w-40">
                                        <button
                                            onClick={handleDecrement}
                                            disabled={quantity === 1}
                                            className="p-2 hover:bg-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="font-medium">{quantity}</span>
                                        <button
                                            onClick={handleIncrement}
                                            disabled={quantity === productDetails?.maximumOrderQuantity}
                                            className="p-2 hover:bg-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {productDetails?.maximumOrderQuantity} units max
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        className="relative h-12 px-6 rounded-xl flex items-center justify-center gap-3 bg-green-600 text-white hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        onClick={handleAddToCart}
                                        disabled={productDetails.stock === 0}
                                    >
                                        {isAddedToCart ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white" />
                                        ) : (
                                            <ShoppingCart className="h-5 w-5" />
                                        )}
                                        <span className="font-medium">
                                            {isAddedToCart ? "Adding..." : "Add to Cart"}
                                        </span>
                                    </button>

                                    <button
                                        className="h-12 px-6 rounded-xl flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        onClick={() => navigator("/checkout")}
                                        disabled={productDetails.stock === 0}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>

                            {/* Shipping & Returns */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t">
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Truck className="h-5 w-5 text-gray-700" />
                                        <h3 className="font-medium">Free Shipping</h3>
                                    </div>
                                    <p className="text-sm text-gray-600">{productDetails?.shippingInformation}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Package className="h-5 w-5 text-gray-700" />
                                        <h3 className="font-medium">Easy Returns</h3>
                                    </div>
                                    <p className="text-sm text-gray-600">{productDetails?.returnPolicy}</p>
                                </div>
                            </div>

                            {/* Collapsible Sections */}
                            <div className="space-y-4 pt-6 border-t">
                                {/* Description */}
                                <div className="rounded-xl border">
                                    <button
                                        onClick={() => setIsOpenDisc(!isOpenDisc)}
                                        className="w-full flex justify-between items-center p-4"
                                    >
                                        <h2 className="font-medium">Description</h2>
                                        <ChevronDown
                                            className={`h-5 w-5 transition-transform duration-300 ${isOpenDisc ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${isOpenDisc ? "max-h-96" : "max-h-0"}`}>
                                        <p className="px-4 pb-4 text-gray-600 leading-relaxed">
                                            {productDetails?.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Specifications */}
                                <div className="rounded-xl border">
                                    <button
                                        onClick={() => setIsOpenSpecs(!isOpenSpecs)}
                                        className="w-full flex justify-between items-center p-4"
                                    >
                                        <h2 className="font-medium">Specifications</h2>
                                        <ChevronDown
                                            className={`h-5 w-5 transition-transform duration-300 ${isOpenSpecs ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${isOpenSpecs ? "max-h-96" : "max-h-0"}`}>
                                        <div className="px-4 pb-4 space-y-2 text-gray-600">
                                            <p>Weight: {productDetails?.weight} oz</p>
                                            <p>Dimensions: {productDetails?.dimensions?.width} x {productDetails?.dimensions?.height} x {productDetails?.dimensions?.depth} inches</p>
                                            <p>Maximum Order: {productDetails?.maximumOrderQuantity} units</p>
                                            <p>Tags: {productDetails?.tags?.join(", ")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm">
                        <h2 className="text-xl font-semibold mb-8">Customer Reviews</h2>
                        <div className="space-y-6">
                            {productDetails?.reviews?.map((review, index) => (
                                <div
                                    key={index}
                                    className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex flex-wrap justify-between gap-4 mb-4">
                                        <div>
                                            <p className="font-medium text-lg capitalize">{review.reviewerName}</p>
                                            <div className="flex items-center mt-2">
                                                <ProductRating rating={review?.rating} />
                                            </div>
                                        </div>
                                        <span className="text-gray-500 text-sm">
                                            {new Date(review.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetails;

