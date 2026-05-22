import { randomUUID } from "node:crypto";

import { AppError } from "../core/errors";
import { CreatePaymentDto } from "../dto/payment";
import {
  IPaymentGateway,
  PaymentIntent,
} from "../interfaces/IPaymentGateway.interface";
import { PaymentRepository } from "../repositories/payment.repository";

class MockPaymentGateway implements IPaymentGateway {
  async createPaymentIntent(input: {
    amount: number;
    currency: string;
    orderId: string;
  }): Promise<PaymentIntent> {
    return {
      id: `pay_${randomUUID()}`,
      amount: input.amount,
      currency: input.currency,
      status: "pending",
    };
  }

  async verifyPayment(reference: string): Promise<PaymentIntent> {
    return {
      id: reference,
      amount: 0,
      currency: "USD",
      status: "paid",
    };
  }
}

export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentGateway: IPaymentGateway = new MockPaymentGateway(),
  ) {}

  async createPayment(dto: CreatePaymentDto) {
    if (dto.amount <= 0) {
      throw new AppError("Payment amount must be greater than zero.");
    }

    const intent = await this.paymentGateway.createPaymentIntent({
      orderId: dto.orderId,
      amount: dto.amount,
      currency: dto.currency,
    });

    return this.paymentRepository.create({
      orderId: dto.orderId,
      amount: dto.amount,
      currency: dto.currency,
      provider: dto.provider ?? "mock-gateway",
      reference: intent.id,
      status: intent.status,
    });
  }

  async verifyPayment(reference: string) {
    const payment = await this.paymentRepository.findByReference(reference);

    if (!payment) {
      throw new AppError("Payment not found.", 404);
    }

    const verification = await this.paymentGateway.verifyPayment(reference);
    return this.paymentRepository.updateStatus(reference, verification.status);
  }
}
