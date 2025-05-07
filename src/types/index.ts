export interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
}

export interface Invoice {
  id: number;
  customerId: number;
  invoiceNumber: string;
  invoiceDate: string;
  description?: string;
}

export interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  description?: string;
  invoiceId: number;
}

export type CustomerInput = Omit<Customer, "id">;
export type InvoiceInput = Omit<Invoice, "id">;
export type InvoiceItemInput = Omit<InvoiceItem, "id">;
