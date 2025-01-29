export async function fetchProducts(category: string) {
  const url =
    category === "All"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${category}`;

  const response = await fetch(url);

  if (!response.ok) throw new Error("Failed to fetch products");

  return response.json();
}

export async function fetchProductDetails(id: number) {
  const url = `https://fakestoreapi.com/products/${id}`;
  const response = await fetch(url);

  if (!response.ok) throw new Error("Failed to fetch products");

  return response.json();
}
