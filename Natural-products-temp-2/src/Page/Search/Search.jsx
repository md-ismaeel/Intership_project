import React, { useState } from "react";
import ExtraSpace from "../../Components/ExtraSpace";
import ProductListBorder from "../../Components/ProductListBorder/ProductListBorder";
import { useSelector } from "react-redux";
import { toast } from "material-react-toastify";
import { NavLink } from "react-router-dom";
import { createUrlSlug } from "../../Constant/Constant";

export default function Search() {
    const { data } = useSelector((state) => state?.N4N);
    const [value, setValue] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleChange = (e) => {
        const inputVal = e.target.value.toLowerCase();
        setValue(inputVal);

        if (inputVal.trim() === "") {
            setFilteredProducts([]);
            return;
        }

        // Filter products based on title, category, or price
        const filtered = data?.filter((item) =>
            item.title.toLowerCase().includes(inputVal) ||
            item.category.toLowerCase().includes(inputVal) ||
            item.price.toString().includes(inputVal)
        );

        if (filtered.length === 0) {
            toast.info(`No products found for "${inputVal}"!`);
        }

        setFilteredProducts(filtered);
    };

    return (
        <>
            <ExtraSpace />
            <ProductListBorder title={`result for ${value}`} />
            <section className="w-full min-h-screen px-4 py-6">
                {/* Search Input */}
                <div className="mb-6">
                    <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        placeholder="Search by title, category, or price..."
                        className="w-full h-14 px-10 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-orange-200 text-lg"
                    />
                </div>

                {/* Search Results */}
                {filteredProducts.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredProducts.map((item) => (
                            <NavLink to={`/product/${createUrlSlug(item.title)}`}
                                key={item.id}
                                className="border p-4 rounded shadow hover:bg-gray-100 transition"
                            >
                                <img src={item.thumbnail} className="bg-center w-[200px] h-[100px]" /><br />
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-gray-600">Category: {item.category}</p>
                                <p className="text-gray-800">Price: ${item.price}</p>
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
