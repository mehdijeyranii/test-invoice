import { useForm } from "react-hook-form";

type ItemFormData = {
  name: string;
  quantity: number;
  price: number;
  description: string;
};

type Props = {
  onSubmit: (item: ItemFormData) => void;
};

const ItemForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemFormData>();

  const onSubmitHandler = (data: ItemFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-2">
      <div>
        <input
          className="w-full p-2 border rounded"
          placeholder="نام کالا"
          {...register("name", { required: "نام کالا الزامی است" })}
        />
        {errors.name && (
          <p className="text-rose-500 text-xs">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          className="w-full p-2 border rounded"
          type="number"
          placeholder="تعداد"
          {...register("quantity", {
            required: "تعداد الزامی است",
            min: { value: 1, message: "تعداد باید حداقل 1 باشد" },
          })}
        />
        {errors.quantity && (
          <p className="text-rose-500 text-xs">{errors.quantity.message}</p>
        )}
      </div>

      <div>
        <input
          className="w-full p-2 border rounded"
          type="number"
          placeholder="قیمت"
          {...register("price", {
            required: "قیمت الزامی است",
            min: { value: 10000, message: "قیمت باید حداقل 10000 باشد" },
          })}
        />
        {errors.price && (
          <p className="text-rose-500 text-xs">{errors.price.message}</p>
        )}
      </div>

      <div>
        <input
          className="w-full p-2 border rounded"
          placeholder="توضیحات"
          {...register("description")}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        افزودن
      </button>
    </form>
  );
};

export default ItemForm;
