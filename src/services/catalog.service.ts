import { AppError } from "../core/errors";
import { CreateProductDto, UpdateProductDto } from "../dto/catalog";
import { CatalogRepository } from "../repositories/catalog.repository";

export class CatalogService {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async listProducts() {
    return this.catalogRepository.findAll();
  }

  async getProductById(id: string) {
    const product = await this.catalogRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found.", 404);
    }

    return product;
  }

  async createProduct(dto: CreateProductDto) {
    return this.catalogRepository.create(dto);
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    const updatedProduct = await this.catalogRepository.update(id, dto);

    if (!updatedProduct) {
      throw new AppError("Product not found.", 404);
    }

    return updatedProduct;
  }
}
