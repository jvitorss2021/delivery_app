import { Request, Response } from "express";
import Order from "../models/order";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

// Criar um novo pedido
export const createOrder = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { items, total, paymentMethod, deliveryTime } = req.body;

  if (!req.user) {
    res.status(401).json({ message: "Usuário não autenticado" });
    return;
  }

  const userId = req.user.id;

  const order = new Order({
    items,
    total,
    paymentMethod,
    deliveryTime,
    user: userId,
  });

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

// Obter todos os pedidos do usuário logado
export const getOrders = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Usuário não autenticado" });
      return;
    }

    const orders = await Order.find({ user: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    res.status(500).json({ message: "Erro ao buscar pedidos" });
  }
};
