import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DueDatePicker from "./DueDatePicker";
import InvoiceDescription from "./InvoiceDescription";
import PaymentStatusDropdown from "./PaymentStatusDropdown";
import InvoiceMetaSection from "./InvoiceMetaSection";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

type PaymentStatus = "paid" | "unpaid" | "pending";

type InvoiceItem = {
  productName: string;
  quantity: number;
  unitPrice: number;
  description?: string;
};

interface InvoiceFormValue {
  customerName: string;
  invoiceNumber: number;
  invoiceDate: string;
  invoiceTime: string;
  paymentStatus: PaymentStatus;
  dueDate: string;
  items: InvoiceItem[];
  description?: string;
}

interface CreateInvoiceFormProps {
  formRef?: React.RefObject<HTMLFormElement | null>;
}

const CreateInvoiceForm: React.FC<CreateInvoiceFormProps> = ({ formRef }) => {
  const [values, setValues] = useState<Date | null>(new Date());

  const form = useForm<InvoiceFormValue>({
    defaultValues: {
      invoiceNumber: Date.now(),
      invoiceDate: new Date().toLocaleDateString("fa-IR"),
      invoiceTime: new Date().toLocaleTimeString("fa-IR", { hour12: false }),
      paymentStatus: "unpaid",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const onSubmit = (data: InvoiceFormValue) => {
    toast.success("فاکتور جدید با موفقیت ثبت شد!")
    console.log(data);
  };

  const handleDueDate = (date: Date) => {
    setValues(date);
    setValue("dueDate", date?.toString() || "");
  };

  return (
    <div className="space-y-8">
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full border p-5 flex flex-col gap-8"
      >
        <div className="flex flex-col gap-8">
          <div className=" grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-4">
            <InvoiceMetaSection register={register} errors={errors} />
            <PaymentStatusDropdown setValue={setValue} />
            <DueDatePicker onChange={handleDueDate} values={values} />
          </div>
          <hr />
          <InvoiceDescription register={register} />
        </div>
        <hr />
        <div className="h-40 bg-neutral-300">
          <Button className="bg-rose-500 cursor-pointer">
            افزودن کالا
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateInvoiceForm;
