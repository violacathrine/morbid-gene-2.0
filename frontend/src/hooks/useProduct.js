import { useState, useEffect } from "react";
import { apiCall } from "../config/api.js";

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [productType, setProductType] = useState(null); // Ny
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!productId) {
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        // Hämta produkt
        const productResponse = await apiCall(`/api/merch/${productId}`);
        if (!productResponse.ok) throw new Error("Failed to fetch product");
        const productData = await productResponse.json();
        setProduct(productData);

        // Hämta ProductType (sizes/colors)
        if (productData.productTypeId) {
          const typeResponse = await apiCall(
            `/api/merch/productType/${productData.productTypeId}`
          );
          if (typeResponse.ok) {
            const typeData = await typeResponse.json();
            setProductType(typeData);
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
