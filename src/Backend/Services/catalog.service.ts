import { AppError } from "../Core/errors";
import type {
<<<<<<< HEAD
  AdminCreateProductDto,
  AdminUpdateProductDto,
  BuyProductDto,
  FavoriteProductDto,
  ProductDetailDto,
  ProductListQueryDto,
  ProductSummaryDto,
  ProductVariantDto,
} from "../dto/catalog";
import {
  addFavoriteProduct,
  createAdminProduct,
  createProductOrder,
  deleteAdminProduct,
  findAvailableStock,
  findAdminProductById,
  findCategoryIdByName,
  findFavoriteProducts,
  findProductById,
  findProducts,
  findProductVariantById,
  findProductVariants,
  removeFavoriteProduct,
  updateAdminProduct,
  type ProductRecord,
  type ProductVariantRecord,
} from "../Repositories/catalog.repository";

const ALLOWED_CATEGORIES = new Set(["football", "basketball", "gym", "running"]);

const toPositiveInteger = (value: unknown, fieldName: string): number => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError(`${fieldName} must be a positive integer.`, 400);
=======
  CreateProductDto,
  ProductDetailDto,
  ProductListQueryDto,
  ProductListRequest,
  ProductSortBy,
  ProductSummaryDto,
  UpdateProductDto,
} from "../dto/catalog";
import {
  assertProductExists,
  assertProductSlugAvailable,
  createProductInRepository,
  getProductDetailFromRepository,
  listProductsFromRepository,
  softDeleteProductInRepository,
  updateProductInRepository,
} from "../Repositories/catalog.repository";

const ALLOWED_SORTS: ProductSortBy[] = [
  "newest",
  "price_asc",
  "price_desc",
  "name_asc",
  "name_desc",
  "rating_desc",
];

export interface ProductListResult {
  items: ProductSummaryDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductMutationResult {
  id: number;
  item: ProductDetailDto | null;
}

const toPositiveInt = (value: string | undefined, fallback: number): number => {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
>>>>>>> 691aaadec9880ae159688a8378a773650dc96168
  }

  return parsed;
};

<<<<<<< HEAD
const toPositiveNumber = (value: unknown, fieldName: string): number => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new AppError(`${fieldName} must be greater than 0.`, 400);
  }

  return parsed;
};

const normalizeOptionalText = (value: string | null | undefined): string | null => {
  if (value == null) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
};

const createSlug = (name: string): string => {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `product-${Date.now()}`;
};

const parseAttributes = (attributesJson: string | null): unknown => {
  if (!attributesJson) {
    return null;
  }

  try {
    return JSON.parse(attributesJson);
  } catch {
    return attributesJson;
  }
};

const toProductSummary = (product: ProductRecord): ProductSummaryDto => ({
  id: Number(product.id),
  name: product.name,
  slug: product.slug,
  description: product.description,
  price: Number(product.basePrice),
  imageUrl: product.imageUrl,
  category: product.categoryName,
});

const toProductVariant = (variant: ProductVariantRecord): ProductVariantDto => ({
  id: Number(variant.id),
  sku: variant.sku,
  name: variant.name,
  price: Number(variant.price),
  attributes: parseAttributes(variant.attributesJson),
});

export const listProducts = async (query: ProductListQueryDto): Promise<ProductSummaryDto[]> => {
  const category = query.category?.trim();

  if (category && !ALLOWED_CATEGORIES.has(category.toLowerCase())) {
    throw new AppError("Category must be one of: Football, Basketball, Gym, Running.", 400);
  }

  const products = await findProducts({
    search: query.search,
    category,
  });

  return products.map(toProductSummary);
};

export const listAdminProducts = async (query: ProductListQueryDto): Promise<ProductSummaryDto[]> => {
  const category = query.category?.trim();

  if (category && !ALLOWED_CATEGORIES.has(category.toLowerCase())) {
    throw new AppError("Category must be one of: Football, Basketball, Gym, Running.", 400);
  }

  const products = await findProducts({
    search: query.search,
    category,
    includeInactive: true,
  });

  return products.map(toProductSummary);
};

