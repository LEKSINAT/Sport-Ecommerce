import { Router } from "express";

import { PaymentController } from "../controllers/payment.controller";
import { asyncHandler } from "../core/utils";
import { PaymentRepository } from "../repositories/payment.repository";
import { PaymentService } from "../services/payment.service";

const router = Router();
const paymentRepository = new PaymentRepository();
const paymentService = new PaymentService(paymentRepository);
const paymentController = new PaymentController(paymentService);

router.post("/", asyncHandler(paymentController.create));
router.get("/:reference", asyncHandler(paymentController.verify));

export default router;
