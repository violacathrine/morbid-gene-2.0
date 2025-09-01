import { useState, useEffect, createContext } from "react";
import * as basketApi from "../api/basketApi";
import { convertSpreadshirtItem } from "../utils/basketUtils";

export const CartContext = createContext();

const extractItemProperties = (item) => {
  const props = item.element.properties;
  return {
    sellableId: props.find((p) => p.key === "sellable")?.value,
    sizeLabel: props.find((p) => p.key === "sizeLabel")?.value,
  };
};

const findCartItem = (cartItems, sellableId, size) => {
  return cartItems.find(
    (item) => item.sellableId === sellableId && item.size === size
  );
};

const findBasketItemIndex = (basketItems, sellableId, size) => {
  return basketItems.findIndex((item) => {
    const { sellableId: itemSellableId, sizeLabel } = extractItemProperties(item);
    return itemSellableId === sellableId && sizeLabel === size;
  });
};

const convertBasketToCartItems = (basketItems, cartItems, selectedImage = null, productPrice = null, targetIndex = -1) => {
  return basketItems.map((item, index) => {
    const { sellableId, sizeLabel } = extractItemProperties(item);
    const existingItem = findCartItem(cartItems, sellableId, sizeLabel);
    
    // Use selected image/price for newly added items or preserve existing
    const isTargetItem = targetIndex >= 0 ? index === targetIndex : false;
    const imageToUse = isTargetItem ? selectedImage : (existingItem?.selectedImage || null);
    const priceToUse = isTargetItem ? productPrice : (existingItem?.originalPrice || null);
    
    if (existingItem) {
      return { ...existingItem, quantity: item.quantity };
    }
    return convertSpreadshirtItem(item, imageToUse, priceToUse);
  });
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [basketId, setBasketId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBasket = async () => {
      const savedBasketId = localStorage.getItem("spreadshirt-basket-id");
      if (!savedBasketId) return;

      setLoading(true);
      try {
        const basket = await basketApi.getBasket(savedBasketId);
        if (basket?.basketItems) {
          setBasketId(savedBasketId);
          setCartItems(convertBasketToCartItems(basket.basketItems, []));
        } else {
          localStorage.removeItem("spreadshirt-basket-id");
        }
      } catch (err) {
        localStorage.removeItem("spreadshirt-basket-id");
        setError("Could not load cart");
      } finally {
        setLoading(false);
      }
    };

    loadBasket();
  }, []);

  const updateBasketState = async (newBasketItems) => {
    if (newBasketItems.length === 0) {
      await basketApi.deleteBasket(basketId);
      setBasketId(null);
      setCartItems([]);
      localStorage.removeItem("spreadshirt-basket-id");
    } else {
      const updatedBasket = await basketApi.updateBasket(basketId, newBasketItems);
      setCartItems(convertBasketToCartItems(updatedBasket.basketItems, cartItems));
    }
  };

  const createNewBasket = async (basketItem, selectedImage, productPrice) => {
    const newBasket = await basketApi.createBasket([basketItem]);
    setBasketId(newBasket.id);
    localStorage.setItem("spreadshirt-basket-id", newBasket.id);

    const fullBasket = await basketApi.getBasket(newBasket.id);
    const lastIndex = fullBasket.basketItems.length - 1;
    setCartItems(convertBasketToCartItems(fullBasket.basketItems, [], selectedImage, productPrice, lastIndex));
  };

  const updateExistingBasket = async (product, selectedSize, selectedImage, selectedColor, quantity, productPrice, basketItem) => {
    const currentBasket = await basketApi.getBasket(basketId);
    const existingItemIndex = findBasketItemIndex(currentBasket.basketItems, product.sellableId, selectedSize);

    let newBasketItems;
    if (existingItemIndex >= 0) {
      // Increase quantity by the specified amount
      newBasketItems = [...currentBasket.basketItems];
      newBasketItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      newBasketItems = [...currentBasket.basketItems, basketItem];
    }

    const updatedBasket = await basketApi.updateBasket(basketId, newBasketItems);
    const targetIndex = existingItemIndex < 0 ? updatedBasket.basketItems.length - 1 : -1;
    setCartItems(convertBasketToCartItems(updatedBasket.basketItems, cartItems, selectedImage, productPrice, targetIndex));
  };

  const addToCart = async (
    product,
    selectedSize,
    selectedImage,
    selectedColor,
    quantity = 1,
    productPrice = null
  ) => {
    setLoading(true);
    setError(null);

    try {
      const basketItem = await basketApi.convertToBasketItem(
        product.sellableId,
        selectedSize,
        selectedColor,
        quantity
      );

      if (!basketId) {
        await createNewBasket(basketItem, selectedImage, productPrice);
      } else {
        await updateExistingBasket(product, selectedSize, selectedImage, selectedColor, quantity, productPrice, basketItem);
      }
    } catch (err) {
      setError("Could not add item to cart");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (sellableId, size) => {
    if (!basketId) return;

    setLoading(true);
    setError(null);

    try {
      const currentBasket = await basketApi.getBasket(basketId);
      const newBasketItems = currentBasket.basketItems.filter((item) => {
        const { sellableId: itemSellableId, sizeLabel } = extractItemProperties(item);
        return !(itemSellableId === sellableId && sizeLabel === size);
      });

      await updateBasketState(newBasketItems);
    } catch (err) {
      setError("Could not remove item from cart");
    } finally {
      setLoading(false);
    }
  };

  const optimisticallyUpdateQuantity = (sellableId, size, newQuantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.sellableId === sellableId && item.size === size) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const updateQuantity = async (sellableId, size, newQuantity) => {
    if (newQuantity <= 0) {
      return removeFromCart(sellableId, size);
    }

    if (!basketId) return;

    // Optimistic update - update UI immediately
    optimisticallyUpdateQuantity(sellableId, size, newQuantity);
    setError(null);

    try {
      const currentBasket = await basketApi.getBasket(basketId);
      const newBasketItems = currentBasket.basketItems.map((item) => {
        const { sellableId: itemSellableId, sizeLabel } = extractItemProperties(item);
        if (itemSellableId === sellableId && sizeLabel === size) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      // Update backend without loading state
      const updatedBasket = await basketApi.updateBasket(basketId, newBasketItems);
      
      // Sync with actual data from backend
      setCartItems(convertBasketToCartItems(updatedBasket.basketItems, cartItems));
    } catch (err) {
      setError("Could not update quantity");
      
      // Restore on error
      try {
        const currentBasket = await basketApi.getBasket(basketId);
        setCartItems(convertBasketToCartItems(currentBasket.basketItems, cartItems));
      } catch (restoreErr) {
      }
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!basketId) return;

    setLoading(true);
    setError(null);

    try {
      await basketApi.deleteBasket(basketId);
      setBasketId(null);
      setCartItems([]);
      localStorage.removeItem("spreadshirt-basket-id");
    } catch (err) {
      setError("Could not clear cart");
    } finally {
      setLoading(false);
    }
  };

  // Calculate total number of items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price?.display || item.price?.amount || 0);
      return total + price * item.quantity;
    }, 0);
  };

  // Rensa felmeddelanden
  const clearError = () => setError(null);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        basketId,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        clearError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
