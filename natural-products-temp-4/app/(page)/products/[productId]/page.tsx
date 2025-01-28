import React from "react";
import ProdDetails from "@/app/Components/ProdDetails/ProdDetails";

export default async function ProductDetails({ params }: {
  params: { productId: string };
}) {
  const productId = Number(params.productId);

  return (
    <>
      <ProdDetails productId={productId} />
    </>
  );
}
