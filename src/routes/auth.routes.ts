import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";
import { requireAuth } from "../core/guards";
import { asyncHandler } from "../core/utils";
import { AuthRepository } from "../repositories/auth.repository";
import { AuthService } from "../services/auth.service";

const router = Router();
const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.get("/me", requireAuth, asyncHandler(authController.me));

export default router;
