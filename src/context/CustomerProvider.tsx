import React, { useState } from "react";
import { CustomerContext } from "./CustomerContext";
import type { Customer } from "../types";

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  return (
    <CustomerContext.Provider value={{ selectedCustomer, setSelectedCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
