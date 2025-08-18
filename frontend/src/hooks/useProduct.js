import { useState, useEffect } from "react";

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [productType, setProductType] = useState(null); // Ny
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect triggered with productId:", productId);

    if (!productId) {
      console.log("No productId, returning early");
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        // Hämta produkt
        console.log("Fetching product with ID:", productId);
        const productResponse = await fetch(`/api/merch/${productId}`);
        if (!productResponse.ok) throw new Error("Failed to fetch product");
        const productData = await productResponse.json();
        setProduct(productData);

        // Hämta ProductType (sizes/colors)
        if (productData.productTypeId) {
          console.log("Fetching productType:", productData.productTypeId);
          const typeResponse = await fetch(
            `/api/merch/productType/${productData.productTypeId}`
          );
          if (typeResponse.ok) {
            const typeData = await typeResponse.json();
            setProductType(typeData);
            console.log("ProductType loaded:", typeData);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, productType, loading, error };
};
