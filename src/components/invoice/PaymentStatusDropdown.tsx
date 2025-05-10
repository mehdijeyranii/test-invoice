import {
  paymentStatusLabels,
  paymentStatusList,
} from "@/constants/paymentStatusList";
import type { InvoiceFormValue, PaymentStatus } from "@/types";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import type { UseFormSetValue } from "react-hook-form";

interface Props {
  setValue: UseFormSetValue<InvoiceFormValue>;
}

const PaymentStatusDropdown: React.FC<Props> = ({ setValue }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedPaymentStatus, setSelectedPaymentStatus] =
    useState<PaymentStatus>("unpaid");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSelectOption = (status: PaymentStatus) => {
    setSelectedPaymentStatus(status);
    setValue("paymentStatus", status);
    setIsDropdownOpen(false);
  };

  const getStatusLabel = (status: PaymentStatus) => paymentStatusLabels[status];

  return (
    <>
      <div className="inline-flex items-center gap-4 z-40">
        <label htmlFor="paymentStatus" className="font-bold">
          وضعیت پرداخت:
        </label>
        <div
          ref={dropdownRef}
          className="h-10 flex-2/3 border p-2 px-5 w-full cursor-pointer flex items-center justify-between relative text-sm"
          onClick={toggleDropdown}
        >
          <span>{getStatusLabel(selectedPaymentStatus)}</span>
          <ChevronDown size={16} />
          {isDropdownOpen && (
            <div
              className="absolute top-10 left-0 w-full bg-white border mt-2"
              onClick={handleDropdownClick}
            >
              {paymentStatusList.map((list) => (
                <button
                  key={list.value}
                  className="w-full text-right block p-2 px-5 cursor-pointer hover:bg-neutral-200 transition-all duration-200"
                  onClick={() => handleSelectOption(list.value)}
                >
                  {list.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentStatusDropdown;
