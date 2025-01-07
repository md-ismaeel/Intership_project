import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUrlSlug } from "../../Constant/Constant";
import { ChevronLeft, Minus, Plus, ShoppingCart, Truck, Package, AlertCircle, CheckCircle, ChevronUp, ChevronDown } from "lucide-react";
import ExtraSpace from "../../Components/ExtraSpace";
import { HeartIcon, ProductRating } from "../../Components/ProductRating/ProductRating";
import { addToCart, setProductDetails, toggleWishList } from "../../Redux/Slice/N4NSlice";
import { toast } from "material-react-toastify";
import { IoShareSocialOutline } from "react-icons/io5"

const ProductDetails = () => {
    const { data, productDetails, wishList,userAuthenticated } = useSelector((state) => state?.N4N);
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
            <div className="w-full min-h-screen bg-gray-50">
                <div className="max-w-6xl mx-auto p-4">
                    <button
                        onClick={() => navigator("/products")}
                        className="group mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Products</span>
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl p-6 shadow-sm">
                        {/* Image Gallery */}
                        <div className=" relative space-y-4">
                            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
                                <img
                                    src={productDetails?.images[selectedImage]}
                                    alt={productDetails?.title}
                                    className="w-full h-full object-cover bg-center transform transition-transform hover:scale-105"
                                />

                                {/* share button */}
                                <button
                                    onClick={handleShare}
                                    className="absolute top-5 right-16 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 transform hover:scale-110 z-10"
                                >
                                    <IoShareSocialOutline className="text-gray-500 text-2xl" />
                                </button>

                                {/* wishList button */}
                                <button
                                    onClick={handleFavorite}
                                    className="absolute top-5 right-5 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 transform hover:scale-110 z-10"
                                >
                                    <HeartIcon filled={isFavorite} />
                                </button>



                            </div>

                            <div className="grid grid-cols-4 gap-2">
                                {productDetails?.images.map((img, index) => (
                                    <button
                                        key={index}
                                        className={`aspect-square overflow-hidden transition-all bg-gray-100 ${selectedImage === index && "border-b-2 border-orange-500"}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img
                                            src={img}
                                            alt={`Product view ${index + 1}`}
                                            className="w-full h-full object-cover bg-center"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <span className="inline-block py-2 uppercase text-sm text-blue-800 rounded-full">
                                    {productDetails?.category}
                                </span>
                                <h1 className="text-2xl font-semibold mt-2 capitalize">{productDetails?.title}</h1>
                                <p className="text-gray-600 text-lg mt-4">Brand: {productDetails?.brand}</p>
                                <p className="text-gray-600 mt-2">SKU: {productDetails?.sku}</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <ProductRating rating={productDetails?.rating} />
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-600">{productDetails?.reviews?.length || 0} Reviews</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-wrap items-baseline gap-2">
                                    <span className="text-2xl font-semibold">${discountedPrice}</span>
                                    <span className="text-md text-gray-500 line-through">${productDetails?.price}</span>
                                    <span className="px-2 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                                        -{productDetails?.discountPercentage}%
                                    </span>
                                </div>
                                <p className="text-gray-600 font-medium">
                                    Status: <span className={productDetails.stock === 0 ? "text-red-600" : "text-green-600"}>
                                        {productDetails.stock === 0 ? "Out of Stock" : productDetails?.availabilityStatus}
                                    </span>
                                </p>
                            </div>

                            {/*  Quantity selector */}
                            <div className="space-y-4">
                                <div className="w-[40%] flex items-center justify-between border rounded-sm px-5 py-1">
                                    <button
                                        onClick={handleDecrement}
                                        disabled={quantity === 1}
                                        className="p-2 border rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-12 text-center font-medium">{quantity}</span>
                                    <button
                                        onClick={handleIncrement}
                                        disabled={quantity === productDetails?.maximumOrderQuantity}
                                        className="p-2 border rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Add to cart button */}
                                <button
                                    className="relative w-full h-12 px-4 rounded-lg flex items-center justify-center space-x-2 cursor-pointer border-[1px] border-gray-300 disabled:cursor-not-allowed disabled:opacity-50 tracking-widest"
                                    onClick={handleAddToCart}
                                    disabled={productDetails.stock === 0}
                                >
                                    <span className="">
                                        {isAddedToCart ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
                                        ) : (
                                            <ShoppingCart className="text-gray-700" />
                                        )}
                                    </span>
                                    <span className="uppercase text-sm">
                                        {isAddedToCart ? "Added to cart..." : "Add to Cart"}
                                    </span>
                                </button>
                            </div>

                            {/* Buy it now button */}
                            <button
                                className="relative w-full h-12 px-4 rounded-lg flex items-center justify-center space-x-2 cursor-pointer uppercase text-sm bg-orange-500 hover:bg-orange-600 text-white tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => navigator("/checkout")}
                                disabled={productDetails.stock === 0}
                            >
                                buy it now
                            </button>

                            {/* Description */}
                            <div className="w-full border-t">
                                <button
                                    onClick={() => setIsOpenDisc(!isOpenDisc)}
                                    className="w-full flex justify-between items-center mb-1 font-medium mt-4"
                                >
                                    <h2 className="uppercase text-sm tracking-widest">Description</h2>
                                    <span
                                        className="p-1 hover:bg-gray-100 rounded-full transition-transform duration-500 ease-in-out"
                                        style={{ transform: `rotate(${isOpenDisc ? 180 : 0}deg)` }}
                                    >
                                        <ChevronDown size={20} />
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpenDisc ? "max-h-[400px]" : "max-h-[0px]"}`}
                                >
                                    <p className="text-gray-700 leading-relaxed px-2 uppercase text-[12px] tracking-wider">
                                        {productDetails?.description}
                                    </p>
                                </div>
                            </div>


                            {/* Product Specifications */}
                            <div className="w-full border-t">
                                <button
                                    onClick={() => setIsOpenSpecs(!isOpenSpecs)}
                                    className="w-full flex justify-between items-center mb-4 font-medium mt-4"
                                >
                                    <h2 className="uppercase text-sm tracking-widest">Product Specifications</h2>
                                    <span
                                        className="p-1 hover:bg-gray-100 rounded-full transition-transform duration-500 ease-in-out"
                                        style={{ transform: `rotate(${isOpenSpecs ? 180 : 0}deg)` }}
                                    >
                                        <ChevronDown size={20} />
                                    </span>
                                </button>

                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpenSpecs ? "max-h-[400px]" : "max-h-[0px]"}`}>
                                    <div className="space-y-2 text-gray-700 px-2 uppercase text-[12px] tracking-wider">
                                        <p>Weight: {productDetails?.weight} oz</p>
                                        <p>Dimensions: {productDetails?.dimensions?.width} x {productDetails?.dimensions?.height} x {productDetails?.dimensions?.depth} inches</p>
                                        <p>Maximum Order Quantity: {productDetails?.maximumOrderQuantity} units</p>
                                        <p>Tags: {productDetails?.tags?.join(", ")}</p>
                                    </div>
                                </div>

                            </div>

                            {/* shipping details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                    <Truck className="h-5 w-5 text-gray-600" />
                                    <div>
                                        <h3 className="font-medium">Shipping</h3>
                                        <p className="text-sm text-gray-600">{productDetails?.shippingInformation}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                    <Package className="h-5 w-5 text-gray-600" />
                                    <div>
                                        <h3 className="font-medium">Returns</h3>
                                        <p className="text-sm text-gray-600">
                                            {productDetails?.returnPolicy}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
                        <h2 className="text-md uppercase font-semibold mb-6 tracking-wider">Customer Reviews</h2>
                        <div className="space-y-4">
                            {productDetails?.reviews?.map((review, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg p-4 hover:border-gray-300 transition-colors"
                                >
                                    <div className="flex flex-wrap justify-between gap-4">
                                        <div>
                                            <p className="font-semibold text-md capitalize">{review.reviewerName}</p>
                                            <div className="flex items-center mt-1">
                                                <ProductRating rating={review?.rating} />
                                            </div>
                                        </div>
                                        <span className="text-gray-500">
                                            {new Date(review.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-gray-700">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {quantity < (productDetails?.maximumOrderQuantity || 1) && (
                        <div className="mt-4 flex items-center gap-2 p-4 text-yellow-800 bg-yellow-100 rounded-lg">
                            <AlertCircle className="h-4 w-4" />
                            <p>
                                Maximum order quantity is {productDetails?.maximumOrderQuantity} units
                            </p>
                        </div>
                    )}

                    {/* Product Meta Information */}
                    <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
                        <h2 className="text-md uppercase font-semibold mb-4 tracking-wider">Additional Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Meta Details */}
                            <div className="space-y-4">
                                <div className="border-b pb-4">
                                    <h3 className="text-[13px] uppercase font-semibold mb-2 tracking-wider">Product Details</h3>
                                    <div className="space-y-2 text-gray-600 text-[14px]">
                                        <p>SKU: {productDetails?.sku}</p>
                                        <p>Barcode: {productDetails?.meta?.barcode}</p>
                                        <p>Created: {new Date(productDetails?.meta?.createdAt).toLocaleDateString()}</p>
                                        <p>Last Updated: {new Date(productDetails?.meta?.updatedAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="border-b pb-4">
                                    <h3 className="text-[13px] uppercase font-semibold mb-2 tracking-wider">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {productDetails?.tags?.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-[11px] uppercase"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Warranty and Stock Info */}
                            <div className="space-y-4">
                                <div className="border-b pb-4">
                                    <h3 className="text-[13px] uppercase font-semibold mb-2 tracking-wider">Warranty & Stock</h3>
                                    <div className="space-y-2 text-gray-600 text-[14px]">
                                        <p>Warranty: {productDetails?.warrantyInformation}</p>
                                        <p>Stock Status: {productDetails?.availabilityStatus}</p>
                                        <p>Maximum Order: {productDetails?.maximumOrderQuantity} units</p>
                                    </div>
                                </div>

                                {/* QR Code */}
                                {productDetails?.meta?.qrCode && (
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">QR Code</h3>
                                        <img
                                            src={productDetails.meta.qrCode}
                                            alt="Product QR Code"
                                            className="w-28 h-28"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
