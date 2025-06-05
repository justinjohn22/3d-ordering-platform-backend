// routes/orders.js
import express from "express";
import {
    getAllOrders,
    createNewOrder,
} from "../controllers/ordersController.js";

const router = express.Router();

// GET /orders
router.get("/", getAllOrders);

// POST /orders
router.post("/", createNewOrder);

export default router;
