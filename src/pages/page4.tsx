import React, { useState } from "react";
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
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const radioOptions = [
    {
      value: "data1",
      label: "Data 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      value: "data2",
      label: "Data 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      value: "data3",
      label: "Data 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      value: "data4",
      label: "Data 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      value: "data5",
      label: "Data 5",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      value: "data6",
      label: "Data 6",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <>
      <div className="w-3/4 mx-auto max-w-[700px] md:px-6 lg:px-8 mb-20">
        <h1 className="text-2xl font-bold mb-4">Page 4</h1>
        <p className="mb-5">Ini adalah halaman 4.</p>

        <RadioGroup
          orientation="horizontal"
          value={selectedValue}
          onChange={(event) => setSelectedValue(event.target.value)}
        >
          {radioOptions.map((option) => (
            <CustomRadio
              key={option.value}
              description={option.description}
              value={option.value}
            >
              {option.label}
            </CustomRadio>
          ))}
        </RadioGroup>
      </div>
      <div className="w-full fixed bottom-0 bg-white dark:bg-black shadow-lg py-4 flex justify-center">
        <Button
          className="w-3/4 max-w-[700px] bg-green-600 text-white px-4 py-2 rounded-full"
          isDisabled={!selectedValue}
          onPress={() => {
            setStep(5);
            navigate("/page5");
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Page4;
