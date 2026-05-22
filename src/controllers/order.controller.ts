import { Request, Response } from "express";

import { createApiResponse } from "../core/interceptors";
import { CreateOrderDto } from "../dto/order";
import { OrderService } from "../services/order.service";

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  list = async (_req: Request, res: Response) => {
    const result = await this.orderService.listOrders();
    res.json(createApiResponse(result));
  };

  getById = async (req: Request<{ id: string }>, res: Response) => {
    const result = await this.orderService.getOrderById(req.params.id);
    res.json(createApiResponse(result));
  };

  create = async (req: Request<unknown, unknown, CreateOrderDto>, res: Response) => {
    const result = await this.orderService.createOrder(req.body);
    res.status(201).json(createApiResponse(result));
  };
}
