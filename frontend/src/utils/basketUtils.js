export const convertSpreadshirtItem = (basketItem, selectedImage = null) => {
  const properties = basketItem.element.properties;
  const sizeLabel = properties.find((p) => p.key === "sizeLabel")?.value;
  const appearanceLabel = properties.find(
    (p) => p.key === "appearanceLabel"
  )?.value;
  const sellableId = properties.find((p) => p.key === "sellable")?.value;
  const appearanceId = properties.find((p) => p.key === "appearance")?.value;

  // Konvertera från cent till euro
  const priceInEuro = {
    ...basketItem.priceItem,
    display: basketItem.priceItem.display / 100,
    vatIncluded: basketItem.priceItem.vatIncluded / 100,
    vatExcluded: basketItem.priceItem.vatExcluded / 100,
  };

  // Hantera bilder
  let imageToUse = selectedImage;

  if (selectedImage) {
    // Spara ny bild till localStorage med multipla nycklar för robusthet
    const primaryKey = `cart-image-${sellableId}-${sizeLabel}-${appearanceId}`;
    const fallbackKey = `cart-image-${sellableId}-${sizeLabel}`;
    
    try {
      localStorage.setItem(primaryKey, selectedImage);
      localStorage.setItem(fallbackKey, selectedImage); // Backup key
      console.log("Sparade bild till localStorage:", primaryKey);
    } catch (error) {
      console.error("Kunde inte spara bild till localStorage:", error);
    }
  } else {
    // Försök läsa befintlig bild från localStorage med flera möjliga nycklar
    const possibleKeys = [
      `cart-image-${sellableId}-${sizeLabel}-${appearanceId}`,
      `cart-image-${sellableId}-${sizeLabel}`,
      `cart-image-${sellableId}-${sizeLabel}-default`,
      `cart-image-${sellableId}-${sizeLabel}-undefined`
    ];
    
    for (const imageKey of possibleKeys) {
      try {
        const savedImage = localStorage.getItem(imageKey);
        if (savedImage && savedImage.startsWith('http')) {
          imageToUse = savedImage;
          console.log("Hämtade sparad bild från localStorage:", imageKey);
          break;
        }
      } catch (error) {
        console.error("Kunde inte läsa bild från localStorage:", error);
      }
    }
    
    if (!imageToUse) {
      console.log("Ingen sparad bild hittades för nycklar:", possibleKeys);
    }
  }

  return {
    sellableId: sellableId,
    name: basketItem.description,
    price: priceInEuro,
    size: sizeLabel,
    color: appearanceLabel,
    appearanceId: appearanceId,
    quantity: basketItem.quantity,
    selectedImage: imageToUse, // Använd den hämtade eller nya bilden
  };
};
