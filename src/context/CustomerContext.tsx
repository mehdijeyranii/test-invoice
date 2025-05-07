import { createContext } from "react";
import type { Customer } from "../types";

export type CustomerContextType = {
  selectedCustomer: Customer | null;
  setSelectedCustomer: (customer: Customer) => void;
};

export const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);
