import { useState, useEffect } from "react";

export const useProductImages = (sellableId, appearanceId, ideaId) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🖼️ useProductImages triggered:", { sellableId, appearanceId });

    if (!sellableId || !appearanceId) {
      console.log("Missing sellableId or appearanceId, skipping fetch");
      return;
    }

    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(
          `Fetching images for sellable: ${sellableId}, appearance: ${appearanceId}, ideaId: ${ideaId}`
        );
        const response = await fetch(
          `/api/merch/sellable/${sellableId}/${appearanceId}/${ideaId}`
        );
        if (!response.ok) throw new Error("Failed to fetch images");

        const data = await response.json();
        console.log("📸 Images fetched:", data.images);
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
