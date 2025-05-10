import api from "../services/apiService";
import type { Customer } from "../types";

// READ Customers => GET ALL
export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await api.get("/customers");
    return response.data;
  } catch (error) {
    console.error("Error fetching customers", error);
    throw error;
  }
};

// READ Customer => GET ONE
export const getCustomerById = async (id: number): Promise<Customer> => {
  try {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers", error);
    throw error;
  }
};

// CREATE Customer => POST
export const createCustomer = async (
  customerData: Customer
): Promise<Customer> => {
  try {
    const response = await api.post("/customers", customerData);
    return response.data;
  } catch (error) {
    console.error("Error creating customer", error);
    throw error;
  }
};

// UPDATE Customer => PUT
export const updateCustomer = async (
  id: number,
  customerData: Customer
): Promise<Customer> => {
  try {
    const response = await api.put(`/customers/${id}`, customerData);
    return response.data;
  } catch (error) {
    console.error("Error updating customer", error);
    throw error;
  }
};

// DELETE Customer => DELETE
export const deleteCustomer = async (id: number): Promise<void> => {
  try {
    const response = await api.delete(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting customer", error);
    throw error;
  }
};
