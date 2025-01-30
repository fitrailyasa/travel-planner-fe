import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, RangeCalendar } from "@heroui/react";
import { RangeValue } from "@react-types/shared";
import { CalendarDate } from "@internationalized/date";

interface Page2Props {
  setStep: (step: number) => void;
}

const Page2: React.FC<Page2Props> = ({ setStep }) => {
  const navigate = useNavigate();
  const [visibleMonths, setVisibleMonths] = useState(1);
  const [selectedRange, setSelectedRange] =
    useState<RangeValue<CalendarDate> | null>(null);

  useEffect(() => {
    const updateVisibleMonths = () => {
      setVisibleMonths(window.innerWidth >= 768 ? 2 : 1);
    };

    updateVisibleMonths();
    window.addEventListener("resize", updateVisibleMonths);

    return () => window.removeEventListener("resize", updateVisibleMonths);
  }, []);

  return (
    <>
      <div className="w-3/4 mx-auto max-w-[700px] md:px-6 lg:px-8 mb-20">
        <h1 className="text-2xl font-bold mb-4">Page 2</h1>
        <p className="mb-5">Ini adalah halaman 2.</p>
        <div className="flex justify-center">
          <RangeCalendar
            aria-label="Date (Visible Month)"
            value={selectedRange}
            visibleMonths={visibleMonths}
            onChange={setSelectedRange}
          />
        </div>
      </div>
      <div className="w-full fixed bottom-0 bg-white dark:bg-black shadow-lg py-4 flex justify-center">
        <Button
          className="w-3/4 max-w-[700px] bg-green-600 text-white px-4 py-2 rounded-full"
          isDisabled={
            !selectedRange || !selectedRange.start || !selectedRange.end
          }
          onPress={() => {
            setStep(3);
            navigate("/page3");
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Page2;
