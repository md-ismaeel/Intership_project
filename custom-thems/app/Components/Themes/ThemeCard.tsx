import Image, { StaticImageData } from "next/image";
import React from "react";
import Link from "next/link";

interface ImageProps {
    image: StaticImageData
}

export default function ThemeCard({ image }: ImageProps) {
    return (
        <Link href="/customize" className="block">
            <div className="w-[25.5rem] h-72 border relative overflow-hidden rounded-sm">
                <Image
                    src={image}
                    alt="Theme preview"
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 hover:scale-105 transition-all duration-500 ease-in-out"
                />
            </div>
        </Link>
    );
}
