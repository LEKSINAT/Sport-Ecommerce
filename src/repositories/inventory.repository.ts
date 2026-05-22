import { randomUUID } from "node:crypto";

import { WarehouseInventory } from "../models/warehouseInventory.model";

export class InventoryRepository {
  private readonly inventory: WarehouseInventory[] = [];

  async findByVariantId(variantId: string): Promise<WarehouseInventory[]> {
    return this.inventory.filter((item) => item.variantId === variantId);
  }

  async upsert(input: {
    variantId: string;
    warehouseCode: string;
    quantity: number;
    reservedQuantity?: number;
  }): Promise<WarehouseInventory> {
    const existing = this.inventory.find(
      (item) => item.variantId === input.variantId && item.warehouseCode === input.warehouseCode,
    );

    if (existing) {
      existing.quantity = input.quantity;
      existing.reservedQuantity = input.reservedQuantity ?? existing.reservedQuantity;
      existing.updatedAt = new Date();
      return existing;
    }

    const inventoryRecord: WarehouseInventory = {
      id: randomUUID(),
      variantId: input.variantId,
      warehouseCode: input.warehouseCode,
      quantity: input.quantity,
      reservedQuantity: input.reservedQuantity ?? 0,
      updatedAt: new Date(),
    };

    this.inventory.push(inventoryRecord);
    return inventoryRecord;
  }
}
