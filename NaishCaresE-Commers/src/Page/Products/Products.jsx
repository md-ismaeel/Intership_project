import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { PRODUCTS } from "../../ProductsData";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Search from "../../Components/Search/Search";

export default function Products() {
  const [product, setProduct] = useState(PRODUCTS);
  return (
    <section
      className={`w-full h-auto flex flex-col justify-center items-center mt-10 mb-10`}
    >
      <Search />
      <div className={`w-full text-lg font-semibold flex justify-start items-center`}>
        <div className="w-[10.5%] flex justify-end items-center">
          <p className="bg-primary w-5 h-7"></p>
          <h1 className="mt-4">Products</h1>
        </div>
      </div>
      <div
        className={`h-auto flex justify-center items-center gap-5 flex-wrap`}
      >
        {product && product.length > 0 ? (
          product.map((prod) => (
            <NavLink to={`/product-details/${prod.id}`} key={prod.id}>
              <ProductCard
                name={prod.name}
                category={prod.category}
                price={prod.price}
                description={prod.description}
                image={prod.image}
              />
            </NavLink>
          ))
        ) : (
          <div>No data</div>
        )}
      </div>
    </section>
  );
}
