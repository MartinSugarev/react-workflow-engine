import { useContext } from "react";
import { WizardActiveStepContext } from "../contexts/WizardActiveStepContext";

export default function Step() {
  const data = useContext(WizardActiveStepContext);
  if(!data) return;

  const {activeStepConfig, activeStepIndex, activeStepStoredData} = data

  return (
    <div className="rounded-xl border border-black bg-sky-200 p-10 min-h-[360px]">
      {activeStepConfig.content}
    </div>
  );
}