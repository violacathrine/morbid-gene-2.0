import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Spara till localestorage
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("morbid-gene-cart", JSON.stringify(cartItems));
      console.log("Saved to localStorage:", cartItems.length, "items");
    }
  }, [cartItems]);

  //Ladda från localstorage när provider startar
  useEffect(() => {
    const saved = localStorage.getItem("morbid-gene-cart");
    if (saved) {
      const savedItems = JSON.parse(saved);
      setCartItems(savedItems);
      console.log("Loaded from localStorage:", savedItems.length, "items");
    }
  }, []);

  const addToCart = (product) => {
    console.log("🛒 FULL PRODUCT FROM API:", product);
    console.log("🛒 PRODUCT PRICE OBJECT:", product.price);
    console.log("🛒 PRICE AMOUNT:", product.price?.amount);
    console.log("🛒 PRODUCT KEYS:", Object.keys(product));
    console.log("🔑 adding product with price data:", {
      name: product.name,
      fullPrice: product.price,
      priceAmount: product.price?.amount,
      priceType: typeof product.price?.amount,
    });

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.sellableId === product.sellableId
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.sellableId === product.sellableId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newItems = [...prevItems, { ...product, quantity: 1 }];
        console.log("🛒 New cart items:", newItems.length, "products");
        return newItems;
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.sellableId !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    console.log("🔢 Updating quantity:", productId, "to", newQuantity);

    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.sellableId === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      console.log("🔢 Updated items:", updatedItems);
      return updatedItems;
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    console.log("💸 Debugging total calculation...");

    const total = cartItems.reduce((total, item) => {
      const numericPrice = parseFloat(item.price?.amount);

      return total + numericPrice * item.quantity;
    }, 0);

    console.log("💸 FINAL CALCULATED TOTAL:", total);
    return total;
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
