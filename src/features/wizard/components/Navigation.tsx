import useWizardNavigation from "./hooks/useWizardNavigation";
import useWizardAPIContext from "./hooks/useWizardAPIContext";
import useWizardActiveStep from "./hooks/useWizardActiveStep";
import useWizardInvalidStepsContext from "./hooks/useWizardInvalidStepContext";

export default function Navigation() {
  const items = useWizardNavigation();
  const {activeStepIndex} = useWizardActiveStep();
  const wizzardInvadidSteps = useWizardInvalidStepsContext()
  const { goToStep } = useWizardAPIContext();

  return (
    <aside className="w-full max-w-[420px] rounded-xl border border-black bg-rose-200 p-6">
      <ul className="space-y-6">
        {items.map((label, idx) => {
          const isActive = idx === activeStepIndex;
          const isStepInvalid = wizzardInvadidSteps.includes(label)
          return (
            <li key={label}>
              <button
                onClick={() => goToStep(idx)}
                className={`w-full text-left hover:cursor-pointer 
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
    </aside>
  );
}
