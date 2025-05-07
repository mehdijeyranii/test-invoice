import api from "../services/apiService";
import type { Invoice, InvoiceInput } from "../types";

// READ Invoices => GET ALL
export const getInvoices = async (): Promise<Invoice[]> => {
  try {
    const response = await api.get("/invoices");
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices", error);
    throw error;
  }
};

// READ Invoice => GET ONE
export const getInvoiceById = async (id: number): Promise<Invoice> => {
  try {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices");
    throw error;
  }
};

// CREATE Invoice => POST
export const createInvoice = async (
  invoiceData: InvoiceInput
): Promise<Invoice> => {
  try {
    const response = await api.post("/invoices", invoiceData);
    return response.data;
  } catch (error) {
    console.error("Error creating invoice", error);
    throw error;
  }
};

// UPDATE Invoice => PUT
export const updateInvoice = async (
  id: number,
  invoiceData: InvoiceInput
): Promise<Invoice> => {
  try {
    const response = await api.put(`/invoices/${id}`, invoiceData);
    return response.data;
  } catch (error) {
    console.error("Error updating invoice", error);
    throw error;
  }
};

// DELETE Invoice => DELETE
export const deleteInvoice = async (id: number): Promise<void> => {
  try {
    const response = await api.delete(`/invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting invoice", error);
    throw error;
  }
};
