"use client";
import React from "react";
import { Check } from "lucide-react";
import { ColorCardProps } from "@/app/Types/Types";
import Image from "next/image";

export default function ColorCard({ image, color, isSelected = false, onSelect, title = "Theme preview" }: ColorCardProps) {
    const handleSelectThemeColor = () => {
        if (onSelect) {
            onSelect(color);
        }
    };

    return (
        <div
            onClick={handleSelectThemeColor}
            className={`w-72 flex flex-col justify-center items-center space-y-3 group rounded-sm transition-all duration-300 cursor-pointer ${isSelected ? "ring-2 ring-offset-2" : "hover:bg-gray-50"}`}
            style={{
                backgroundColor: isSelected ? `${color}` : "transparent",
                borderColor: isSelected ? color : "transparent",
            }}
        >
            <div className="relative h-64 overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="relative h-64 w-64">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transform transition-transform duration-500 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20" />
                </div>

                {/* Selected indicator */}
                {isSelected && (
                    <div
                        className="absolute right-3 top-3 rounded-full p-1"
                        style={{ backgroundColor: color }}
                    >
                        <Check className="h-4 w-4 text-green-700" />
                    </div>
                )}
            </div>

            {/*  */}
            <div className="flex items-center justify-between w-full px-4 py-3">
                <span
                    className={`text-sm font-medium ${["dim", "dark"].includes(title.toLowerCase()) && isSelected ? "text-white" : "text-black"}`}
                >
                    {isSelected ? "Active Theme" : title}
                </span>
                <div
                    className={`h-5 w-5 rounded-full border-2 transition-all ${isSelected ? `bg-blue-500` : "border-gray-300"}`}
                >
                </div>
            </div>
        </div>
    );
}
