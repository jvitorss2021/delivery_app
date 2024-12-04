"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import Image from "next/image";

interface Order {
  _id: string;
  items: {
    id: number;
    name: string;
    price: string;
    quantity: number;
    image: string;
  }[];
  total: number;
  paymentMethod: string;
  deliveryTime: string;
  createdAt: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      console.log(response.data);
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.error("A resposta da API não é um array:", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      {orders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="border rounded p-4 shadow">
              <h2 className="text-lg font-bold mb-2">Pedido #{order._id}</h2>
              <p className="text-gray-600 mb-2">
                Horário previsto para entrega:{" "}
                {new Date(order.deliveryTime).toLocaleTimeString()}
              </p>
              <p className="text-gray-600 mb-2">
                Forma de pagamento: {order.paymentMethod}
              </p>
              <ul className="space-y-2">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <div className="flex items-center">
                      <Image
                        src={`/images/${item.image}`}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <p className="text-gray-400">
                          Quantidade: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-400">{item.price}</p>
                  </li>
                ))}
              </ul>
              <p className="text-lg font-bold mt-4">
                Total: R$ {order.total.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
