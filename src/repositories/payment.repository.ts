import { randomUUID } from "node:crypto";

export type PaymentStatus = "pending" | "paid" | "failed";

export interface PaymentRecord {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  provider: string;
  reference: string;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class PaymentRepository {
  private readonly payments: PaymentRecord[] = [];

  async create(input: Omit<PaymentRecord, "id" | "createdAt" | "updatedAt">): Promise<PaymentRecord> {
    const payment: PaymentRecord = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...input,
    };

    this.payments.push(payment);
    return payment;
  }

  async findByReference(reference: string): Promise<PaymentRecord | null> {
    return this.payments.find((payment) => payment.reference === reference) ?? null;
  }

  async updateStatus(reference: string, status: PaymentStatus): Promise<PaymentRecord | null> {
    const payment = await this.findByReference(reference);

    if (!payment) {
      return null;
    }

    payment.status = status;
    payment.updatedAt = new Date();
    return payment;
  }
}
