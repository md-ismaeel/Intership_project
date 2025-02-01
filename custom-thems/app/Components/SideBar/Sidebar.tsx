import React from "react";
import Navigation from "@/app/Components/Navigation/Navigation";
import { IoCodeSlash } from "react-icons/io5";

export default function Sidebar() {
    return (
        <>
            <div className="w-72">
                <Navigation />
                <button className="w-full h-12 px-4 py-2 bg-purple-500 mt-2 rounded-sm flex justify-between items-center font-semibold">
                    <span className="text-md text-lg text-white">Code editor</span>
                    <span>
                        <IoCodeSlash className="text-xl text-white" />
                    </span>
                </button>
            </div>
        </>
    );
}