export const getProductDetails = async (productIdValue: string): Promise<ProductDetailDto> => {
  const productId = toPositiveInteger(productIdValue, "Product id");
  const product = await findProductById(productId);

=======
const toNullableNumber = (value: string | undefined): number | null => {
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
};

const toPositiveProductId = (value: string): number => {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new AppError("Product ID must be a positive integer.", 400);
  }
  return parsed;
};

const toPrice = (value: string | number | undefined, fieldName: string): number => {
  if (value === undefined || value === null || value === "") {
    throw new AppError(`${fieldName} is required.`, 400);
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new AppError(`${fieldName} must be a non-negative number.`, 400);
  }

  return parsed;
};

const toOptionalPrice = (value: string | number | undefined): number | undefined => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new AppError("basePrice must be a non-negative number.", 400);
  }

  return parsed;
};

const toOptionalCategoryId = (
  value: string | number | null | undefined,
): number | null | undefined => {
  if (value === undefined) {
    return undefined;
  }
  if (value === null || value === "") {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new AppError("categoryId must be a positive integer.", 400);
  }

  return parsed;
};

const slugify = (value: string): string => {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

  if (!slug) {
    throw new AppError("Unable to generate a valid slug from product name.", 400);
  }

  return slug;
};

const normalizeName = (name: string | undefined): string => {
  const normalized = name?.trim() || "";
  if (normalized.length < 2) {
    throw new AppError("name must be at least 2 characters.", 400);
  }
  return normalized;
};

const normalizeListInput = (query: ProductListQueryDto): ProductListRequest => {
  const page = toPositiveInt(query.page, 1);
  const limit = Math.min(toPositiveInt(query.limit, 12), 50);

  const search = query.search?.trim() || null;
  const category = query.category?.trim() || null;
  const minPrice = toNullableNumber(query.minPrice);
  const maxPrice = toNullableNumber(query.maxPrice);

  if (minPrice != null && minPrice < 0) {
    throw new AppError("minPrice must be a positive number.", 400);
  }

  if (maxPrice != null && maxPrice < 0) {
    throw new AppError("maxPrice must be a positive number.", 400);
  }

  if (minPrice != null && maxPrice != null && minPrice > maxPrice) {
    throw new AppError("minPrice cannot be greater than maxPrice.", 400);
  }

  const requestedSort = query.sort?.trim() as ProductSortBy | undefined;
  const sort = requestedSort && ALLOWED_SORTS.includes(requestedSort) ? requestedSort : "newest";

  return {
    page,
    limit,
    search,
    category,
    minPrice,
    maxPrice,
    sort,
  };
};

export const getProductList = async (query: ProductListQueryDto): Promise<ProductListResult> => {
  const normalizedInput = normalizeListInput(query);
  const { items, total } = await listProductsFromRepository(normalizedInput);
  const totalPages = total === 0 ? 0 : Math.ceil(total / normalizedInput.limit);

  return {
    items,
    pagination: {
      page: normalizedInput.page,
      limit: normalizedInput.limit,
      total,
      totalPages,
    },
  };
};

export const getProductDetail = async (slugOrId: string): Promise<ProductDetailDto> => {
  const identifier = slugOrId.trim();
  if (!identifier) {
    throw new AppError("Product identifier is required.", 400);
  }

  const product = await getProductDetailFromRepository(identifier);
>>>>>>> 691aaadec9880ae159688a8378a773650dc96168
  if (!product) {
    throw new AppError("Product not found.", 404);
  }

<<<<<<< HEAD
  const [variants, availableQuantity] = await Promise.all([
    findProductVariants(productId),
    findAvailableStock(productId, null),
  ]);

  return {
    ...toProductSummary(product),
    variants: variants.map(toProductVariant),
    availableQuantity,
  };
};

export const getAdminProductDetails = async (productIdValue: string): Promise<ProductDetailDto> => {
  const productId = toPositiveInteger(productIdValue, "Product id");
  const product = await findAdminProductById(productId);

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  const [variants, availableQuantity] = await Promise.all([
    findProductVariants(productId),
    findAvailableStock(productId, null),
  ]);

  return {
    ...toProductSummary(product),
    variants: variants.map(toProductVariant),
    availableQuantity,
  };
};

