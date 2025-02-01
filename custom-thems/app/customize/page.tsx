"use client";
import React, { useState } from "react";
import img from "@/app/assets/posing.jpg";
import img1 from "@/app/assets/360.jpg";
import img2 from "@/app/assets/young.avif";
import ColorCard from "@/app/Components/ColorCard/ColorCard";
import UpdateButton from "../Components/UpdateButton/UpdateButton";

const themes = [
    { image: img, color: "#F8FAFC", title: "Light" },
    { image: img1, color: "#1A1A3A", title: "Dim" },
    { image: img2, color: "#121212", title: "Dark" },
];

const Page = () => {
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

    const handleThemeSelect = (color: string) => {
        setSelectedTheme(color);
    };

    return (
        <section className="h-[500px] bg-gray-50 flex items-start justify-center px-4 overflow-y-auto">
            <div className="max-w-6xl bg-white rounded-2xl shadow-xl p-4 mb-4">
                {/* Header */}
                <div className="mb-8 border-b pb-2">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Choose Your Background Mode
                    </h1>
                    <p className="text-gray-600 max-w-xl">
                        Select a theme that matches your website's personality and aesthetic
                    </p>
                </div>

                {/* Theme Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {themes.map((theme, i) => (
                        <ColorCard
                            key={i}
                            image={theme.image}
                            color={theme.color}
                            title={theme.title}
                            isSelected={selectedTheme === theme.color}
                            onSelect={handleThemeSelect}
                        />
                    ))}
                </div>

                {/* Selected Theme Preview */}
                {selectedTheme && (
                    <div className="bg-gray-100 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between">
                            <p className="text-gray-700 flex items-center">
                                Selected theme:{" "}
                                <span className="font-semibold ml-2">
                                    {themes.find((t) => t.color === selectedTheme)?.title}
                                </span>
                            </p>
                            <div
                                className="h-8 w-8 rounded-full shadow-md"
                                style={{ backgroundColor: selectedTheme }}
                            />
                        </div>
                    </div>
                )}

                {/* Update Button */}
                <UpdateButton selectedTheme={selectedTheme} />
            </div>
        </section>
    );
};

export default Page;
