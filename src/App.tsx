import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import CustomerForm from "./components/CustomerForm";
import ItemForm from "./components/ItemForm";
import toast, { Toaster } from "react-hot-toast";
import { useCustomer } from "./hooks/useCustomer";
import SelectCustomerButton from "./components/SelectCustomerButton";
import InvoiceDetails from "./components/InvoiceDetails";

const App = () => {
  const [showCustomerForm, setShowCustomerForm] = useState<boolean>(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState<
    {
      name: string;
      quantity: number;
      price: number;
      description: string;
    }[]
  >([]);
  const { selectedCustomer } = useCustomer();
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");

  useEffect(() => {
    if (selectedCustomer) {
      const number = `INV-${Date.now()}`;
      setInvoiceNumber(number);

      const today = new Date();
      const faDate = today.toLocaleDateString("fa-IR");
      setInvoiceDate(faDate);
    }
  }, [selectedCustomer]);

  const handleFormSubmit = () => {
    toast.success("مشتری با موفقیت ثبت شد 🎉");
    setShowCustomerForm(false);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-11/12 mx-auto">
        <div className="w-full py-2 flex items-center gap-2 border-b border-neutral-300">
          <button className="text-sm px-4 py-2 bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 cursor-pointer text-neutral-800 rounded-md border border-neutral-400">
            ارسال اطلاعات
          </button>

          <SelectCustomerButton />

          <button
            onClick={() => setShowCustomerForm((prev) => !prev)}
            className="text-sm px-4 py-2 bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 cursor-pointer text-neutral-800 rounded-md border border-neutral-400"
          >
            ثبت مشتری جدید
          </button>
          {showCustomerForm && (
            <Modal
              isOpen={showCustomerForm}
              onClose={() => setShowCustomerForm(false)}
              title="ثبت مشتری جدید"
            >
              <CustomerForm onSuccess={handleFormSubmit} />
            </Modal>
          )}
        </div>
        <div className="mt-2">
          <h1 className="w-full py-14 text-center text-5xl font-bold bg-neutral-100 rounded-xl">
            سیستم فاکتور فروش
          </h1>
          {selectedCustomer?.id !== undefined && (
            <InvoiceDetails customerId={1} />
          )}

          <div className="border-t border-neutral-300 mt-2 py-2">
            <button
              onClick={() => setShowItemModal(true)}
              className="text-sm px-4 py-2 bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 cursor-pointer text-neutral-800 rounded-md border border-neutral-400"
            >
              ثبت فاکتور جدید
            </button>

            {showItemModal && (
              <Modal
                isOpen={showItemModal}
                onClose={() => setShowItemModal(false)}
                title="افزودن کالا به فاکتور"
              >
                <ItemForm
                  onSubmit={(item) => {
                    setInvoiceItems([...invoiceItems, item]);
                    setShowItemModal(false);
                  }}
                />
              </Modal>
            )}

            <table className="w-full border-separate border-spacing-1 mt-1">
              <thead>
                <tr className="bg-neutral-700 text-neutral-100">
                  <th className="py-3 text-neutral-200 w-2/12">نام کالا</th>
                  <th className="py-3 text-neutral-200 w-1/12">تعداد</th>
                  <th className="py-3 text-neutral-200 w-2/12">فی (مبلغ)</th>
                  <th className="py-3 text-neutral-200 w-5/12">شرح</th>
                  <th className="py-3 text-neutral-200 w-2/12">عملیات</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-neutral-400 text-sm">
                    ماشین
                  </td>
                  <td className="p-2 text-center border border-neutral-400 text-sm">
                    10
                  </td>
                  <td className="p-2 text-center border border-neutral-400 text-sm">
                    15/000/000
                  </td>
                  <td className="p-2 border border-neutral-400 text-sm">
                    توضیحات
                  </td>
                  <td className="p-2 text-center border border-neutral-400 text-sm flex items-center justify-center gap-2">
                    <button className="text-xs font-bold text-white px-4 py-2 bg-lime-600 hover:bg-lime-800 transition-all duration-200 cursor-pointer rounded-md">
                      <span>ویرایش</span>
                    </button>
                    <button className="text-xs font-bold px-4 py-2 bg-rose-600 hover:bg-rose-800 transition-all duration-200 cursor-pointer text-white rounded-md ">
                      حذف
                    </button>
                  </td>
                </tr>
                <tr className="bg-neutral-100 hover:bg-neutral-200/70 transition-all duration-300">
                  <td className="p-3 border font-bold text-base" colSpan={4}>
                    قیمت کل
                  </td>
                  <td className="p-3 text-center border font-bold text-base">
                    14500000 تومان
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
