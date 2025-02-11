import { NavLink } from "react-router-dom";

export default function Navigation() {
    const navLinks = [
        { label: "Background", path: "/customize" },
        { label: "Advanced", path: "/customize/advanced" },
        { label: "Header & Favicon", path: "/customize/header" },
        { label: "Banners", path: "/customize/banners" },
        { label: "Sections", path: "/customize/sections" },
        { label: "Fonts", path: "/customize/fonts" },
    ];

    return (
        <nav className="w-full flex flex-col bg-white shadow-lg rounded-lg p-2 gap-1">
            <h1 className="px-6 py-3 font-bold">Oxford</h1>
            {navLinks.map((link, i) => (
                <NavLink
                    key={i}
                    to={link.path}
                    className={({ isActive }) =>
                        `relative w-full px-6 py-3 text-gray-700 font-medium rounded-md transition-all duration-300 ease-in-out 
                        ${isActive ? "bg-blue-50 text-blue-600 border-blue-500 border-r-4 scale-105 shadow-sm" : "hover:bg-blue-50 hover:scale-[1.02]"}`
                    }
                >
                    {link.label}
                </NavLink>
            ))}
        </nav>
    );
}
