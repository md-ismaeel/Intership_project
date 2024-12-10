import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Search from "../../Components/Search/Search";
import { useSelector } from "react-redux";

export default function Products() {
  const data = useSelector((state) => state.Ecommers.data);
  const { category } = useParams();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      if (category) {
        const filtered = data.filter((item) => item.category.toLowerCase() === category.toLowerCase());
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    }
  }, [category, data]);

  return (
    <section className="w-full min-h-screen flex flex-col justify-start items-center mt-10 mb-10">
      <Search />

      <div className="w-full text-lg font-semibold flex justify-start items-center mt-5 mb-2">
        <div className="ml-[4.5rem] md:ml-8 flex justify-end items-center gap-1">
          <p className="bg-primary w-3 h-7"></p>
          <h1 className="mt-4 capitalize">
            {category ? `${category} Products` : "All Products"}
          </h1>
        </div>
      </div>

      {/* Product List */}
      <div className="h-auto flex justify-center items-center gap-5 flex-wrap">
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((prod) => (
            <NavLink to={`/products-details/${prod.id}`} key={prod.id}>
              <ProductCard item={prod} />
            </NavLink>
          ))
        ) : (
          <div className="text-gray-500 text-center">No products found.</div>
        )}
      </div>
    </section>
  );
}
