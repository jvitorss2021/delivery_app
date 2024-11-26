import express from "express";
import { getProducts, createProduct } from "../controller/productController";

const router = express.Router();

// Rotas para produtos
router.get("/", getProducts);
router.post("/", createProduct);

export default router;