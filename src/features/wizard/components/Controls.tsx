import { useEffect } from "react";
import useWizardAPIContext from "./hooks/useWizardAPIContext";
import useWizardActiveStep from "./hooks/useWizardActiveStep";
import useWizardNavigation from "./hooks/useWizardNavigation";

export default function Controls() {
  const { goToStep, resetSteps } = useWizardAPIContext();
  const { activeStepIndex } = useWizardActiveStep();
  const wizardNavigationKeys = useWizardNavigation();

//     useEffect(() => {
//   console.log('Controls re-render ');
// });

  return (
    <div className="rounded-lg border border-black bg-amber-50 px-8 py-6 flex items-center gap-6 min-h-[110px]">
      <button
        onClick={() => goToStep(activeStepIndex - 1)}
        disabled={activeStepIndex === 0}
        className={`h-12 w-20 rounded-lg text-white hover:cursor-pointer ${activeStepIndex === 0 ? "bg-sky-300" : "bg-blue-600"}`}
      >
        Prev
      </button>

      <button
        onClick={() => goToStep(activeStepIndex + 1)}
        disabled={wizardNavigationKeys.length - 1 === activeStepIndex}
        className={`h-12 w-20 rounded-lg text-white hover:cursor-pointer ${wizardNavigationKeys.length - 1 === activeStepIndex ? "bg-sky-300" : "bg-blue-600"}`}
      >
        Next
      </button>
      <button onClick={resetSteps} className="h-12 w-20 rounded-lg text-white hover:cursor-pointer bg-blue-600" >Reset</button>
    </div>
  );
}