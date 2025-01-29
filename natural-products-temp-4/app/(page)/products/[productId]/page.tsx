"use client";
import React, { useEffect, useState } from "react";
import ProdDetails from "@/app/Components/ProdDetails/ProdDetails";
import { fetchProductDetails } from "@/app/Utils/utils";
import { Product } from "@/app/Type/Type";
import { useParams } from "next/navigation";
import Loading from "@/app/Components/Loading/Loading";

export default function ProductPage() {
  const params = useParams();
  const productId = Number(params?.productId);

  const [product, setProduct] = useState<Product | null>(null);

  // Ensure useEffect is not inside any condition
  useEffect(() => {
    async function fetchData() {
      if (isNaN(productId)) {
        setProduct(null); // If productId is invalid, set product to null
        return;
      }
      try {
        const res: Product = await fetchProductDetails(productId);
        setProduct(res);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setProduct(null);
      }
    }
    fetchData();
  }, [productId]);

  if (isNaN(productId)) return <p>Invalid product ID.</p>;
  if (!product) return <Loading title="Loading product details..."/>;

  return (
    <>
      <ProdDetails data={product} />
    </>
  );
}
