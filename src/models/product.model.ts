export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
