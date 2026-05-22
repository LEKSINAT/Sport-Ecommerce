import { OrderItem } from "./orderItem.model";

export type OrderStatus = "pending" | "paid" | "processing" | "shipped" | "completed" | "cancelled";

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  total: number;
  currency: string;
  shippingAddress: string;
  createdAt: Date;
  updatedAt: Date;
}
