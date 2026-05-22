import { Request, Response } from "express";

import { createApiResponse } from "../core/interceptors";
import { UpdateInventoryDto } from "../dto/inventory";
import { InventoryService } from "../services/inventory.service";

export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  getByVariantId = async (req: Request<{ variantId: string }>, res: Response) => {
    const result = await this.inventoryService.getInventoryByVariantId(req.params.variantId);
    res.json(createApiResponse(result));
  };

  update = async (req: Request<unknown, unknown, UpdateInventoryDto>, res: Response) => {
    const result = await this.inventoryService.updateInventory(req.body);
    res.json(createApiResponse(result));
  };
}
