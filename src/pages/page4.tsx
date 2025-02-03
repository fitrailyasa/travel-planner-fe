import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Button,
  RadioGroup,
  useRadio,
  VisuallyHidden,
  cn,
} from "@heroui/react";

interface Page4Props {
  setStep: (step: number) => void;
}

export const CustomRadio = (props: any) => {
  const {
    Component,
    children,
    description,
    getBaseProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
        "max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-success",
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">
            {description}
          </span>
        )}
      </div>
    </Component>
  );
};

const Page4: React.FC<Page4Props> = ({ setStep }) => {
  const navigate = useNavigate();
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      page_4: localStorage.getItem("page_4") || "",
    },
  });

  const selectedValue = watch("page_4");

  useEffect(() => {
    const savedValue = localStorage.getItem("page_4");

    if (savedValue) {
      setValue("page_4", savedValue);
    }
  }, [setValue]);

  const radioOptions = [
    {
      id: "data1",
      budget: 100000,
    },
    {
      id: "data2",
      budget: 1000000,
    },
    {
      id: "data3",
      budget: 10000000,
    },
    {
      id: "data4",
      budget: 100000000,
    },
    {
      id: "data5",
      budget: 1000000000,
    },
    {
      id: "data6",
      budget: 10000000000,
    },
  ];

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const onSubmit = (data: { page_4: string }) => {
    localStorage.setItem("page_4", data.page_4);
    setStep(5);
    navigate("/page5");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-3/4 mx-auto max-w-[700px] md:px-6 lg:px-8 mb-20">
        <h1 className="text-2xl font-bold mb-4">Your Budget</h1>
        <p className="mb-5">Please choose your budget</p>

        <Controller
          control={control}
          name="page_4"
          render={({ field }) => (
            <RadioGroup
              orientation="horizontal"
              value={field.value}
              onChange={(id) => field.onChange(id)}
            >
              {radioOptions.map((option) => (
                <CustomRadio key={option.id} value={option.budget.toString()}>
                  {">= " + formatRupiah(option.budget)}
                </CustomRadio>
              ))}
            </RadioGroup>
          )}
        />
      </div>

      <div className="w-full fixed bottom-0 bg-white dark:bg-black shadow-lg py-4 flex justify-center">
        <Button
          className="w-3/4 max-w-[700px] bg-green-600 text-white px-4 py-2 rounded-full"
          isDisabled={!selectedValue}
          type="submit"
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default Page4;
