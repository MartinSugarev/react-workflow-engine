import useWizardNavigation from "./hooks/useWizardNavigation";
import useWizardAPIContext from "./hooks/useWizardAPIContext";
import useWizardActiveStep from "./hooks/useWizardActiveStep";
import useWizardInvalidStepsContext from "./hooks/useWizardInvalidStepContext";

const Navigation: React.FC = () => {
  const steps = useWizardNavigation();
  const { activeStepIndex } = useWizardActiveStep();
  const wizzardInvadidSteps = useWizardInvalidStepsContext();
  const { goToStep } = useWizardAPIContext();
  const completionPersantage = (100 / steps.length) * (activeStepIndex + 1);

  return (
    <aside className="w-full flex flex-col justify-between max-w-[420px] rounded-xl border border-black bg-rose-200 p-6">
      <ul className="space-y-6">
        {steps.map((label, idx) => {
          const isActive = idx === activeStepIndex;
          const isStepInvalid = wizzardInvadidSteps.includes(label);
          return (
            <li key={label}>
              <button
                onClick={() => goToStep(idx)}
                className={`text-left hover:cursor-pointer 
                  ${isActive ? "font-extrabold" : "font-semibold"}
                  ${isStepInvalid ? "text-red-500" : "text-black"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full " />
                  <span>{label}</span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      <div>{`Completion: ${completionPersantage.toFixed(2)}%`}</div>
    </aside>
  );
};
export default Navigation;