const resolveCategoryId = async (
  categoryName: string | null | undefined,
  categoryId: number | null | undefined,
): Promise<number | null> => {
  if (categoryId != null) {
    return toPositiveInteger(categoryId, "Category id");
  }

  const normalizedCategory = normalizeOptionalText(categoryName);
  if (!normalizedCategory) {
    return null;
  }

  if (!ALLOWED_CATEGORIES.has(normalizedCategory.toLowerCase())) {
    throw new AppError("Category must be one of: Football, Basketball, Gym, Running.", 400);
  }

  const resolvedCategoryId = await findCategoryIdByName(normalizedCategory);
  if (resolvedCategoryId == null) {
    throw new AppError(`Category '${normalizedCategory}' does not exist.`, 400);
  }

  return resolvedCategoryId;
};

export const addAdminProduct = async (payload: AdminCreateProductDto): Promise<ProductSummaryDto> => {
  const name = normalizeOptionalText(payload.name);

  if (!name || name.length < 2) {
    throw new AppError("Product name must be at least 2 characters.", 400);
  }

  const categoryId = await resolveCategoryId(payload.category, payload.categoryId);
  const product = await createAdminProduct({
    categoryId,
    name,
    slug: createSlug(name),
    description: normalizeOptionalText(payload.description),
    basePrice: toPositiveNumber(payload.price, "Price"),
    imageUrl: normalizeOptionalText(payload.imageUrl),
    isActive: payload.isActive ?? true,
  });

  return toProductSummary(product);
};

export const editAdminProduct = async (
  productIdValue: string,
  payload: AdminUpdateProductDto,
): Promise<ProductSummaryDto> => {
  const productId = toPositiveInteger(productIdValue, "Product id");
  const existingProduct = await findAdminProductById(productId);

  if (!existingProduct) {
    throw new AppError("Product not found.", 404);
  }

  const name = payload.name == null ? undefined : normalizeOptionalText(payload.name);
  if (name != null && name.length < 2) {
    throw new AppError("Product name must be at least 2 characters.", 400);
  }

  const shouldUpdateCategory = "category" in payload || "categoryId" in payload;
  const categoryId = shouldUpdateCategory
    ? await resolveCategoryId(payload.category, payload.categoryId)
    : undefined;

  const product = await updateAdminProduct(productId, {
    categoryId,
    name: name ?? undefined,
    slug: name ? createSlug(name) : undefined,
    description: "description" in payload ? normalizeOptionalText(payload.description) : undefined,
    basePrice: payload.price == null ? undefined : toPositiveNumber(payload.price, "Price"),
    imageUrl: "imageUrl" in payload ? normalizeOptionalText(payload.imageUrl) : undefined,
    isActive: payload.isActive,
  });

  return toProductSummary(product);
};

export const removeAdminProduct = async (productIdValue: string): Promise<void> => {
  const productId = toPositiveInteger(productIdValue, "Product id");
  const deleted = await deleteAdminProduct(productId);

  if (!deleted) {
    throw new AppError("Product not found.", 404);
  }
};

export interface BuyProductResult {
  orderId: number;
  productId: number;
  productVariantId: number | null;
  quantity: number;
  totalAmount: number;
}

export const buyProduct = async (
  productIdValue: string,
  payload: BuyProductDto,
): Promise<BuyProductResult> => {
  const productId = toPositiveInteger(productIdValue, "Product id");
  const userId = toPositiveInteger(payload.userId, "User id");
  const quantity = payload.quantity == null ? 1 : toPositiveInteger(payload.quantity, "Quantity");
  const productVariantId = payload.productVariantId == null
    ? null
    : toPositiveInteger(payload.productVariantId, "Product variant id");
  const addressId = payload.addressId == null ? null : toPositiveInteger(payload.addressId, "Address id");

  const product = await findProductById(productId);
  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  const variant = productVariantId == null
    ? null
    : await findProductVariantById(productId, productVariantId);

  if (productVariantId != null && !variant) {
    throw new AppError("Product variant not found.", 404);
  }

  const availableQuantity = await findAvailableStock(productId, productVariantId);
  if (availableQuantity < quantity) {
    throw new AppError("Not enough stock is available for this product.", 409);
  }

  const orderId = await createProductOrder({
    userId,
    product,
    variant,
    quantity,
    addressId,
  });
  const unitPrice = Number(variant?.price ?? product.basePrice);

  return {
    orderId,
    productId,
    productVariantId,
    quantity,
    totalAmount: unitPrice * quantity,
  };
};

