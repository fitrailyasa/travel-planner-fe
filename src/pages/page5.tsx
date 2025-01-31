import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@heroui/react";

type Page5FormInputs = {
  data1: string;
  data2: string;
};

const Page5 = () => {
  const [formData, setFormData] = useState<any>({});
  const [tripDates, setTripDates] = useState<string>("");

  useEffect(() => {
    // const pageDestination = localStorage.getItem("destination");
    const pageDestination = "Tokyo, Japan";
    const page1Data = localStorage.getItem("page_1");
    const page2Data = localStorage.getItem("page_2");
    const page3Data = localStorage.getItem("page_3");
    const page4Data = localStorage.getItem("page_4");

    /* eslint-disable no-console */
    // console.log(pageDestination);
    // console.log(page1Data);
    // console.log(page2Data);
    // console.log(page3Data);
    // console.log(page4Data);

    const parsedPage2Data = page2Data ? JSON.parse(page2Data) : null;
    const parsedPage3Data = page3Data ? JSON.parse(page3Data) : [];

    if (parsedPage2Data?.start && parsedPage2Data?.end) {
      const formatDate = (dateObj: {
        year: number;
        month: number;
        day: number;
      }) => {
        const date = new Date(dateObj.year, dateObj.month - 1, dateObj.day);

        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "short",
          day: "numeric",
        };

        return date.toLocaleDateString("id-ID", options);
      };

      const startDate = formatDate(parsedPage2Data.start);
      const endDate = formatDate(parsedPage2Data.end);

      setTripDates(`${startDate} - ${endDate}`);
    }

    setFormData({
      destination: pageDestination,
      page_1: page1Data,
      page_2: parsedPage2Data,
      page_3: parsedPage3Data,
      page_4: page4Data,
    });
  }, []);

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
          <div className="mb-4">
            <h3 className="mt-3 font-bold">Destionation</h3>
            <p>{formData?.destination || "Not available"}</p>

            {/* Page 1 */}
            <h3 className="mt-3 font-bold">Party</h3>
            <p>{formData?.page_1 || "Not available"}</p>

            {/* Page 2 */}
            <h3 className="mt-3 font-bold">Trip Dates</h3>
            <p>{tripDates || "Not available"}</p>

            {/* Page 3 */}
            <h3 className="mt-3 font-bold">
              {formData?.page_3?.length} Interests
            </h3>
            <ul>
              {formData?.page_3?.map((interest: string, index: number) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>

            {/* Page 4 */}
            <h3 className="mt-3 font-bold">Budget</h3>
            <p>{formData?.page_4 || "Not available"}</p>
          </div>
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
