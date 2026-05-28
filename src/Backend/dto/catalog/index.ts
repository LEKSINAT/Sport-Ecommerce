export type ProductSortBy = "newest" | "price_asc" | "price_desc" | "name_asc" | "name_desc" | "rating_desc";

export interface ProductListQueryDto {
  page?: string;
  limit?: string;
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
}

export interface ProductListRequest {
  page: number;
  limit: number;
  search: string | null;
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  sort: ProductSortBy;
}

export interface ProductSummaryDto {
  id: number;
  name: string;
  slug: string;
  description: string | null;
<<<<<<< HEAD
  price: number;
  imageUrl: string | null;
  category: string | null;
}

export interface ProductDetailDto extends ProductSummaryDto {
  variants: ProductVariantDto[];
  availableQuantity: number;
=======
  basePrice: number;
  price: number;
  imageUrl: string | null;
  category: {
    id: number | null;
    name: string | null;
    slug: string | null;
  };
  rating: {
    average: number;
    count: number;
  };
>>>>>>> 691aaadec9880ae159688a8378a773650dc96168
}

export interface ProductVariantDto {
  id: number;
<<<<<<< HEAD
  sku: string;
  name: string | null;
  price: number;
  attributes: unknown;
}

export interface ProductListQueryDto {
  search?: string;
  category?: string;
}

export interface BuyProductDto {
  userId: number;
  quantity?: number;
  productVariantId?: number;
  addressId?: number | null;
}

export interface FavoriteProductDto {
  userId: number;
}

export interface AdminCreateProductDto {
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  category?: string | null;
  categoryId?: number | null;
  isActive?: boolean;
}

export interface AdminUpdateProductDto {
  name?: string;
  description?: string | null;
  price?: number;
  imageUrl?: string | null;
  category?: string | null;
  categoryId?: number | null;
  isActive?: boolean;
=======
  productId: number;
  sku: string;
  name: string | null;
  price: number;
  attributes: Record<string, unknown> | null;
}

export interface ProductReviewPreviewDto {
  id: number;
  rating: number;
  title: string | null;
  comment: string | null;
  userName: string | null;
  createdAt: string;
}

export interface ProductDetailDto extends ProductSummaryDto {
  createdAt: string;
  updatedAt: string;
  variants: ProductVariantDto[];
  reviews: ProductReviewPreviewDto[];
}

export interface CreateProductDto {
  name?: string;
  slug?: string;
  description?: string;
  basePrice?: string | number;
  categoryId?: string | number | null;
  imageUrl?: string;
  status?: string;
}

export interface UpdateProductDto {
  name?: string;
  slug?: string;
  description?: string;
  basePrice?: string | number;
  categoryId?: string | number | null;
  imageUrl?: string | null;
  isActive?: string | boolean;
  status?: string;
>>>>>>> 691aaadec9880ae159688a8378a773650dc96168
}
