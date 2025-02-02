"use client";
import React, { useEffect, useState } from "react";
import { fetchProductDetails } from "@/app/Utils/utils";
import { Product } from "@/app/Type/Type";
import { useParams, usePathname } from "next/navigation";
import Loading from "@/app/Components/Loading/Loading";
import { toast } from "material-react-toastify";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Truck, Shield, RefreshCw, Plus, Minus, ChevronDown } from "lucide-react";
import { addToCart, updateCart } from "@/app/Store/Feature/Cart/CartSlice";
import { useAppDispatch, useAppSelector } from "@/app/Store";
import { toggleWishList } from "@/app/Store/Feature/WishList/WishListSlice";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { additionalProductInfo, mockReviews } from "@/app/Constants/Constants";

type Tabs = "details" | "shipping" | "reviews";

export default function ProductPage() {
  const params = useParams();
  const pathname = usePathname();
  const productId = Number(params?.productId)

  const [product, setProduct] = useState<Product | null>(null);
  const { cart } = useAppSelector((state) => state?.cart);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tabs>("details");
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean; }>({
    warranty: false,
    shipping: false,
    returns: false,
  });

  useEffect(() => {
    async function fetchData() {
      if (isNaN(productId)) {
        setProduct(null);
        return;
      }
      try {
        const res: Product = await fetchProductDetails(productId);
        setProduct(res);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setProduct(null);
      }
    }
    fetchData();
  }, [productId, pathname]);

  const dispatch = useAppDispatch();
  const { wishList } = useAppSelector((state) => state?.wish);
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    const cartItem = cart.find((item) => item.id === product?.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cart, product?.id]);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (!product) return;

    let newQuantity = quantity;
    if (type === "increase" && quantity < 20) {
      newQuantity = quantity + 1;
    } else if (type === "decrease" && quantity > 1) {
      newQuantity = quantity - 1;
    }
    setQuantity(newQuantity);
    dispatch(updateCart({ ...product, quantity: newQuantity }));
  };

  const handleAddToCart = () => {
    if (!isSignedIn) {
      toast.error("please login first!");
      router.push("/sign-in");
      return;
    }
    if (product) {
      dispatch(addToCart(product));
      toast.success(`Added ${product.category} to cart`);
    }
  };

  const handleLike = (item: Product) => {
    if (!isSignedIn) {
      toast.error("please login first!");
      router.push("/sign-in");
      return;
    }
    dispatch(toggleWishList(item));
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (isNaN(productId)) return <p>Invalid product ID.</p>;
  if (!product) return <Loading title="Loading product details..." />;

  return (
    <>
      <section className="w-full min-h-screen bg-gray-50 flex flex-col justify-center items-center">

        <div className="w-full max-w-6xl min-h-[30rem] flex flex-col md:flex-row justify-center items-center gap-16 p-6 bg-white shadow-md rounded-md">
          {/* product image */}
          <div className="relative group flex justify-center items-center w-full md:w-1/3 overflow-hidden rounded-xl border">
            <Image
              src={product.image}
              alt={product.category}
              width={500}
              height={500}
              className="w-[90%] h-[90%] object-contain object-center transition-transform duration-300 group-hover:scale-105"
            />
            <button
              onClick={() => handleLike(product)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-all transform hover:scale-110"
            >
              <Heart
                color={wishList.find((item) => item.id === product.id) ? "red" : "gray"}
                fill={wishList.find((item) => item.id === product.id) ? "red" : "none"}
                className="w-6 h-6"
              />
            </button>
          </div>

          {/* product info */}
          <div className="flex flex-col justify-center space-y-6 w-full md:w-1/2 h-full">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{product.category}</h1>
              <p className="text-gray-500 mt-2">{product.description}</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    fill={i < Math.floor(product.rating.rate || 0) ? "currentColor" : "none"}
                    className="w-5 h-5"
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.rating.count || 0} reviews)</span>
            </div>

            <div className="text-3xl font-bold text-green-600">${(product.price || 0).toFixed(2)}</div>

            <div className="flex items-center justify-between px-2 w-[150px] border py-2 rounded-md">
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="bg-gray-100 h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-200 transition-colors"
              >
                <Minus />
              </button>
              <span className="text-xl font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increase")}
                className="bg-gray-100 h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-200 transition-colors"
              >
                <Plus />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center w-full space-x-2 bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-900 transition-colors group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:animate-pulse" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

        {/* Additional information with interactive sections */}
        <div className="mt-4 w-full max-w-6xl bg-white shadow-md rounded-md p-4 ">
          <div className="flex space-x-4 border-b mb-4">
            {["details", "shipping", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as Tabs)}
                className={`pb-2 hover:bg-gray-100 px-2 py-1 transition-all duration-500 ease-in-out active:bg-gray-200 ${activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-800"}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "details" && (
            <div className="text-gray-600 space-y-4">
              <p>{product.description}</p>
              <div
                className="border rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => toggleSection("warranty")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-3">
                    <Shield className="text-green-500 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold">Warranty Details</h3>
                      <p>{additionalProductInfo.warranty.duration} Warranty</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`transition-transform ${expandedSections.warranty ? "rotate-180" : ""}`}
                  />
                </div>
                {expandedSections.warranty && (
                  <ul className="list-disc list-inside text-sm mt-2 pl-10">
                    {additionalProductInfo.warranty.coverage.map(
                      (item, index) => (<li key={index}>{item}</li>)
                    )}
                  </ul>
                )}
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-4 text-gray-600">
              <div
                className="border rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => toggleSection("shipping")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Truck className="text-blue-500" size={20} />
                    <div>
                      <h3 className="font-semibold">Shipping Information</h3>
                      <p>{additionalProductInfo.shipping.method}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`transition-transform ${expandedSections.shipping ? "rotate-180" : ""}`}
                  />
                </div>
                {expandedSections.shipping && (
                  <div className="mt-2 pl-10 space-y-2">
                    <p>Estimated Delivery:{" "} {additionalProductInfo.shipping.estimatedDelivery}
                    </p>
                    <p className="text-sm">Free shipping on orders over ${additionalProductInfo.shipping.freeShippingThreshold}</p>
                  </div>
                )}
              </div>

              <div
                className="border rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => toggleSection("returns")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <RefreshCw className="text-green-500" size={20} />
                    <div>
                      <h3 className="font-semibold">Return Policy</h3>
                      <p>{additionalProductInfo.returns.policy}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`transition-transform ${expandedSections.returns ? "rotate-180" : ""}`}
                  />
                </div>
                {expandedSections.returns && (
                  <ul className="list-disc list-inside text-sm mt-2 pl-10">
                    {additionalProductInfo.returns.conditions.map(
                      (condition, index) => (<li key={index}>{condition}</li>)
                    )}
                  </ul>
                )}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      fill={i < Math.floor(product.rating.rate || 0) ? "currentColor" : "none"}
                      className="w-5 h-5"
                    />
                  ))}
                </div>
                <span>{product.rating.rate} / 5 ({product.rating.count} reviews)</span>
              </div>

              {mockReviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b pb-3 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          fill={i < review.rating ? "currentColor" : "none"}
                          className="w-4 h-4"
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm">{review.date}</span>
                  </div>
                  <p className="font-semibold">{review.username}</p>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
