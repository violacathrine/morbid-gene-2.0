const API_BASE = "http://localhost:8080/api/merch"; // Ändra till din backend URL

// Skapa ny basket
export const createBasket = async (basketItems) => {
  const response = await fetch(`${API_BASE}/baskets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ basketItems }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Hämta befintlig basket
export const getBasket = async (basketId) => {
  const response = await fetch(`${API_BASE}/baskets/${basketId}`);

  if (!response.ok) {
    if (response.status === 404) {
      return null; // Basket finns inte
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Uppdatera basket
export const updateBasket = async (basketId, basketItems) => {
  const response = await fetch(`${API_BASE}/baskets/${basketId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ basketItems }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Ta bort hela basket
export const deleteBasket = async (basketId) => {
  const response = await fetch(`${API_BASE}/baskets/${basketId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return true;
};

// Konvertera produktdata till basketItem format
export const convertToBasketItem = async (
  productId,
  sizeName,
  colorName,
  quantity = 1
) => {
  const response = await fetch(`${API_BASE}/baskets/convert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      sizeName,
      colorName,
      quantity,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// KORRIGERAD: Hämta checkout URL från basket links
export const getCheckoutUrl = async (basketId) => {
  console.log(`Getting checkout URL for basket: ${basketId}`);

  if (!basketId || basketId.trim() === "") {
    throw new Error("BasketId is required for checkout");
  }

  try {
    // Först hämta basket-data som innehåller links
    const basket = await getBasket(basketId);

    if (!basket || !basket.links) {
      throw new Error("No checkout links found in basket");
    }

    // Hitta shopCheckout länk för din shop, annars använd defaultCheckout
    const shopCheckoutLink = basket.links.find(
      (link) => link.type === "shopCheckout"
    );
    const defaultCheckoutLink = basket.links.find(
      (link) => link.type === "defaultCheckout"
    );

    const checkoutUrl = shopCheckoutLink?.href || defaultCheckoutLink?.href;

    if (!checkoutUrl) {
      throw new Error("No checkout URL found in basket links");
    }

    return {
      checkoutUrl: checkoutUrl,
      basketId: basketId,
    };
  } catch (error) {
    console.error("Could not get checkout URL:", error.message);
    throw error;
  }
};

// NY FUNKTION: Streamlinad add-to-basket + checkout i en operation
export const addToBasketAndCheckout = async (
  productId,
  sizeName,
  colorName,
  quantity = 1
) => {
  console.log(`Direct checkout for product: ${productId}`);

  const response = await fetch(`${API_BASE}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      sizeName,
      colorName,
      quantity,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Direct checkout error: ${response.status} - ${errorText}`);
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }

  return response.json();
};

// LEGACY: Behåll den gamla funktionen för bakåtkompatibilitet
// men uppdatera den att använda den nya funktionen
export const createCheckout = async (basketId) => {
  console.warn("createCheckout is deprecated, use getCheckoutUrl instead");
  return getCheckoutUrl(basketId);
};
