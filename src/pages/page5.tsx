import { useForm } from "react-hook-form";
import { Button } from "@heroui/react";

type Page5FormInputs = {
  data1: string;
  data2: string;
};

const Page5 = () => {
  const {
    handleSubmit,
    formState: {},
  } = useForm<Page5FormInputs>();

  /* eslint-disable no-console */
  const onSubmit = (data: Page5FormInputs) => {
    console.log("Page5 Data:", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-3/4 mx-auto max-w-[700px] md:px-6 lg:px-8 mb-20">
          <h1 className="text-2xl font-bold mb-4">Page 5</h1>
          <p className="mb-5">Ini adalah halaman 5.</p>
        </div>
        <div className="w-full fixed bottom-0 bg-white dark:bg-black shadow-lg py-4 flex justify-center">
          <Button
            className="w-3/4 fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full max-w-[700px]"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default Page5;
