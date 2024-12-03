import { Request, Response } from "express";
import Order from "../models/order";

// Criar um novo pedido
export const createOrder = async (req: Request, res: Response) => {
  const { items, total, paymentMethod, deliveryTime } = req.body;
  const order = new Order({ items, total, paymentMethod, deliveryTime });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "Erro desconhecido" });
    }
  }
};

// Obter todos os pedidos
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Erro desconhecido" });
    }
  }
};
