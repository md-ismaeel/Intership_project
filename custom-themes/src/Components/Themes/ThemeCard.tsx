import { NavLink } from "react-router-dom";

interface ImageProps {
    image: string
}

export default function ThemeCard({ image }: ImageProps) {
    return (
        <NavLink to="/customize" className="block">
            <div className="w-[25.5rem] h-72 border relative overflow-hidden rounded-sm">
                <img
                    src={image}
                    alt="Theme preview"
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-all duration-500 ease-in-out"
                />
            </div>
        </NavLink>
    );
}