export const addProductToFavorites = async (
  productIdValue: string,
  payload: FavoriteProductDto,
): Promise<void> => {
  const productId = toPositiveInteger(productIdValue, "Product id");
  const userId = toPositiveInteger(payload.userId, "User id");
  const product = await findProductById(productId);

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  await addFavoriteProduct(userId, productId);
};

export const removeProductFromFavorites = async (
  productIdValue: string,
  payload: FavoriteProductDto,
): Promise<void> => {
  const productId = toPositiveInteger(productIdValue, "Product id");
  const userId = toPositiveInteger(payload.userId, "User id");

  await removeFavoriteProduct(userId, productId);
};

export const listFavoriteProducts = async (userIdValue: string): Promise<ProductSummaryDto[]> => {
  const userId = toPositiveInteger(userIdValue, "User id");
  const products = await findFavoriteProducts(userId);

  return products.map(toProductSummary);
=======
  return product;
};

export const createProduct = async (
  payload: CreateProductDto,
  uploadedImageUrl: string | null,
): Promise<ProductMutationResult> => {
  const name = normalizeName(payload.name);
  const basePrice = toPrice(payload.basePrice, "basePrice");
  const categoryId = toOptionalCategoryId(payload.categoryId) ?? null;
  const slug = slugify(payload.slug?.trim() || name);
  const description = payload.description?.trim() || null;
  const imageUrl = uploadedImageUrl || payload.imageUrl?.trim() || null;
  const status = payload.status?.trim() || undefined;

  await assertProductSlugAvailable(slug);
  const productId = await createProductInRepository({
    name,
    slug,
    description,
    basePrice,
    categoryId,
    imageUrl,
    status,
  });

  const item = await getProductDetailFromRepository(String(productId));
  return { id: productId, item };
};

export const updateProduct = async (
  productIdParam: string,
  payload: UpdateProductDto,
  uploadedImageUrl: string | null,
): Promise<ProductMutationResult> => {
  const productId = toPositiveProductId(productIdParam);
  await assertProductExists(productId);

  const updateInput: Parameters<typeof updateProductInRepository>[1] = {};

  if (payload.name !== undefined) {
    updateInput.name = normalizeName(payload.name);
  }

  if (payload.slug !== undefined) {
    const nextSlug = slugify(payload.slug);
    await assertProductSlugAvailable(nextSlug, productId);
    updateInput.slug = nextSlug;
  }

  if (payload.description !== undefined) {
    updateInput.description = payload.description?.trim() || null;
  }

  const basePrice = toOptionalPrice(payload.basePrice);
  if (basePrice !== undefined) {
    updateInput.basePrice = basePrice;
  }

  const categoryId = toOptionalCategoryId(payload.categoryId);
  if (categoryId !== undefined) {
    updateInput.categoryId = categoryId;
  }

  if (payload.imageUrl !== undefined) {
    updateInput.imageUrl = payload.imageUrl?.trim() || null;
  }

  if (uploadedImageUrl) {
    updateInput.imageUrl = uploadedImageUrl;
  }

  if (payload.isActive !== undefined) {
    const normalized = String(payload.isActive).trim().toLowerCase();
    updateInput.isActive = normalized === "true" || normalized === "1";
  }

  if (payload.status !== undefined) {
    updateInput.status = payload.status.trim();
  }

  if (Object.keys(updateInput).length === 0) {
    throw new AppError("No updatable fields were provided.", 400);
  }

  await updateProductInRepository(productId, updateInput);
  const item = await getProductDetailFromRepository(String(productId));

  return { id: productId, item };
};

export const deleteProduct = async (productIdParam: string): Promise<void> => {
  const productId = toPositiveProductId(productIdParam);
  await assertProductExists(productId);
  await softDeleteProductInRepository(productId);
>>>>>>> 691aaadec9880ae159688a8378a773650dc96168
};
