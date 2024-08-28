import React from "react";

interface InstructionsProps {
  currentStep: number;
  totalSteps: number;
  instruction: string;
  exampleCode: string;
}

const InstructionsCSS: React.FC<InstructionsProps> = ({
  currentStep,
  totalSteps,
  instruction,
  exampleCode,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-semibold mb-2">
        Step {currentStep} of {totalSteps}
      </h2>
      <p className="text-gray-700 mb-4">{instruction}</p>
      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-xl">
        <code>{exampleCode}</code>
      </pre>
    </div>
  );
};

export default InstructionsCSS;
