import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    console.log("addToCart called with:", product); // ⬅️ LÄGG TILL
    setCartItems((prevItems) => {
      console.log("Previous items:", prevItems); // ⬅️ LÄGG TILL
      //Kolla om produkten redan finns i kundkorgen
      const existingItem = prevItems.find(
        (item) => item.sellableId === product.sellableId
      );

      if (existingItem) {
        // Om den finns, öka quantity
        return prevItems.map((item) =>
          item.sellableId === product.sellableId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        // Om den inte finns, lägg till som ny
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.sellableId !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.sellableId === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price?.amount || 0) * item.quantity,
      0
    );
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

export default CartContext;
