export type PaymentGatewayStatus = "pending" | "paid" | "failed";

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: PaymentGatewayStatus;
}

export interface IPaymentGateway {
  createPaymentIntent(input: {
    amount: number;
    currency: string;
    orderId: string;
  }): Promise<PaymentIntent>;
  verifyPayment(reference: string): Promise<PaymentIntent>;
}
