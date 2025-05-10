import React, { useRef } from "react";
import { Button } from "./components/ui/button";
import CreateInvoiceForm from "./components/invoice/CreateInvoiceForm";

const App: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };
  return (
    <div className="w-11/12 mx-auto p-5">
      <Button
        variant="outline"
        className="cursor-pointer mb-5"
        type="submit"
        onClick={handleSubmit}
      >
        ذخیره اطلاعات
      </Button>
      <hr />
      <h1 className="p-10 text-center text-4xl font-semibold bg-neutral-100 my-2 rounded-lg">
        فاکتور فروش
      </h1>
      <CreateInvoiceForm formRef={formRef} />
    </div>
  );
};

export default App;
