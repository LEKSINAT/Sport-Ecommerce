import { Router } from "express";

import { CatalogController } from "../Controllers/catalog.controller";
import { CatalogRepository } from "../Repositories/catalog.repository";
import { createCatalogRouter } from "../Routes/catalog.routes";
import { CatalogService } from "../Services/catalog.service";

export const createCatalogModule = (): Router => {
  const catalogRepository = new CatalogRepository();
  const catalogService = new CatalogService(catalogRepository);
  const catalogController = new CatalogController(catalogService);

  return createCatalogRouter(catalogController);
};
