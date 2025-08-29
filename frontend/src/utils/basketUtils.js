export const convertSpreadshirtItem = (basketItem, selectedImage = null, productPrice = null) => {
  const properties = basketItem.element.properties;
  const sizeLabel = properties.find((p) => p.key === "sizeLabel")?.value;
  const appearanceLabel = properties.find(
    (p) => p.key === "appearanceLabel"
  )?.value;
  const sellableId = properties.find((p) => p.key === "sellable")?.value;
  const appearanceId = properties.find((p) => p.key === "appearance")?.value;

  // Använd produktens pris om det finns, annars använd Spreadshirt-priset
  let priceToUse;
  
  if (productPrice && productPrice.amount) {
    // Använd priset från produktsidan
    priceToUse = {
      amount: productPrice.amount,
      currencyId: productPrice.currencyId || "EUR",
      display: productPrice.amount,
      vatIncluded: productPrice.amount,
      vatExcluded: productPrice.amount
    };
  } else {
    // Konvertera från cent till euro för Spreadshirt-priset
    priceToUse = {
      ...basketItem.priceItem,
      display: basketItem.priceItem.display / 100,
      vatIncluded: basketItem.priceItem.vatIncluded / 100,
      vatExcluded: basketItem.priceItem.vatExcluded / 100,
    };
  }

  // Hantera bilder och pris
  let imageToUse = selectedImage;

  if (selectedImage) {
    // Spara ny bild till localStorage med multipla nycklar för robusthet
    const primaryKey = `cart-image-${sellableId}-${sizeLabel}-${appearanceId}`;
    const fallbackKey = `cart-image-${sellableId}-${sizeLabel}`;
    
    try {
      localStorage.setItem(primaryKey, selectedImage);
      localStorage.setItem(fallbackKey, selectedImage); // Backup key
    } catch (error) {
      console.error("Kunde inte spara bild till localStorage:", error);
    }
  }
  
  // Spara eller hämta pris från localStorage
  const priceKey = `cart-price-${sellableId}-${sizeLabel}`;
  
  if (productPrice && productPrice.amount) {
    // Spara nytt pris
    try {
      localStorage.setItem(priceKey, JSON.stringify(priceToUse));
    } catch (error) {
      console.error("Kunde inte spara pris till localStorage:", error);
    }
  } else if (!productPrice) {
    // Försök hämta sparat pris
    try {
      const savedPrice = localStorage.getItem(priceKey);
      if (savedPrice) {
        priceToUse = JSON.parse(savedPrice);
      }
    } catch (error) {
      console.error("Kunde inte läsa pris från localStorage:", error);
    }
  }
  
  if (!selectedImage) {
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
          break;
        }
      } catch (error) {
        console.error("Kunde inte läsa bild från localStorage:", error);
      }
    }
    
  }

  return {
    sellableId: sellableId,
    name: basketItem.description,
    price: priceToUse,
    originalPrice: priceToUse, // Spara originalpriset för framtida användning
    size: sizeLabel,
    color: appearanceLabel,
    appearanceId: appearanceId,
    quantity: basketItem.quantity,
    selectedImage: imageToUse, // Använd den hämtade eller nya bilden
  };
};
