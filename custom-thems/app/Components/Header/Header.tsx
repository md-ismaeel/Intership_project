import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

export default function Header() {
    return (
        <>
            <header className="w-full h-14 border-b bg-white shadow-sm flex justify-between items-center px-5">
                <div className="flex justify-center items-center gap-2">
                    <Link href={"/"}>
                        <FaArrowLeft className="text-gray-600 text-2xl mr-5 mt-1" />
                    </Link>
                    <h1 className="text-xl font-semibold text-gray-900">
                        Customize Theme
                    </h1>

                    <button className="border rounded-full px-2 py-1 text-sm w-[8.5rem] flex justify-center items-center gap-2 text-[12px]">
                        <span className="w-6 h-6 text-center flex justify-center items-center bg-gray-800 text-white rounded-full text-ms">?</span>
                        How its work
                    </button>
                </div>

                <div className="flex justify-center items-center gap-4">
                    <button className="border rounded-md px-4 py-1.5">Previous</button>
                    <button className="px-4 py-1.5 rounded-md bg-blue-500 text-white">Update</button>
                </div>
            </header>
        </>
    );
}
