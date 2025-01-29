import React from "react";
import { Loader2 } from "lucide-react";


export default function Loading() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="flex items-center justify-center space-x-3">
                <Loader2 className="animate-spin text-blue-600" size={42} />
                <p className="text-xl text-gray-700">Loading...</p>
            </div>
        </div>
    );
}
