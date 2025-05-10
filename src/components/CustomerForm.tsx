import { useForm } from "react-hook-form";
import type { Customer } from "../types";
import { createCustomer } from "../api/customers";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

type Props = {
  onSuccess: () => void;
};

const CustomerForm = ({ onSuccess }: Props) => {
  const form = useForm<Customer>();
  const { register, handleSubmit, reset } = form;

  const onSubmit = async (data: Customer) => {
    try {
      const customerWithId = {
        ...data,
        id: uuidv4(),
      };
      await createCustomer(customerWithId);
      toast.success("مشتری با موفقیت ثبت شد");
      reset();
      onSuccess?.();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "خطا، متاسفانه عملیات با شکست مواجه شد");
      } else {
        toast.error(
          "خطا، متاسفانه عملیات با شکست مواجه شد، لطفا دوباره تلاش کنید"
        );
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="relative">
        <input
          type="text"
          {...register("fullName", {
            required: "لطفا نام و نام خانوادگی خود را وارد نمایید",
          })}
          placeholder="نام‌ونام‌خانوادگی"
        />
      </div>

      <div className="relative mb-8">
        <input
          type="email"
          dir="ltr"
          {...register("email", { required: "لطفا ایمیل خود را وارد نمایید" })}
          placeholder="آدرس‌الکترونیکی"
        />
      </div>

      <div>
        <input
          type="text"
          {...register("phone")}
          className="w-full text-sm p-4  border border-neutral-300 rounded-md"
          placeholder="شماره‌تلفن"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer block mr-auto"
      >
        ثبت مشتری
      </button>
    </form>
  );
};

export default CustomerForm;
