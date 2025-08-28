import { useState, useEffect } from "react";
import { apiCall } from "../config/api";

export const useProductImages = (sellableId, appearanceId, ideaId) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sellableId || !appearanceId) {
      return;
    }

    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiCall(
          `/api/merch/sellable/${sellableId}/${appearanceId}/${ideaId}`
        );
        if (!response.ok) throw new Error("Failed to fetch images");

        const data = await response.json();
        setImages(data.images || []);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [sellableId, appearanceId, ideaId]);

  return { images, loading, error };
};
