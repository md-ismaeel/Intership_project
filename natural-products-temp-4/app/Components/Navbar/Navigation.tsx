import { navLinks } from "@/app/Constants/Constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex justify-center items-center gap-6">
            {navLinks.map((link) => (
                <div key={link.id} className="relative">
                    <Link
                        href={link.path}
                        className={`rounded-md transition-all duration-300 text-sm tracking-widest uppercase relative ${pathname === link.path
                            ? "text-gray-900 font-semibold"
                            : "text-gray-700 hover:text-gray-900"}`}>
                        {link.label}
                        {pathname === link.path && (
                            <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-red-500"></span>
                        )}
                    </Link>
                </div>
            ))}
        </nav>
    );
}