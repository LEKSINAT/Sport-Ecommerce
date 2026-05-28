import { Request, Response } from "express";

import { asyncHandler } from "../Core/utils";
<<<<<<< HEAD
import type {
  AdminCreateProductDto,
  AdminUpdateProductDto,
  BuyProductDto,
  FavoriteProductDto,
  ProductListQueryDto,
} from "../dto/catalog";
import {
  addProductToFavorites,
  addAdminProduct,
  buyProduct,
  editAdminProduct,
  getAdminProductDetails,
  getProductDetails,
  listFavoriteProducts,
  listAdminProducts,
  listProducts,
  removeAdminProduct,
  removeProductFromFavorites,
} from "../Services/catalog.service";

interface ProductParams {
  productId: string;
}

interface UserParams {
  userId: string;
}

export const getProducts = asyncHandler<
  never,
  unknown,
  never,
  ProductListQueryDto
>(async (req: Request<never, unknown, never, ProductListQueryDto>, res: Response) => {
  const products = await listProducts(req.query);
  res.status(200).json({ products });
});

export const getAdminProducts = asyncHandler<
  never,
  unknown,
  never,
  ProductListQueryDto
>(async (req: Request<never, unknown, never, ProductListQueryDto>, res: Response) => {
  const products = await listAdminProducts(req.query);
  res.status(200).json({ products });
});

export const getProduct = asyncHandler<ProductParams>(async (req, res) => {
  const product = await getProductDetails(req.params.productId);
  res.status(200).json({ product });
});

export const getAdminProduct = asyncHandler<ProductParams>(async (req, res) => {
  const product = await getAdminProductDetails(req.params.productId);
  res.status(200).json({ product });
});

export const createAdminProduct = asyncHandler<never, unknown, AdminCreateProductDto>(
  async (req: Request<never, unknown, AdminCreateProductDto>, res: Response) => {
    const product = await addAdminProduct(req.body);
    res.status(201).json({
      message: "Product created successfully.",
      product,
=======
import type { CreateProductDto, ProductListQueryDto, UpdateProductDto } from "../dto/catalog";
import {
  createProduct,
  deleteProduct,
  getProductDetail,
  getProductList,
  updateProduct,
} from "../Services/catalog.service";

interface ProductDetailParams {
  slugOrId: string;
}

export const listProducts = asyncHandler<never, unknown, never, ProductListQueryDto>(
  async (req: Request<never, unknown, never, ProductListQueryDto>, res: Response) => {
    const result = await getProductList(req.query);
    res.status(200).json(result);
  },
);

export const getProductBySlugOrId = asyncHandler<ProductDetailParams>(
  async (req: Request<ProductDetailParams>, res: Response) => {
    const result = await getProductDetail(req.params.slugOrId);
    res.status(200).json({ item: result });
  },
);

export const createProductByAdminOrStaff = asyncHandler<never, unknown, CreateProductDto>(
  async (req: Request<never, unknown, CreateProductDto>, res: Response) => {
    const uploadedImageUrl = req.file ? `/uploads/products/${req.file.filename}` : null;
    const result = await createProduct(req.body, uploadedImageUrl);
    res.status(201).json({
      message: "Product created successfully.",
      ...result,
>>>>>>> 691aaadec9880ae159688a8378a773650dc96168
    });
  },
);

<<<<<<< HEAD
export const updateAdminProduct = asyncHandler<ProductParams, unknown, AdminUpdateProductDto>(
  async (req: Request<ProductParams, unknown, AdminUpdateProductDto>, res: Response) => {
    const product = await editAdminProduct(req.params.productId, req.body);
    res.status(200).json({
      message: "Product updated successfully.",
      product,
=======
export const updateProductByAdminOrStaff = asyncHandler<never, unknown, UpdateProductDto>(
  async (req: Request, res: Response) => {
    const uploadedImageUrl = req.file ? `/uploads/products/${req.file.filename}` : null;
    const result = await updateProduct(String(req.params.id ?? ""), req.body, uploadedImageUrl);
    res.status(200).json({
      message: "Product updated successfully.",
      ...result,
>>>>>>> 691aaadec9880ae159688a8378a773650dc96168
    });
  },
);

<<<<<<< HEAD
export const deleteAdminProduct = asyncHandler<ProductParams>(async (req, res) => {
  await removeAdminProduct(req.params.productId);
  res.status(200).json({ message: "Product deleted successfully." });
});

export const createProductPurchase = asyncHandler<ProductParams, unknown, BuyProductDto>(
  async (req: Request<ProductParams, unknown, BuyProductDto>, res: Response) => {
    const order = await buyProduct(req.params.productId, req.body);
    res.status(201).json({
      message: "Product purchased successfully.",
      order,
=======
export const deleteProductByAdminOrStaff = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteProduct(String(req.params.id ?? ""));
    res.status(200).json({
      message: "Product deleted successfully.",
>>>>>>> 691aaadec9880ae159688a8378a773650dc96168
    });
  },
);

<<<<<<< HEAD
export const createFavoriteProduct = asyncHandler<ProductParams, unknown, FavoriteProductDto>(
  async (req: Request<ProductParams, unknown, FavoriteProductDto>, res: Response) => {
    await addProductToFavorites(req.params.productId, req.body);
    res.status(201).json({ message: "Product added to favorites." });
  },
);

export const deleteFavoriteProduct = asyncHandler<ProductParams, unknown, FavoriteProductDto>(
  async (req: Request<ProductParams, unknown, FavoriteProductDto>, res: Response) => {
    await removeProductFromFavorites(req.params.productId, req.body);
    res.status(200).json({ message: "Product removed from favorites." });
  },
);

export const getFavoriteProducts = asyncHandler<UserParams>(async (req, res) => {
  const products = await listFavoriteProducts(req.params.userId);
  res.status(200).json({ products });
});
=======
export const searchProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const q = (req.query.q ?? "").toString();
    const result = await getProductList({
      page: (req.query.page ?? "1").toString(),
      limit: (req.query.limit ?? "12").toString(),
      search: q || undefined,
      category: req.query.category?.toString() ?? undefined,
      minPrice: req.query.minPrice?.toString() ?? undefined,
      maxPrice: req.query.maxPrice?.toString() ?? undefined,
      sort: req.query.sort?.toString() ?? undefined,
    } as ProductListQueryDto);

    res.status(200).json(result);
  },
);

export const getProductByCategory = asyncHandler(
  async (req: Request<{ categoryId: string }>, res: Response) => {
    const categoryId = String(req.params.categoryId ?? "");
    const result = await getProductList({
      page: (req.query.page ?? "1").toString(),
      limit: (req.query.limit ?? "12").toString(),
      search: req.query.q?.toString() ?? undefined,
      category: categoryId,
      minPrice: req.query.minPrice?.toString() ?? undefined,
      maxPrice: req.query.maxPrice?.toString() ?? undefined,
      sort: req.query.sort?.toString() ?? undefined,
    } as ProductListQueryDto);

    res.status(200).json(result);
  },
);

>>>>>>> 691aaadec9880ae159688a8378a773650dc96168
