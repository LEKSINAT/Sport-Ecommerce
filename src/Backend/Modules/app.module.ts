import type { Express } from "express";

import { registerAuthModule } from "./auth.module";
import { registerCategoryModule } from "./category.module";
import { registerCatalogModule } from "./catalog.module";
import { registerUserModule } from "./user.module";

export const registerModules = (app: Express): void => {
  registerAuthModule(app);
  registerCategoryModule(app);
  registerCatalogModule(app);
  registerUserModule(app);
};

