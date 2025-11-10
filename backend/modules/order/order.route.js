import express from "express";
import { authMiddleware } from "../../middleware/auth.js";
import { createOrderFromCart, getUserOrders } from "./order.controllers.js";

const router = express.Router();
router.post("/createOrder", authMiddleware, createOrderFromCart);
router.get("/myOrders", authMiddleware, getUserOrders);

export default router;
