import Controls from "../features/wizard/components/Controls";
import Navigation from "../features/wizard/components/Navigation";
import Step from "../features/wizard/components/Step";
import { WizardProvider } from "../features/wizard/WizardProvider";
import { stepsConfig } from "../features/wizard/configs/steps-config";
import { stepValidation } from "../features/wizard/utils/stepValidation";
export default function WizardLayout() {
  return (
    <div className="min-h-screen bg-white p-10">
      dadas
      <div className="mx-auto max-w-6xl border border-slate-300 p-8">
        <div className="mb-10 h-20 border border-pink-500" />
        <div className="flex gap-10">
          <WizardProvider
            stepsConfig={stepsConfig}
            validationCallback={stepValidation}
          >
            <div className="flex-1">
              <Step />
              <Controls />
            </div>
            <Navigation />
          </WizardProvider>
        </div>
      </div>
    </div>
  );
}