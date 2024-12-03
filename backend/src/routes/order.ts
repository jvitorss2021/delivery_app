import express from "express";
import { createOrder, getOrders } from "../controller/orderController";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);

export default router;
