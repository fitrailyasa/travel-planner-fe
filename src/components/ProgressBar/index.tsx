import React from "react";
import { useNavigate } from "react-router-dom";

interface ProgressBarProps {
  step: number;
  decrementStep: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, decrementStep }) => {
  const progressPercentage = (step / 5) * 100;

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-6 py-2 max-w-[700px] mx-auto">
      <button
        className="text-xl text-gray-600 hover:text-gray-800 mr-4 py-2"
        onClick={() => {
          decrementStep();
          navigate(-1);
        }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 12H5" />
          <path d="M12 5l-7 7 7 7" />
        </svg>
      </button>
      <div className="flex-grow bg-gray-200 rounded-full h-2 my-4 mb-4">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
