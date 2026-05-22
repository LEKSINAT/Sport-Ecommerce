import { UpdateInventoryDto } from "../dto/inventory";
import { InventoryRepository } from "../repositories/inventory.repository";

export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async getInventoryByVariantId(variantId: string) {
    return this.inventoryRepository.findByVariantId(variantId);
  }

  async updateInventory(dto: UpdateInventoryDto) {
    return this.inventoryRepository.upsert(dto);
  }
}
