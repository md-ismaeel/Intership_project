import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  img: StaticImageData;
  href?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  img,
  title,
  href = "/products",
}) => {
  return (
    <div className="w-full">
      <Link href={href}>
        <div className="relative group">
          <div className="relative w-full h-80 overflow-hidden rounded-sm shadow-lg">
            <Image
              src={img}
              alt={`${title} Category`}
              className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            {/* Initial transparent overlay that darkens on hover */}
            <div className="absolute inset-0 bg-black/5 transition-all duration-300 ease-in-out group-hover:bg-black/40" />
          </div>

          {/* Title container with fade-in and slide-up effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="transform translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="text-2xl font-bold text-white tracking-wide">
                {title}
              </h3>
              <div className="h-0.5 w-0 bg-white mx-auto transition-all duration-300 ease-out group-hover:w-full" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
