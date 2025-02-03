import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";

interface PlanProps {
  setStep: (step: number) => void;
}

const CreatePlan: React.FC<PlanProps> = ({ setStep }) => {
  const navigate = useNavigate();
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      planName: localStorage.getItem("planName") || "",
      placeName: localStorage.getItem("placeName") || "",
    },
  });

  const watchPlanName = watch("planName");
  const watchPlaceName = watch("placeName");

  useEffect(() => {
    const savedPlanName = localStorage.getItem("planName");
    const savedPlaceName = localStorage.getItem("placeName");

    if (savedPlanName) {
      setValue("planName", savedPlanName);
    }
    if (savedPlaceName) {
      setValue("placeName", savedPlaceName);
    }
  }, [setValue]);

  const onSubmit = (data: { planName: string; placeName: string }) => {
    localStorage.setItem("planName", data.planName);
    localStorage.setItem("placeName", data.placeName);
    setStep(1);
    navigate("/page1");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-3/4 mx-auto max-w-[700px] md:px-6 lg:px-8 mb-20">
        <h1 className="text-2xl font-bold mb-4">Create a Plan</h1>

        {/* Plan Name Input */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-foreground mb-2"
            htmlFor="planName"
          >
            Plan Name
          </label>
          <Controller
            control={control}
            name="planName"
            render={({ field }) => (
              <input
                {...field}
                className="w-full p-2 border-2 border-default rounded-lg"
                id="planName"
                placeholder="Enter Plan Name"
                type="text"
              />
            )}
          />
        </div>

        {/* Place Name Input */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-foreground mb-2"
            htmlFor="placeName"
          >
            Place/City Name
          </label>
          <Controller
            control={control}
            name="placeName"
            render={({ field }) => (
              <input
                {...field}
                className="w-full p-2 border-2 border-default rounded-lg"
                id="placeName"
                placeholder="Enter Place/City Name"
                type="text"
              />
            )}
          />
        </div>
      </div>

      <div className="w-full fixed bottom-0 bg-white dark:bg-black shadow-lg py-4 flex justify-center">
        <Button
          className="w-3/4 max-w-[700px] bg-green-600 text-white px-4 py-2 rounded-full"
          isDisabled={!watchPlanName || !watchPlaceName}
          type="submit"
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default CreatePlan;
