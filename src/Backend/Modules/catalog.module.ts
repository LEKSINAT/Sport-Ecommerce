import type { Express } from "express";

import catalogRouter from "../Routes/catalog.route";

export const registerCatalogModule = (app: Express): void => {
<<<<<<< HEAD
  app.use("/api", catalogRouter);
=======
  app.use("/api/products", catalogRouter);
>>>>>>> 691aaadec9880ae159688a8378a773650dc96168
};
