import { apiCall } from '../config/api.js';

// Skapa ny basket
export const createBasket = async (basketItems) => {
  const response = await apiCall('/api/merch/baskets', {
    method: 'POST',
    body: JSON.stringify({ basketItems }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Get existing basket
export const getBasket = async (basketId) => {
  const response = await apiCall(`/api/merch/baskets/${basketId}`);

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
  const response = await apiCall(`/api/merch/baskets/${basketId}`, {
    method: 'PUT',
    body: JSON.stringify({ basketItems }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Ta bort hela basket
export const deleteBasket = async (basketId) => {
  const response = await apiCall(`/api/merch/baskets/${basketId}`, {
    method: 'DELETE',
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
  const response = await apiCall('/api/merch/baskets/convert', {
    method: 'POST',
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

// Get checkout URL via backend
export const getCheckoutUrl = async (basketId) => {
  const response = await apiCall(`/api/merch/baskets/${basketId}/checkout`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};


