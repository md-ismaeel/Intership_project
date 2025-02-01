"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const pathname = usePathname();
    const navLinks = [
        { label: "Background", path: "/customize" },
        { label: "Header & Favicon", path: "/customize/header" },
        { label: "Banners", path: "/customize/banners" },
        { label: "Sections", path: "/customize/sections" },
        { label: "Fonts", path: "/customize/fonts" },
        { label: "Advanced", path: "/customize/advanced" },
    ];

    return (
        <nav className="w-full flex flex-col bg-white shadow-lg rounded-lg p-2 gap-1">
            <h1 className="px-6 py-3 font-bold">Oxford</h1>
            {navLinks.map((link, i) => (
                <Link
                    key={i}
                    href={link.path}
                    className={`relative w-full px-6 py-3 text-gray-700 font-medium rounded-md transition-all duration-300 ease-in-out 
                        ${pathname === link.path ? "bg-blue-50 text-blue-600 border-blue-500 border-r-4 scale-105 shadow-sm" : "hover:bg-blue-50 hover:scale-[1.02]"}`}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}
