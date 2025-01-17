import React, { useState } from "react";
import ExtraSpace from "../../Components/ExtraSpace";
import ProductListBorder from "../../Components/ProductListBorder/ProductListBorder";
import { useSelector } from "react-redux";
import { toast } from "material-react-toastify";
import { NavLink } from "react-router-dom";
import { createUrlSlug } from "../../Constant/Constant";
import ProductCard from "../../Components/ProductCard/ProductCard";

export default function Search() {
    const { data } = useSelector((state) => state?.N4N);
    const [value, setValue] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showToast, setShowToast] = useState(true); // Prevent repetitive toasts

    const handleChange = (e) => {
        const inputVal = e.target.value.toLowerCase();
        setValue(inputVal);

        if (inputVal.trim() === "") {
            setFilteredProducts([]);
            setShowToast(true); // Reset toast state when input is cleared
            return;
        }

        // Filter products based on title, category, or price
        const filtered = data?.filter((item) =>
            item.title.toLowerCase().includes(inputVal) ||
            item.category.toLowerCase().includes(inputVal) ||
            item.price.toString().includes(inputVal)
        );

        if (filtered.length === 0 && showToast) {
            toast.info(`No products found for "${inputVal}"!`);
            setShowToast(false); // Prevent repetitive toast messages
        } else if (filtered.length > 0) {
            setShowToast(true); // Reset toast state if results are found
        }

        setFilteredProducts(filtered);
    };

    return (
        <>
            <ExtraSpace />
            <ProductListBorder title={`Results for ${value ? value : "__"}`} />
            <section className="w-full min-h-screen flex justify-start items-center flex-col py-6">
                {/* Search Input */}
                <div className="mb-6 w-full flex justify-center items-center">
                    <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        placeholder="Search by title, category, or price..."
                        className="w-[95%] px-5 h-[3.5rem] py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-orange-200 text-sm lg:text-lg"
                    />
                </div>

                {/* Search Results */}
                {filteredProducts.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredProducts.map((item) => (
                            <NavLink
                                to={`/product/${createUrlSlug(item.title)}`}
                                key={item.id}
                            >
                                <ProductCard item={item} />
                            </NavLink>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center text-gray-500">
                        {value
                            ? `No products found for "${value}".`
                            : "Start typing to search for products."}
                    </div>
                )}
            </section>
        </>
    );
}
