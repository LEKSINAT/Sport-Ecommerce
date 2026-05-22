import { Request, Response } from "express";

import { createApiResponse } from "../core/interceptors";
import { CreateProductDto, UpdateProductDto } from "../dto/catalog";
import { CatalogService } from "../services/catalog.service";

export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  list = async (_req: Request, res: Response) => {
    const result = await this.catalogService.listProducts();
    res.json(createApiResponse(result));
  };

  getById = async (req: Request<{ id: string }>, res: Response) => {
    const result = await this.catalogService.getProductById(req.params.id);
    res.json(createApiResponse(result));
  };

  create = async (req: Request<unknown, unknown, CreateProductDto>, res: Response) => {
    const result = await this.catalogService.createProduct(req.body);
    res.status(201).json(createApiResponse(result));
  };

  update = async (req: Request<{ id: string }, unknown, UpdateProductDto>, res: Response) => {
    const result = await this.catalogService.updateProduct(req.params.id, req.body);
    res.json(createApiResponse(result));
  };
}
