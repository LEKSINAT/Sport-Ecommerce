export interface CreateOrderItemDto {
  variantId: number;
  quantity: number;
  price: number;
}

export interface CreateOrderDto {
  userId: number;
  addressId?: number | null;
  totalAmount?: number;
  items: CreateOrderItemDto[];
}
