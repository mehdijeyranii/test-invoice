import React from "react";
import Modal from "./Modal";
import type { Customer } from "../types";

type CustomerSelectModalProps = {
  isOpen: boolean;
  customers: Customer[];
  onSelect: (customer: Customer) => void;
  onClose: () => void;
};

const CustomerSelect: React.FC<CustomerSelectModalProps> = ({
  isOpen,
  customers,
  onSelect,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="انتخاب مشتری">
      <select
        className="w-full px-4 py-2 border border-neutral-400 rounded-md"
        onChange={(e) => {
          const selectedId = parseInt(e.target.value);
          const selected = customers.find((c) => c.id === selectedId);
          if (selected) onSelect(selected);
        }}
      >
        <option value="">لطفا یک مشتری را انتخاب کنید</option>
        {customers.map((customer, index) => (
          <option key={index} value={customer.id}>
            {customer.fullName} - {customer.email}
          </option>
        ))}
      </select>
      <div className="flex justify-between mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          بستن
        </button>
      </div>
    </Modal>
  );
};

export default CustomerSelect;
