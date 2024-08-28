import React from "react";

interface InstructionsProps {
  currentStep: number;
  totalSteps: number;
  instruction: string;
  exampleCode: string;
}

const InstructionsJS: React.FC<InstructionsProps> = ({
  currentStep,
  totalSteps,
  instruction,
  exampleCode,
}) => {
  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700">
        Step {currentStep} of {totalSteps}
      </h3>
      <p className="text-gray-800">{instruction}</p>
      <pre className="mt-4 p-4 bg-white text-gray-900 rounded-lg shadow-inner overflow-auto">
        <code>{exampleCode}</code>
      </pre>
    </div>
  );
};

export default InstructionsJS;
