import React, { useEffect, useState } from "react";
import { getCustomers } from "../api/customers";
import type { Customer } from "../types";
import CustomerSelect from "./CustomerSelect";
import { useCustomer } from "../hooks/useCustomer";

const SelectCustomerButton: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setSelectedCustomer } = useCustomer();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customer = await getCustomers();
        setCustomers(customer);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-sm px-4 py-2 bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 cursor-pointer text-neutral-800 rounded-md border border-neutral-400"
      >
        انتخاب مشتری
      </button>

      <CustomerSelect
        isOpen={isModalOpen}
        customers={customers}
        onSelect={handleSelectCustomer}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SelectCustomerButton;
