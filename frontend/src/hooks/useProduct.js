import { useState, useEffect } from "react";

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("useProduct called with:", productId); // ⬅️ LÄGG TILL DETTA

  useEffect(() => {
    console.log("useEffect triggered with productId:", productId);

    if (!productId) {
      console.log("No productId, returning early");
      return;
    }

    console.log("Fetching product with ID:", productId);

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/merch/${productId}`);
        console.log("Response status:", response.status); // ⬅️ LÄGG TILL

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        console.log("Received data:", data); // ⬅️ LÄGG TILL
        setProduct(data);
      } catch (err) {
        console.error("Fetch error:", err); // ⬅️ LÄGG TILL
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};
