import React from "react";
import { CgMenuGridR } from "react-icons/cg";


export default function ProductListBorder({title}) {
    return (
        <>
            <div className="w-full h-auto flex justify-center items-center">
                <div className="w-72 md:w-[95%] lg:w-[97%] h-10 border mt-4 rounded-md flex items-center gap-3">
                    <CgMenuGridR className="ml-5 text-lg" />
                    <h1 className="text-sm uppercase font-medium">{title}</h1>
                </div>
            </div>
        </>
    );
}
