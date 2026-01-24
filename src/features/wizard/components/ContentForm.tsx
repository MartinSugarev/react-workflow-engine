import {  useState } from "react";
import useWizardAPIContext from "./hooks/useWizardAPIContext";

export default function ContentForm() {
  const [inputData, setInputData] = useState<string>('')
  const {updateStepData} = useWizardAPIContext();

return (
  <div className="flex items-center gap-3">
    <input
      onChange={(e) => setInputData(e.target.value)}
      value={inputData}
      className="flex-1 rounded-lg border border-black/30 bg-white px-3 py-2 focus:border-black focus:outline-none"
      placeholder="Type..."
    />

    <button
      onClick={() => updateStepData(inputData)}
      className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
    >
      Save
    </button>
  </div>
);
}
