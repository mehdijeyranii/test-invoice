import type { InvoiceFormValue } from "@/types";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type MetaField = {
  label: string;
  name: keyof InvoiceFormValue;
  editable?: boolean;
};

type Props = {
  register: UseFormRegister<InvoiceFormValue>;
  errors: FieldErrors<InvoiceFormValue>;
};

const metaFields: MetaField[] = [
  { label: "شماره فاکتور:", name: "invoiceNumber" },
  { label: "تاریخ ثبت:", name: "invoiceDate" },
  { label: "زمان ثبت:", name: "invoiceTime" },
  { label: "نام خریدار:", name: "customerName", editable: true },
];

const MetaInput: React.FC<Props> = ({ register, errors }) => {
  return (
    <>
      {metaFields.map((field) => (
        <div key={field.name} className="flex items-center gap-4">
          <label className="font-bold">{field.label}</label>
          <div className="relative flex-2/3">
            <input
              type="text"
              className={`h-10 w-full px-5 text-sm ${
                field.editable ? "text-neutral-600" : "bg-neutral-100 text-neutral-400"
              }`}
              disabled={!field.editable}
              {...register(
                field.name,
                field.editable ? { required: "این فیلد الزامی است" } : {}
              )}
            />
            {field.editable && errors[field.name] && (
              <p className="absolute text-xs text-rose-600">
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default MetaInput;
