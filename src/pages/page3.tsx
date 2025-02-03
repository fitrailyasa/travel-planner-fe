import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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

interface Category {
  id: number;
  name: string;
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
  const API_URL = import.meta.env.VITE_APP_URL;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string[]>(() => {
    const saved = localStorage.getItem("page_3");

    return saved ? JSON.parse(saved) : [];
  });

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      page_3: selectedValue,
    },
  });

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) throw new Error("Token tidak ditemukan");

        const response = await fetch(`${API_URL}/categories`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Gagal mengambil data kategori");

        const result = await response.json();

        setCategories(result.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setValue("page_3", selectedValue);
    localStorage.setItem("page_3", JSON.stringify(selectedValue));
  }, [selectedValue, setValue]);

  const onSubmit = () => {
    localStorage.setItem("page_3", JSON.stringify(selectedValue));
    setStep(4);
    navigate("/page4");
  };

  return (
    <>
      <div className="w-3/4 mx-auto max-w-[700px] md:px-6 lg:px-8 mb-20">
        <h1 className="text-2xl font-bold mb-4">Travel Categories</h1>
        <p className="mb-5">Choose your category:</p>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CheckboxGroup
              className="gap-1"
              orientation="horizontal"
              value={selectedValue}
              onChange={(values) => setSelectedValue(values)}
            >
              {categories.map((category) => (
                <Controller
                  key={category.id}
                  control={control}
                  name="page_3"
                  render={({ field }) => (
                    <CustomCheckbox
                      {...field}
                      isSelected={selectedValue.includes(category.name)}
                      value={category.name}
                      onChange={() => {
                        const newSelected = selectedValue.includes(
                          category.name,
                        )
                          ? selectedValue.filter((v) => v !== category.name)
                          : [...selectedValue, category.name];

                        setSelectedValue(newSelected);
                      }}
                    >
                      {category.name}
                    </CustomCheckbox>
                  )}
                />
              ))}
            </CheckboxGroup>
          </form>
        )}
      </div>

      <div className="w-full fixed bottom-0 bg-white dark:bg-black shadow-lg py-4 flex justify-center">
        <Button
          className="w-3/4 max-w-[700px] bg-green-600 text-white px-4 py-2 rounded-full"
          isDisabled={selectedValue.length === 0}
          onPress={() => handleSubmit(onSubmit)()}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Page3;
