import { AppError } from "../core/errors";
import { CreateOrderDto } from "../dto/order";
import { OrderRepository } from "../repositories/order.repository";

export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async listOrders() {
    return this.orderRepository.findAll();
  }

  async getOrderById(id: string) {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError("Order not found.", 404);
    }

    return order;
  }

  async createOrder(dto: CreateOrderDto) {
    if (dto.items.length === 0) {
      throw new AppError("Order must include at least one item.");
    }

    const items = dto.items.map((item) => ({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.quantity * item.unitPrice,
    }));

    const subtotal = items.reduce((total, item) => total + item.totalPrice, 0);

    return this.orderRepository.create({
      userId: dto.userId,
      items,
      subtotal,
      total: subtotal,
      currency: dto.currency ?? "USD",
      shippingAddress: dto.shippingAddress,
    });
  }
}
