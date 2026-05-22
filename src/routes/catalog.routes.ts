import { Router } from "express";

import { CatalogController } from "../controllers/catalog.controller";
import { asyncHandler } from "../core/utils";
import { CatalogRepository } from "../repositories/catalog.repository";
import { CatalogService } from "../services/catalog.service";

const router = Router();
const catalogRepository = new CatalogRepository();
const catalogService = new CatalogService(catalogRepository);
const catalogController = new CatalogController(catalogService);

router.get("/", asyncHandler(catalogController.list));
router.get("/:id", asyncHandler(catalogController.getById));
router.post("/", asyncHandler(catalogController.create));
router.patch("/:id", asyncHandler(catalogController.update));

export default router;
