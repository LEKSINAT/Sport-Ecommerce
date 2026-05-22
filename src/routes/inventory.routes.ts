import { Router } from "express";

import { InventoryController } from "../controllers/inventory.controller";
import { asyncHandler } from "../core/utils";
import { InventoryRepository } from "../repositories/inventory.repository";
import { InventoryService } from "../services/inventory.service";

const router = Router();
const inventoryRepository = new InventoryRepository();
const inventoryService = new InventoryService(inventoryRepository);
const inventoryController = new InventoryController(inventoryService);

router.get("/:variantId", asyncHandler(inventoryController.getByVariantId));
router.put("/", asyncHandler(inventoryController.update));

export default router;
