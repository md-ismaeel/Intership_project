"use client"
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, RefreshCw, ArrowRight, Grid } from 'lucide-react';

const NotFound: React.FC = () => {
    const router = useRouter();

    const suggestedLinks = [
        {
            icon: Home,
            text: 'Home Page',
            href: '/',
            description: 'Return to main page'
        },
        {
            icon: Grid,
            text: 'Product Catalog',
            href: '/products',
            description: 'Browse all products'
        },
        {
            icon: RefreshCw,
            text: 'Reload',
            onClick: () => router.refresh(),
            description: 'Refresh current page'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
            <div className="max-w-4xl w-full space-y-10 text-center">
                <div>
                    <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
                        404
                    </h1>
                    <p className="text-3xl text-gray-800 mb-4 font-bold">
                        Page Not Found
                    </p>
                    <p className="text-lg text-gray-600 max-w-xl mx-auto">
                        {"The page you're looking for doesn't exist or may have been moved."}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {suggestedLinks.map(({ icon: Icon, text, href, onClick, description }) => (
                        <div
                            key={text}
                            onClick={onClick || (() => router.push(href))}
                            className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all group overflow-hidden relative cursor-pointer"
                        >
                            <div className="flex flex-col items-center z-10 relative">
                                <div className="bg-indigo-100 rounded-full p-4 mb-4 group-hover:scale-110 transition-transform">
                                    <Icon
                                        size={32}
                                        className="text-indigo-600"
                                    />
                                </div>
                                <Link href={href || '#'} className="text-gray-800 font-bold mb-2 text-lg">
                                    {text}
                                </Link>
                                <p className="text-gray-500 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity h-6">
                                    {description}
                                </p>
                                <ArrowRight
                                    size={20}
                                    className="text-gray-400 group-hover:translate-x-2 transition-transform"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotFound;