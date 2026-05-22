export interface UpdateInventoryDto {
  variantId: string;
  warehouseCode: string;
  quantity: number;
  reservedQuantity?: number;
}
