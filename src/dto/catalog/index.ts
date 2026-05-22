export interface CreateProductDto {
  name: string;
  description: string;
  category: string;
  basePrice: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  category?: string;
  basePrice?: number;
  isActive?: boolean;
}
