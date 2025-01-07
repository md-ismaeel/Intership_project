import React from "react";


export const HeartIcon = ({ filled }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 ${filled ? "text-red-500 fill-red-500" : "text-gray-300"}`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
    >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const StarIcon = ({ filled }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-4 h-4 ${filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
    >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

export const ProductRating = ({ rating }) => {
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            stars.push(
                <StarIcon
                    key={i}
                    filled={i < fullStars || (i === fullStars && hasHalfStar)}
                />
            );
        }
        return stars;
    };

    return (
        <div className="flex items-center">
            {renderStars()}
            <span className="text-sm text-gray-600 ml-1">({rating})</span>
        </div>
    );
};
