import { useContext } from "react";
import { WizardActiveStepContext } from "../../contexts/WizardActiveStepContext";

export default function useWizardActiveStep(){
  const context = useContext(WizardActiveStepContext);
  if (!context) {
    throw new Error('useWizardActiveStep must be used within a WizardProvider');
  }
  return context;
};