import { Router } from "express";

import { AuthController } from "../Controllers/auth.controller";
import { AuthRepository } from "../Repositories/auth.repository";
import { createAuthRouter } from "../Routes/auth.routes";
import { AuthService } from "../Services/auth.service";

export const createAuthModule = (): Router => {
  const authRepository = new AuthRepository();
  const authService = new AuthService(authRepository);
  const authController = new AuthController(authService);

  return createAuthRouter(authController);
};
