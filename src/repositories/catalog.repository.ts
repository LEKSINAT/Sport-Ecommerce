import { randomUUID } from "node:crypto";

import { Product } from "../models/product.model";

export class CatalogRepository {
  private readonly products: Product[] = [];

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.find((product) => product.id === id) ?? null;
  }

  async create(input: Omit<Product, "id" | "createdAt" | "updatedAt" | "isActive">): Promise<Product> {
    const product: Product = {
      id: randomUUID(),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...input,
    };

    this.products.push(product);
    return product;
  }

  async update(id: string, input: Partial<Omit<Product, "id" | "createdAt">>): Promise<Product | null> {
    const product = await this.findById(id);

    if (!product) {
      return null;
    }

    Object.assign(product, input, { updatedAt: new Date() });
    return product;
  }
}
