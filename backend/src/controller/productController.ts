import { Request, Response } from "express";
import Product from "../models/product";

// Obter todos os produtos
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Erro desconhecido" });
    }
  }
};

// Criar um novo produto
export const createProduct = async (req: Request, res: Response) => {
  const { name, price, image } = req.body;
  const product = new Product({ name, price, image });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "Erro desconhecido" });
    }
  }
};
