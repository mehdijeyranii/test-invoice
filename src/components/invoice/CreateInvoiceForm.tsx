import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import DueDatePicker from "./DueDatePicker";
import InvoiceDescription from "./InvoiceDescription";
import PaymentStatusDropdown from "./PaymentStatusDropdown";
import InvoiceMetaSection from "./InvoiceMetaSection";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import Modal from "../Modal";

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
  // const [items, setItems] = useState<InvoiceItem[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [newItem, setNewItem] = useState<InvoiceItem>({
    productName: "",
    quantity: 1,
    unitPrice: 10000,
    description: "",
  });

  const form = useForm<InvoiceFormValue>({
    defaultValues: {
      invoiceNumber: Date.now(),
      invoiceDate: new Date().toLocaleDateString("fa-IR"),
      invoiceTime: new Date().toLocaleTimeString("fa-IR", { hour12: false }),
      paymentStatus: "unpaid",
      items: [],
    },
  });

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: InvoiceFormValue) => {
    toast.success("فاکتور جدید با موفقیت ثبت شد!");
    console.log(data);
  };

  const handleDueDate = (date: Date) => {
    setValues(date);
    setValue("dueDate", date?.toString() || "");
  };

  const handleAddItem = () => {
    append(newItem);

    setNewItem({
      productName: "",
      quantity: 1,
      unitPrice: 10000,
      description: "",
    });

    toast.success("کالا با موفقیت ثبت شد!");
  };

  const handleRemoveItem = (index: number) => {
    remove(index);

    toast.success("آیتم با موفقیت حذف شد!");
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
        <div className="flex flex-col gap-8 items-start">
          <Button
            type="button"
            onClick={() => setIsOpenModal((prev) => !prev)}
            className="bg-rose-500 cursor-pointer"
          >
            افزودن کالا
          </Button>
          <Modal
            title="افزودن کالا"
            isOpen={isOpenModal}
            onClose={() => setIsOpenModal(false)}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (!newItem.productName.trim()) {
                  toast.error("نام کالا الزامی است!");
                  return;
                }

                append(newItem);
                setNewItem({
                  productName: "",
                  quantity: 1,
                  unitPrice: 10000,
                  description: "",
                });
                console.log("reset newItem", newItem);

                setIsOpenModal(false);
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                placeholder="نام کالا"
                value={newItem.productName}
                onChange={(e) =>
                  setNewItem({ ...newItem, productName: e.target.value })
                }
                className="border p-2"
                required
              />
              <input
                type="number"
                placeholder="تعداد"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({ ...newItem, quantity: +e.target.value })
                }
                className="border p-2"
                min={1}
              />
              <input
                type="number"
                placeholder="قیمت واحد"
                value={newItem.unitPrice}
                onChange={(e) =>
                  setNewItem({ ...newItem, unitPrice: +e.target.value })
                }
                className="border p-2"
                min={0}
              />
              <textarea
                placeholder="توضیحات"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                className="border p-2"
              />

              <Button
                type="button"
                onClick={handleAddItem}
                className="bg-green-600"
              >
                افزودن به لیست
              </Button>
            </form>
          </Modal>

          <table className="w-full border-separate">
            <thead className="bg-neutral-800 text-white">
              <tr>
                <th className="p-5 w-3/12">نام کالا</th>
                <th className="p-5 w-1/12">تعداد</th>
                <th className="p-5 w-1/12">قیمت</th>
                <th className="p-5 w-5/12">توضیحات</th>
                <th className="p-5 w-2/12">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={index} className="bg-neutral-100 hover:bg-neutral-200">
                  <td className="p-4">{field.productName}</td>
                  <td className="p-4">{field.quantity}</td>
                  <td className="p-4">{field.unitPrice}</td>
                  <td className="p-4">{field.description}</td>
                  <td className="p-4 flex gap-2 justify-center">
                    <Button size="sm">ویرایش</Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => handleRemoveItem(index)}
                    >
                      حذف
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default CreateInvoiceForm;
