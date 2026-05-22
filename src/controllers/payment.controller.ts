import { Request, Response } from "express";

import { createApiResponse } from "../core/interceptors";
import { CreatePaymentDto } from "../dto/payment";
import { PaymentService } from "../services/payment.service";

export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  create = async (req: Request<unknown, unknown, CreatePaymentDto>, res: Response) => {
    const result = await this.paymentService.createPayment(req.body);
    res.status(201).json(createApiResponse(result));
  };

  verify = async (req: Request<{ reference: string }>, res: Response) => {
    const result = await this.paymentService.verifyPayment(req.params.reference);
    res.json(createApiResponse(result));
  };
}
