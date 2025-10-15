export type Transaction = {
  id: string;
  customerId: string;
  date: string; // ISO
  amount: number;
  currency: string;
  merchant: string;
  category: string;
  paymentMethod: string;
  notes?: string;
};

export type CustomerProfile = {
  customerId: string;
  name: string;
  email: string;
  joinDate: string;
  accountType: string;
  currency: string;
  totalSpent: number;
};
