import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollOnTop() {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!isVisible) return null;

    return (
        <div
            className="z-50 fixed bottom-4 right-4 p-3 bg-green-300 text-white rounded-full shadow-lg cursor-pointer hover:bg-green-700 transition-all"
            onClick={handleScrollToTop}
        >
            <FaArrowUp />
        </div>
    );
}
