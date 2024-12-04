"use client";

import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import { api } from "../../../lib/axios"; // Use o Axios configurado
import { useRouter } from "next/navigation";

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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      setError("Por favor, selecione uma forma de pagamento.");
      return;
    }

    const estimatedDeliveryTime = new Date();
    estimatedDeliveryTime.setMinutes(estimatedDeliveryTime.getMinutes() + 45);

    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/orders",
        {
          items: cartItems,
          total,
          paymentMethod,
          deliveryTime: estimatedDeliveryTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Pedido criado com sucesso:", response.data);
      clearCart();
      router.push("/orders");
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
          onClick={addExtraRefri}
          className="bg-green-950 text-white py-2 px-4 rounded hover:bg-green-900"
        >
          Adicionar Refrigerante
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
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-950 text-white py-2 px-4 rounded mt-2 hover:bg-blue-900"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default Cart;
