import { randomUUID } from "node:crypto";

import { Order } from "../models/order.model";
import { OrderItem } from "../models/orderItem.model";

export class OrderRepository {
  private readonly orders: Order[] = [];

  async findAll(): Promise<Order[]> {
    return this.orders;
  }

  async findById(id: string): Promise<Order | null> {
    return this.orders.find((order) => order.id === id) ?? null;
  }

  async create(input: {
    userId: string;
    items: Array<Omit<OrderItem, "id" | "orderId">>;
    subtotal: number;
    total: number;
    currency: string;
    shippingAddress: string;
  }): Promise<Order> {
    const orderId = randomUUID();
    const items: OrderItem[] = input.items.map((item) => ({
      ...item,
      id: randomUUID(),
      orderId,
    }));

    const order: Order = {
      id: orderId,
      userId: input.userId,
      items,
      status: "pending",
      subtotal: input.subtotal,
      total: input.total,
      currency: input.currency,
      shippingAddress: input.shippingAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.orders.push(order);
    return order;
  }
}
