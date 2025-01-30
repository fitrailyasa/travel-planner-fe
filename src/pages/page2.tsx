import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, RangeCalendar } from "@heroui/react";
import { RangeValue } from "@react-types/shared";
import { CalendarDate } from "@internationalized/date";

interface Page2Props {
  setStep: (step: number) => void;
}

const Page2: React.FC<Page2Props> = ({ setStep }) => {
  const navigate = useNavigate();
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      page_2: (() => {
        const storedData = localStorage.getItem("page_2");

        if (storedData) {
          const parsedData = JSON.parse(storedData);

          if (
            parsedData.start &&
            parsedData.end &&
            parsedData.start.year &&
            parsedData.end.year
          ) {
            return {
              start: new CalendarDate(
                parsedData.start.year,
                parsedData.start.month,
                parsedData.start.day,
              ),
              end: new CalendarDate(
                parsedData.end.year,
                parsedData.end.month,
                parsedData.end.day,
              ),
            };
          }
        }

        return null;
      })(),
    },
  });

  const [visibleMonths, setVisibleMonths] = useState(1);

  const selectedRange = watch("page_2");

  useEffect(() => {
    const updateVisibleMonths = () => {
      setVisibleMonths(window.innerWidth >= 768 ? 2 : 1);
    };

    updateVisibleMonths();
    window.addEventListener("resize", updateVisibleMonths);

    return () => window.removeEventListener("resize", updateVisibleMonths);
  }, []);

  const onSubmit = (data: { page_2: RangeValue<CalendarDate> | null }) => {
    if (data.page_2) {
      const formattedRange = {
        start: data.page_2.start
          ? {
              year: data.page_2.start.year,
              month: data.page_2.start.month,
              day: data.page_2.start.day,
            }
          : null,
        end: data.page_2.end
          ? {
              year: data.page_2.end.year,
              month: data.page_2.end.month,
              day: data.page_2.end.day,
            }
          : null,
      };

      localStorage.setItem("page_2", JSON.stringify(formattedRange));
    }
    setStep(3);
    navigate("/page3");
  };

  return (
    <>
      <div className="w-3/4 mx-auto max-w-[700px] md:px-6 lg:px-8 mb-20">
        <h1 className="text-2xl font-bold mb-4">Page 2</h1>
        <p className="mb-5">Ini adalah halaman 2.</p>
        <div className="flex justify-center">
          <Controller
            control={control}
            name="page_2"
            render={({ field }) => (
              <RangeCalendar
                aria-label="Date (Visible Month)"
                value={field.value}
                visibleMonths={visibleMonths}
                onChange={(newRange) => {
                  field.onChange(newRange);
                  setValue("page_2", newRange);
                }}
              />
            )}
          />
        </div>
      </div>

      <div className="w-full fixed bottom-0 bg-white dark:bg-black shadow-lg py-4 flex justify-center">
        <Button
          className="w-3/4 max-w-[700px] bg-green-600 text-white px-4 py-2 rounded-full"
          isDisabled={
            !selectedRange || !selectedRange.start || !selectedRange.end
          }
          onPress={() => handleSubmit(onSubmit)()}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Page2;
