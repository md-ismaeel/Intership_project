import React, { useState } from "react";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

export default function ResponsiveNav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="w-full">
            <Navbar toggleMenu={toggleMenu} />

            {/* Mobile Navigation */}
            <MobileNav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
    );
}
