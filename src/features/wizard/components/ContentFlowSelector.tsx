import { useContext, useState } from "react";
import { WizardNavigationContext } from "../WizardProvider";
import useWizardAPIContext from "./hooks/useWizardAPIContext";
import useWizardNavigation from "./hooks/useWizardNavigation";

export default function ContentFlowSelector() {
  const data = useContext(WizardNavigationContext);
  const { updateNextStep } = useWizardAPIContext();
  const wizardNavigationData = useWizardNavigation()
  const [selected, setSelected] = useState<string | null>(null);

  if (!data) return null;

  const { stepsConfig, entryPoint } = data;
  const activeStepConfig = stepsConfig[entryPoint];

  return (
    <div className="flex items-center gap-6 text-base">
      {activeStepConfig.options?.map((o) => (
        <label key={o.stepId} className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="contentFlow"
            checked={selected === o.stepId || wizardNavigationData.includes(o.stepId)}
            onChange={() => {
              setSelected(o.stepId);
              updateNextStep(o.stepId);
            }}
          />
          <span>{o.stepId}</span>
        </label>
      ))}
    </div>
  );
}