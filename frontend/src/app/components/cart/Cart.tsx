"use client";

import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import axios from "axios";

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
  const [deliveryTime, setDeliveryTime] = useState<Date | null>(null);

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
      image: "fries.webp",
    });
  };

  const addExtraSuco = () => {
    addItemToCart({
      id: 8,
      name: "Suco Natural",
      price: "R$ 8,00",
      quantity: 1,
      image: "juice.webp",
    });
  };

  const handlePlaceOrder = async () => {
    const estimatedDeliveryTime = new Date();
    estimatedDeliveryTime.setMinutes(estimatedDeliveryTime.getMinutes() + 45);
    setDeliveryTime(estimatedDeliveryTime);

    try {
      const response = await axios.post("/api/orders", {
        items: cartItems,
        total,
        paymentMethod,
        deliveryTime: estimatedDeliveryTime,
      });
      console.log("Pedido criado com sucesso:", response.data);
      clearCart();
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
    }
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
              <button
                onClick={() => decrementItemInCart(item.id)}
                className="bg-gray-800 text-white py-1 px-2 rounded hover:bg-red-900"
              >
                -
              </button>
              <button
                onClick={() => removeItemFromCart(item.id)}
                className="bg-red-950 text-white py-1 px-2 rounded hover:bg-red-900"
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
      {cartItems.length > 0 && (
        <div className="mt-4 w-full flex justify-end">
          <button
            onClick={clearCart}
            className="bg-red-950 text-white py-2 px-4 rounded hover:bg-red-900"
          >
            Limpar Carrinho
          </button>
        </div>
      )}
      <div className="mt-8">
        <button
          onClick={addExtraFries}
          className="bg-green-950 text-white py-2 px-4 rounded hover:bg-green-900"
        >
          Adicionar Batata Frita
        </button>
      </div>
      <div className="mt-8">
        <button
          onClick={addExtraSuco}
          className="bg-green-950 text-white py-2 px-4 rounded hover:bg-green-900"
        >
          Adicionar Suco Natural
        </button>
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
            className="bg-gray-800 text-white py-2 px-4 rounded"
          >
            <option value="">Selecione</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Pix">Pix</option>
          </select>
        </div>
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-950 text-white py-2 px-4 rounded mt-2 hover:bg-blue-900"
        >
          Finalizar Compra
        </button>
        {deliveryTime && (
          <p className="mt-4 text-lg font-bold">
            Horário previsto para entrega: {deliveryTime.toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
