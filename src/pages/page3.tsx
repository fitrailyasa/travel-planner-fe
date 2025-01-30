import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  useCheckbox,
  CheckboxGroup,
  Chip,
  VisuallyHidden,
  tv,
} from "@heroui/react";

interface Page3Props {
  setStep: (step: number) => void;
}

export const CustomCheckbox = (props: any) => {
  const checkbox = tv({
    slots: {
      base: "border-default hover:bg-default-200",
      content: "text-default-500",
    },
    variants: {
      isSelected: {
        true: {
          base: "border-success bg-success hover:bg-success-500 hover:border-success-500 text-white",
          content: "text-success-foreground pl-1 text-white",
        },
      },
      isFocusVisible: {
        true: {
          base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
        },
      },
    },
  });

  const { children, isSelected, isFocusVisible, getBaseProps, getInputProps } =
    useCheckbox(props);

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="success"
        startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
        variant="faded"
      >
        {children}
      </Chip>
    </label>
  );
};

export const CheckIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

const Page3: React.FC<Page3Props> = ({ setStep }) => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  const checkboxOptions = [
    "Lorem Ipsum 1",
    "Lorem Ipsum 2",
    "Lorem Ipsum 3",
    "Lorem Ipsum 4",
    "Lorem Ipsum 5",
    "Lorem Ipsum 6",
    "Lorem Ipsum 7",
    "Lorem Ipsum 8",
    "Lorem Ipsum 9",
    "Lorem Ipsum 10",
    "Lorem Ipsum 11",
    "Lorem Ipsum 12",
  ];

  return (
    <>
      <div className="w-3/4 mx-auto max-w-[700px] md:px-6 lg:px-8 mb-20">
        <h1 className="text-2xl font-bold mb-4">Page 3</h1>
        <p className="mb-5">Ini adalah halaman 3.</p>
        <CheckboxGroup
          className="gap-1"
          orientation="horizontal"
          value={selectedValue}
          onChange={(values) => setSelectedValue(values as string[])}
        >
          {checkboxOptions.map((option) => (
            <CustomCheckbox key={option} value={option}>
              {option}
            </CustomCheckbox>
          ))}
        </CheckboxGroup>
      </div>
      <div className="w-full fixed bottom-0 bg-white dark:bg-black shadow-lg py-4 flex justify-center">
        <Button
          className="w-3/4 max-w-[700px] bg-green-600 text-white px-4 py-2 rounded-full"
          isDisabled={selectedValue.length === 0}
          onPress={() => {
            setStep(4);
            navigate("/page4");
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Page3;
