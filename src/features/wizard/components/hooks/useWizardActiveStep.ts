import { useContext } from "react";
import { WizardActiveStepContext } from "../../contexts/WizardActiveStepContext";

export default function useWizardActiveStep(){
  const context = useContext(WizardActiveStepContext);
  if (context === undefined) {
    throw new Error('useWizardNavigation must be used within a WizardProvider');
  }
  return context;
};