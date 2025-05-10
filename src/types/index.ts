export type PaymentStatus = "paid" | "unpaid" | "pending";

export type InvoiceItem = {
  productName: string;
  quantity: number;
  unitPrice: number;
  description?: string;
};

export interface InvoiceFormValue {
  customerName: string;
  invoiceNumber: number;
  invoiceDate: string;
  invoiceTime: string;
  paymentStatus: PaymentStatus;
  dueDate: string;
  items: InvoiceItem[];
  description?: string;
}
