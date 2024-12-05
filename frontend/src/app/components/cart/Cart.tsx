"use client";

import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import Button from "../../components/common/Button"; // Importe o componente de botão

const Cart: React.FC = () => {
  const {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    decrementItemInCart,
    clearCart,
    paymentMethod,
    setPaymentMethod,
  } = useCart();
  const [error] = useState<string | null>(null);

  const total = cartItems.reduce(
    (acc, item) =>
      acc +
      parseFloat(item.price.replace("R$", "").replace(",", ".")) *
        item.quantity,
    0
  );

  const addExtraFries = () => {
    addItemToCart({
      id: 4,
      name: "Batata Frita",
      price: "R$ 12,00",
      quantity: 1,
      image: "fries.webp",
    });
  };

  const addExtraRefri = () => {
    addItemToCart({
      id: 15,
      name: "Refrigerante lata",
      price: "R$ 6,00",
      quantity: 1,
      image: "refri.webp",
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
            <div className="flex items-center">
              <Image
                src={`/images/${item.image}`}
                alt={item.name}
                width={50}
                height={50}
                className="rounded"
              />
              <div className="ml-4">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-gray-400">Quantidade: {item.quantity}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-gray-400">{item.price}</p>
              <Button
                onClick={() => decrementItemInCart(item.id)}
                className="bg-gray-800 text-white py-1 px-2 rounded hover:bg-red-900"
              >
                -
              </Button>
              <Button
                onClick={() => removeItemFromCart(item.id)}
                className="bg-red-950 text-white py-1 px-2 rounded hover:bg-red-900"
              >
                Remover
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {cartItems.length > 0 && (
        <div className="mt-4 w-full flex justify-end">
          <Button
            onClick={clearCart}
            className="bg-red-950 text-white py-1 px-3 hover:bg-red-900"
          >
            Limpar Carrinho
          </Button>
        </div>
      )}
      <div className="mt-4">
        <Button
          onClick={addExtraFries}
          className="bg-green-950 text-white py-2 px-4 hover:bg-green-900 w-48"
        >
          Adicionar Batata Frita
        </Button>
      </div>
      <div className="mt-4">
        <Button
          onClick={addExtraRefri}
          className="bg-green-950 text-white py-2 px-4 rounded hover:bg-green-900 w-48"
        >
          Adicionar Refrigerante
        </Button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Total: R$ {total.toFixed(2)}</h2>
        <div className="mt-4">
          <label className="block mb-2 text-lg font-bold">
            Forma de Pagamento
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="bg-gray-800 text-white py-2 px-4 rounded w-48"
          >
            <option value="">Selecione</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Pix">Pix</option>
          </select>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <Button
          type="finalize"
          className="bg-blue-950 text-white py-2 px-4 rounded mt-2 hover:bg-blue-900 w-48"
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
};

export default Cart;
