import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";

interface Page1Props {
  setStep: (step: number) => void;
}

const Page1: React.FC<Page1Props> = ({ setStep }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Page 1</h1>
      <p>Ini adalah halaman 1.</p>
      <Button
        className="w-3/4 fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full max-w-[700px]"
        onPress={() => {
          setStep(2);
          navigate("/page2");
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default Page1;
