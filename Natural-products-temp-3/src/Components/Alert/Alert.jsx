import React from 'react'

export const Alert = ({ message, type = "success" }) => {
    const bgColor = type === "success" ? "bg-green-100" : "bg-red-100";
    const textColor = type === "success" ? "text-green-700" : "text-red-700";
    const borderColor = type === "success" ? "border-green-200" : "border-red-200";

    return (
        <div className="absolute bottom-1 left-3 py-2 w-[90%] flex justify-center items-center">
            <div
                className={`w-full py-3 ${bgColor} border ${borderColor} ${textColor} px-4 rounded-sm text-sm text-center`}
            >
                {message}
            </div>
        </div>
    );
};
