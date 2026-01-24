import useWizardAPIContext from "./hooks/useWizardAPIContext";
import useWizardActiveStep from "./hooks/useWizardActiveStep";

export default function Controls() {
  const wizardAPIContextData = useWizardAPIContext();
  const wizardActiveStepData = useWizardActiveStep();

  const { goToStep } = wizardAPIContextData;
  const { activeStepIndex } = wizardActiveStepData;
  
  return (
    <div className="rounded-lg border border-black bg-amber-50 px-8 py-6 flex items-center gap-6 min-h-[110px]">
      <button
        onClick={() => goToStep(activeStepIndex - 1)}
        className="h-12 w-20 rounded-lg bg-sky-300 text-white hover:bg-sky-400"
      >
        Prev
      </button>

      <button
        onClick={() => goToStep(activeStepIndex + 1)}
        className="h-12 w-20 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
}
