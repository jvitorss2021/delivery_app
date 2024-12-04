import express from "express";
import { createOrder, getOrders } from "../controller/orderController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getOrders);

export default router;
