import { ProductStatus } from "../../Models/product.model";

export interface CreateProductDto {
  categoryId?: number | null;
  productName: string;
  description?: string;
  basePrice: number;
  imageUrl?: string;
  status?: ProductStatus;
}

export interface UpdateProductDto {
  categoryId?: number | null;
  productName?: string;
  description?: string;
  basePrice?: number;
  imageUrl?: string;
  status?: ProductStatus;
}
