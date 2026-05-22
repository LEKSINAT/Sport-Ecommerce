export type PaymentMethod = "cash_on_delivery" | "credit_card" | "paypal" | "bank_transfer";

export interface CreatePaymentDto {
  orderId: number;
  paymentMethod: PaymentMethod;
  amount: number;
}
