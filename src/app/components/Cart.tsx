"use client";

import React from "react";
import { useCart } from "../context/CartContext";

const Cart: React.FC = () => {
  const { cartItems, addItemToCart, removeItemFromCart } = useCart();

  const total = cartItems.reduce(
    (acc, item) =>
      acc +
      parseFloat(item.price.replace("R$", "").replace(",", ".")) *
        item.quantity,
    0
  );

  const addExtraFries = () => {
    addItemToCart({
      id: 2,
      name: "Batata Frita",
      price: "R$ 12,00",
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Carrinho</h1>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p className="text-gray-600">Quantidade: {item.quantity}</p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-gray-600">{item.price}</p>
              <button
                onClick={() => removeItemFromCart(item.id)}
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <button
          onClick={addExtraFries}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Adicionar Batata Frita
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Total: R$ {total.toFixed(2)}</h2>
        <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600">
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default Cart;
