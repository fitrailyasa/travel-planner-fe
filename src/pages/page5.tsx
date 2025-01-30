import { useForm } from "react-hook-form";
import { Input, Button } from "@heroui/react";

type Page5FormInputs = {
  data1: string;
  data2: string;
};

const Page5 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Page5FormInputs>();

  /* eslint-disable no-console */
  const onSubmit = (data: Page5FormInputs) => {
    console.log("Page5 Data:", data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Page 5</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            label="Data 1"
            type="text"
            variant="bordered"
            {...register("data1", { required: "data1 wajib diisi" })}
          />
          {errors.data1 && (
            <p className="text-red-500 text-sm">{errors.data1.message}</p>
          )}
        </div>
        <div>
          <Input
            label="Data 2"
            type="text"
            variant="bordered"
            {...register("data2", { required: "data2 wajib diisi" })}
          />
          {errors.data2 && (
            <p className="text-red-500 text-sm">{errors.data2.message}</p>
          )}
        </div>
        <Button
          className="w-3/4 fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full max-w-[700px]"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Page5;
