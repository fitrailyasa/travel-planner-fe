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

interface Page1Props {
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

const Page1: React.FC<Page1Props> = ({ setStep }) => {
  const navigate = useNavigate();
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      page_1: localStorage.getItem("page_1") || "",
    },
  });

  const selectedValue = watch("page_1");

  useEffect(() => {
    const savedValue = localStorage.getItem("page_1");

    if (savedValue) {
      setValue("page_1", savedValue);
    }
  }, [setValue]);

  const radioOptions = [
    {
      id: "data1",
      name: "Data 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "data2",
      name: "Data 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "data3",
      name: "Data 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "data4",
      name: "Data 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "data5",
      name: "Data 5",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "data6",
      name: "Data 6",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  const onSubmit = (data: { page_1: string }) => {
    localStorage.setItem("page_1", data.page_1);
    setStep(2);
    navigate("/page2");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-3/4 mx-auto max-w-[700px] md:px-6 lg:px-8 mb-20">
        <h1 className="text-2xl font-bold mb-4">Page 1</h1>
        <p className="mb-5">Ini adalah halaman 1.</p>

        <Controller
          control={control}
          name="page_1"
          render={({ field }) => (
            <RadioGroup
              orientation="horizontal"
              value={field.value}
              onChange={(id) => field.onChange(id)}
            >
              {radioOptions.map((option) => (
                <CustomRadio
                  key={option.id}
                  description={option.description}
                  value={option.name}
                >
                  {option.name}
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

export default Page1;
