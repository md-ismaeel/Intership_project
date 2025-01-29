import React from "react";
import ProdDetails from "@/app/Components/ProdDetails/ProdDetails";
import { fetchProductDetails } from "@/app/Utils/utils";
import { product } from "@/app/Type/Type";

export default async function ProductDetails({ params }: { params: { productId: string } }) {
  const { productId } = params;

  try {
    const res: product = await fetchProductDetails(productId);
    console.log("Fetched Product:", res);

    return <ProdDetails data={res} />;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return <p>Failed to load product details.</p>;
  }
}
