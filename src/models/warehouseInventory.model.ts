export interface WarehouseInventory {
  id: string;
  variantId: string;
  warehouseCode: string;
  quantity: number;
  reservedQuantity: number;
  updatedAt: Date;
}
