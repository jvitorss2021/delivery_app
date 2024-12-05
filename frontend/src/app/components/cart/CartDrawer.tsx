"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import Button from "../common/Button";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cartItems,
    removeItemFromCart,
    decrementItemInCart,
    clearCart,
    paymentMethod,
    setPaymentMethod,
  } = useCart();

  const total = cartItems.reduce(
    (acc, item) =>
      acc +
      parseFloat(item.price.replace("R$", "").replace(",", ".")) *
        item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full bg-gray-950 shadow-lg z-50"
          style={{ width: `${35}%` }}
        >
          <div className="p-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Carrinho</h2>
              <Button
                onClick={onClose}
                className="text-gray-700 hover:text-gray-100"
              >
                &times;
              </Button>
            </div>
            <ul className="flex-grow overflow-y-auto space-y-4">
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
                      <h2 className="text-gray-400 font-bold">{item.name}</h2>
                      <p className="text-gray-600">
                        Quantidade: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-gray-400 w-20 text-left">{item.price}</p>
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
            <div className="mt-4">
              <h2 className="text-xl font-bold">
                Total: R$ {total.toFixed(2)}
              </h2>
              <div className="mt-4">
                <label className="block mb-2 text-lg font-bold">
                  Forma de Pagamento
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="bg-gray-800 text-white py-2 px-4 rounded w-full"
                >
                  <option value="">Selecione</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Cartão de Débito">Cartão de Débito</option>
                  <option value="Pix">Pix</option>
                </select>
              </div>
              <Button
                onClick={clearCart}
                className="bg-red-950 text-white py-2 px-4 rounded hover:bg-red-900 w-full mt-4"
              >
                Limpar Carrinho
              </Button>
              <Button
                onClick={onClose}
                className="bg-blue-950 text-white py-2 px-4 rounded hover:bg-blue-900 w-full mt-4"
              >
                Finalizar Compra
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
