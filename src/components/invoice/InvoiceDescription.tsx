import type { InvoiceFormValue } from "@/types";
import type { UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<InvoiceFormValue>;
};

const InvoiceDescription: React.FC<Props> = ({ register }) => {
  return (
    <div className="flex gap-2">
      <label htmlFor="description" className="font-bold">
        توضیحات:
      </label>
      <textarea
        rows={4}
        className="text-neutral-600 w-full p-5 text-sm border resize-none"
        {...register("description")}
      />
    </div>
  );
};

export default InvoiceDescription;
