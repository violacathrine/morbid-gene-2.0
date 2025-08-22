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

export const createCheckout = async (basketId) => {
  console.log(`Creating checkout for basket: ${basketId}`);

  if (!basketId || basketId.trim() === "") {
    throw new Error("BasketId is required for checkout");
  }

  const response = await fetch(`${API_BASE}/baskets/${basketId}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Checkout error: ${response.status} - ${errorText}`);
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }

  return response.json();
};