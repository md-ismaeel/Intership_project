import React, { useState } from "react";

interface ToggleButtonProps {
    title: string;
    description: string;
    initialState?: boolean;
}

export default function ToggleButton({
    title,
    description,
    initialState = false,
}: ToggleButtonProps) {
    const [isChecked, setIsChecked] = useState(initialState);

    const handleToggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
    };

    return (
        <div className="w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-xl flex items-center justify-between gap-4 border border-gray-100">
            <div className="flex-grow pr-4">
                <h1 className="text-lg font-semibold text-gray-900 mb-1">{title}</h1>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </div>

            <button
                onClick={handleToggle}
                role="switch"
                aria-checked={isChecked}
                className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isChecked ? "bg-blue-600" : "bg-gray-200"
                    }`}
            >
                <span className="sr-only">Toggle switch</span>
                <span
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${isChecked ? "translate-x-7" : "translate-x-0"
                        }`}
                />
            </button>
        </div>
    );
}
