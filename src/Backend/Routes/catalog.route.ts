import { Router } from "express";

import {
<<<<<<< HEAD
  createAdminProduct,
  createFavoriteProduct,
  createProductPurchase,
  deleteAdminProduct,
  getAdminProduct,
  getAdminProducts,
  deleteFavoriteProduct,
  getFavoriteProducts,
  getProduct,
  getProducts,
  updateAdminProduct,
} from "../Controllers/catalog.controller";

const catalogRouter = Router();

catalogRouter.get("/admin/products", getAdminProducts);
catalogRouter.post("/admin/products", createAdminProduct);
catalogRouter.get("/admin/products/:productId", getAdminProduct);
catalogRouter.put("/admin/products/:productId", updateAdminProduct);
catalogRouter.patch("/admin/products/:productId", updateAdminProduct);
catalogRouter.delete("/admin/products/:productId", deleteAdminProduct);
catalogRouter.post("/admin/products/:productId/buy", createProductPurchase);
catalogRouter.post("/admin/products/:productId/favorites", createFavoriteProduct);
catalogRouter.delete("/admin/products/:productId/favorites", deleteFavoriteProduct);
catalogRouter.get("/admin/users/:userId/favorites", getFavoriteProducts);

catalogRouter.get("/products", getProducts);
catalogRouter.get("/products/:productId", getProduct);
catalogRouter.post("/products/:productId/buy", createProductPurchase);
catalogRouter.post("/products/:productId/favorites", createFavoriteProduct);
catalogRouter.delete("/products/:productId/favorites", deleteFavoriteProduct);
catalogRouter.get("/users/:userId/favorites", getFavoriteProducts);
=======
  createProductByAdminOrStaff,
  deleteProductByAdminOrStaff,
  getProductByCategory,
  getProductBySlugOrId,
  listProducts,
  searchProducts,
  updateProductByAdminOrStaff,
} from "../Controllers/catalog.controller";

import { requireAuth, requireRoles } from "../Core/guards";
import { productImageUpload } from "../Core/middleware";

const catalogRouter = Router();

catalogRouter.get("/", listProducts);

// Public reads
catalogRouter.get("/search", searchProducts);
catalogRouter.get("/category/:categoryId", getProductByCategory);
catalogRouter.get("/:slugOrId", getProductBySlugOrId);


// Admin & Staff CRUD
catalogRouter.post(
  "/",
  requireAuth,
  requireRoles("Admin", "Staff"),
  productImageUpload.single("image"),
  createProductByAdminOrStaff,
);
catalogRouter.put(
  "/:id",
  requireAuth,
  requireRoles("Admin", "Staff"),
  productImageUpload.single("image"),
  updateProductByAdminOrStaff,
);
catalogRouter.delete(
  "/:id",
  requireAuth,
  requireRoles("Admin", "Staff"),
  deleteProductByAdminOrStaff,
);

>>>>>>> 691aaadec9880ae159688a8378a773650dc96168

export default catalogRouter;
