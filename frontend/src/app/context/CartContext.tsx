"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
  category?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: number) => void;
  decrementItemInCart: (id: number) => void;
  clearCart: () => void;
  loadCart: () => void;
  setCartItems: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItemsState] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethodState] = useState<string>("");

  // Carregar o estado do carrinho do localStorage quando o componente é montado
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    const storedPaymentMethod = localStorage.getItem("paymentMethod");
    if (storedCartItems) {
      setCartItemsState(JSON.parse(storedCartItems));
    }
    if (storedPaymentMethod) {
      setPaymentMethodState(storedPaymentMethod);
    }
  }, []);

  // Salvar o estado do carrinho no localStorage sempre que ele mudar
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("paymentMethod", paymentMethod);
  }, [cartItems, paymentMethod]);

  const addItemToCart = (item: CartItem) => {
    setCartItemsState((prev) => {
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
    setCartItemsState((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const decrementItemInCart = (id: number) => {
    setCartItemsState((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItemsState([]); // Limpar o estado do carrinho
    localStorage.removeItem("cartItems"); // Remover o carrinho do localStorage
  };

  const loadCart = () => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItemsState(JSON.parse(storedCartItems));
    }
  };

  const setPaymentMethod = (method: string) => {
    setPaymentMethodState(method);
  };

  const setCartItems = (items: CartItem[]) => {
    setCartItemsState(items);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        paymentMethod,
        setPaymentMethod,
        addItemToCart,
        removeItemFromCart,
        decrementItemInCart,
        clearCart,
        loadCart,
        setCartItems,
      }}
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
