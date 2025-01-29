"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/app/Components/ProductCard/ProductCard";
import { Product } from "@/app/Type/Type";
import { fetchProducts } from "@/app/Utils/utils";
import Loading from "@/app/Components/Loading/Loading";

export default function Page() {
    const categories = ["All", "electronics", "jewelery", "men's clothing", "women's clothing"];

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        handleCategory(selectedCategory);
    }, [selectedCategory]);

    async function handleCategory(category: string) {
        setIsLoading(true);
        setSelectedCategory(category);
        try {
            const fetchedProducts = await fetchProducts(category);
            setProducts(fetchedProducts);
        } catch (error) {
            console.error("Failed to fetch products:", error);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <section className="w-full min-h-screen pt-4 md:0 px-0">
            {/* Category buttons */}
            <div className="flex flex-col md:flex-row justify-center gap-3 px-5 md:px-0 md-2 md:mb-5">
                {categories.map((btn) => (
                    <button
                        key={btn}
                        onClick={() => handleCategory(btn)}
                        className={`px-4 py-2 rounded capitalize ${selectedCategory === btn ? "bg-black text-white" : "bg-gray-200 text-black hover:scale-105 transition-all duration-500 ease-in-out"}`}
                    >
                        {btn}
                    </button>
                ))}
            </div>

            {/* Products list */}
            <ul className="w-full h-full flex flex-wrap justify-center items-center gap-5 mt-5 md:mt-0 px-5 md:px-0">
                {isLoading ? (
                    <Loading title={"Loading Products..."} />
                ) : products.length > 0 ? (
                    products.map((prod: Product) => (
                        <Link key={prod.id} href={`/products/${prod.id}`}>
                            <ProductCard item={prod} />
                        </Link>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </ul>
        </section>
    );
}