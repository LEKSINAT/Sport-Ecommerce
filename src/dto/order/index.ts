export interface CreateOrderItemDto {
  productId: string;
  variantId?: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateOrderDto {
  userId: string;
  items: CreateOrderItemDto[];
  shippingAddress: string;
  currency?: string;
}
