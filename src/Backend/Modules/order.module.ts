import { Router } from "express";

import { OrderController } from "../Controllers/order.controller";
import { OrderRepository } from "../Repositories/order.repository";
import { createOrderRouter } from "../Routes/order.routes";
import { OrderService } from "../Services/order.service";

export const createOrderModule = (): Router => {
  const orderRepository = new OrderRepository();
  const orderService = new OrderService(orderRepository);
  const orderController = new OrderController(orderService);

  return createOrderRouter(orderController);
};
