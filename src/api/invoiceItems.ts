import api from "../services/apiService";
import type { InvoiceItem, InvoiceItemInput } from "../types";

// READ Invoice Items => GET ALL
export const getInvoiceItems = async (): Promise<InvoiceItem[]> => {
  try {
    const response = await api.get("/invoiceItems");
    return response.data;
  } catch (error) {
    console.error("Error fetching invoice items", error);
    throw error;
  }
};

// READ Invoice Item => GET ONE
export const getInvoiceItemById = async (id: number): Promise<InvoiceItem> => {
  try {
    const response = await api.get(`/invoiceItems/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoice items", error);
    throw error;
  }
};

// CREATE Invoice Item => POST
export const createInvoiceItem = async (
  invoiceItemData: InvoiceItemInput
): Promise<InvoiceItem> => {
  try {
    const response = await api.post("/invoiceItems", invoiceItemData);
    return response.data;
  } catch (error) {
    console.error("Error creating invoice item", error);
    throw error;
  }
};

// UPDATE Invoice Item => PUT
export const updateInvoiceItem = async (
  id: number,
  invoiceItemData: InvoiceItemInput
): Promise<InvoiceItem> => {
  try {
    const response = await api.put(`/invoiceItems/${id}`, invoiceItemData);
    return response.data;
  } catch (error) {
    console.error("Error updating invoice item", error);
    throw error;
  }
};

// DELETE Invoice Item => DELETE
export const deleteInvoiceItem = async (id: number): Promise<void> => {
  try {
    const response = await api.delete(`/invoiceItems/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting invoice item", error);
    throw error;
  }
};
