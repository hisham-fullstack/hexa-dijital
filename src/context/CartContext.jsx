"use client";

import React, { createContext, useContext, useState } from "react";
import { parsePrice } from "@/utils/formatters";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart, bir CartProvider içinde kullanılmalıdır.");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (service) => {
    if (!service || !service.slug) return;
    setCartItems((prev) => {
      if (prev.some((item) => item.slug === service.slug)) return prev;
      return [...prev, service];
    });
  };

  const removeFromCart = (slug) => {
    setCartItems((prev) => prev.filter((item) => item.slug !== slug));
  };

  const clearCart = () => setCartItems([]);

  const rawTotal = cartItems.reduce(
    (acc, item) => acc + parsePrice(item.price),
    0,
  );

  let discountPercentage = 0;
  if (cartItems.length === 2) discountPercentage = 10;
  if (cartItems.length >= 3) discountPercentage = 15;

  const discountAmount = (rawTotal * discountPercentage) / 100;
  const finalTotal = rawTotal - discountAmount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        rawTotal,
        discountPercentage,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
