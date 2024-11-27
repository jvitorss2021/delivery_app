"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: number) => void;
  clearCart: () => void; // Adicione a função clearCart
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Carregar o estado do carrinho do localStorage quando o componente é montado
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Salvar o estado do carrinho no localStorage sempre que ele mudar
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const itemExists = prev.find((cartItem) => cartItem.id === item.id);
      if (itemExists) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prev, item];
    });
  };

  const removeItemFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]); // Limpar o estado do carrinho
    localStorage.removeItem("cartItems"); // Remover o carrinho do localStorage
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
