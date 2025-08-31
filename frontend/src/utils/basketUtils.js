export const convertSpreadshirtItem = (basketItem, selectedImage = null, productPrice = null) => {
  const properties = basketItem.element.properties;
  const sizeLabel = properties.find((p) => p.key === "sizeLabel")?.value;
  const appearanceLabel = properties.find(
    (p) => p.key === "appearanceLabel"
  )?.value;
  const sellableId = properties.find((p) => p.key === "sellable")?.value;
  const appearanceId = properties.find((p) => p.key === "appearance")?.value;

  // Use product price if available, otherwise use Spreadshirt price
  let priceToUse;
  
  if (productPrice && productPrice.amount) {
    // Use price from product page
    priceToUse = {
      amount: productPrice.amount,
      currencyId: productPrice.currencyId || "EUR",
      display: productPrice.amount,
      vatIncluded: productPrice.amount,
      vatExcluded: productPrice.amount
    };
  } else {
    // Convert from cents to euros for Spreadshirt price
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
    // Save new image to localStorage with multiple keys for robustness
    const primaryKey = `cart-image-${sellableId}-${sizeLabel}-${appearanceId}`;
    const fallbackKey = `cart-image-${sellableId}-${sizeLabel}`;
    
    try {
      localStorage.setItem(primaryKey, selectedImage);
      localStorage.setItem(fallbackKey, selectedImage); // Backup key
    } catch (error) {
      console.error("Could not save image to localStorage:", error);
    }
  }
  
  // Save or retrieve price from localStorage
  const priceKey = `cart-price-${sellableId}-${sizeLabel}`;
  
  if (productPrice && productPrice.amount) {
    // Save new price
    try {
      localStorage.setItem(priceKey, JSON.stringify(priceToUse));
    } catch (error) {
      console.error("Could not save price to localStorage:", error);
    }
  } else if (!productPrice) {
    // Try to retrieve saved price
    try {
      const savedPrice = localStorage.getItem(priceKey);
      if (savedPrice) {
        priceToUse = JSON.parse(savedPrice);
      }
    } catch (error) {
      console.error("Could not read price from localStorage:", error);
    }
  }
  
  if (!selectedImage) {
    // Try to read existing image from localStorage with multiple possible keys
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
