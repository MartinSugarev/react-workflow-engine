import Controls from "../features/wizard/components/Controls";
import Navigation from "../features/wizard/components/Navigation";
import Step from "../features/wizard/components/Step";
import WizardActiveStepContextProvider from "../features/wizard/contexts/WizardActiveStepContext";
import WizardNavigationContextProvider from "../features/wizard/contexts/WizardNavigationContext";
import { WizardProvider } from "../features/wizard/WizardProvider";
import { stepsConfig } from "../features/wizard/configs/steps-config";


export default function WizardLayout() {
  return (
    <div className="w-full min-h-screen bg-white p-10">
      <div className="mx-auto max-w-6xl border border-slate-300 p-8">
        <div className="mb-10 h-20 border border-pink-500" />

        <div className="flex gap-10">
         <WizardProvider stepsConfig={stepsConfig}>
          <div className="flex-1">
          <WizardActiveStepContextProvider>
             <Step />
          </WizardActiveStepContextProvider>  
            <Controls />
          </div>
         <WizardNavigationContextProvider>
             <Navigation />
         </WizardNavigationContextProvider>
         </WizardProvider>   
        </div>
      </div>
    </div>
  );
}
