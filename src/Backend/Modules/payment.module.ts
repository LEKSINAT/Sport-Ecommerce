import { Router } from "express";

import { PaymentController } from "../Controllers/payment.controller";
import { PaymentRepository } from "../Repositories/payment.repository";
import { createPaymentRouter } from "../Routes/payment.routes";
import { PaymentService } from "../Services/payment.service";

export const createPaymentModule = (): Router => {
  const paymentRepository = new PaymentRepository();
  const paymentService = new PaymentService(paymentRepository);
  const paymentController = new PaymentController(paymentService);

  return createPaymentRouter(paymentController);
};
