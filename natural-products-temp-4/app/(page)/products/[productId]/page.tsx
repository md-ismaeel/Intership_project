import React from "react";
import ProdDetails from "@/app/Components/ProdDetails/ProdDetails";
import { fetchProductDetails } from "@/app/Utils/utils";

export default async function ProductDetails({ params }: {
  params: { productId: string };
}) {
  const { productId } = params;

  const res = await fetchProductDetails(productId);
  console.log("res", res);


  return (
    <>
      <ProdDetails data={res} />
    </>
  );
}
