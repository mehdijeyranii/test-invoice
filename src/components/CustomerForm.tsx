import { useForm } from "react-hook-form";
import type { Customer } from "../types";
import { createCustomer } from "../api/customers";
import toast from "react-hot-toast";

type CustomerFormData = Omit<Customer, "id">;

type Props = {
  onSuccess: () => void;
};

const CustomerForm = ({ onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormData>();

  const onSubmit = async (data: CustomerFormData) => {
    try {
      await createCustomer(data);
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div>
        <input
          type="text"
          {...register("fullName", { required: "وارد کردن نام الزامی است" })}
          className={`w-full text-sm p-4 border border-neutral-300 rounded-md ${
            errors.fullName &&
            "outline-rose-600 bg-rose-600/10 border-rose-600 text-rose-600"
          }`}
          placeholder="نام‌ونام‌خانوادگی"
        />
        {errors.fullName && (
          <p className="text-rose-600 text-xs font-light mt-1">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="email"
          {...register("email", {
            required: "وارد کردن ایمیل الزامی است",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "فرمت ایمیل معتبر نیست",
            },
          })}
          className={`w-full text-sm p-4 border border-neutral-300 rounded-md ${
            errors.email &&
            "outline-rose-600 bg-rose-600/10 border-rose-600 text-rose-600"
          }`}
          placeholder="آدرس‌الکترونیکی"
        />
        {errors.email && (
          <p className="text-rose-600 text-xs font-light mt-1">
            {errors.email.message}
          </p>
        )}
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
