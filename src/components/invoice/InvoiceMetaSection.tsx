// components/invoice/InvoiceMetaSection.tsx
import type { InvoiceFormValue } from "@/types";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import MetaInput from "../form/MetaInput";

type Props = {
  register: UseFormRegister<InvoiceFormValue>;
  errors: FieldErrors<InvoiceFormValue>;
};

const InvoiceMetaSection: React.FC<Props> = ({ register, errors }) => {
  return (
    <>
      <MetaInput register={register} errors={errors} />
    </>
  );
};

export default InvoiceMetaSection;
