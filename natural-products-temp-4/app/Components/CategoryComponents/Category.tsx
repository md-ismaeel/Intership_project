import React from "react";
import CategoryCard from "@/app/Components/CategoryComponents/CategoryCard";
import img1 from "@/app/assets/Category/electronics-hobby-men.jpg";
import img2 from "@/app/assets/Category/jawelry-ai.jpg";
import img3 from "@/app/assets/Category/customer-shop.jpg";
import img4 from "@/app/assets/Category/posing.jpg";

const categories = [
    { img: img1, title: "Electronics", href: "/products" },
    { img: img2, title: "Jewelry", href: "/products" },
    { img: img3, title: "Men's Clothing", href: "/products" },
    { img: img4, title: "Women's Clothing", href: "/products" }
];

export default function Category() {
    return (
        <>
            <div className="text-2xl font-semibold text-gray-800 px-5 mt-10">Categories</div>
            <section className="mx-auto min-h-screen mt-2 px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-3">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.title}
                            img={category.img}
                            title={category.title}
                            href={category.href}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}