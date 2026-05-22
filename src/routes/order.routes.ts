import { Router } from "express";

import { OrderController } from "../controllers/order.controller";
import { asyncHandler } from "../core/utils";
import { OrderRepository } from "../repositories/order.repository";
import { OrderService } from "../services/order.service";

const router = Router();
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

router.get("/", asyncHandler(orderController.list));
router.get("/:id", asyncHandler(orderController.getById));
router.post("/", asyncHandler(orderController.create));

export default router;
