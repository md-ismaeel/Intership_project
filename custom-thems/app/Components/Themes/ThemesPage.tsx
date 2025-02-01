import React from "react";
import img from "@/app/assets/posing.jpg";
import img1 from "@/app/assets/360.jpg";
import img2 from "@/app/assets/young.avif";
import ThemeCard from "./ThemeCard";

export default function ThemesPage() {
    const custom_data = [img, img1, img2];

    return (
        <>
            <section className="w-full h-auto flex justify-between items-center px-2 pt-14">
                {custom_data.map((item, i) => <ThemeCard key={i} image={item} />)}
            </section>
        </>
    );
}
