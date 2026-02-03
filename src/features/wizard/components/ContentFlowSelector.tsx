import { useState } from "react";
import useWizardAPIContext from "./hooks/useWizardAPIContext";
import useWizardNavigation from "./hooks/useWizardNavigation";
import useWizardActiveStep from "./hooks/useWizardActiveStep";

const ContentFlowSelector: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const { updateNextStep } = useWizardAPIContext();
  const wizardNavigationData = useWizardNavigation();
  const { activeStepConfig } = useWizardActiveStep();

  return (
    <div className="flex items-center gap-6 text-base">
      {activeStepConfig.options?.map((o) => (
        <label key={o.stepId} className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="contentFlow"
            checked={
              selected === o.stepId || wizardNavigationData.includes(o.stepId)
            }
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
};
export default ContentFlowSelector;