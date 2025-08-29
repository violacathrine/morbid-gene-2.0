import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import * as basketApi from "../api/basketApi";
import { convertSpreadshirtItem } from "../utils/basketUtils";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [basketId, setBasketId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ladda befintlig basket vid start
  useEffect(() => {
    const loadBasket = async () => {
      const savedBasketId = localStorage.getItem("spreadshirt-basket-id");
      if (!savedBasketId) return;

      setLoading(true);
      try {
        const basket = await basketApi.getBasket(savedBasketId);
        if (basket?.basketItems) {
          setBasketId(savedBasketId);
          const items = basket.basketItems.map((item) =>
            convertSpreadshirtItem(item, null, null)
          );

          setCartItems(items);
        } else {
          localStorage.removeItem("spreadshirt-basket-id");
        }
      } catch (err) {
        console.error("Error loading basket:", err);
        localStorage.removeItem("spreadshirt-basket-id");
        setError("Could not load cart");
      } finally {
        setLoading(false);
      }
    };

    loadBasket();
  }, []);

  // Hjälpfunktion: Uppdatera basket och local state
  const updateBasketState = async (newBasketItems) => {
    if (newBasketItems.length === 0) {
      await basketApi.deleteBasket(basketId);
      setBasketId(null);
      setCartItems([]);
      localStorage.removeItem("spreadshirt-basket-id");
    } else {
      const updatedBasket = await basketApi.updateBasket(
        basketId,
        newBasketItems
      );
      // Preserve existing cart item images when updating basket
      const items = updatedBasket.basketItems.map((item) => {
        const props = item.element.properties;
        const sellableId = props.find((p) => p.key === "sellable")?.value;
        const sizeLabel = props.find((p) => p.key === "sizeLabel")?.value;
        
        // Find existing item to preserve its image and data
        const existingItem = cartItems.find(cartItem => 
          cartItem.sellableId === sellableId && 
          cartItem.size === sizeLabel
        );
        
        if (existingItem) {
          // Just update quantity, keep everything else the same
          return {
            ...existingItem,
            quantity: item.quantity
          };
        } else {
          // New item, convert normally
          return convertSpreadshirtItem(item, null, null);
        }
      });

      setCartItems(items);
    }
  };

  // Lägg till vara i kundvagn
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
        // Skapa ny basket
        const newBasket = await basketApi.createBasket([basketItem]);
        setBasketId(newBasket.id);
        localStorage.setItem("spreadshirt-basket-id", newBasket.id);

        const fullBasket = await basketApi.getBasket(newBasket.id);
        const items = fullBasket.basketItems.map((item, index) => {
          // Ge den sista tillagda item:en rätt bild och pris
          const imageToUse =
            index === fullBasket.basketItems.length - 1 ? selectedImage : null;
          const priceToUse =
            index === fullBasket.basketItems.length - 1 ? productPrice : null;
          return convertSpreadshirtItem(item, imageToUse, priceToUse);
        });
        setCartItems(items);
      } else {
        // Uppdatera befintlig basket
        const currentBasket = await basketApi.getBasket(basketId);

        const existingItemIndex = currentBasket.basketItems.findIndex(
          (item) => {
            const props = item.element.properties;
            const sellableId = props.find((p) => p.key === "sellable")?.value;
            const sizeLabel = props.find((p) => p.key === "sizeLabel")?.value;
            return (
              sellableId === product.sellableId && sizeLabel === selectedSize
            );
          }
        );

        let newBasketItems;
        if (existingItemIndex >= 0) {
          // Öka quantity med den angivna mängden
          newBasketItems = [...currentBasket.basketItems];
          newBasketItems[existingItemIndex].quantity += quantity;
        } else {
          // Lägg till ny vara
          newBasketItems = [...currentBasket.basketItems, basketItem];
        }

        // Update basket and preserve images for new items
        const updatedBasket = await basketApi.updateBasket(basketId, newBasketItems);
        const items = updatedBasket.basketItems.map((item, index) => {
          // For newly added items, use the selected image and price
          const isNewlyAdded = index === updatedBasket.basketItems.length - 1 && existingItemIndex < 0;
          const imageToUse = isNewlyAdded ? selectedImage : null;
          const priceToUse = isNewlyAdded ? productPrice : null;
          return convertSpreadshirtItem(item, imageToUse, priceToUse);
        });
        setCartItems(items);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      setError("Could not add item to cart");
    } finally {
      setLoading(false);
    }
  };

  // Ta bort vara från kundvagn
  const removeFromCart = async (sellableId, size) => {
    if (!basketId) return;

    setLoading(true);
    setError(null);

    try {
      const currentBasket = await basketApi.getBasket(basketId);
      const newBasketItems = currentBasket.basketItems.filter((item) => {
        const props = item.element.properties;
        const itemSellableId = props.find((p) => p.key === "sellable")?.value;
        const itemSizeLabel = props.find((p) => p.key === "sizeLabel")?.value;
        return !(itemSellableId === sellableId && itemSizeLabel === size);
      });

      await updateBasketState(newBasketItems);
    } catch (err) {
      console.error("Error removing from cart:", err);
      setError("Could not remove item from cart");
    } finally {
      setLoading(false);
    }
  };

  // Uppdatera antal av vara
  const updateQuantity = async (sellableId, size, newQuantity) => {
    if (newQuantity <= 0) {
      return removeFromCart(sellableId, size);
    }

    if (!basketId) return;

    // Optimistisk uppdatering - uppdatera UI direkt
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.sellableId === sellableId && item.size === size) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );

    setError(null);

    try {
      const currentBasket = await basketApi.getBasket(basketId);
      const newBasketItems = currentBasket.basketItems.map((item) => {
        const props = item.element.properties;
        const itemSellableId = props.find((p) => p.key === "sellable")?.value;
        const itemSizeLabel = props.find((p) => p.key === "sizeLabel")?.value;

        if (itemSellableId === sellableId && itemSizeLabel === size) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      // Uppdatera backend utan loading state
      const updatedBasket = await basketApi.updateBasket(basketId, newBasketItems);
      
      // Synka med faktisk data från backend
      const items = updatedBasket.basketItems.map((item) => {
        const existingItem = cartItems.find(
          cartItem => cartItem.sellableId === item.element.properties.find(p => p.key === 'sellable')?.value &&
                      cartItem.size === item.element.properties.find(p => p.key === 'sizeLabel')?.value
        );
        const imageToUse = existingItem?.selectedImage || null;
        const priceToUse = existingItem?.originalPrice || null;
        return convertSpreadshirtItem(item, imageToUse, priceToUse);
      });
      setCartItems(items);
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError("Could not update quantity");
      // Återställ vid fel
      const currentBasket = await basketApi.getBasket(basketId);
      const items = currentBasket.basketItems.map((item) => {
        const existingItem = cartItems.find(
          cartItem => cartItem.sellableId === item.element.properties.find(p => p.key === 'sellable')?.value &&
                      cartItem.size === item.element.properties.find(p => p.key === 'sizeLabel')?.value
        );
        const imageToUse = existingItem?.selectedImage || null;
        const priceToUse = existingItem?.originalPrice || null;
        return convertSpreadshirtItem(item, imageToUse, priceToUse);
      });
      setCartItems(items);
    }
  };

  // Töm hela kundvagnen
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
      console.error("Error clearing cart:", err);
      setError("Could not clear cart");
    } finally {
      setLoading(false);
    }
  };

  // Beräkna totalt antal varor
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Beräkna totalt pris
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
