import { Router } from "express";

import { InventoryController } from "../Controllers/inventory.controller";
import { InventoryRepository } from "../Repositories/inventory.repository";
import { createInventoryRouter } from "../Routes/inventory.routes";
import { InventoryService } from "../Services/inventory.service";

export const createInventoryModule = (): Router => {
  const inventoryRepository = new InventoryRepository();
  const inventoryService = new InventoryService(inventoryRepository);
  const inventoryController = new InventoryController(inventoryService);

  return createInventoryRouter(inventoryController);
};
