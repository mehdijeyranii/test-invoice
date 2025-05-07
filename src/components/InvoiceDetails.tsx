import { useEffect, useState } from "react";
import type { Customer, Invoice } from "../types";
import { getInvoiceById } from "../api/invoices";
import { getCustomerById } from "../api/customers";

type InvoiceDetailsProps = {
  customerId: number;
};

const InvoiceDetails = ({ customerId }: InvoiceDetailsProps) => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoiceData = await getInvoiceById(customerId);
        setInvoice(invoiceData);

        const customerData = await getCustomerById(invoiceData.customerId);
        setCustomer(customerData);
      } catch (err) {
        console.error("Error fetching invoice:", err);
      }
    };

    fetchData();
  }, [customerId, customer]);

  if (!invoice || !customer) return <p>در حال بارگذاری...</p>;

  return (
    <div className="grid grid-cols-2 gap-6 p-4 border border-neutral-300 rounded-xl mt-2">
      <span>
        شماره: <strong>{invoice.invoiceNumber}</strong>
      </span>
      <span>
        تاریخ: <strong>{invoice.invoiceDate}</strong>
      </span>
      <span>
        نام خریدار: <strong>{customer.fullName}</strong>
      </span>
      <span>
        شرح: <strong>{invoice.description}</strong>
      </span>
    </div>
  );
};

export default InvoiceDetails;
